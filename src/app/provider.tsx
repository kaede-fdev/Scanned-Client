"use client"
import React, { useEffect } from 'react'
import {Provider} from 'react-redux';
import {store} from '@/store'
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/global';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {themes} from "@/styles/themes"
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import StyledComponentsRegistry from '@/services/base/styledComponentsRegistry';
import { App, ConfigProvider } from 'antd';

export default function Providers({children}: {children:React.ReactNode}) {
    return (
        <StyledComponentsRegistry>
            <Provider store={store}>
                <ThemeProvider theme={themes.default}>
                    <GlobalStyle/>
                    <AntdRegistry>
                       <ConfigProvider
                        theme={{
                            components: {
                              Button: {
                                colorPrimary: themes.default.colors.primary,
                                algorithm: true,
                              },
                              Input: {
                                paddingBlock: 8,
                              },
                              Typography: {
                                titleMarginBottom: 0,
                                titleMarginTop: 0,
                              },
                              Table: {
                                headerBg: themes.default.colors.primaryDarker,
                                headerColor: themes.default.colors.text5,
                                headerBorderRadius: 8,
                                stickyScrollBarBg: themes.default.colors.background1,
                                headerFilterHoverBg: themes.default.colors.primary,
                                headerSortActiveBg: themes.default.colors.primary,
                                headerSortHoverBg: themes.default.colors.primary,
                                fixedHeaderSortActiveBg: themes.default.colors.primary
                              },
                              InputNumber: {
                                inputFontSize: 14,
                                controlHeight: 40
                              },
                              Select: {
                                controlHeight: 40
                              }
                            },  
                            token: {
                              colorPrimary: themes.default.colors.primary,
                            },
                          }}>
                        <App>
                           {children}
                        </App>
                       </ConfigProvider>
                    </AntdRegistry>
                </ThemeProvider>
            </Provider>
        </StyledComponentsRegistry>
    )
}
