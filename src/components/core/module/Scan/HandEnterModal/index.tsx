import { useAllBanQuery } from "@/store/services/ban";
import { useAllBanManagerByBanIdQuery } from "@/store/services/manager";
import {
  useScanCheckinFromHandInputMutation,
  useScanCheckoutFromHandInputtMutation,
} from "@/store/services/scan";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";

type TProps = {
  visible: boolean;
  closeModal: () => void;
  modalState: (bool: boolean) => void;
  isCheckOut: boolean;
  setIsRefresh: (bool: boolean) => void;
  isRefresh: boolean;
};

type FieldType = {
  fullname: string;
  gender: string;
  dob: string;
  fullAddress: string;
  issuedAt: string;
  cccd: string;
  cmnd: string;
  banId: string;
  managerId: string;
};

function HandEnterModal({
  visible,
  closeModal,
  modalState,
  isCheckOut,
  setIsRefresh,
  isRefresh,
}: TProps) {
  const [banId, setBanId] = useState<string>("");
  const [scanCheckinFromHand] = useScanCheckinFromHandInputMutation();
  const [scanCheckoutFromHand] = useScanCheckoutFromHandInputtMutation();

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
      if (isCheckOut) {
        const res = await scanCheckoutFromHand(values).unwrap();
        setIsRefresh(!isRefresh);
        modalState(false);
        message.success("Thêm thành công");
        return;
      }
      const res = await scanCheckinFromHand(values).unwrap();
      setIsRefresh(!isRefresh);
      modalState(false);
      message.success("Thêm thành công");
    } catch (error) {
      message.error("Xẩy ra lỗi trong quá trình tạo thông tin");
    }
  };

  return (
    <Modal
      title="Điền thông tin"
      open={visible}
      onCancel={closeModal}
      // confirmLoading={confirmLoading}
      // onOk={handleOk}
      centered
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Flex vertical gap={10}>
          <Button style={{ width: "fit-content" }} type="primary">
            {isCheckOut ? "CHECKOUT" : "CHECKIN"}
          </Button>

          <Flex vertical>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ và Tên"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                  label="Giới tính"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                  ]}
                >
                  <Select placeholder="Chọn giới tính">
                    <Select.Option value="Nam">Nam</Select.Option>
                    <Select.Option value="Nữ">Nữ</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Ngày sinh  (yyyy-mm-dd)" name="dob">
                  <Space.Compact style={{ width: "100%" }}>
                    <DatePicker
                      placeholder="Nhập ngày sinh"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Space.Compact>
                </Form.Item>
                <Form.Item label="Địa chỉ" name={"fullAddress"}>
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Căn cước công dân" name={"cccd"}>
                  <Input placeholder="Nhập số CCCD" />
                </Form.Item>
                <Form.Item label="Chứng minh nhân dân" name={"cmnd"}>
                  <Input placeholder="Nhập số CMND" />
                </Form.Item>
                <Form.Item label="Ngày cấp  (yyyy-mm-dd)" name={"issuedAt"}>
                  <Space.Compact style={{ width: "100%" }}>
                    <DatePicker
                      placeholder="Nhập ngày cấp"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Space.Compact>
                </Form.Item>
                <Form.Item
                  label="Phòng ban"
                  name="banId"
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
                  name="managerId"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                  ]}
                >
                  <Select placeholder="Chọn cán bộ">
                    {allManagerByBanId?.map((item: any, index: number) => (
                      <Select.Option key={index} value={item?._id}>
                        {item?.fullname}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Flex align="center" justify="end" style={{ width: "100%" }}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button type="primary" htmlType="submit">
                    Thêm mới
                  </Button>
                </Form.Item>
              </Flex>
            </Row>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
}

export default HandEnterModal;
