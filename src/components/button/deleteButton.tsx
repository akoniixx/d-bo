import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { Button, Empty } from 'antd'
import { color } from '../../resource'

interface DeleteButtonProps {
  onClick: Function
  disableBtn?: boolean
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, disableBtn }) => (
  <Button
    style={{
      backgroundColor: disableBtn ? color.Grey : color.Error,
      borderColor: disableBtn ? color.Grey : color.Error,
      borderRadius: '5px',
      color: color.BG,
    }}
    onClick={onClick()}
    disabled={disableBtn}
  >
    ลบ
  </Button>
)

export default DeleteButton
