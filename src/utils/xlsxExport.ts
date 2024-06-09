import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";

export interface ScannedBy {
  _id: string;
  email: string;
  avatar: string;
  firstname: string;
  lastname: string;
  position: string | null;
}
export interface BanInfo {
  _id: string;
  ban: string;
}
export interface ManagerInfo {
  _id: string;
  fullname: string;
}

export interface DataItem {
  _id: string;
  wholeText: string;
  cccd: string;
  cmnd: string;
  fullname: string;
  gender: string;
  dob: string;
  fullAddress: string;
  issuedAt: string;
  banId: BanInfo;
  managerId: ManagerInfo;
  managerName: string;
  isCheckout: boolean;
  checkoutAt: string;
  scannedBy: ScannedBy;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface HeadersMapping {
  [key: string]: string;
}

export const exportDataWithCustomHeadersToExcel = (
  data: DataItem[],
  headersMapping: HeadersMapping,
  filename: string = "data.xlsx"
) => {
  // Map the data with the custom headers and filter out unwanted keys
  const mappedData = data.map((item) => {
    const mappedItem: { [key: string]: string | undefined } = {};
    for (const key in headersMapping) {
      if (key === "scannedBy") {
        mappedItem[headersMapping[key]] =
          item.scannedBy.firstname && item.scannedBy.lastname
            ? `${item.scannedBy.firstname} ${item.scannedBy.lastname}`
            : "N/A";
      } else if (key === "issuedAt") {
        mappedItem[headersMapping[key]] = `${moment(item.issuedAt)
          .toDate()
          .toLocaleDateString()}`;
      } else if (key === "dob") {
        mappedItem[headersMapping[key]] = `${moment(item.dob)
          .toDate()
          .toLocaleDateString()}`;
      } else if (key === "position") {
        mappedItem[headersMapping[key]] = item.scannedBy.position ?? "N/A";
      } else if (key === "createdAt") {
        mappedItem[headersMapping[key]] = `${moment(item?.createdAt)
          .toDate()
          .toLocaleDateString()} ${moment(item?.createdAt)
          .toDate()
          .toLocaleTimeString()} `;
      } else if (key === "banId") {
        mappedItem[headersMapping[key]] = item?.banId?.ban
          ? `${item?.banId?.ban}`
          : "N/A";
      } else if (key === "managerName") {
        mappedItem[headersMapping[key]] = item?.managerName
          ? `${item?.managerName}`
          : "N/A";
      } else if (key === "isCheckout") {
        mappedItem[headersMapping[key]] = item?.isCheckout
          ? `${"Đã CHECKOUT"}`
          : "Chưa CHECKOUT";
      } else if (key === "checkoutAt") {
        mappedItem[headersMapping[key]] = item?.checkoutAt != null
          ? `${moment(item?.checkoutAt)
              .toDate()
              .toLocaleDateString()} ${moment(item?.checkoutAt)
              .toDate()
              .toLocaleTimeString()}`
          : "N/A";
      } else {
        mappedItem[headersMapping[key]] = item[key as keyof DataItem] as string;
      }
    }
    return mappedItem;
  });

  // Create a worksheet
  const worksheet = utils.json_to_sheet(mappedData);

  // Create a new workbook and add the worksheet
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate a binary string representation of the workbook
  const wbout = write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob object from the binary string
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  // Use file-saver to save the file
  saveAs(blob, filename);
};
