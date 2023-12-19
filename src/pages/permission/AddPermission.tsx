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

const { Map } = require('immutable')

function AddPermission() {
  const navigate = useNavigate()
  const [selectedPermission, setSelectedPermission] = useState<number | null>(null)
  const [role, setRole] = useState<any>()
  const [checkedItems, setCheckedItems] = useState({})
  const [admin, setAdmin] = useState<listMenu>(listMenu_INIT)
  const [challenge, setChallenge] = useState<listMenu>(listMenu_INIT)
  const [dronerInfo, setDronerInfo] = useState<listMenu>(listMenu_INIT)
  const [farmerInfo, setFarmerInfo] = useState<listMenu>(listMenu_INIT)
  const [followJob, setFollowJob] = useState<listMenu>(listMenu_INIT)
  const [guru, setGuru] = useState<listMenu>(listMenu_INIT)
  const [mission, setMission] = useState<listMenu>(listMenu_INIT)
  const [point, setPoint] = useState<listMenu>(listMenu_INIT)
  const [pointResult, setPointResult] = useState<listMenu>(listMenu_INIT)
  const [promotion, setPromotion] = useState<listMenu>(listMenu_INIT)
  const [reward, setReward] = useState<listMenu>(listMenu_INIT)
  const [settings, setSettings] = useState<listMenu>(listMenu_INIT)
  const [listArray, setListArray] = useState<any>([])

  const handleRowClick = (record: any) => {
    setSelectedPermission(record.key)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value)
  }
  const handleCheckMenu = (checked: boolean, disabel: boolean, row: any, value: any) => {}

  const handleCheck = (checked: boolean, disable: boolean, row: any, value: any) => {
    const isDisableView =
      ['อันดับเกษตรกร', 'กูรูเกษตร', 'โปรโมชั่น'].includes(row.name) || value === 'view'
    const isDisableAdd =
      [
        'งานรอดำเนินงาน',
        'งานในวันนี้',
        'งานที่เสร็จแล้ว',
        'งานที่เสร็จแล้ว (บัญชี)',
        'แก้ไขงาน/ดูประวัติงาน',
        'อันดับเกษตรกร',
        'อันดับนักบินโดรน',
        'กูรูเกษตร',
        'โปรโมชั่น',
        'แลกแต้ม/ของรางวัล',
        'รายงานแต้ม',
        'ราคา',
        'แต้ม',
      ].includes(row['name']) || value === 'add'
    const isDisableEdit =
      ['อันดับเกษตรกร', 'อันดับนักบินโดรน', 'กูรูเกษตร', 'โปรโมชั่น'].includes(row.name) ||
      value === 'edit'
    const isDisableDelete =
      [
        'งานใหม่ (รอนักบิน)',
        'งานรอดำเนินงาน',
        'งานในวันนี้',
        'งานที่เสร็จแล้ว',
        'งานที่เสร็จแล้ว (บัญชี)',
        'แก้ไขงาน/ดูประวัติงาน',
        'อันดับเกษตรกร',
        'อันดับนักบินโดรน',
        'กูรูเกษตร',
        'โปรโมชั่น',
        'รายงานแต้ม',
        'แลกแต้ม/ของรางวัล',
        'รายชื่อพืช',
        'ราคา',
      ].includes(row.name) || value === 'delete'
    const isDisableCancel =
      [
        'งานรอดำเนินงาน',
        'งานในวันนี้',
        'งานที่เสร็จแล้ว',
        'งานที่เสร็จแล้ว (บัญชี)',
        'รายชื่อเกษตรกร',
        'รายการแปลงเกษตร',
        'อันดับเกษตรกร',
        'รายชื่อนักบินโดรน',
        'รายการโดรนเกษตร',
        'อันดับนักบินโดรน',
        'ข่าวสาร',
        'กูรูเกษตร',
        'โปรโมชั่น',
        'คูปอง',
        'รายงานแต้ม',
        'รายชื่อผู้ดูแลระบบ',
        'บทบาทผู้ดูแล',
        'ยี่ห้อโดรน',
        'รายชื่อพืช',
        'เป้าหมาย',
        'ราคา',
      ].includes(row.name) || value === 'cancel'
    const isDisableExcel = ['งานที่เสร็จแล้ว (บัญชี)'].includes(row.name) || value === 'excel'
    

    // const rowIndex = listArray.findIndex((item: any) => item.name === row.name)
    // const updatedFollowJob = {
    //   ...row.value,
    //   name: row['name'],
    //   [value]: { value: checked, disable: disable },
    // }

    // const updatedListArray =
    //   rowIndex === -1
    //     ? [...listArray, updatedFollowJob]
    //     : listArray.map((item: any, index: any) => (index === rowIndex ? updatedFollowJob : item))
    // setListArray(updatedListArray)
    // console.log(updatedListArray)
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
      value: farmerInfo,
    },
    {
      key: 'ข้อมูลนักบินโดรน',
      name: 'ข้อมูลนักบินโดรน',
      value: farmerInfo,
    },
    {
      key: 'ข่าวสาร/กูรูเกษตร',
      name: 'ข่าวสาร/กูรูเกษตร',
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
    const payload = {
      role: role,
      followJob: listArray,
      farmerInfo: [farmerInfo],
      dronerInfo: [dronerInfo],
      guru: [guru],
      promotion: [promotion],
      pointResult: [pointResult],
      mission: [mission],
      challenge: [challenge],
      admin: [admin],
      settings: [settings],
      point: [point],
      reward: [reward],
    }
    console.log(payload)
    // Swal.fire({
    //   title: 'บันทึกสำเร็จ',
    //   icon: 'success',
    //   timer: 1500,
    //   showConfirmButton: false,
    // }).then(() => {
    //   navigate('/IndexPermission')
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

  const tacking = [
    'งานใหม่ (รอนักบิน)',
    'งานรอดำเนินงาน',
    'งานในวันนี้',
    'งานที่เสร็จแล้ว',
    'แก้ไขงาน/ดูประวัติงาน',
  ]
  const dataFarmer = ['รายชื่อเกษตรกร', 'รายการแปลงเกษตร', 'อันดับเกษตรกร']
  const dataDroner = ['รายชื่อนักบินโดรน', 'รายการโดรนเกษตร', 'อันดับนักบินโดรน']
  const dataNews = ['ข่าวสาร', 'กูรูเกษตร']
  const dataPromotion = ['โปรโมชั่น', 'คูปอง']
  const dataPoint = [
    {
      name: 'รายงานแต้ม',
      children: ['รอรับแต้ม', 'ได้รับแต้ม'],
    },
    {
      name: 'แลกแต้ม/ของรางวัล',
      children: ['นักบินโดรน', 'เกษตรกร'],
    },
  ]
  const dataReward = ['นักบินโดรน', 'เกษตรกร']
  const dataMission = ['นักบินโดรน', 'เกษตรกร']
  const dataChallenge = ['นักบินโดรน', 'เกษตรกร']
  const dataAdmin = ['รายชื่อผู้ดูแล', 'บทบาทผู้ดูแล']
  const dataSetting = ['ยี่ห้อโดรน', 'รายชื่อพืช', 'เป้าหมาย', 'ราคา']
  const dataPointSetting = ['นักบินโดรน', 'เกษตรกร']
  const determineValue = (item: any) => {
    if (tacking.includes(item)) {
      return followJob
    } else if (dataFarmer.includes(item)) {
      return farmerInfo
    } else if (dataDroner.includes(item)) {
      return dronerInfo
    } else if (dataNews.includes(item)) {
      return guru
    } else if (dataPromotion.includes(item)) {
      return promotion
    } else if (dataPoint.includes(item)) {
      return pointResult
    } else if (dataReward.includes(item)) {
      return reward
    } else if (dataMission.includes(item)) {
      return mission
    } else if (dataChallenge.includes(item)) {
      return challenge
    } else if (dataAdmin.includes(item)) {
      return admin
    } else if (dataSetting.includes(item)) {
      return settings
    } else if (dataPointSetting.includes(item)) {
      return point
    }
  }

  const determineChildValue = (child: any) => {
    if (dataPoint.includes(child)) {
      return pointResult
    }
  }
  const mapArray = (arr: any[]) => {
    let index = 0
    return arr.map((item) => {
      if (typeof item === 'string') {
        return {
          key: index++,
          name: item,
          value: determineValue(item),
        }
      } else {
        return {
          key: index++,
          name: item.name,
          children: item.children.map((child: any, childIndex: any) => ({
            key: `${index}-${childIndex}`,
            name: child,
            value: determineChildValue(child),
          })),
        }
      }
    })
  }
  const dataTackings = mapArray(tacking)
  const dataFarmers = mapArray(dataFarmer)
  const dataDroners = mapArray(dataDroner)
  const dataNewss = mapArray(dataNews)
  const dataPromotions = mapArray(dataPromotion)
  const dataPoints = mapArray(dataPoint)
  const dataRewards = mapArray(dataReward)
  const dataMissions = mapArray(dataMission)
  const dataChallenges = mapArray(dataChallenge)
  const dataAdmins = mapArray(dataAdmin)
  const dataSettings = mapArray(dataSetting)
  const dataPointSettings = mapArray(dataPointSetting)

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
    const hasSubTrue = data.some((role: any) => role.sub === true)
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
          const isDisable = ['อันดับเกษตรกร', 'กูรูเกษตร', 'โปรโมชั่น'].includes(row.name)
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisable}
                  onChange={(e) => handleCheck(e.target.checked, isDisable, row, 'view')}
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
          const isDisable = [
            'งานรอดำเนินงาน',
            'งานในวันนี้',
            'งานที่เสร็จแล้ว',
            'งานที่เสร็จแล้ว (บัญชี)',
            'แก้ไขงาน/ดูประวัติงาน',
            'อันดับเกษตรกร',
            'อันดับนักบินโดรน',
            'กูรูเกษตร',
            'โปรโมชั่น',
            'แลกแต้ม/ของรางวัล',
            'รายงานแต้ม',
            'ราคา',
            'แต้ม',
          ].includes(row.name)
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisable}
                  onChange={(e) => handleCheck(e.target.checked, isDisable, row, 'add')}
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
          const isDisable = [
            'อันดับเกษตรกร',
            'อันดับนักบินโดรน',
            'กูรูเกษตร',
            'โปรโมชั่น',
          ].includes(row.name)
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisable}
                  onChange={(e) => handleCheck(e.target.checked, isDisable, row, 'edit')}
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
          const isDisable = [
            'งานใหม่ (รอนักบิน)',
            'งานรอดำเนินงาน',
            'งานในวันนี้',
            'งานที่เสร็จแล้ว',
            'งานที่เสร็จแล้ว (บัญชี)',
            'แก้ไขงาน/ดูประวัติงาน',
            'อันดับเกษตรกร',
            'อันดับนักบินโดรน',
            'กูรูเกษตร',
            'โปรโมชั่น',
            'รายงานแต้ม',
            'แลกแต้ม/ของรางวัล',
            'รายชื่อพืช',
            'ราคา',
          ].includes(row.name)
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisable}
                  onChange={(e) => handleCheck(e.target.checked, isDisable, row, 'delete')}
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
            'งานรอดำเนินงาน',
            'งานในวันนี้',
            'งานที่เสร็จแล้ว',
            'งานที่เสร็จแล้ว (บัญชี)',
            'รายชื่อเกษตรกร',
            'รายการแปลงเกษตร',
            'อันดับเกษตรกร',
            'รายชื่อนักบินโดรน',
            'รายการโดรนเกษตร',
            'อันดับนักบินโดรน',
            'ข่าวสาร',
            'กูรูเกษตร',
            'โปรโมชั่น',
            'คูปอง',
            'รายงานแต้ม',
            'รายชื่อผู้ดูแลระบบ',
            'บทบาทผู้ดูแล',
            'ยี่ห้อโดรน',
            'รายชื่อพืช',
            'เป้าหมาย',
            'ราคา',
          ].includes(row.name)
          return {
            children: (
              <>
                <Checkbox
                  disabled={isDisable}
                  onChange={(e) => handleCheck(e.target.checked, isDisable, row, 'cancel')}
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
                  onChange={(e) => handleCheck(e.target.checked, !isDisable, row, 'excel')}
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
        dataSource={data}
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
            let data: readonly any[] | undefined = []
            switch (record.key) {
              case 0:
                data = dataTackings
                break
              case 1:
                data = dataFarmers
                break
              case 2:
                data = dataDroners
                break
              case 3:
                data = dataNewss
                break
              case 4:
                data = dataPromotions
                break
              case 5:
                data = dataPoints
                break
              case 6:
                data = dataRewards
                break
              case 7:
                data = dataMissions
                break
              case 8:
                data = dataChallenges
                break
              case 9:
                data = dataAdmins
                break
              case 10:
                data = dataSettings
                break
              case 11:
                data = dataPointSettings
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
