"use client";
import Typography from "@/components/core/common/Typography";
import { useAllBanQuery } from "@/store/services/ban";
import { useAllBanManagerByBanIdQuery } from "@/store/services/manager";
import { useScanCheckinMutation } from "@/store/services/scan";
import { Button, Card, Flex, Form, FormProps, Input, message, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

type TProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  inputData: string;
  setInputData: (str: string) => void;
  isRefresh: boolean;
  setIsRefresh: (bool:boolean) => void;
};
type FieldType = {
    banId: string;
    managerName: string;
    purpose: string;
  };

function NewScanModal({ open, setOpen, inputData, setInputData, isRefresh, setIsRefresh }: TProps) {
  const [form] = Form.useForm();
  const [banId, setBanId] = useState<string>("");
  const [scanCheckin, { isLoading }] = useScanCheckinMutation();


  const { allBanData } = useAllBanQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        allBanData: data?.data ?? [],
        isFetching,
      };
    },
  });
  const { allManagerByBanId } = useAllBanManagerByBanIdQuery(banId, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        allManagerByBanId: data?.data ?? [],
        isFetching,
      };
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
        console.log(values);
        const saveData = {
            data: inputData!,
            banId: values.banId,
            managerName: values.managerName,
            purpose:  values.purpose
        }
        console.log(saveData);
        const res = await scanCheckin(saveData).unwrap();
        setOpen(false);
        setInputData("");
        setIsRefresh(!isRefresh);
        message.success("Đã lưu thành công")
    } catch (error) {
        message.error("Xảy ra lỗi trong quá trình lưu dữ liệu")
    }
  }

  return (
    <Modal
      title="Chọn phòng ban và cán bộ phụ trách"
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
        setInputData("")
      }}
      centered
      footer={null}
    >
      <Flex vertical>
        <Typography.Text $fontWeight={700}>Dữ liệu đầu vào: </Typography.Text>
        <Card>
          <Typography.Text $fontWeight={600}>{inputData}</Typography.Text>
        </Card>
      </Flex>
      <Flex align="center" justify="center" style={{ marginTop: "20px" }}>
        <Form
          name="select ban form"
          onFinish={onFinish}
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Phòng ban"
            name={"banId"}
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
          >
            <Select
              placeholder="Chọn phòng ban"
              onChange={(id: string) => {
                setBanId(id);
                form.resetFields(["managerId"]);
              }}
            >
              {allBanData?.map((item: any, index: number) => (
                <Select.Option key={index} value={item?._id}>
                  {item?.ban}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Cán bộ phụ trách"
            name="managerName"
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
          >
            {/* <Select
              placeholder="Chọn cán bộ"
              disabled={banId.length == 0 ? true : false}
            >
              {allManagerByBanId?.map((item: any, index: number) => (
                <Select.Option key={index} value={item?._id}>
                  {item?.fullname}
                </Select.Option>
              ))}
            </Select> */}
            <Input placeholder="Nhập tên của cán bộ phụ trách"/>
          </Form.Item>
          <Form.Item
            label="Mục đích đến làm việc"
            name="purpose"
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
          >
            <TextArea rows={3} placeholder="Nhập múc đích đến làm việc"/>
          </Form.Item>
          <Flex justify="end">
            <Form.Item style={{ marginBottom: 0 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
            
          </Flex>
        </Form>
      </Flex>
    </Modal>
  );
}

export default NewScanModal;
