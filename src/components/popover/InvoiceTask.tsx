import { InfoCircleFilled } from '@ant-design/icons'
import { Divider, Popover } from 'antd'
import React from 'react'
import { InvoiceTaskEntity } from '../../entities/NewTaskEntities'
import color from '../../resource/color'
import { numberWithCommasToFixed } from '../../utilities/TextFormatter'

interface InvoiceTaskProp {
  data?: InvoiceTaskEntity
  iconColor?: string
  title?: string
}

const InvoiceTask: React.FC<InvoiceTaskProp> = ({ iconColor, title, data }) => (
  <Popover
    title={
      <span
        style={{
          color: color.White,
        }}
      >
        {title}
      </span>
    }
    content={
      <table style={{ width: '300px' }}>
        <tr>
          <td>
            ค่าบริการ
            <br />
            <div style={{ fontSize: '12px' }}>
              จำนวนไร่{' '}
              <span style={{ color: color.Success }}>
                {data && numberWithCommasToFixed(parseFloat(data.raiAmount || '0'))} ไร่
              </span>{' '}
              x ค่าบริการ{' '}
              <span style={{ color: color.Success }}>
                {data && numberWithCommasToFixed(parseFloat(data?.unitPrice || '0'))} ไร่
              </span>
            </div>
          </td>
          <td style={{ textAlign: 'right' }}>
            {numberWithCommasToFixed(parseFloat(data?.price || '0'))}
          </td>
        </tr>
        <tr>
          <td>ค่าธรรมเนียม (5%)</td>
          <td style={{ textAlign: 'right' }}>
            {numberWithCommasToFixed(parseFloat(data?.fee || '0'))}
          </td>
        </tr>
        <tr>
          <td>ส่วนลดค่าธรรมเนียม</td>
          <td style={{ color: color.Error, textAlign: 'right' }}>
            {parseFloat(data?.discountFee || '0')
              ? '- ' + numberWithCommasToFixed(parseFloat(data?.discountFee || '0'))
              : 0}
          </td>
        </tr>
        <tr>
          <td>ส่วนลดจากคูปอง</td>
          <td style={{ color: color.Error, textAlign: 'right' }}>
            {parseFloat(data?.discountCoupon || '0')
              ? '- ' + numberWithCommasToFixed(parseFloat(data?.discountCoupon || '0'))
              : 0}
          </td>
        </tr>
        <tr>
          <td>ส่วนลดจากโปรโมชั่น</td>
          <td style={{ color: color.Error, textAlign: 'right' }}>
            {parseFloat(data?.discountPromotion || '0')
              ? '- ' + numberWithCommasToFixed(parseFloat(data?.discountPromotion || '0'))
              : 0}
          </td>
        </tr>
        <tr>
          <td>ส่วนลดจากแต้ม</td>
          <td style={{ color: color.Error, textAlign: 'right' }}>
            {parseFloat(data?.discountPoint || '0')
              ? '- ' + numberWithCommasToFixed(parseFloat(data?.discountPoint || '0'))
              : 0}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Divider />
          </td>
        </tr>
        <tr>
          <td>ยอดรวมค่าบริการ</td>
          <td
            style={{
              textAlign: 'right',
              color: color.Success,
              fontWeight: 'bold',
            }}
          >
            {numberWithCommasToFixed(parseFloat(data?.totalPrice || '0'))}
          </td>
        </tr>
      </table>
    }
  >
    <InfoCircleFilled
      style={{
        color: iconColor,
        fontSize: '15px',
        marginLeft: '7px',
        verticalAlign: 0.5,
      }}
    />
  </Popover>
)

export default InvoiceTask
