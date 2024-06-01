import { DividerCommon } from '@/components/core/common/Divider/styles'
import Typography from '@/components/core/common/Typography'
import { RootState } from '@/store'
import { themes } from '@/styles/themes'
import { Avatar, Divider, Flex } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

function DropDownUser() {
    const {userInfo} = useSelector((state: RootState) => state.auth)

    return (
        <Flex vertical>
      <Flex gap={8} align="center">
        <Avatar
          size={38}
          src={
            <Image
              src={userInfo.avatar != null ? userInfo.avatar : ""}
              alt="avatar"
              width={38}
              height={38}
            />
          }
        />
        <Flex vertical>
          <p>{userInfo.firstname! ?? ""} {userInfo.lastname! ?? ""}</p>
          <Typography.Text $width="150px" $color={themes.default.colors.primary} ellipsis={true} >@{userInfo.email}</Typography.Text >
        </Flex>
      </Flex>
    </Flex>
    )
}

export default DropDownUser
