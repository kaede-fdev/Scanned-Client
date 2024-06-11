import ChangeInforModules from "@/components/core/module/ChangeInfor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sửa thông tin | Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
  description: "Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
};

function ChangeInfo() {
  return <ChangeInforModules />;
}

export default ChangeInfo;
