import { InfoCircleFilled } from '@ant-design/icons'
import { Badge, Popover } from 'antd'
import React from 'react'
import color from '../../resource/color'
import { STATUS_COLOR_MAPPING, STATUS_FARMER_MAPPING } from '../../definitions/Status'

interface ShowNickNameProps {
  data?: string
  menu?: string
  status?: string
  colorTooltip?: any
}

const ShowNickName: React.FC<ShowNickNameProps> = ({ menu, status, data, colorTooltip }) => (
  <Popover
    content={
      <div>
        <span>ชื่อเล่น : {data}</span>
        <div>
          {menu !== 'INFO' ? (
            <span style={{ color: STATUS_COLOR_MAPPING[status!] }}>
              <span>สถานะ </span>
              <Badge color={STATUS_COLOR_MAPPING[status!]} /> {STATUS_FARMER_MAPPING[status!]}
            </span>
          ) : null}
        </div>
      </div>
    }
  >
    <InfoCircleFilled
      style={{
        color: colorTooltip || color.Success,
        fontSize: '15px',
        marginLeft: '7px',
        verticalAlign: 0.5,
      }}
    />
  </Popover>
)

export default ShowNickName
