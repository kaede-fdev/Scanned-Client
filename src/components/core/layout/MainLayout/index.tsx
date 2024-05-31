"use client";

import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Grid, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import React, { useState } from "react";
import * as S from "./main.styles";

import { IoScanCircle } from "react-icons/io5";
import Typography from "@/components/core/common/Typography";
import { AppProgressBar, useRouter } from "next-nprogress-bar";
import { themes } from "@/styles/themes";
import { sidebarMenu } from "@/helpers/datas/sidebarMenu";
import { keyBy } from "lodash";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();



  const demoitems2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );
  const [collapse, setCollapse] = useState<boolean>(false);

  const sideBarMenuFormat = sidebarMenu?.map((item: any) => ({
    ...item,
    label: item.label,
    icon: item.icon,
    children: item.children.map((child:any) => {
      return {
        key: child.key,
        label: <Link href={`/${child.key}`}>{child.label}</Link>
      }
    })
  }));

  //implement dashboard here
  //todo customize in need
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
          {/* <Button
            type="text"
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
          </Button> */}
          <Flex align="center" style={{cursor: "pointer"}} onClick={() => setCollapse(!collapse)}>
            <IoScanCircle style={{ color: "white" }} size={38} />
            <Typography.Title level={3} $color="white">Scan</Typography.Title>
          </Flex>
        </Flex>
      </S.HeaderCustom>
      <Layout>
        <Sider
          trigger={null}
          width={200}
          style={{
            background: "#fff",
          }}
          breakpoint="sm"
          collapsed={collapse}
          collapsedWidth={screens?.sm == true ? 80 : 0}
          onCollapse={() => setCollapse(!collapse)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['scan']}
            defaultOpenKeys={['scan-tab']}
            defaultActiveFirst
            items={sideBarMenuFormat}
          />
        </Sider>
        <Layout
          style={{
            padding: "16px 16px",
          }}
        >
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
        </Layout>
      </Layout>
    </Layout>
  );
}
