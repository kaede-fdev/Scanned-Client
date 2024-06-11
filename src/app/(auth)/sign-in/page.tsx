import SignInModule from "@/components/core/module/SignIn";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Đăng nhập | Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng",
  description: "Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng",
};


export default function SignIn() {
  return <SignInModule/>
}
