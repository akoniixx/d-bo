import { EditOutlined } from '@ant-design/icons'
import { Badge, Button, Pagination, Select, Spin, Table } from 'antd'
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import ActionButton from '../../components/button/ActionButton'
import AddButtton from '../../components/button/AddButton'
import { CardContainer } from '../../components/card/CardContainer'
import { AdminDatasource } from '../../datasource/AdminDatasource'
import { ROLE_ADMIN } from '../../definitions/RoleAdmin'
import { STATUS_NORMAL_MAPPING } from '../../definitions/Status'
import { UserStaffPageEntity, UserStaffPageEntity_INIT } from '../../entities/UserStaffEntities'
import { color } from '../../resource'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { DashboardLayout } from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { RoleManage } from '../../datasource/RoleManageDatasource'

const IndexAdmin = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState<any>([])
  const row = 10
  const [data, setData] = useState<UserStaffPageEntity>(UserStaffPageEntity_INIT)
  const [current, setCurrent] = useState(1)
  const [searchStatus, setSearchStatus] = useState<boolean>()
  const [searchRole, setSearchRole] = useState<string>()
  const [roleNull, setRoleNull] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getRole = async () => {
      await RoleManage.getRoleOnly().then((res) => setRole(res))
    }
    getRole()
  }, [])
  const fecthAdmin = async () => {
    setLoading(true)
    await AdminDatasource.getAdminList(current, row, searchStatus, searchRole)
      .then((res: UserStaffPageEntity) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fecthAdmin()
  }, [current])

  const onChangePage = (page: number) => {
    setCurrent(page)
  }

  const handleOnChangeRole = (value: any) => {
    if (value != '') {
      setSearchRole(value)
    } else {
      setSearchRole(roleNull)
    }
    setCurrent(1)
  }

  const handleOnChangeStatus = (value: any) => {
    setSearchStatus(value)
    setCurrent(1)
  }

  const columns = [
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'firstname',
      key: 'firstname',
      width: '15%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.firstname + ' ' + row.lastname}</span>,
        }
      },
    },
    {
      title: 'ชื่อผู้ใช้ (User Name)',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'อีเมลล์',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'บทบาท',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'สถานะ',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: value ? color.Success : color.Error }}>
              <Badge color={value ? color.Success : color.Error} /> {value ? 'ใช้งาน' : 'ไม่ใช้งาน'}
            </span>
          ),
        }
      },
    },
    {
      title: 'อัพเดทล่าสุด',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{DateTimeUtil.formatDateTime(value)}</span>,
        }
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => navigate('/EditAdmin/id=' + value)}
              />
            </div>
          ),
        }
      },
    },
  ]

  const pageTitle = (
    <div className='d-flex justify-content-between' style={{ padding: '10px' }}>
      <div className='col-lg-4'>
        <span
          className='card-label font-weight-bolder text-dark'
          style={{ fontSize: 22, fontWeight: 'bold', padding: '8px' }}
        >
          <strong>รายชื่อผู้ดูแลระบบ (Admin)</strong>
        </span>
      </div>
      <div className='col-lg-3'>
        <Select
          className='col-lg-12 p-1'
          placeholder='เลือกบทบาท'
          onChange={handleOnChangeRole}
          allowClear
        >
          {role.map((item: any, index: number) => (
            <option key={index} value={item.role} />
          ))}
        </Select>
      </div>
      <div className='col-lg-2'>
        <Select
          className='col-lg-12 p-1'
          onChange={handleOnChangeStatus}
          placeholder='สถานะ'
          allowClear
        >
          <option value='true'>ใช้งาน</option>
          <option value='false'>ไม่ได้ใช้งาน</option>
        </Select>
      </div>
      <div className='col-lg p-1'>
        <Button
          className='col-lg-12'
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() => navigate('/AddAdmin')}
        >
          + เพิ่มผู้ดูแลระบบ
        </Button>
      </div>
      <div className='col-lg p-1'>
        <Button
          className='col-lg-12'
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() => {
            setCurrent(1)
            fecthAdmin()
          }}
        >
          ค้นหาข้อมูล
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {pageTitle}
      <CardContainer>
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <Table
            dataSource={data.results}
            columns={columns}
            pagination={false}
            size='large'
            tableLayout='fixed'
          />
        </Spin>
      </CardContainer>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data.total} รายการ</p>
        <Pagination current={current} total={data.total} onChange={onChangePage} pageSize={row} />
      </div>
    </>
  )
}
export default IndexAdmin
