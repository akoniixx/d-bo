import React from 'react'
import { Button, Modal } from 'antd'
import FooterPage from '../footer/FooterPage'
import { InfoCircleFilled, LeftOutlined } from '@ant-design/icons'
import color from '../../resource/color'
import { BackButton } from '../button/BackButton'

interface ModalProps {
  textHeader: string
  textDetail: string
  visible: boolean
  backButton: () => void
  titleButton: string
}
export const ModalAcceptedTask: React.FC<ModalProps> = ({
  textHeader,
  textDetail,
  visible,
  backButton,
  titleButton,
}) => (
  <Modal
    title={
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
      >
        <InfoCircleFilled style={{ color: color.secondary2, verticalAlign: 0.5, padding: 6 }} />
        {textHeader}
      </div>
    }
    visible={visible}
    closable={false}
    maskClosable={false}
    footer={[
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.Success,
          }}
          onClick={backButton}
        >
          {titleButton}
        </Button>
      </div>,
    ]}
  >
    {textDetail}
  </Modal>
)
