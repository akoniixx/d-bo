import { Badge, Col, Divider, Form, Input, Radio, Row, Select, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import {
  DetailRedeemDronerEntity,
  UpdateRedeemDronerEntity,
  UpdateRedeemDronerEntity_INIT,
} from '../../../entities/RedeemEntities'
import { DeliveryListEntity } from '../../../entities/DeliveryEntities'
import { RedeemDatasource } from '../../../datasource/RedeemDatasource'
import { DeliveryDataSource } from '../../../datasource/DeliveryDatasource'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { color } from '../../../resource'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import ShowNickName from '../../../components/popover/ShowNickName'
import { BackIconButton } from '../../../components/button/BackButton'
import FooterPage from '../../../components/footer/FooterPage'
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

const ViewDetailDroner = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [form] = useForm()
  const [formRemark] = useForm()
  const queryString = _.split(window.location.pathname, '=')
  const navigate = useNavigate()
  const [statusShip, setStatusShip] = useState('')
  const [dataUpdate, setDataUpdate] = useState<UpdateRedeemDronerEntity>(
    UpdateRedeemDronerEntity_INIT,
  )
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

  useEffect(() => {
    fetchDetail()
  }, [])

  const columeHis = [
    {
      title: 'วันที่อัปเดต',
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value && DateTimeUtil.formatDateTime(value)}</span>,
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
        return {
          children: (
            <>
              <span
                style={{
                  color: row.status === 'CANCEL' ? color.Error : color.Success,
                }}
              >
                <Badge color={row.status === 'CANCEL' ? color.Error : color.Success} />{' '}
                {row.status === 'CANCEL' ? 'ยกเลิก' : 'แลกสำเร็จ'}
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
              {row.updateBy || '-'}{' '}
              <span>
                {row.createBy === row.updateBy || index === 0
                  ? '(เกษตรกร)'
                  : row.updateBy === null
                  ? '-'
                  : '(ผู้ดูแลระบบ)'}
              </span>{' '}
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
          <Col span={4}>
            <div>ชื่อนักบินโดรน</div>
            <div style={{ color: color.Success }}>
              <u>{data?.receiverDetail?.firstname + ' ' + data?.receiverDetail?.lastname}</u>
              {data?.receiverDetail?.nickname && (
                <ShowNickName data={data?.receiverDetail?.nickname} menu='INFO' />
              )}
            </div>
          </Col>
          <Col span={4}>
            <div>เบอร์โทร</div>
            <div>{data?.receiverDetail?.tel}</div>
          </Col>
          <Col span={12}>
            <div>ที่อยู่</div>
            <div>{data?.receiverDetail?.address}</div>
          </Col>
        </Row>
      </Container>
      <NewTable columns={columeHis} dataSource={data?.dronerRedeemHistories} pagination={false} />
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
        <BackIconButton onClick={() => navigate(-1)} />
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
    </>
  )
}

export default ViewDetailDroner
