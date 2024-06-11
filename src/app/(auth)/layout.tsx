import { constants } from "@/settings";
import { checkToken } from "@/utils/checkToken";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default async function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie(constants.ACCESS_TOKEN, { cookies });


  if (token) {
    redirect(`/scan`);
  }
  return <div>{children}</div>;
}
