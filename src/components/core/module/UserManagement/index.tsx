"use client";
import React, { useEffect, useState } from "react";

import * as S from "./usermanagement.styles";
import Typography from "../../common/Typography";
import { themes } from "@/styles/themes";
import {
  Button,
  Flex,
  Form,
  Grid,
  Input,
  message,
  Select,
  Space,
  Switch,
  Table,
  TableProps,
} from "antd";
import { TbReload } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import _ from "lodash";
import { createQueryString } from "@/utils/queryString";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useDeleteByIdMutation, useEditUserMutation, useGetAllUserQuery } from "@/store/services/user";
import { useRouter } from "next-nprogress-bar";
import { UserInfor } from "@/helpers/types";
import { FaCheck } from "react-icons/fa";

function UserManagementModule() {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [editUser, {isLoading}] = useEditUserMutation();
  const [deleteById] = useDeleteByIdMutation();

  const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(createQueryString("search", `${e?.target?.value}`));
  }, 300);

  const { users, isFetching, refetch } = useGetAllUserQuery(
    {
      search: search,
      limit: undefined,
    },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          users: data?.data?.users ?? [],
          isFetching,
        };
      },
    }
  );

  useEffect(() => {
    refetch();
  },[])

  const HandleField = (value: any, record: any, type: string) => {
    const newEdit = {
      ...record,
      [type]: value,
    };
    handleEditUser(newEdit);
};
  const handleEditUser = async (data: any) => {
    try {
        const res = await editUser(data);
    } catch (error) {
        message.error("Xảy ra lỗi trong quá trình thay đổi thông tin user")
    }
  }
  const handleDeleteById = async (_id: string, fullname: string) => {
    try {
        const res = await deleteById(_id).unwrap();
        message.success(`Xóa tài khoản ${fullname} thành công`)
        await refetch();
    } catch (error) {
        message.error("Xảy ra lỗi trong quá trình xóa tài khoản")
    }
  }

  const columns: TableProps<UserInfor>["columns"] = [
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
      title: "Họ",
      dataIndex: "",
      key: "firstname",
      width: 80,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value.firstname}
              onChange={(event) => {
                HandleField(event.target.value, record, "firstname");
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.firstname.localeCompare(two.firstname),
    },
    {
      title: "Tên",
      dataIndex: "",
      key: "lastname",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value.lastname}
              onChange={(event) => {
                HandleField(event.target.value, record, "lastname");
              }}
            />
          </Space.Compact>
        );
      },
      sorter: (one, two) => one.lastname.localeCompare(two.lastname),
    },

    {
      title: "Email",
      dataIndex: "",
      key: "email",
      width: 140,
      render: (value, record) => {
        return <Typography.Text>{record?.email}</Typography.Text>;
      },
      sorter: (one, two) => one.email.localeCompare(two.email),
    },
    {
      title: "Số điện thoại",
      dataIndex: "",
      key: "phone",
      width: 140,
      render: (value, record) => {
        return  <Space.Compact style={{ width: "100%" }}>
        <Input
          defaultValue={value.phone}
          onChange={(event) => {
            HandleField(event.target.value, record, "phone");
          }}
        />
      </Space.Compact>
      },
      sorter: (one, two) => one?.phone?.localeCompare(two?.phone),
    },
    {
      title: "Vai trò",
      dataIndex: "",
      key: "isAdmin",
      width: 100,
      render: (value, record) => {
        return (
          <Select defaultValue={value.isAdmin} onChange={(isAdmin: any) => {
            HandleField(isAdmin, record, "isAdmin")
          }}>
            <Select.Option value={false}>Người dùng</Select.Option>
            <Select.Option value={true}>Admin</Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Chức vụ",
      dataIndex: "",
      key: "position",
      width: 100,
      render: (value, record) => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue={value.position}
              onChange={(event) => {
                HandleField(event.target.value, record, "position");
              }}
            />
          </Space.Compact>
        );
      },
    },
    {
      title: "Hoạt động",
      dataIndex: "",
      key: "isActive",
      width: 120,
      render: (value, record) => {
        return (
          <Flex align="center" gap={10}>
            <Switch
              defaultValue={value.isActive}
              onChange={(check: boolean) => {
                HandleField(check, record, "isActive");
                refetch();
              }}
            />
            <Typography.Text>
              {value.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
            </Typography.Text>
          </Flex>
        );
      },
    },
    {
        title: "",
        dataIndex: "",
        key: "",
        width: 50,
        render: (value, record) => {
          return (
            <Flex align="center" gap={10}>
                <Button type="primary" danger onClick={() => handleDeleteById(record._id, `${record?.firstname} ${record?.lastname}`)}>Xoá</Button>
            </Flex>
          );
        },
      },
  ];

  return (
    <S.MainContainerWrapper>
      <S.Head>
        <Typography.Title
          level={4}
          $fontWeight={700}
          $color={themes.default.colors.primaryDark}
        >
          Quản lý người dùng
        </Typography.Title>
      </S.Head>
      <Flex>
        <Form name="headForm" layout="vertical">
          <Flex
            justify="space-between"
            style={{ height: "fit-content" }}
            vertical={screens.xs ? true : false}
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
                style={{ width: screens.xs ? "100%" : 360 }}
                onChange={handleSearch}
              />
            </Form.Item>
            <Flex gap={20} justify="space-between">
              <Button
                style={{ width: "fit-content" }}
                type="default"
                title="Refresh"
                onClick={refetch}
              >
                <TbReload
                  size={18}
                  style={{ display: "flex", alignItems: "center" }}
                />
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Flex>
      <S.Container>
        <Form layout="vertical">
          <Form.Item>
            <Table
              columns={columns}
              dataSource={users}
              loading={isFetching}
              rowKey={(record) => record._id}
              scroll={{ y: screens.xxl ? 1000 : 600 }}
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

export default UserManagementModule;
