import React from 'react'
import { Button } from 'antd'
import { color } from '../../resource'

interface CardHeaderProps {
  textHeader: string
  center: boolean
}
export const CardHeaderPromotion: React.FC<CardHeaderProps> = ({ textHeader, center }) => {
  const styleCenter = center ? 'd-flex justify-content-center' : 'd-flex justify-content-between'
  return (
    <div
      style={{
        backgroundColor: color.Success,
        borderRadius: '12px 12px 0px 0px',
        padding: '10px 10px 10px 10px',
      }}
      className={styleCenter}
    >
      <h5 className='pt-2 ps-3' style={{ color: 'white' }}>
        {textHeader}
      </h5>
    </div>
  )
}
