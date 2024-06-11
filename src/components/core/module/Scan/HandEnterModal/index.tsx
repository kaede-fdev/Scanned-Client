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
import TextArea from "antd/es/input/TextArea";
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
  managerName: string;
  purpose: string;
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

  const [form] = Form.useForm();

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
      <Form layout="vertical" onFinish={onFinish} form={form}>
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
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    placeholder="Nhập ngày sinh"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ" name={"fullAddress"}>
                  <Input placeholder="Nhập địa chỉ" />
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
                  <TextArea rows={1} placeholder="Nhập múc đích đến làm việc" />
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
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    placeholder="Nhập ngày cấp"
                    style={{ width: "100%" }}
                  />
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
                  <Input placeholder="Nhập tên cán bộ phụ trách" />
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
