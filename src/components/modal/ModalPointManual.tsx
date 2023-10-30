import React, { useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import FooterPage from '../footer/FooterPage'
import TextArea from 'antd/lib/input/TextArea'
interface ModalPointManualProps {
  show: boolean
  backButton: () => void
  callBack: (data: any) => void
  name: string
  detail: string
  editIndex: number
  title: string
  isEditModal?: boolean
}
const ModalPointManual: React.FC<ModalPointManualProps> = ({
  show,
  backButton,
  callBack,
  name,
  detail,
  editIndex,
  title,
  isEditModal,
}) => {
  const [form] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)

  useEffect(() => {
    if (!show) {
      form.resetFields()
      setBtnSaveDisable(true)
    }
  }, [show])
  const onFieldsChange = () => {
    const namePoint = form.getFieldValue('name')
    const fieldErr = namePoint === undefined || namePoint === ''

    setBtnSaveDisable(fieldErr)
  }

  const handelCallBack = async (values: any) => {
    callBack(values)
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
        <Form key={1} form={form} onFinish={handelCallBack} onFieldsChange={onFieldsChange}>
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
