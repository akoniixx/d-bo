import React, { useEffect, useState } from 'react'
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

const _ = require('lodash')

function ConditionDroner() {
  const [dataPoint, setDataPoint] = useState<PointSettingEntities>({
    point: '',
    amounts: '1',
    minPoint: '',
    pointType: '',
    application: 'FARMER',
    receiveType: 'TASK',
    status: '',
  })
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)

  const getDataPoint = async () => {
    const data = await PointSettingDatasource.getPointSettingApplication("DRONER")
    setDataPoint({
      ...dataPoint,
      point : data.point.toString(),
      pointType : "DISCOUNT_TASK",
      minPoint : data.minPoint.toString(),
      status : "ACTIVE"
    })
    return data
  }

  const data = useQuery(['data'],()=>getDataPoint())

  const handleOnPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPoint({
      ...dataPoint,
      point : e.target.value
    })
  }
  const checkValidate = () => {
    if (
      dataPoint.minPoint != '' &&
      dataPoint.point != ''
    ) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }

  useEffect(()=>{
    checkValidate()
  },[
    dataPoint.point
  ])

  const onClickSave = async () => {
    const body = {
      ...dataPoint,
      id : data.data.id
    }
    await PointSettingDatasource.editPointSetting(body).then((res) => {
      console.log(res)
      Swal.fire({
        title: 'บันทึกสำเร็จ',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then((time) => {})
    })
  }

  const renderConditionFarmer = (
    <CardContainer>
      <CardHeader textHeader='ข้อมูลแต้ม' />
        <div className='row m-3'>
          <div className='col-lg-6 mb-4'>
            <span>การเปรียบเทียบแต้ม/เงิน</span>
            <br />
              <Input
                placeholder='กรอกแต้ม'
                suffix='แต้ม / 1 บาท'
                value={dataPoint.point}
                onChange={(e) => handleOnPoint(e)}
                autoComplete='off'
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
      {
        data.isLoading?
        <></>:
        data.isError?
        <></>:
        renderConditionFarmer
      }
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
            disabled={saveBtnDisable}
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
