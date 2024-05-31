import MainLayout from "@/components/core/layout/MainLayout";
import { constants } from "@/settings";
import { checkToken } from "@/utils/checkToken";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie(constants.ACCESS_TOKEN, { cookies });

  console.log(token);

  if (!token) {
    redirect(`/sign-in`);
  }

  return <MainLayout>{children}</MainLayout>;
}
