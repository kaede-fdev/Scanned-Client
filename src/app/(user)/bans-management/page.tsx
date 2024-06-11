import BansManagementModules from '@/components/core/module/BansManagement';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Quản lý phòng ban | Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng",
    description: "Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng",
  };

function BansManagement() {
    return (
        <BansManagementModules/>           
    )
}

export default BansManagement
