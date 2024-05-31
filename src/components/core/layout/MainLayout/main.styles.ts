import { Header } from "antd/es/layout/layout";
import styled from "styled-components";

export const HeaderCustom = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between !important;

  padding: 0px 16px !important;

  position: static !important;
  top: 0;

  z-index: 10;
  
  box-shadow: #0098ff33 0px 1px 10px;

  user-select: none;
`;
