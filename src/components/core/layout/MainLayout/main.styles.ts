import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const HeaderCustom = styled(Header)`
  max-height: 50px !important;

  /* background: ${(props) => props.theme.colors.primaryDarker} !important; */

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

export const SiderCustom = styled(Sider)`
  background: #fff !important;
  padding: 12px 0px;

  position: static !important;

  z-index: 1;

  @media ${(props) => props.theme.breakpoints.smMax} {
    position: absolute !important;
    z-index: 10;
    height: calc(100vh - 54px);
  }
`;
export const OverLay = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: 0.3;
  animation-name: identifier;
  animation-duration: 1s;
  animation-iteration-count: 1;

  @keyframes identifier {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.3;
    }
  }
`;
