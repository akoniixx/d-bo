/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Upload, UploadFile, UploadProps } from 'antd'
import FooterPage from '../footer/FooterPage'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined, SearchOutlined, StarFilled } from '@ant-design/icons'
import { color, icon } from '../../resource'
import upload_droner_infinity from '../../resource/media/empties/upload_droner_infinity.png'
import '../../pages/farmer/Style.css'
interface ModalDronerInfinityProps {
  show: boolean
  backButton: () => void
  callBack: (data: any) => void
  data: any
  title: string
  isEditModal?: boolean
  action?: string
}
const ModalDronerInfinity: React.FC<ModalDronerInfinityProps> = ({
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
  const [upload, setUpload] = useState<any>(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const uploadButton = (
    <div
      className='hiddenFileBtn'
      style={{
        backgroundImage: `url(${upload_droner_infinity})`,
        display: upload === false ? 'block' : 'none',
      }}
    />
  )
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
        <Form>
          <div className='form-group'>
            <Form.Item
              name=''
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อหมวดหมู่!',
                },
              ]}
            >
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: color.Disable }} />}
                placeholder='ค้นหาชื่อนักบิน / เบอร์โทร / ID นักบินโดรน'
                className='col-lg-12'
              />
            </Form.Item>
          </div>
          <div
            style={{
              borderRadius: '5px',
              opacity: 1,
              backgroundColor: color.primary3,
              padding: 20,
            }}
          >
            <div className='row' style={{ fontWeight: '500' }}>
              <div className='col-lg'>ชื่อนักบินโดรน</div>
              <div className='col-lg'>เบอร์โทร</div>
              <div className='col-lg'>แต้มสะสม</div>
            </div>
            <div className='row pt-2'>
              <div className='col-lg'>มานี มีนาเยอะ</div>
              <div className='col-lg'>0989284761</div>
              <div className='col-lg'>
                <img src={icon.coinFarmer} style={{ width: 22, height: 22, marginBottom: 2 }} />{' '}
                30,000
              </div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col-lg'>ที่อยู่</div>
            </div>
            <div className='row pt-2'>
              <div className='col-lg'>บ่อถ้ำ/ขาณุวรลักษบุรี/กำแพงเพชร</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col-lg'>งานที่บินเสร็จ</div>
              <div className='col-lg'>จำนวนไร่สะสม</div>
              <div className='col-lg'>Rating</div>
            </div>
            <div className='row pt-2'>
              <div className='col-lg'>10 งาน</div>
              <div className='col-lg'>110.2 ไร่</div>
              <div className='col-lg'>
                <StarFilled
                  style={{
                    color: '#FFCA37',
                    fontSize: '20px',
                    marginRight: '7px',
                    verticalAlign: 0.5,
                  }}
                />
                4
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-between pt-3'>
            <div className='col-lg-8'>
              <span>สัญญาเข้าร่วมโครงการ</span>
              <span style={{ color: color.Grey }}> (ไฟล์รูปภาพ PNG/PDF)</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <div className='col-lg' style={{ textAlign: 'end' }}>
              <u style={{ color: color.Success, fontWeight: 500, cursor: 'pointer' }}>
                ดาวน์โหลดสัญญาณ
              </u>
            </div>
          </div>
          <div className='d-flex pt-2'>
            <Upload
              action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
              listType='text'
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length > 0 ? null : uploadButton}
            </Upload>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ModalDronerInfinity
