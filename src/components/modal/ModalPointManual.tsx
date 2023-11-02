/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import FooterPage from '../footer/FooterPage'
import TextArea from 'antd/lib/input/TextArea'
import { InsertSpecialListEntities } from '../../entities/SpecialListEntities'
import { SpecialPointDataSource } from '../../datasource/SpecialPointDatasource'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
interface ModalPointManualProps {
  show: boolean
  backButton: () => void
  callBack: (data: any) => void
  data: InsertSpecialListEntities
  title: string
  isEditModal?: boolean
  action?: string
}
const ModalPointManual: React.FC<ModalPointManualProps> = ({
  show,
  backButton,
  callBack,
  data,
  title,
  isEditModal,
  action,
}) => {
  const [form] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const navigate = useNavigate()

  useEffect(() => {
    if (!show) {
      form.resetFields()
      setBtnSaveDisable(true)
    }
  }, [show])
  useEffect(() => {
    if (action && isEditModal) {
      form.setFieldsValue({
        name: data.name,
        detail: data.description,
      })
    }
  }, [data, isEditModal])
  const onFieldsChange = () => {
    const namePoint = form.getFieldValue('name')
    const fieldErr = namePoint === undefined || namePoint === ''

    setBtnSaveDisable(fieldErr)
  }

  const handelCallBack = async () => {
    const f = form.getFieldsValue()
    const payload: any = {}
    payload.id = data.id
    payload.name = f.name
    payload.description = f.detail
    payload.createBy = profile.firstname + ' ' + profile.lastname

    if (data.id) {
      await SpecialPointDataSource.updateSpecialPoint(payload).then((res) => {
        if (res) {
          Swal.fire({
            title: 'แก้ไขสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate('/IndexPointManual')
          })
        }
      })
    } else {
      await SpecialPointDataSource.insertSpecialPoint(payload).then((res) => {
        if (res) {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate('/IndexPointManual')
          })
        }
      })
    }
    callBack(payload)
  }

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
          >
            {title}
          </div>
        }
        visible={show}
        onCancel={() => {
          backButton()
          form.resetFields()
        }}
        width={600}
        footer={[
          <FooterPage
            onClickBack={() => {
              backButton()
              form.resetFields()
            }}
            onClickSave={() => form.submit()}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form key={data.id} form={form} onFinish={handelCallBack} onFieldsChange={onFieldsChange}>
          <div className='form-group'>
            <label>
              ชื่อรายการแต้มพิเศษ <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อรายการแต้มพิเศษ!',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อรายการแต้มพิเศษ' autoComplete='off' />
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>รายละเอียด</label>
            <Form.Item name='detail'>
              <TextArea placeholder='กรอกรายละเอียด' autoComplete='off' rows={3} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ModalPointManual
