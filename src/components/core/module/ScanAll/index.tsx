"use client";

import { Button, Col, DatePicker, Flex, Form, Grid, Input, Modal, Row } from "antd";
import _ from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiFileExcel2Fill } from "react-icons/ri";
import { TbReload } from "react-icons/tb";

import Typography from "@/common/Typography";
import { themes } from "@/styles/themes";
import { createQueryString } from "@/utils/queryString";

import * as S from "./scanall.styles";
import TableOfCheckinData from "./TableOfCheckinData";
import TableOfCheckoutData from "./TableOfCheckoutData";
import useModal from "@/hooks/useModal";
import dayjs from "dayjs";
import ExportModal from "./ExportModal";

function ScanAllModules() {
  const router = useRouter();
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const { visible, toggle, closeModal, modalState, openModal } = useModal();

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
          Tất cả dữ liệu đã quét
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
              {/* <Flex gap={20}>
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
              </Flex> */}
            </Flex>
            <Flex gap={20} justify="space-between">
              <Button
                style={{ width: "fit-content" }}
                type="default"
                title="Refresh"
                onClick={() => setIsRefresh(!isRefresh)}
              >
                <TbReload
                  size={18}
                  style={{ display: "flex", alignItems: "center" }}
                />
              </Button>
              <Button
                style={{ alignItems: "center", display: "flex" }}
                icon={<RiFileExcel2Fill size={16} />}
                type="primary"
                onClick={() => openModal()}
              >
                Xuất file Excel
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Flex>
      <S.Container>
        <Row gutter={16}>
          <Col xs={24} xxl={24}>
            <Typography.Text $fontWeight={600} id="checkin">
              Dữ liệu đã{" "}
              <span style={{ color: themes.default.colors.primaryColor }}>
                CHECK IN
              </span>{" "}
            </Typography.Text>
            <TableOfCheckinData isRefresh={isRefresh} search={search} />
          </Col>
          {/* <Col xs={24} xxl={24} style={{ marginTop: "20px" }}>
            <Typography.Text $fontWeight={600} id="checkout">
              Dữ liệu{" "}
              <span style={{ color: themes.default.colors.primaryColor }}>
                CHECK OUT
              </span>{" "}
            </Typography.Text>

            <TableOfCheckoutData isRefresh={isRefresh} search={search} />
          </Col> */}
        </Row>
      </S.Container>

      <ExportModal closeModal={closeModal}  visible = {visible} modalState={modalState}/>
    </S.MainContainerWrapper>
  );
}

export default ScanAllModules;
