import ScanModule from "@/components/core/module/Scan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CHECKIN | Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
  description: "Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
};
function Scan() {
  return <ScanModule />;
} 

export default Scan;
