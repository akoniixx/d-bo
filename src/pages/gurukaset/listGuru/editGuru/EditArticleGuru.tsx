import 'react-quill/dist/quill.snow.css'
import '../../../farmer/Style.css'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../../../entities/UploadImageEntities'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Form, Input, Radio, Select, Tag, TimePicker } from 'antd'
import { resizeFileImg } from '../../../../utilities/ResizeImage'
import moment from 'moment'
import { BackIconButton } from '../../../../components/button/BackButton'
import { CardHeaderPromotion } from '../../../../components/header/CardHeaderPromotion'
import uploadImg from '../../../../resource/media/empties/upload_img_quota.png'
import color from '../../../../resource/color'
import icon from '../../../../resource/icon'
import FooterPage from '../../../../components/footer/FooterPage'
import { ModalPage } from '../../../../components/modal/ModalPage'
import RenderArticleGuru from '../../../../components/mobile/RenderArticleGuru'
import ReactQuill from 'react-quill'
import { formats } from '../../../../components/editor/EditorToolbar'
import Swal from 'sweetalert2'
import { GuruKasetDataSource } from '../../../../datasource/GuruKasetDatasource'
import { GroupGuruDataSource } from '../../../../datasource/GroupGuruDatasource'
const _ = require('lodash')
const { Map } = require('immutable')

