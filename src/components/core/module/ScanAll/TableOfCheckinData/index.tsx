import Typography from "@/components/core/common/Typography";
import { ScanInfor } from "@/helpers/types";
import { Grid, Table, TableProps } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import PopoverModule from "../PopoverModules";
import { useAllCheckinQuery } from "@/store/services/scan";

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
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.fullname}</Typography.Text>;
      },
      sorter: (one, two) => one.fullname.localeCompare(two.fullname),
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.cccd}</Typography.Text>;
      },
      sorter: (one, two) => parseInt(one.cccd) - parseInt(two.cccd),
    },
    {
      title: "CMND",
      dataIndex: "",
      key: "cmnd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.cmnd}</Typography.Text>;
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
            {moment(record?.dob).toDate().toLocaleDateString()}
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
            {moment(record?.issuedAt).toDate().toLocaleDateString()}
          </Typography.Text>
        );
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Phòng ban",
      dataIndex: "",
      key: "banId",
      width: 100,
      render: (value, record) => {
        return (
          <Typography.Text>
            {record?.banId?.ban}
          </Typography.Text>
        );
      },
      sorter: (one, two) => one.banId.ban.localeCompare(two.banId.ban),
    },
    {
      title: "Cán bộ quản lý",
      dataIndex: "",
      key: "managerId",
      width: 100,
      render: (value, record) => {
        return (
          <Typography.Text>
            {record?.managerId?.fullname}
          </Typography.Text>
        );
      },
      sorter: (one, two) => one.managerId?.fullname.localeCompare(two.managerId?.fullname),
    },
    {
      title: "Người quét",
      dataIndex: "",
      key: "scannedBy",
      width: 90,
      render: (value, record) => {
        return <PopoverModule record={record} />;
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Thời gian quét",
      dataIndex: "",
      key: "createAt",
      width: 100,
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
