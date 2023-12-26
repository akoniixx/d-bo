import { Button, Checkbox, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import { color } from '../../../resource'

function CreditDroner() {
  const [form] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [money, setMoney] = useState<any>()
  const [credit, setCredit] = useState<any>()

  const handleOnPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }

    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setMoney(convertedNumber)
  }
  const handleOnCredit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }

    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setCredit(convertedNumber)
  }
  return (
    <div>
      <Row>
        <span className='p-3'>
          <strong style={{ fontSize: '20px' }}>เครดิต(นักบินโดรน)</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลเครดิต' />
        <Form style={{ padding: '32px' }} form={form}>
          <div className='row'>
            <div className='col-lg'>
              <label style={{ fontSize: '16px', paddingBottom: 10 }}>การแลกแต้ม</label>
              <Input
                name='point'
                placeholder='กรอกแต้ม'
                suffix='แต้ม / 1 เครดิต'
                autoComplete='off'
                onChange={(e) => handleOnPoint(e)}
                value={money}
              />
            </div>
            <div className='col-lg'>
              <label style={{ fontSize: '16px', paddingBottom: 10 }}>การแลกเงิน</label>
              <Input
                name='money'
                placeholder='กรอกเงิน'
                suffix='บาท / 1 เครดิต'
                autoComplete='off'
                onChange={(e) => handleOnCredit(e)}
                value={credit}
              />
            </div>
          </div>
        </Form>
      </CardContainer>
      <div className='col-lg'>
        <Row className='d-flex justify-content-between p-3'>
          <Button
            style={{
              backgroundColor: color.White,
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.Success,
            }}
            // onClick={() => getDataPoint()}
          >
            คืนค่าเดิม
          </Button>
          <Button
            disabled={saveBtnDisable}
            style={{
              backgroundColor: saveBtnDisable ? color.Grey : color.Success,
              borderColor: saveBtnDisable ? color.Grey : color.Success,
              borderRadius: '5px',
              color: color.BG,
            }}
          >
            บันทึก
          </Button>
        </Row>
      </div>
    </div>
  )
}

export default CreditDroner
