import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Form, Input, Row, Table } from 'antd'
import color from '../../resource/color'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import { RoleManage } from '../../datasource/RoleManageDatasource'
import { RoleEntity, listMenu, listMenu_INIT } from '../../entities/RoleEntities'
import { numberWithCommas } from '../../utilities/TextFormatter'
import { set } from 'immutable'

const _ = require('lodash')

function EditPermission() {
  const queryString = _.split(window.location.pathname, '=')
  const roleId = queryString[1]
  const navigate = useNavigate()
  const [selectedPermission, setSelectedPermission] = useState<any>()
  const [data, setData] = useState<RoleEntity>()
  const [form] = Form.useForm()
  const [admin, setAdmin] = useState<any>()
  const [challenge, setChallenge] = useState<any>()
  const [dronerInfo, setDronerInfo] = useState<any>()
  const [farmerInfo, setFarmerInfo] = useState<any>()
  const [followJob, setFollowJob] = useState<listMenu | undefined>(undefined)
  const [guru, setGuru] = useState<any>()
  const [mission, setMission] = useState<any>()
  const [point, setPoint] = useState<any>()
  const [pointResult, setPointResult] = useState<any>()
  const [promotion, setPromotion] = useState<any>()
  const [reward, setReward] = useState<any>()
  const [settings, setSettings] = useState<any>()

  useEffect(() => {
    fetchRoleById()
  }, [])
  const fetchRoleById = async () => {
    await RoleManage.getRoleById(roleId).then((res: RoleEntity) => {
      setData(res)
      setAdmin(res.admin)
      setChallenge(res.challenge)
      setDronerInfo(res.dronerInfo)
      setFarmerInfo(res.farmerInfo)
      setFollowJob(res.followJob)
      setGuru(res.guru)
      setMission(res.mission)
      setPoint(res.point)
      setPointResult(res.pointResult)
      setPromotion(res.promotion)
      setReward(res.reward)
      setSettings(res.settings)
      form.setFieldsValue({
        role: res.role,
        count: numberWithCommas(res.count),
      })
    })
  }

  const handleRowClick = (record: any) => {
    setSelectedPermission(record.menu)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const listMenu = [
    {
      key: 'ติดตามงาน',
      name: 'ติดตามงาน',
    },
    {
      key: 'ข้อมูลเกษตรกร',
      name: 'ข้อมูลเกษตรกร',
    },
    {
      key: 'ข้อมูลนักบินโดรน',
      name: 'ข้อมูลนักบินโดรน',
    },
    {
      key: 'ข่าวสาร / กูรูเกษตร',
      name: 'ข่าวสาร / กูรูเกษตร',
    },
    {
      key: 'โปรโมชั่น',
      name: 'โปรโมชั่น',
    },
    {
      key: 'แต้มสะสม',
      name: 'แต้มสะสม',
    },
    {
      key: 'ของรางวัล',
      name: 'ของรางวัล',
    },
    {
      key: 'ภารกิจ',
      name: 'ภารกิจ',
    },
    {
      key: 'ชาเลนจ์',
      name: 'ชาเลนจ์',
    },
    {
      key: 'ผู้ดูแลระบบ',
      name: 'ผู้ดูแลระบบ',
    },
    {
      key: 'ตั้งค่า',
      name: 'ตั้งค่า',
    },
  ]
  const columns = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'name',
      key: 'name',
      width: '21%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: 'ดูข้อมูล (View)',
      dataIndex: 'view',
      key: 'view',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        const isViewDefined = row.view && typeof row.view === 'object' && 'disabled' in row.view
        const isDisabled = isViewDefined ? row.view.disabled : false
        return {
          children: (
            <>
              <Checkbox disabled={isDisabled} />
            </>
          ),
        }
      },
    },
    {
      title: 'เพิ่ม (Add)',
      dataIndex: 'add',
      key: 'add',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        const isViewDefined = row.add && typeof row.add === 'object' && 'disabled' in row.add
        const isDisabled = isViewDefined ? row.add.disabled : false
        return {
          children: (
            <>
              <Checkbox disabled={isDisabled} />
            </>
          ),
        }
      },
    },
    {
      title: 'แก้ไข (Edit)',
      dataIndex: 'edit',
      key: 'edit',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        const isViewDefined = row.edit && typeof row.edit === 'object' && 'disabled' in row.edit
        const isDisabled = isViewDefined ? row.edit.disabled : false
        return {
          children: (
            <>
              <Checkbox disabled={isDisabled} />
            </>
          ),
        }
      },
    },
    {
      title: 'ลบ (Delete)',
      dataIndex: 'delete',
      key: 'delete',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        const isViewDefined =
          row.delete && typeof row.delete === 'object' && 'disabled' in row.delete
        const isDisabled = isViewDefined ? row.delete.disabled : false
        return {
          children: (
            <>
              {' '}
              <Checkbox disabled={isDisabled} />
            </>
          ),
        }
      },
    },
    {
      title: 'ยกเลิก (cancel)',
      dataIndex: 'cancel',
      key: 'cancel',
      width: '13%',
      render: (value: any, row: any, index: number) => {
        const isViewDefined =
          row.cancel && typeof row.cancel === 'object' && 'disabled' in row.cancel
        const isDisabled = isViewDefined ? row.cancel.disabled : false
        return {
          children: (
            <>
              <Checkbox disabled={isDisabled} />
            </>
          ),
        }
      },
    },
    {
      title: 'บันทึกไฟล์ (Export File)',
      dataIndex: 'excel',
      key: 'excel',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        const isViewDefined = row.excel && typeof row.excel === 'object' && 'disabled' in row.excel
        const isDisabled = isViewDefined ? row.excel.disabled : false

        return {
          children: (
            <>
              <Checkbox disabled={isDisabled} />
            </>
          ),
        }
      },
    },
  ]
  const permissionData = (
    <div className='pt-1'>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลบทบาทผู้ดูแล' />
        <Form form={form} style={{ padding: '32px' }} className='row'>
          <div className='form-group col-lg-6'>
            <label>
              ชื่อบทบาท <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='role'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อบทบาท!',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อบทบาท' autoComplete='off' />
            </Form.Item>
          </div>
          <div className='form-group col-lg-6'>
            <label>จำนวนผู้ดูแลระบบ</label>
            <Form.Item name='count'>
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )
  const updatePermission = () => {
    Swal.fire({
      title: 'บันทึกสำเร็จ',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/IndexPermission')
    })
  }
  console.log(data)

  return (
    <div>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>แก้ไขบทบาทผู้ดูแลระบบ</strong>
        </span>
      </Row>
      {permissionData}
      <Table
        className='pt-3'
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            let dataRole: any
            switch (record.key) {
              case 'ติดตามงาน':
                dataRole = followJob
                break
              case 'ข้อมูลเกษตรกร':
                dataRole = farmerInfo
                break
              case 'ข้อมูลนักบินโดรน':
                dataRole = dronerInfo
                break
              case 'ข่าวสาร / กูรูเกษตร':
                dataRole = guru
                break
              case 'โปรโมชั่น':
                dataRole = promotion
                break
              case 'แต้มสะสม':
                dataRole = point
                break
              case 'ของรางวัล':
                dataRole = reward
                break
              case 'ชาเลนจ์':
                dataRole = challenge
                break
              case 'ผู้ดูแลระบบ':
                dataRole = admin
                break
              case 'ตั้งค่า':
                dataRole = settings
                break
              default:
                break
            }
            return (
              <Table
                columns={columns}
                dataSource={dataRole}
                pagination={false}
                showHeader={false}
                rowClassName={(record) =>
                  record.key === selectedPermission ? 'display-table-row' : 'hide-table-row'
                }
              />
            )
          },
          defaultExpandedRowKeys: [selectedPermission],
          onExpand: (expanded, record) => {
            if (expanded) {
              handleRowClick(record)
            } else {
              setSelectedPermission(null)
            }
          },
        }}
        dataSource={listMenu}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={(record) =>
          record.name === selectedPermission ? 'highlighted-row' : 'normal-row'
        }
      />
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={updatePermission}
        // disableSaveBtn={saveBtnDisable}
      />
    </div>
  )
}

export default EditPermission
