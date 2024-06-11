import ScanAllModules from '@/components/core/module/ScanAll';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tất cả dữ liệu | Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng",
  description: "Phần mềm Quản lý khách làm việc tại Công an quận Hai Bà Trưng",
};

function ScanAll() {

    return (
      <ScanAllModules/>
    )
}

export default ScanAll
