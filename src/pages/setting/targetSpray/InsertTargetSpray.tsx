/* eslint-disable @typescript-eslint/no-var-requires */
import { Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import color from '../../../resource/color'
import { TargetSpray } from '../../../datasource/TargetSprayDatarource'
import { TargetSpayEntities, TargetSpayEntities_INIT } from '../../../entities/TargetSprayEntities'
import FooterPage from '../../../components/footer/FooterPage'
import Swal from 'sweetalert2'

const _ = require('lodash')

function InsertTargetSpray() {
  const navigate = useNavigate()
  const queryString = _.split(window.location.pathname, '=')
  const targetSprayId = queryString[1]
  const [data, setData] = useState<TargetSpayEntities>(TargetSpayEntities_INIT)
  const [saveDisable, setSaveDisable] = useState<boolean>(false)

  useEffect(() => {
    getTargetSprayById()
  }, [])

  const getTargetSprayById = async () => {
    if (targetSprayId) {
      await TargetSpray.getTargetSprayById(targetSprayId).then((res) => {
        setData(res)
      })
    }
  }
  const handleNameChange = (event: any) => {
    setData({
      ...data,
      name: event.target.value,
    })
  }
  const insertTarget = async () => {
    setSaveDisable(true)
    try {
      Swal.fire({
        title: 'บันทึกสำเร็จ',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
      if (targetSprayId) {
        await TargetSpray.updateTargetSpray(targetSprayId, data.name, true)
      } else {
        await TargetSpray.insertTargetSpray(data.name, true)
      }
      setSaveDisable(false)
      navigate('/IndexTargetSpray')
    } catch (error) {
      setSaveDisable(false)
      console.error(error)
    }
  }
  return (
    <div>
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1)
          }}
        />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>แก้ไขเป้าหมาย</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลเป้าหมาย' />
        <div className='p-5'>
          <label>ชื่อเป้าหมาย</label>
          <span style={{ color: color.Error }}>*</span>
          <div className='pt-2'>
            <Input
              placeholder='กรอกเป้าหมายการฉีดพ่น'
              value={data?.name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <FooterPage
          onClickBack={() => navigate(-1)}
          onClickSave={insertTarget}
          disableSaveBtn={!data?.name || saveDisable}
        />
      </CardContainer>
    </div>
  )
}

export default InsertTargetSpray
