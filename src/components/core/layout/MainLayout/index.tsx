"use client";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Flex,
  Grid,
  Layout,
  Menu,
  message,
  Popover,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import React, { useCallback, useLayoutEffect, useState } from "react";
import { AppProgressBar, useRouter } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";

import * as S from "./main.styles";
import DropDownUser from "./DropdownUser";

import Typography from "@/components/core/common/Typography";
import { sidebarMenu, sidebarMenuUser } from "@/helpers/datas/sidebarMenu";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { constants } from "@/settings";
import { assignUserInfo } from "@/store/features/auth";
import { useVerifyMutation } from "@/store/services/auth";
import { themes } from "@/styles/themes";
import webStorageClient from "@/utils/webStorageClient";
import AppLogo from "@/public/icons/layout/logo.png";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [verify] = useVerifyMutation();
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [collapse, setCollapse] = useState<boolean>(false);
  const { userInfo } = useAppSelector((state) => state.auth);

  const handleVerifyToken = useCallback(async () => {
    try {
      if (!webStorageClient.get(constants.ACCESS_TOKEN)) {
        message.error("Bạn không có quyền truy cập trang này");
        throw new Error("Ban không có quyền truy cập trang này");
      }
      const res: any = await verify(undefined).unwrap();
      setIsAdmin(res?.data?.isAdmin);

      dispatch(
        assignUserInfo({
          id: res?.data?._id,
          email: res?.data?.email,
          firstname: res?.data?.firstname,
          lastname: res?.data?.lastname,
          avatar: res?.data?.avatar,
        })
      );
    } catch (error) {
      webStorageClient.removeAll();
      router.push(`/sign-in`);
    }
  }, [verify, router]);

  useLayoutEffect(() => {
    handleVerifyToken();
  }, [handleVerifyToken]);

  const sideBarMenuFormat = sidebarMenu?.map((item: any) => ({
    ...item,
    label: item.label,
    icon: item.icon,
    children: item.children.map((child: any) => {
      return {
        key: child.key,
        label: <Link href={`/${child.key}`}>{child.label}</Link>,
      };
    }),
  }));

  const sideBarMenuFormatForUser = sidebarMenuUser?.map((item: any) => ({
    ...item,
    label: item.label,
    icon: item.icon,
    children: item.children.map((child: any) => {
      return {
        key: child.key,
        label: <Link href={`/${child.key}`}>{child.label}</Link>,
      };
    }),
  }));

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <AppProgressBar
        height="4px"
        color={themes.default.colors.primary}
        options={{ showSpinner: false }}
        shallowRouting
      />
      <S.HeaderCustom>
        <Flex justify="center" align="center">
          <Button
            type="link"
            icon={
              collapse ? (
                <MenuUnfoldOutlined
                  style={{
                    fontSize: "24px",
                    color: "white",
                  }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{
                    fontSize: "24px",
                    color: "white",
                  }}
                />
              )
            }
            onClick={() => setCollapse(!collapse)}
            style={{
              width: 64,
              height: 64,
            }}
          >
            {""}
          </Button>
          <Flex align="center" gap={16}>
            <Image
              src={AppLogo}
              alt="image"
              width={200}
              height={200}
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => setCollapse(!collapse)}
            />
            {screens.md ? (
              <Typography.Text $color="white" $fontWeight={700}>
                Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng
              </Typography.Text>
            ) : null}
          </Flex>
        </Flex>
        <Flex align="center">
          <Popover
            trigger={"click"}
            open={isShowDropDown}
            onOpenChange={() => setIsShowDropDown(!isShowDropDown)}
            placement="bottomRight"
            content={<DropDownUser />}
          >
            <Flex style={{ cursor: "pointer" }}>
              <Avatar
                size={40}
                src={
                  <Image
                    src={userInfo.avatar ?? ""}
                    alt="avatar"
                    width={64}
                    height={64}
                  />
                }
              />
            </Flex>
          </Popover>
          <Button type="text">
            {screens.xs ? (
              <IoIosLogOut color={themes.default.colors.text5} size={24} />
            ) : (
              <Typography.Text
                $color="white"
                $fontWeight={500}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  webStorageClient.removeAll();
                  router.push("/sign-in");
                }}
              >
                Đăng xuất
              </Typography.Text>
            )}
          </Button>
        </Flex>
      </S.HeaderCustom>
      <Layout>
        <Sider
          trigger={null}
          width={200}
          style={{
            background: "#fff",
            position: screens.xs ? "absolute" : undefined,
            height: screens.xs ? "calc(100vh - 54px)" : "",
            zIndex: screens.xs ? "10" : undefined,
          }}
          breakpoint="xl"
          collapsed={collapse}
          collapsedWidth={screens?.sm == true ? 80 : 0}
          onCollapse={() => setCollapse(!collapse)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["scan"]}
            defaultOpenKeys={["scan-tab"]}
            defaultActiveFirst
            items={
              isAdmin && webStorageClient.get(constants.IS_ADMIN)
                ? sideBarMenuFormat
                : sideBarMenuFormatForUser
            }
          />
        </Sider>
        <Layout
          style={{
            padding: "10px 10px",
          }}
        >
          {screens.xs && !collapse ? (
            <S.OverLay
              onClick={() => {
                setCollapse(!collapse);
              }}
            />
          ) : null}
          <Content
            style={{
              padding: 16,
              margin: 0,
              minHeight: 280,
              background: "#fff",
              borderRadius: "12px",
            }}
          >
            {children}
          </Content>
          <S.FooterCustom>
            <p>&copy; 2024 Công an quận Hai Bà Trưng - Hà Nội. All rights reserved.</p>
          </S.FooterCustom>
        </Layout>
      </Layout>
    </Layout>
  );
}
