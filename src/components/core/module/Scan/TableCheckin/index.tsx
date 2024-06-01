"use client"
import { Grid, Table, TableProps } from "antd";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import Typography from "@/components/core/common/Typography";
import { ScanInfor } from "@/helpers/types";
import { useAllCheckinQuery } from "@/store/services/scan";
import PopoverModule from "@/components/core/module/ScanAll/PopoverModules";

type TProps = {
    isRefresh: boolean;
}

function TableCheckin({isRefresh}: TProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { scannedCheckinData, isFetching, refetch } = useAllCheckinQuery(
    {
      limit: 10,
      search: search,
    },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          scannedCheckinData: data?.data?.scanneds ?? [],
          isFetching,
        };
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [isRefresh])


  const columns: TableProps<ScanInfor>["columns"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: 58,
      render: (text, _, index) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "",
      key: "name",
      width: 160,
      fixed: "left",
      render: (value, record) => {
        return <Typography.Text>{record?.fullname}</Typography.Text>;
      },
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.cccd}</Typography.Text>;
      },
    },
    {
      title: "CMND",
      dataIndex: "",
      key: "cmnd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.cmnd}</Typography.Text>;
      },
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
      width: 80,
      render: (value, record) => {
        return (
          <Typography.Text>
            {moment(record?.issuedAt).toDate().toLocaleDateString()}
          </Typography.Text>
        );
      },
    },
    {
        title: "Người quét",
        dataIndex: "",
        key: "scannedBy",
        width: 120,
        render: (value, record) => {
          return <PopoverModule record={record} />;
        },
        sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
      },
      {
        title: "Thời gian quét",
        dataIndex: "",
        key: "createAt",
        width: 120,
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
      dataSource={scannedCheckinData}
      loading={isFetching}
      rowKey={(record) => record._id}
      scroll={{ x: screens.xxl ? 1000 : 600 }}
      size="small"
      bordered={false}
      pagination={false}
      sticky
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

export default TableCheckin;
