'use client'

import Typography from "@/components/core/common/Typography"
import { themes } from "@/styles/themes"
import { Button, Flex } from "antd"
import { useRouter } from "next-nprogress-bar"
import styled from "styled-components"

 
export default function NotFound() {
  const router = useRouter();

  return (
    <html>
      <body>
          <Wrapper>
            <Flex vertical gap={20} justify="center" align="center">
              <Typography.Title level={1} $fontWeight={700} $color={themes.default.colors.primary}>404-Trang không tồn tại</Typography.Title>
              <Button type="default" style={{width: "fit-content"}} onClick={() => router.push('/scan')}>Quay lại trang chủ</Button>
            </Flex>
          </Wrapper>
      </body>
    </html>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
1