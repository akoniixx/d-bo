import { Badge, Col, Divider, Form, Input, Radio, Row, Select, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { BackIconButton } from '../../components/button/BackButton'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import { CardHeader } from '../../components/header/CardHearder'
import { DeliveryDataSource } from '../../datasource/DeliveryDatasource'
import { RedeemDatasource } from '../../datasource/RedeemDatasource'
import { DeliveryListEntity } from '../../entities/DeliveryEntities'
import {
  DetailRedeemDronerEntity,
  UpdateRedeemDronerEntity,
  UpdateRedeemDronerEntity_INIT,
} from '../../entities/RedeemEntities'
import { color } from '../../resource'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { numberWithCommas } from '../../utilities/TextFormatter'
import ShowNickName from '../../components/popover/ShowNickName'
const _ = require('lodash')

const NewTable = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(234, 151, 62, 0.1) !important;
    font-family: 'Prompt' !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`

const DetailDronerRedeem = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [form] = useForm()
  const [formRemark] = useForm()
  const queryString = _.split(window.location.pathname, '=')
  const navigate = useNavigate()
  const [statusShip, setStatusShip] = useState('')
  const [dataUpdate, setDataUpdate] = useState<UpdateRedeemDronerEntity>(
    UpdateRedeemDronerEntity_INIT,
  )
  const [delivery, setDelivery] = useState<DeliveryListEntity>()
  const [exchange, setExchange] = useState('')
  const [data, setData] = useState<DetailRedeemDronerEntity>()

  const [optionPhysical, setOptionPhysical] = useState<any[]>([
    { value: 'REQUEST', lable: 'คำร้องขอแลก', disable: false },
    { value: 'PREPARE', lable: 'เตรียมจัดส่ง', disable: false },
    { value: 'DONE', lable: 'ส่งแล้ว', disable: false },
    { value: 'CANCEL', lable: 'ยกเลิก', disable: false },
  ])
  const [optionDigital, setOptionDigital] = useState<any[]>([
    { value: 'REQUEST', lable: 'พร้อมใช้', disable: false },
    { value: 'USED', lable: 'ใช้แล้ว', disable: false },
    { value: 'CANCEL', lable: 'ยกเลิก', disable: false },
    { value: 'EXPIRED', lable: 'หมดอายุ', disable: false },
  ])

  const fetchDetail = () => {
    RedeemDatasource.getRedeemDronerById(queryString[1]).then((res) => {
      setExchange(res.mission !== null ? 'MISSION' : 'SCORE')
      setStatusShip(res.redeemDetail.redeemStatus)
      onCheckStatus(
        res.redeemDetail.redeemStatus,
        res.mission !== null ? 'MISSION' : 'SCORE',
        res.redeemDetail.rewardType,
      )
      form.setFieldsValue({
        shipCompany: res.redeemDetail.deliveryCompany,
        trackingId: res.redeemDetail.trackingNo,
      })
      formRemark.setFieldsValue({
        remark: res.redeemDetail.remark,
      })
      setData(res)
    })
  }

  const fetchDelivery = () => {
    DeliveryDataSource.getDelivery(true).then((res) => {
      setDelivery(res)
    })
  }

  useEffect(() => {
    fetchDetail()
    fetchDelivery()
  }, [])

  const columeHisPhysical = [
    {
      title: 'วันที่อัปเดต',
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.updateAt && DateTimeUtil.formatDateTime(row.updateAt)}</span>,
        }
      },
    },
    {
      title: 'บริษัทส่งของ',
      dataIndex: 'deliveryCompany',
      key: 'deliveryCompany',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.deliveryCompany || '-'}</span>,
        }
      },
    },
    {
      title: 'Tracking ID',
      dataIndex: 'trackingNo',
      key: 'trackingNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.trackingNo || '-'}</span>,
        }
      },
    },
    {
      title: 'รายละเอียดหรือหมายเหตุ',
      dataIndex: 'remark',
      key: 'remark',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.remark || '-'}</span>,
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      render: (value: any, row: any, index: number) => {
        const mapStatus: any = {
          REQUEST: 'คำร้องขอแลก',
          PREPARE: 'เตรียมจัดส่ง',
          DONE: 'ส่งแล้ว',
          CANCEL: 'ยกเลิก',
        }
        const mapColor: any = {
          REQUEST: '#FFCA37',
          PREPARE: '#EA973E',
          DONE: '#219653',
          CANCEL: color.Error,
        }
        return {
          children: (
            <>
              <span
                style={{
                  color: mapColor[row.status],
                }}
              >
                <Badge color={mapColor[row.status]} /> {mapStatus[row.status]}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'ผู้ใช้ที่อัปเดต',
      dataIndex: 'updateBy',
      key: 'updateBy',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.updateBy} {row.status !== 'REQUEST' ? '(ผู้ดูแลระบบ)' : '(นักบินโดรน)'}
            </span>
          ),
        }
      },
    },
  ]
  const columeHisDigital = [
    {
      title: 'วันที่อัปเดต',
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.updateAt && DateTimeUtil.formatDateTime(row.updateAt)}</span>,
        }
      },
    },
    {
      title: 'Redeem Code',
      dataIndex: 'Redeem Code',
      key: 'Redeem Code',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.redeemCode || '-'}</span>,
        }
      },
    },
    {
      title: 'Branch Code',
      dataIndex: 'branchName',
      key: 'branchName',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{(row.branchCode && row.branchCode + ' - ' + row.branchName) || '-'}</span>
          ),
        }
      },
    },
    {
      title: 'รายละเอียดหรือหมายเหตุ',
      dataIndex: 'remark',
      key: 'remark',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.remark || '-'}</span>,
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      render: (value: any, row: any, index: number) => {
        const mapStatus: any = {
          REQUEST: data?.redeemDetail.rewardType === 'PHYSICAL' ? 'คำร้องขอแลก' : 'พร้อมใช้',
          PREPARE: 'เตรียมจัดส่ง',
          DONE: 'ส่งแล้ว',
          CANCEL: 'ยกเลิก',
          USED: 'ใช้งาน',
          EXPIRED: 'หมดอายุ',
        }
        const mapColor: any = {
          REQUEST: data?.redeemDetail.rewardType === 'PHYSICAL' ? '#FFCA37' : '#EA973E',
          PREPARE: '#EA973E',
          DONE: '#219653',
          CANCEL: color.Error,
          USED: '#219653',
          EXPIRED: '#7B7B7B',
        }
        return {
          children: (
            <>
              <span
                style={{
                  color: mapColor[row.status],
                }}
              >
                <Badge color={mapColor[row.status]} /> {mapStatus[row.status]}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'ผู้ใช้ที่อัปเดต',
      dataIndex: 'updateBy',
      key: 'updateBy',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.updateBy}{' '}
              {row.status !== 'REQUEST' && row.status !== 'USED' ? '(ผู้ดูแลระบบ)' : '(นักบินโดรน)'}
            </span>
          ),
        }
      },
    },
  ]
  const onCheckStatus = (e: string, status?: string, type?: string) => {
    if (type === 'PHYSICAL') {
      if (status === 'SCORE') {
        const mapStatus = optionPhysical
        if (e === 'PREPARE') {
          mapStatus[0].disable = true
        } else if (e === 'DONE') {
          mapStatus[0].disable = true
          mapStatus[1].disable = true
          mapStatus[3].disable = true
        } else if (e === 'CANCEL') {
          mapStatus[0].disable = true
          mapStatus[1].disable = true
          mapStatus[2].disable = true
        }
        setOptionPhysical(mapStatus)
      } else {
        const mapStatus = optionPhysical
        if (e === 'PREPARE') {
          mapStatus[0].disable = true
        } else if (e === 'DONE') {
          mapStatus[0].disable = true
          mapStatus[1].disable = true
        }
        setOptionPhysical(mapStatus)
      }
    } else {
      if (status === 'SCORE') {
        const mapStatus = optionDigital
        if (e === 'REQUEST') {
          mapStatus[1].disable = true
          mapStatus[3].disable = true
        } else if (e === 'USED') {
          mapStatus[0].disable = true
          mapStatus[2].disable = true
          mapStatus[3].disable = true
        } else if (e === 'CANCEL') {
          mapStatus[0].disable = true
          mapStatus[1].disable = true
          mapStatus[3].disable = true
        } else {
          mapStatus[0].disable = true
          mapStatus[1].disable = true
          mapStatus[2].disable = true
        }
        setOptionDigital(mapStatus)
      } else {
        const mapStatus = optionDigital
        if (e === 'REQUEST') {
          mapStatus[1].disable = true
          mapStatus[2].disable = true
          mapStatus[3].disable = true
        } else if (e === 'USED') {
          mapStatus[0].disable = true
          mapStatus[2].disable = true
          mapStatus[3].disable = true
        } else {
          mapStatus[0].disable = true
          mapStatus[1].disable = true
          mapStatus[2].disable = true
        }
        setOptionDigital(mapStatus)
      }
    }
  }

  const onChangeStatusShip = (e: any) => {
    setStatusShip(e.target.value)
    form.setFieldsValue({
      shipCompany: null,
      trackingId: null,
    })
  }

  const checkDiscable = () => {
    if (data?.redeemDetail?.rewardType === 'PHYSICAL') {
      return statusShip !== 'REQUEST' ? false : true
    } else {
      return statusShip === 'CANCEL' ? false : true
    }
  }

  const submit = async () => {
    await form.validateFields()
    const update = { ...dataUpdate }
    const getFrom = form.getFieldsValue()
    update.dronerTransactionId = data?.id
    update.remark = formRemark.getFieldsValue().remark
    update.status = statusShip
    update.deliveryCompany = getFrom.shipCompany
    update.trackingNo = getFrom.trackingId
    update.updateBy = profile.firstname + ' ' + profile.lastname
    setDataUpdate(update)
    RedeemDatasource.updateStatusRedeem(update).then((res) => {
      if (res.id) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          fetchDetail()
        })
      } else {
        Swal.fire({
          title: 'ไม่สามารถบันทึกได้',
          icon: 'error',
          showConfirmButton: true,
        }).then((value) => {
          fetchDetail()
        })
      }
    })
  }

  const renderRewardDetail = (
    <CardContainer>
      <CardHeader textHeader='รายละเอียดของรางวัล' bgColor='#2B2B2B' />
      <Form style={{ padding: '20px' }}>
        <Container
          style={{
            backgroundColor: 'rgba(43, 43, 43, 0.1)',
          }}
          className='p-3'
        >
          <b
            style={{
              color: '#2B2B2B',
            }}
          >
            ของรางวัล
          </b>
          <Row>
            <Col span={2}>
              <img src={data?.reward.imagePath} width={60} height={60} />
            </Col>
            <Col span={3}>
              <div>รหัสของรางวัล</div>
              <div style={{ color: '#2B2B2B' }}>
                <div>{data?.reward.rewardNo}</div>
              </div>
            </Col>
            <Col span={6}>
              <div>ชื่อของรางวัล</div>
              <div>{data?.rewardName}</div>
            </Col>
            <Col span={5}>
              <div>ประเภทของรางวัล</div>
              <div>
                {data?.reward.rewardType === 'PHYSICAL' ? 'Physical' : 'Digital'}
                <span
                  style={{
                    color: data?.reward.rewardExchange === 'SCORE' ? '#EA973E' : '#A9CB62',
                  }}
                >
                  {data?.reward.rewardExchange === 'SCORE' ? ' (ใช้แต้ม)' : ' (ภารกิจ)'}
                </span>
              </div>
            </Col>
            <Col span={3}>
              <div>แต้ม</div>
              <div>
                {!data?.reward.score ? '-' : numberWithCommas(data?.reward.score || 0) + '  แต้ม'}
              </div>
            </Col>
            <Col span={2}>
              <div>จำนวน</div>
              <div>{data?.rewardQuantity} ชิ้น</div>
            </Col>
            <Col span={3}>
              <div>รวมแต้มทั้งหมด</div>
              <div style={{ color: color.Error }}>
                {data?.amountValue === 0 || !data?.amountValue
                  ? '-'
                  : numberWithCommas(data?.amountValue || 0) + ' แต้ม'}
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </CardContainer>
  )
  const renderDronerDetail = (
    <CardContainer>
      <CardHeader textHeader='ข้อมูลนักบินโดรน' bgColor='#EA973E' />
      <Container className='p-3'>
        <Row>
          <Col span={5}>
            <div>ชื่อนักบินโดรน</div>
            <div style={{ color: '#EA973E' }}>
              <u>{data?.receiverDetail.firstname + ' ' + data?.receiverDetail.lastname}</u>
              {data?.receiverDetail.nickname && (
                <ShowNickName data={data?.receiverDetail.nickname} menu='INFO' />
              )}
            </div>
          </Col>
          <Col span={4}>
            <div>เบอร์โทร</div>
            <div>{data?.receiverDetail.tel}</div>
          </Col>
          {data?.redeemDetail?.rewardType === 'PHYSICAL' && (
            <Col span={15}>
              <div>ที่อยู่</div>
              <div>{data?.receiverDetail.address}</div>
            </Col>
          )}
        </Row>
        <Divider />
        {data?.redeemDetail.rewardType === 'PHYSICAL' ? (
          <>
            <Col className='pb-4'>
              <div>สถานะ</div>
              <Radio.Group onChange={(e) => onChangeStatusShip(e)} value={statusShip}>
                {data?.mission !== null ? (
                  <>
                    {optionPhysical
                      .filter((x) => x.value !== 'CANCEL')
                      .map((item) => (
                        <Radio value={item.value} disabled={item.disable}>
                          {item.lable}
                        </Radio>
                      ))}
                  </>
                ) : (
                  <>
                    {optionPhysical.map((item) => (
                      <Radio value={item.value} disabled={item.disable}>
                        {item.lable}
                      </Radio>
                    ))}
                  </>
                )}
              </Radio.Group>
            </Col>
            {statusShip === 'DONE' && (
              <Form form={form}>
                <Row justify={'space-between'} gutter={16}>
                  <Col span={12}>
                    <label>
                      บริษัทส่งของ <span style={{ color: color.Error }}>*</span>
                    </label>
                    <Form.Item
                      name='shipCompany'
                      rules={[
                        {
                          required: true,
                          message: 'กรุณากรอกบริษัทขนส่ง!',
                        },
                      ]}
                    >
                      <Select
                        placeholder='เลือกบริษัทขนส่ง'
                        allowClear
                        defaultValue={data?.redeemDetail.deliveryCompany}
                      >
                        {delivery?.data.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>
                      Tracking ID <span style={{ color: color.Error }}>*</span>
                    </label>
                    <Form.Item
                      name='trackingId'
                      rules={[
                        {
                          required: true,
                          message: 'กรุณากรอก Tracking ID!',
                        },
                      ]}
                    >
                      <Input
                        placeholder='กรอก Tracking ID'
                        autoComplete='off'
                        defaultValue={data?.redeemDetail.trackingNo}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
            {statusShip !== 'REQUEST' && (
              <Col>
                <Form form={formRemark}>
                  <Form.Item name='remark'>
                    <TextArea placeholder='กรอกรายละเอียดหรือหมายเหตุ' />
                  </Form.Item>
                </Form>
              </Col>
            )}
          </>
        ) : (
          <>
            <Col className='pb-4'>
              <div>สถานะ</div>
              <Radio.Group onChange={(e) => onChangeStatusShip(e)} value={statusShip}>
                {data?.redeemDetail.rewardExchange === 'SCORE' ? (
                  <>
                    {optionDigital?.map((item) => (
                      <Radio value={item.value} disabled={item.disable}>
                        {item.lable}
                      </Radio>
                    ))}
                  </>
                ) : (
                  <>
                    {optionDigital
                      ?.filter((x) => x.value !== 'CANCEL')
                      .map((item) => (
                        <Radio value={item.value} disabled={item.disable}>
                          {item.lable}
                        </Radio>
                      ))}
                  </>
                )}
              </Radio.Group>
            </Col>
            {statusShip === 'CANCEL' && (
              <Col>
                <Form form={formRemark}>
                  <Form.Item name='remark'>
                    <TextArea placeholder='กรอกรายละเอียดหรือหมายเหตุ' />
                  </Form.Item>
                </Form>
              </Col>
            )}
          </>
        )}
      </Container>
      <NewTable
        columns={
          data?.redeemDetail.rewardType === 'PHYSICAL' ? columeHisPhysical : columeHisDigital
        }
        dataSource={data?.dronerRedeemHistories}
        pagination={false}
      />
    </CardContainer>
  )
  const renderMissionDetail = (
    <CardContainer>
      <CardHeader textHeader='รายละเอียดของภารกิจ' bgColor='#2B2B2B' />
      <Form style={{ padding: '20px' }}>
        <Container
          style={{
            backgroundColor: 'rgba(43, 43, 43, 0.1)',
          }}
          className='p-3'
        >
          <b
            style={{
              color: '#2B2B2B',
            }}
          >
            ภารกิจ
          </b>
          <Row>
            <Col span={5}>
              <div>Mission No.</div>
              <div style={{ color: '#2B2B2B' }}>
                <div>{data?.redeemDetail?.missionNo}</div>
              </div>
            </Col>
            <Col span={19}>
              <div>ชื่อภารกิจ</div>
              <div>{data?.redeemDetail?.missionName}</div>
            </Col>
          </Row>
        </Container>
      </Form>
    </CardContainer>
  )

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate('/IndexRedeem/Droner')} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>รายละเอียดการแลก | {data?.redeemNo}</strong>
        </span>
      </Row>
      {renderRewardDetail}
      <br />
      {exchange === 'MISSION' && (
        <>
          {renderMissionDetail} <br />
        </>
      )}
      {renderDronerDetail}
      <FooterPage
        onClickBack={() => navigate('/IndexRedeem/Droner')}
        styleFooter={{ padding: '6px' }}
        onClickSave={() => submit()}
        disableSaveBtn={checkDiscable()}
      />
    </>
  )
}

export default DetailDronerRedeem
