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
<<<<<<< Updated upstream
  saveButton
=======
  saveButton,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    footer={[<FooterPage onClickBack={backButton} onClickSave={saveButton}/>]}
=======
    footer={[<FooterPage 
      onClickBack={backButton} 
      onClickSave={saveButton}/>]}
>>>>>>> Stashed changes
  >
    {data}
  </Modal>
);
