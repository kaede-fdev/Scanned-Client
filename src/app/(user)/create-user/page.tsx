import CreateUserModule from '@/components/core/module/CreateUser';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tạo người dùng | Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
    description: "Phần mềm Quản lý Công Dân làm việc tại Công an quận Hai Bà Trưng",
  };

function CreateUser() {
    return (
        <CreateUserModule/>
    )
}

export default CreateUser
