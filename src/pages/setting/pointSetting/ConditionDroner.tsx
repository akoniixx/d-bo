import React, { useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from 'antd'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import { color } from '../../../resource'
import {
  PointSettingEntities,
  PointSettingEntities_INIT,
} from '../../../entities/PointSettingEntities'
import { PointSettingDatasource } from '../../../datasource/PointSettingDatasource'
import Swal from 'sweetalert2'
import { useQuery } from 'react-query'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../../store/ProfileAtom'

const _ = require('lodash')

function ConditionDroner() {
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null
  const settingRole = useMemo(() => {
    const find = currentRole?.settings.find((el) => el.name === 'แต้ม')
    return find
  }, [currentRole?.settings])
  const [dataPoint, setDataPoint] = useState<PointSettingEntities>({
    point: '',
    amounts: '1',
    minPoint: '',
    pointType: '',
    application: 'DRONER',
    receiveType: 'TASK',
    status: '',
  })
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)

  const getDataPoint = async () => {
    const data = await PointSettingDatasource.getPointSettingApplication('DRONER')
    setDataPoint({
      ...dataPoint,
      point: data.point,
      pointType: 'DISCOUNT_TASK',
      minPoint: data.minPoint,
      status: 'ACTIVE',
    })
    return data
  }

  const data = useQuery(['data'], () => getDataPoint())

  const handleOnPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const point = parseInt(e.target.value) < 0 ? '0' : e.target.value
    setDataPoint({
      ...dataPoint,
      point: point,
    })
  }
  const checkValidate = () => {
    if (dataPoint.point != '') {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }

  useEffect(() => {
    checkValidate()
  }, [dataPoint.point])

  const onClickSave = async () => {
    if (!data.data) {
      await PointSettingDatasource.createPointSetting(dataPoint).then((res) => {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {})
      })
    } else {
      const body = {
        ...dataPoint,
        id: data.data.id,
      }
      await PointSettingDatasource.editPointSetting(body).then((res) => {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {})
      })
    }
  }

  const renderConditionDroner = (
    <CardContainer>
      <CardHeader textHeader='ข้อมูลแต้ม' />
      <div className='row m-3'>
        <div className='col-lg-6 mb-4'>
          <span>การเปรียบเทียบแต้ม/เงิน</span>
          <br />
          <Input
            type='number'
            placeholder='กรอกแต้ม'
            suffix='แต้ม / 1 บาท'
            value={dataPoint.point}
            onChange={(e) => handleOnPoint(e)}
            autoComplete='off'
            disabled={!settingRole?.edit.value}
          />
        </div>
      </div>
    </CardContainer>
  )
  return (
    <>
      <Row>
        <span className='p-3'>
          <strong style={{ fontSize: '20px' }}>ตั้งค่าแต้ม (นักบินโดรน)</strong>
        </span>
      </Row>
      {renderConditionDroner}
      <div className='col-lg'>
        <Row className='d-flex justify-content-between p-3'>
          <Button
            style={{
              backgroundColor: color.White,
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.Success,
            }}
            onClick={() => getDataPoint()}
          >
            คืนค่าเดิม
          </Button>
          <Button
            disabled={saveBtnDisable || !settingRole?.edit.value}
            style={{
              backgroundColor: saveBtnDisable ? color.Grey : color.Success,
              borderColor: saveBtnDisable ? color.Grey : color.Success,
              borderRadius: '5px',
              color: color.BG,
            }}
            onClick={onClickSave}
          >
            บันทึก
          </Button>
        </Row>
      </div>
    </>
  )
}

export default ConditionDroner
