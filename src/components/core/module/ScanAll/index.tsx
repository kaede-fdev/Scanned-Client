"use client";

import React, { useState } from "react";
import {
    Avatar,
  Button,
  Card,
  Flex,
  Form,
  Grid,
  Input,
  Popover,
  Table,
  TableProps,
} from "antd";
import { IoSearch } from "react-icons/io5";

import * as S from "./scanall.styles";
import { themes } from "@/styles/themes";
import Typography from "@/common/Typography";
import { useAllOnUserQuery } from "@/store/services/scan";
import { ScanInfor } from "@/helpers/types";
import moment from "moment";
import PopoverModule from "./PopoverModules";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import _ from "lodash";
import { createQueryString } from "@/utils/queryString";

function ScanAllModules() {
  const router = useRouter();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";


  const { scannedData, isFetching, refetch } = useAllOnUserQuery({
    search: search,
    limit: undefined}, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        scannedData: data?.data?.scanneds ?? [],
        isFetching,
      };
    },
  });

  const columns: TableProps<ScanInfor>["columns"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: 58,
      fixed: "left",
      render: (text, _, index) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "",
      key: "name",
      fixed: "left",
      width: 160,
      render: (value, record) => {
        return <Typography.Text>{record?.fullname}</Typography.Text>;
      },
      sorter: (one, two) => one.fullname.localeCompare(two.fullname),
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      fixed: "left",
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
      fixed: "left",
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
      fixed: "left",
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
      fixed: "left",
      width: 100,
      render: (value, record) => {
        return <Typography.Text>{record?.gender}</Typography.Text>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      key: "address",
      fixed: "left",
      width: 200,
      render: (value, record) => {
        return <Typography.Text>{record?.fullAddress}</Typography.Text>;
      },
    },
    {
      title: "Ngày cấp",
      dataIndex: "",
      key: "issuedAt",
      fixed: "left",
      width: 80,
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
      title: "Người quét",
      dataIndex: "",
      key: "scannedBy",
      fixed: "left",
      width: 80,
      render: (value, record) => {
        return (
           <PopoverModule record={record}/>
        );
      },
      sorter: (one, two) => one.issuedAt.localeCompare(two.issuedAt),
    },
    {
      title: "Thời gian quét",
      dataIndex: "",
      key: "createAt",
      fixed: "left",
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

  const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(createQueryString("search", `${e?.target?.value}`));
  }, 300);

  return (
    <S.MainContainerWrapper>
      <S.Head>
        <Typography.Title
          level={3}
          $fontWeight={700}
          $color={themes.default.colors.primaryDark}
        >
          Tất cả dữ liệu đã quyét
        </Typography.Title>
      </S.Head>
      <Flex>
        <Form name="headForm" layout="vertical">
          <Flex
            justify="space-between"
            align=""
            style={{ height: "fit-content" }}
          >
            <Form.Item>
              <Input
                prefix={
                  <IoSearch
                    size={20}
                    color={themes.default.colors.primaryColor}
                  />
                }
                placeholder="Nhập dữ liệu để tìm kiếm"
                style={{ width: 360 }}
                onChange={handleSearch}
              />
            </Form.Item>
            <Button type="primary">Xuất file Excel</Button>
          </Flex>
        </Form>
      </Flex>
      <S.Container>
        <Form layout="vertical">
          <Form.Item>
            <Table
              columns={columns}
              dataSource={scannedData}
              loading={isFetching}
              rowKey={(record) => record._id}
              scroll={{ y: screens.xxl ? 1000 : 500 }}
              size="small"
              bordered={false}
              pagination={false}
              sticky
              showSorterTooltip={{ target: "sorter-icon" }}
            ></Table>
          </Form.Item>
        </Form>
      </S.Container>
    </S.MainContainerWrapper>
  );
}

export default ScanAllModules;
