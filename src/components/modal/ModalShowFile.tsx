import { Button, Divider, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { color } from '../../resource'
import { shopFiles } from '../../entities/OneFinityShopEntities'
import icon from '../../resource/icon'

interface ModalShowFileProps {
  show: boolean
  count?: number
  file: shopFiles[]
  backButton: () => void
}

const ModalShowFile: React.FC<ModalShowFileProps> = ({ show, count, file, backButton }) => {
  const onPreviewFile = async (e: any) => {
    window.open(e)
  }

  return (
    <Modal
      title='สัญญาเข้าร่วมโครงการ'
      onCancel={backButton}
      open={show}
      footer={null}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className='px-4 pt-4'>
        <span className='text-secondary'>ทั้งหมด {count} ไฟล์</span>
      </div>
      <div className='p-4 '>
        {file &&
          file.map((item, index) => (
            <div
              onClick={() => onPreviewFile(item.filePath)}
              key={index}
              className='d-flex p-2 pb-2 justify-content-between'
              style={{
                border: '0.2px solid ',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              <div className='col-lg-4'>
                <embed src={item.filePath} style={{ width: '120px', height: '90px' }} />
              </div>
              <div className='col-lg align-self-center'>
                <span>{item.fileName}</span>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  )
}

export default ModalShowFile
