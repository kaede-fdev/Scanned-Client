import Typography from "@/components/core/common/Typography";
import { ScanInfor } from "@/helpers/types";
import { Grid, Table, TableProps } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import PopoverModule from "../PopoverModules";
import { useAllCheckinQuery } from "@/store/services/scan";
import { themes } from "@/styles/themes";

type TProps = {
  isRefresh: boolean;
  search: any;
};

function TableOfCheckinData({ isRefresh, search }: TProps) {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { scannedData, isFetching, refetch } = useAllCheckinQuery(
    {
      search: search,
      limit: undefined,
      isCheckout: undefined,
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
      key: "name",
      fixed: "left",
      width: 170,
      render: (value, record) => {
        return <Typography.Text $color={themes?.default?.colors?.primary}
        $fontWeight={500}>{record?.fullname}</Typography.Text>;
      },
      sorter: (one, two) => one.fullname.localeCompare(two.fullname),
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text
        $fontWeight={500}>{record?.cccd}</Typography.Text>;
      },
      sorter: (one, two) => parseInt(one.cccd) - parseInt(two.cccd),
    },
    {
      title: "CMND",
      dataIndex: "",
      key: "cmnd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text $fontWeight={500} >{record?.cmnd}</Typography.Text>;
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
          <Typography.Text>
           {
              record?.dob ? moment(record?.dob).format("DD/MM/YYYY") :"N/A"
            }
          </Typography.Text>
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
        return <Typography.Text>{record?.gender}</Typography.Text>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      key: "address",
      width: 200,
      render: (value, record) => {
        return <Typography.Text>{record?.fullAddress}</Typography.Text>;
      },
    },
    {
      title: "Ngày cấp",
      dataIndex: "",
      key: "issuedAt",
      width: 100,
      render: (value, record) => {
        return (
          <Typography.Text>
            {
              record?.issuedAt ? moment(record?.issuedAt).format("DD/MM/YYYY") :"N/A"
            }
          </Typography.Text>
        );
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Phòng ban",
      dataIndex: "",
      key: "banId",
      width: 140,
      render: (value, record) => {
        return <Typography.Text>{record?.banId?.ban}</Typography.Text>;
      },
      sorter: (one, two) => one.banId.ban.localeCompare(two.banId.ban),
    },
    {
      title: "Cán bộ quản lý",
      dataIndex: "",
      key: "managerName",
      width: 140,
      render: (value, record) => {
        return <Typography.Text>{record?.managerName}</Typography.Text>;
      },
      sorter: (one, two) =>
        one.managerId?.fullname.localeCompare(two.managerId?.fullname),
    },
    {
      title: "Mục đích làm việc",
      dataIndex: "",
      key: "purpose",
      width: 160,
      render: (value, record) => {
        return <Typography.Text>{record?.purpose}</Typography.Text>;
      },
      sorter: (one, two) =>
        one.managerId?.fullname.localeCompare(two.managerId?.fullname),
    },
    {
      title: "CHECKOUT",
      dataIndex: "",
      key: "isCheckout",
      width: 100,
      render: (value, record) => {
        return (
          <Typography.Text>
            {record?.isCheckout ? (
              <Typography.Text
                $color={themes?.default?.colors?.primary}
                $fontWeight={500}
              >
                XONG
              </Typography.Text>
            ) : (
              <Typography.Text $fontWeight={500}>CHƯA</Typography.Text>
            )}
          </Typography.Text>
        );
      },
      sorter: (one, two) =>
        one.managerId?.fullname.localeCompare(two.managerId?.fullname),
    },
    {
      title: "Thời gian CHECKOUT",
      dataIndex: "",
      key: "checkoutAt",
      width: 180,
      render: (value, record) => {
        return (
          <Typography.Text>
            {record?.checkoutAt != null ? `
              ${
                moment(record?.checkoutAt).toDate().toLocaleDateString()
              }  ${
                moment(record?.checkoutAt).toDate().toLocaleTimeString()
              }
            ` : "N/A"}
          </Typography.Text>
        );
      },
      sorter: (one, two) =>
        one.managerId?.fullname.localeCompare(two.managerId?.fullname),
    },
    {
      title: "Người quét",
      dataIndex: "",
      key: "scannedBy",
      width: 140,
      render: (value, record) => {
        return <PopoverModule record={record} />;
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Thời gian quét",
      dataIndex: "",
      key: "createAt",
      width: 180,
      render: (value, record) => {
        return (
          <Typography.Text>
            {moment(record?.createdAt).toDate().toLocaleDateString()}{" "}
            {moment(record?.createdAt).toDate().toLocaleTimeString()}
          </Typography.Text>
        );
      },
      sorter: (one, two) => one.createdAt.localeCompare(two.createdAt),
    },
  ];
  return (
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
  );
}

export default TableOfCheckinData;
