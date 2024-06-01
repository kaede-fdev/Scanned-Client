"use client";
import React, { useEffect, useState } from "react";

import * as S from "./createuser.styles";
import Typography from "../../common/Typography";

import { themes } from "@/styles/themes";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  FormProps,
  Grid,
  Input,
  message,
  Row,
  Select,
  Table,
  TableProps,
} from "antd";
import {
  useCreateUserMutation,
  useGetAllUserQuery,
} from "@/store/services/user";
import { UserInfor } from "@/helpers/types";
import { useSearchParams } from "next/navigation";
import { TbReload } from "react-icons/tb";

type FieldType = {
  email: string;
  fistname: string;
  lastname: string;
  position: string;
  isAdmin: false;
};

function CreateUserModule() {
  const [form] = Form.useForm();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { recentCreatedUser, isFetching, refetch } = useGetAllUserQuery(
    { search: search, limit: 8 },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          recentCreatedUser: data?.data?.users ?? [],
          isFetching,
        };
      },
    }
  );

  useEffect(() => {refetch()}, [])

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const users = [values];
      const res = await createUser({
        users: users,
      }).unwrap();
      form.resetFields();
      message.success("Tạo tài khoản thành công");
      await refetch()
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };


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
        return <Typography.Text>{record?.firstname}</Typography.Text>;
      },
      sorter: (one, two) => one.firstname.localeCompare(two.firstname),
    },
    {
      title: "Tên",
      dataIndex: "",
      key: "lastname",
      width: 100,
      render: (value, record) => {
        return <Typography.Text>{record?.lastname}</Typography.Text>;
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
          return <Typography.Text>{record?.phone}</Typography.Text>;
        },
        sorter: (one, two) => one?.phone?.localeCompare(two?.phone),
      },
    {
      title: "Chức vụ",
      dataIndex: "",
      key: "position",
      width: 140,
      render: (value, record) => {
        return <Typography.Text>{record?.position}</Typography.Text>;
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
          Tạo người dùng mới
        </Typography.Title>
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
      </S.Head>
      <S.Container>
        <Row gutter={20}>
          <Col xs={24} lg={8}>
            <Flex vertical>
              <S.CustomCard>
                <Form
                  name="createNewUser"
                  layout="vertical"
                  onFinish={onFinish}
                  form={form}
                  initialValues={{ isAdmin: false }}
                >
                  <Form.Item
                    label="Họ"
                    name="firstname"
                    rules={[
                      { required: true, message: "Họ không được để trống" },
                    ]}
                  >
                    <Input placeholder="Ví dụ: Nguyễn" />
                  </Form.Item>
                  <Form.Item
                    label="Tên"
                    name="lastname"
                    rules={[
                      { required: true, message: "Tên không được để trống" },
                    ]}
                  >
                    <Input placeholder="Ví dụ: Văn A" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Email không được để trống" },
                    ]}
                  >
                    <Input placeholder="Ví dụ: email@gmail.com" />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại (mật khẩu mặc định)"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Số điện thoại không được để trống",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập số điên thoại" />
                  </Form.Item>
                  <Form.Item label="Chức vụ" name="position">
                    <Input placeholder="Ví dụ: Nhân viên" />
                  </Form.Item>
                  <Form.Item label="Loại tài khoản" name="isAdmin">
                    <Select>
                      <Select.Option value={false}>Người dùng</Select.Option>
                      <Select.Option value={true}>Admin</Select.Option>
                    </Select>
                  </Form.Item>
                  <Flex justify="space-between">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button type="dashed" onClick={() => form.resetFields()}>
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button type="primary" htmlType="submit" loading={isLoading} >
                        Tạo ngay
                      </Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </S.CustomCard>
            </Flex>
          </Col>
          <Col xs={24} lg={16}>
            <Form layout="vertical" style={{marginTop: screens.xs ? "20px" : "0px"}}>
              <Form.Item label="Người dùng đã được tạo gần đây">
                <Table
                  columns={columns}
                  dataSource={recentCreatedUser}
                  loading={isFetching}
                  rowKey={(record) => record._id}
                  scroll={{ x: screens.xxl ? 1000 : 600 }}
                  size="small"
                  bordered={false}
                  pagination={false}
                  sticky
                  showSorterTooltip={{ target: "sorter-icon" }}
                ></Table>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </S.Container>
    </S.MainContainerWrapper>
  );
}

export default CreateUserModule;
