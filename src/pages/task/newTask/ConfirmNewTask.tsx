import React, { useState } from 'react'
import { Card, Table, Divider, Input, Button, Select, Row, Col, Avatar } from 'antd'
import { CardHeader } from '../../../components/header/CardHearder'
import styled from 'styled-components'
import color from '../../../resource/color'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { CouponKeepByFarmer } from '../../../entities/CouponEntites'
import { FarmerEntity } from '../../../entities/FarmerEntities'
import { FarmerPlotEntity } from '../../../entities/FarmerPlotEntities'
import moment from 'moment'
import { CreateNewTaskEntity } from '../../../entities/NewTaskEntities'
import {
  formatNumberWithCommas,
  numberWithCommas,
  numberWithCommasToFixed,
} from '../../../utilities/TextFormatter'

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
  createNewTask: CreateNewTaskEntity
  discountResult: any
  dataAppointment: any
}

const ConfirmNewTask: React.FC<ConfirmNewTaskProps> = ({
  dataSearchFarmer,
  farmerPlotSeleced,
  dataAppointment,
  createNewTask,
  discountResult,
}) => {
  const [couponUsedBtn, setCouponUsedBtn] = useState<boolean[]>([false, true])
  const [couponCode, setCouponCode] = useState<string>('')
  const [checkKeepCoupon, setCheckKeepCoupon] = useState<boolean>(false)
  const [couponId, setCouponId] = useState<string>('')
  const [couponKeepList, setCouponKeepList] = useState<CouponKeepByFarmer[]>()
  const { Option } = Select

  console.log(createNewTask)
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
  const pageSize = 5
  const currentPage = 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentItems = createNewTask?.taskDronerTemp?.slice(startIndex, endIndex)

  return (
    <>
      <div className='containerConfirm'>
        <div className='left-column'>
          <div className='d-flex div1'>
            <div className='col'>
              <Card
                title='ข้อมูลเกษตรกร'
                bordered={true}
                style={{ marginRight: 8, height: '340px' }}
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
                  <span className='col'>{dataSearchFarmer?.farmerPlot[0].plotName}</span>
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
                style={{ marginRight: 8, height: '340px' }}
              >
                <div className='d-flex'>
                  <span className='col'>วันที่นัดหมาย</span>
                  <span className='col'>ประเภทงาน</span>
                  <span className='col'>พืชที่ปลูก</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>{dataAppointment}</span>
                  <span className='col'>ฉีด</span>
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
              dataSource={currentItems}
              title={() => <strong style={{ fontSize: 16 }}>รายชื่อนักบินโดรน</strong>}
            />
            <p>รายการทั้งหมด {createNewTask?.taskDronerTemp?.length} รายการ</p>
          </div>
        </div>
        <div className='right-column'>
          <div className='div3' style={{ fontWeight: '500', color: color.font }}>
            <CardHeader textHeader={'สรุปค่าบริการ'} />
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
                      {numberWithCommasToFixed(createNewTask?.price - (discountResult ?? 0))} ฿
                    </span>
                  </div>
                  <div className='d-flex pt-2'>
                    <span className='col' style={{ fontWeight: 'lighter' }}>
                      (จำนวนไร่{' '}
                      <span style={{ color: color.Success }}>
                        {formatNumberWithCommas(parseFloat(createNewTask?.farmAreaAmount))} ไร่
                      </span>{' '}
                      x ค่าบริการ{' '}
                      <span style={{ color: color.Success }}>
                        {formatNumberWithCommas(createNewTask?.unitPriceStandard)} บาท/ไร่
                      </span>
                      )
                    </span>
                  </div>
                  <div className='d-flex pt-4'>
                    <span className='col'>ค่าธรรมเนียม (5%)</span>
                    <span className='col' style={{ textAlign: 'end' }}>
                      {numberWithCommasToFixed(createNewTask?.fee)} ฿
                    </span>
                  </div>
                  <div className='d-flex pt-2'>
                    <span className='col'>ส่วนลดค่าธรรมเนียม</span>
                    <span className='col' style={{ textAlign: 'end', color: color.Error }}>
                      - {numberWithCommasToFixed(createNewTask?.discountFee)} ฿
                    </span>
                  </div>
                  <Divider />
                  <div className='d-flex'>
                    <span className='col'>คูปองส่วนลด</span>
                  </div>
                  <div className='d-flex pt-2'>
                    <Input
                      disabled={couponUsedBtn[0]}
                      // onChange={handleChangeCoupon}
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
                        borderRadius: 3,
                      }}
                      defaultValue={couponUsedBtn ? couponCode : ''}
                      placeholder='กรอกรหัสคูปอง'
                      suffix={
                        <Button
                          disabled={couponUsedBtn[0]}
                          style={
                            !couponUsedBtn[0] && !couponUsedBtn[1]
                              ? {
                                  borderColor: color.Error,
                                  backgroundColor: '#FAEEEE',
                                  color: color.Error, //ยกเลิก
                                  borderRadius: 3,
                                }
                              : {
                                  borderColor: color.Success,
                                  backgroundColor: '#E6F2EC',
                                  color: color.Success, //ใช้รหัส
                                  borderRadius: 3,
                                }
                          }
                          // onClick={(e) => checkCoupon(1, e, couponUsedBtn[1] ? 'ใช้รหัส' : 'ยกเลิก')}
                        >
                          {couponUsedBtn[1] ? 'ใช้รหัส' : 'ยกเลิก'}
                        </Button>
                      }
                    />
                  </div>
                  <div className='d-flex pt-4'>
                    <span className='col'>หรือเลือกคูปอง (เกษตรกรเก็บไว้ในระบบ)</span>
                  </div>
                  <div className='d-flex pt-2'>
                    <Select
                      disabled={checkKeepCoupon}
                      placeholder='เลือกคูปอง'
                      style={{
                        width: '100%',
                      }}
                      //   onChange={(e) => checkCoupon(2, e)}
                      allowClear
                      defaultValue={checkKeepCoupon ? couponId : null}
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
                      - {numberWithCommas(discountResult!)}
                    </span>
                  </div>
                  <Divider />
                  <div className='d-flex'>
                    <span className='col '>ส่วนลดจากโปรโมชั่น</span>
                    <span className='col' style={{ textAlign: 'end', color: color.Error }}>
                      0.00 ฿
                    </span>
                  </div>
                  <div className='d-flex pt-2'>
                    <span className='col '>ส่วนลดจากแต้ม</span>
                    <span className='col' style={{ textAlign: 'end', color: color.Error }}>
                      0.00 ฿
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
                    <span className='col-lg-8' style={{ fontWeight: 'lighter' }}>
                      ยอดรวมค่าบริการ (เกษตรกร)
                    </span>
                    <span className='col' style={{ textAlign: 'end', color: color.Success }}>
                      1,000.00 ฿
                    </span>
                  </div>
                  <div className='d-flex pt-2'>
                    <span className='col' style={{ fontWeight: 'lighter' }}>
                      ยอดรวมรายได้ (นักบินโดรน)
                    </span>
                    <span className='col' style={{ textAlign: 'end', color: color.Warning }}>
                      {numberWithCommasToFixed(createNewTask?.price || 0)} ฿
                    </span>
                  </div>
                  <div className='pt-3'>
                    <Button
                      style={{
                        color: color.White,
                        backgroundColor: color.Success,
                        borderRadius: 5,
                        borderColor: color.Success,
                        width: '100%',
                        height: '40px',
                        fontSize: 16,
                        fontWeight: '500',
                      }}
                    >
                      ยืนยันการเพิ่มงาน
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmNewTask
