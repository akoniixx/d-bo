import { InfoCircleFilled } from '@ant-design/icons'
import { Badge, Popover } from 'antd'
import React from 'react'
import color from '../../resource/color'

interface CampaignNameProps {
  data?: string
}

const CampaignNames: React.FC<CampaignNameProps> = ({ data }) => (
  <Popover
    content={
      <div>
        <span>{data}</span>
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

export default CampaignNames
