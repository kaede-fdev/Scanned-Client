import { MenuProps } from "antd";
import { TbGridScan } from "react-icons/tb";
import React from "react";

export const sidebarMenu: MenuProps["items"] = [
  {
    key: "scan-tab",
    icon: React.createElement(TbGridScan),
    label: "Scan",
    children: [
        {
            key: 'scan',
            label: "Quét mới",
        },
        {
            key: 'scan-all',
            label: "Tất cả dữ liệu",
        }
    ]
  },
];
