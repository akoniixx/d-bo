import {
  Avatar,
  Badge,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  TimePicker,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import GoogleMap from '../../../../components/map/GoogleMap'
import { BackIconButton } from '../../../../components/button/BackButton'
import { CardContainer } from '../../../../components/card/CardContainer'
import { CardHeader } from '../../../../components/header/CardHearder'
import { LAT_LNG_BANGKOK } from '../../../../definitions/Location'
import color from '../../../../resource/color'
import {
  TaskDetailEntity,
  TaskDetailEntity_INIT,
} from '../../../../entities/TaskInprogressEntities'
import { TaskInprogressDatasource } from '../../../../datasource/TaskInprogressDatasource'
import FooterPage from '../../../../components/footer/FooterPage'
import { CropPurposeSprayEntity } from '../../../../entities/CropEntities'
import { CropDatasource } from '../../../../datasource/CropDatasource'
import TextArea from 'antd/lib/input/TextArea'
import {
  STATUS_COLOR_MAPPING,
  TASKTODAY_STATUS,
  TASK_TODAY_STATUS_MAPPING,
} from '../../../../definitions/Status'
import { Option } from 'antd/lib/mentions'
import Swal from 'sweetalert2'
import { CouponDataSource } from '../../../../datasource/CouponDatasource'
import { numberWithCommas } from '../../../../utilities/TextFormatter'
import { useNavigate } from 'react-router-dom'
import { listAppType } from '../../../../definitions/ApplicatoionTypes'
import ShowNickName from '../../../../components/popover/ShowNickName'
import { TargetSpayEntities } from '../../../../entities/TargetSprayEntities'
import { TargetSpray } from '../../../../datasource/TargetSprayDatarource'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Map } = require('immutable')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash')
const dateFormat = 'DD/MM/YYYY'
const timeFormat = 'HH:mm'

