import { Button } from 'antd'
import React from 'react'
import color from '../../resource/color'

interface ActionButtonProps {
  onClick?: () => void
  icon: React.ReactNode
  color: string
  actionDisable?: boolean
  bgColor?: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, color, actionDisable,bgColor }) => (
  <Button
    style={{
      borderRadius: '7px 7px 7px 7px',
      borderColor: color,
      color: color,
      backgroundColor: bgColor
    }}
    icon={icon}
    onClick={onClick}
    disabled={actionDisable}
  />
)

export default ActionButton
