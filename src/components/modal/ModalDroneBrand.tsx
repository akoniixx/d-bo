import { Checkbox, Form, Input, Modal, Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { CreateDroneEntity } from '../../entities/DroneBrandEntities'
import FooterPage from '../footer/FooterPage'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Map } = require('immutable')

interface ModalDroneProps {
  show: boolean
  backButton: () => void
  callBack: (data: CreateDroneEntity) => void
  data: CreateDroneEntity
  editIndex: number
  title: string
  isEditModal?: boolean
}
const ModalDroneBrand: React.FC<ModalDroneProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  isEditModal = false,
  title,
}) => {
  const [form] = Form.useForm()
  const [dataDrone, setDataDrone] = useState<CreateDroneEntity>(data)
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(isEditModal ? false : true)
  useEffect(() => {
    if (dataDrone) {
      form.setFieldsValue({
        ...data,
        series: isEditModal ? dataDrone.series : undefined,
        isActive: isEditModal ? dataDrone.isActive : undefined,
        droneAbility: isEditModal ? dataDrone.droneAbility : undefined,
      })
    }
  }, [dataDrone, form, isEditModal])

  const handleChangestatus = (e: any) => {
    const m = Map(dataDrone).set('isActive', e.target.value)
    setDataDrone(m.toJS())
  }
  const handleCallBack = async (values: CreateDroneEntity) => {
    const payload = {
      ...dataDrone,
      ...values,
      droneId: editIndex,
    }
    callBack(payload)
  }
  const checkValidate = (dataDrone: CreateDroneEntity) => {
    const checkEmpty = ![dataDrone.series, dataDrone.isActive].includes('')
    if (checkEmpty) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue()
    checkValidate(valuesForm)
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
        onCancel={backButton}
        footer={[
          // eslint-disable-next-line react/jsx-key
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => form.submit()}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form
          key={data.droneId}
          form={form}
          onFinish={handleCallBack}
          onFieldsChange={onFieldsChange}
        >
          <div className='form-group'>
            <label>
              ชื่อรุ่นโดรน <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='series'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อรุ่นโดรน!',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อรุ่นโดรน' autoComplete='off' />
            </Form.Item>
            <label>ความสามารถ</label>
            <Form.Item name='droneAbility'>
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value='SPRAY'>ฉีดพ่น</Checkbox>

                <Checkbox value='SOW'>หว่าน</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          {isEditModal && (
            <div className='form-group'>
              <label>
                สถานะ <span style={{ color: 'red' }}>*</span>
              </label>
              <br />
              <Form.Item
                name='isActive'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกสถานะ!',
                  },
                ]}
              >
                <Radio.Group defaultValue={dataDrone.isActive} onChange={handleChangestatus}>
                  <Space direction='vertical'>
                    <Radio value={true}>ใช้งาน</Radio>
                    <Radio value={false}>ไม่ใช้งาน</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </>
  )
}
export default ModalDroneBrand
