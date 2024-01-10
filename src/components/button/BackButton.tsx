import React from 'react'
import { Button } from 'antd'
import { color } from '../../resource'
import { LeftOutlined } from '@ant-design/icons'

interface BackBackProps {
  onClick?: () => void
  borderColor?: string
  disableBtn?: boolean
}

export const BackButton: React.FC<BackBackProps> = ({ onClick, disableBtn, borderColor }) => (
  <Button
    style={{
      borderColor: !borderColor ? color.Success : borderColor,
      borderRadius: '5px',
      color: !borderColor ? color.Success : borderColor,
    }}
    onClick={onClick}
    disabled={disableBtn}
  >
    ย้อนกลับ
  </Button>
)

export const BackIconButton: React.FC<BackBackProps> = ({ onClick }) => (
  <div style={{ padding: '10px' }}>
    <Button
      style={{ border: 'none', backgroundColor: 'transparent' }}
      icon={<LeftOutlined style={{ fontSize: '25px', color: color.Success }} />}
      size='large'
      shape='circle'
      onClick={onClick}
    />
  </div>
)
