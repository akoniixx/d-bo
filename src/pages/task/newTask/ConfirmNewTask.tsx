import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Divider,
  Input,
  Button,
  Select,
  Row,
  Col,
  Avatar,
  Form,
  Pagination,
} from 'antd'
import { CardHeader } from '../../../components/header/CardHearder'
import styled from 'styled-components'
import color from '../../../resource/color'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { CouponKeepByFarmer } from '../../../entities/CouponEntites'
import { FarmerPlotEntity } from '../../../entities/FarmerPlotEntities'
import {
  formatNumberWithCommas,
  numberWithCommas,
  numberWithCommasToFixed,
} from '../../../utilities/TextFormatter'
import { CouponDataSource } from '../../../datasource/CouponDatasource'
import { GetTaskCoupon, GetTaskCoupon_INIT, TaskCoupon } from '../../../entities/CalculateTask'
import ModalMapPlot from '../../../components/modal/task/finishTask/ModalMapPlot'
import SaveButtton from '../../../components/button/SaveButton'
import { BackButton } from '../../../components/button/BackButton'
import { TaskDronerTempEntity } from '../../../entities/TaskDronerTemp'

const CustomTable = styled(Table)`
  .ant-table-container table thead th {
    background-color: rgb(255, 255, 255) !important;
  }
  .ant-table-title {
    border-bottom: 0.1px solid ${color.Disable};
  }
`
interface ConfirmNewTaskProps {
  dataSearchFarmer: any
  farmerPlotSeleced: FarmerPlotEntity
  createNewTask: any
  dataAppointment: any
  farmerPlotId: any
  cropSelected: any
  isEdit: boolean
  couponData: TaskCoupon
  updateNewTask: (data: any) => void
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  dronerSelectedList?: TaskDronerTempEntity[]
}

