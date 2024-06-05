"use client"
import React from "react";
import * as S from "./banmanagement.styles";
import Typography from "../../common/Typography";
import { themes } from "@/styles/themes";
import { Col, Row } from "antd";
import CreateBan from "./CreateBan";
import CreateBanManager from "./CreateBanManager";

function BansManagementModules() {
  return (
    <S.MainContainerWrapper>
      <S.Head>
        <Typography.Title
          level={4}
          $fontWeight={700}
          $color={themes.default.colors.primaryDark}
        >
          Quản lý phòng ban
        </Typography.Title>
      </S.Head>
      <S.Container>
        <Row gutter={20}>
          <Col span={10}>
            <CreateBan/>
          </Col>
          <Col span={14}>
            <CreateBanManager/>
          </Col>
        </Row>
      </S.Container>
    </S.MainContainerWrapper>
  );
}

export default BansManagementModules;
