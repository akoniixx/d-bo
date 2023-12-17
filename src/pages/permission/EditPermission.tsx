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
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const _ = require('lodash')

function EditPermission() {
  const queryString = _.split(window.location.pathname, '=')
  const roleId = queryString[1]
  const navigate = useNavigate()
  const [selectedPermission, setSelectedPermission] = useState<any>()
  const [selectedPermissionSub, setSelectedPermissionSub] = useState<any>()
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
  const [pointList, setPointList] = useState<any>()
  const [promotion, setPromotion] = useState<any>()
  const [reward, setReward] = useState<any>()
  const [settings, setSettings] = useState<any>()
  const [checkboxValues, setCheckboxValues] = useState<any>({})

  useEffect(() => {
    fetchRoleById()
  }, [])
  const fetchRoleById = async () => {
    await RoleManage.getRoleById(roleId).then((res: RoleEntity) => {
      console.log(res)
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
    console.log(record)
    setSelectedPermission(record.name)
  }
  const handleRowSubClick = (record: any) => {
    setSelectedPermissionSub(record.name)
  }

  const listMenu = [
    {
      key: 'ติดตามงาน',
      name: 'ติดตามงาน',
      value: followJob,
    },
    {
      key: 'ข้อมูลเกษตรกร',
      name: 'ข้อมูลเกษตรกร',
      value: farmerInfo,
    },
    {
      key: 'ข้อมูลนักบินโดรน',
      name: 'ข้อมูลนักบินโดรน',
      value: dronerInfo,
    },
    {
      key: 'ข่าวสาร / กูรูเกษตร',
      name: 'ข่าวสาร / กูรูเกษตร',
      value: guru,
    },
    {
      key: 'โปรโมชั่น',
      name: 'โปรโมชั่น',
      value: promotion,
    },
    {
      key: 'แต้มสะสม',
      name: 'แต้มสะสม',
      value: pointResult,
    },
    {
      key: 'ของรางวัล',
      name: 'ของรางวัล',
      value: reward,
    },
    {
      key: 'ภารกิจ',
      name: 'ภารกิจ',
      value: mission,
    },
    {
      key: 'ชาเลนจ์',
      name: 'ชาเลนจ์',
      value: challenge,
    },
    {
      key: 'ผู้ดูแลระบบ',
      name: 'ผู้ดูแลระบบ',
      value: admin,
    },
    {
      key: 'ตั้งค่า',
      name: 'ตั้งค่า',
      value: settings,
    },
    {
      key: 'แต้ม',
      name: 'แต้ม',
      value: point,
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
        const isDisabled = row.view?.disabled ?? false
        const isValue = row.view?.value ?? false
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisabled}
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked,isValue,row['name'], 'view')}
              />
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
        const isDisabled = row.view?.disabled ?? false
        const isValue = row.view?.value ?? false
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisabled}
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked,isValue,row['name'], 'add')}
              />
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
        const isDisabled = row.edit?.disabled ?? false
        const isValue = row.edit?.value ?? false
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisabled}
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked,isValue,row['name'], 'edit')}
              />
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
        const isDisabled = row.delete?.disabled ?? false
        const isValue = row.delete?.value ?? false
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisabled}
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked,isValue,row['name'], 'delete')}
              />
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
        const isDisabled = row.cancel?.disabled ?? false
        const isValue = row.cancel?.value ?? false
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisabled}
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked,isValue,row['name'], 'cancel')}
              />
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
        const isDisabled = row.excel?.disabled ?? false
        const isValue = row.excel?.value ?? false
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisabled}
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked,isValue,row['name'], 'excel')}
              />
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
    console.log(checkboxValues)
  }
  const handleCheckboxChange = (e: boolean, disable: boolean, key: string, column: string) => {
    // Assuming menuData is the state object storing menu data
    const updatedMenuData = {
      ...menuData,
      [key]: [
        {
          add: {
            value: column === 'add' ? e : menuData[key][0].add.value,
            disabled: column === 'add' ? disable : menuData[key][0].add.disabled,
          },
          sub: false, // Assuming this property remains unchanged
          edit: {
            value: column === 'edit' ? e : menuData[key][0].edit.value,
            disabled: column === 'edit' ? disable : menuData[key][0].edit.disabled,
          },
          // Other properties follow a similar pattern
          name: menuData[key][0].name,
          view: {
            value: column === 'view' ? e : menuData[key][0].view.value,
            disabled: column === 'view' ? disable : menuData[key][0].view.disabled,
          },
          excel: {
            value: column === 'excel' ? e : menuData[key][0].excel.value,
            disabled: column === 'excel' ? disable : menuData[key][0].excel.disabled,
          },
          cancel: {
            value: column === 'cancel' ? e : menuData[key][0].cancel.value,
            disabled: column === 'cancel' ? disable : menuData[key][0].cancel.disabled,
          },
          delete: {
            value: column === 'delete' ? e : menuData[key][0].delete.value,
            disabled: column === 'delete' ? disable : menuData[key][0].delete.disabled,
          },
          subItem: [], // Assuming this property remains unchanged
        },
      ],
    };
  
    // Set the updated menuData state
    setMenuData(updatedMenuData);
  };
  
  console.log(checkboxValues)
  const subInSubMenu = (dataRole: any) => (
    <Table
      columns={columns}
      dataSource={dataRole}
      pagination={false}
      rowKey={(record) => record.key}
      showHeader={false}
      rowClassName={(record) =>
        record.name === selectedPermissionSub ? 'display-table-row' : 'hide-table-row'
      }
    />
  )
  const subMenu = (dataRole: any) => {
    const hasSubTrue = dataRole.some((role: any) => role.sub === true)

    return (
      <Table
        columns={columns}
        dataSource={dataRole}
        pagination={false}
        rowKey={(record) => record.key}
        showHeader={false}
        expandable={
          hasSubTrue
            ? {
                expandedRowRender: (record) => {
                  return <>{subInSubMenu(record['subItem'])}</>
                },
                defaultExpandedRowKeys: [selectedPermission],
                onExpand: (expanded, record) => {
                  if (expanded) {
                    handleRowSubClick(record)
                  } else {
                    setSelectedPermission(null)
                  }
                },
              }
            : undefined
        }
        rowClassName={(record) =>
          record.name === selectedPermissionSub ? 'display-table-row' : 'hide-table-row'
        }
      />
    )
  }

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
            const dataRole = {
              ติดตามงาน: followJob,
              ข้อมูลเกษตรกร: farmerInfo,
              ข้อมูลนักบินโดรน: dronerInfo,
              'ข่าวสาร / กูรูเกษตร': guru,
              โปรโมชั่น: promotion,
              แต้มสะสม: pointResult,
              ของรางวัล: reward,
              ภารกิจ: mission,
              ชาเลนจ์: challenge,
              ผู้ดูแลระบบ: admin,
              ตั้งค่า: settings,
              แต้ม: point,
            }[record.key]
            return <>{subMenu(dataRole)}</>
          },
          defaultExpandedRowKeys: [selectedPermission],
          onExpand: (expanded, record) => {
            if (expanded) {
              handleRowSubClick(record)
            } else {
              setSelectedPermission(null)
            }
          },
        }}
        dataSource={listMenu}
        pagination={false}
        rowKey={(record) => record.key}
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
