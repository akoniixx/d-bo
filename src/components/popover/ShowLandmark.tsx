import { InfoCircleFilled } from '@ant-design/icons'
import { Popover } from 'antd'
import React from 'react'
import color from '../../resource/color'

interface ShowLandMarkProps {
  landmark: any
}

const ShowLandmark: React.FC<ShowLandMarkProps> = ({ landmark }) => (
  <Popover
    content={
      <div>
        <span>{landmark}</span>
      </div>
    }
  >
    <InfoCircleFilled
      style={{
        color: color.Success,
        fontSize: '15px',
        marginLeft: '7px',
        verticalAlign: 0.5,
      }}
    />
  </Popover>
)

export default ShowLandmark
