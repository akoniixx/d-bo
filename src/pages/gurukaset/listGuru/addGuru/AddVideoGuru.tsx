import 'react-quill/dist/quill.snow.css'
import '../../../farmer/Style.css'
import React, { useMemo, useRef, useState } from 'react'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../../../entities/UploadImageEntities'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Form, Input, Radio, Select, Tag, TimePicker } from 'antd'
import { resizeFileImg } from '../../../../utilities/ResizeImage'
import moment from 'moment'
import { BackIconButton } from '../../../../components/button/BackButton'
import { CardHeaderPromotion } from '../../../../components/header/CardHeaderPromotion'
import uploadImg from '../../../../resource/media/empties/upload_video_guru.png'
import color from '../../../../resource/color'
import icon from '../../../../resource/icon'
import FooterPage from '../../../../components/footer/FooterPage'
import { ModalPage } from '../../../../components/modal/ModalPage'
import Swal from 'sweetalert2'
import TextArea from 'antd/lib/input/TextArea'
import RenderVDOGuru from '../../../../components/mobile/RenderVDOGuru'

const { Map } = require('immutable')

function AddVideoGuru() {
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [imgGuru, setImgGuru] = useState<any>()
  const [createImgGuru, setCreateImgGuru] = useState<UploadImageEntity>(UploadImageEntity_INTI)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [showTimer, setShowTimer] = useState<boolean>(false)
  const dateFormat = 'DD/MM/YYYY'
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [duplicateTime, setDuplicateTime] = useState<any>()
  const [name, setName] = useState<any>()
  const [caption, setCaption] = useState<any>()
  const [selectedVideo, setSelectedVideo] = useState<any>()

  const [modalSave, setModalSave] = useState<boolean>(false)
  const [descriptionEditor, setDescriptionEditor] = useState<string | null>(null)

  const onChangeProfile = async (file: any) => {
    const source = file.target.files[0]
    let newSource: any

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split('/')[1],
        quality: 70,
        rotation: 0,
        responseUriFunc: (res: any) => {},
      })
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
      reader.onload = () => resolve(reader.result)
    })

    setImgGuru(img_base64)
    const d = Map(createImgGuru).set('file', isFileMoreThan2MB ? newSource : source)
    setCreateImgGuru(d.toJS())
  }

  const onPreviewProfile = async () => {
    let src = imgGuru
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgGuru)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const removeImgProfile = () => {
    setSelectedVideo(undefined)
  }

  const handleShowTimer = (e: any) => {
    if (e.target.value === 'PENDING') {
      setShowTimer(true)
    } else {
      form.resetFields(['startDate', 'startTime'])
      setShowTimer(false)
    }
  }

  const disabledDateStart = (current: any) => {
    return current && current.isBefore(moment())
  }
  const handleVideoChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const videoFile = event.target.files[0]
      setSelectedVideo(URL.createObjectURL(videoFile))
    }
  }
  const onFieldsChange = () => {
    const { name, description, category, application, startDate, startTime, status, img } =
      form.getFieldsValue()
    let fieldInfo = false
    let fieldDate = false

    if (name && description !== '<p><br></p>' && application && category && img) {
      fieldInfo = false
    } else {
      fieldInfo = true
    }

    if (status === 'PENDING') {
      if (startDate && startTime) {
        fieldDate = false
      } else {
        fieldDate = true
      }
    } else {
      fieldDate = false
    }
    setBtnSaveDisable(fieldInfo || fieldDate)
  }
  const onSubmit = async () => {
    const { name, description, category, application, startDate, startTime, status } =
      form.getFieldsValue()
    let dateStartPending: string | null = null

    if (status === 'PENDING') {
      dateStartPending =
        moment(startDate).format('YYYY-MM-DD') + ' ' + moment(startTime).format('HH:mm:ss')
    }
    try {
      const requestData: any = {
        name: name,
        status: status,
        description: description,
        application: application,
        category: category,
        createBy: profile.firstname + ' ' + profile.lastname,
        updateBy: profile.firstname + ' ' + profile.lastname,
        file: createImgGuru.file,
      }

      if (status === 'PENDING') {
        requestData.startDate = dateStartPending
      }
      // const res = await HighlightDatasource.addNewsHighlight(requestData)

      if (requestData) {
        setModalSave(!modalSave)
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/IndexGuru')
        })
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'เกิดข้อผิดพลาก',
        icon: 'error',
        showConfirmButton: true,
      })
    }
  }
  return (
    <>
      <div className='d-flex align-items-center'>
        <BackIconButton onClick={() => navigate(-1)} />
        <strong style={{ fontSize: '20px' }}>เพิ่มวิดีโอ</strong>
      </div>
      <br />
      <div className='row'>
        <div className='col-lg-7'>
          <CardHeaderPromotion textHeader='ข้อมูลิดีโอ' center={false} />
          <div className='bg-white px-5 py-3'>
            <Form form={form} onFieldsChange={onFieldsChange}>
              <div className='row'>
                <div className='form-group text-center pt-2'>
                  <Form.Item
                    name='img'
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาใส่รูปภาพ!',
                      },
                    ]}
                  >
                    <div
                      className='hiddenFileInputVideoGuru'
                      style={{
                        backgroundImage: `url(${uploadImg})`,
                      }}
                    >
                      {selectedVideo && (
                        <video className='hiddenFileInputVideoGuru' style={{ borderRadius: 10 }}>
                          <source src={selectedVideo} type='video/mp4' />
                        </video>
                      )}
                      <input type='file' accept='video/*' onChange={handleVideoChange} />
                    </div>
                  </Form.Item>
                  {selectedVideo && (
                    <div className='pb-4'>
                      <Tag
                        color={color.Error}
                        onClick={removeImgProfile}
                        style={{
                          cursor: 'pointer',
                          borderRadius: '5px',
                        }}
                      >
                        Remove
                      </Tag>
                    </div>
                  )}
                  <span className='text-center text-muted' style={{ fontSize: '13px' }}>
                    รูปภาพจะต้องมีสัดส่วน 9:16 หรือ 1,080px * 1,920px (สกุลไฟล์ .MP4) เท่านั้น
                  </span>
                </div>
              </div>

              <div className='form-group col-lg-12 pt-4'>
                <label>
                  รายละเอียดแคปชั่น <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกรายละเอียด!',
                    },
                  ]}
                >
                  <TextArea
                    placeholder='กรอกรายละเอียดแคปชั่น'
                    rows={4}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>
                  แอปพลิเคชัน <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  initialValue={false}
                  name='application'
                  valuePropName='select'
                  className='my-0'
                >
                  <Select allowClear placeholder='เลือกแอปพลิเคชัน' onChange={() => console.log(1)}>
                    <option key={1} value='FARMER'>
                      <img src={icon.farmerApp} style={{ width: '20px', height: '20px' }} />
                      <span style={{ paddingLeft: '4px' }}>Farmer App</span>
                    </option>
                    <option key={2} value='DRONER'>
                      <img src={icon.dronerApp} style={{ width: '20px', height: '20px' }} />
                      <span style={{ paddingLeft: '4px' }}>Droner App</span>
                    </option>
                  </Select>
                </Form.Item>
              </div>
              <div className='row pt-3'>
                <div className='form-group col-lg-12 d-flex flex-column'>
                  <label>
                    สถานะ<span style={{ color: 'red' }}> *</span>
                  </label>
                  <Form.Item name='status'>
                    <Radio.Group
                      className='d-flex flex-column'
                      onChange={(e) => {
                        handleShowTimer(e)
                      }}
                    >
                      <Radio value={'ACTIVE'}>ใช้งาน (เผยแพร่ทันที)</Radio>
                      <Radio value={'PENDING'}>
                        รอเผยแพร่
                        <div
                          className='d-flex flex-column'
                          style={{ display: showTimer ? 'block' : 'none' }}
                        >
                          <div className='d-flex'>
                            <div>
                              <label
                                style={{
                                  display: showTimer ? 'block' : 'none',
                                  paddingTop: 8,
                                }}
                              >
                                กำหนดเวลา <span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className='d-flex flex-row'>
                                <Form.Item
                                  name='startDate'
                                  style={{ display: showTimer ? 'block' : 'none' }}
                                  validateStatus={showTimer && duplicateTime ? 'error' : ''}
                                >
                                  <DatePicker
                                    disabledDate={disabledDateStart}
                                    placeholder='เลือกวันที่'
                                    format={dateFormat}
                                    defaultValue={moment()}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name='startTime'
                                  style={{ display: showTimer ? 'block' : 'none' }}
                                  validateStatus={showTimer && duplicateTime ? 'error' : ''}
                                >
                                  <TimePicker
                                    format={'HH:mm'}
                                    className='ms-3'
                                    placeholder='เลือกเวลา'
                                    defaultValue={moment('00:00', 'HH:mm')}
                                    allowClear={false}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Radio>
                      <Radio value={'DRAFTING'}>แบบร่าง</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <RenderVDOGuru vdo={selectedVideo} caption={caption} />
        <div className='col-7'>
          <FooterPage
            disableSaveBtn={saveBtnDisable}
            onClickBack={() => navigate(-1)}
            onClickSave={() => {
              setModalSave(true)
            }}
          />
        </div>
      </div>
      <ModalPage
        textHeader={'ยืนยันการสร้างข่าวสารไฮไลท์'}
        title={`โปรดตรวจสอบรายละเอียดที่คุณต้องการสร้างข่าวสารไฮไลท์
ก่อนเสมอเพราะอาจต่อการแสดงผลข่าวสารในระบบแอปพลิเคชัน`}
        visible={modalSave}
        data={undefined}
        backButton={() => {
          setModalSave(!modalSave)
        }}
        closeModal={() => setModalSave(!modalSave)}
        saveButton={onSubmit}
      />
    </>
  )
}

export default AddVideoGuru
