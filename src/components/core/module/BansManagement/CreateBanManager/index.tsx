"use client";
import Typography from "@/components/core/common/Typography";
import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  Grid,
  Input,
  message,
  Select,
  Table,
  TableProps,
} from "antd";
import React from "react";
import * as S from "./createbanmanager.styles";
import {
  useAllBanQuery,
  useCreateMutation,
  useDeleteBanByIdMutation,
} from "@/store/services/ban";
import {
  useAllBanManagerQuery,
  useCreateManagerMutation,
  useDeleteBanManagerByIdMutation,
  useEditManagerMutation,
} from "@/store/services/manager";

type BanManager = {
  _id: string;
  fullname: string;
  banId: string;
};

function CreateBanManager() {
  const [deleteBanById] = useDeleteBanManagerByIdMutation();
  const [createManager] = useCreateManagerMutation();
  const [editManager] = useEditManagerMutation();
  const [form] = Form.useForm();


  const { allBanData } = useAllBanQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        allBanData: data?.data ?? [],
        isFetching,
      };
    },
  });
  const { managersData, isFetching, refetch } = useAllBanManagerQuery(
    undefined,
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          managersData: data?.data?.managers ?? [],
          isFetching,
        };
      },
    }
  );

  const onFinish: FormProps<BanManager>["onFinish"] = async (values) => {
    try {
      const res = await createManager({
        newBanManager: values,
      }).unwrap();
      form.resetFields();
      await refetch();
      console.log(values);
      message.success("Tạo phòng ban thành công");
    } catch (error) {
      message.error("Tạo mới không thành công");
    }
  };

  const handleDeleteById = async (_id: string) => {
    try {
      const res = await deleteBanById(_id).unwrap();
      await refetch();
    } catch (error) {
      message.error("Xảy ra lỗi trong quá trình xóa tài khoản");
    }
  };

  const HandleField = (value: any, record: any, type: string) => {
    const newEdit = {
      ...record,
      [type]: value,
    };
    handleEditById(newEdit);
};

  const handleEditById = async (data: any) => {
    try {
        const res = await editManager(data);
    } catch (error) {
            message.error("Lổi khi đổi tên")
    }
  }

  const columns: TableProps<BanManager>["columns"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: 1,
      render: (text, _, index) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
    },
    {
      title: "Họ và Tên",
      dataIndex: "",
      key: "",
      width: 10,
      render: (value, record) => {
        return <>
            <Input defaultValue={value?.fullname} placeholder="Nhập họ tên"
                onChange={(event) => {
                    HandleField(event.target.value, record, "fullname")
                }}
            />
        </>
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "",
      key: "",
      width: 10,
      render: (value, record) => {
        return (
          <Select defaultValue={value?.banId?._id} onChange={(id: any) => {
            HandleField(id, record, "banId")
          }}>
            {allBanData?.map((item: any, index: number) => (
              <Select.Option value={item?._id}>{item?.ban}</Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 2,
      render: (value, record) => {
        return (
          <Flex
            align="center"
            gap={10}
            onClick={() => handleDeleteById(record._id)}
          >
            <Button type="primary" danger>
              Xoá
            </Button>
          </Flex>
        );
      },
    },
  ];
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={5}>
        Tạo cán bộ quản lý phòng ban
      </Typography.Title>
      <Card>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Họ và Tên"
            name={"fullname"}
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input placeholder="Ví dụ: Nguyễn Văn A" />
          </Form.Item>
          <Form.Item
            label="Thuộc phòng ban"
            name={"banId"}
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Select placeholder="Chọn phòng ban">
              {allBanData?.map((item: any, index: number) => (
                <Select.Option key={index} value={item?._id}>{item?.ban}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <S.Container>
        <Table
          columns={columns}
          dataSource={managersData}
          loading={isFetching}
          rowKey={(record) => record._id}
          // scroll={{ x: screens.xxl ? 1000 : 600 }}
          size="small"
          bordered={false}
          pagination={false}
          sticky
          showSorterTooltip={{ target: "sorter-icon" }}
        ></Table>
      </S.Container>
    </Flex>
  );
}

export default CreateBanManager;
