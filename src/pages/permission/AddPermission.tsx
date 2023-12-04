import React, { useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Form, Input, Row, Table } from 'antd'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import '../permission/styles.css'
function AddPermission() {
  const navigate = useNavigate()
  const [selectedPermission, setSelectedPermission] = useState<number | null>(null)

  const handleRowClick = (record: any) => {
    setSelectedPermission(record.key)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const listMenu = [
    {
      key: 0,
      menu: 'ติดตามงาน',
    },
    {
      key: 1,
      menu: 'ข้อมูลเกษตรกร',
    },
    {
      key: 2,
      menu: 'ข้อมูลนักบินโดรน',
    },
    {
      key: 3,
      menu: 'ข่าวสาร / กูรูเกษตร',
    },
    {
      key: 4,
      menu: 'โปรโมชั่น',
    },
    {
      key: 5,
      menu: 'แต้มสะสม',
    },
    {
      key: 6,
      menu: 'ของรางวัล',
    },
    {
      key: 7,
      menu: 'ภารกิจ',
    },
    {
      key: 8,
      menu: 'ชาเลนจ์',
    },
    {
      key: 9,
      menu: 'ผู้ดูแลระบบ',
    },
    {
      key: 10,
      menu: 'ตั้งค่า',
    },
  ]

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
    Swal.fire({
      title: 'บันทึกสำเร็จ',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/IndexPermission')
    })
  }
  const columns = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'menu',
      key: 'menu',
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
      title: 'แก้ไข (Edit)',
      dataIndex: 'edit',
      key: 'edit',
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
      title: 'ลบ (Delete)',
      dataIndex: 'delete',
      key: 'delete',
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
      title: 'ยกเลิก (cancel)',
      dataIndex: 'cancel',
      key: 'cancel',
      width: '13%',
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
      title: 'บันทึกไฟล์ (Export File)',
      dataIndex: 'export',
      key: 'export',
      width: '18%',
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
  ]
  const dataTacking = [
    {
      key: 0,
      menu: 'งานไหม่ (รอนักบิน)',
    },
    {
      key: 1,
      menu: 'งานรอดำเนินงาน',
    },
    {
      key: 2,
      menu: 'งานในวันนี้',
    },
    {
      key: 3,
      menu: 'งานที่เสร็จแล้ว',
    },
    {
      key: 4,
      menu: 'แก้ไขงาน/ดูประวัติงาน',
    },
  ]
  const dataFarmer = [
    {
      key: 0,
      menu: 'รายชื่อเกษตรกร',
    },
    {
      key: 1,
      menu: 'รายการแปลงเกษตร',
    },
  ]
  const dataDroner = [
    {
      key: 0,
      menu: 'รายชื่อนักบินโดรน',
    },
    {
      key: 1,
      menu: 'รายการโดรนเกษตร',
    },
    {
      key: 2,
      menu: 'อันดับนักบินโดรน',
    },
  ]
  const dataNews = [
    {
      key: 0,
      menu: 'ข่าวสาร',
    },
    {
      key: 1,
      menu: 'กูรูเกษตร',
    },
  ]
  const dataPromotion = [
    {
      key: 0,
      menu: 'โปรโมชั่น',
    },
    {
      key: 1,
      menu: 'คูปอง',
    },
  ]
  const dataPoint = [
    {
      key: 0,
      menu: 'รายงานแต้ม',
      children: [
        {
          key: 0,
          menu: 'รอรับแต้ม',
        },
        {
          key: 'ได้รับแต้ม',
          menu: 'ได้รับแต้ม',
        },
      ],
    },
    {
      key: 1,
      menu: 'แลกแต้ม/ของรางวัล',
      children: [
        {
          key: 0,
          menu: 'นักบินโดรน',
        },
        {
          key: 1,
          menu: 'เกษตรกร',
        },
      ],
    },
    {
      key: 2,
      menu: 'แต้มรายบุคคล',
    },
    {
      key: 3,
      menu: 'ให้แต้มพิเศษ',
    },
  ]
  const dataReward = [
    {
      key: 0,
      menu: 'นักบินโดรน',
    },
    {
      key: 1,
      menu: 'เกษตรกร',
    },
  ]
  const dataChallenge = [
    {
      key: 0,
      menu: 'นักบินโดรน',
    },
    {
      key: 1,
      menu: 'เกษตรกร',
    },
  ]
  const dataAdmin = [
    {
      key: 0,
      menu: 'รายชื่อผู้ดูแล',
    },
    {
      key: 1,
      menu: 'บทบาทผู้ดูแล',
    },
  ]
  const dataSetting = [
    {
      key: 0,
      menu: 'ยี่ห้อโดรน',
    },
    {
      key: 1,
      menu: 'รายชื่อพืช',
    },
    {
      key: 2,
      menu: 'เป้าหมาย',
    },
    {
      key: 3,
      menu: 'ราคา',
    },
  ]
  const dataPointSetting = [
    {
      key: 0,
      menu: 'นักบินโดรน',
    },
    {
      key: 1,
      menu: 'เกษตรกร',
    },
  ]

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
                data = dataChallenge
                break
              case 8:
                data = dataAdmin
                break
              case 9:
                data = dataSetting
                break
              case 10:
                data = dataPointSetting
                break
              default:
                break
            }

            return (
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                showHeader={false}
                rowClassName={(record) =>
                  record.key === selectedPermission ? 'display-table-row' : 'hide-table-row'
                }
              />
            )
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
        dataSource={listMenu}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={(record) =>
          record.key === selectedPermission ? 'highlighted-row' : 'normal-row'
        }
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
