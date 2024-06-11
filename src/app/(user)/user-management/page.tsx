
import UserManagementModule from '@/components/core/module/UserManagement';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Quản lý người dùng | Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
    description: "Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
  };

function UserManagement() {
    return (
        <UserManagementModule/>
    )
}

export default UserManagement
