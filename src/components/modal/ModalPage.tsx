import React from "react";
import { Modal } from "antd";
import FooterPage from "../footer/FooterPage";

interface ModalProps {
  closeModal?: () => void;
  textHeader: string;
  visible: boolean;
  data: any;
  backButton: () => void;
  saveButton?: () => void;
}
export const ModalPage: React.FC<ModalProps> = ({
  closeModal,
  textHeader,
  visible,
  data,
  backButton,
}) => (
  <Modal
    title={
      <div
        style={{
          width: "100%",
          cursor: "move",
        }}
      >
        {textHeader}
      </div>
    }
    visible={visible}
    onCancel={closeModal}
    footer={[<FooterPage onClickBack={backButton} />]}
  >
    {data}
  </Modal>
);
