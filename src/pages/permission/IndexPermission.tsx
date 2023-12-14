import { Button, Input, Pagination, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { color } from '../../resource'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import ActionButton from '../../components/button/ActionButton'
import { useNavigate } from 'react-router-dom'
import ModalDelete from '../../components/modal/ModalDelete'
import { RoleManage } from '../../datasource/RoleManageDatasource'
import { RoleAllEntity } from '../../entities/RoleEntities'
import { numberWithCommas } from '../../utilities/TextFormatter'

function IndexPermission() {
  const navigate = useNavigate()
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [permissionDelete, setPermissionDelete] = useState<any>()
  const [sortField, setSortField] = useState<any>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [data, setData] = useState<RoleAllEntity>()
  const [current, setCurrent] = useState<number>(1)
  const [row, setRow] = useState<number>(10)
  const [searchText, setSearchText] = useState<string>('')
  const [roleId, setRoleId] = useState<string>('')

  useEffect(() => {
    fetchAllRole()
  }, [sortDirection])
  const fetchAllRole = async () => {
    setLoading(true)
    await RoleManage.getAllRole(current, row, searchText, sortField, sortDirection)
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const showDelete = (id: string) => {
    setRoleId(id)
    setModalDelete(!modalDelete)
  }

  const columns = [
    {
      title: 'บทบาท',
      dataIndex: 'role',
      key: 'role',
      width: '80%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.role}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวน (คน)
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('count')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection1((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection1 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection1 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'count',
      key: 'count',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.count)} คน</span>,
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
                onClick={() => navigate('/EditPermission/id=' + row.id)}
              />
              <ActionButton
                icon={<DeleteOutlined />}
                color={color.Error}
                onClick={() => showDelete(row.id)}
              />
            </div>
          ),
        }
      },
    },
  ]

  return (
    <div>
      <div className='row pt-2'>
        <div className='col-lg-6'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            บทบาทผู้ดูแลระบบ (Role Management)
          </span>
        </div>
        <div className='col-lg-3'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อบทบาท'
            className='col-lg-12'
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg'>
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
              fetchAllRole()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
        <div className='col-lg'>
          <Button
            className='col-lg-12'
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate('/AddPermission')}
          >
            + เพิ่มบทบาทผู้ดูแล
          </Button>
        </div>
      </div>
      <div className='pt-3'>
        <Table columns={columns} dataSource={data?.data} pagination={false} />
      </div>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination current={current} total={data?.count} pageSize={10} />
      </div>

      <ModalDelete
        show={modalDelete}
        title1='โปรดตรวจสอบบทบาทผู้ดูแลระบบที่คุณต้องการลบ ก่อนที่จะกด'
        title2='ยืนยันการลบ เพราะอาจส่งผลต่อการทำงานของผู้ดูแลระบบ'
        backButton={() => setModalDelete(!modalDelete)}
        callBack={async () => {
          try {
            const res = await RoleManage.deleteRole(roleId)
            if (res) {
              setModalDelete(!modalDelete)
              fetchAllRole()
            }
          } catch (error) {
            console.error(error)
          }
        }}
      />
    </div>
  )
}

export default IndexPermission
