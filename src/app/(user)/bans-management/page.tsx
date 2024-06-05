import BansManagementModules from '@/components/core/module/BansManagement';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Quản lý phòng ban",
};


function BansManagement() {
    return (
        <BansManagementModules/>            
    )
}

export default BansManagement
