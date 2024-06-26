import React from 'react'
import { Button } from 'antd'
import { color } from '../../resource'

interface SaveButtonProps {
  onClick?: () => void
  disableBtn?: boolean
  title?: string
  size?: any
  colorBg?: string
}
export const SaveButtton: React.FC<SaveButtonProps> = ({
  onClick,
  disableBtn,
  title,
  size,
  colorBg,
}) => (
  <Button
    style={{
      backgroundColor: disableBtn ? color.Grey : colorBg ? colorBg : color.Success,
      borderColor: disableBtn ? color.Grey : colorBg ? colorBg : color.Success,
      borderRadius: '5px',
      color: color.BG,
      width: size ? size : 'none',
    }}
    onClick={onClick}
    disabled={disableBtn}
  >
    {title || 'บันทึก'}
  </Button>
)

export default SaveButtton
