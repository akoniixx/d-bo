import React from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Badge, Checkbox, Dropdown, Form, Input, Row, Space, Table } from 'antd'
import color from '../../resource/color'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import { DownOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
interface ExpandedDataType {
  key: React.Key
  date: string
  name: string
  upgradeNum: string
}
function AddPermission() {
  const navigate = useNavigate()
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
  const columns = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'menu',
      key: 'menu',
      width: '18%',
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
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'ชื่อเมนู',
        dataIndex: 'menu',
        key: 'menu',
        width: '19%',
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

    return <Table columns={columns} dataSource={dataTacking} pagination={false} />
  }

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

  return (
    <>
      <div>
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
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
          dataSource={listMenu}
        />
        <FooterPage
          onClickBack={() => navigate(-1)}
          onClickSave={insertPermission}
          // disableSaveBtn={saveBtnDisable}
        />
      </div>
    </>
  )
}

export default AddPermission
