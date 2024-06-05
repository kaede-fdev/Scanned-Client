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
      <Card bordered style={{ width: 400 }}>
        <Flex vertical gap={20}>
          <Typography.Title
            level={3}
            $fontWeight={700}
            $color={themes.default.colors.primaryDarker}
            $align="center"
          >
            ĐĂNG NHẬP
          </Typography.Title>
          <Flex align="center" style={{ cursor: "pointer" }} justify="center">
            <IoScanCircle
              style={{ color: themes.default.colors.primaryDarker }}
              size={38}
            />
            <Typography.Title
              level={3}
              $fontWeight={700}
              $color={themes.default.colors.primaryDarker}
            >
              Scan
            </Typography.Title>
          </Flex>
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
                <Button loading={isLoading} htmlType="submit" type="primary">
                  Đăng nhập
                </Button>
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