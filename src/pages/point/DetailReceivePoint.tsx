import { InfoCircleFilled } from '@ant-design/icons'
import { Badge, Col, Divider, Form, Popover, Row, Table } from 'antd'
import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useNavigate } from 'react-router-dom'
import { BackIconButton } from '../../components/button/BackButton'
import { CardContainer } from '../../components/card/CardContainer'
import { CardHeader } from '../../components/header/CardHearder'
import { color } from '../../resource'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { numberWithCommasToFixed } from '../../utilities/TextFormatter'

const _ = require('lodash')
const queryString = _.split(window.location.pathname, '=')

const DetailDronerPoint = () => {
  const navigate = useNavigate()

  const dataMock = {
    key: 1,
    dateTime: Date(),
    transectionId: 'P00000001',
    taskId: 'TK00000001',
    type: 'การจ้างงาน',
    status: 'ได้รับคะแนนสำเร็จ',
    description: [
      {
        source: 'Farmer',
        farmerId: 'f1',
        farmerName: 'รชยา ช่างภักดี',
        telephone: '0938355808',
        point: 100,
      },
      {
        source: 'Droner',
        dronerId: 'd1',
        dronerName: 'รชยา ทำงานวันหยุด',
        telephone: '0938355808',
        point: 200,
      },
    ],
  }
  const dataTaskMock = {
    taskId: 'TK20230501TH-0000002',
    dateTime: Date(),
    farmerName: 'รชยา ช่างภักดี',
    plot: 'สำโรงเหนือ/เมืองสมุทรปราการ/สมุทรปราการ',
    raiAmount: 20,
    unitPrice: 60,
    totalPrice: 1200,
  }
  const dataHistory = [
    {
      dateTime: Date(),
      remark: '-',
      status: 'รอรับคะแนน',
      updateBy: 'รชยา ก้าวแปดเมตร',
    },
    {
      dateTime: Date(),
      remark: 'ได้รับคะแนนจากเกษตรกรรีวิวงานสำเร็จ',
      status: 'ได้รับคะแนนสำเร็จ',
      updateBy: 'รชยา ก้าวแปดเมตร',
    },
  ]

  const renderDetailRecipient = () => {
    const checkFarmer: any = dataMock.description.filter((x: any) => x.source === 'Farmer')
    const checkDroner: any = dataMock.description.filter((x: any) => x.source === 'Droner')
    return (
      <Row justify={'space-between'} gutter={16}>
        {checkFarmer.length > 0 && (
          <Col span={checkDroner.length !== 0 ? 12 : 24}>
            <CardContainer>
              <CardHeader textHeader='ข้อมูลเกษตรกร' />
              <Form style={{ padding: '20px' }}>
                <Row>
                  <Col span={9}>
                    <div>ชื่อเกษตรกร</div>
                    <u style={{ color: '#219653' }}>{checkFarmer[0].farmerName}</u>
                  </Col>
                  <Col span={8}>
                    <div>เบอร์โทร</div>
                    <div>{checkFarmer[0].telephone}</div>
                  </Col>
                  <Col span={7}>
                    <div>คะแนนที่จะได้รับ</div>
                    <div>+ {checkFarmer[0].point}</div>
                  </Col>
                </Row>
              </Form>
            </CardContainer>
          </Col>
        )}
        {checkDroner.length > 0 && (
          <Col span={checkFarmer.length !== 0 ? 12 : 24}>
            <CardContainer>
              <CardHeader textHeader='ข้อมูลนักบินโดรน' />
              <Form style={{ padding: '20px' }}>
                <Row>
                  <Col span={9}>
                    <div>ชื่อนักบินโดรน</div>
                    <u style={{ color: '#EA973E' }}>{checkDroner[0].dronerName}</u>
                  </Col>
                  <Col span={8}>
                    <div>เบอร์โทร</div>
                    <div>{checkDroner[0].telephone}</div>
                  </Col>
                  <Col span={7}>
                    <div>คะแนนที่จะได้รับ</div>
                    <div>+ {checkDroner[0].point}</div>
                  </Col>
                </Row>
              </Form>
            </CardContainer>
          </Col>
        )}
      </Row>
    )
  }
  const renderDetailTask = () => {
    return (
      <CardContainer>
        <CardHeader textHeader='ข้อมูลที่เกี่ยวข้อง' />
        <Form style={{ padding: '20px' }}>
          <Container
            style={{
              backgroundColor:
                dataMock.type === 'การจ้างงาน'
                  ? 'rgba(86, 167, 104, 0.1)'
                  : 'rgba(235, 87, 87, 0.1)',
            }}
            className='p-3'
          >
            <div>
              <b
                style={{
                  color: dataMock.type === 'การจ้างงาน' ? '#219653' : color.Error,
                }}
              >
                งานจ้างที่เกี่ยวข้อง
              </b>
            </div>
            <Row>
              <Col span={3}>
                <div>รหัสงาน</div>
                <div style={{ color: '#219653' }}>
                  <u>{dataTaskMock.taskId}</u>
                </div>
              </Col>
              <Col span={4}>
                <div>วัน/เวลานัดหมาย</div>
                <div>{DateTimeUtil.formatDateTime(dataTaskMock.dateTime)}</div>
              </Col>
              <Col span={4}>
                <div>ชื่อเกษตรกร</div>
                <div>{dataTaskMock.farmerName}</div>
              </Col>
              <Col span={5}>
                <div>พื้นที่แปลงเกษตร</div>
                <div>{dataTaskMock.plot}</div>
              </Col>
              <Col span={2}>
                <div>จำนวนไร่</div>
                <div>{dataTaskMock.raiAmount} ไร่</div>
              </Col>
              <Col span={3}>
                <div>ค่าบริการ/ไร่</div>
                <div>{dataTaskMock.unitPrice} บาท</div>
              </Col>
              <Col span={3}>
                <div>ยอดรวมค่าบริการ</div>
                <Row>
                  <div>{dataTaskMock.totalPrice} บาท</div>
                  <span>
                    <Popover
                      title={
                        <span
                          style={{
                            color: color.White,
                          }}
                        >
                          รายละเอียดค่าบริการ
                        </span>
                      }
                      content={
                        <table style={{ width: '300px' }}>
                          <tr>
                            <td>
                              ค่าบริการ
                              <br />
                              <div style={{ fontSize: '12px' }}>
                                จำนวนไร่{' '}
                                <span style={{ color: color.Success }}>
                                  {dataTaskMock.raiAmount} ไร่
                                </span>{' '}
                                x ค่าบริการ{' '}
                                <span style={{ color: color.Success }}>
                                  {dataTaskMock.unitPrice} ไร่
                                </span>
                              </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {numberWithCommasToFixed(parseFloat('50'))}
                            </td>
                          </tr>
                          <tr>
                            <td>ค่าธรรมเนียม (5%)</td>
                            <td style={{ textAlign: 'right' }}>
                              {numberWithCommasToFixed(parseFloat('50'))}
                            </td>
                          </tr>
                          <tr>
                            <td>ส่วนลดค่าธรรมเนียม</td>
                            <td style={{ color: color.Error, textAlign: 'right' }}>
                              {'- ' + numberWithCommasToFixed(parseFloat('0'))}
                            </td>
                          </tr>
                          <tr>
                            <td>ส่วนลดจากคูปอง</td>
                            <td style={{ color: color.Error, textAlign: 'right' }}>
                              {'- ' + numberWithCommasToFixed(parseFloat('0'))}
                            </td>
                          </tr>
                          <tr>
                            <td>ส่วนลดจากโปรโมชั่น</td>
                            <td style={{ color: color.Error, textAlign: 'right' }}>
                              {'- ' + numberWithCommasToFixed(parseFloat('0'))}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <Divider />
                            </td>
                          </tr>
                          <tr>
                            <td>ยอดรวมค่าบริการ</td>
                            <td
                              style={{
                                textAlign: 'right',
                                color: color.Success,
                                fontWeight: 'bold',
                              }}
                            >
                              {numberWithCommasToFixed(
                                parseFloat(dataTaskMock.totalPrice.toString()),
                              )}
                            </td>
                          </tr>
                        </table>
                      }
                    >
                      <InfoCircleFilled
                        style={{
                          color: color.primary1,
                          fontSize: '15px',
                          marginLeft: '7px',
                          verticalAlign: 0.5,
                        }}
                      />
                    </Popover>
                  </span>
                </Row>
              </Col>
            </Row>
          </Container>
        </Form>
      </CardContainer>
    )
  }
  const renderHistory = () => {
    const columns = [
      {
        title: 'วันที่อัปเดต',
        dataIndex: 'dateTime',
        key: 'dateTime',
        render: (value: any, row: any, index: number) => {
          return {
            children: <span>{row.dateTime && DateTimeUtil.formatDateTime(row.dateTime)}</span>,
          }
        },
      },
      {
        title: 'ข้อความแจ้งเตือนหรือหมายเหตุ',
        dataIndex: 'remark',
        key: 'remark',
        render: (value: any, row: any, index: number) => {
          return {
            children: <span>{row.remark}</span>,
          }
        },
      },
      {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <span
                style={{
                  color: row.status === 'รอรับคะแนน' ? color.Grey : color.Success,
                }}
              >
                <Badge color={row.status === 'รอรับคะแนน' ? color.Grey : color.Success} />{' '}
                {row.status}
              </span>
            ),
          }
        },
      },
      {
        title: 'ผู้ใช้งานที่อัปเดต',
        dataIndex: 'updateBy',
        key: 'updateBy',
        render: (value: any, row: any, index: number) => {
          return {
            children: <span>{row.updateBy}</span>,
          }
        },
      },
    ]
    return (
      <CardContainer>
        <CardHeader textHeader='ประวัติคะแนน' />
        <Form style={{ padding: '20px' }}>
          <Table
            dataSource={dataHistory}
            columns={columns}
            pagination={false}
            size='large'
            tableLayout='fixed'
          />
        </Form>
      </CardContainer>
    )
  }

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>รายละเอียดคะแนน</strong>
        </span>
      </Row>
      {renderDetailRecipient()}
      <br />
      {renderDetailTask()}
      <br />
      {renderHistory()}
    </>
  )
}

export default DetailDronerPoint
