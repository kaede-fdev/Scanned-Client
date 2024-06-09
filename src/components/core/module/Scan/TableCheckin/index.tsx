"use client";
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Popover,
  Space,
  Table,
  TableProps,
} from "antd";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Typography from "@/components/core/common/Typography";
import { ScanInfor } from "@/helpers/types";
import {
  useAllCheckinQuery,
  useEditCheckinMutation,
} from "@/store/services/scan";
import PopoverModule from "@/components/core/module/ScanAll/PopoverModules";
import { FaFilter } from "react-icons/fa";
import { Key } from "antd/es/table/interface";
import { themes } from "@/styles/themes";

type TProps = {
  isRefresh: boolean;
};

function TableCheckin({ isRefresh }: TProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isCheckout, setIsCheckout] = useState<boolean | undefined>(undefined);

  const { scannedCheckinData, isFetching, refetch } = useAllCheckinQuery(
    {
      limit: 200,
      search: search,
      isCheckout: isCheckout
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
  }, [isRefresh]);

  const HandleField = (value: any, record: any, type: string) => {
    const newEdit = {
      ...record,
      [type]: value,
      ...(type === "isCheckout" && { checkoutAt: new Date() }),
    };
    console.log(newEdit);
    handleEditById(newEdit);
  };
  const [editCheckin] = useEditCheckinMutation();
  const handleEditById = async (data: any) => {
    try {
      const res = await editCheckin(data);
    } catch (error) {}
  };

  const handleFilterChange = (checkoutFilter: boolean[] | undefined) => {
    if (!checkoutFilter || checkoutFilter.length === 0) {
      setIsCheckout(undefined);
    } else if (checkoutFilter.length === 2) {
      setIsCheckout(undefined);
    } else {
      setIsCheckout(checkoutFilter[0]);
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
      key: "name",
      width: 160,
      fixed: "left",
      render: (value, record) => {
        return <Typography.Text $fontWeight={500} $color={themes?.default?.colors?.primary}>{record?.fullname}</Typography.Text>;
      },
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text  $fontWeight={500}>{record?.cccd}</Typography.Text>;
      },
    },
    {
      title: "CMND",
      dataIndex: "",
      key: "cmnd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text  $fontWeight={500}>{record?.cmnd}</Typography.Text>;
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
      title: "Phòng ban",
      dataIndex: "",
      key: "banId",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.banId?.ban}</Typography.Text>;
      },
    },
    {
      title: "Cán bộ",
      dataIndex: "",
      key: "managerName",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.managerName}</Typography.Text>;
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
    {
      title: `${isCheckout ? "(Lọc)" : ""} CHECK OUT`,
      dataIndex: "",
      key: "isCheckout",
      width: 140,
      fixed: "right",
      filters: [
        {
          text: "CHƯA CHECKOUT",
          value: false
        },
        {
          text: "ĐÃ CHECK OUT",
          value: true
        }
      ],
      onFilter: (value: boolean | Key, record: ScanInfor) => record.isCheckout === value,
      filterIcon: (filtered) => (
        <span>
            <FaFilter color="white" size={12} />
        </span>
      ),
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            {record?.isCheckout ? (
              <Typography.Text $fontWeight={700} $color={themes?.default?.colors?.primary}>ĐÃ CHECKOUT</Typography.Text>
            ) : (
              <Button
                type="primary"
                style={{
                  background: themes?.default?.colors?.successDark
                }}
                onClick={() => {
                  HandleField(true, record, "isCheckout");
                  refetch();
                }}
              >
                CHECK OUT
              </Button>
            )}
          </Space.Compact>
        );
      },
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
      onChange={(pagination, filters) => {
        const checkoutFilter = filters.isCheckout as boolean[];
        handleFilterChange(checkoutFilter);
      }}
    />
  );
}

export default TableCheckin;
