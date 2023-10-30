import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { Button, Empty } from 'antd'
import { color } from '../../resource'

interface SaveButtonProps {
  onClick: () => void
  disableBtn?: boolean
}
export const SaveButtton: React.FC<SaveButtonProps> = ({ onClick, disableBtn }) => (
  <Button
    style={{
      backgroundColor: disableBtn ? color.Grey : color.Success,
      borderColor: disableBtn ? color.Grey : color.Success,
      borderRadius: '5px',
      color: color.BG,
    }}
    onClick={onClick}
    disabled={disableBtn}
  >
    บันทึก
  </Button>
)

export default SaveButtton
