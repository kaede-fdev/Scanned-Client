"use client"
import React from "react";
import InforBox from "../../common/InforBoxDemo";
import Button from "../../common/DemoButton";
import { Modal } from "antd";
import styled from "styled-components";
import useModal from "@/hooks/useModal";

export default function Home({schema}: any) {
    const modalState = useModal();
  return (
    <center>
      <h4>THIS IS DEMO PAGE</h4>
      <StyledTest>
        demo api call:
        <InforBox schema={schema}></InforBox>
        <Button onClick={() => modalState.openModal()}>Test modal</Button>
      </StyledTest>
      <Modal
        open={modalState.visible}
        onCancel={modalState.closeModal}
        title="Demo modal"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
        repudiandae voluptates iure, quia rem voluptate, deleniti commodi
        doloribus maiores earum culpa veritatis. Doloribus beatae placeat ipsa
        nisi a quis voluptatibus.
      </Modal>
    </center>
  );
}

const StyledTest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;