function EditWaitStart() {
  const queryString = _.split(window.location.search, '=')
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const taskId = queryString[1]
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  })
  const [data, setData] = useState<TaskDetailEntity>(TaskDetailEntity_INIT)
  const [couponData, setCouponData] = useState<{
    couponCode: string
    couponName: string
    couponDiscount: number | null
  }>({
    couponCode: '',
    couponName: '',
    couponDiscount: null,
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>()
  const [checkCrop, setCheckCrop] = useState<boolean>(true)
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [validateComma, setValidateComma] = useState<{
    status: any
    message: string
  }>({
    status: '',
    message: '',
  })
  const [targetSpray, setTargetSpray] = useState<TargetSpayEntities[]>([])
  const [someTargetSpray, setSomeTargetSpray] = useState<any>()
  const [otherSpray, setOtherSpray] = useState<any>()

  const getAllTargetSpray = async () => {
    await TargetSpray.getAllTargetSprayOnTask().then((res) => {
      setTargetSpray(res.data)
      setSomeTargetSpray(res.data.map((item: any) => item.name))
    })
  }

  const fetchTaskDetail = async () => {
    setLoading(true)
    await TaskInprogressDatasource.getTaskDetailById(taskId)
      .then((res) => {
        if (res.couponId !== null) {
          CouponDataSource.getPromotionCode(res.couponId).then((result) =>
            setCouponData({
              couponCode: result.couponCode ?? '',
              couponDiscount: !res.discountCoupon ? null : parseInt(res.discountCoupon),
              couponName: result.couponName ?? '',
            }),
          )
        }
        setCheckCrop(!res.targetSpray.includes('อื่นๆ'))
        setData(res)
        setOtherSpray(
          res.targetSpray.filter((a) => !someTargetSpray.some((x: any) => x === a)).join(','),
        )
        fetchPurposeSpray(res.farmerPlot.plantName)
        setMapPosition({
          lat: parseFloat(res.farmerPlot.lat),
          lng: parseFloat(res.farmerPlot.long),
        })
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  const fetchPurposeSpray = async (crop: string) => {
    await CropDatasource.getPurposeByCroupName(crop).then((res) => {
      setPeriodSpray(res)
    })
  }

  useEffect(() => {
    fetchTaskDetail()
    getAllTargetSpray()
  }, [])

  const handlerDate = (e: any) => {
    const d = Map(data).set('dateAppointment', e)
    const m = Map(d.toJS()).set('dateAppointment', e)
    setData(m.toJS())
    setBtnSaveDisable(false)
  }
  const handleOtherSpray = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length != 0) {
      setOtherSpray(e.target.value)
      const checkComma = checkValidateComma(e.target.value)
      if (!checkComma) {
        setValidateComma({ status: '', message: '' })
        setBtnSaveDisable(false)
      } else {
        setValidateComma({
          status: 'error',
          message: 'กรุณาใช้ (,) ให้กับการเพิ่มมากกว่า 1 อย่าง',
        })
        setBtnSaveDisable(true)
      }
    } else {
      setBtnSaveDisable(true)
    }
  }
  const handlerTargetSpray = (e: any) => {
    const checked = e.target.checked
    const value = e.target.value
    setCheckCrop(value == 'อื่นๆ' ? !checked : otherSpray != null ? false : true)
    targetSpray.map((item: any) =>
      _.set(item, 'isChecked', item.name == value ? checked : item.isChecked),
    )
    if (value == 'อื่นๆ' && checked) {
      setCheckCrop(false)
    } else {
      setCheckCrop(true)
    }
    let p: any = ''
    if (checked) {
      const targetSpray =
        data && data.targetSpray ? [...data.targetSpray, value].filter((x) => x != '') : [value]
      p = Map(data).set('targetSpray', targetSpray)
    } else {
      const removeTarget =
        data && data.targetSpray ? data.targetSpray.filter((x) => x != value) : []
      p = Map(data).set('targetSpray', removeTarget)
    }
    setData(p.toJS())
    checkValidate(p.toJS())
  }
  const handlerPurposeSpray = (e: any) => {
    const d = Map(data).set('purposeSprayId', e)
    setData(d.toJS())
    {
      e != null ? setBtnSaveDisable(false) : setBtnSaveDisable(true)
    }
  }
  const handlePreparation = (e: any) => {
    const d = Map(data).set('preparationBy', e.target.value)
    setData(d.toJS())
    setBtnSaveDisable(false)
  }
  const handlePreparationRemark = (e: any) => {
    const d = Map(data).set('preparationRemark', e.target.value)
    setData(d.toJS())
  }
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(data).set('comment', e.target.value)
    setData(d.toJS())
    setBtnSaveDisable(false)
  }
  const handleChangeStatus = (e: any) => {
    const d = Map(data).set('status', e.target.value)
    const n = Map(d.toJS()).set('problemRemark', '')
    const o = Map(n.toJS()).set('statusRemark', '')
    const m = Map(o.toJS()).set('isProblem', false)
    setData(m.toJS())
    setBtnSaveDisable(false)
  }
  const handleChangeIsProblem = (e: any) => {
    const m = Map(data).set('isProblem', e.target.value)
    const n = Map(m.toJS()).set('problemRemark', '')
    setData(n.toJS())
    if (e.target.value == true) {
      if (data.problemRemark != null) {
        setBtnSaveDisable(true)
      } else {
        setBtnSaveDisable(true)
      }
      setBtnSaveDisable(true)
    } else {
      setBtnSaveDisable(false)
    }
  }
  const onChangeProblemText = (e: any) => {
    const m = Map(data).set('problemRemark', e.target.value)
    setData(m.toJS())
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false)
    }
  }
  const onChangeCanCelText = (e: any) => {
    const m = Map(data).set('statusRemark', e.target.value)
    setData(m.toJS())
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false)
    }
  }

  const checkValidate = (data?: TaskDetailEntity) => {
    let checkEmptyTarget = false
    if (data?.targetSpray !== undefined) {
      checkEmptyTarget =
        ![data?.targetSpray][0]?.includes('') &&
        data?.targetSpray.length !== 0 &&
        data?.targetSpray !== null &&
        data?.targetSpray !== undefined
    }
    if (checkEmptyTarget) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }
  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes('*') ||
      data.includes('/') ||
      data.includes(' ') ||
      data.includes('-') ||
      data.includes('+')
    return data.trim().length != 0 ? (checkSyntax ? true : false) : true
  }
  const renderAppointment = (
    <Form style={{ padding: '32px' }}>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-lg-5'>
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <DatePicker
                  format={dateFormat}
                  style={{ width: '100%' }}
                  value={
                    data.dateAppointment != undefined
                      ? moment(new Date(data.dateAppointment))
                      : null
                  }
                  onChange={handlerDate}
                />
              </Form.Item>
            </div>
            <div className='col-lg-5'>
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <TimePicker
                  name='dateAppointment'
                  format={timeFormat}
                  style={{ width: '100%' }}
                  value={moment(new Date(data.dateAppointment))}
                  onChange={handlerDate}
                />
              </Form.Item>
            </div>
          </div>
          <div className='col-lg-10'>
            <label>
              ช่วงเวลาการพ่น <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='purposeSprayId'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกช่วงเวลาการฉีดพ่น',
                },
              ]}
            >
              <Select
                allowClear
                onChange={handlerPurposeSpray}
                key={data.purposeSprayId}
                defaultValue={data.purposeSpray != null ? data.purposeSpray.purposeSprayName : null}
              >
                {periodSpray?.purposeSpray?.length ? (
                  periodSpray?.purposeSpray?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.purposeSprayName}
                    </Option>
                  ))
                ) : (
                  <Option>-</Option>
                )}
              </Select>
            </Form.Item>
          </div>
          <div className='form-group col-lg-10'>
            <label>
              เป้าหมายการฉีดพ่น
              <span style={{ color: 'red' }}>*</span>
            </label>
            {data.targetSpray != null
              ? targetSpray
                  .map((item: any) =>
                    _.set(
                      item,
                      'isChecked',
                      data?.targetSpray.map((x) => x).find((y) => y === item.name)
                        ? true
                        : item.isChecked,
                    ),
                  )
                  .map((x, index) => (
                    <>
                      <div className='form-group'>
                        <Checkbox
                          key={x.id}
                          value={x.name}
                          onClick={handlerTargetSpray}
                          checked={x.isChecked}
                        />{' '}
                        <label>{x.name}</label>
                        <br />
                        {x.name === 'อื่นๆ' && (
                          <>
                            <Input
                              key={data?.targetSpray[0]}
                              disabled={checkCrop}
                              onChange={handleOtherSpray}
                              placeholder='โปรดระบุ เช่น เพลี้ย,หอย'
                              autoComplete='off'
                              defaultValue={Array.from(
                                new Set(
                                  data?.targetSpray.filter(
                                    (a) => !someTargetSpray.some((x: any) => x === a),
                                  ),
                                ),
                              )}
                            />
                            {validateComma.status == 'error' && (
                              <p style={{ color: color.Error }}>{validateComma.message}</p>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ))
              : null}
          </div>
          <div className='row form-group col-lg-6 p-2'>
            <label>
              การเตรียมยา <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item>
              <Radio.Group
                key={data.preparationBy}
                value={data.preparationBy}
                onChange={handlePreparation}
              >
                <Space direction='vertical'>
                  <Radio value='เกษตรกรเตรียมยาเอง'>เกษตรกรเตรียมยาเอง</Radio>
                  <Radio value='นักบินโดรนเตรียมให้'>นักบินโดรนเตรียมให้</Radio>
                </Space>
              </Radio.Group>
              {data?.preparationBy === 'นักบินโดรนเตรียมให้' ? (
                <div className='pt-3'>
                  <TextArea
                    style={{ width: '530px', height: '80px', left: '4%' }}
                    placeholder='(บังคับ) ระบุชื่อยา/ปุ๋ย และจำนวนที่ใช้'
                    onChange={handlePreparationRemark}
                    defaultValue={data?.preparationRemark}
                  />
                </div>
              ) : null}
            </Form.Item>
          </div>
          <div className='form-group col-lg-10'>
            <label>หมายเหตุ</label>
            <TextArea rows={3} onChange={handleComment} value={data.comment} />
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='form-group col-lg-12'>
            <label>ค่าบริการ</label>
            <p>
              {numberWithCommas(parseFloat(data?.totalPrice))} บาท (จำนวน {data?.farmAreaAmount}{' '}
              ไร่) ราคาไร่ละ {data.unitPrice} บาท
            </p>
          </div>
          <div className='form-group col-lg-12 pb-3'>
            <label>สร้างโดย</label>
            {listAppType.map(
              (item, index) =>
                data.applicationType === item.value && (
                  <div key={index}>
                    <img src={item.icon} style={{ width: 22, height: 22 }} />
                    <span> {data.createBy ? data.createBy + ` ${item.create}` : '-'}</span>
                  </div>
                ),
            )}
          </div>
          <label style={{ marginBottom: '10px' }}>
            สถานะ <span style={{ color: 'red' }}>*</span>
          </label>
          <Form.Item name='status'>
            <div className='row'>
              <div className='form-group col-lg-4'>
                <Radio.Group value={data.status} onChange={handleChangeStatus} className='col-lg-4'>
                  <Space direction='vertical'>
                    {TASKTODAY_STATUS.map((item: any, index: any) => (
                      <>
                        <Radio value={item.value}>
                          <b> {item.name}</b>

                          {data.status == 'WAIT_START' && index == 0 ? (
                            <div style={{ marginLeft: '20px' }} className='col-lg-10'>
                              <Form.Item style={{ width: '530px' }}>
                                <Radio.Group
                                  value={data.isProblem}
                                  onChange={handleChangeIsProblem}
                                >
                                  <Space direction='vertical'>
                                    <Radio value={false}>งานปกติ</Radio>
                                    <Radio value={true}>งานมีปัญหา</Radio>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                              {data.isProblem == true ? (
                                <Form.Item>
                                  <TextArea
                                    rows={3}
                                    onChange={onChangeProblemText}
                                    placeholder='รายละเอียดปัญหา'
                                    autoComplete='off'
                                    defaultValue={
                                      data.problemRemark != null ? data.problemRemark : undefined
                                    }
                                  />
                                </Form.Item>
                              ) : null}
                            </div>
                          ) : data.status == 'IN_PROGRESS' && index == 1 ? (
                            <div style={{ marginLeft: '20px' }}>
                              <Form.Item style={{ width: '500px' }}>
                                <Radio.Group
                                  value={data.isProblem}
                                  onChange={handleChangeIsProblem}
                                >
                                  <Space direction='vertical'>
                                    <Radio value={false}>งานปกติ</Radio>
                                    <Radio disabled>รออนุมัติขยายเวลา</Radio>
                                    <Radio disabled>
                                      อนุมัติขยายเวลา{' '}
                                      <span style={{ color: color.Error }}>
                                        *ต้องโทรหาเกษตกรเพื่อคอนเฟิร์มการอนุมัติ/ปฏิเสธ*
                                      </span>
                                    </Radio>
                                    <Radio value={true}>งานมีปัญหา</Radio>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                              {data.isProblem == true ? (
                                <Form.Item>
                                  <TextArea
                                    rows={3}
                                    onChange={onChangeProblemText}
                                    placeholder='รายละเอียดปัญหา'
                                    autoComplete='off'
                                    defaultValue={
                                      data.problemRemark != null ? data.problemRemark : undefined
                                    }
                                  />
                                </Form.Item>
                              ) : null}
                            </div>
                          ) : data.status == 'CANCELED' && index == 2 ? (
                            <div style={{ marginLeft: '20px' }}>
                              <Form.Item style={{ width: '500px' }}>
                                <TextArea
                                  rows={3}
                                  onChange={onChangeCanCelText}
                                  placeholder='รายละเอียดการยกเลิก'
                                  autoComplete='off'
                                  defaultValue={
                                    data.statusRemark != null ? data.statusRemark : undefined
                                  }
                                />
                              </Form.Item>
                            </div>
                          ) : null}
                        </Radio>
                      </>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
  const renderFarmer = (
    <Form key={data.farmerId}>
      <div style={{ padding: '30px' }}>
        <div className='row'>
          <div className='col-lg-4 text-start'>
            <label>ชื่อ-นามสกุล</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmer.firstname + ' ' + data.farmer.lastname} />
            </Form.Item>
          </div>
          <div className='col-lg-4 text-start'>
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmer.telephoneNo} />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4 text-start'>
            <label>แปลง</label>
            <Form.Item>
              <Select disabled defaultValue={data.farmerPlot.plotName} />
            </Form.Item>
          </div>
          <div className='col-lg-4 text-start'>
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmerPlot.plantName} />
            </Form.Item>
          </div>
          <div className='col-lg-4 text-start'>
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input defaultValue={data.farmAreaAmount} suffix='ไร่' disabled />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12 text-start'>
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.farmerPlot.plotArea !== null
                    ? data.farmerPlot.plotArea.subdistrictName +
                      '/' +
                      data.farmerPlot.plotArea.districtName +
                      '/' +
                      data.farmerPlot.plotArea.provinceName
                    : '-'
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 text-start'>
            <label>Latitude (ละติจูด)</label>
            <Form.Item key={mapPosition.lat}>
              <Input disabled defaultValue={mapPosition.lat} />
            </Form.Item>
          </div>
          <div className='col-lg-6 text-start'>
            <label>Longitude (ลองติจูด)</label>
            <Form.Item key={mapPosition.lng}>
              <Input disabled defaultValue={mapPosition.lng} />
            </Form.Item>
          </div>
        </div>
        <GoogleMap
          width='100%'
          height='300px'
          zoom={17}
          lat={mapPosition.lat}
          lng={mapPosition.lng}
        />
        <div className='row'>
          <div className='col-lg-12 text-start'>
            <label>จุดสังเกต</label>
            <Form.Item>
              <Input disabled value={data.farmerPlot.landmark} />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  )
  const renderDroner = (
    <Form style={{ padding: '32px' }}>
      <div className='row'>
        <div className='col-lg-3'>
          <span>
            {data.droner.firstname + ' ' + data.droner.lastname}
            <br />
            <p style={{ fontSize: '12px', color: color.Grey }}>
              {data.droner.dronerCode}
              {data.droner.nickname && <ShowNickName data={data.droner.nickname} menu='INFO' />}
            </p>
          </span>
        </div>
        <div className='col-lg-2'>
          <span>{data.droner.telephoneNo}</span>
        </div>
        <div className='col-lg-3'>
          {(data.droner.address.subdistrict.subdistrictName
            ? data.droner.address.subdistrict.subdistrictName + '/'
            : '') +
            (data.droner.address.district.districtName != null
              ? data.droner.address.district.districtName + '/'
              : "'") +
            (data.droner.address.province.provinceName != null
              ? data.droner.address.province.provinceName
              : '')}
        </div>
        <div className='col-lg-1'>{parseFloat(data.distance).toFixed(0) || 0} km</div>
        <div className='col-lg'>
          <span>
            <Avatar
              size={25}
              src={
                data.droner.dronerDrone && data.droner.dronerDrone[0] != null
                  ? data.droner.dronerDrone[0].drone.droneBrand.logoImagePath
                  : null
              }
              style={{ marginRight: '5px' }}
            />
            {data.droner.dronerDrone && data.droner.dronerDrone[0] != null
              ? data.droner.dronerDrone[0].drone.droneBrand.name
              : '-'}
          </span>
          <br />
          <span style={{ color: color.Grey, fontSize: '12px' }}>
            {data.droner.dronerDrone && data.droner.dronerDrone.length > 1
              ? '(มากกว่า 1 ยี่ห้อ)'
              : null}
          </span>
        </div>
        <div className='col-lg'>
          {data.droner.status == 'ACTIVE' ? (
            <span style={{ color: STATUS_COLOR_MAPPING[data.droner.status] }}>
              <Badge color={STATUS_COLOR_MAPPING[data.droner.status]} />{' '}
              {TASK_TODAY_STATUS_MAPPING[data.droner.status]}
            </span>
          ) : (
            <span style={{ color: STATUS_COLOR_MAPPING[data.droner.status] }}>
              <Badge color={STATUS_COLOR_MAPPING[data.droner.status]} />{' '}
              {TASK_TODAY_STATUS_MAPPING[data.droner.status]}
            </span>
          )}
        </div>
      </div>
    </Form>
  )
  const renderPrice = (
    <Form style={{ padding: '20px' }}>
      <Form style={{ padding: '20px', backgroundColor: '#2196531A' }}>
        <div className='row'>
          <div className='col-lg-3' style={{ borderRight: 'solid' }}>
            <label>ยอดรวมค่าบริการ (เกษตรกร)</label>
            <h5 style={{ color: color.primary1 }} className='p-2'>
              {data?.totalPrice && numberWithCommas(parseFloat(data?.totalPrice))} บาท
            </h5>
          </div>
          <div className='col-lg-3' style={{ paddingLeft: '40px' }}>
            <label>รายได้ที่นักบินโดรนได้รับ</label>
            <h5 style={{ color: color.Warning }} className='p-2'>
              {data?.price &&
                numberWithCommas(parseFloat(data?.price) + parseFloat(data?.revenuePromotion))}{' '}
              บาท
            </h5>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4'>
            <Form.Item>
              <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
              <Input
                disabled
                value={data.price !== null ? numberWithCommas(parseFloat(data.price)) : '0'}
                suffix='บาท'
              />
            </Form.Item>
          </div>
          <div className='col-lg-4'>
            <Form.Item>
              <label>ค่าธรรมเนียม (5% ของค่าบริการ)</label>
              <Input
                disabled
                placeholder='0.0'
                value={data.fee !== null ? numberWithCommas(parseFloat(data.fee)) : '0'}
                suffix='บาท'
              />
            </Form.Item>
          </div>
          <div className='col-lg-4'>
            <Form.Item>
              <label>ส่วนลดค่าธรรมเนียม</label>
              <Input
                disabled
                value={
                  data.discountFee !== null ? numberWithCommas(parseFloat(data.discountFee)) : '0'
                }
                suffix='บาท'
              />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='form-group col-lg-4'>
            <label>รหัสคูปอง</label>
            <Input value={couponData.couponCode} disabled autoComplete='off' />
          </div>
          <div className='form-group col-lg-4'>
            <label>ชื่อคูปอง</label>
            <Input value={couponData.couponName} disabled autoComplete='off' />
          </div>
          <div className='form-group col-lg-4'>
            <label>ส่วนลดคูปอง</label>
            <Input
              suffix='บาท'
              value={numberWithCommas(couponData.couponDiscount || 0)}
              disabled
              autoComplete='off'
            />
          </div>
        </div>
        <div className='row pt-3'>
          <div className='form-group col-lg-6 p-2'>
            <label>จำนวนแต้มที่ใช้แลก</label>
            <Input suffix='แต้ม' value={data.usePoint} disabled autoComplete='off' />
          </div>
          <div className='form-group col-lg-6 p-2'>
            <label>ส่วนลดจากการใช้แต้ม</label>
            <Input suffix='บาท' value={data.discountCampaignPoint} disabled autoComplete='off' />
          </div>
        </div>
      </Form>
    </Form>
  )
  const UpdateTaskWaitStart = async (data: TaskDetailEntity) => {
    Swal.fire({
      title: 'ยืนยันการแก้ไข',
      text: 'โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'บันทึก',
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const otherSprayList = []
        if (otherSpray != undefined) {
          const m = otherSpray.split(',')
          for (let i = 0; m.length > i; i++) {
            otherSprayList.push(m[i])
          }
        }
        data.targetSpray.push(...otherSprayList.filter((x) => x != '' && x != data.targetSpray))
        const setOtherSpray = Array.from(new Set(data.targetSpray)).filter((x) => x != '')

        const pushTextTarget = Map(data).set('targetSpray', setOtherSpray)
        const pushUpdateBy = Map(pushTextTarget.toJS()).set(
          'updateBy',
          profile.firstname + ' ' + profile.lastname,
        )
        await TaskInprogressDatasource.UpdateTask(pushUpdateBy.toJS()).then(() => {
          navigate('/IndexTodayTask')
        })
      }
      EditWaitStart()
    })
  }

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate('/IndexTodayTask')} />
        <span className='pt-4'>
          <strong style={{ fontSize: '20px' }}>รายละเอียดงาน #{data.taskNo}</strong>
        </span>
      </Row>
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <CardContainer>
          <CardHeader textHeader='นัดหมายบริการ' />
          {renderAppointment}
        </CardContainer>{' '}
        <br />
        <CardContainer>
          <CardHeader textHeader='ข้อมูลเกษตรกรและแปลง' />
          {renderFarmer}
        </CardContainer>
        <br />
        <CardContainer>
          <CardHeader textHeader='รายชื่อนักบินโดรน' />
          {renderDroner}
        </CardContainer>
        <br />
        <CardContainer>
          <CardHeader textHeader='ยอดรวมค่าบริการ' />
          {renderPrice}
        </CardContainer>
      </Spin>

      <FooterPage
        onClickBack={() => navigate('/IndexTodayTask')}
        onClickSave={() => UpdateTaskWaitStart(data)}
        disableSaveBtn={saveBtnDisable}
      />
    </>
  )
}

export default EditWaitStart
