import { Button, Form, Input, Row } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import { color } from '../../../resource'
import { CreditSettingDatasource } from '../../../datasource/CreditSettingDatasource'
import {
  CreditSettingEntity,
  CreditSettingEntity_INIT,
} from '../../../entities/CreditSettingEntities'
import { useLocalStorage } from '../../../hook/useLocalStorage'
import Swal from 'sweetalert2'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../../store/ProfileAtom'
import { numberWithCommas } from '../../../utilities/TextFormatter'

function CreditDroner() {
  const [form] = Form.useForm()
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null
  const settingRole = useMemo(() => {
    const find = currentRole?.settings.find((el) => el.name === 'เครดิต')
    return find
  }, [currentRole?.settings])
  const [dataCredit, setDataCredit] = useState<CreditSettingEntity>(CreditSettingEntity_INIT)
  const [profile] = useLocalStorage('profile', [])

  useEffect(() => {
    getCredit()
  }, [])
  const getCredit = async () => {
    try {
      const res = await CreditSettingDatasource.getCreditSetting(true, 'DRONER')
      if (res) {
        setDataCredit(res)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleOnPoint = (e: any) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setDataCredit((prevDataCredit) => ({
      ...prevDataCredit,
      pointCredit: convertedNumber,
    }))
  }

  const handleOnCredit = (e: any) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setDataCredit((prevDataCredit) => ({
      ...prevDataCredit,
      cashCredit: convertedNumber,
    }))
  }
  const isDisabled = !dataCredit.cashCredit || !dataCredit.pointCredit

  const saveCreditSetting = async () => {
    const payload = {
      applicationType: 'DRONER',
      cashCredit: dataCredit.cashCredit,
      id: dataCredit.id,
      isActive: dataCredit.id ? dataCredit.isActive : true,
      pointCredit: dataCredit.pointCredit,
      updatedBy: `${profile?.firstname} ${profile?.lastname}`,
    }
    if (dataCredit.id) {
      try {
        await CreditSettingDatasource.updateCreditSetting(payload).then(() => {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        await CreditSettingDatasource.createCreditSetting(payload).then(() => {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <Row>
        <span className='p-3'>
          <strong style={{ fontSize: '20px' }}>เครดิต (นักบินโดรน)</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลเครดิต' />
        <Form style={{ padding: '32px' }} form={form}>
          <div className='row'>
            <div className='col-lg'>
              <label style={{ fontSize: '16px', paddingBottom: 10 }}>
                การแลกแต้ม
                <span className='text-danger'> *</span>
              </label>
              <Input
                disabled={!settingRole?.edit.value}
                name='point'
                placeholder='กรอกแต้ม'
                suffix='แต้ม / 1 เครดิต'
                autoComplete='off'
                onChange={(e) => handleOnPoint(e)}
                value={numberWithCommas(dataCredit.pointCredit) || undefined}
              />
            </div>
            <div className='col-lg'>
              <label style={{ fontSize: '16px', paddingBottom: 10 }}>
                การแลกเงิน
                <span className='text-danger'> *</span>
              </label>
              <Input
                disabled={!settingRole?.edit.value}
                name='money'
                placeholder='กรอกเงิน'
                suffix='บาท / 1 เครดิต'
                autoComplete='off'
                onChange={(e) => handleOnCredit(e)}
                value={numberWithCommas(dataCredit.cashCredit) || undefined}
              />
            </div>
          </div>
        </Form>
      </CardContainer>
      <div className='col-lg'>
        <Row className='d-flex justify-content-between p-3'>
          <Button
            disabled={!settingRole?.edit.value}
            style={{
              backgroundColor: color.White,
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.Success,
            }}
            onClick={() => getCredit()}
          >
            คืนค่าเดิม
          </Button>
          <Button
            disabled={isDisabled || !settingRole?.edit.value}
            style={{
              backgroundColor: isDisabled ? color.Grey : color.Success,
              borderColor: isDisabled ? color.Grey : color.Success,
              borderRadius: '5px',
              color: color.BG,
            }}
            onClick={() => saveCreditSetting()}
          >
            บันทึก
          </Button>
        </Row>
      </div>
    </div>
  )
}

export default CreditDroner
