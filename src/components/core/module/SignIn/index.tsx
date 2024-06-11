"use client";
import React from "react";

import * as S from "./signin.styles";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  FormProps,
  Input,
  message,
} from "antd";
import Typography from "@/components/core/common/Typography";
import { themes } from "@/styles/themes";
import Link from "next/link";
import { useSignInMutation } from "@/store/services/auth";
import { useRouter } from "next-nprogress-bar";
import { IoScanCircle } from "react-icons/io5";
import webStorageClient from "@/utils/webStorageClient";
import { constants } from "@/settings";
import Image from "next/image";

import AppLogo from "@/public/icons/layout/logo.png"

type FieldType = {
  email: string;
  password: string;
  remember: boolean;
};

function SignInModule() {
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const postData = {
        email: values.email,
        password: values.password,
      };
      const res: any = await signIn(postData).unwrap();
      webStorageClient.set(constants.IS_ADMIN, res?.data?.user?.isAdmin);
      if (values.remember) {
        webStorageClient.set(constants.IS_ADMIN, res?.data?.user?.isAdmin, {
          expires: 30,
        });
        webStorageClient.set(constants.ACCESS_TOKEN, res?.data?.token, {
          expires: 30,
        });
      }
      message.success("Đăng nhập thành công");
      router?.push(`scan`);
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  return (
    <S.Wrapper>
      <Card style={{ width: 540, border:"none" }}>
        <Flex vertical gap={20}>
          <Flex align="center" justify="center" vertical>
            <Image src={AppLogo} width={1200} height={900} style={{
              objectFit: "contain",
              width: 150,
              height: 150
            }} alt="image"/>
                <Typography.Title
            level={3}
            $fontWeight={800}
            $color={themes.default.colors.primaryDarker}
            $align="center"
          >
            {
              " Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng".toUpperCase()
            }
          </Typography.Title>

          </Flex>

          <Typography.Title
            level={3}
            $fontWeight={800}
            $color={themes.default.colors.primaryDark}
            $align="center"
          >
            ĐĂNG NHẬP
          </Typography.Title>

          <Flex vertical>
            <Form
              name="loginForm"
              initialValues={{ isRemmeber: false }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item<FieldType>
                label="Email"
                name="email"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Email không được để trống" },
                ]}
              >
                <Input
                  placeholder={"Nhập email"}
                  autoComplete="current-password"
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Mật khẩu không được để trống" },
                ]}
              >
                <Input.Password
                  placeholder={"Nhập mật khẩu"}
                  autoComplete="current-password"
                />
              </Form.Item>
              <Col span={24}>
                <Flex align="flex-start" justify="space-between">
                  <Form.Item<FieldType>
                    wrapperCol={{ span: 24 }}
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                  </Form.Item>
                </Flex>
              </Col>
              <Form.Item>
                <Flex justify="center">
                  <Button loading={isLoading} htmlType="submit" type="primary">
                    Đăng nhập
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
            <Flex align="flex-start" justify="space-between">
              <Link href={"#"}>Quên mật khẩu?</Link>
              <Typography.Text>
                Chưa có tài khoản? <Link href={"/sign-up"}>Đăng ký</Link>
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </S.Wrapper>
  );
}

export default SignInModule;
