import { Col, Image, Row } from 'antd'
import React, { useState } from 'react'
import { color } from '../../resource'
import { formatNumberWithCommas, numberWithCommas } from '../../utilities/TextFormatter'

export interface detailReward {
  rewardId: string
  rewardName: string
  rewardNo: string
  rewardExchange: string
  remain: number
  imagePath: string
  rewardType: string
  point: string
}
interface MissionReportProps {
  type?: string
  title?: string
  raiAmount?: number
  successMission: string
  unsuccessMission: string
  unconfirmMission: string
  detailReward?: detailReward
  checkCard?: boolean
}
const MissionReportCard: React.FC<MissionReportProps> = ({
  type,
  title,
  raiAmount,
  successMission,
  unsuccessMission,
  unconfirmMission,
  detailReward,
  checkCard,
}) => {
  return (
    <div
      style={{
        border: 'solid',
        borderColor: checkCard ? color.Success : '#C6C6C6',
        borderWidth: '1.5px',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Row gutter={16} style={{ padding: 10 }}>
        <Col span={12}>
          <span style={{ fontWeight: 'bold' }}>{title}</span>
          <p>{`จำนวนไร่สะสม : ${numberWithCommas(raiAmount || 0)} ไร่`}</p>
        </Col>
        <Col span={12}>
          <Row gutter={8}>
            <div
              style={{
                width: '90px',
                padding: 12,
                backgroundColor: 'rgba(235, 87, 87, 0.1)',
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                textAlign: 'center',
              }}
            >
              <span style={{ color: color.Error, fontWeight: 'bold' }}>{unsuccessMission} </span>
              <br />
              <span style={{ color: color.BK }}>ยังไม่สำเร็จ</span>
            </div>
            <div
              style={{
                width: '90px',
                padding: 12,
                backgroundColor: 'rgba(255, 250, 235, 1)',
                textAlign: 'center',
              }}
            >
              <span style={{ color: '#FFCA37', fontWeight: 'bold' }}>{unconfirmMission || 0} </span>
              <br />
              <span style={{ color: color.BK }}>รอกดแลก</span>
            </div>
            <div
              style={{
                width: '90px',
                padding: 12,
                backgroundColor: 'rgba(33, 150, 83, 0.1)',
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                textAlign: 'center',
              }}
            >
              <span style={{ color: color.Success, fontWeight: 'bold' }}>{successMission} </span>
              <br />
              <span style={{ color: color.BK }}>สำเร็จ</span>
            </div>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: checkCard ? 'rgba(33, 150, 83, 0.1)' : '#F4F4F4',
          padding: 10,
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        {type === 'MISSION_POINT' ? (
          <span>
            จำนวนแต้มที่ได้รับ :{' '}
            {detailReward?.point ? formatNumberWithCommas(parseFloat(detailReward?.point)) : 0} แต้ม
          </span>
        ) : (
          <>
            <Col span={2}>
              <Image
                src={detailReward?.imagePath}
                style={{ width: 48, height: 48, padding: '6px', borderRadius: 5 }}
                preview={false}
              />
            </Col>
            <Col span={20} style={{ padding: '5px' }}>
              <span>
                {detailReward?.rewardName} | {detailReward?.rewardNo} |{' '}
                {detailReward?.rewardType === 'PHYSICAL' ? 'Physical' : 'Digital'}{' '}
                <span
                  style={{
                    color: detailReward?.rewardExchange === 'MISSION' ? '#A9CB62' : '#EA973E',
                  }}
                >
                  {detailReward?.rewardExchange === 'MISSION' ? '(ภารกิจ) ' : '(ใช้แต้ม) '}
                </span>
                | คงเหลือ {detailReward?.remain} ชิ้น
              </span>
            </Col>
          </>
        )}
      </Row>
    </div>
  )
}

export default MissionReportCard
