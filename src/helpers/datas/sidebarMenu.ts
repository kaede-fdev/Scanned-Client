import { MenuProps } from "antd";
import { TbGridScan } from "react-icons/tb";
import React from "react";
import { FaUsersCog } from "react-icons/fa";

export const sidebarMenu: MenuProps["items"] = [
  {
    key: "scan-tab",
    icon: React.createElement(TbGridScan),
    label: "Thông tin",
    children: [
      {
        key: "scan",
        label: "Quét mới",
      },
      {
        key: "change-infor",
        label: "Chỉnh sửa thông tin",
      },
      {
        key: "scan-all",
        label: "Tất cả dữ liệu",
      },
    ],
  },
  {
    key: "users",
    icon: React.createElement(FaUsersCog),
    label: "Quản lý",
    children: [
      {
        key: "create-user",
        label: "Tạo người dùng",
      },
      {
        key: "user-management",
        label: "Quản lý người dùng",
      },
      // {
      //   key: "bans-management",
      //   label: "Quản lý phòng ban",
      // },
    ],
  },
];

export const sidebarMenuUser: MenuProps["items"] = [
  {
    key: "scan-tab",
    icon: React.createElement(TbGridScan),
    label: "Quét",
    children: [
      {
        key: "scan",
        label: "Quét mới",
      },
      {
        key: "change-infor",
        label: "Chỉnh sửa thông tin",
      },
      {
        key: "scan-all",
        label: "Tất cả dữ liệu",
      },
    ],
  },
];
