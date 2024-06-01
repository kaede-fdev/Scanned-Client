import React from 'react'

import UserManagementModule from '@/components/core/module/UserManagement'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Quản lý người dùng",
};


function UserManagement() {
    return (
        <UserManagementModule/>
    )
}

export default UserManagement
