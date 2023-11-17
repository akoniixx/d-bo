import 'react-quill/dist/quill.snow.css'
import '../farmer/Style.css'
import React, { useEffect, useRef, useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Form, Input, Radio, Select, Tag, TimePicker, message } from 'antd'
import { CardHeaderPromotion } from '../../components/header/CardHeaderPromotion'
import uploadImg from '../../resource/media/empties/upload_img_highlight.png'
import { color, icon } from '../../resource'
import { resizeFileImg } from '../../utilities/ResizeImage'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../entities/UploadImageEntities'
import { NewsDatasource } from '../../datasource/NewsDatasource'
import Swal from 'sweetalert2'
import { CampaignDatasource } from '../../datasource/CampaignDatasource'
import moment from 'moment'
import RenderHighLight from '../../components/mobile/RenderHighLight'
import { HighlightDatasource } from '../../datasource/HighlightDatasource'
import { AddHighlightEntities } from '../../entities/HighlightEntities'
import FooterPage from '../../components/footer/FooterPage'
import { ModalPage } from '../../components/modal/ModalPage'
const { Map } = require('immutable')

function AddHighlightPage() {
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [imgProfile, setImgProfile] = useState<any>()
  const [createImgProfile, setCreateImgProfile] =
    useState<UploadImageEntity>(UploadImageEntity_INTI)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [showTimer, setShowTimer] = useState<boolean>(false)
  const [showTimerActive, setShowTimerActive] = useState<boolean>(false)
  const dateFormat = 'DD/MM/YYYY'
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [duplicateTime, setDuplicateTime] = useState<any>()
  const [modalSave, setModalSave] = useState<boolean>(false)

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

    setImgProfile(img_base64)
    const d = Map(createImgProfile).set('file', isFileMoreThan2MB ? newSource : source)
    setCreateImgProfile(d.toJS())
  }

  const onPreviewProfile = async () => {
    let src = imgProfile
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgProfile)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const removeImgProfile = () => {
    setImgProfile(undefined)
    setCreateImgProfile(UploadImageEntity_INTI)
    form.setFieldValue('img', null)
    onFieldsChange()
    // checkValidate(data);
  }

  const handleShowTimer = (e: any) => {
    setShowTimer(e.target.value === 'PENDING')
    setShowTimerActive(e.target.value === 'ACTIVE')

    if (showTimer || showTimerActive) {
      form.resetFields(['startDate', 'startTime', 'endDate', 'endTime'])
    }
  }

  const disabledDateEnd = (current: any) => {
    const f = form.getFieldsValue()
    const startDate = moment(f.startDate).format('YYYY-MM-DD')
    return current && current < moment(startDate, 'YYYY-MM-DD')
  }

  const disabledDateStart = (current: any) => {
    return current && current.isBefore(moment())
  }

  const checkDupDateTime = () => {
    const { application, startDate, startTime, endDate, endTime, status } = form.getFieldsValue()
    const start =
      moment(startDate).format('YYYY-MM-DD') + ' ' + moment(startTime).format('HH:mm:ss')
    const end = moment(endDate).format('YYYY-MM-DD') + ' ' + moment(endTime).format('HH:mm:ss')
    if (status !== 'DRAFTING') {
      HighlightDatasource.checkDuplicate(application, start, end).then((res) => {
        if (res.success === false && res.userMessage === 'dupplicate') {
          setDuplicateTime(
            'กรุณาเปลี่ยนแปลงช่วงเวลา “วันเริ่มต้น” หรือ “วันสิ้นสุด” เนื่องจากซ้ำกับช่วงเวลาของข่าวสารไฮไลท์อื่นที่สร้างไว้ก่อนหน้า',
          )
          setBtnSaveDisable(true)
        } else {
          setDuplicateTime(undefined)
          setBtnSaveDisable(false)
        }
      })
    }
  }

  const onFieldsChange = () => {
    const { name, urlName, application, startDate, startTime, endDate, endTime, status, img } =
      form.getFieldsValue()
    let fieldInfo = false
    let fieldapp = false
    let fieldimg = false
    let fieldDate = false

    if (name && urlName) {
      fieldInfo = false
    } else {
      fieldInfo = true
    }

    if (application) {
      fieldapp = false
    } else {
      fieldapp = true
    }

    if (!img) {
      fieldimg = true
    } else {
      fieldimg = false
    }

    if (status !== 'DRAFTING') {
      if (startDate && startTime && endDate && endTime) {
        fieldDate = false
      } else {
        fieldDate = true
      }
    } else {
      fieldDate = false
    }
    console.log(fieldInfo, fieldapp, fieldimg, fieldDate)
    setBtnSaveDisable(fieldInfo || fieldapp || fieldimg || fieldDate)
  }
  const onSubmit = async () => {
    const { name, urlName, application, startDate, startTime, endDate, endTime, status } =
      form.getFieldsValue()
    let dateStartActive: string | null = null
    let dateEndActive: string | null = null
    let dateStartPending: string | null = null
    let dateEndPending: string | null = null

    if (status === 'ACTIVE') {
      dateStartActive = moment().format('YYYY-MM-DD') + ' ' + moment(startTime).format('HH:mm:ss')
      dateEndActive =
        moment(endDate).format('YYYY-MM-DD') + ' ' + moment(endTime).format('HH:mm:ss')
    } else if (status === 'PENDING') {
      dateStartPending =
        moment(startDate).format('YYYY-MM-DD') + ' ' + moment(startTime).format('HH:mm:ss')
      dateEndPending =
        moment(endDate).format('YYYY-MM-DD') + ' ' + moment(endTime).format('HH:mm:ss')
    }

    try {
      const requestData: AddHighlightEntities = {
        name: name,
        status: status,
        urlNews: urlName,
        application: application,
        createBy: profile.firstname + ' ' + profile.lastname,
        updateBy: profile.firstname + ' ' + profile.lastname,
        file: createImgProfile.file,
      }

      if (status === 'ACTIVE') {
        requestData.startDate = dateStartActive
        requestData.endDate = dateEndActive
      } else if (status === 'PENDING') {
        requestData.startDate = dateStartPending
        requestData.endDate = dateEndPending
      }

      const res = await HighlightDatasource.addNewsHighlight(requestData)
      if (res) {
        setModalSave(!modalSave)
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/HighlightNewsPage')
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
        <strong style={{ fontSize: '20px' }}>เพิ่มข่าวสารไฮไลท์</strong>
      </div>
      <br />
      <div className='row'>
        <div className='col-8'>
          <CardHeaderPromotion textHeader='ข้อมูลข่าวสาร' center={false} />
          <div className='bg-white px-5 py-3'>
            <Form form={form} onFieldsChange={onFieldsChange}>
              <div className='row'>
                <div className='form-group text-center pt-4'>
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
                      className='hiddenFileInputHighLight'
                      style={{
                        backgroundImage: `url(${imgProfile == undefined ? uploadImg : imgProfile})`,
                      }}
                    >
                      <input
                        key={imgProfile}
                        type='file'
                        onChange={onChangeProfile}
                        title='เลือกรูป'
                      />
                    </div>
                  </Form.Item>
                  <div>
                    {imgProfile != undefined && (
                      <>
                        <Tag
                          color={color.Success}
                          onClick={onPreviewProfile}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '5px',
                          }}
                        >
                          View
                        </Tag>
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
                      </>
                    )}
                  </div>
                </div>
                <p className='text-center text-muted pt-1 pb-4 pt-3'>
                  **รูปภาพจะต้องมีสัดส่วน 4:5 หรือ 1200*1500px เท่านั้น
                  เพื่อความสวยงามของภาพในแอปพลิเคชัน**
                </p>
              </div>
              <div className='form-group col-lg-12'>
                <label>
                  หัวข่าวสาร <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกชื่อข่าวสาร!',
                    },
                  ]}
                >
                  <Input placeholder='กรอกชื่อข่าวสาร' autoComplete='off' />
                </Form.Item>
              </div>
              <div className='form-group col-lg-12'>
                <label>URL ภาพข่าวสาร</label>
                <Form.Item name='urlName'>
                  <Input placeholder='กรอก URL ภาพข่าวสาร' autoComplete='off' />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>
                  แอปพลิเคชั่น <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  initialValue={false}
                  name='application'
                  valuePropName='select'
                  className='my-0'
                >
                  <Select
                    allowClear
                    placeholder='เลือกแอปพลิเคชั่น'
                    onChange={() => checkDupDateTime()}
                  >
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
                        checkDupDateTime()
                        handleShowTimer(e)
                      }}
                    >
                      <Radio value={'ACTIVE'}>
                        ใช้งาน (เผยแพร่ทันที)
                        <div
                          className='d-flex flex-column'
                          style={{ display: showTimerActive ? 'block' : 'none' }}
                        >
                          <div className='d-flex'>
                            <div>
                              <label
                                style={{
                                  display: showTimerActive ? 'block' : 'none',
                                  paddingTop: 8,
                                }}
                              >
                                วันเริ่มต้น <span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className='d-flex flex-row'>
                                <Form.Item
                                  initialValue={moment()}
                                  name='startDate'
                                  style={{ display: showTimerActive ? 'block' : 'none' }}
                                >
                                  <DatePicker
                                    placeholder='เลือกวันที่'
                                    format={dateFormat}
                                    disabled
                                    defaultValue={moment()}
                                    onChange={(e) => {
                                      if (e) {
                                        checkDupDateTime()
                                      }
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  initialValue={moment('00:00', 'HH:mm')}
                                  name='startTime'
                                  style={{ display: showTimerActive ? 'block' : 'none' }}
                                >
                                  <TimePicker
                                    disabled
                                    format={'HH:mm'}
                                    className='ms-3'
                                    placeholder='เลือกเวลา'
                                    defaultValue={moment('00:00', 'HH:mm')}
                                    allowClear={false}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className='mx-4'>
                              <label
                                style={{
                                  display: showTimerActive ? 'block' : 'none',
                                  paddingTop: 8,
                                }}
                              >
                                วันสิ้นสุด <span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className='d-flex flex-row'>
                                <Form.Item
                                  initialValue={moment()}
                                  name='endDate'
                                  style={{
                                    display: showTimerActive ? 'block' : 'none',
                                  }}
                                  validateStatus={showTimerActive && duplicateTime ? 'error' : ''}
                                >
                                  <DatePicker
                                    placeholder='เลือกวันที่'
                                    format={dateFormat}
                                    disabledDate={disabledDateEnd}
                                    defaultValue={moment()}
                                    onChange={(e) => {
                                      if (e) {
                                        checkDupDateTime()
                                      }
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  initialValue={moment('23:59', 'HH:mm')}
                                  name='endTime'
                                  style={{
                                    display: showTimerActive ? 'block' : 'none',
                                  }}
                                  validateStatus={showTimerActive && duplicateTime ? 'error' : ''}
                                >
                                  <TimePicker
                                    format={'HH:mm'}
                                    className='ms-3'
                                    placeholder='เลือกเวลา'
                                    defaultValue={moment('23:59', 'HH:mm')}
                                    allowClear={false}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                        {showTimerActive && duplicateTime && (
                          <span style={{ color: color.Error, fontSize: '13px' }}>
                            {duplicateTime}
                          </span>
                        )}
                      </Radio>
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
                                วันเริ่มต้น <span style={{ color: 'red' }}>*</span>
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
                                    onChange={(e) => {
                                      if (e) {
                                        checkDupDateTime()
                                      }
                                    }}
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
                            <div className='mx-4'>
                              <label
                                style={{
                                  display: showTimer ? 'block' : 'none',
                                  paddingTop: 8,
                                }}
                              >
                                วันสิ้นสุด <span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className='d-flex flex-row'>
                                <Form.Item
                                  name='endDate'
                                  style={{
                                    display: showTimer ? 'block' : 'none',
                                  }}
                                  validateStatus={showTimer && duplicateTime ? 'error' : ''}
                                >
                                  <DatePicker
                                    placeholder='เลือกวันที่'
                                    format={dateFormat}
                                    disabledDate={disabledDateEnd}
                                    defaultValue={moment()}
                                    onChange={(e) => {
                                      if (e) {
                                        checkDupDateTime()
                                      }
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name='endTime'
                                  style={{
                                    display: showTimer ? 'block' : 'none',
                                  }}
                                  validateStatus={showTimer && duplicateTime ? 'error' : ''}
                                >
                                  <TimePicker
                                    format={'HH:mm'}
                                    className='ms-3'
                                    placeholder='เลือกเวลา'
                                    defaultValue={moment('23:59', 'HH:mm')}
                                    allowClear={false}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                        {showTimer && duplicateTime && (
                          <span style={{ color: color.Error, fontSize: '13px' }}>
                            {duplicateTime}
                          </span>
                        )}
                      </Radio>
                      <Radio value={'DRAFTING'}>รอเปิดใช้งาน</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <RenderHighLight img={imgProfile} />
        <div className='col-8'>
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

export default AddHighlightPage
