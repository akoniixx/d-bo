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

  const handleRowClick = (record: any) => {
    setSelectedPermission(record.key)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value)
  }
  const handleCheck = (checked: boolean, row: any, value: any) => {
    if (row && value && typeof row === 'object' && typeof value === 'string') {
      row['propertyName'] = checked ? value : null
    }
      console.log(followJob);
  }
  
  const menuName = [
    'ติดตามงาน',
    'ข้อมูลเกษตรกร',
    'ข้อมูลนักบินโดรน',
    'ข่าวสาร / กูรูเกษตร',
    'โปรโมชั่น',
    'แต้มสะสม',
    'ของรางวัล',
    'ภารกิจ',
    'ชาเลนจ์',
    'ผู้ดูแลระบบ',
    'ตั้งค่า',
    'แต้ม',
  ]
  const items: any = menuName.map((v, i) => {
    return {
      key: i,
      name: v,
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
      followJob: [followJob],
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
              <Checkbox onChange={(e) => handleCheck(e.target.checked, row, 'view')} />
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
              <Checkbox onChange={(e) => handleCheck(e.target.checked, row, 'edit')} />
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
        const isDisable = ['งานที่เสร็จแล้ว (บัญชี)'].includes(row.name)
        return {
          children: (
            <>
              <Checkbox
                disabled={!isDisable}
                onChange={(e) => handleCheck(e.target.checked, row, 'excel')}
              />
            </>
          ),
        }
      },
    },
  ]

  const dataTacking = [
    {
      key: 0,
      name: 'งานใหม่ (รอนักบิน)',
    },
    {
      key: 1,
      name: 'งานรอดำเนินงาน',
    },
    {
      key: 2,
      name: 'งานในวันนี้',
    },
    {
      key: 3,
      name: 'งานที่เสร็จแล้ว',
    },
    {
      key: 4,
      name: 'แก้ไขงาน/ดูประวัติงาน',
    },
  ]
  const dataFarmer = [
    {
      key: 0,
      name: 'รายชื่อเกษตรกร',
    },
    {
      key: 1,
      name: 'รายการแปลงเกษตร',
    },
    {
      key: 3,
      name: 'อันดับเกษตรกร',
    },
  ]
  const dataDroner = [
    {
      key: 0,
      name: 'รายชื่อนักบินโดรน',
    },
    {
      key: 1,
      name: 'รายการโดรนเกษตร',
    },
    {
      key: 2,
      name: 'อันดับนักบินโดรน',
    },
  ]
  const dataNews = [
    {
      key: 0,
      name: 'ข่าวสาร',
    },
    {
      key: 1,
      name: 'กูรูเกษตร',
    },
  ]
  const dataPromotion = [
    {
      key: 0,
      name: 'โปรโมชั่น',
    },
    {
      key: 1,
      name: 'คูปอง',
    },
  ]
  const dataPoint = [
    {
      key: 0,
      name: 'รายงานแต้ม',
      children: [
        {
          key: 'รอรับแต้ม',
          name: 'รอรับแต้ม',
        },
        {
          key: 'ได้รับแต้ม',
          name: 'ได้รับแต้ม',
        },
      ],
    },
    {
      key: 1,
      name: 'แลกแต้ม/ของรางวัล',
      children: [
        {
          key: 'นักบินโดรน',
          name: 'นักบินโดรน',
        },
        {
          key: 'เกษตรกร',
          name: 'เกษตรกร',
        },
      ],
    },
  ]
  const dataReward = [
    {
      key: 0,
      name: 'นักบินโดรน',
    },
    {
      key: 1,
      name: 'เกษตรกร',
    },
  ]
  const dataMission = [
    {
      key: 0,
      name: 'นักบินโดรน',
    },
    {
      key: 1,
      name: 'เกษตรกร',
    },
  ]
  const dataChallenge = [
    {
      key: 0,
      name: 'นักบินโดรน',
    },
    {
      key: 1,
      name: 'เกษตรกร',
    },
  ]
  const dataAdmin = [
    {
      key: 0,
      name: 'รายชื่อผู้ดูแล',
    },
    {
      key: 1,
      name: 'บทบาทผู้ดูแล',
    },
  ]
  const dataSetting = [
    {
      key: 0,
      name: 'ยี่ห้อโดรน',
    },
    {
      key: 1,
      name: 'รายชื่อพืช',
    },
    {
      key: 2,
      name: 'เป้าหมาย',
    },
    {
      key: 3,
      name: 'ราคา',
    },
  ]
  const dataPointSetting = [
    {
      key: 0,
      name: 'นักบินโดรน',
    },
    {
      key: 1,
      name: 'เกษตรกร',
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
          const isDisable = ['งานที่เสร็จแล้ว (บัญชี)'].includes(row.name)
          return {
            children: (
              <>
                <Checkbox
                  disabled={!isDisable}
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
                data = dataTacking
                break
              case 1:
                data = dataFarmer
                break
              case 2:
                data = dataDroner
                break
              case 3:
                data = dataNews
                break
              case 4:
                data = dataPromotion
                break
              case 5:
                data = dataPoint
                break
              case 6:
                data = dataReward
                break
              case 7:
                data = dataMission
                break
              case 8:
                data = dataChallenge
                break
              case 9:
                data = dataAdmin
                break
              case 10:
                data = dataSetting
                break
              case 11:
                data = dataPointSetting
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
