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
import { RoleEntity, RoleEntity_INIT, listMenu, listMenu_INIT } from '../../entities/RoleEntities'
import { numberWithCommas } from '../../utilities/TextFormatter'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const _ = require('lodash')

function EditPermission() {
  const queryString = _.split(window.location.pathname, '=')
  const roleId = queryString[1]
  const navigate = useNavigate()
  const [data, setData] = useState<RoleEntity>(RoleEntity_INIT)
  const [role, setRole] = useState<any>({})

  const [form] = Form.useForm()
  const [admin, setAdmin] = useState<any>()
  const [challenge, setChallenge] = useState<any>()
  const [dronerInfo, setDronerInfo] = useState<any>()
  const [farmerInfo, setFarmerInfo] = useState<any>()
  const [followJob, setFollowJob] = useState<any>()
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
      value: farmerInfo,
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
        const isValue =
          Array.isArray(row.value) && row.value.every((item: any) => item.view?.value === true)

        return {
          children: (
            <>
              <Checkbox
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked, 'view', row)}
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
        const isValue =
          Array.isArray(row.value) && row.value.every((item: any) => item.add?.value === true)

        return {
          children: (
            <>
              <Checkbox
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked, 'add', row)}
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
        const isValue =
          Array.isArray(row.value) && row.value.every((item: any) => item.edit?.value === true)

        return {
          children: (
            <>
              <Checkbox
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked, 'edit', row)}
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
        const isValue =
          Array.isArray(row.value) && row.value.every((item: any) => item.disable?.value === true)

        return {
          children: (
            <>
              <Checkbox
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked, 'delete', row)}
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
        const isValue =
          Array.isArray(row.value) && row.value.every((item: any) => item.cancel?.value === true)

        return {
          children: (
            <>
              <Checkbox
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked, 'cancel', row)}
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
        const isValue =
          Array.isArray(row.value) && row.value.every((item: any) => item.excel?.value === true)

        return {
          children: (
            <>
              <Checkbox
                defaultChecked={isValue}
                onChange={(e) => handleCheckboxChange(e.target.checked, 'excel', row)}
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
  const updatePermission = async () => {
    const payload = {
      id: roleId,
      role: form.getFieldValue('role'),
      count: form.getFieldValue('count'),
      followJob: followJob,
      farmerInfo: farmerInfo,
      dronerInfo: dronerInfo,
      guru: guru,
      promotion: promotion,
      pointResult: pointResult,
      reward: reward,
      mission: mission,
      challenge: challenge,
      admin: admin,
      settings: settings,
      point: point,
    }
    await RoleManage.updateRole(payload).then((res) => {
      if (res) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/IndexPermission')
        })
      }
    })
  }
  const handleCheckboxChange = (checked: boolean, propertyName: string, row: any) => {
    row.value.forEach((item: any) => {
      if (propertyName in item) {
        item[propertyName].value = checked
      }
    })

    const stateSetterMap: { [key: string]: (value: any) => void } = {
      ติดตามงาน: setFollowJob,
      ข้อมูลเกษตรกร: setFarmerInfo,
      ข้อมูลนักบินโดรน: setDronerInfo,
      'ข่าวสาร / กูรูเกษตร': setGuru,
      โปรโมชั่น: setPromotion,
      แต้มสะสม: setPointResult,
      ของรางวัล: setReward,
      ภารกิจ: setMission,
      ชาเลนจ์: setChallenge,
      ผู้ดูแลระบบ: setAdmin,
      ตั้งค่า: setSettings,
      แต้ม: setPoint,
    }

    const stateSetter = stateSetterMap[row.name]
    if (stateSetter) {
      stateSetter(row.value)
    }
  }

  const handleCheckboxChangeSub = (checked: boolean, propertyName: string, row: any) => {
    const updatedRow = { ...row }
    updatedRow[propertyName].value = checked
    console.log(updatedRow)
    console.log(followJob)
  }
  const handleCheckboxChangeSubInSub = (checked: boolean, propertyName: string, row: any) => {}
  const expandedRowRenderSub = (record: listMenu) => {
    let subItemData: any
    if (Array.isArray(record.subItem)) {
      subItemData = record.subItem.map((subItem, index) => ({
        key: `${index}`,
        name: subItem.name,
        add: subItem.add,
        edit: subItem.edit,
        view: subItem.view,
        delete: subItem.delete,
        cancel: subItem.cancel,
        excel: subItem.excel,
      }))
    }
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
                  onChange={(e) => handleCheckboxChangeSubInSub(e.target.checked, 'view', row)}
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
          const isDisabled = row.add?.disabled ?? false
          const isValue = row.add?.value ?? false
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisabled}
                  defaultChecked={isValue}
                  onChange={(e) => handleCheckboxChangeSubInSub(e.target.checked, 'add', row)}
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
                  onChange={(e) => handleCheckboxChangeSubInSub(e.target.checked, 'edit', row)}
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
                  onChange={(e) => handleCheckboxChangeSubInSub(e.target.checked, 'delete', row)}
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
                  onChange={(e) => handleCheckboxChangeSubInSub(e.target.checked, 'cancel', row)}
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
                  onChange={(e) => handleCheckboxChangeSubInSub(e.target.checked, 'excel', row)}
                />
              </>
            ),
          }
        },
      },
    ]
    return (
      <Table
        showHeader={false}
        columns={columns}
        dataSource={subItemData}
        pagination={false}
        rowKey={(record) => record.key}
      />
    )
  }
  const expandedRowRender = (dataRole: any[]) => {
    const hasSubTrue = dataRole.some((role: any) => role.sub === true)
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
                  onChange={(e) => handleCheckboxChangeSub(e.target.checked, 'view', row)}
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
          const isDisabled = row.add?.disabled ?? false
          const isValue = row.add?.value ?? false
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisabled}
                  defaultChecked={isValue}
                  onChange={(e) => handleCheckboxChangeSub(e.target.checked, 'add', row)}
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
                  onChange={(e) => handleCheckboxChangeSub(e.target.checked, 'edit', row)}
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
                  onChange={(e) => handleCheckboxChangeSub(e.target.checked, 'delete', row)}
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
                  onChange={(e) => handleCheckboxChangeSub(e.target.checked, 'cancel', row)}
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
                  onChange={(e) => handleCheckboxChangeSub(e.target.checked, 'excel', row)}
                />
              </>
            ),
          }
        },
      },
    ]
    return (
      <Table
        showHeader={false}
        columns={columns}
        dataSource={dataRole}
        pagination={false}
        rowKey={(record) => record.key}
        expandable={
          hasSubTrue
            ? {
                expandedRowRender: (record) => expandedRowRenderSub(record),
              }
            : undefined
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
            return <>{expandedRowRender(dataRole)}</>
          },
        }}
        dataSource={listMenu}
        pagination={false}
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
