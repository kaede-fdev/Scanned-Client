"use client";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { TbReload } from "react-icons/tb";

import * as S from "./scan.styles";
import Typography from "../../common/Typography";
import { themes } from "@/styles/themes";
import {
  Button,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  message,
  Row,
  Table,
  TableProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { ScanInfor } from "@/helpers/types";
import { useAllOnUserQuery, useScanMutation } from "@/store/services/scan";

function ScanModule() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOutSide, setIsOutSide] = useState<boolean>(false);

  const [inputData, setInputData] = useState<string | null>("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { scannedData, isFetching, refetch } = useAllOnUserQuery(
    {
      limit: 10,
      search: search,
    },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          scannedData: data?.data?.scanneds ?? [],
          isFetching,
        };
      },
    }
  );
  
  useEffect(() => {
    refetch();
  }, [])
  
  const [scan, { isLoading }] = useScanMutation();

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
        await scan({ data: inputData! }).unwrap();
        refetch();
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

  const columns: TableProps<ScanInfor>["columns"] = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: 58,
      render: (text, _, index) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "",
      key: "name",
      width: 160,
      fixed: "left",
      render: (value, record) => {
        return <Typography.Text>{record?.fullname}</Typography.Text>;
      },
    },
    {
      title: "CCCD",
      dataIndex: "",
      key: "cccd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.cccd}</Typography.Text>;
      },
    },
    {
      title: "CMND",
      dataIndex: "",
      key: "cmnd",
      width: 120,
      render: (value, record) => {
        return <Typography.Text>{record?.cmnd}</Typography.Text>;
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "",
      key: "dob",
      width: 100,
      render: (value, record) => {
        return (
          <Typography.Text>
            {moment(record?.dob).toDate().toLocaleDateString()}
          </Typography.Text>
        );
      },
    },
    {
      title: "Giới tính",
      dataIndex: "",
      key: "gender",
      width: 100,
      render: (value, record) => {
        return <Typography.Text>{record?.gender}</Typography.Text>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      key: "address",
      width: 200,
      render: (value, record) => {
        return <Typography.Text>{record?.fullAddress}</Typography.Text>;
      },
    },
    {
      title: "Ngày cấp",
      dataIndex: "",
      key: "issuedAt",
      width: 80,
      render: (value, record) => {
        return (
          <Typography.Text>
            {moment(record?.issuedAt).toDate().toLocaleDateString()}
          </Typography.Text>
        );
      },
    },
  ];

  return (
    <S.MainContainerWrapper>
      <S.Head>
        <Typography.Title
          level={4}
          $fontWeight={700}
          $color={themes.default.colors.primaryDark}
        >
          Thêm dữ liệu mới từ máy quét
        </Typography.Title>
        <Button
          style={{ width: "fit-content" }}
          type="default"
          title="Refresh"
          onClick={refetch}
        >
          <TbReload
            size={18}
            style={{ display: "flex", alignItems: "center" }}
          />
        </Button>
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
      <Typography.Text $fontWeight={600}>
        Dữ liệu được thêm mới gần đây
      </Typography.Text>
      <S.Container>
        <Table
          columns={columns}
          dataSource={scannedData}
          loading={isFetching}
          rowKey={(record) => record._id}
          scroll={{ y: screens.xxl ? 1000 : 600 }}
          size="small"
          bordered={false}
          pagination={false}
          sticky
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      </S.Container>
    </S.MainContainerWrapper>
  );
}

export default ScanModule;