export const ConfirmNewTask: React.FC<ConfirmNewTaskProps> = ({
  dataSearchFarmer,
  farmerPlotSeleced,
  dataAppointment,
  createNewTask,
  farmerPlotId,
  cropSelected,
  isEdit,
  couponData,
  updateNewTask,
  setCurrent,
  dronerSelectedList,
}) => {
  const [couponUsedBtn, setCouponUsedBtn] = useState<boolean[]>([false, true])
  const [couponCode, setCouponCode] = useState<string>('')
  const [checkKeepCoupon, setCheckKeepCoupon] = useState<boolean>(false)
  const [couponId, setCouponId] = useState<string>('')
  const [couponKeepList, setCouponKeepList] = useState<CouponKeepByFarmer[]>()
  const { Option } = Select
  const [couponMessage, setCouponMessage] = useState<string>('')
  const [form] = Form.useForm()
  const [colorCouponBtn, setColorCouponBtn] = useState<boolean>(true)
  const [dataCouponKeep, setCouponKeep] = useState<CouponKeepByFarmer>()
  const [getCoupon] = useState<GetTaskCoupon>(GetTaskCoupon_INIT)
  const [discountResult, setDiscountResult] = useState<number | null>()
  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
  }
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = createNewTask?.taskDronerTemp?.slice(startIndex, endIndex)
  const dronerSelected = dronerSelectedList?.slice(startIndex, endIndex)
  const total = isEdit ? dronerSelectedList?.length : createNewTask?.taskDronerTemp?.length

  const columns = [
    {
      dataIndex: 'index',
      key: 'index',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{index + 1}</span>,
        }
      },
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: number) => {
        const firstname = row.dronerDetail.map((x: any) => JSON.parse(x).firstname)[0]
        const lastname = row.dronerDetail.map((x: any) => JSON.parse(x).lastname)[0]
        return {
          children: (
            <>
              <span>
                {firstname || '-'} {lastname || '-'}
              </span>
            </>
          ),
        }
      },
    },
    {
      dataIndex: 'tel',
      key: 'tel',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.dronerDetail.map((x: any) => JSON.parse(x).telephone_no)[0] || '-'}</span>
            </>
          ),
        }
      },
    },
    {
      dataIndex: 'address',
      key: 'address',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.dronerDetail.map((x: any) => JSON.parse(x).subdistrict_name)[0] || '-'}/
              </span>
              <span>
                {row.dronerDetail.map((x: any) => JSON.parse(x).district_name)[0] || '-'}/
              </span>
              <span>{row.dronerDetail.map((x: any) => JSON.parse(x).province_name)[0] || '-'}</span>
            </>
          ),
        }
      },
    },
    {
      dataIndex: 'droneBrand',
      key: 'droneBrand',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                <Avatar
                  size={25}
                  src={row.dronerDetail.map((x: any) => JSON.parse(x).logo_drone_brand)[0] || '-'}
                  style={{ marginRight: '5px' }}
                />
                {row.dronerDetail.map((x: any) => JSON.parse(x).drone_brand)[0] || '-'}
              </span>
            </>
          ),
        }
      },
    },
  ]
  const mapWordingCondition = (item: CouponKeepByFarmer) => {
    const data = item.promotion
    let mapping = '-'
    if (data.couponConditionRai) {
      const checkMin = data.couponConditionRaiMin
        ? 'เมื่อจ้างขั้นต่ำ ' + data.couponConditionRaiMin + ' ไร่'
        : ''

      const checkMax = data.couponConditionRaiMax
        ? !data.couponConditionRaiMin
          ? 'เมื่อจ้างสูงสุด' + data.couponConditionRaiMax + ' ไร่'
          : ' - ' + data.couponConditionRaiMax + ' ไร่'
        : ''
      mapping = checkMin + checkMax
    }
    return mapping
  }

  const [showAll, setShowAll] = useState(false)

  const handleClick = () => {
    setShowAll(!showAll)
  }
  const renderValues = () => {
    if (createNewTask) {
      if (createNewTask?.targetSpray.length > 3 && !showAll) {
        return (
          <>
            {createNewTask?.targetSpray.slice(0, 3).join(', ')} ...
            <span onClick={handleClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              +({createNewTask?.targetSpray.length - 3})
            </span>
          </>
        )
      } else {
        return createNewTask?.targetSpray.join(', ')
      }
    }
  }

  useEffect(() => {
    fetchCouponKeep(createNewTask?.farmerId)
    couponId && calculatePrice(couponCode)
  }, [])

  const fetchCouponKeep = async (id?: string) => {
    const data = await CouponDataSource.getCouponKeepByFarmerId(id).then((res) => {
      return res
    })

    const result: any = []
    data.map((item: any) => {
      const checkCondition = true
      const checkPlant = item.promotion.couponConditionPlant
        ? item.promotion.couponConditionPlantList.some(
            (plant: any) =>
              plant.plantName === cropSelected &&
              plant.injectionTiming.includes(createNewTask.purposeSprayName),
          )
        : checkCondition

      const checkProvince = item.promotion.couponConditionProvince
        ? item.promotion.couponConditionProvinceList.some(
            (prov: any) => prov === farmerPlotSeleced.plotArea.provinceName,
          )
        : checkCondition

      const checkRai = item.promotion.couponConditionRai
        ? createNewTask.farmAreaAmount >= item.promotion.couponConditionRaiMin &&
          createNewTask.farmAreaAmount <= item.promotion.couponConditionRaiMax
        : checkCondition

      const checkService = item.promotion.couponConditionService
        ? createNewTask.price - (discountResult ?? 0) >= item.promotion.couponConditionServiceMin &&
          createNewTask.price - (discountResult ?? 0) <= item.promotion.couponConditionServiceMax
        : checkCondition

      checkPlant && checkProvince && checkRai && checkService && result.push(item)
      setCouponKeepList(result)
    })
  }
  const handleChangeCoupon = (e: any) => {
    if (e.target.value) {
      setCouponCode(e.target.value)
      setCouponUsedBtn([false, true])
      setCheckKeepCoupon(true)
    } else {
      setCouponUsedBtn([false, false])
      setCheckKeepCoupon(false)
    }
  }

  const calculatePrice = (coupon: string) => {
    const couponInfo = { ...getCoupon }
    couponInfo.farmerPlotId = farmerPlotId
    couponInfo.cropName = farmerPlotSeleced?.plantName
    couponInfo.couponCode = coupon //couponCode;
    couponInfo.raiAmount =
      (farmerPlotSeleced.raiAmount && parseInt(farmerPlotSeleced.raiAmount)) || 0
    couponInfo.priceCustom =
      createNewTask.unitPriceStandard === 0 ? createNewTask.unitPrice.toString() : '0'
    CouponDataSource.calculateCoupon(couponInfo).then((res) => {
      const calCoupon =
        res.responseData.priceCouponDiscount > createNewTask.price
          ? createNewTask.price
          : res.responseData.priceCouponDiscount
      setDiscountResult(calCoupon)
    })
  }
  const checkCoupon = (section: number, e: any, order?: string) => {
    if (section === 1) {
      if (order === 'ยกเลิก') {
        setCouponCode('')
        setCouponUsedBtn([false, true])
        form.setFieldsValue({ couponCode: '' })
        setCouponMessage('')
        setCheckKeepCoupon(false)
        setDiscountResult(0)
      } else {
        CouponDataSource.getCoupon(couponCode).then((result) => {
          if (!result.userMessage) {
            if (result.canUsed) {
              setCouponId(result.id)
              setColorCouponBtn(true)
              setCouponUsedBtn([false, false])
              setCouponMessage('รหัสคูปองสามารถใช้ได้')
              calculatePrice(couponCode)
            } else {
              setColorCouponBtn(false)
              setCouponUsedBtn([false, false])
              setCouponMessage('รหัสคูปองสามารถนี้ถูกใช้ไปแล้ว')
            }
          } else {
            setColorCouponBtn(false)
            setCouponUsedBtn([false, false])
            setCouponMessage(result.userMessage)
          }
        })
      }
    } else {
      if (e) {
        const mapCoupon = couponKeepList?.find((x) => x.promotion.id === e)
        setCouponKeep(mapCoupon)
        setCouponId(mapCoupon?.promotion?.id || '')
        setCouponCode(mapCoupon?.promotion.couponCode || '')
        setColorCouponBtn(true)
        setCouponUsedBtn([true, true])
        calculatePrice(mapCoupon?.promotion?.couponCode || '')
      } else {
        setCouponId('')
        setCouponCode('')
        calculatePrice('')
        setColorCouponBtn(false)
        setCouponUsedBtn([false, true])
      }
    }
  }

  return (
    <>
      <div className='containerConfirm'>
        <div className='left-column'>
          <div className='d-flex div1'>
            <div className='col'>
              <Card
                title='ข้อมูลเกษตรกร'
                bordered={true}
                style={{ marginRight: 8, height: renderValues() ? '370px' : '340px' }}
              >
                <div className='d-flex'>
                  <span className='col'>ชื่อเกษตรกร</span>
                  <span className='col'>เบอร์โทร</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>
                    {dataSearchFarmer?.firstname || '-'} {dataSearchFarmer?.lastname || '-'}
                  </span>
                  <span className='col'>{dataSearchFarmer?.telephoneNo}</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>แปลง</span>
                  <span className='col'>พื้นที่แปลงเกษตร</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>
                    {dataSearchFarmer?.farmerPlot[0].plotName}
                    <u
                      onClick={() => setShowModalMap((prev) => !prev)}
                      style={{ cursor: 'pointer', color: color.Success, marginLeft: 10 }}
                    >
                      ดูแผนที่
                    </u>
                  </span>
                  <span className='col'>
                    {(!farmerPlotSeleced?.plotArea.subdistrictName
                      ? ''
                      : farmerPlotSeleced?.plotArea.subdistrictName + '/') +
                      (!farmerPlotSeleced?.plotArea.districtName
                        ? ''
                        : farmerPlotSeleced?.plotArea.districtName + '/') +
                      (!farmerPlotSeleced?.plotArea.provinceName
                        ? ''
                        : farmerPlotSeleced?.plotArea.provinceName)}
                  </span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>จุุดสังเกต</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>{farmerPlotSeleced?.landmark || '-'}</span>
                </div>
              </Card>
            </div>
            <div className='col'>
              <Card
                title='ข้อมูลการจ้างงาน'
                bordered={true}
                style={{ marginRight: 8, height: renderValues() ? '370px' : '340px' }}
              >
                <div className='d-flex'>
                  <span className='col'>วันที่นัดหมาย</span>
                  <span className='col'>พืชที่ปลูก</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>{dataAppointment}</span>
                  <span className='col'>{dataSearchFarmer?.farmerPlot[0].plantName}</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>จำนวนไร่</span>
                  <span className='col'>เป้าหมาย</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>{createNewTask?.farmAreaAmount}</span>
                  <span className='col'>{renderValues()}</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>ช่วงเวลา</span>
                  <span className='col'>การเตรียมยา</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>{createNewTask?.purposeSprayName}</span>
                  <span className='col'>{createNewTask?.preparationBy}</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>หมายเหตุ</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>{createNewTask?.comment || '-'}</span>
                </div>{' '}
              </Card>
            </div>
          </div>
          <div className='div2'>
            <CustomTable
              showHeader={false}
              style={{ marginRight: 10 }}
              columns={columns}
              dataSource={isEdit ? dronerSelected : currentData}
              pagination={false}
              title={() => <strong style={{ fontSize: 16 }}>รายชื่อนักบินโดรน</strong>}
            />
            <div className='pagination-container'>
              <div className='left-content'>
                <p>รายการทั้งหมด {total} รายการ</p>
              </div>
              <div className='right-content p-3'>
                <Pagination
                  className='pt-3'
                  current={currentPage}
                  pageSize={pageSize}
                  total={total}
                  onChange={handlePaginationChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='right-column'>
          <div className='div3' style={{ fontWeight: '500', color: color.font }}>
            <CardHeader textHeader={'สรุปค่าบริการ'} />
            <Form form={form}>
              <div
                style={{
                  width: '100%',
                }}
                className='bg-white'
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div className='p-4'>
                    <div className='d-flex'>
                      <span className='col'>ค่าบริการ</span>
                      <span className='col' style={{ textAlign: 'end' }}>
                        {isEdit
                          ? numberWithCommasToFixed(couponData?.netPrice)
                          : numberWithCommasToFixed(createNewTask?.price - (discountResult ?? 0))}
                        ฿
                      </span>
                    </div>
                    <div className='d-flex pt-2'>
                      <span className='col' style={{ fontWeight: 'lighter', fontSize: 13 }}>
                        (จำนวนไร่{' '}
                        <span style={{ color: color.Success }}>
                          {formatNumberWithCommas(parseFloat(createNewTask?.farmAreaAmount))} ไร่
                        </span>{' '}
                        x ค่าบริการ{' '}
                        <span style={{ color: color.Success }}>
                          {createNewTask?.unitPriceStandard !== 0
                            ? formatNumberWithCommas(createNewTask?.unitPriceStandard)
                            : formatNumberWithCommas(parseInt(createNewTask?.unitPrice))}{' '}
                          บาท/ไร่
                        </span>
                        )
                      </span>
                    </div>
                    <div className='d-flex pt-4'>
                      <span className='col'>ค่าธรรมเนียม (5%)</span>
                      <span className='col' style={{ textAlign: 'end' }}>
                        {isEdit
                          ? numberWithCommasToFixed(couponData?.fee)
                          : numberWithCommasToFixed(createNewTask?.fee)}{' '}
                        ฿{' '}
                      </span>
                    </div>
                    <div className='d-flex pt-2'>
                      <span className='col'>ส่วนลดค่าธรรมเนียม</span>
                      <span className='col' style={{ textAlign: 'end', color: color.Error }}>
                        -{' '}
                        {isEdit
                          ? numberWithCommasToFixed(couponData?.discountFee)
                          : numberWithCommasToFixed(createNewTask?.discountFee)}{' '}
                        ฿
                      </span>
                    </div>
                    <Divider />
                    <div className='d-flex'>
                      <span className='col'>คูปองส่วนลด</span>
                    </div>
                    <div className='pt-2'>
                      <Form.Item
                        name='couponCode'
                        style={{
                          marginBottom: '2px',
                        }}
                      >
                        <Input
                          disabled={couponUsedBtn[0] || isEdit}
                          onChange={handleChangeCoupon}
                          onKeyPress={(e) => {
                            const allowedCharacters = /^[a-zA-Z0-9]+$/
                            if (!allowedCharacters.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                          style={{
                            paddingRight: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                          defaultValue={
                            isEdit ? createNewTask?.couponCode : couponUsedBtn ? couponCode : ''
                          }
                          placeholder='กรอกรหัสคูปอง'
                          suffix={
                            <Button
                              disabled={couponUsedBtn[0] || isEdit}
                              style={
                                !couponUsedBtn[0] && !couponUsedBtn[1]
                                  ? {
                                      borderColor: color.Error,
                                      backgroundColor: '#FAEEEE',
                                      color: color.Error, //ยกเลิก
                                    }
                                  : {
                                      borderColor: color.Success,
                                      backgroundColor: '#E6F2EC',
                                      color: color.Success, //ใช้รหัส
                                    }
                              }
                              onClick={(e) =>
                                checkCoupon(1, e, couponUsedBtn[1] ? 'ใช้รหัส' : 'ยกเลิก')
                              }
                            >
                              {couponUsedBtn[1] ? 'ใช้รหัส' : 'ยกเลิก'}
                            </Button>
                          }
                        />
                      </Form.Item>
                    </div>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        color: colorCouponBtn ? color.Success : color.Error,
                      }}
                    >
                      {couponMessage}
                    </p>
                    <div className='d-flex pt-4'>
                      <span className='col'>หรือเลือกคูปอง (เกษตรกรเก็บไว้ในระบบ)</span>
                    </div>
                    <div className='d-flex pt-2'>
                      <Select
                        disabled={checkKeepCoupon || isEdit}
                        placeholder='เลือกคูปอง'
                        style={{
                          width: '100%',
                        }}
                        onChange={(e) => checkCoupon(2, e)}
                        allowClear
                        defaultValue={
                          isEdit ? couponData.couponName : checkKeepCoupon ? couponId : null
                        }
                      >
                        {couponKeepList?.map((item) => (
                          <Option key={item.promotion.id} value={item.promotion.id}>
                            <div>
                              {item.promotion.couponName}
                              <br />
                              <Row>
                                <Col style={{ fontSize: '12px' }} span={13}>
                                  {item.promotion.couponConditionRai
                                    ? mapWordingCondition(item)
                                    : '-'}
                                </Col>
                                <Col
                                  style={{
                                    fontSize: '12px',
                                    alignItems: 'end',
                                  }}
                                >
                                  หมดเขต{' '}
                                  {DateTimeUtil.formatDateTh(
                                    item?.promotion?.expiredDate?.toString() || '',
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className='d-flex pt-4'>
                      <span className='col '>ส่วนลดจากคูปอง</span>
                      <span className='col' style={{ textAlign: 'end', color: color.Error }}>
                        {isEdit
                          ? numberWithCommasToFixed(couponData.priceCouponDiscount!)
                            ? `- ${numberWithCommasToFixed(couponData.priceCouponDiscount!)}`
                            : 0
                          : numberWithCommas(discountResult!)
                          ? `- ${numberWithCommas(discountResult!)}`
                          : 0}{' '}
                        ฿
                      </span>
                    </div>
                    <Divider />
                    <div className='d-flex'></div>
                    <div className='d-flex pt-2'>
                      <span className='col '>ส่วนลดจากแต้ม</span>
                      <span className='col' style={{ textAlign: 'end', color: color.Error }}>
                        {createNewTask?.discountCampaignPoint > 0
                          ? '- ' + numberWithCommas(createNewTask?.discountCampaignPoint)
                          : 0}{' '}
                        ฿
                      </span>
                    </div>
                  </div>
                  <Divider
                    style={{
                      border: 'none',
                      height: '1.5px',
                      backgroundColor: color.Success,
                      margin: '10px 0',
                      width: '100%',
                    }}
                  />
                  <div className='p-4'>
                    <div className='d-flex'>
                      <span className='col-lg-7' style={{ fontWeight: 'lighter' }}>
                        ยอดรวมค่าบริการ (เกษตรกร)
                      </span>
                      <span className='col' style={{ textAlign: 'end', color: color.Success }}>
                        {isEdit
                          ? numberWithCommasToFixed(couponData?.netPrice)
                          : numberWithCommasToFixed(
                              createNewTask?.price - (discountResult ?? 0),
                            )}{' '}
                        ฿
                      </span>
                    </div>
                    <div className='d-flex pt-2'>
                      <span className='col' style={{ fontWeight: 'lighter' }}>
                        ยอดรวมรายได้ (นักบินโดรน)
                      </span>
                      <span className='col' style={{ textAlign: 'end', color: color.Warning }}>
                        {isEdit
                          ? numberWithCommasToFixed(
                              parseInt(createNewTask?.price) +
                                parseInt(createNewTask?.revenuePromotion),
                            )
                          : numberWithCommasToFixed(parseInt(createNewTask?.price)) || 0}{' '}
                        ฿
                      </span>
                    </div>
                    <div className='pt-3 d-flex justify-content-between'>
                      <BackButton onClick={() => setCurrent((prev) => prev - 1)} />
                      <SaveButtton
                        onClick={async () => {
                          const payload: any = {}
                          payload.couponId = couponId
                          payload.dataCouponKeep = dataCouponKeep
                          payload.discountResult = discountResult
                          payload.couponCode = couponCode
                          updateNewTask(payload)
                        }}
                        title='บันทึกงาน'
                        size={'220px'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
            {showModalMap && (
              <ModalMapPlot
                show={showModalMap}
                backButton={() => setShowModalMap((prev) => !prev)}
                title='แผนที่แปลงเกษตร'
                plotId={createNewTask?.farmerPlotId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
