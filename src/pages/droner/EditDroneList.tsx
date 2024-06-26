import React, { useEffect, useState } from 'react'
import { Row, Form, Input, Select, Radio, Space, Tag, Checkbox, message } from 'antd'

import { CardContainer } from '../../components/card/CardContainer'
import color from '../../resource/color'
import { CardHeader } from '../../components/header/CardHearder'
import FooterPage from '../../components/footer/FooterPage'
import { BackIconButton } from '../../components/button/BackButton'
import TextArea from 'antd/lib/input/TextArea'
import Swal from 'sweetalert2'
import { DronerDroneDatasource } from '../../datasource/DronerDroneDatasource'
import { GetDronerDroneEntity, GetDronerDroneEntity_INIT } from '../../entities/DronerDroneEntities'
import { DRONER_DRONE_STATUS, DRONER_STATUS } from '../../definitions/DronerStatus'
import { ImageEntity, ImageEntity_INTI } from '../../entities/UploadImageEntities'
import { UploadImageDatasouce } from '../../datasource/UploadImageDatasource'
import bth_img_empty from '../../resource/media/empties/upload_Img_btn.png'
import { DroneBrandEntity } from '../../entities/DroneBrandEntities'
import { DroneEntity } from '../../entities/DroneEntities'
import { DroneDatasource } from '../../datasource/DroneDatasource'
import { formatDate } from '../../utilities/TextFormatter'
import { MONTH_SALE } from '../../definitions/Month'
import { REASON_CHECK, REASON_IS_CHECK } from '../../definitions/Reason'
import img_empty from '../../resource/media/empties/uploadImg.png'
import moment from 'moment'
import image from '../../resource/image'
import { DashboardLayout } from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import '../farmer/Style.css'

const { Option } = Select
const _ = require('lodash')
const { Map } = require('immutable')

