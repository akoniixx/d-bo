import { DashboardLayout } from '../../components/layout/Layout'
import React, { useState } from 'react'
import { Form, Input, Radio, Row, Select, Space, Tooltip } from 'antd'
import { BackIconButton } from '../../components/button/BackButton'
import { CardContainer } from '../../components/card/CardContainer'
import { CardHeader } from '../../components/header/CardHearder'
import FooterPage from '../../components/footer/FooterPage'
import { ROLE_ADMIN } from '../../definitions/RoleAdmin'
import { UserStaffEntity, UserStaffEntity_INIT } from '../../entities/UserStaffEntities'
import { AdminDatasource } from '../../datasource/AdminDatasource'
import Swal from 'sweetalert2'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const _ = require('lodash')
const { Map } = require('immutable')

const AddAdmin = () => {
  const navigate = useNavigate()
  const [showBtn, setShowBtn] = useState<boolean>(true)
  const [data, setData] = useState<UserStaffEntity>(UserStaffEntity_INIT)
  const textPassword = (
    <span>
      รหัสต้องประกอบด้วย
      <br /> ● ภาษาอังกฤษพิมพ์ใหญ่
      <br />
      ● ภาษาอังกฤษพิมพ์เล็ก
      <br /> ● อักขระพิเศษ @!_#$
      <br /> ● ตัวเลข <br />● มีความยาวไม่ต่ำกว่า 8 ตัวอักษร
    </span>
  )
  const [tooltipPassOpen, setTooltipPassOpen] = useState<boolean>(false)

  const textUserName = (
    <span>
      ● ตัวอักษรภาษาอังกฤษ
      <br />● มีความยาวไม่ต่ำกว่า 6 ตัวอักษร
    </span>
  )
  const [tooltipUserOpen, setTooltipUserOpen] = useState<boolean>(false)

  const handleChangestatus = (e: any) => {
    const m = Map(data).set('isActive', e.target.value)
    setData(m.toJS())
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value)
    setData(m.toJS())
    checkValidate(m.toJS())
    if (e.target.id === 'username') {
      setTooltipUserOpen(true)
    } else if (e.target.id === 'password') {
      setTooltipPassOpen(true)
    }
  }

  const handleOnChangeSelect = (value: any) => {
    const m = Map(data).set('role', value)
    setData(m.toJS())
    checkValidate(m.toJS())
  }

  const checkValidate = (data: UserStaffEntity) => {
    if (
      data.firstname != '' &&
      data.lastname != '' &&
      data.email != '' &&
      data.username != '' &&
      data.password != '' &&
      data.role != ''
    ) {
      setShowBtn(false)
    } else {
      setShowBtn(true)
    }
  }

  const insertNewAdmin = (data: UserStaffEntity) => {
    AdminDatasource.insertAdmin(data).then((res) => {
      if (res.success) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/IndexAdmin')
        })
      } else {
        const messageList = res.response.data.message
        Swal.fire({
          title: messageList, //"Username หรือ Email ซ้ำในระบบ",
          icon: 'error',
          showConfirmButton: true,
        }).then(() => {
          const checkUsername = messageList.filter((x: any) => x.includes('username'))
          const checkPass = messageList.filter((x: any) => x.includes('password'))
          checkUsername.length && setTooltipUserOpen(true)
          checkPass.length && setTooltipPassOpen(true)
        })
      }
    })
  }

  const renderFromData = (
    <Form style={{ padding: '32px' }} key={data.id}>
      <div className='row'>
        <div className='form-group col-lg-6'>
          <label>
            ชื่อ <span style={{ color: 'red' }}>*</span>
          </label>
          <Form.Item
            name='firstname'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อ!',
              },
            ]}
          >
            <Input
              placeholder='กรอกชื่อ'
              value={data.firstname}
              onChange={handleOnChange}
              key={1}
              autoComplete='off'
            />
          </Form.Item>
        </div>
        <div className='form-group col-lg-6'>
          <label>
            นามสกุล <span style={{ color: 'red' }}>*</span>
          </label>
          <Form.Item
            name='lastname'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกนามสกุล!',
              },
            ]}
          >
            <Input
              placeholder='กรอกนามสกุล'
              value={data?.lastname}
              onChange={handleOnChange}
              autoComplete='off'
            />
          </Form.Item>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-lg-6'>
          <label>
            อีเมลล์ <span style={{ color: 'red' }}>*</span>
          </label>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกอีเมลล์!',
              },
            ]}
          >
            <Input
              placeholder='กรอกอีเมลล์'
              value={data?.email}
              onChange={handleOnChange}
              autoComplete='off'
            />
          </Form.Item>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-lg-6'>
          <label>
            ชื่อผู้ใช้{' '}
            <span style={{ color: 'red' }}>
              *{' '}
              <Tooltip placement='topLeft' title={textUserName} open={tooltipUserOpen}>
                <ExclamationCircleOutlined
                  style={{ position: 'relative', bottom: 5 }}
                  onClick={() => setTooltipUserOpen(!tooltipUserOpen)}
                />
              </Tooltip>
            </span>
          </label>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อในระบบ!',
              },
            ]}
          >
            <Input
              placeholder='กรอกชื่อในระบบ'
              value={data?.username}
              onFocus={handleOnChange}
              autoComplete='off'
              onBlur={() => setTooltipUserOpen(!tooltipUserOpen)}
              onChange={handleOnChange}
            />
          </Form.Item>
        </div>
        <div className='form-group col-lg-6'>
          <label>
            รหัสผ่าน{' '}
            <span style={{ color: 'red' }}>
              *{' '}
              <Tooltip placement='topLeft' title={textPassword} open={tooltipPassOpen}>
                <ExclamationCircleOutlined
                  style={{ position: 'relative', bottom: 5 }}
                  onClick={() => setTooltipPassOpen(!tooltipPassOpen)}
                />
              </Tooltip>
            </span>
          </label>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกรหัสผ่าน!',
              },
            ]}
          >
            <Input
              placeholder='กรอกรหัสผ่าน'
              value={data?.password}
              onFocus={handleOnChange}
              autoComplete='off'
              onBlur={() => setTooltipPassOpen(!tooltipPassOpen)}
              onChange={handleOnChange}
            />
          </Form.Item>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-lg-6'>
          <label>
            บทบาท <span style={{ color: 'red' }}>*</span>
          </label>
          <Form.Item name='role'>
            <Select placeholder='เลือกบทบาท' onChange={handleOnChangeSelect}>
              {ROLE_ADMIN.map((item) => (
                <option value={item.key}></option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 form-group'>
          <label>
            สถานะ <span style={{ color: 'red' }}>*</span>
          </label>
          <br />
          <Radio.Group value={data.isActive} onChange={handleChangestatus}>
            <Space direction='vertical'>
              <Radio value={true}>ใช้งาน</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Form>
  )

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate('/IndexAdmin')} />
        <span className='pt-4'>
          <strong style={{ fontSize: '20px' }}>เพิ่มข้อมูลผู้ดูแลระบบ (User Management)</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลผู้ดูแลระบบ' />
        {renderFromData}
      </CardContainer>
      <FooterPage
        onClickBack={() => navigate('/IndexAdmin')}
        onClickSave={() => {
          insertNewAdmin(data)
        }}
        disableSaveBtn={showBtn}
      />
    </>
  )
}

export default AddAdmin
