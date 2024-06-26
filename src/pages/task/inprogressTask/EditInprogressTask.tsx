/* eslint-disable @typescript-eslint/no-var-requires */
import { EditOutlined } from '@ant-design/icons'
import {
  Avatar,
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
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import ActionButton from '../../../components/button/ActionButton'
import { BackIconButton } from '../../../components/button/BackButton'
import { CardContainer } from '../../../components/card/CardContainer'
import FooterPage from '../../../components/footer/FooterPage'
import { CardHeader } from '../../../components/header/CardHearder'
import MapGoogle from '../../../components/map/GoogleMap'
import ModalSelectedDroner from '../../../components/modal/task/inprogressTask/ModalSelectedDroner'
import { CouponDataSource } from '../../../datasource/CouponDatasource'
import { CropDatasource } from '../../../datasource/CropDatasource'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import { LAT_LNG_BANGKOK } from '../../../definitions/Location'
import { STATUS_INPROGRESS_CHECKBOX } from '../../../definitions/Status'
import { CropPurposeSprayEntity } from '../../../entities/CropEntities'
import {
  DronerDroneEntity_INIT,
  DronerEntity,
  DronerEntity_INIT,
} from '../../../entities/DronerDroneEntities'
import {
  GetTaskInprogressEntity,
  GetTaskInprogressEntity_INIT,
  UpdateInprogressTaskEntity,
  UpdateInprogressTaskEntity_INIT,
} from '../../../entities/TaskInprogress'
import { TaskSearchDroner } from '../../../entities/TaskSearchDroner'
import { color } from '../../../resource'
import { numberWithCommas, numberWithCommasToFixed } from '../../../utilities/TextFormatter'
import { useNavigate } from 'react-router-dom'
import { listAppType } from '../../../definitions/ApplicatoionTypes'
import ShowNickName from '../../../components/popover/ShowNickName'
import { TargetSpayEntities } from '../../../entities/TargetSprayEntities'
import { TargetSpray } from '../../../datasource/TargetSprayDatarource'
const { Option } = Select

const dateFormat = 'DD/MM/YYYY'
const dateCreateFormat = 'YYYY-MM-DD'
const timeFormat = 'HH:mm'
const timeCreateFormat = 'HH:mm:ss'

const _ = require('lodash')
const { Map } = require('immutable')

const EditInprogressTask = () => {
  const queryString = _.split(window.location.pathname, '=')
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [data, setData] = useState<GetTaskInprogressEntity>(GetTaskInprogressEntity_INIT)
  const [dateAppointment, setDateAppointment] = useState<any>(moment(undefined))
  const [timeAppointment, setTimeAppointment] = useState<any>(moment(undefined))
  const [couponData, setCouponData] = useState<{
    couponCode: string
    couponName: string
    couponDiscount: number | null
  }>({
    couponCode: '',
    couponName: '',
    couponDiscount: null,
  })
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>()
  const [checkCrop, setCheckCrop] = useState<boolean>(true)
  const [otherSpray, setOtherSpray] = useState<any>()
  const [validateComma, setValidateComma] = useState<{
    status: any
    message: string
  }>({
    status: '',
    message: '',
  })
  const [showModel, setShowModal] = useState<boolean>(false)
  const [dronerSelected, setDronerSelected] = useState<DronerEntity>(DronerEntity_INIT)
  const [targetSpray, setTargetSpray] = useState<TargetSpayEntities[]>([])
  const [someTargetSpray, setSomeTargetSpray] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchInprogressTask = async () => {
    setLoading(true)
    await TaskDatasource.getInprogressTaskById(queryString[1]).then((res) => {
      res.droner.totalDroneCount = res.droner.dronerDrone.length
      setDateAppointment(new Date(res.dateAppointment).toUTCString())
      setTimeAppointment(new Date(res.dateAppointment).getTime())
      fetchPurposeSpray(res.farmerPlot.plantName)
      setDronerSelected(res.droner)
      setCheckCrop(!res.targetSpray.includes('อื่นๆ'))
      setData(res)
      CouponDataSource.getPromotionCode(res.couponId)
        .then((result) =>
          setCouponData({
            couponCode: result.couponCode ?? '',
            couponDiscount: !res.discountCoupon ? null : parseInt(res.discountCoupon),
            couponName: result.couponName ?? '',
          }),
        )
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }
  const getAllTargetSpray = async () => {
    await TargetSpray.getAllTargetSprayOnTask().then((res) => {
      setTargetSpray(res.data)
      setSomeTargetSpray(res.data.map((item: any) => item.name))
    })
  }

  const fetchPurposeSpray = async (crop: string) => {
    await CropDatasource.getPurposeByCroupName(crop).then((res) => {
      setPeriodSpray(res)
    })
  }

  useEffect(() => {
    fetchInprogressTask()
    getAllTargetSpray()
  }, [])

  const handleChangeStatus = (e: any) => {
    const status = e.target.value
    const m = Map(data).set('status', status)
    const n = Map(m.toJS()).set('isProblem', false)
    const o = Map(n.toJS()).set('problemRemark', '')
    setData(o.toJS())
    checkValidate(o.toJS())
  }
  const handleChangeStatusProblem = (e: any) => {
    const status = e.target.value
    const m = Map(data).set('isProblem', status)
    const n = Map(m.toJS()).set('problemRemark', '')
    const o = Map(n.toJS()).set('statusRemark', '')
    setData(o.toJS())
    checkValidate(o.toJS())
  }
  const handleChangeRemarkProblem = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(data).set('problemRemark', e.target.value)
    setData(m.toJS())
    checkValidate(m.toJS())
  }
  const handleChangeRemarkCancel = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(data).set('statusRemark', e.target.value)
    setData(m.toJS())
    checkValidate(m.toJS())
  }
  const handlePeriodSpray = (e: any) => {
    const d = Map(data).set('purposeSprayId', e)
    setData(d.toJS())
    checkValidate(d.toJS())
  }
  const handlePurposeSpray = (e: any) => {
    const checked = e.target.checked
    const value = e.target.value
    setCheckCrop(value == 'อื่นๆ' ? !checked : otherSpray != null ? false : true)
    targetSpray.map((item: any) =>
      _.set(item, 'isChecked', item.name == value ? checked : item.isChecked),
    )
    let p: any = ''

    if (checked) {
      const targetSpray = data?.targetSpray ?? []
      p = Map(data).set(
        'targetSpray',
        [...targetSpray, value].filter((x) => x != ''),
      )
    } else {
      const targetSpray = data?.targetSpray ?? []
      const removePlant = targetSpray.filter((x) => x != value)
      p = Map(data).set('targetSpray', removePlant)
    }
    setData(p.toJS())
    checkValidate(p.toJS())
  }
  const handlePreparation = (e: any) => {
    const d = Map(data).set('preparationBy', e.target.value)
    setData(d.toJS())
    checkValidate(d.toJS())
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
      setValidateComma({
        status: 'error',
        message: 'โปรดระบุ',
      })
      setBtnSaveDisable(true)
    }
  }
  const handlePreparationRemark = (e: any) => {
    const d = Map(data).set('preparationRemark', e.target.value)
    setData(d.toJS())
  }
  const handleComment = (e: any) => {
    const d = Map(data).set('comment', e.target.value)
    setData(d.toJS())
  }
  const handleDateAppointment = (e: any) => {
    setDateAppointment(moment(new Date(e)).format(dateCreateFormat))
    checkValidate(data)
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
  const checkValidate = (data: GetTaskInprogressEntity) => {
    const checkEmptySting = ![data?.purposeSprayId, data?.preparationBy].includes('')
    let checkEmptyArray = false
    if (data?.targetSpray !== undefined) {
      checkEmptyArray =
        ![data?.targetSpray][0]?.includes('') &&
        data?.targetSpray.length !== 0 &&
        data?.targetSpray !== undefined
    }
    const checkDateTime = ![dateAppointment, timeAppointment].includes('')
    let checkEmptyRemark = true
    if (data.status == 'WAIT_START' && data.isProblem) {
      checkEmptyRemark = ![data.problemRemark].includes('')
    } else if (data.status == 'CANCELED') {
      checkEmptyRemark = ![data.statusRemark].includes('')
    }
    if (checkEmptySting && checkEmptyArray && checkDateTime && checkEmptyRemark) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }
  const renderFormAppointment = (
    <CardContainer>
      <CardHeader textHeader='นัดหมายบริการ' />
      <Row>
        <div className='col-lg-6'>
          <div className='flex-column'>
            <Form style={{ padding: '20px' }}>
              <div className='row form-group'>
                <div className='col-lg'>
                  วันนัดหมาย
                  <div>
                    <DatePicker
                      format={dateFormat}
                      className='col-lg-12'
                      defaultValue={moment(dateAppointment)}
                      onChange={handleDateAppointment}
                    />
                  </div>
                </div>
                <div className='col-lg'>
                  เวลานัดหมาย
                  <div>
                    <TimePicker
                      className='col-lg-12'
                      format={timeFormat}
                      onSelect={(v) => {
                        setTimeAppointment(v)
                      }}
                      value={moment(timeAppointment)}
                    />
                  </div>
                </div>
              </div>

              <div className='row form-group'>
                <label>
                  ช่วงเวลาการพ่น <span style={{ color: 'red' }}>*</span>
                </label>
                <Form.Item name='searchAddress'>
                  <Select
                    placeholder='-'
                    defaultValue={data?.purposeSprayId}
                    onChange={handlePeriodSpray}
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
              <div className='row form-group col-lg-6 p-2'>
                <label>
                  เป้าหมายการฉีดพ่น <span style={{ color: 'red' }}>*</span>
                </label>
                {targetSpray
                  .map((item: any) =>
                    _.set(
                      item,
                      'isChecked',
                      data?.targetSpray?.map((x) => x).find((y) => y === item.name)
                        ? true
                        : item.isChecked,
                    ),
                  )
                  .map((x, index) => (
                    <>
                      <div className='form-group'>
                        <Checkbox
                          value={x.name}
                          checked={x.isChecked}
                          onChange={handlePurposeSpray}
                        />{' '}
                        <label style={{ padding: '0 8px 0 0' }}>{x.name}</label>
                        {x.name === 'อื่นๆ' && (
                          <>
                            <Input
                              status={validateComma.status}
                              className='col-lg-9'
                              placeholder='โปรดระบุ เช่น เพลี้ย,หอย'
                              onChange={handleOtherSpray}
                              disabled={checkCrop}
                              defaultValue={Array.from(
                                new Set(
                                  data?.targetSpray.filter(
                                    (a) => !someTargetSpray.some((x: any) => x === a),
                                  ),
                                ),
                              )}
                            />
                            {validateComma.status == 'error' && (
                              <p
                                style={{
                                  color: color.Error,
                                  padding: '0 0 0 55px',
                                }}
                              >
                                {validateComma.message}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ))}
              </div>
              <div className='row form-group p-2'>
                <label>
                  การเตรียมยา <span style={{ color: 'red' }}>*</span>
                </label>
                <Radio.Group defaultValue={data?.preparationBy} key={data?.preparationBy}>
                  <Space direction='vertical' onChange={handlePreparation}>
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
              </div>
              <div className='form-group'>
                <label>หมายเหตุ</label>
                <TextArea
                  placeholder='ระบุหมายเหตุเพื่อแจ้งนักบินโดรน เช่น เกษตรกรจะเตรียมยาให้, ฝากนักบินเลือกยาราคาไม่แพงมาให้หน่อย เป็นต้น'
                  value={data?.comment}
                  onChange={handleComment}
                />
              </div>
            </Form>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='flex-column'>
            <Form style={{ padding: '20px' }}>
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
              <div className='form-group col-lg-12'>
                <label>สถานะ</label>
                <br />
                <Radio.Group defaultValue={data.status} onChange={handleChangeStatus}>
                  <Space direction='vertical'>
                    {STATUS_INPROGRESS_CHECKBOX.map((item, index) => (
                      <Radio key={index} value={item.value} className='col-lg-12'>
                        {item.name}
                        {data.status == 'CANCELED' && index == 1 && (
                          <TextArea
                            placeholder='กรอกรายละเอียดปัญหา'
                            onChange={handleChangeRemarkCancel}
                            value={data?.statusRemark}
                          />
                        )}
                        <br />
                        {data.status == 'WAIT_START' && index == 0 && (
                          <Radio.Group
                            defaultValue={data?.isProblem}
                            onChange={handleChangeStatusProblem}
                          >
                            <Space direction='vertical'>
                              <Radio value={false}>ปกติ</Radio>
                              <Radio value={true}>งานมีปัญหา</Radio>
                              {data.isProblem == true && (
                                <TextArea
                                  placeholder='กรอกรายละเอียดปัญหา'
                                  onChange={handleChangeRemarkProblem}
                                  value={data?.problemRemark}
                                />
                              )}
                            </Space>
                          </Radio.Group>
                        )}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </Form>
          </div>
        </div>
      </Row>
    </CardContainer>
  )
  const renderFormSearchFarmer = (
    <CardContainer>
      <CardHeader textHeader='ข้อมูลเกษตรกรและแปลง' />
      <div className='flex-column'>
        <Form style={{ padding: '20px' }}>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='form-group col-lg-4'>
                <Form.Item>
                  <label>ชื่อ-นามสกุล</label>
                  <Input value={data?.farmer?.firstname + ' ' + data?.farmer.lastname} disabled />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>เบอร์โทร</label>
                <Form.Item>
                  <Input value={data?.farmer?.telephoneNo} disabled />
                </Form.Item>
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-lg-4'>
                <label>แปลง</label>
                <Form.Item>
                  <Input value={data?.farmerPlot.plotName} disabled />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>พืชที่ปลูก</label>
                <Form.Item>
                  <Input value={data?.farmerPlot?.plantName} disabled />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>จำนวนไร่</label>
                <Form.Item>
                  <Input value={data?.farmAreaAmount} disabled />
                </Form.Item>
              </div>
            </div>
            <div className='row'>
              <div className='form-group'>
                <label>พื้นที่แปลงเกษตร</label>
                <Form.Item>
                  <Input
                    value={
                      data?.farmerPlot.plotArea.subdistrictName +
                      '/' +
                      data?.farmerPlot.plotArea.districtName +
                      '/' +
                      data?.farmerPlot.plotArea.provinceName
                    }
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-lg-6'>
                <Form.Item>
                  <label>Latitude (ละติจูด)</label>
                  <Input value={data?.farmerPlot?.lat} disabled />
                </Form.Item>
              </div>
              <div className='form-group col-lg-6'>
                <label>Longitude (ลองติจูด)</label>
                <Form.Item>
                  <Input value={data?.farmerPlot?.long} disabled />
                </Form.Item>
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-lg-12'>
                <MapGoogle
                  width='100%'
                  height='350px'
                  zoom={17}
                  lat={
                    data?.farmerPlot?.lat != undefined
                      ? parseFloat(data.farmerPlot.lat)
                      : LAT_LNG_BANGKOK.lat
                  }
                  lng={
                    data?.farmerPlot?.long != undefined
                      ? parseFloat(data.farmerPlot?.long)
                      : LAT_LNG_BANGKOK.lng
                  }
                />
                <div className='row'>
                  <div className='form-group'>
                    <label>จุดสังเกต</label>
                    <Form.Item>
                      <Input value={data?.farmerPlot?.landmark} disabled />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </CardContainer>
  )
  const renderDronerSelectedList = (
    <CardContainer>
      <CardHeader textHeader='รายชื่อนักบินโดรน' />
      <Form>
        <div className='container'>
          <div className='row pt-3'>
            <div className='col-lg-3'>
              {dronerSelected.firstname} {dronerSelected.lastname}
              <br />
              <p style={{ fontSize: '12px', color: color.Grey }}>
                {dronerSelected.dronerCode}
                {dronerSelected.nickname && (
                  <ShowNickName data={dronerSelected.nickname} menu='INFO' />
                )}
              </p>
            </div>
            <div className='col-lg-2'>{dronerSelected.telephoneNo}</div>
            <div className='col-lg-3'>
              {(dronerSelected.address.subdistrict.subdistrictName
                ? dronerSelected.address.subdistrict.subdistrictName + '/'
                : '') +
                (dronerSelected.address.district.districtName != null
                  ? dronerSelected.address.district.districtName + '/'
                  : '') +
                (dronerSelected.address.province.provinceName != null
                  ? dronerSelected.address.province.provinceName
                  : '')}
            </div>
            <div className='col-lg-1'>{parseFloat(data.distance).toFixed(0) || 0} km</div>
            <div className='col-lg-2'>
              <Avatar
                size={25}
                src={
                  dronerSelected.dronerDrone[0] !== undefined &&
                  dronerSelected.dronerDrone[0].drone.droneBrand.logoImagePath
                }
                style={{ marginRight: '5px' }}
              />
              {dronerSelected.dronerDrone[0] !== undefined &&
                dronerSelected.dronerDrone[0].drone.droneBrand.name}
              <br />
              <p style={{ fontSize: '12px', color: color.Grey }}>
                {dronerSelected.totalDroneCount > 1 && '(มากกว่า 1 ยี่หัอ)'}
              </p>
            </div>
            <div className='col-lg-1'>
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => setShowModal((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </Form>
    </CardContainer>
  )
  const renderServiceCharge = (
    <CardContainer>
      <CardHeader textHeader='ยอดรวมค่าบริการ' />
      <Form style={{ padding: '20px' }}>
        <CardContainer style={{ backgroundColor: 'rgba(33, 150, 83, 0.1)' }}>
          <Form style={{ padding: '20px' }}>
            <div className='row'>
              <div className='col-lg-3' style={{ borderRight: 'solid' }}>
                <label>ยอดรวมค่าบริการ (เกษตรกร)</label>
                <h5 style={{ color: color.primary1 }} className='p-2'>
                  {data?.totalPrice && numberWithCommasToFixed(parseFloat(data?.totalPrice))} บาท
                </h5>
              </div>
              <div className='col-lg-3' style={{ paddingLeft: '40px' }}>
                <label>รายได้ที่นักบินโดรนได้รับ</label>
                <h5 style={{ color: color.Warning }} className='p-2'>
                  {data?.price &&
                    numberWithCommasToFixed(
                      parseFloat(data?.price) + parseFloat(data?.revenuePromotion),
                    )}{' '}
                  บาท
                </h5>
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-lg-4'>
                <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
                <Form.Item>
                  <Input
                    suffix='บาท'
                    value={numberWithCommas(parseFloat(data?.price))}
                    step='0.01'
                    disabled
                  />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>ค่าธรรมเนียม (คิด 5% ของราคารวม)</label>
                <Form.Item>
                  <Input
                    suffix='บาท'
                    value={numberWithCommas(parseFloat(data?.fee))}
                    step='0.01'
                    disabled
                  />
                </Form.Item>
              </div>
              <div className='form-group col-lg-4'>
                <label>ส่วนลดค่าธรรมเนียม</label>
                <Form.Item>
                  <Input
                    suffix='บาท'
                    value={numberWithCommas(parseFloat(data?.discountFee))}
                    step='0.01'
                    disabled
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
                  value={numberWithCommas(couponData.couponDiscount!)}
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
                <Input
                  suffix='บาท'
                  value={data.discountCampaignPoint}
                  disabled
                  autoComplete='off'
                />
              </div>
            </div>
          </Form>
        </CardContainer>
      </Form>
    </CardContainer>
  )

  const updateDroner = (newDroner: TaskSearchDroner) => {
    const drone = DronerDroneEntity_INIT
    const droner = DronerEntity_INIT
    drone.drone.droneBrand.name = newDroner.drone_brand
    drone.drone.droneBrand.logoImagePath = newDroner.logo_drone_brand
    droner.id = newDroner.droner_id
    droner.dronerCode = newDroner.droner_code
    droner.firstname = newDroner.firstname
    droner.lastname = newDroner.lastname
    droner.telephoneNo = newDroner.telephone_no
    droner.status = newDroner.droner_status
    droner.address.subdistrict.subdistrictName = newDroner.subdistrict_name
    droner.address.district.districtName = newDroner.district_name
    droner.address.province.provinceName = newDroner.province_name
    droner.totalDroneCount = parseInt(newDroner.count_drone)
    droner.dronerDrone = [drone]
    droner.distance = newDroner.distance
    setDronerSelected(droner)
    setShowModal((prev) => !prev)
    setBtnSaveDisable(false)
  }
  const updateInprogressTask = () => {
    const changeDateFormat = moment(dateAppointment).format(dateCreateFormat)
    const changeTimeFormat = moment(timeAppointment).format(timeCreateFormat)
    const otherSprayList = []
    if (otherSpray != undefined) {
      const m = otherSpray.split(',')
      for (let i = 0; m.length > i; i++) {
        otherSprayList.push(m[i])
      }
    }
    data.targetSpray.push(...otherSprayList.filter((x) => x != ''))

    const updateTask: UpdateInprogressTaskEntity = UpdateInprogressTaskEntity_INIT
    updateTask.id = data.id
    updateTask.dateAppointment = moment(changeDateFormat + ' ' + changeTimeFormat).toISOString()
    updateTask.purposeSprayId = data.purposeSprayId
    updateTask.targetSpray = data.targetSpray
    updateTask.preparationBy = data.preparationBy
    updateTask.preparationRemark = data.preparationRemark
    updateTask.comment = data.comment
    updateTask.status = data.status
    updateTask.isProblem = data.isProblem
    updateTask.updateBy = profile.firstname + ' ' + profile.lastname
    updateTask.dronerId = dronerSelected.id
    updateTask.distance = dronerSelected.distance || 0
    updateTask.problemRemark = data.problemRemark
    updateTask.statusRemark = data.statusRemark
    updateTask.farmerPlotId = data.farmerPlotId
    Swal.fire({
      title: 'ยืนยันการแก้ไข',
      text: 'โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await TaskDatasource.updateInprogressTask(updateTask).then((res) => {
          if (res.userMessage == 'success') {
            navigate('/IndexInprogressTask')
          }
        })
      }
    })
  }

  return (
    <>
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <div key={data?.id}>
          <Row>
            <BackIconButton onClick={() => navigate('/IndexInprogressTask')} />
            <span className='pt-3'>
              <strong style={{ fontSize: '20px' }}>แก้ไขงาน #{data?.taskNo}</strong>
            </span>
          </Row>
          <CardContainer>{renderFormAppointment}</CardContainer>
          <br />
          <CardContainer>{renderFormSearchFarmer}</CardContainer>
          <br />
          <CardContainer>{renderDronerSelectedList}</CardContainer>
          <br />
          <CardContainer>{renderServiceCharge}</CardContainer>
          <FooterPage
            onClickBack={() => navigate('/IndexInprogressTask')}
            onClickSave={updateInprogressTask}
            disableSaveBtn={saveBtnDisable}
          />
        </div>
      </Spin>
      {showModel && (
        <ModalSelectedDroner
          show={showModel}
          backButton={() => setShowModal((prev) => !prev)}
          title='เปลี่ยนแปลงนักบินโดรน'
          dataTask={data}
          dataDroner={dronerSelected}
          callBack={updateDroner}
        />
      )}
    </>
  )
}
export default EditInprogressTask
