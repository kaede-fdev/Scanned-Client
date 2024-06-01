import React from 'react'
import CreateUserModule from '@/components/core/module/CreateUser'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tạo người dùng",
  };
  

function CreateUser() {
    return (
        <CreateUserModule/>
    )
}

export default CreateUser
