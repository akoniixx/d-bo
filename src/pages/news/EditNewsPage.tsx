import 'react-quill/dist/quill.snow.css'
import '../farmer/Style.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Checkbox, DatePicker, Form, Input, Radio, Select, Tag, TimePicker } from 'antd'
import { CardHeaderPromotion } from '../../components/header/CardHeaderPromotion'
import uploadImg from '../../resource/media/empties/upload_img_news.png'
import { color } from '../../resource'
import { resizeFileImg } from '../../utilities/ResizeImage'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../entities/UploadImageEntities'
import { formats, modules } from '../../components/editor/EditorToolbar'
import ReactQuill from 'react-quill'
import FooterPage from '../../components/footer/FooterPage'
import RenderNews from '../../components/mobile/RenderNews'
import { NewsDatasource } from '../../datasource/NewsDatasource'
import Swal from 'sweetalert2'
import { CampaignDatasource } from '../../datasource/CampaignDatasource'
import moment from 'moment'
const { Map } = require('immutable')
const _ = require('lodash')

function EditNewsPage() {
  const queryString = _.split(window.location.pathname, '=')
  const quillRef = useRef<any>(null)
  const dateFormat = 'DD/MM/YYYY'
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [imgProfile, setImgProfile] = useState<any>()
  const [status, setStatus] = useState<any>()
  const [chooseFarmer, setChooseFarmer] = useState<boolean>(false)
  const [chooseDroner, setChooseDroner] = useState<boolean>(false)
  const [chooseChallenge, setChooseChallenge] = useState<boolean>(false)
  const [chooseNews, setChooseNews] = useState<boolean>(false)
  const [application, setApplication] = useState<string>('')
  const [categoryNews, setCategoryNews] = useState<string>('')
  const [campId, setCampId] = useState<string>('')
  const [cName, setCname] = useState<any[]>([])
  const [newsName, setNewsName] = useState<string>('')
  const [farmCountPoint, setFarmCountPoint] = useState<any>()
  const [droneCountPoint, setDroneCountPoint] = useState<any>()
  const [typeLaunch, setTypeLaunch] = useState<string>('NON_ENDDATE')
  const [appPinMain, setAppPinMain] = useState<boolean>(false)
  const [appPinAll, setAppPinAll] = useState<boolean>(false)
  const [descriptionEditor, setDescriptionEditor] = useState<string | null>(null)

  const [createImgProfile, setCreateImgProfile] =
    useState<UploadImageEntity>(UploadImageEntity_INTI)

  const [timerNews, setTimerNews] = useState<string>('')
  const [showTimer, setShowTimer] = useState<boolean>(true)
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()
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
    // checkValidate(data);
    const d = Map(createImgProfile).set('file', isFileMoreThan2MB ? newSource : source)
    const e = Map(d.toJS()).set('resource', 'FARMER')
    const f = Map(e.toJS()).set('category', 'PROFILE_IMAGE')
    setCreateImgProfile(f.toJS())
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
    setBtnSaveDisable(true)
    form.setFieldValue('img', null)
    onFieldsChange()
    // checkValidate(data);
  }

  const handleDescriptionEditor = (content: any, delta: any, source: any, editor: any) => {
    setDescriptionEditor(editor.getHTML())
  }
  const handleChooseAppType = (e: any) => {
    setAppPinAll(false)
    setAppPinMain(false)
    setApplication(e)
  }

  const handleChooseChallenge = (e: any) => {
    setChooseChallenge(e.target.checked)
    handleChooseCategoryNews(e.target.checked, chooseNews)
  }
  const handleChooseNews = (e: any) => {
    setChooseNews(e.target.checked)
    handleChooseCategoryNews(chooseChallenge, e.target.checked)
  }
  const disableCheckPinMain =
    (status === 'DRAFTING' &&
      (application === 'FARMER'
        ? farmCountPoint?.disablePinMain === true && false
        : droneCountPoint?.disablePinMain === true && false)) ||
    !application

  const disableCheckPinAll =
    (status === 'DRAFTING' &&
      (application === 'FARMER'
        ? farmCountPoint?.disablePinAll === true && false
        : droneCountPoint?.disablePinAll === true && false)) ||
    !application
  const handleChooseCategoryNews = (challenge: boolean, news: boolean) => {
    if (challenge === false && news === false) {
      setCategoryNews('')
    } else if (challenge === true && news === false) {
      setCategoryNews('CHALLENGE')
    } else if (challenge === false && news === true) {
      setCategoryNews('NEWS')
    } else {
      setCategoryNews('ALL')
    }
  }
  const handleCampName = (e: any) => {
    setCampId(e)
  }
  const handlePinAll = (e: any) => {
    setAppPinAll(e.target.checked)
  }

  const handlePinMain = (e: any) => {
    setAppPinMain(e.target.checked)
  }

  const handleTimer = (e: any) => {
    setTimerNews(e.target.value)
  }

  const handleShowTimer = (e: any) => {
    setShowTimer(e.target.value === 'ACTIVE')
  }

  const handleTypeLaunch = (e: any) => {
    setTypeLaunch(e.target.value)
  }

  const disabledDateStart = (current: any) => {
    const customDate = moment().format('YYYY-MM-DD')
    return current && current < moment(customDate, 'YYYY-MM-DD')
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/png')
    input.click()

    input.onchange = async () => {
      const file = input?.files![0]
      NewsDatasource.uploadNewsImageDescription(file).then((resImg) => {
        setTimeout(() => {
          const range = quillRef.current.getEditor().getSelection(true)
          // eslint-disable-next-line prefer-const
          let quill = quillRef.current.getEditor()
          quill.insertEmbed(range.index, 'image', resImg.url)
          quill.formatText(range.index, 1, { width: `100%`, height: `200px` })
        }, 2000)
      })
    }
  }

  const modulesNews = useMemo(
    () => ({
      toolbar: {
        handlers: {
          image: imageHandler,
        },
        container: [
          ['bold', 'italic', 'link', 'image', 'video'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
      },
    }),
    [],
  )

  const onFieldsChange = () => {
    const quill = quillRef.current.getEditor()
    const imgs = quill.container.querySelectorAll('img')
    imgs.forEach((img: any) => img.classList.add('editor-img'))
    const { newsName, newsDescription, newsStatus, applicationType, img, newsTimer } =
      form.getFieldsValue()
    let fieldInfo = false
    let fieldapp = false
    let fieldimg = false
    if (newsName && newsDescription != '<p><br></p>' && newsStatus) {
      fieldInfo = false
    } else {
      fieldInfo = true
    }
    if (applicationType) {
      fieldapp = false
    } else {
      fieldapp = true
    }

    if (!img) {
      fieldimg = true
    } else {
      fieldimg = false
    }
    setBtnSaveDisable(fieldInfo || fieldapp || fieldimg)
  }

  const onSubmit = () => {
    const { newsName, newsDescription, newsStatus } = form.getFieldsValue()
    if (!createImgProfile.file) {
      NewsDatasource.editNews({
        id: queryString[1],
        title: newsName,
        details: newsDescription,
        status: newsStatus,
        application: application,
        categoryNews: categoryNews,
        campaignId: campId,
        createBy: profile.firstname + ' ' + profile.lastname,
        pinAll: appPinAll,
        pinMain: appPinMain,
      })
        .then((res) => {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then((time) => {
            navigate('/NewsPage')
          })
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            title: 'เกิดข้อผิดพลาก',
            icon: 'error',
            showConfirmButton: true,
          })
        })
    } else {
      NewsDatasource.editNews({
        id: queryString[1],
        title: newsName,
        details: newsDescription,
        status: newsStatus,
        application: application,
        categoryNews: categoryNews,
        campaignId: campId,
        file: createImgProfile.file,
        createBy: profile.firstname + ' ' + profile.lastname,
        pinAll: appPinAll,
        pinMain: appPinMain,
      })
        .then((res) => {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then((time) => {
            navigate('/NewsPage')
          })
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            title: 'เกิดข้อผิดพลาก',
            icon: 'error',
            showConfirmButton: true,
          })
        })
    }
  }

  useEffect(() => {
    NewsDatasource.getNewsById(queryString[1]).then((res) => {
      const dataAll = res
      if (res) {
        NewsDatasource.checkCountPoint('DRONER').then((res) => {
          if (res) {
            setDroneCountPoint(res.responseData)
            if (dataAll.status === 'DRAFTING' || dataAll.status === 'INACTIVE') {
              if (res.responseData.remainPinMain === 0 || res.responseData.remainPinAll === 0) {
                const { newsName, newsDescription, newsStatus } = form.getFieldsValue()
                NewsDatasource.editNews({
                  id: queryString[1],
                  title: newsName,
                  details: newsDescription,
                  status: newsStatus,
                  application: application,
                  categoryNews: categoryNews,
                  campaignId: campId,
                  createBy: profile.firstname + ' ' + profile.lastname,
                  pinAll: res.pinAll,
                  pinMain: res.pinMain,
                }).then((res) => {})
              }
            }
          }
        })
        NewsDatasource.checkCountPoint('FARMER').then((res) => {
          if (res) {
            setFarmCountPoint(res.responseData)
            if (dataAll.status === 'DRAFTING' || dataAll.status === 'INACTIVE') {
              if (res.responseData.remainPinMain === 0 || res.responseData.remainPinAll === 0) {
                const { newsName, newsDescription, newsStatus } = form.getFieldsValue()
                NewsDatasource.editNews({
                  id: queryString[1],
                  title: newsName,
                  details: newsDescription,
                  status: newsStatus,
                  application: application,
                  categoryNews: categoryNews,
                  campaignId: campId,
                  createBy: profile.firstname + ' ' + profile.lastname,
                  pinAll: res.pinAll,
                  pinMain: res.pinMain,
                }).then((res) => {})
              }
            }
          }
        })
      }
      form.setFieldsValue({
        img: res.imagePath,
        newsName: res.title,
        newsStatus: res.status,
        campName: res.campaign ? res.campaign.campaignName : null,
        newsDescription: res.details,
        applicationType: res.application,
        pinAll: res.pinAll,
        pinMain: res.pinMain,
        status: res.status,
        challenge:
          res.categoryNews === 'ALL' ? true : res.categoryNews === 'CHALLENGE' ? true : false,
        news: res.categoryNews === 'ALL' ? true : res.categoryNews === 'NEWS' ? true : false,
        createBy: res.createBy,
        typeLaunch: res.typeLaunch,
        startDate: !res.startDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startDate).toUTCString()),
        startTime: !res.startDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startDate).toUTCString()),
        endDate: !res.endDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.endDate).toUTCString()),
        endTime: !res.endTime
          ? moment(new Date().toUTCString())
          : moment(new Date(res.endTime).toUTCString()),
      })
      setStatus(res.status)
      setNewsName(res.title)
      setDescriptionEditor(res.details)
      setImgProfile(res.imagePath)
      setApplication(res.application)
      setAppPinMain(res.pinMain)
      setAppPinAll(res.pinAll)
      setCategoryNews(res.categoryNews)
      setTypeLaunch(res.typeLaunch)
      setChooseChallenge(
        res.categoryNews === 'ALL' ? true : res.categoryNews === 'CHALLENGE' ? true : false,
      )
      setChooseNews(res.categoryNews === 'ALL' ? true : res.categoryNews === 'NEWS' ? true : false)
      setShowTimer(res.status === 'PENDING')
    })
    if (quillRef.current) {
      const quill = quillRef.current.getEditor()

      quill.on('text-change', async () => {
        const imgs = quill.container.querySelectorAll('img')
        imgs.forEach((img: any) => img.classList.add('editor-img'))
      })
    }
  }, [])
  useEffect(() => {
    CampaignDatasource.getCampaignList(undefined, 'QUATA').then((res) => {
      setCname(res.data)
    })
  }, [])
  return (
    <>
      <div className='d-flex align-items-center'>
        <BackIconButton onClick={() => navigate(-1)} />
        <strong style={{ fontSize: '20px' }}>แก้ไขข่าวสาร</strong>
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
                      className='hiddenFileInputNews'
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
                <p className='text-center text-danger pt-1 pb-4'>
                  *รูปภาพจะต้องมีสัดส่วน 16:6 หรือ 1,000px * 375px เท่านั้น
                  เพื่อความสวยงามของภาพในแอปพลิเคชัน*
                </p>
              </div>
              <div className='form-group col-lg-12'>
                <label>
                  หัวข้อ <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  name='newsName'
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกหัวข้อข่าว!',
                    },
                  ]}
                >
                  <Input
                    placeholder='กรอกหัวข้อข่าว'
                    autoComplete='off'
                    onChange={(e) => {
                      setNewsName(e.target.value)
                    }}
                  />
                </Form.Item>
              </div>
              <div className='row pt-1 pb-5'>
                <div className='form-group col-lg-12'>
                  <label>
                    รายละเอียด <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Form.Item
                    name='newsDescription'
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกรายละเอียด!',
                      },
                    ]}
                  >
                    <ReactQuill
                      className='react-editor'
                      theme='snow'
                      onChange={handleDescriptionEditor}
                      placeholder={'กรอกรายละเอียด'}
                      modules={modulesNews}
                      formats={formats}
                      ref={quillRef}
                      style={{
                        height: '600px',
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='form-group col-lg-12'>
                <label>
                  ผู้เขียน <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item name='createBy'>
                  <Input autoComplete='off' disabled />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>
                  แอปพลิเคชั่น <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item initialValue={false} name='applicationType' className='my-0'>
                  <Select allowClear placeholder='เลือกแอปพลิเคชั่น' onChange={handleChooseAppType}>
                    <option key={1} value='FARMER'>
                      Farmer Application
                    </option>
                    <option key={2} value='DRONER'>
                      Droner Application
                    </option>
                  </Select>
                </Form.Item>
              </div>
              <div className='form-group col-lg ' style={{ paddingLeft: '3%' }}>
                <Form.Item initialValue={false} valuePropName='checked' className='my-0'>
                  <Checkbox
                    onChange={handlePinMain}
                    checked={
                      (status === 'DRAFTING' && application === 'FARMER'
                        ? farmCountPoint?.remainPinMain === 0
                        : droneCountPoint?.remainPinMain === 0) || !application
                        ? false
                        : appPinMain
                    }
                    className='pt-2'
                    disabled={disableCheckPinMain}
                  >
                    ปักหมุดในหน้าหลัก
                    <span
                      style={{
                        color: disableCheckPinMain ? color.Disable : color.Grey,
                      }}
                    >
                      {application === 'FARMER'
                        ? ` (เหลือปักหมุด ${farmCountPoint?.remainPinMain} อัน)`
                        : application === 'DRONER'
                        ? ` (เหลือปักหมุด ${droneCountPoint?.remainPinMain} อัน)`
                        : null}
                    </span>
                  </Checkbox>
                </Form.Item>
                <Form.Item initialValue={false} valuePropName='checked' className='my-0'>
                  <Checkbox
                    onChange={handlePinAll}
                    checked={
                      (status === 'DRAFTING' && application === 'FARMER'
                        ? farmCountPoint?.remainPinAll === 0
                        : droneCountPoint?.remainPinAll === 0) || !application
                        ? false
                        : appPinAll
                    }
                    disabled={disableCheckPinAll}
                  >
                    ปักหมุดในหน้าข่าวสารทั้งหมด
                    <span
                      style={{
                        color: disableCheckPinAll ? color.Disable : color.Grey,
                      }}
                    >
                      {application === 'FARMER'
                        ? ` (เหลือปักหมุด ${farmCountPoint?.remainPinAll} อัน)`
                        : application === 'DRONER'
                        ? ` (เหลือปักหมุด ${droneCountPoint?.remainPinAll} อัน)`
                        : null}
                    </span>
                  </Checkbox>
                </Form.Item>
              </div>
              <div className='form-group col-lg-12 pt-4'>
                <label>
                  หมวดหมู่ <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  initialValue={false}
                  name='news'
                  valuePropName='checked'
                  className='my-0'
                >
                  <Checkbox onChange={handleChooseNews} checked={chooseNews} className='pt-2'>
                    ข่าวสาร
                  </Checkbox>
                </Form.Item>
                <div className='row'>
                  <div className='col-lg'>
                    <Form.Item
                      initialValue={false}
                      name='challenge'
                      valuePropName='checked'
                      className='my-0'
                    >
                      <Checkbox
                        onChange={handleChooseChallenge}
                        checked={chooseChallenge}
                        className='mt-0'
                      >
                        ชาเลนจ์
                      </Checkbox>
                    </Form.Item>
                  </div>
                  <div className='col-lg-10'>
                    <Form.Item name='campName'>
                      <Select placeholder='เลือกชื่อชาเลนจ์' onChange={handleCampName}>
                        {cName &&
                          cName.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.campaignName}
                            </option>
                          ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className='row pt-3'>
                <div className='form-group col-lg-12 d-flex flex-column'>
                  <label>
                    สถานะ<span style={{ color: 'red' }}> *</span>
                  </label>
                  <Form.Item
                    name='newsStatus'
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาเลือกสถานะ',
                      },
                    ]}
                  >
                    <Radio.Group className='d-flex flex-column' onChange={handleShowTimer}>
                      <Radio value={'ACTIVE'}>ใช้งาน (เผยแพร่ทันที)</Radio>
                      <Radio value={'PENDING'}>
                        รอเผยแพร่ (ตั้งวันและเวลา)
                        <div
                          className='d-flex flex-column'
                          style={{ display: showTimer ? 'block' : 'none' }}
                        >
                          <div className='d-flex flex-row align-items-center'>
                            <Form.Item
                              name='typeLaunch'
                              rules={[
                                {
                                  required: true,
                                  message: 'กรุณาเลือกสถานะ',
                                },
                              ]}
                              style={{ display: showTimer ? 'block' : 'none' }}
                            >
                              <Radio.Group
                                style={{
                                  display: 'flex',
                                  flexFlow: 'row',
                                }}
                                defaultValue={'NON_ENDDATE'}
                                onChange={handleTypeLaunch}
                              >
                                <Radio value={'NON_ENDDATE'}>ไม่มีวันเวลาสิ้นสุด</Radio>
                                <Radio value={'IS_ENDDATE'}>มีกำหนดวันเวลาสิ้นสุด</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                          <div className='d-flex'>
                            <div>
                              <label style={{ display: showTimer ? 'block' : 'none' }}>
                                วันเริ่มต้น <span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className='d-flex flex-row'>
                                <Form.Item
                                  name='startDate'
                                  style={{ display: showTimer ? 'block' : 'none' }}
                                >
                                  <DatePicker
                                    placeholder='เลือกวันที่'
                                    format={dateFormat}
                                    disabledDate={disabledDateStart}
                                    onChange={() => {}}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name='startTime'
                                  style={{ display: showTimer ? 'block' : 'none' }}
                                >
                                  <TimePicker
                                    format={'HH:mm'}
                                    className='ms-3'
                                    placeholder='เลือกเวลา'
                                    allowClear={false}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className='mx-4'>
                              <label
                                style={{
                                  display: showTimer
                                    ? typeLaunch === 'IS_ENDDATE'
                                      ? 'block'
                                      : 'none'
                                    : 'none',
                                }}
                              >
                                วันสิ้นสุด <span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className='d-flex flex-row'>
                                <Form.Item
                                  name='endDate'
                                  style={{
                                    display: showTimer
                                      ? typeLaunch === 'IS_ENDDATE'
                                        ? 'block'
                                        : 'none'
                                      : 'none',
                                  }}
                                >
                                  <DatePicker
                                    placeholder='เลือกวันที่'
                                    format={dateFormat}
                                    disabledDate={disabledDateStart}
                                    onChange={() => {}}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name='endTime'
                                  style={{
                                    display: showTimer
                                      ? typeLaunch === 'IS_ENDDATE'
                                        ? 'block'
                                        : 'none'
                                      : 'none',
                                  }}
                                >
                                  <TimePicker
                                    format={'HH:mm'}
                                    className='ms-3'
                                    placeholder='เลือกเวลา'
                                    allowClear={false}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Radio>
                      <Radio value={'DRAFTING'}>รอเปิดใช้งาน</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <RenderNews img={imgProfile} description={descriptionEditor!} name={newsName} />
        <div className='col-8'>
          <FooterPage
            disableSaveBtn={saveBtnDisable}
            onClickBack={() => navigate(-1)}
            onClickSave={onSubmit}
          />
        </div>
      </div>
    </>
  )
}

export default EditNewsPage
