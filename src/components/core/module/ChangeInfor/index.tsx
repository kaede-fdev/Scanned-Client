"use client";
import React, { useState } from "react";
import * as S from "./changeinfor.styles";
import Typography from "../../common/Typography";
import { themes } from "@/styles/themes";
import { Button, Col, Flex, Form, Grid, Input, Row } from "antd";
import { IoSearch } from "react-icons/io5";
import TableOfCheckinForEdit from "./TableOfCheckin";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/queryString";
import _ from "lodash";
import TableOfCheckoutForEdit from "./TableOfCheckout";

function ChangeInforModules() {
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
  const router = useRouter();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(createQueryString("search", `${e?.target?.value}`));
  }, 300);

  return (
    <S.MainContainerWrapper>
      <S.Head>
        <Typography.Title
          level={4}
          $fontWeight={700}
          $color={themes.default.colors.primaryDark}
        >
          Chỉnh sửa thông tin
        </Typography.Title>
      </S.Head>

      <Flex>
        <Form name="headForm" layout="vertical">
          <Flex
            justify="space-between"
            style={{ height: "fit-content" }}
            vertical={screens.xs ? true : false}
          >
            <Flex gap={20}>
              <Form.Item>
                <Input
                  prefix={
                    <IoSearch
                      size={20}
                      color={themes.default.colors.primaryColor}
                    />
                  }
                  placeholder="Nhập dữ liệu để tìm kiếm"
                  style={{ width: screens.xs ? "100%" : 360 }}
                  onChange={handleSearch}
                />
              </Form.Item>
              <Flex gap={20}>
                <Button
                  onClick={() => {
                    setIsCheckOut(false);
                    router.push("#checkin");
                  }}
                  type={!isCheckOut ? "primary" : "default"}
                >
                  CHECK IN
                </Button>
                <Button
                  onClick={() => {
                    setIsCheckOut(true);
                    router.push("#checkout");
                  }}
                  type={isCheckOut ? "primary" : "default"}
                >
                  CHECK OUT
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Flex>
      <S.Container>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Text $fontWeight={600} id="checkin">
              Dữ liệu{" "}
              <span style={{ color: themes.default.colors.primaryColor }}>
                CHECK IN
              </span>{" "}
            </Typography.Text>
            <TableOfCheckinForEdit
              isRefresh={isRefresh}
              search={search}
              setIsRefresh={setIsRefresh}
            />
          </Col>
          <Col span={24}>
            <Typography.Text $fontWeight={600} id="checkout">
              Dữ liệu{" "}
              <span style={{ color: themes.default.colors.primaryColor }}>
                CHECK OUT
              </span>{" "}
            </Typography.Text>
            <TableOfCheckoutForEdit
              isRefresh={isRefresh}
              search={search}
              setIsRefresh={setIsRefresh}
            />
          </Col>
        </Row>
      </S.Container>
    </S.MainContainerWrapper>
  );
}

export default ChangeInforModules;