function EditArticleGuru() {
  const queryString = _.split(window.location.pathname, '=')
  const guruId = queryString[1]
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [imgGuru, setImgGuru] = useState<any>()
  const [createImgGuru, setCreateImgGuru] = useState<UploadImageEntity>(UploadImageEntity_INTI)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [showTimer, setShowTimer] = useState<boolean>(false)
  const dateFormat = 'DD/MM/YYYY'
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [name, setName] = useState<any>()
  const [category, setCategory] = useState<any>()
  const [modalSave, setModalSave] = useState<boolean>(false)
  const quillRef = useRef<any>(null)
  const [descriptionEditor, setDescriptionEditor] = useState<string | null>(null)
  const [groupGuru, setGroupGuru] = useState<any>()
  const [groupName, setGroupName] = useState<any>()
  const [groupingId, setGroupingId] = useState<any>()
  const [createBy, setCreateBy] = useState<any>()

  useEffect(() => {
    GuruKasetDataSource.getAllGuruKasetById(guruId).then((res) => {
      if (res) {
        setImgGuru(res.image)
        setCreateBy(res.createBy)
        setDescriptionEditor(res.description)
        setName(res.name)
        form.setFieldsValue({
          img: res.image,
          name: res.name,
          status: res.status,
          description: res.description,
          grouping: res.grouping,
          startDate: !res.startDate
            ? moment(new Date().toUTCString())
            : moment(new Date(res.startDate).toUTCString()),
          startTime: !res.startDate
            ? moment(new Date().toUTCString())
            : moment(new Date(res.startDate).toUTCString()),
          application: res.application,
        })
        if (res.grouping) {
          GroupGuruDataSource.getGroupGuruById(res.grouping).then((res) => {
            setGroupName(res)
          })
        }
      }
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
    GroupGuruDataSource.getAllGroupGuru().then((res) => {
      if (res) {
        setGroupGuru(res.data)
      }
    })
  }, [])

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
  const handleDescriptionEditor = (content: any, delta: any, source: any, editor: any) => {
    setDescriptionEditor(editor.getHTML())
  }
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/png')
    input.click()
    input.onchange = async () => {
      const file = input?.files![0]
      GuruKasetDataSource.uploadImageDescription(file).then((resImg) => {
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
  const modulesGuru = useMemo(
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
  const removeImgProfile = () => {
    setImgGuru(undefined)
    setCreateImgGuru(UploadImageEntity_INTI)
    form.setFieldValue('img', null)
    onFieldsChange()
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

  const onFieldsChange = () => {
    const quill = quillRef.current.getEditor()
    const imgs = quill.container.querySelectorAll('img')
    imgs.forEach((img: any) => img.classList.add('editor-img'))
    const { name, description, application, startDate, startTime, status, img } =
      form.getFieldsValue()
    let fieldInfo = false
    let fieldDate = false

    if (name && description !== '<p><br></p>' && descriptionEditor && application && img) {
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
    const { name, description, application, startDate, startTime, status, img } =
      form.getFieldsValue()
    let dateStartPending: string | null = null

    if (status === 'PENDING') {
      dateStartPending =
        moment(startDate).format('YYYY-MM-DD') + ' ' + moment(startTime).format('HH:mm:ss')
    }

    try {
      const requestData: any = {
        id: guruId,
        name: name,
        status: status,
        description: description,
        application: application,
        createBy: createBy,
        updateBy: profile.firstname + ' ' + profile.lastname,
        file: createImgGuru.file,
        type: 'ARTICLE',
        groupingId: groupingId ? groupingId : groupName?._id,
      }
      if (status === 'PENDING') {
        requestData.startDate = dateStartPending
      }
      const res = await GuruKasetDataSource.editGuruKaset(requestData)

      if (res) {
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
        <strong style={{ fontSize: '20px' }}>แก้ไขบทความ</strong>
      </div>
      <br />
      <div className='row'>
        <div className='col-lg-7'>
          <CardHeaderPromotion textHeader='ข้อมูลบทความ' center={false} />
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
                      className='hiddenFileInputGuru'
                      style={{
                        backgroundImage: `url(${imgGuru == undefined ? uploadImg : imgGuru})`,
                      }}
                    >
                      <input
                        key={imgGuru}
                        type='file'
                        onChange={onChangeProfile}
                        title='เลือกรูป'
                      />
                    </div>
                  </Form.Item>
                  <div>
                    {imgGuru != undefined && (
                      <div className='pb-2'>
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span className='text-center text-muted' style={{ fontSize: '13px' }}>
                รูปภาพจะต้องมีสัดส่วน 1:1 หรือ 1,000px * 1,000px เท่านั้น
                เพื่อความสวยงามของภาพในแอปพลิเคชัน
              </span>
              <div className='form-group col-lg-12 pt-4'>
                <label>
                  หัวข้อ <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกหัวข้อ!',
                    },
                  ]}
                >
                  <Input
                    placeholder='กรอกหัวข้อ'
                    autoComplete='off'
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </Form.Item>
              </div>
              <div className='form-group col-lg-12 pt-1 pb-5'>
                <label>
                  รายละเอียด <span style={{ color: 'red' }}>*</span>
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
                  <ReactQuill
                    className='react-editor'
                    theme='snow'
                    onChange={handleDescriptionEditor}
                    placeholder={'กรอกรายละเอียด'}
                    modules={modulesGuru}
                    formats={formats}
                    ref={quillRef}
                    style={{
                      height: '400px',
                    }}
                  />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>
                  แอปพลิเคชั่น <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item name='application' className='my-0'>
                  <Select allowClear placeholder='เลือกแอปพลิเคชั่น'>
                    <option key='FARMER' value='FARMER'>
                      <img src={icon.farmerApp} style={{ width: '20px', height: '20px' }} />
                      <span style={{ paddingLeft: '4px' }}>Farmer App</span>
                    </option>
                    <option key='DRONER' value='DRONER'>
                      <img src={icon.dronerApp} style={{ width: '20px', height: '20px' }} />
                      <span style={{ paddingLeft: '4px' }}>Droner App</span>
                    </option>
                  </Select>
                </Form.Item>
              </div>
              <div className='form-group col-lg-12 pt-4 pb-2'>
                <label>
                  หมวดหมู่ <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item initialValue={false} valuePropName='select' className='my-0'>
                  <Select
                    key={groupName?._id}
                    allowClear
                    placeholder='เลือกหมวดหมู่'
                    defaultValue={groupName?.groupName}
                    onChange={(e: any) => {
                      if (e) {
                        const findGetName = groupGuru.find((i: any) => i._id === e)
                        setGroupingId(e)
                        setCategory(findGetName?.groupName)
                        setBtnSaveDisable(false)
                      } else {
                        setBtnSaveDisable(true)
                      }
                    }}
                  >
                    {groupGuru &&
                      groupGuru.map((item: any) => (
                        <option key={item._id} value={item?._id}>
                          <span style={{ paddingLeft: '4px' }}>{item.groupName}</span>
                        </option>
                      ))}
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
                      <Radio value={'INACTIVE'}>ปิดการใช้งาน</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <RenderArticleGuru
          img={imgGuru}
          title={name}
          detail={descriptionEditor!}
          category={category ? category : groupName?.groupName}
        />
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

export default EditArticleGuru
