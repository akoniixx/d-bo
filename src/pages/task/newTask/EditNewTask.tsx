/* eslint-disable @typescript-eslint/no-var-requires */
import { DownOutlined, SearchOutlined, StarFilled } from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Popover,
  Radio,
  Row,
  Slider,
  Space,
  Steps,
  Table,
  TimePicker,
  Tooltip,
} from 'antd'
import { Select as AntdSelect } from 'antd'
import Select from 'react-select'
import TextArea from 'antd/lib/input/TextArea'
import { RowSelectionType } from 'antd/lib/table/interface'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BackButton, BackIconButton } from '../../../components/button/BackButton'
import SaveButton from '../../../components/button/SaveButton'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import GooleMap from '../../../components/map/GoogleMap'
import { CropDatasource } from '../../../datasource/CropDatasource'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import { TaskSearchDronerDatasource } from '../../../datasource/TaskSearchDronerDatasource'
import { LAT_LNG_BANGKOK } from '../../../definitions/Location'
import { CropPurposeSprayEntity, CropPurposeSprayEntity_INT } from '../../../entities/CropEntities'
import { FarmerEntity, FarmerEntity_INIT, FarmerPageEntity } from '../../../entities/FarmerEntities'
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from '../../../entities/FarmerPlotEntities'
import {
  CreateNewTaskEntity_INIT,
  GetNewTaskEntity,
  GetNewTaskEntity_INIT,
  UpdateNewTask,
  UpdateNewTask_INIT,
} from '../../../entities/NewTaskEntities'
import { TaskSearchDroner, TaskSearchDroner_INIT } from '../../../entities/TaskSearchDroner'
import { color } from '../../../resource'
import {
  CreateDronerTempEntity,
  CreateDronerTempEntity_INIT,
  DeletedDronerTemp,
  DeletedDronerTemp_INIT,
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from '../../../entities/TaskDronerTemp'
import ModalSelectedEditDroner from '../../../components/modal/task/newTask/ModalSelectedEditDroner'
import {
  formatNumberWithCommas,
  numberWithCommasToFixed,
  validateOnlyNumWDecimal,
  validateOnlyNumber,
} from '../../../utilities/TextFormatter'
import { TaskDronerTempDataSource } from '../../../datasource/TaskDronerTempDatasource'
import Swal from 'sweetalert2'
import icon from '../../../resource/icon'
import { LocationPriceDatasource } from '../../../datasource/LocationPriceDatasource'
import { CouponDataSource } from '../../../datasource/CouponDatasource'
import {
  GetTaskCoupon,
  GetTaskCoupon_INIT,
  TaskCoupon,
  TaskCoupon_INIT,
} from '../../../entities/CalculateTask'
import { useNavigate } from 'react-router-dom'
import 'rsuite/dist/rsuite.min.css'
import { ModalAcceptedTask } from '../../../components/modal/ModalAcceptedTask'
import ShowNickName from '../../../components/popover/ShowNickName'
import '../newTask/Styles.css'
import { TargetSpray } from '../../../datasource/TargetSprayDatarource'
import { TargetSpayEntities } from '../../../entities/TargetSprayEntities'
import { DronerEntity_INIT } from '../../../entities/DronerEntities'
import { ConfirmNewTask } from './ConfirmNewTask'

const dateFormat = 'DD/MM/YYYY'
const dateCreateFormat = 'YYYY-MM-DD'
const timeFormat = 'HH:mm'
const timeCreateFormat = 'HH:mm:ss'

const { Option } = AntdSelect
const { Step } = Steps

const _ = require('lodash')
const { Map } = require('immutable')

const EditNewTask = () => {
  const queryString = _.split(window.location.pathname, '=')
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState<GetNewTaskEntity>(GetNewTaskEntity_INIT)
  const [dataFarmer, setDataFarmer] = useState<FarmerEntity>(FarmerEntity_INIT)
  const [farmerSelected, setFarmerSelected] = useState<FarmerEntity>(FarmerEntity_INIT)
  const [farmerPlotSeleced, setFarmerPlotSelected] =
    useState<FarmerPlotEntity>(FarmerPlotEntity_INIT)
  const [checkSelectPlot, setCheckSelectPlot] = useState<any>('')
  const [dronerSelected, setDronerSelected] = useState<TaskSearchDroner[]>([TaskSearchDroner_INIT])
  const [checkCrop, setCheckCrop] = useState<boolean>(true)
  const [otherSpray, setOtherSpray] = useState<any>()
  const [validateComma, setValidateComma] = useState<{
    status: any
    message: string
  }>({
    status: '',
    message: '',
  })
  const [modalCheckUpdate, setModalCheckUpdate] = useState<boolean>(false)
  const [targetSpray, setTargetSpray] = useState<TargetSpayEntities[]>([])

  const [couponData, setCouponData] = useState<TaskCoupon>(TaskCoupon_INIT)
  const [getCoupon, setGetCoupon] = useState<GetTaskCoupon>(GetTaskCoupon_INIT)

  const [dateAppointment, setDateAppointment] = useState<any>(moment(undefined))
  const [timeAppointment, setTimeAppointment] = useState<any>(moment(undefined))
  const [searchTextDroner, setSearchTextDroner] = useState<string>('')

  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>()
  const [selectionType] = useState<RowSelectionType>('checkbox')
  const [rowFarmer, setRowFarmer] = useState(10)
  const [dataDronerList, setDataDronerList] = useState<TaskSearchDroner[]>([TaskSearchDroner_INIT])
  const [dronerSelectedList, setDronerSelectedList] = useState<TaskDronerTempEntity[]>([
    TaskDronerTempEntity_INIT,
  ])

  const [showModalSelectedDroner, setShowModalSelectedDroner] = useState<boolean>(false)
  const [disableBtn, setDisableBtn] = useState<boolean>(false)
  const [priceMethod, setPriceMethod] = useState<string>('อัตโนมัติ')
  const [loading, setLoading] = useState<boolean>(true)
  const [currenSearch, setCurrentSearch] = useState(1)
  const [selectFarmer, setSelectFarmer] = useState<string>('')
  const [searchFilterFarmer, setSearchFilterFarmer] = useState<string>('')
  const [farmerListDropdown, setFarmerListDropdown] = useState<any>([])
  const [count, setCount] = useState<number>(0)
  const [showData, setShowData] = useState<boolean>(true)
  const [someTargetSpray, setSomeTargetSpray] = useState<any>()

  const fetchNewTask = async () => {
    await TaskDatasource.getNewTaskById(queryString[1]).then(async (res) => {
      delete res['updatedAt']
      res.farmer.farmerPlot = [res.farmerPlot]
      res?.taskDronerTemp?.map((item) => _.set(item, 'isChecked', true))
      res.taskDronerTemp && setDronerSelectedList(res?.taskDronerTemp)
      setDateAppointment(new Date(res.dateAppointment).toUTCString())
      setPriceMethod(res.priceStandard != 0 ? 'อัตโนมัติ' : 'กรอกข้อมูลเอง')
      setTimeAppointment(new Date(res.dateAppointment).getTime())
      setDataFarmer(res.farmer)
      setFarmerSelected(res.farmer)
      setFarmerPlotSelected(res.farmerPlot)
      fetchPurposeSpray(res.farmerPlot.plantName)
      setData(res)
      const couponInfo = { ...getCoupon }
      couponInfo.farmerPlotId = res.farmerPlotId
      couponInfo.cropName = res.farmerPlot?.plantName
      couponInfo.couponCode = res.couponCode
      couponInfo.raiAmount = (res?.farmAreaAmount && parseInt(res.farmAreaAmount!)) || 0
      couponInfo.priceCustom = res.unitPriceStandard === 0 ? res.unitPrice.toString() : '0'
      await CouponDataSource.calculateEditCoupon(couponInfo).then((cou) => {
        setCouponData(cou.responseData)
      })
    })
  }

  const calculatePrice = () => {
    const couponInfo = { ...getCoupon }
    couponInfo.farmerPlotId = data.farmerPlotId
    couponInfo.cropName = farmerPlotSeleced?.plantName
    couponInfo.couponCode = data.couponCode
    couponInfo.raiAmount = data && data?.farmAreaAmount && parseInt(data.farmAreaAmount!)
    couponInfo.priceCustom = data.unitPriceStandard === 0 ? data.unitPrice.toString() : '0'
    CouponDataSource.calculateEditCoupon(couponInfo).then((res) => {
      setCouponData(res.responseData)
    })
  }
  const fetchPurposeSpray = async (crop: string) => {
    await CropDatasource.getPurposeByCroupName(crop).then((res) => {
      setPeriodSpray(res)
    })
  }

  useEffect(() => {
    fetchNewTask()
    fetchFarmerList()
    getAllTargetSpray()
  }, [currenSearch, rowFarmer])

  useEffect(() => {
    TaskDatasource.getFarmerListTask(searchFilterFarmer, currenSearch, 10).then(
      (res: FarmerPageEntity) => {
        const data = res.data.map((item) => {
          return {
            ...item,
            label: item.firstname + ' ' + item.lastname + ' | ' + item.telephoneNo,
            value: item.id,
          }
        })
        setCount(res.count)
        setFarmerListDropdown(data)
      },
    )
  }, [searchFilterFarmer])

  const getAllTargetSpray = async () => {
    await TargetSpray.getAllTargetSpray().then((res) => {
      setTargetSpray(res.data)
      setSomeTargetSpray(res.data.map((item: any) => item.name))
    })
  }
  // #region step 1
  const fetchFarmerList = () => {
    TaskDatasource.getFarmerListTask(searchFilterFarmer, currenSearch, rowFarmer).then(
      (res: FarmerPageEntity) => {
        const data = res.data.map((item) => {
          return {
            ...item,
            label: item.firstname + ' ' + item.lastname + ' | ' + item.telephoneNo,
            value: item.id,
          }
        })
        setCount(res.count)
        setFarmerListDropdown(data)
      },
    )
  }

  const handleInputChange = (inputValue: any) => {
    if (currenSearch === 1) {
      setSearchFilterFarmer(inputValue)
    }
    return inputValue
  }
  const handleMenuScrollToBottom = () => {
    if (rowFarmer === farmerListDropdown.length) {
      setCurrentSearch(currenSearch)
      setRowFarmer(rowFarmer + 10)
    }
  }

  const handleSearchFarmer = (id: any) => {
    setSelectFarmer(id)
    setFarmerSelected(id)
    setShowData(false)
  }

  const fetchLocationPrice = async (
    proId?: number,
    plant?: string,
    rai?: string,
    plot?: string,
  ) => {
    await LocationPriceDatasource.getLocationPrice(proId, plant).then((res) => {
      const calUnitPrice = rai && parseFloat(res.price) * parseFloat(rai)
      const d = Map(data).set('priceStandard', calUnitPrice)
      const e = Map(d.toJS()).set('farmAreaAmount', rai)
      const pushCal = Map(e.toJS()).set('unitPriceStandard', parseFloat(res.price))
      const f = Map(pushCal.toJS()).set('price', calUnitPrice)
      const pushCale = Map(f.toJS()).set('unitPrice', parseFloat(res.price))
      const g = Map(pushCale.toJS()).set('farmerPlotId', plot)
      setData(g.toJS())
    })
  }
  const handleSelectFarmer = () => {
    const newData: GetNewTaskEntity = GetNewTaskEntity_INIT
    newData.id = data.id
    newData.taskNo = data.taskNo
    newData.farmerId = farmerSelected?.id
    newData.farmerPlotId = ''
    newData.farmAreaAmount = ''
    newData.dronerId = ''
    newData.purposeSprayId = ''
    newData.dateAppointment = moment(new Date()).format(dateFormat)
    newData.targetSpray = []
    newData.taskDronerTemp = []
    newData.preparationBy = ''
    newData.createdAt = data.createdAt
    newData.distance = data.distance
    newData.status = data.status
    newData.statusRemark = data.statusRemark
    newData.reviewDronerAvg = ''
    newData.reviewDronerDetail = ''
    newData.unitPriceStandard = 0
    newData.priceStandard = 0
    newData.unitPrice = 0
    newData.price = ''
    newData.totalPrice = ''
    newData.fee = 0
    newData.discountFee = 0
    newData.reviewFarmerScore = ''
    newData.reviewFarmerComment = ''
    newData.imagePathFinishTask = ''
    newData.comment = ''
    newData.farmer = farmerSelected
    newData.isProblem = false
    newData.problemRemark = ''
    newData.dateRemark = ''
    newData.dateDelay = ''
    newData.statusDelay = ''
    newData.delayRejectRemark = ''
    newData.purposeSpray = CropPurposeSprayEntity_INT
    newData.droner = DronerEntity_INIT
    newData.farmerPlot = FarmerPlotEntity_INIT
    setData(newData)
    setShowData(true)
    setCheckSelectPlot('error')
    setDronerSelected([])
    setDataFarmer(farmerSelected)
    setDateAppointment(moment(undefined))
    setTimeAppointment(moment(undefined))
  }
  const handleSelectFarmerPlot = (value: any) => {
    targetSpray.map((item) => _.set(item, 'isChecked', false))
    const plotSelected = farmerSelected?.farmerPlot.filter((x) => x.id == value)[0]
    setPriceMethod('อัตโนมัติ')
    const f = Map(data).set('farmerPlotId', plotSelected?.id)
    const g = Map(f.toJS()).set('farmAreaAmount', plotSelected?.raiAmount)
    setCheckSelectPlot('')
    setData(g.toJS())
    setFarmerPlotSelected(plotSelected)
    fetchPurposeSpray(plotSelected.plantName)
    fetchLocationPrice(
      plotSelected?.plotArea.provinceId,
      plotSelected?.plantName,
      plotSelected?.raiAmount,
      plotSelected?.id,
    )
  }
  const handleAmountRai = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = validateOnlyNumber(e.target.value)
    const payload = {
      ...data,
    }
    payload.priceStandard = data.unitPriceStandard * parseFloat(values)
    payload.price = data.unitPriceStandard * parseFloat(values)
    payload.unitPriceStandard = data.unitPrice
    payload.farmAreaAmount = values
    setData(payload)
  }
  const handlePeriodSpray = (e: any) => {
    const d = Map(data).set('purposeSprayId', e)
    setData(d.toJS())
  }

  const handleCalServiceCharge = (e: any) => {
    const values = validateOnlyNumWDecimal(e.target.value)
    if (values.startsWith('.')) {
      e.preventDefault()
    } else {
      if (e.target.id == 'unitPrice') {
        const calUnitPrice = parseFloat(data.farmAreaAmount) * parseFloat(values)
        const d = Map(data).set('unitPrice', values)
        const pushCal = Map(d.toJS()).set('price', calUnitPrice.toFixed(2))
        setData(pushCal.toJS())
      } else {
        const calUnitPrice = parseFloat(values) / parseFloat(data.farmAreaAmount)
        const d = Map(data).set('price', values)
        const pushCal = Map(d.toJS()).set('unitPrice', calUnitPrice.toFixed(2))
        setData(pushCal.toJS())
      }
    }
  }
  const handlePurposeSpray = (e: any) => {
    const checked = e.target.checked
    const value = e.target.value
    setCheckCrop(value == 'อื่นๆ' ? !checked : otherSpray != null ? false : true)
    targetSpray.map((item: any) =>
      _.set(item, 'isChecked', item.name === value ? checked : item.isChecked),
    )
    let p: any = ''

    if (checked) {
      const targetSpray = data?.targetSpray || []
      p = Map(data).set(
        'targetSpray',
        [...targetSpray, value].filter((x) => x !== ''),
      )
    } else {
      const targetSpray = data?.targetSpray || []
      const removePlant = targetSpray.filter((x) => x !== value)
      p = Map(data).set('targetSpray', removePlant)
    }
    setData(p.toJS())
  }
  const handleOtherSpray = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length != 0) {
      setOtherSpray(e.target.value)
      const checkComma = checkValidateComma(e.target.value)
      if (!checkComma) {
        setValidateComma({ status: '', message: '' })
        setDisableBtn(false)
      } else {
        setValidateComma({
          status: 'error',
          message: 'กรุณาใช้ (,) ให้กับการเพิ่มมากกว่า 1 อย่าง',
        })
        setDisableBtn(true)
      }
    } else {
      setValidateComma({
        status: 'error',
        message: 'โปรดระบุ',
      })
      setDisableBtn(true)
    }
  }
  const handlePreparation = (e: any) => {
    const d = Map(data).set('preparationBy', e.target.value)
    setData(d.toJS())
  }
  const handleComment = (e: any) => {
    const d = Map(data).set('comment', e.target.value)
    setData(d.toJS())
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
  const handleDate = (e: any) => {
    const dateSelect = new Date(e)
    setDateAppointment(
      dateSelect.getFullYear() + '/' + (dateSelect.getMonth() + 1) + '/' + dateSelect.getDate(),
    )
  }
  const handleTime = (e: any) => {
    setTimeAppointment(new Date(e).getTime())
  }
  const selectPrice = (e: any) => {
    setPriceMethod(e.target.outerText)
    if (e.target.outerText === 'กรอกข้อมูลเอง') {
      const d = Map(data).set('price', 0)
      const pushCal = Map(d.toJS()).set('unitPrice', 0)
      setData(pushCal.toJS())
    } else {
      fetchLocationPrice(
        farmerPlotSeleced?.plotArea.provinceId,
        farmerPlotSeleced?.plantName,
        data?.farmAreaAmount,
        farmerPlotSeleced?.id,
      )
    }
  }

  const renderFormSearchFarmer = (
    <>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลเกษตรกรและแปลง' />
        <div className='flex-column'>
          <Form style={{ padding: '20px' }} form={form}>
            {current == 0 && (
              <div className='row'>
                <div className='form-group col-lg-6'>
                  <Form.Item name='searchAddress'>
                    <Select
                      placeholder='ค้นหาชื่อเกษตรกร/เบอร์โทร.'
                      isSearchable
                      isClearable
                      onInputChange={handleInputChange}
                      onChange={(selectedOptions: any) => {
                        setCurrentSearch(1)
                        handleSearchFarmer(selectedOptions)
                      }}
                      options={farmerListDropdown}
                      value={selectFarmer}
                      onMenuScrollToBottom={handleMenuScrollToBottom}
                    />
                  </Form.Item>
                </div>
                <div className='form-group col-lg-6'>
                  <Button
                    style={{
                      border: '1px dashed #219653',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(33, 150, 83, 0.1)',
                      color: color.Success,
                    }}
                    onClick={handleSelectFarmer}
                    disabled={data.couponId ? true : false}
                  >
                    เลือกเกษตรกร
                  </Button>
                </div>
              </div>
            )}
            {dataFarmer && showData && (
              <div className='col-lg-12' key={dataFarmer.id}>
                <div className='row'>
                  <div className='form-group col-lg-4'>
                    <Form.Item>
                      <label>ชื่อ-นามสกุล</label>
                      <Input value={dataFarmer.firstname + ' ' + dataFarmer.lastname} disabled />
                    </Form.Item>
                  </div>
                  <div className='form-group col-lg-4'>
                    <label>เบอร์โทร</label>
                    <Form.Item>
                      <Input value={dataFarmer.telephoneNo} disabled />
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group col-lg-4'>
                    <label>แปลง</label>
                    <Form.Item>
                      <AntdSelect
                        status={checkSelectPlot}
                        placeholder='เลือกแปลง'
                        disabled={current == 2 || data.couponId ? true : false}
                        onChange={handleSelectFarmerPlot}
                        defaultValue={data?.farmerPlotId}
                      >
                        {dataFarmer?.farmerPlot.map((item) => (
                          <option value={item.id}>{item.plotName}</option>
                        ))}
                      </AntdSelect>
                      {checkSelectPlot == 'error' && (
                        <span style={{ color: color.Error }}>กรุณาเลือกแปลง</span>
                      )}
                    </Form.Item>
                  </div>
                  <div className='form-group col-lg-4'>
                    <label>พืชที่ปลูก</label>
                    <Form.Item>
                      <Input value={farmerPlotSeleced?.plantName} disabled />
                    </Form.Item>
                  </div>
                  <div className='form-group col-lg-4'>
                    <label>จำนวนไร่</label>
                    <Form.Item>
                      <Input
                        status={
                          parseFloat(data?.farmAreaAmount) >
                          (farmerPlotSeleced.raiAmount == undefined
                            ? 0
                            : parseFloat(farmerPlotSeleced.raiAmount))
                            ? 'error'
                            : ''
                        }
                        value={numberWithCommasToFixed(parseFloat(data?.farmAreaAmount))}
                        onChange={handleAmountRai}
                        disabled={
                          current === 2 ||
                          current === 0 ||
                          checkSelectPlot == 'error' ||
                          data.couponId
                            ? true
                            : false
                        }
                      />
                      {parseFloat(data?.farmAreaAmount) >
                        (farmerPlotSeleced.raiAmount == undefined
                          ? 0
                          : parseFloat(farmerPlotSeleced.raiAmount)) && (
                        <p
                          style={{
                            color: color.Error,
                          }}
                        >
                          ไม่สามารถกรอกเกินจำนวน {farmerPlotSeleced.raiAmount} ไร่
                        </p>
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group'>
                    <label>พื้นที่แปลงเกษตร</label>
                    <Form.Item>
                      <Input
                        value={
                          farmerPlotSeleced?.plotArea.subdistrictName +
                          '/' +
                          farmerPlotSeleced?.plotArea.districtName +
                          '/' +
                          farmerPlotSeleced?.plotArea.provinceName
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
                      <Input value={farmerPlotSeleced?.lat} disabled />
                    </Form.Item>
                  </div>
                  <div className='form-group col-lg-6'>
                    <label>Longitude (ลองติจูด)</label>
                    <Form.Item>
                      <Input value={farmerPlotSeleced?.long} disabled />
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group col-lg-12'>
                    <GooleMap
                      changeLatLng={(lat, lng) => {
                        const oldfarmerPlotSeleced = farmerPlotSeleced
                        setFarmerPlotSelected({
                          ...oldfarmerPlotSeleced,
                          lat: lat,
                          long: lng,
                        })
                      }}
                      width='100%'
                      height='350px'
                      zoom={17}
                      lat={
                        farmerPlotSeleced?.lat != undefined
                          ? parseFloat(farmerPlotSeleced.lat)
                          : LAT_LNG_BANGKOK.lat
                      }
                      lng={
                        farmerPlotSeleced?.long != undefined
                          ? parseFloat(farmerPlotSeleced.long)
                          : LAT_LNG_BANGKOK.lng
                      }
                    />
                    <div className='row'>
                      <div className='form-group'>
                        <label>จุดสังเกต</label>
                        <Form.Item>
                          <Input value={farmerPlotSeleced?.landmark} disabled />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dataFarmer && showData && (
              <CardContainer style={{ backgroundColor: 'rgba(33, 150, 83, 0.1)' }}>
                <Form style={{ padding: '20px' }}>
                  <label>ยอดรวมค่าบริการ</label>
                  <br />
                  {current !== 2 && (
                    <>
                      <Button
                        size='middle'
                        style={{
                          backgroundColor:
                            priceMethod == 'กรอกข้อมูลเอง' ? color.White : color.Success,
                          color: priceMethod == 'กรอกข้อมูลเอง' ? color.Grey : color.White,
                          borderColor: priceMethod == 'กรอกข้อมูลเอง' ? color.White : color.Success,
                        }}
                        disabled={current == 2 || checkSelectPlot == 'error'}
                        onClick={(e) => selectPrice(e)}
                      >
                        อัตโนมัติ
                      </Button>
                      <Button
                        size='middle'
                        style={{
                          backgroundColor: priceMethod == 'อัตโนมัติ' ? color.White : color.Success,
                          color: priceMethod == 'อัตโนมัติ' ? color.Grey : color.White,
                          borderColor: priceMethod == 'อัตโนมัติ' ? color.White : color.Success,
                        }}
                        disabled={current == 2 || checkSelectPlot == 'error'}
                        onClick={(e) => selectPrice(e)}
                      >
                        กรอกข้อมูลเอง
                      </Button>
                    </>
                  )}
                  {priceMethod === 'อัตโนมัติ' && (
                    <div className='row pt-3'>
                      <div className='form-group col-lg-4'>
                        <Form.Item>
                          <label>ค่าบริการ/ไร่</label> <span style={{ color: 'red' }}>*</span>
                          <Input
                            suffix='บาท/ไร่'
                            value={data.unitPriceStandard}
                            disabled
                            autoComplete='off'
                            step='0.01'
                          />
                        </Form.Item>
                      </div>
                      <div className='form-group col-lg-4'>
                        <label>คำนวณยอดรวม</label> <span style={{ color: 'red' }}>*</span>
                        <Form.Item>
                          <Input
                            suffix='บาท'
                            value={numberWithCommasToFixed(
                              parseFloat(data.priceStandard.toString()),
                            )}
                            disabled
                            autoComplete='off'
                            step='0.01'
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                  {priceMethod === 'กรอกข้อมูลเอง' && (
                    <div className='row pt-3'>
                      <div className='form-group col-lg-4'>
                        <Form.Item>
                          <label>ค่าบริการ/ไร่</label> <span style={{ color: 'red' }}>*</span>
                          <Input
                            suffix='บาท/ไร่'
                            id='unitPrice'
                            value={formatNumberWithCommas(data.unitPrice)}
                            onChange={handleCalServiceCharge}
                            disabled={
                              current == 2 || checkSelectPlot == 'error' || data.couponId
                                ? true
                                : false
                            }
                            autoComplete='off'
                            step='0.01'
                          />
                        </Form.Item>
                      </div>
                      <div className='form-group col-lg-4'>
                        <label>คำนวณยอดรวม</label> <span style={{ color: 'red' }}>*</span>
                        <Form.Item>
                          <Input
                            suffix='บาท'
                            value={formatNumberWithCommas(data.price)}
                            onChange={handleCalServiceCharge}
                            disabled={
                              current == 2 || checkSelectPlot == 'error' || data.couponId
                                ? true
                                : false
                            }
                            autoComplete='off'
                            step='0.01'
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                </Form>
              </CardContainer>
            )}
          </Form>
        </div>
      </CardContainer>
    </>
  )
  const renderFormAppointment = (
    <CardContainer>
      <CardHeader textHeader='นัดหมายบริการ' />
      <div className='flex-column'>
        <Form style={{ padding: '20px' }}>
          <div className='row form-group col-lg-6'>
            <div className='col-lg'>
              วันนัดหมาย
              <div>
                <DatePicker
                  format={dateFormat}
                  className='col-lg-12'
                  disabled={current == 2 || checkSelectPlot == 'error'}
                  disabledDate={(current) => current && current < moment().startOf('day')}
                  onChange={(e: any) => handleDate(e)}
                  defaultValue={moment(dateAppointment)}
                />
              </div>
            </div>
            <div className='col-lg'>
              เวลานัดหมาย
              <div>
                <TimePicker
                  className='col-lg-12'
                  disabled={current == 2 || checkSelectPlot == 'error'}
                  format={timeFormat}
                  onSelect={(v) => {
                    setTimeAppointment(v)
                  }}
                  value={moment(timeAppointment)}
                />
              </div>
            </div>
          </div>
          <div className='row form-group col-lg-6'>
            <label>
              ช่วงเวลาการพ่น <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item>
              <AntdSelect
                key={data?.purposeSprayId}
                placeholder='-'
                disabled={
                  current == 2 || checkSelectPlot == 'error' || data.couponId ? true : false
                }
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
              </AntdSelect>
            </Form.Item>
          </div>
          <div className='row form-group col-lg-6 p-2'>
            <label>
              เป้าหมายการฉีดพ่น <span style={{ color: 'red' }}>*</span>
            </label>
            <div className='checkbox-grid'>
              {targetSpray
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
                        key={data.targetSpray[0]}
                        defaultChecked={x.isChecked}
                        value={x.name}
                        disabled={
                          current == 2 || checkSelectPlot == 'error' || data.couponId ? true : false
                        }
                        onChange={handlePurposeSpray}
                      />{' '}
                      <label style={{ padding: '0 8px 0 0' }}>{x.name}</label>
                      {x.name === 'อื่นๆ' && (
                        <>
                          <Input
                            status={validateComma.status}
                            key={data.targetSpray[0]}
                            className='col-lg-8'
                            disabled={current == 2 || checkCrop}
                            placeholder='โปรดระบุ เช่น เพลี้ย,หอย'
                            defaultValue={Array.from(
                              new Set(
                                data?.targetSpray.filter(
                                  (a) => !someTargetSpray.some((x: any) => x === a),
                                ),
                              ),
                            ).join(',')}
                            onChange={handleOtherSpray}
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
          </div>
          <div className='row form-group col-lg-6 p-2'>
            <label>
              การเตรียมยา <span style={{ color: 'red' }}>*</span>
            </label>
            <Radio.Group
              disabled={current == 2 || checkSelectPlot == 'error'}
              defaultValue={data?.preparationBy}
              key={data.preparationBy}
            >
              <Space direction='vertical' onChange={handlePreparation}>
                <Radio value='เกษตรกรเตรียมยาเอง'>เกษตรกรเตรียมยาเอง</Radio>
                <Radio value='นักบินโดรนเตรียมให้'>นักบินโดรนเตรียมให้</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className='form-group'>
            <label>หมายเหตุ</label>
            <Form.Item>
              <TextArea
                value={data.comment}
                placeholder='ระบุหมายเหตุเพื่อแจ้งนักบินโดรน เช่น เกษตรกรจะเตรียมยาให้, ฝากนักบินเลือกยาราคาไม่แพงมาให้หน่อย เป็นต้น'
                disabled={current == 2 || checkSelectPlot == 'error'}
                onChange={handleComment}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </CardContainer>
  )
  //#endregion

  //#region Step2
  const fetchDronerList = async (
    farmerId?: string,
    plotId?: string,
    date?: string,
    search?: string,
    status?: string,
    ratingMin?: number,
    ratingMax?: number,
  ) => {
    setLoading(true)
    await TaskSearchDronerDatasource.getTaskDronerList(
      farmerId,
      plotId,
      date,
      search,
      distrance.min,
      distrance.max,
      status,
      ratingMin,
      ratingMax,
    )
      .then((res) => {
        if (Array.isArray(res)) {
          res.forEach((item) => {
            _.set(
              item,
              'isChecked',
              dronerSelectedList.map((x) => x).find((y) => y.dronerId === item.droner_id)
                ? true
                : false,
            )
          })
          setDataDronerList(res)
        } else {
          setDataDronerList([])
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const ratingStar = (
    <Menu
      items={[
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '1',
          icon: <Checkbox value={5} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '2',
          icon: <Checkbox value={4} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '3',
          icon: <Checkbox value={3} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '4',
          icon: <Checkbox value={2} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
            </div>
          ),
          key: '5',
          icon: <Checkbox value={1} onClick={(e) => onChangeRating(e)} />,
        },
      ]}
    />
  )
  const [visibleSlider, setVisibleSlider] = useState(false)
  const [visibleRating, setVisibleRating] = useState(false)
  const [distrance, setDistrance] = useState<{
    min: number
    max: number
  }>({
    min: 0,
    max: 0,
  })
  const [accuNumber, setAccuNumber] = useState<number[]>([])
  const [rating, setRating] = useState<{
    ratingMin: number
    ratingMax: number
  }>()
  const [statusDroner, setStatusDroner] = useState<string>()

  const handleVisibleSlider = (newVisible: any) => {
    setVisibleSlider(newVisible)
  }
  const onChangeSlider = (newValue: any) => {
    setDistrance({ min: newValue[0], max: newValue[1] })
  }
  const onChangeDistranceMin = (e: any) => {
    setDistrance({ min: e, max: distrance.max })
  }
  const onChangeDistranceMax = (e: any) => {
    setDistrance({ min: distrance.min, max: e })
  }
  const onChangeStatusDroner = (e: any) => {
    setStatusDroner(e)
  }
  const onChangeRating = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let min = 0
    let max = 0
    if (checked) {
      min = Math.min(...accuNumber, value)
      max = Math.max(...accuNumber, value)
      setAccuNumber([...accuNumber, value])
    } else {
      const d: number[] = accuNumber.filter((x) => x != value)
      min = Math.min(...d)
      max = Math.max(...d)
      setAccuNumber(d)
    }
    setRating({ ratingMin: min, ratingMax: max })
  }
  const handleSelectDroner = async (e: any, droner: any) => {
    const dronerSelected: CreateDronerTempEntity = CreateDronerTempEntity_INIT
    const checked = e.target.checked
    if (checked) {
      dronerSelected.taskId = queryString[1]
      dronerSelected.dronerId = droner.droner_id
      dronerSelected.status = 'WAIT_RECEIVE'
      dronerSelected.dronerDetail = [JSON.stringify(droner)]
      dronerSelected.distance = droner.distance
      await TaskDronerTempDataSource.createDronerTemp(dronerSelected).then((res) => {
        const droner = dataDronerList.map((item) =>
          _.set(
            item,
            'isChecked',
            res.responseData.map((x: any) => x).find((y: any) => y.dronerId === item.droner_id)
              ? true
              : false,
          ),
        )
        setDataDronerList(droner)
        setDronerSelectedList(res.responseData)
      })
    } else {
      const deleteDroner: DeletedDronerTemp = DeletedDronerTemp_INIT
      deleteDroner.taskId = queryString[1]
      deleteDroner.dronerId = droner.droner_id
      await TaskDronerTempDataSource.deleteDronerTemp(deleteDroner).then((res) => {
        const droner = dataDronerList.map((item) =>
          _.set(
            item,
            'isChecked',
            res.responseData.map((x: any) => x).find((y: any) => y.dronerId === item.droner_id)
              ? true
              : false,
          ),
        )
        setDataDronerList(droner)
        setDronerSelectedList(res.responseData)
      })
    }
  }
  const handleAllSelectDroner = async (e: any) => {
    const dronerSelected: CreateDronerTempEntity = CreateDronerTempEntity_INIT
    const deleteDroner: DeletedDronerTemp = DeletedDronerTemp_INIT
    const checked = e.target.checked
    if (checked) {
      const compareData = dataDronerList.filter(
        (x) => !dronerSelectedList.map((y) => y.dronerId).includes(x.droner_id),
      )
      for (let i = 0; compareData.length > i; i++) {
        dronerSelected.taskId = queryString[1]
        dronerSelected.dronerId = compareData[i].droner_id
        dronerSelected.status = 'WAIT_RECEIVE'
        dronerSelected.dronerDetail = [JSON.stringify(compareData[i])]
        dronerSelected.distance = compareData[i].distance
        await TaskDronerTempDataSource.createDronerTemp(dronerSelected).then((res) => {
          const droner = dataDronerList.map((item) =>
            _.set(
              item,
              'isChecked',
              res.responseData.map((x: any) => x).find((y: any) => y.dronerId === item.droner_id)
                ? true
                : false,
            ),
          )
          setDataDronerList(droner)
          setDronerSelectedList(res.responseData)
        })
      }
    } else {
      for (let i = 0; dataDronerList.length > i; i++) {
        deleteDroner.taskId = queryString[1]
        deleteDroner.dronerId = dataDronerList[i].droner_id
        await TaskDronerTempDataSource.deleteDronerTemp(deleteDroner).then((res) => {
          const droner = dataDronerList.map((item) =>
            _.set(
              item,
              'isChecked',
              res.responseData.map((x: any) => x).find((y: any) => y.dronerId === item.droner_id)
                ? true
                : false,
            ),
          )
          setDataDronerList(droner)
          setDronerSelectedList(res.responseData)
        })
      }
    }
  }
  const callBackDronerSelected = async (data: TaskDronerTempEntity[]) => {
    const compareData = dronerSelectedList.filter((x) => !data.map((y) => y.id).includes(x.id))
    for (let i = 0; compareData.length > i; i++) {
      const deleteDroner: DeletedDronerTemp = DeletedDronerTemp_INIT
      deleteDroner.taskId = queryString[1]
      deleteDroner.dronerId = compareData[i].dronerId
      await TaskDronerTempDataSource.deleteDronerTemp(deleteDroner).then((res) => {
        const droner = dataDronerList.map((item) =>
          _.set(
            item,
            'isChecked',
            res.responseData.map((x: any) => x).find((y: any) => y.dronerId === item.droner_id)
              ? true
              : false,
          ),
        )
        setDataDronerList(droner)
        setDronerSelectedList(res.responseData)
      })
    }
    setShowModalSelectedDroner((prev) => !prev)
  }
  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible)
  }

  const searchSection = (
    <div className='d-flex justify-content-between' style={{ padding: '10px' }}>
      <div className='col-lg-3 p-1'>
        <Input
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder='ค้นหาชื่อเกษตรกร หรือเบอร์โทร'
          className='col-lg-12 p-1'
          onChange={(e: any) => setSearchTextDroner(e.target.value)}
        />
      </div>
      <div className='col-lg-2 p-1'>
        <Popover
          content={
            <>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                value={[distrance.min, distrance.max]}
                onChange={onChangeSlider}
                max={200}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: '0 16px',
                }}
                value={distrance.min}
                onChange={onChangeDistranceMin}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: '0 16px',
                }}
                id='max'
                value={distrance.max}
                onChange={onChangeDistranceMax}
              />
            </>
          }
          title='ระยะทาง (กิโลเมตร)'
          trigger='click'
          visible={visibleSlider}
          onVisibleChange={handleVisibleSlider}
          placement='bottom'
        >
          <Button className='col-lg-12'>เลือกระยะทาง</Button>
        </Popover>
      </div>
      <div className='col-lg-2 p-1'>
        <Dropdown
          overlay={ratingStar}
          trigger={['click']}
          className='col-lg-12'
          onVisibleChange={handleVisibleRating}
          visible={visibleRating}
        >
          <Button>
            เลือก Rating
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className='col-lg-2'>
        <AntdSelect
          allowClear
          className='col-lg-12 p-1'
          placeholder='เลือกสถานะ'
          onChange={onChangeStatusDroner}
        >
          <option value='สะดวก'>สะดวก</option>
          <option value='ไม่สะดวก'>ไม่สะดวก</option>
        </AntdSelect>
      </div>
      <div className='col-lg-1 pt-1'>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() =>
            fetchDronerList(
              data.farmerId,
              data.farmerPlotId,
              dateAppointment,
              searchTextDroner,
              statusDroner,
              rating?.ratingMin,
              rating?.ratingMax,
            )
          }
        >
          ค้นหาข้อมูล
        </Button>
      </div>
      <div className='col-lg-2 pt-1'>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.Success,
          }}
          onClick={() => setShowModalSelectedDroner((prev) => !prev)}
        >
          ดูรายชื่อนักบินโดรนที่เลือก (
          {dronerSelectedList.filter((x) => x.isChecked != false).length})
        </Button>
      </div>
    </div>
  )
  const columns = [
    {
      title: selectionType == 'checkbox' && (
        <input
          type={selectionType}
          onChange={handleAllSelectDroner}
          checked={dataDronerList
            .filter((x) => x.is_open_receive_task != false)
            .every((x) => x.isChecked)}
          style={{ width: '18px', height: '18px' }}
        />
      ),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <input
                type={selectionType}
                onChange={(e) => handleSelectDroner(e, row)}
                checked={row.isChecked}
                disabled={
                  selectionType == 'checkbox'
                    ? row.is_open_receive_task != false
                      ? false
                      : true
                    : false
                }
                style={{ width: '18px', height: '18px' }}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อนักบินโดรน',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        const tooltipTitle = (
          <>
            {'เคยให้บริการเกษตรกรท่านนี้,'}
            <br />
            {'คะแนนรีวิวล่าสุด '}
            <StarFilled style={{ color: '#FFCA37', fontSize: '16px' }} />{' '}
            {parseFloat(row.rating_avg).toFixed(1)}
          </>
        )
        return {
          children: (
            <>
              <span>{row.firstname + ' ' + row.lastname}</span>
              {row.rating_avg != null && (
                <Tooltip title={tooltipTitle} className='p-2'>
                  <img src={icon.iconReviewDroner} style={{ width: 32, height: 32 }} />
                </Tooltip>
              )}

              <br />
              <span style={{ color: color.Grey }}>
                {row.droner_code}
                {row.nickname && <ShowNickName data={row.nickname} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telephone_no',
      key: 'telephone_no',
    },
    {
      title: 'จำนวนให้บริการ',
      dataIndex: 'total_task',
      key: 'total_task',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.total_task == null ? 0 : row.total_task} งาน</span>
              <br />
              <span style={{ color: color.Grey }}>
                รวม {row.total_area == null ? 0 : row.total_area} ไร่
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating_avg',
      key: 'rating_avg',
      render: (value: any, row: any, index: number) => {
        const checkRating = () => {
          return row.rating_avg > 0 ? true : false
        }
        return {
          children: (
            <>
              {checkRating() ? (
                <Row>
                  <div style={{ color: '#FFCA37', fontSize: '16px' }}>
                    <StarFilled />
                  </div>
                  <span className='pt-2 ps-1'>
                    {parseFloat(row.rating_avg).toFixed(1)} ({row.count_rating})
                  </span>
                </Row>
              ) : (
                <p>-</p>
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'ตำบล/อำเภอ/จังหวัด',
      dataIndex: 'subdistrict_name',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.subdistrict_name ? <span>{row.subdistrict_name}/</span> : '-/'}
              {row.district_name ? <span>{row.district_name}/</span> : '-/'}
              {row.province_name ? <span>{row.province_name}</span> : '-'}
            </>
          ),
        }
      },
    },
    {
      title: 'ระยะทาง',
      dataIndex: 'distance',
      key: 'distance',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.distance.toFixed(0)} km</span>
            </>
          ),
        }
      },
    },
    {
      title: 'ยี่หัอ',
      dataIndex: 'brand',
      key: 'brand',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.drone_brand ? (
                <>
                  <Avatar size={25} src={row.logo_drone_brand} style={{ marginRight: '5px' }} />
                  <span>{row.drone_brand}</span>
                  <br />
                  {row.count_drone > 1 && (
                    <p style={{ fontSize: '12px', color: color.Grey }}>(มากกว่า 1 ยี่ห้อ)</p>
                  )}
                </>
              ) : (
                '-'
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'สะดวก/ไม่สะดวก',
      dataIndex: 'droner_status',
      key: 'droner_status',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color:
                    row.droner_status === 'สะดวก' && row.is_open_receive_task
                      ? color.Success
                      : row.is_open_receive_task === false
                      ? color.Disable
                      : color.Error,
                }}
              >
                <Badge
                  color={
                    row.droner_status === 'สะดวก' && row.is_open_receive_task
                      ? color.Success
                      : row.is_open_receive_task === false
                      ? color.Disable
                      : color.Error
                  }
                />{' '}
                {!row.is_open_receive_task ? 'ปิดการใช้งาน' : row.droner_status}
                <br />
              </span>
            </>
          ),
        }
      },
    },
  ]
  const renderDronerList = (
    <>
      {searchSection}
      <CardContainer>
        <Table columns={columns} dataSource={dataDronerList} pagination={false} loading={loading} />
      </CardContainer>
    </>
  )
  //#endregion

  const nextStep = () => {
    if (current == 0) {
      const changeTimeFormat = moment(timeAppointment).format(timeCreateFormat)
      const changeDateFormat = moment(dateAppointment).format(dateCreateFormat)
      const otherSprayList = []
      if (otherSpray != undefined) {
        const m = otherSpray.split(',')
        for (let i = 0; m.length > i; i++) {
          otherSprayList.push(m[i])
        }
      }
      data.targetSpray.push(...otherSprayList.filter((x) => x != ''))
      const payload = {
        ...data,
      }
      payload.dateAppointment = moment(changeDateFormat + ' ' + changeTimeFormat).toISOString()
      if (priceMethod == 'กรอกข้อมูลเอง') {
        payload.priceStandard = 0
        payload.unitPriceStandard = 0
      }
      setData(payload)
    } else {
      const payload = { ...data }
      if (selectionType == 'checkbox') {
        payload.status = 'WAIT_RECEIVE'
        payload.fee = parseFloat(payload.price) * 0.05
        payload.discountFee = parseFloat(payload.price) * 0.05
        setData(payload)
      } else {
        payload.status = 'WAIT_START'
        payload.dronerId = dronerSelected[0].droner_id
        payload.fee = parseFloat(payload.price) * 0.05
        payload.discountFee = parseFloat(payload.price) * 0.05
        setData(payload)
      }
    }
    fetchDronerList(data.farmerId, data.farmerPlotId, dateAppointment)
    setCurrent(current + 1)
    calculatePrice()
  }

  const updateNewTask = async () => {
    const updateTask: UpdateNewTask = UpdateNewTask_INIT
    updateTask.id = data.id
    updateTask.farmerId = data.farmerId
    updateTask.farmerPlotId = data.farmerPlotId
    updateTask.farmAreaAmount = data.farmAreaAmount
    updateTask.dateAppointment = data.dateAppointment
    updateTask.targetSpray = data.targetSpray
    updateTask.preparationBy = data.preparationBy
    updateTask.purposeSprayId = data.purposeSprayId
    updateTask.status = data.status
    updateTask.statusRemark = data.statusRemark
    updateTask.updateBy = profile.firstname + ' ' + profile.lastname
    updateTask.unitPriceStandard = data.unitPriceStandard
    updateTask.priceStandard = data.priceStandard
    updateTask.unitPrice = data.unitPrice
    updateTask.price = data.price
    updateTask.comment = data.comment
    updateTask.fee = data.fee
    updateTask.discountFee = data.discountFee
    updateTask.couponCode = data.couponCode
    updateTask.couponId = couponData.couponId
    updateTask.discountCoupon = couponData.priceCouponDiscount!
    await TaskDatasource.updateNewTask(updateTask).then((res) => {
      if (res.userMessage === 'success') {
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
            navigate('/IndexNewTask')
          }
        })
      } else if (res.userMessage === 'Droner has receive') {
        setModalCheckUpdate(!modalCheckUpdate)
      }
    })
  }

  const titleStep = [
    {
      title: 'เลือกเกษตรกร และนัดหมาย',
      content: (
        <>
          {renderFormSearchFarmer} <br />
          {renderFormAppointment}
        </>
      ),
    },
    { title: 'เลือกนักบินโดรน', content: <>{renderDronerList}</> },
    {
      title: 'ยืนยันข้อมูล',
      content: (
        <>
          <ConfirmNewTask
            dataSearchFarmer={dataFarmer}
            farmerPlotSeleced={FarmerPlotEntity_INIT}
            dataAppointment={
              moment(new Date(dateAppointment)).format(dateFormat) +
              ', ' +
              moment(new Date(timeAppointment)).format(timeFormat)
            }
            createNewTask={data}
            farmerPlotId={farmerPlotSeleced?.id}
            cropSelected={''}
            isEdit={true}
            couponData={couponData}
            updateNewTask={updateNewTask}
            setCurrent={setCurrent}
            dronerSelectedList={dronerSelectedList}
          />
        </>
      ),
    },
  ]

  const renderStep = (
    <>
      <div className='custom-steps'>
        <Steps current={current} className='p-3'>
          {titleStep.map((item) => (
            <Step title={item.title} className='m--font-success' />
          ))}
        </Steps>
      </div>
      <div className='steps-content'>{titleStep[current].content}</div>
      <Row className='d-flex justify-content-between pt-2'>
        {current == 0 && <BackButton onClick={() => navigate('/IndexNewTask')} />}
        {current > 0 && current < 2 && (
          <BackButton onClick={() => setCurrent((prev) => prev - 1)} />
        )}
        {current < titleStep.length - 1 && (
          <Button
            style={{
              backgroundColor: disableBtn == false ? color.Success : color.Grey,
              borderColor: disableBtn == false ? color.Success : color.Grey,
              borderRadius: '5px',
              color: color.BG,
            }}
            onClick={nextStep}
          >
            ถัดไป
          </Button>
        )}
        {current === titleStep.length - 1 && current !== 2 && (
          <SaveButton onClick={updateNewTask} />
        )}
      </Row>
    </>
  )

  return (
    <>
      <div key={data?.id}>
        <Row>
          <BackIconButton onClick={() => navigate('/IndexNewTask')} />
          <span className='pt-3'>
            <strong style={{ fontSize: '20px' }}>แก้ไขงานบินใหม่ {data.taskNo}</strong>
          </span>
        </Row>
        {renderStep}
      </div>
      {showModalSelectedDroner && (
        <ModalSelectedEditDroner
          show={showModalSelectedDroner}
          dataDroner={dronerSelectedList}
          title='รายชื่อนักบินโดรน'
          backButton={() => setShowModalSelectedDroner((prev) => !prev)}
          callBack={callBackDronerSelected}
        />
      )}
      {modalCheckUpdate && (
        <ModalAcceptedTask
          titleButton={'ย้อนไปหน้าหลัก'}
          textHeader={'คุณไม่สามารถแก้ไขงานนี้ได้'}
          textDetail={
            'เนื่องจากในระหว่างการแก้ไข มีนักบินโดรนในระบบกดรับงานนี้แล้ว คุณสามารถตรวจสอบ/แก้ไขงานนี้ได้อีกครั้งในเมนูจัดการงานอื่นๆ'
          }
          visible={modalCheckUpdate}
          backButton={() => {
            setModalCheckUpdate(!modalCheckUpdate)
            navigate('/IndexNewTask')
          }}
        />
      )}
    </>
  )
}

export default EditNewTask
