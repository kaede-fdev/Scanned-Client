import { useDownloadCheckinMutation, useDownloadCheckoutMutation, useGetLongeastTimeOfCheckinQuery } from "@/store/services/scan";
import { exportDataWithCustomHeadersToExcel } from "@/utils/xlsxExport";
import { Button, DatePicker, Flex, Form, FormProps, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

type TProps = {
  visible: boolean;
  closeModal: () => void;
  modalState: (bool: boolean) => void;
};

function ExportModal({
  closeModal,
  modalState,
  visible,
}: TProps) {
  const { RangePicker } = DatePicker;
  const [isCheckin, setIsCheckin] = useState<boolean>(false);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [downloadCheckin] = useDownloadCheckinMutation();
  const [downloadCheckout] = useDownloadCheckoutMutation();

  const {checkinLong} = useGetLongeastTimeOfCheckinQuery(undefined, {
    selectFromResult: ({data}) => {
        return {
            checkinLong: data?.data?.createdAt ?? ""
        }
    }
  })

  const handleChangeDate = (event: any) => {
    setFromDate(dayjs(event[0]).toDate().toUTCString());
    setToDate(dayjs(event[1]).toDate().toUTCString());
  }

  useEffect(() => {
      setToDate(dayjs(new Date).toString());
      setFromDate(dayjs(checkinLong!).toDate().toUTCString());
}, [checkinLong])

const [confirmLoading, setConfirmLoading] = useState(false);


const headersMapping = {
    fullname: "Họ và Tên",
    cccd: "Căn cước công dân",
    cmnd: "Chứng minh nhân dân",
    gender: "Giới tính",
    dob: "Ngày sinh (MmDdYyyy)",
    fullAddress: "Quê quán",
    issuedAt: "Ngày cấp (MmDdYyyy)",
    scannedBy: "Người quét",
    position: "Chức vụ",
    createdAt: "Thời gian quét"
};

const handleOk = async () => {

    if(isCheckin) {
        const res = await downloadCheckin({
            fromDate: fromDate,
            toDate: toDate
        }).unwrap();
        const data = res?.data?.scanneds;

        handleExport(data, `checkin_data_from_${dayjs(fromDate).toDate().toLocaleDateString()}_to_${dayjs(fromDate).toDate().toLocaleDateString()}`)
    }

    if(isCheckout) {
        const res = await downloadCheckout({
            fromDate: fromDate,
            toDate: toDate
        }).unwrap();
        const data = res?.data?.scanneds;

        handleExport(data, `checkout_data_from_${dayjs(fromDate).toDate().toLocaleDateString()}_to_${dayjs(fromDate).toDate().toLocaleDateString()}`)
    }

    setConfirmLoading(true);
    setTimeout(() => {
      modalState(false);
      setConfirmLoading(false);
    }, 1000);
  };

    const handleExport = (data: any, filename: string) => {
    exportDataWithCustomHeadersToExcel(
      data,
      headersMapping,
      `${filename}.xlsx`
    );
  };

  

  return (
    <Modal
      title="Xuất dữ liệu sang Excel file"
      open={visible}
      onCancel={closeModal}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      centered
    >
      <Form layout="vertical">
        <Flex vertical>
          <Form.Item label="Chọn loại dữ liệu cần xuất">
            <Flex gap={20}>
              <Button onClick={() => setIsCheckin(!isCheckin)}
              type={isCheckin ? "primary" : "default"}
              >CHECKIN</Button>
              <Button onClick={() => setIsCheckout(!isCheckout)}
              type={isCheckout ? "primary" : "default"}
              >
                CHECKOUT
              </Button>
            </Flex>
          </Form.Item>
          <Form.Item label="Chọn thời gian">
            <Flex>
              <RangePicker
                onChange={(event) => handleChangeDate(event)}
                defaultValue={[dayjs(checkinLong), dayjs(new Date())]}
                disabled={[true, false]}
              />
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ExportModal;
