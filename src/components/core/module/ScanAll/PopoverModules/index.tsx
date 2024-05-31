"use client";

import Typography from "@/components/core/common/Typography";
import { ScanInfor } from "@/helpers/types";
import { themes } from "@/styles/themes";
import { Avatar, Card, Flex, Popover } from "antd";
import React, { useState } from "react";

type TProps = {
  record: ScanInfor;
};

function PopoverModule({ record }: TProps) {
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  return (
    <Popover
      trigger="click"
      open={isShowUser}
      onOpenChange={() => setIsShowUser(!isShowUser)}
      placement="bottomRight"
      
      content={
        <div>
          <Flex vertical>
            <Flex gap={10} align="center">
              <Avatar
                src={record.scannedBy.avatar}
                alt="avatar"
                size={"large"}
              />
              <Flex vertical>
                <Typography.Title level={5} $fontWeight={600} $color={themes.default.colors.primary}>
                  {record.scannedBy.firstname && record.scannedBy.lastname
                    ? `${record.scannedBy.firstname} ${record.scannedBy.lastname}`
                    : record.scannedBy.email}
                </Typography.Title>
                <Typography.Text>{record.scannedBy.position ?? "Không có chức vụ"}</Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </div>
      }
    >
      <Typography.Text style={{cursor: "pointer"}}>
        {record.scannedBy.firstname && record.scannedBy.lastname
          ? `${record.scannedBy.firstname} ${record.scannedBy.lastname}`
          : record.scannedBy.email}
      </Typography.Text>
    </Popover>
  );
}

export default PopoverModule;
