"use client";
import Typography from "@/components/core/common/Typography";
import { ScanInfor } from "@/helpers/types";
import useModal from "@/hooks/useModal";
import { useAllBanQuery } from "@/store/services/ban";
import { useAllBanManagerByBanIdQuery } from "@/store/services/manager";
import {
  useAllCheckinQuery,
  useDeleteCheckinByIdMutation,
  useEditCheckinMutation,
} from "@/store/services/scan";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Grid,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
type TProps = {
  isRefresh: boolean;
  search: any;
  setIsRefresh: (bool: boolean) => void;
};
type FieldType = {
    banId: string;
    managerId: string
}
function TableOfCheckinForEdit({ isRefresh, search, setIsRefresh }: TProps) {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [banId, setBanId] = useState<string>("");

  const [recored, setRecored] = useState<ScanInfor | null>(null);

  const { scannedData, isFetching, refetch } = useAllCheckinQuery(
    {
      search: search,
      limit: undefined,
    },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          scannedData: data?.data?.scanneds ?? [],
          isFetching,
        };
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [isRefresh]);

  const { allBanData } = useAllBanQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        allBanData: data?.data ?? [],
        isFetching,
      };
    },
  });

  const { allManagerByBanId } = useAllBanManagerByBanIdQuery(banId, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        allManagerByBanId: data?.data ?? [],
        isFetching,
      };
    },
  });
  const [form] = Form.useForm();
  const { visible, closeModal, modalState, openModal } = useModal();
  const handleOpenModal = (record: ScanInfor) => {
    openModal();
    setRecored(record);
  };

  const HandleField = (value: any, record: any, type: string) => {
    const newEdit = {
      ...record,
      [type]: value,
    };
    handleEditById(newEdit);
  };
  const [editCheckin] = useEditCheckinMutation();
  const handleEditById = async (data: any) => {
    try {
      const res = await editCheckin(data);
    } catch (error) {}
  };
  const [deleteCheckinById] = useDeleteCheckinByIdMutation();
  const handleDeleteById = async (id: string) => {
    try {
      const res = await deleteCheckinById(id);
      setIsRefresh(!isRefresh);
      message.success("Xóa thành công");
    } catch (error) {
      message.error("Xóa không thành công");
    }
  };

  const columns: TableProps<ScanInfor>["columns"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: 40,
      render: (text, _, index) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "",
      key: "fullname",
      fixed: "left",
      width: 120,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value?.fullname}
              onChange={(event) => {
                HandleField(event.target.value, record, "fullname");
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.fullname.localeCompare(two.fullname),
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value?.cccd}
              onChange={(event) => {
                HandleField(event.target.value, record, "cccd");
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => parseInt(one.cccd) - parseInt(two.cccd),
    },
    {
      title: "CMND",
      dataIndex: "",
      key: "cmnd",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value?.cmnd}
              onChange={(event) => {
                HandleField(event.target.value, record, "cmnd");
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => parseInt(one.cmnd) - parseInt(two.cmnd),
    },
    {
      title: "Ngày sinh",
      dataIndex: "",
      key: "dob",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <DatePicker
              placeholder="Chọn ngày sinh"
              defaultValue={value?.dob ? dayjs(value?.dob) : ""}
              onChange={(event) => {
                HandleField(dayjs(event).toDate().toUTCString(), record, "dob");
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.dob.localeCompare(two.dob),
    },
    {
      title: "Giới tính",
      dataIndex: "",
      key: "gender",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Select
              defaultValue={value?.gender}
              placeholder="Chọn giới tính"
              style={{ width: "100%" }}
              onChange={(event) => {
                HandleField(event, record, "gender");
              }}
            >
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
            </Select>
          </Space.Compact>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      key: "address",
      width: 200,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value?.fullAddress}
              onChange={(event) => {
                HandleField(event.target.value, record, "fullAddress");
              }}
            />
          </Space.Compact>
        );
      },
    },
    {
      title: "Ngày cấp",
      dataIndex: "",
      key: "issuedAt",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <DatePicker
              defaultValue={value?.issuedAt ? dayjs(value?.issuedAt) : ""}
              onChange={(event) => {
                HandleField(
                  dayjs(event).toDate().toUTCString(),
                  record,
                  "issuedAt"
                );
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Phòng ban",
      dataIndex: "",
      key: "ban",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Typography.Text>{record?.banId?.ban}</Typography.Text>
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Cán bộ quản lý",
      dataIndex: "",
      key: "manager",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Typography.Text>{record?.managerId?.fullname}</Typography.Text>
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "",
      dataIndex: "",
      key: "banId",
      width: 120,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Button type="primary" onClick={() => handleOpenModal(record)}>
              Chọn phòng ban
            </Button>
          </Space.Compact>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "banId",
      width: 60,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteById(record?._id)}
            >
              Xóa
            </Button>
          </Space.Compact>
        );
      },
    },
  ];
  const onFinish:FormProps<FieldType>["onFinish"] = async (values) => {
    const {banId, managerId} = values;
    const updateData = {
        ...recored,
        banId: banId,
        managerId: managerId
    }
    try {
        const res = await editCheckin(updateData).unwrap();
        form.resetFields();
        closeModal();
        await refetch();
        message.success("Lưu thành công");
    } catch (error) {
        message.error("Thực hiện không thành công")
    }
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={scannedData}
        loading={isFetching}
        rowKey={(record) => record._id}
        scroll={{ x: screens.xxl ? 1000 : 600 }}
        size="small"
        bordered={false}
        sticky
        showSorterTooltip={{ target: "sorter-icon" }}
      ></Table>
      <Modal
        title="Chọn phòng ban và cán bộ phụ trách"
        open={visible}
        centered
        footer={null}
        onCancel={() => {
          closeModal();
          form.resetFields();
          setRecored(null);
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Flex
            justify="center"
            align="center"
            style={{
              marginBottom: 20,
            }}
          >
            <Typography.Title level={4}>{recored?.fullname}</Typography.Title>
          </Flex>
          <Flex gap={20} align="center" justify="center">
            <Form.Item name="banId" label="Phòng ban">
              <Select  placeholder="Chọn phòng ban" onChange={(id:string) => {
                setBanId(id)
                form.resetFields(['managerId'])
              }}>
                {allBanData?.map((item: any, index: number) => (
                  <Select.Option key={index} value={item?._id}>{item?.ban}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={"managerId"} label="Cán bộ quản lý">
              <Select placeholder="Chọn cán bộ quản lý "
                disabled = {banId.length == 0 ? true : false}
              >
                {allManagerByBanId?.map((item: any, index: number) => (
                  <Select.Option key={index} value={item?._id}>{item?.fullname}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>
          <Flex style={{width: "100$"}} justify="end">
            <Form.Item>
              <Button htmlType="submit" type="primary">Lưu</Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}

export default TableOfCheckinForEdit;
