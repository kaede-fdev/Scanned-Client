import SignInModule from "@/components/core/module/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Đăng nhập",
};

export default function SignIn() {
  return <SignInModule/>
}
