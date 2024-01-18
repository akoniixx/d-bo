import { Badge, Button, Input, Pagination, Spin, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useEffect, useState } from 'react'
import { color } from '../../../resource'
import { useNavigate } from 'react-router-dom'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import ActionButton from '../../../components/button/ActionButton'
import { TargetSpray } from '../../../datasource/TargetSprayDatarource'
import { AllTargetSpayEntities } from '../../../entities/TargetSprayEntities'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import ModalDelete from '../../../components/modal/ModalDelete'

function IndexTargetSpray() {
  const navigate = useNavigate()
  const [data, setData] = useState<AllTargetSpayEntities>()
  const [row, setRow] = useState<number>(10)
  const [current, setCurrent] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, [sortDirection])
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await TargetSpray.getAllTargetSpray(
        current,
        row,
        searchText,
        sortField,
        sortDirection,
      )
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const onChangePage = (page: number) => {
    setCurrent(page)
  }

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อเป้าหมาย
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('name')
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
      dataIndex: 'name',
      key: 'name',
      width: '70%',
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            อัปเดตล่าสุด
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('updatedAt')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection2((prev) => {
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
                  color: sortDirection2 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection2 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
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
      width: '10%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => navigate('/InsertTargetSpray/id=' + value)}
              />
              <ActionButton
                icon={<DeleteOutlined />}
                color={color.Error}
                onClick={() => {
                  setShowModal(!showModal)
                  setDeleteId(value)
                }}
              />
            </div>
          ),
        }
      },
    },
  ]

  return (
    <div className='pt-3'>
      <div className='row pb-4'>
        <div className='col-lg-6'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>เป้าหมายการฉีดพ่น</strong>
          </span>
        </div>
        <div className='col-lg-6 d-flex'>
          <div className='col-lg pt-1 me-2'>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder='ค้นหาชื่อเป้าหมาย'
              className='col-lg-12'
              onChange={(e: any) => setSearchText(e.target.value)}
            />
          </div>
          <div className='pt-1 me-2'>
            <Button
              style={{
                borderColor: color.Success,
                borderRadius: '5px',
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
              onClick={() => {
                setCurrent(1)
                fetchData()
              }}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
          <div className='pt-1'>
            <Button
              onClick={() => navigate('/InsertTargetSpray/id=', undefined)}
              style={{
                borderColor: color.Success,
                borderRadius: '5px',
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
            >
              + เพิ่มเป้าหมาย
            </Button>
          </div>
        </div>
      </div>
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table columns={columns} dataSource={data?.data} pagination={false} />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination current={current} total={data?.count} onChange={onChangePage} pageSize={row} />
      </div>

      <ModalDelete
        show={showModal}
        backButton={() => setShowModal(!showModal)}
        callBack={async () => {
          await TargetSpray.deleteTargetSpray(deleteId)
          setShowModal(!showModal)
          fetchData()
        }}
        title1={'โปรดตรวจสอบเป้าหมายที่คุณต้องการลบ ก่อนที่จะกดยืนยัน'}
        title2={'การลบ เพราะอาจส่งผลต่อการจ้างงานในระบบ'}
      />
    </div>
  )
}

export default IndexTargetSpray
