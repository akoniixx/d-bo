import { SearchOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { color } from '../../resource'
import { CardContainer } from './CardContainer'
import { numberWithCommas } from './../../utilities/TextFormatter'

interface SummaryProps {
  title: string
  bgColor: string
  label: string
  point: number
  icon?: string
  time?: number
  pointManual?: boolean
}
const SummaryPoint: React.FC<SummaryProps> = ({
  title,
  bgColor,
  label,
  point,
  icon,
  time,
  pointManual,
}) => {
  return (
    <>
      <CardContainer
        style={{
          padding: '12px',
          marginRight: '12px',
          borderRadius: '5px',
        }}
      >
        <p style={{ fontSize: '16px', fontWeight: '600' }}>{title}</p>
        <div className='d-flex justify-content-between'>
          <CardContainer
            style={{
              backgroundColor: bgColor,
              borderRadius: '5px',
              padding: '10px',
              width: '100%',
            }}
          >
            <div
              className='d-flex justify-content-between'
              style={{ color: color.White, fontWeight: 'bold' }}
            >
              <div className='d-flex justify-content-between'>
                {!pointManual && icon && (
                  <div>
                    <Image
                      preview={false}
                      src={icon}
                      style={{
                        width: '36px',
                        height: '24px',
                        paddingRight: 10,
                      }}
                    />
                  </div>
                )}
                <div>
                  <span>{label}</span>
                </div>
              </div>
              {!pointManual ? (
                <div style={{ fontSize: '16px' }}>{numberWithCommas(point) + ' แต้ม'}</div>
              ) : (
                <div style={{ fontSize: '16px' }}>
                  {numberWithCommas(time || 0) + ' ครั้ง' + ` ( ${numberWithCommas(point || 0)}  คน)`}
                </div>
              )}
            </div>
          </CardContainer>
        </div>
      </CardContainer>
    </>
  )
}

export default SummaryPoint
