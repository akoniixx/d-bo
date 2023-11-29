import React from 'react'
import { Modal } from 'antd'
import FooterPage from '../footer/FooterPage'

interface ModalProps {
  closeModal?: () => void
  textHeader: string
  visible: boolean
  data: any
  backButton: () => void
  saveButton?: () => void
  title?: string
  disableSaveBtn?: boolean
}
export const ModalPage: React.FC<ModalProps> = ({
  closeModal,
  textHeader,
  visible,
  data,
  backButton,
  saveButton,
  title,
  disableSaveBtn
}) => (
  <Modal
    title={
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
      >
        {textHeader}
      </div>
    }
    visible={visible}
    onCancel={closeModal}
    // eslint-disable-next-line react/jsx-key
    footer={[<FooterPage onClickBack={backButton} onClickSave={saveButton} disableSaveBtn={disableSaveBtn}/>]}
  >
    {title && <span className='text-secondary'>{title}</span>}

    {data}
  </Modal>
)
