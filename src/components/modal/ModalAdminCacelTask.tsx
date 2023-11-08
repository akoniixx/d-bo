import { Button, Divider, Form, Modal } from 'antd'
import React, { useState } from 'react'
import { color } from '../../resource'
import TextArea from 'antd/lib/input/TextArea'
import { TaskDatasource } from '../../datasource/TaskDatasource'

interface ModalCancelTaskProps {
  show: boolean
  title1: string
  title2: string
  backButton: () => void
  callBack: (data: any) => void
  data: string
}

const ModalCancelTask: React.FC<ModalCancelTaskProps> = ({
  show,
  title1,
  title2,
  backButton,
  callBack,
  data,
}) => {
  const [form] = Form.useForm()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [reason, setReason] = useState<string>('')

  const handelCallBack = async () => {
    const payload: any = {}
    payload.id = data
    payload.status = 'CANCELED'
    payload.statusRemark = reason
    payload.updateBy = profile.firstname + ' ' + profile.lastname
    if (payload) {
      await TaskDatasource.cancelNewTask(payload).then(() => {
        backButton()
      })
    }
    callBack(payload)
  }
  return (
    <Modal
      title={'ยืนยันการยกเลิก'}
      onCancel={backButton}
      open={show}
      bodyStyle={{
        padding: 0,
      }}
      footer={
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
              borderColor: saveBtnDisable ? color.Grey : color.Error,
              backgroundColor: saveBtnDisable ? color.Grey : color.Error,
              color: color.White,
            }}
            onClick={handelCallBack}
            disabled={saveBtnDisable}
          >
            ยืนยัน
          </Button>
        </div>
      }
    >
      <Form key={data} form={form}>
        <div className='px-4 pt-4'>
          <span className='text-secondary'>{title1}</span>
          <p className='text-secondary'>{title2}</p>
          <Form.Item name='statusRemark' className='pt-4'>
            <span>เหตุผล</span>
            <TextArea
              rows={4}
              placeholder='กรอกเหตุผลการยกเลิก'
              onChange={(e) => {
                const isWhitespace = /^\s*$/.test(e.target.value)
                setBtnSaveDisable(!isWhitespace ? false : true)
                setReason(e.target.value)
              }}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalCancelTask
