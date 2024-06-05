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
  Table,
  TableProps,
} from "antd";
import React from "react";
import * as S from "./createban.styles";
import {
  useAllBanQuery,
  useCreateMutation,
  useDeleteBanByIdMutation,
} from "@/store/services/ban";
type BanInfo = {
  ban: string;
  _id: string;
};
type FieldType = {
  banname: string;
};
function CreateBan() {
  const [deleteBanById] = useDeleteBanByIdMutation();
  const [create] = useCreateMutation();
  const [form] = Form.useForm();

  const { data, isFetching, refetch } = useAllBanQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        data: data?.data ?? [],
        isFetching,
      };
    },
  });
  
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
        const res = await create(values).unwrap();
        form.resetFields();
        await refetch();
        message.success("Tạo phòng ban thành công")
    } catch (error) {
        message.error("Tạo mới không thành công")
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

  const columns: TableProps<BanInfo>["columns"] = [
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
      title: "Phòng",
      dataIndex: "",
      key: "",
      width: 10,
      render: (value, record) => {
        return <Typography.Text>{record.ban}</Typography.Text>;
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
      <Typography.Title level={5}>Tạo phòng ban</Typography.Title>
      <Card>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tên phòng ban"
            name={"banname"}
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input placeholder="Nhập tên phòng ban" />
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
          dataSource={data}
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

export default CreateBan;
