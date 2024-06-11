import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./provider";
import { ConfigProvider } from "antd";
import './global.styles.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
  description: "Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
  icons: "/icons/layout/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ConfigProvider>
          <Providers>{children}</Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
