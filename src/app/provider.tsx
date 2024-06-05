"use client"
import StyledComponentsRegistry from '@/services/base/styledComponentsRegistry';
import { store } from '@/store';
import GlobalStyle from '@/styles/global';
import { themes } from "@/styles/themes";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

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
                                headerBorderRadius: 4,
                                stickyScrollBarBg: themes.default.colors.background1,
                                stickyScrollBarBorderRadius: 10,
                                headerFilterHoverBg: themes.default.colors.primary,
                                headerSortActiveBg: themes.default.colors.primary,
                                headerSortHoverBg: themes.default.colors.primary,
                                fixedHeaderSortActiveBg: themes.default.colors.primary,
                              },
                              InputNumber: {
                                inputFontSize: 14,
                                controlHeight: 40
                              },
                              DatePicker: {
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
