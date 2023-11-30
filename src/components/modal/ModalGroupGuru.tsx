/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import FooterPage from '../footer/FooterPage'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { GroupGuruDataSource } from '../../datasource/GroupGuruDatasource'
import { insertGroupGuru } from '../../entities/GuruKasetEntities'
interface ModalGroupGuruProps {
  show: boolean
  backButton: () => void
  callBack: (data: any) => void
  data: insertGroupGuru
  title: string
  isEditModal?: boolean
  action?: string
}
const ModalGroupGuru: React.FC<ModalGroupGuruProps> = ({
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
        groupName: data.groupName,
      })
    }
  }, [data, isEditModal])
  const onFieldsChange = () => {
    const namePoint = form.getFieldValue('groupName')
    const fieldErr = namePoint === undefined || namePoint === ''

    setBtnSaveDisable(fieldErr)
  }

  const handelCallBack = async () => {
    const f = form.getFieldsValue()
    const payload: any = {}
    payload._id = data._id
    payload.groupName = f.groupName
    if (data._id) {
      await GroupGuruDataSource.updateGroupGuru(payload).then((res) => {
        console.log(res)
        if (res) {
          Swal.fire({
            title: 'แก้ไขสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate('/IndexGroupGuru')
          })
        }
      })
    } else {
      await GroupGuruDataSource.addGroupGuru(payload).then((res) => {
        if (res.success) {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate('/IndexGroupGuru')
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
        <Form key={data._id} form={form} onFinish={handelCallBack} onFieldsChange={onFieldsChange}>
          <div className='form-group'>
            <label>
              ชื่อหมวดหมู่ <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='groupName'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อหมวดหมู่!',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อหมวดหมู่' autoComplete='off' />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ModalGroupGuru
