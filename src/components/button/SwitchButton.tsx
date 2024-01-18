import { Button, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { color } from '../../resource'

interface SwitchButtonProps {
  label1: string
  label2: string
  onClick?: (e: any) => void
  colorButton?: string
}
const SwitchButton: React.FC<SwitchButtonProps> = ({ label1, label2, onClick, colorButton }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Radio.Group buttonStyle='outline'>
        <Radio.Button
          value='SPRAY'
          style={
            label1 === 'SPRAY'
              ? {
                  width: '220px',
                  backgroundColor: color.bgSuccess,
                  color: color.Success,
                  borderColor: color.Success,
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  fontWeight: 'bold',
                }
              : {
                  width: '220px',
                  padding: '8 0',
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                }
          }
          onClick={onClick}
        >
          <div style={{ textAlign: 'center' }}>ฉีดพ่น</div>
        </Radio.Button>
        <Radio.Button
          value='SOW'
          style={
            label1 === 'SOW'
              ? {
                  width: '220px',
                  backgroundColor: color.bgSuccess,
                  color: color.Success,
                  borderColor: color.Success,
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                  fontWeight: 'bold',
                }
              : {
                  width: '220px',
                  padding: '8 0',
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                }
          }
          onClick={onClick}
        >
          <div style={{ textAlign: 'center' }}>หว่าน</div>
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default SwitchButton
