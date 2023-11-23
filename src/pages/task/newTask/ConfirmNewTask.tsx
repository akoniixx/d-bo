import React, { useState } from 'react'
import { Card, Table, Divider, Input, Button, Select, Row, Col } from 'antd'
import { CardHeader } from '../../../components/header/CardHearder'
import styled from 'styled-components'
import color from '../../../resource/color'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { CouponKeepByFarmer } from '../../../entities/CouponEntites'

const CustomTable = styled(Table)`
  .ant-table-container table thead th {
    background-color: rgb(255, 255, 255) !important;
  }
  .ant-table-title {
    border-bottom: 0.1px solid ${color.Disable};
  }
`
interface ConfirmNewTaskProps {
  dataSearchFarmer?: any
  dataAppointment?: any
  dataDronerSelectedList?: any
  dataServiceCharge?: any
}

const ConfirmNewTask: React.FC<ConfirmNewTaskProps> = ({
  dataSearchFarmer,
  dataAppointment,
  dataDronerSelectedList,
  dataServiceCharge,
}) => {
  const [couponUsedBtn, setCouponUsedBtn] = useState<boolean[]>([false, true])
  const [couponCode, setCouponCode] = useState<string>('')
  const [checkKeepCoupon, setCheckKeepCoupon] = useState<boolean>(false)
  const [couponId, setCouponId] = useState<string>('')
  const [couponKeepList, setCouponKeepList] = useState<CouponKeepByFarmer[]>()
  const { Option } = Select

  const data = [
    { index: 1, name: 'สายไหม', tel: '0989284761', address: 'saraburi', droneBrand: 'DJI' },
    { index: 2, name: 'สายไหม', tel: '0989284761', address: 'saraburi', droneBrand: 'DJI' },
    { index: 3, name: 'สายไหม', tel: '0989284761', address: 'saraburi', droneBrand: 'DJI' },
  ]
  const columns = [
    {
      dataIndex: 'index',
      key: 'index',
    },
    {
      dataIndex: 'name',
      key: 'name',
    },
    {
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      dataIndex: 'address',
      key: 'address',
    },
    {
      dataIndex: 'droneBrand',
      key: 'droneBrand',
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

  return (
    <>
    <div className='containerConfirm'>
      <div className='div1'>
        <Card title='ข้อมูลเกษตรกร' bordered={true} style={{ marginRight: 8, height: '340px' }}>
          <div className='d-flex'>
            <span className='col'>ชื่อเกษตรกร</span>
            <span className='col'>เบอร์โทร</span>
          </div>
          <div className='d-flex'>
            <span className='col'>มีนา</span>
            <span className='col'>098-98877665</span>
          </div>
          <div className='d-flex pt-4'>
            <span className='col'>แปลง</span>
            <span className='col'>พื้นที่แปลงเกษตร</span>
          </div>
          <div className='d-flex'>
            <span className='col'>มีนามีแปลง</span>
            <span className='col'>สระบุรี</span>
          </div>
          <div className='d-flex pt-4'>
            <span className='col'>จุุดสังเกต</span>
          </div>
          <div className='d-flex'>
            <span className='col'>-</span>
          </div>
        </Card>
      </div>
      <div className='div2'>
        <Card title='ข้อมูลการจ้างงาน' bordered={true} style={{ marginRight: 8, height: '340px' }}>
          <div className='d-flex'>
            <span className='col'>วันที่นัดหมาย</span>
            <span className='col'>ประเภทงาน</span>
            <span className='col'>พืชที่ปลูก</span>
          </div>
          <div className='d-flex'>
            <span className='col'>-</span>
            <span className='col'>-</span>
            <span className='col'>-</span>
          </div>
          <div className='d-flex pt-4'>
            <span className='col'>จำนวนไร่</span>
            <span className='col'>เป้าหมาย</span>
          </div>
          <div className='d-flex'>
            <span className='col'>-</span>
            <span className='col'>-</span>
          </div>
          <div className='d-flex pt-4'>
            <span className='col'>ช่วงเวลา</span>
            <span className='col'>การเตรียมยา</span>
          </div>
          <div className='d-flex'>
            <span className='col'>-</span>
            <span className='col'>-</span>
          </div>
          <div className='d-flex pt-4'>
            <span className='col'>หมายเหตุ</span>
          </div>
          <div className='d-flex'>
            <span className='col'>-</span>
          </div>{' '}
        </Card>
      </div>
      <div className='div3'>
      <div className='col-lg-4'>
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
                  <span className='col'>1000 ฿</span>
                </div>
                <div className='d-flex pt-2'>
                  <span className='col'>(จำนวนไร่ 22 ไร่ x ค่าบริการ 50 บาท/ไร่)</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>ค่าธรรมเนียม (5%)</span>
                  <span className='col'>55.00 ฿</span>
                </div>
                <div className='d-flex'>
                  <span className='col'>ส่วนลดค่าธรรมเนียม</span>
                  <span className='col'>- 55.00 ฿</span>
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
                              {item.promotion.couponConditionRai ? mapWordingCondition(item) : '-'}
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
                  <span className='col'>- 100.00 ฿</span>
                </div>
                <Divider />
                <div className='d-flex'>
                  <span className='col '>ส่วนลดจากโปรโมชั่น</span>
                  <span className='col'>0.00 ฿</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col '>ส่วนลดจากแต้ม</span>
                  <span className='col'>0.00 ฿</span>
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
                  <span className='col'>ยอดรวมค่าบริการ (เกษตรกร)</span>
                  <span className='col'>1,000.00 ฿</span>
                </div>
                <div className='d-flex pt-4'>
                  <span className='col'>ยอดรวมรายได้ (นักบินโดรน)</span>
                  <span className='col'>1,100.00 ฿</span>
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
    
    // <div>
    //   <div className='d-flex pb-3 '>
    //     <div className='col-lg-4'>
    //       <Card title='ข้อมูลเกษตรกร' bordered={true} style={{ marginRight: 8, height: '340px' }}>
    //         <div className='d-flex'>
    //           <span className='col'>ชื่อเกษตรกร</span>
    //           <span className='col'>เบอร์โทร</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>มีนา</span>
    //           <span className='col'>098-98877665</span>
    //         </div>
    //         <div className='d-flex pt-4'>
    //           <span className='col'>แปลง</span>
    //           <span className='col'>พื้นที่แปลงเกษตร</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>มีนามีแปลง</span>
    //           <span className='col'>สระบุรี</span>
    //         </div>
    //         <div className='d-flex pt-4'>
    //           <span className='col'>จุุดสังเกต</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>-</span>
    //         </div>
    //       </Card>
    //     </div>
    //     <div className='col-lg-4'>
    //       <Card
    //         title='ข้อมูลการจ้างงาน'
    //         bordered={true}
    //         style={{ marginRight: 8, height: '340px' }}
    //       >
    //         <div className='d-flex'>
    //           <span className='col'>วันที่นัดหมาย</span>
    //           <span className='col'>ประเภทงาน</span>
    //           <span className='col'>พืชที่ปลูก</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>-</span>
    //           <span className='col'>-</span>
    //           <span className='col'>-</span>
    //         </div>
    //         <div className='d-flex pt-4'>
    //           <span className='col'>จำนวนไร่</span>
    //           <span className='col'>เป้าหมาย</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>-</span>
    //           <span className='col'>-</span>
    //         </div>
    //         <div className='d-flex pt-4'>
    //           <span className='col'>ช่วงเวลา</span>
    //           <span className='col'>การเตรียมยา</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>-</span>
    //           <span className='col'>-</span>
    //         </div>
    //         <div className='d-flex pt-4'>
    //           <span className='col'>หมายเหตุ</span>
    //         </div>
    //         <div className='d-flex'>
    //           <span className='col'>-</span>
    //         </div>{' '}
    //       </Card>
    //     </div>
    //     <div className='col-lg-4'>
    //       <CardHeader textHeader={'สรุปค่าบริการ'} />
    //       <div
    //         style={{
    //           width: '100%',
    //         }}
    //         className='bg-white'
    //       >
    //         <div
    //           style={{
    //             width: '100%',
    //             height: '100%',
    //           }}
    //         >
    //           <div className='p-4'>
    //             <div className='d-flex'>
    //               <span className='col'>ค่าบริการ</span>
    //               <span className='col'>1000 ฿</span>
    //             </div>
    //             <div className='d-flex pt-2'>
    //               <span className='col'>(จำนวนไร่ 22 ไร่ x ค่าบริการ 50 บาท/ไร่)</span>
    //             </div>
    //             <div className='d-flex pt-4'>
    //               <span className='col'>ค่าธรรมเนียม (5%)</span>
    //               <span className='col'>55.00 ฿</span>
    //             </div>
    //             <div className='d-flex'>
    //               <span className='col'>ส่วนลดค่าธรรมเนียม</span>
    //               <span className='col'>- 55.00 ฿</span>
    //             </div>
    //             <Divider />
    //             <div className='d-flex'>
    //               <span className='col'>คูปองส่วนลด</span>
    //             </div>
    //             <div className='d-flex pt-2'>
    //               <Input
    //                 disabled={couponUsedBtn[0]}
    //                 // onChange={handleChangeCoupon}
    //                 onKeyPress={(e) => {
    //                   const allowedCharacters = /^[a-zA-Z0-9]+$/
    //                   if (!allowedCharacters.test(e.key)) {
    //                     e.preventDefault()
    //                   }
    //                 }}
    //                 style={{
    //                   paddingRight: 0,
    //                   paddingTop: 0,
    //                   paddingBottom: 0,
    //                   borderRadius: 3,
    //                 }}
    //                 defaultValue={couponUsedBtn ? couponCode : ''}
    //                 placeholder='กรอกรหัสคูปอง'
    //                 suffix={
    //                   <Button
    //                     disabled={couponUsedBtn[0]}
    //                     style={
    //                       !couponUsedBtn[0] && !couponUsedBtn[1]
    //                         ? {
    //                             borderColor: color.Error,
    //                             backgroundColor: '#FAEEEE',
    //                             color: color.Error, //ยกเลิก
    //                             borderRadius: 3,
    //                           }
    //                         : {
    //                             borderColor: color.Success,
    //                             backgroundColor: '#E6F2EC',
    //                             color: color.Success, //ใช้รหัส
    //                             borderRadius: 3,
    //                           }
    //                     }
    //                     // onClick={(e) => checkCoupon(1, e, couponUsedBtn[1] ? 'ใช้รหัส' : 'ยกเลิก')}
    //                   >
    //                     {couponUsedBtn[1] ? 'ใช้รหัส' : 'ยกเลิก'}
    //                   </Button>
    //                 }
    //               />
    //             </div>
    //             <div className='d-flex pt-4'>
    //               <span className='col'>หรือเลือกคูปอง (เกษตรกรเก็บไว้ในระบบ)</span>
    //             </div>
    //             <div className='d-flex pt-2'>
    //               <Select
    //                 disabled={checkKeepCoupon}
    //                 placeholder='เลือกคูปอง'
    //                 style={{
    //                   width: '100%',
    //                 }}
    //                 //   onChange={(e) => checkCoupon(2, e)}
    //                 allowClear
    //                 defaultValue={checkKeepCoupon ? couponId : null}
    //               >
    //                 {couponKeepList?.map((item) => (
    //                   <Option key={item.promotion.id} value={item.promotion.id}>
    //                     <div>
    //                       {item.promotion.couponName}
    //                       <br />
    //                       <Row>
    //                         <Col style={{ fontSize: '12px' }} span={13}>
    //                           {item.promotion.couponConditionRai ? mapWordingCondition(item) : '-'}
    //                         </Col>
    //                         <Col
    //                           style={{
    //                             fontSize: '12px',
    //                             alignItems: 'end',
    //                           }}
    //                         >
    //                           หมดเขต{' '}
    //                           {DateTimeUtil.formatDateTh(
    //                             item?.promotion?.expiredDate?.toString() || '',
    //                           )}
    //                         </Col>
    //                       </Row>
    //                     </div>
    //                   </Option>
    //                 ))}
    //               </Select>
    //             </div>
    //             <div className='d-flex pt-4'>
    //               <span className='col '>ส่วนลดจากคูปอง</span>
    //               <span className='col'>- 100.00 ฿</span>
    //             </div>
    //             <Divider />
    //             <div className='d-flex'>
    //               <span className='col '>ส่วนลดจากโปรโมชั่น</span>
    //               <span className='col'>0.00 ฿</span>
    //             </div>
    //             <div className='d-flex pt-4'>
    //               <span className='col '>ส่วนลดจากแต้ม</span>
    //               <span className='col'>0.00 ฿</span>
    //             </div>
    //           </div>
    //           <Divider
    //             style={{
    //               border: 'none',
    //               height: '1.5px',
    //               backgroundColor: color.Success,
    //               margin: '10px 0',
    //               width: '100%',
    //             }}
    //           />
    //           <div className='p-4'>
    //             <div className='d-flex'>
    //               <span className='col'>ยอดรวมค่าบริการ (เกษตรกร)</span>
    //               <span className='col'>1,000.00 ฿</span>
    //             </div>
    //             <div className='d-flex pt-4'>
    //               <span className='col'>ยอดรวมรายได้ (นักบินโดรน)</span>
    //               <span className='col'>1,100.00 ฿</span>
    //             </div>
    //             <div className='pt-3'>
    //               <Button
    //                 style={{
    //                   color: color.White,
    //                   backgroundColor: color.Success,
    //                   borderRadius: 5,
    //                   borderColor: color.Success,
    //                   width: '100%',
    //                   height: '40px',
    //                   fontSize: 16,
    //                   fontWeight: '500',
    //                 }}
    //               >
    //                 ยืนยันการเพิ่มงาน
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    //   <div className='d-flex pb-3'>
    //   <div className='col-lg-8'>
    //     <CustomTable
    //       showHeader={false}
    //       style={{ marginRight: 10 }}
    //       columns={columns}
    //       dataSource={data}
    //       title={() => <strong style={{ fontSize: 16 }}>รายชื่อนักบินโดรน</strong>}
    //     />
    //   </div>
    //   </div>
    // </div>
  )
}

export default ConfirmNewTask
