import React from 'react'
import ScanAllModules from '@/components/core/module/ScanAll'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tất cả dữ liệu đã quét",
};


function ScanAll() {

    return (
      <ScanAllModules/>
    )
}

export default ScanAll
