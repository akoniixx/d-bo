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
      <Divider
        style={{
          marginBottom: '20px',
        }}
      />
      {file &&
        file.map((item, index) => (
          <div key={index} className='d-flex p-2 justify-content-between'>
            <div className='col-lg'>
              <embed src={item.filePath} style={{ width: '120px', height: '90px' }} />
            </div>
            <div className='col-lg'>
              <span>{item.shopId}</span>
            </div>
            <div className='col-lg-2'>
              <img
                src={icon.view}
                style={{ width: 22, height: 22, cursor: 'pointer' }}
                onClick={() => onPreviewFile(item.filePath)}
              />
            </div>
          </div>
        ))}
    </Modal>
  )
}

export default ModalShowFile
