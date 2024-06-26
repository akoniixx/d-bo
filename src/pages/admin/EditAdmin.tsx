import React, { useEffect, useState } from 'react'
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
import { RoleManage } from '../../datasource/RoleManageDatasource'
import { useQuery } from 'react-query'

const _ = require('lodash')
const { Map } = require('immutable')

const EditAdmin = () => {
  const queryString = _.split(window.location.pathname, '=')
  const navigate = useNavigate()
  const [role, setRole] = useState<any>([])
  const admidId = queryString[1]
  const [showBtn, setShowBtn] = useState<boolean>(true)
  const [data, setData] = useState<UserStaffEntity>(UserStaffEntity_INIT)
  const fetchRole = async() => {
    const data = await RoleManage.getRoleOnly()
    const result = data.map((item : any)=> {
      return {
        label : item.role,
        value : item.id
      }
    })
    return result
  }
  const getRole = useQuery(['role'],()=>fetchRole())
  const textUserName = (
    <span>
      ● ตัวอักษรภาษาอังกฤษ
      <br />● มีความยาวไม่ต่ำกว่า 6 ตัวอักษร
    </span>
  )
  const [tooltipUserOpen, setTooltipUserOpen] = useState<boolean>(false)
  useEffect(() => {
    const getRole = async () => {
      await RoleManage.getRoleOnly().then((res) => setRole(res))
    }
    getRole()
  }, [])
  const fecthAdmin = async (id: string) => {
    await AdminDatasource.getAdminById(id).then((res) => {
      checkValidate(res)
      setData(res)
    })
  }

  useEffect(() => {
    fecthAdmin(admidId)
  }, [])

  const handleChangestatus = (e: any) => {
    const m = Map(data).set('isActive', e.target.value)
    setData(m.toJS())
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value)
    setData(m.toJS())
    checkValidate(m.toJS())
  }

  const handleOnChangeSelect = (value: any) => {
    const m = Map(data).set('role', value)
    setData(m.toJS())
    checkValidate(m.toJS())
  }

  const updateAdmin = (data: UserStaffEntity) => {
    AdminDatasource.updateAdmin(data).then((res) => {
      if (res.success) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          navigate('/IndexAdmin')
        })
      } else {
        Swal.fire({
          title: 'Username หรือ Email ซ้ำในระบบ',
          icon: 'error',
          showConfirmButton: true,
        })
      }
    })
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

  const renderFromData = (
    <Form style={{ padding: '32px' }}>
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
            <Input placeholder='กรอกชื่อ' defaultValue={data.firstname} onChange={handleOnChange} />
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
              defaultValue={data.lastname}
              onChange={handleOnChange}
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
            <Input placeholder='กรอกอีเมลล์' defaultValue={data.email} onChange={handleOnChange} />
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
              defaultValue={data.username}
              onChange={handleOnChange}
            />
          </Form.Item>
        </div>
        <div className='form-group col-lg-6'>
          <label>
            บทบาท <span style={{ color: 'red' }}>*</span>
          </label>
          <Form.Item name='role'>
            <Select placeholder='เลือกบทบาท' defaultValue={data.role} onChange={handleOnChangeSelect}>
              {
                getRole.isLoading ? []:
                getRole.isError ? [] :
                getRole.data.map((item : any,index : number)=>(
                  <option key={index} value={item.value}>{item.label}</option>
                ))
              }
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
              <Radio value={false}>ไม่ใช้งาน</Radio>
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
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>แก้ไขข้อมูลผู้ดูแลระบบ</strong>
        </span>
      </Row>
      <CardContainer key={data.id}>
        <CardHeader textHeader='ข้อมูลผู้ดูแลระบบ' />
        {renderFromData}
      </CardContainer>
      <FooterPage
        onClickBack={() => navigate('/IndexAdmin')}
        onClickSave={() => updateAdmin(data)}
        disableSaveBtn={showBtn}
      />
    </>
  )
}

export default EditAdmin
