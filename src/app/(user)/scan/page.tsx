import ScanModule from "@/components/core/module/Scan";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm mới",
};


function Scan() {
  return <ScanModule />;
}

export default Scan;
