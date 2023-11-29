import React from 'react'
import { Button } from 'antd'
import { color } from '../../resource'

interface SaveButtonProps {
  onClick?: () => void
  disableBtn?: boolean
  title?: string
  size?: any
}
export const SaveButtton: React.FC<SaveButtonProps> = ({ onClick, disableBtn, title, size }) => (
  <Button
    style={{
      backgroundColor: disableBtn ? color.Grey : color.Success,
      borderColor: disableBtn ? color.Grey : color.Success,
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
