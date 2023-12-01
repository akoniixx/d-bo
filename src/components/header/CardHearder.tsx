import React from 'react'
import { Button } from 'antd'
import { color } from '../../resource'

interface CardHeaderProps {
  textHeader: string
  showButton?: boolean
  onClickButoon?: () => void
  buttonName?: string
  bgColor?: string
  radius?: any
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  textHeader,
  showButton,
  onClickButoon,
  buttonName,
  bgColor,
  radius
}) => (
  <div
    style={{
      backgroundColor: bgColor ? bgColor : color.Success,
      borderRadius: radius? radius :'12px 12px 0px 0px',
      padding: '10px 10px 10px 10px',
    }}
    className='d-flex justify-content-between'
  >
    <h4 className='pt-2 ps-3' style={{ color: 'white' }}>
      {textHeader}
    </h4>
    {showButton && (
      <Button
        style={{
          color: color.primary1,
          fontWeight: 'bold',
          borderRadius: '5px',
          backgroundColor: '#EEF6F0',
        }}
        onClick={onClickButoon}
      >
        {buttonName}
      </Button>
    )}
  </div>
)
