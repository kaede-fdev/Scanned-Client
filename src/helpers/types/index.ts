export type ScanInfor = {
  _id: string;
  wholeText: string;
  cccd: string;
  cmnd: string;
  fullname: string;
  gender: string;
  dob: string;
  fullAddress: string;
  issuedAt: string;
  scannedBy: {
    _id: string;
    email: string;
    avatar: string;
    firstname: string;
    lastname: string;
    position: string;
  };
  createdAt: string;
  updatedAt: string;
};
export type UserInfor = {
  _id: string;
  email: string;
  avatar: string;
  phone: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  position: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
