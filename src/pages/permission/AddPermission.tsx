import React, { useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Form, Input, MenuProps, Row, Table } from 'antd'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import '../permission/styles.css'
import { listMenu, listMenu_INIT } from '../../entities/RoleEntities'
import {
  followJob,
  farmerJob,
  dronerJob,
  newsJob,
  promotionJob,
  pointJob,
  rewardJob,
  missionJob,
  challengeJob,
  adminJob,
  settingJob,
  pointSettingJob,
  RoleObject,
} from './defaultRole'

const { Map } = require('immutable')

function AddPermission() {
  const navigate = useNavigate()
  const [selectedPermission, setSelectedPermission] = useState<number | null>(null)

  const [role, setRole] = useState<any>()
  const [checkedItems, setCheckedItems] = useState({})
  const [listArray, setListArray] = useState<any>([])

  const handleRowClick = (record: any) => {
    setSelectedPermission(record.key)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value)
  }
  const handleCheckMenu = (checked: boolean, disabel: boolean, row: any, value: any) => {}

  const handleCheck = (checked: boolean, row: any, value: any) => {
    const rowIndex = listArray.findIndex((item: any) => item.name === row.name)
    const updatedFollowJob = {
      ...row,
      name: row['name'],
      [value]: { value: checked, disabled: false },
    }
    const updatedListArray =
      rowIndex === -1
        ? [...listArray, updatedFollowJob]
        : listArray.map((item: any, index: any) => (index === rowIndex ? updatedFollowJob : item))

    setListArray(updatedListArray)
    // const updatedRow = {
    //   ...row,
    //   [value]: { value: checked, disabled: false },
    //   name: row['name'],
    // };
    // const setRoleData = {
    //   followJob: [updatedRow],
    // };
    // console.log(setRoleData)
  }

  const menuName = [
    {
      key: 'ติดตามงาน',
      name: 'ติดตามงาน',
      value: followJob,
    },
    {
      key: 'ข้อมูลเกษตรกร',
      name: 'ข้อมูลเกษตรกร',
      value: farmerJob,
    },
    {
      key: 'ข้อมูลนักบินโดรน',
      name: 'ข้อมูลนักบินโดรน',
      value: dronerJob,
    },
    {
      key: 'ข่าวสาร/กูรูเกษตร',
      name: 'ข่าวสาร/กูรูเกษตร',
      value: newsJob,
    },
    {
      key: 'โปรโมชั่น',
      name: 'โปรโมชั่น',
      value: promotionJob,
    },
    {
      key: 'แต้มสะสม',
      name: 'แต้มสะสม',
      value: pointJob,
    },
    {
      key: 'ของรางวัล',
      name: 'ของรางวัล',
      value: rewardJob,
    },
    {
      key: 'ภารกิจ',
      name: 'ภารกิจ',
      value: missionJob,
    },
    {
      key: 'ชาเลนจ์',
      name: 'ชาเลนจ์',
      value: challengeJob,
    },
    {
      key: 'ผู้ดูแลระบบ',
      name: 'ผู้ดูแลระบบ',
      value: adminJob,
    },
    {
      key: 'ตั้งค่า',
      name: 'ตั้งค่า',
      value: settingJob,
    },
    {
      key: 'แต้ม',
      name: 'แต้ม',
      value: pointSettingJob,
    },
  ]
  const items: any = menuName.map((v, i) => {
    return {
      key: i,
      name: v.name,
      value: v.value,
    }
  })
  const permissionData = (
    <div className='pt-1'>
      <CardContainer style={{ borderRadius: 0 }}>
        <CardHeader textHeader='ข้อมูลบทบาทผู้ดูแล' radius='4px 4px 0px 0px' />
        <Form style={{ padding: '32px' }}>
          <div className='form-group col-lg'>
            <label>
              ชื่อบทบาท <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='permission'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อบทบาท!',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อบทบาท' onChange={handleOnChange} autoComplete='off' />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )

  const insertPermission = () => {
    const namesArray =  followJob.followJob.map(item => item.name);
    // const foundItem = listArray.find((item:any) => namesArray.includes(item.name));

    console.log(listArray,namesArray)

    const payload = {
      role: role,
      followJob: followJob,
      farmerInfo: farmerJob,
      dronerInfo: dronerJob,
      guru: newsJob,
      promotion: promotionJob,
      pointResult: pointJob,
      mission: missionJob,
      challenge: challengeJob,
      admin: adminJob,
      settings: settingJob,
      point: pointSettingJob,
      reward: rewardJob,
    }
    console.log(payload)
    // await RoleManage.insertRole(payload).then((res) => {
    //   if (res) {
    //     Swal.fire({
    //       title: 'บันทึกสำเร็จ',
    //       icon: 'success',
    //       timer: 1500,
    //       showConfirmButton: false,
    //     }).then(() => {
    //       // navigate('/IndexPermission')
    //     })
    //   }
    // })
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
        return {
          children: (
            <>
              <Checkbox onChange={(e) => handleCheckMenu(e.target.checked, false, row, 'view')} />
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
        const isDisable = ['แต้มสะสม', 'แต้ม'].includes(row.name)
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisable}
                onChange={(e) => handleCheckMenu(e.target.checked, isDisable, row, 'add')}
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
        return {
          children: (
            <>
              <Checkbox onChange={(e) => handleCheckMenu(e.target.checked, false, row, 'edit')} />
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
        const isDisable = ['ติดตามงาน', 'แต้ม'].includes(row.name)
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisable}
                onChange={(e) => handleCheckMenu(e.target.checked, isDisable, row, 'delete')}
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
        const isDisable = [
          'ข้อมูลเกษตรกร',
          'ข้อมูลนักบินโดรน',
          'ข่าวสาร/กูรูเกษตร',
          'โปรโมชั่น',
          'ของรางวัล',
          'ภารกิจ',
          'ชาเลนจ์',
          'ผู้ดูแลระบบ',
          'ตั้งค่า',
          'แต้ม',
        ].includes(row.name)
        return {
          children: (
            <>
              <Checkbox
                disabled={isDisable}
                onChange={(e) => handleCheckMenu(e.target.checked, isDisable, row, 'cancel')}
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
        const isDisable = ['งานที่เสร็จแล้ว (บัญชี)'].includes(row.name)
        return {
          children: (
            <>
              <Checkbox
                disabled={!isDisable}
                onChange={(e) => handleCheckMenu(e.target.checked, isDisable, row, 'excel')}
              />
            </>
          ),
        }
      },
    },
  ]

  const expandedRowRenderSub = (record: any) => {
    const columnSubInSub = [
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
        dataIndex: 'add',
        key: 'add',
        width: '11%',
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <Checkbox />
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
          const isDisable = ['รอรับแต้ม', 'ได้รับแต้ม', 'นักบินโดรน', 'เกษตรกร'].includes(row.name)
          return {
            children: (
              <>
                <Checkbox disabled={isDisable} />
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
          const isDisable = ['รอรับแต้ม', 'ได้รับแต้ม'].includes(row.name)
          return {
            children: (
              <>
                <Checkbox disabled={isDisable} />
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
          const isDisable = ['รอรับแต้ม', 'ได้รับแต้ม', 'นักบินโดรน', 'เกษตรกร'].includes(row.name)
          return {
            children: (
              <>
                <Checkbox disabled={isDisable} />
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
          const isDisable = ['รอรับแต้ม', 'ได้รับแต้ม', 'นักบินโดรน', 'เกษตรกร'].includes(row.name)

          return {
            children: (
              <>
                <Checkbox disabled={isDisable} />
              </>
            ),
          }
        },
      },
      {
        title: 'บันทึกไฟล์ (Export File)',
        dataIndex: 'export',
        key: 'export',
        width: '18%',
        render: (value: any, row: any, index: number) => {
          const isDisable = ['รอรับแต้ม', 'ได้รับแต้ม', 'นักบินโดรน', 'เกษตรกร'].includes(row.name)
          return {
            children: (
              <>
                <Checkbox disabled={!isDisable} />
              </>
            ),
          }
        },
      },
    ]
    return (
      <Table showHeader={false} columns={columnSubInSub} dataSource={record} pagination={false} />
    )
  }
  const expandedRowRender = (data: any) => {
    let extractedArray: any[] = []
    Object.values(data).forEach((value) => {
      if (Array.isArray(value)) {
        extractedArray = value
      }
    })
    const hasSubTrue = extractedArray.some((role: any) => role.sub)
    const columnSub = [
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
          return {
            children: (
              <>
                <Checkbox
                  disabled={row.view.disabled}
                  onChange={(e) => handleCheck(e.target.checked, row, 'view')}
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
          return {
            children: (
              <>
                <Checkbox
                  disabled={row.add.disabled}
                  onChange={(e) => handleCheck(e.target.checked, row, 'add')}
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
          return {
            children: (
              <>
                <Checkbox
                  disabled={row.edit.disabled}
                  onChange={(e) => handleCheck(e.target.checked, row, 'edit')}
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
          return {
            children: (
              <>
                <Checkbox
                  disabled={row.delete.disabled}
                  onChange={(e) => handleCheck(e.target.checked, row, 'delete')}
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
          return {
            children: (
              <>
                <Checkbox
                  disabled={row.cancel.disabled}
                  onChange={(e) => handleCheck(e.target.checked, row, 'cancel')}
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
          return {
            children: (
              <>
                <Checkbox
                  disabled={row.excel.disabled}
                  onChange={(e) => handleCheck(e.target.checked, row, 'excel')}
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
        columns={columnSub}
        dataSource={extractedArray}
        pagination={false}
        expandable={
          hasSubTrue
            ? {
                expandedRowRender: (record) => expandedRowRenderSub(record?.subItem),
              }
            : undefined
        }
      />
    )
  }
  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>เพิ่มบทบาทผู้ดูแลระบบ</strong>
        </span>
      </Row>
      {permissionData}
      <Table
        className='pt-3'
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            let data: any = []
            switch (record.key) {
              case 0:
                data = followJob
                break
              case 1:
                data = farmerJob
                break
              case 2:
                data = dronerJob
                break
              case 3:
                data = newsJob
                break
              case 4:
                data = promotionJob
                break
              case 5:
                data = pointJob
                break
              case 6:
                data = rewardJob
                break
              case 7:
                data = missionJob
                break
              case 8:
                data = challengeJob
                break
              case 9:
                data = adminJob
                break
              case 10:
                data = settingJob
                break
              case 11:
                data = pointSettingJob
                break
              default:
                break
            }
            return <>{expandedRowRender(data)}</>
          },
          defaultExpandedRowKeys: [
            selectedPermission !== null ? selectedPermission.toString() : '0',
          ],
          onExpand: (expanded, record) => {
            if (expanded) {
              handleRowClick(record)
            } else {
              setSelectedPermission(null)
            }
          },
        }}
        dataSource={items}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={insertPermission}
        // disableSaveBtn={saveBtnDisable}
      />
    </>
  )
}

export default AddPermission