function EditDroneList() {
  const queryString = _.split(window.location.search, '=')
  const navigate = useNavigate()
  const DronerDroneId = queryString[1]
  const [data, setData] = useState<GetDronerDroneEntity>(GetDronerDroneEntity_INIT)
  const [dronerId, setDronerId] = useState('')
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>()
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>()
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false)
  const [imgProfile, setImgProfile] = useState<any>()
  const [createLicenseDroner, setCreateLicenseDroner] = useState<ImageEntity>(ImageEntity_INTI)
  const [createLicenseDrone, setCreateLicenseDrone] = useState<ImageEntity>(ImageEntity_INTI)
  const imgList: (string | boolean)[] = []
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>(false)
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>(false)
  const [textReason, setTextReason] = useState<any>()
  const [textReasonMore, setTextReasonMore] = useState<any>()
  const [validateText, setValidateText] = useState<any>('')
  const [validateText1, setValidateText1] = useState<any>('')
  const [locationDroner, setLocationDroner] = useState<any>()

  const fetchDronerDrone = async () => {
    await DronerDroneDatasource.getDronerDroneById(DronerDroneId).then((res) => {
      const droner_address = res.droner.address.subdistrictId
      if (res.droner.address !== null) {
        LocationDatasource.getSubdistrict(res.droner.address.districtId).then((res) => {
          setLocationDroner(res.find((item) => item.subdistrictId === droner_address))
        })
      }
      setData(res)
      setDronerId(res.dronerId)
      const getPathPro = res.droner.file.filter((x) => x.category === 'PROFILE_IMAGE')
      const getLicenseDroner = res.file?.filter((x) => x.category === 'DRONER_LICENSE')
      const getLicenseDrone = res.file?.filter((x) => x.category === 'DRONE_LICENSE')
      imgList.push(
        getPathPro.length >= 1 ? getPathPro[0].path : '',
        getLicenseDroner.length >= 1 ? getLicenseDroner[0].path : '',
        getLicenseDrone.length >= 1 ? getLicenseDrone[0].path : '',
      )
      let i = 0
      for (i; imgList.length > i; i++) {
        i === 0 &&
          UploadImageDatasouce.getImage(imgList[i].toString()).then((resImg) => {
            setImgProfile(resImg.url)
          })
        i === 1 &&
          UploadImageDatasouce.getImage(imgList[i].toString()).then((resImg) => {
            setImgLicenseDroner(resImg.url)
          })
        i === 2 &&
          UploadImageDatasouce.getImage(imgList[i].toString()).then((resImg) => {
            setImgLicenseDrone(resImg.url)
          })
      }
    })
  }
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrand(res.data)
    })
  }
  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500).then((res) => {
      setSeriesDrone(res.data)
      setSearchSeriesDrone(res.data)
    })
  }
  useEffect(() => {
    fetchDronerDrone()
    fetchDroneBrand()
    fetchDroneSeries()
  }, [])

  const handleBrand = (brand: string) => {
    !brand || data.id !== brand ? setBtnSaveDisable(true) : setBtnSaveDisable(false)
    const filterSeries = seriesDrone?.filter((x) => x.droneBrandId === brand)
    setSearchSeriesDrone(filterSeries)
    const m = Map(data.drone).set('droneBrandId', brand)
    const t = Map(data).set('drone', m.toJS())
    setData(t.toJS())
  }
  const handleSeries = async (id: string) => {
    !id ? setBtnSaveDisable(true) : setBtnSaveDisable(false)

    const m = Map(data).set('droneId', id)
    setData(m.toJS())
  }
  const handleSerialNo = async (e: any) => {
    !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false)

    const m = Map(data).set('serialNo', e.target.value)
    setData(m.toJS())
  }
  const handleChangeStatus = (e: any) => {
    e.target.value === 'REJECTED' || e.target.value === 'INACTIVE'
      ? setBtnSaveDisable(true)
      : setBtnSaveDisable(false)

    const m = Map(data).set('status', e.target.value)
    const n = Map(m.toJS()).set('reason', [])
    setTextReason('')
    setTextReasonMore('')
    setData(n.toJS())
  }
  const handleMonth = async (e: any) => {
    const m = Map(data).set('purchaseMonth', e)
    setData(m.toJS())
    setBtnSaveDisable(false)
  }
  const handleYear = async (e: any) => {
    const year = moment().add(543, 'year').format('YYYY')

    e.target.value > year ? setBtnSaveDisable(true) : setBtnSaveDisable(false)

    const m = Map(data).set('purchaseYear', e.target.value)
    setData(m.toJS())
  }
  const onChangeReason = (e: any) => {
    const checked = e.target.checked
    const value = e.target.value
    REASON_IS_CHECK.map((item) =>
      _.set(item, 'isChecked', item.reason === value ? checked : item.isChecked),
    )
    let p: any = ''
    if (checked) {
      p = Map(data).set(
        'reason',
        [...data.reason, value].filter((x) => x !== ''),
      )
    } else {
      const removeReason = data.reason.filter((x) => x !== value)
      p = Map(data).set('reason', removeReason)
    }
    setData(p.toJS())
    checkValidate(p.toJS())
  }
  const onChangeReasonText = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setTextReason(e.target.value)
      setBtnSaveDisable(false)
    } else {
      if (
        REASON_IS_CHECK[0].isChecked ||
        REASON_IS_CHECK[1].isChecked ||
        REASON_IS_CHECK[2].isChecked
      ) {
        setBtnSaveDisable(false)
      } else {
        setValidateText1('error')
        setBtnSaveDisable(true)
      }
    }
  }
  const checkValidate = (data?: GetDronerDroneEntity) => {
    let checkEmptyReason = false
    if (data?.reason !== undefined) {
      checkEmptyReason =
        ![data?.reason][0]?.includes('') &&
        data?.reason.length !== 0 &&
        data?.reason !== null &&
        data?.reason !== undefined
    }
    if (checkEmptyReason) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }
  const onChangeReasonTextMore = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim().length !== 0) {
      setTextReasonMore(e.target.value)
      setBtnSaveDisable(false)
    } else {
      setValidateText('error')
      setBtnSaveDisable(true)
    }
  }
  const onChangeLicenseDroner = async (file: any) => {
    let src = file.target.files[0]
    src = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(src)
      reader.onload = () => resolve(reader.result)
    })
    setImgLicenseDroner(src)
    const d = Map(createLicenseDroner).set('file', file.target.files[0])
    const e = Map(d.toJS()).set('resource', 'DRONER_DRONE')
    const f = Map(e.toJS()).set('category', 'DRONER_LICENSE')
    const g = Map(f.toJS()).set('resourceId', DronerDroneId)
    setCreateLicenseDroner(g.toJS())
    const pushImg = Map(data).set('file', [...data.file.filter((x) => x.file !== ''), g.toJS()])
    setData(pushImg.toJS())
    setBtnSaveDisable(false)
  }
  const previewLicenseDroner = async () => {
    let src = imgLicenseDroner
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgLicenseDroner)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const removeLicenseDroner = () => {
    const getImg = data.file.filter((x) => x.category === 'DRONER_LICENSE')[0]
    if (getImg !== undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then((res) => {})
    }
    setImgLicenseDroner(false)
    setBtnSaveDisable(false)
  }

  const onChangeLicenseDrone = async (file: any) => {
    let src = file.target.files[0]
    src = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(src)
      reader.onload = () => resolve(reader.result)
    })
    setImgLicenseDrone(src)
    const d = Map(createLicenseDrone).set('file', file.target.files[0])

    const e = Map(d.toJS()).set('resource', 'DRONER_DRONE')
    const f = Map(e.toJS()).set('category', 'DRONE_LICENSE')
    const g = Map(f.toJS()).set('resourceId', DronerDroneId)
    setCreateLicenseDrone(g.toJS())
    const pushImg = Map(data).set('file', [...data.file.filter((x) => x.file !== ''), g.toJS()])
    setData(pushImg.toJS())
    setBtnSaveDisable(false)
  }
  const previewLicenseDrone = async () => {
    let src = imgLicenseDrone
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgLicenseDrone)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const removeLicenseDrone = () => {
    const getImg = data.file.filter((x) => x.category === 'DRONE_LICENSE')[0]
    if (getImg !== undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then((res) => {})
    }
    setImgLicenseDrone(false)
    setBtnSaveDisable(false)
  }
  const UpdateDronerDrone = async () => {
    const textReasonList = []
    if (textReason !== undefined) {
      const m = textReason.split(',')
      for (let i = 0; m.length > i; i++) {
        textReasonList.push(m[i])
      }
    }
    if (textReasonMore !== undefined) {
      const m = textReasonMore.split(',')
      for (let i = 0; m.length > i; i++) {
        textReasonList.push(m[i])
      }
    }
    data.reason.push(...textReasonList.filter((x) => x !== '' && x !== null))
    const setTextReason = Array.from(new Set(data.reason)).filter((x) => x !== '')
    const pushTextReasons = Map(data).set('reason', setTextReason)
    await DronerDroneDatasource.updateDroneList(pushTextReasons.toJS()).then((res) => {
      if (res !== undefined) {
        let i = 0
        for (i; 2 > i; i++) {
          i === 0 &&
            createLicenseDroner.file !== '' &&
            UploadImageDatasouce.uploadImage(createLicenseDroner).then(res)
          i === 1 &&
            createLicenseDrone.file !== '' &&
            UploadImageDatasouce.uploadImage(createLicenseDrone).then(res)
        }
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          navigate('/DroneList')
        })
      }
    })
  }
  const renderFromData = (
    <div className='col-lg-7'>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลโดรนเกษตร' />
        <Form key={data.droneId} style={{ padding: '32px' }}>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>วันที่ลงทะเบียน</label>
              <Form.Item>
                <Input disabled value={formatDate(data.createdAt)} />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>
                ยี่ห้อโดรนที่ฉีดพ่น <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='droneBrand'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกยี่ห้อโดรนที่ฉีดพ่น',
                  },
                ]}
              >
                <Select
                  placeholder='เลือกยี่ห้อโดรน'
                  allowClear
                  onChange={handleBrand}
                  defaultValue={data.drone.droneBrandId}
                >
                  {droneBrand?.map((item: any, index: any) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>
                รุ่น <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='series'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกรุ่นโดรน',
                  },
                ]}
              >
                <Select
                  placeholder='เลือกรุ่น'
                  allowClear
                  onChange={handleSeries}
                  defaultValue={data.droneId}
                >
                  {searchSeriesDrone?.map((item: any, index: any) => (
                    <option key={index} value={item.id}>
                      {item.series}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='form-group col-lg-6 '>
            <label>
              เลขตัวถังโดรน <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='serialNo'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลขตัวถังโดรน',
                },
              ]}
            >
              <Input
                onChange={handleSerialNo}
                placeholder='กรอกเลขตัวถังโดรน'
                defaultValue={data.serialNo}
              />
            </Form.Item>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>ปีที่ซื้อ</label>
              <Form.Item name='purchaseYear'>
                <Input
                  type='number'
                  placeholder='กรอกปี พ.ศ. ที่ซื้อ'
                  onChange={handleYear}
                  defaultValue={data.purchaseYear}
                />
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>เดือนที่ซื้อ</label>
              <Form.Item name='purchaseMonth'>
                <Select
                  className='col-lg-6'
                  placeholder='เลือกเดือน'
                  onChange={handleMonth}
                  defaultValue={data.purchaseMonth}
                >
                  {MONTH_SALE.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6 pb-5'>
              <label>ใบอนุญาตนักบิน</label>
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className='pb-2'>
                <div
                  className='hiddenFileInput'
                  style={{
                    backgroundImage: `url(${imgLicenseDroner})`,
                    display: imgLicenseDroner !== false ? 'block' : 'none',
                  }}
                ></div>
              </div>
              <div className='text-left ps-4'>
                {imgLicenseDroner !== false && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDroner}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDroner}
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
              <div
                className='hiddenFileBtn'
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgLicenseDroner === false ? 'block' : 'none',
                }}
              >
                <input
                  key={imgLicenseDroner}
                  type='file'
                  onChange={onChangeLicenseDroner}
                  title='เลือกรูป'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6 pb-5'>
              <label>ใบอนุญาตโดรนจาก กสทช.</label>
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className='pb-2'>
                <div
                  className='hiddenFileInput'
                  style={{
                    backgroundImage: `url(${imgLicenseDrone})`,
                    display: imgLicenseDrone !== false ? 'block' : 'none',
                  }}
                ></div>
              </div>
              <div className='text-left ps-4'>
                {imgLicenseDrone !== false && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDrone}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDrone}
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
              <div
                className='hiddenFileBtn'
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgLicenseDrone === false ? 'block' : 'none',
                }}
              >
                <input
                  key={imgLicenseDroner}
                  type='file'
                  onChange={onChangeLicenseDrone}
                  title='เลือกรูป'
                />
              </div>
            </div>
          </div>
          <div className='form-group col-lg-12'>
            <label>หมายเหตุ</label>
            <Form.Item>
              <TextArea
                value={data.comment}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }}
              />
            </Form.Item>
          </div>
          <br />
          <div className='row'>
            <div className='form-group'>
              <label style={{ marginBottom: '10px' }}>
                สถานะ <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item name='status'>
                <div className='row'>
                  <div className='form-group col-lg-12'>
                    <Radio.Group
                      defaultValue={data.status}
                      onChange={handleChangeStatus}
                      className='col-lg-12'
                    >
                      <Space direction='vertical'>
                        {DRONER_DRONE_STATUS.filter((x: any) => x !== '').map(
                          (item: any, index: any) => (
                            <Radio value={item.value}>
                              {item.name}
                              {data.status === 'REJECTED' && index === 2 ? (
                                <div style={{ marginLeft: '20px' }}>
                                  <Form.Item style={{ width: '530px' }}>
                                    {REASON_IS_CHECK.map((item) =>
                                      _.set(
                                        item,
                                        'isChecked',
                                        data?.reason.map((x) => x).find((y) => y === item.reason)
                                          ? true
                                          : item.isChecked,
                                      ),
                                    ).map((x) => (
                                      <div>
                                        <Checkbox
                                          key={x.key}
                                          value={x.reason}
                                          onClick={onChangeReason}
                                          checked={x.isChecked}
                                        />{' '}
                                        <label>{x.reason}</label>
                                        <br />
                                      </div>
                                    ))}
                                  </Form.Item>
                                  <Form.Item style={{ width: '530px' }}>
                                    <TextArea
                                      rows={3}
                                      status={validateText1}
                                      onChange={onChangeReasonText}
                                      placeholder='กรอกเหตุผล/หมายเหตุเพิ่มเติม '
                                      autoComplete='off'
                                      defaultValue={data.reason.filter(
                                        (a) => !REASON_CHECK.some((x) => x === a),
                                      )}
                                    />
                                    {validateText1 === 'error' && (
                                      <p style={{ color: color.Error }}>
                                        กรุณากรอกหรือเลือกเหตุผลเพิ่มเติม
                                      </p>
                                    )}
                                  </Form.Item>
                                </div>
                              ) : data.status === 'INACTIVE' && index === 3 ? (
                                <div>
                                  <div className='form-group ps-3'>
                                    <TextArea
                                      status={validateText}
                                      style={{ width: '530px' }}
                                      className='col-lg-12'
                                      rows={3}
                                      onChange={onChangeReasonTextMore}
                                      placeholder='กรอกเหตุผล/หมายเหตุเพิ่มเติม'
                                      autoComplete='off'
                                      defaultValue={data.reason}
                                    />
                                    {validateText === 'error' && (
                                      <p style={{ color: color.Error }}>กรุณากรอกเหตุผลเพิ่มเติม</p>
                                    )}
                                  </div>
                                </div>
                              ) : null}
                            </Radio>
                          ),
                        )}
                      </Space>
                    </Radio.Group>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  )
  const renderDroner = (
    <div className='col-lg-4'>
      <CardContainer style={{ height: '640px' }}>
        <CardHeader textHeader='ข้อมูลนักบินโดรน' />
        <Form>
          <div className='container' style={{ padding: '30px' }}>
            <div className='row'>
              <div className='form-group text-center pb-2'>
                <div
                  className='hiddenFileInput zoom'
                  style={{
                    backgroundImage: `url(${
                      imgProfile === undefined ? image.empty_img : imgProfile
                    })`,
                  }}
                />
              </div>
            </div>
            <div className='row'>
              <label>Droner ID</label>
              <div className='row'>
                <Form.Item name='droneId'>
                  <Input
                    disabled
                    defaultValue={data.droner.dronerCode !== null ? data.droner.dronerCode : '-'}
                  />
                </Form.Item>
              </div>
              <div className='row'>
                <div className='col-lg-6'>
                  <label>ชื่อ</label>
                  <Form.Item name='firstname'>
                    <Input
                      disabled
                      defaultValue={data.droner.firstname !== null ? data.droner.firstname : '-'}
                    />
                  </Form.Item>
                </div>
                <div className='col-lg-6'>
                  <label>นามสกุล</label>
                  <Form.Item name='lastname'>
                    <Input
                      disabled
                      defaultValue={data.droner.lastname !== null ? data.droner.lastname : '-'}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-6'>
                  <label>เบอร์โทร</label>
                  <Form.Item name='telephoneNo'>
                    <Input
                      disabled
                      defaultValue={
                        data.droner.telephoneNo !== null ? data.droner.telephoneNo : '-'
                      }
                    />
                  </Form.Item>
                </div>
                <div className='col-lg-6'>
                  <label>ชื่อเล่น</label>
                  <Form.Item name='nickname'>
                    <Input
                      disabled
                      defaultValue={data.droner.nickname !== null ? data.droner.nickname : '-'}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='row' key={locationDroner}>
                <div className='col-lg-6'>
                  <label>ตำบล</label>
                  <Form.Item name='locationDroner'>
                    <Input disabled defaultValue={locationDroner?.subdistrictName || '-'} />
                  </Form.Item>
                </div>
                <div className='col-lg-6'>
                  <label>อำเภอ</label>
                  <Form.Item name='locationDroner'>
                    <Input disabled defaultValue={locationDroner?.districtName || '-'} />
                  </Form.Item>
                </div>
                <div className='col-lg-6'>
                  <label>จังหวัด</label>
                  <Form.Item name='locationDroner'>
                    <Input disabled defaultValue={locationDroner?.provinceName || '-'} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  )

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate('/DroneList')} />
        <span className='pt-4'>
          <strong style={{ fontSize: '20px' }}>แก้ไขข้อมูลโดรนเกษตร</strong>
        </span>
      </Row>
      <Row className='d-flex justify-content-around' key={data.id}>
        {renderDroner}
        {renderFromData}
      </Row>
      <FooterPage
        onClickBack={() => navigate('/DroneList')}
        onClickSave={UpdateDronerDrone}
        disableSaveBtn={saveBtnDisable}
      />
    </>
  )
}
export default EditDroneList
