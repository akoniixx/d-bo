import { Button, Divider, Modal } from 'antd'
import React from 'react'
import { color } from '../../resource'

interface ModalDelete {
  show: boolean
  title1: string
  title2: string
  backButton: () => void
  callBack: () => void
  title?: string
}

const ModalDelete: React.FC<ModalDelete> = ({
  show,
  title1,
  title2,
  backButton,
  callBack,
  title,
}) => {
  return (
    <Modal
      title={title ? title : 'ยืนยันการลบ'}
      onCancel={backButton}
      open={show}
      footer={null}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className='px-4 pt-4'>
        <span className='text-secondary'>{title1}</span>
        <p className='text-secondary'>{title2}</p>
      </div>
      <Divider
        style={{
          marginBottom: '20px',
        }}
      />
      <div className='d-flex justify-content-between px-4 pb-4'>
        <Button
          style={{
            borderColor: color.Error,
            color: color.Error,
          }}
          onClick={backButton}
        >
          ยกเลิก
        </Button>
        <Button
          style={{
            borderColor: color.Error,
            backgroundColor: color.Error,
            color: color.White,
          }}
          onClick={callBack}
        >
          {title === 'ยืนยันการคืนแต้ม' ? 'คืนแต้ม' : 'ลบ'}
        </Button>
      </div>
    </Modal>
  )
}

export default ModalDelete
