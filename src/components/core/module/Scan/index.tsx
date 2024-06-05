"use client";
import moment from "moment";
import {useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { TbReload } from "react-icons/tb";

import { themes } from "@/styles/themes";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Grid,
  message,
  Row,
  TableProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Typography from "../../common/Typography";
import * as S from "./scan.styles";

import { ScanInfor } from "@/helpers/types";
import {
  useAllCheckinQuery,
  useAllCheckoutQuery,
  useScanCheckinMutation,
  useScanCheckoutMutation,
} from "@/store/services/scan";
import TableCheckin from "./TableCheckin";
import TableCheckout from "./TableCheckout";
import useModal from "@/hooks/useModal";
import HandEnterModal from "./HandEnterModal";
import { useRouter } from "next-nprogress-bar";

function ScanModule() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOutSide, setIsOutSide] = useState<boolean>(false);
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);

  const router = useRouter();

  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const [inputData, setInputData] = useState<string | null>("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [scanCheckin, { isLoading }] = useScanCheckinMutation();
  const [scanCheckout] = useScanCheckoutMutation();

  const handleOnChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputData(event.target.value);
  };

  const handleSubmitScan = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    try {
      if (event.key === "Enter") {
        if (isCheckOut) {
          await scanCheckout({ data: inputData! }).unwrap();
          setIsRefresh(!isRefresh);
          message.success("Đã lưu thành công");
          setInputData("");
          return;
        }
        await scanCheckin({ data: inputData! }).unwrap();
        setIsRefresh(!isRefresh);
        message.success("Đã lưu thành công");
        setInputData("");
      }
    } catch (error) {
      message.error("Xảy ra lỗi trong quá trình lưu dữ liệu");
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
    const handleScannerInput = (event: KeyboardEvent) => {
      // Check for the Enter key (keyCode 13)
      if (event.key === "Enter") {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }
    };
    document.addEventListener("keydown", handleScannerInput);

    return () => {
      document.removeEventListener("keydown", handleScannerInput);
    };
  }, []);

  const handleMouseLeave = () => {
    setIsOutSide(true);
    message.warning("Trỏ chuột đang bên ngoài khu vực nhập dữ liệu");
  };

  const { visible, closeModal, modalState, openModal } = useModal();

  return (
    <S.MainContainerWrapper>
      <S.Head>
        <Flex gap={20} vertical={screens.xs ? true : false}>
          <Typography.Title
            level={4}
            $fontWeight={700}
            $color={themes.default.colors.primaryDark}
          >
            Thêm dữ liệu mới từ máy quét
          </Typography.Title>
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
        <Flex gap={16}>
          <Button
            style={{ width: "fit-content" }}
            type="primary"
            title="Nhập tay"
            onClick={() => {
              openModal();
            }}
          >
            Nhập tay
          </Button>
          <Button
            style={{ width: "fit-content" }}
            type="primary"
            title="Nhập tay"
            onClick={() => {
              router.push('/change-infor')
            }}
          >
            Chỉnh sửa thông tin
           </Button>
          <Button
            style={{ width: "fit-content" }}
            type="default"
            title="Refresh"
            onClick={() => {
              setIsRefresh(!isRefresh);
            }}
          >
            <TbReload
              size={18}
              style={{ display: "flex", alignItems: "center" }}
            />
          </Button>
        </Flex>
      </S.Head>
      <Flex vertical>
        <Form name="inputForm" layout="vertical">
          <Form.Item
            label={
              isOutSide ? (
                <Typography.Text $color={themes.default.colors.errorDark}>
                  Hãy đưa trỏ chuột nào đây
                </Typography.Text>
              ) : (
                "Khu vực tiếp nhận thông tin từ máy quét"
              )
            }
          >
            <TextArea
              rows={2}
              ref={textAreaRef}
              onBlur={handleMouseLeave}
              onFocus={() => setIsOutSide(false)}
              onChange={(event) => handleOnChangeTextarea(event)}
              value={inputData ?? ""}
              onKeyDown={(event) => handleSubmitScan(event)}
            />
          </Form.Item>
        </Form>
      </Flex>
      <S.Container>
        <Row gutter={16}>
          <Col xs={24} xxl={24}>
            <Typography.Text $fontWeight={600} id="checkin">
              Dữ liệu{" "}
              <span style={{ color: themes.default.colors.primaryColor }}>
                CHECK IN
              </span>{" "}
              được thêm mới gần đây
            </Typography.Text>
            <TableCheckin isRefresh={isRefresh} />
          </Col>
          <Col xs={24} xxl={24} style={{ marginTop: "20px" }}>
            <Typography.Text $fontWeight={600} id="checkout">
              Dữ liệu{" "}
              <span style={{ color: themes.default.colors.primaryColor }}>
                CHECK OUT
              </span>{" "}
              được thêm mới gần đây
            </Typography.Text>

            <TableCheckout isRefresh={isRefresh} />
          </Col>
        </Row>
      </S.Container>
      <HandEnterModal
        visible={visible}
        closeModal={closeModal}
        modalState={modalState}
        isCheckOut={isCheckOut}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
      />
    </S.MainContainerWrapper>
  );
}

export default ScanModule;
