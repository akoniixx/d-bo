import React, { useEffect, useState } from 'react'
import { Badge, Button, Input, Pagination, Spin, Table } from 'antd'
import {
  DroneBrandEntity,
  DroneBrandListEntity,
  DroneBrandListEntity_INIT,
} from '../../../entities/DroneBrandEntities'
import { DroneDatasource } from '../../../datasource/DroneDatasource'
import { color } from '../../../resource'
import moment from 'moment'
import ActionButton from '../../../components/button/ActionButton'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const IndexDroneBrand: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<DroneBrandListEntity>(DroneBrandListEntity_INIT)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState<string>()
  const [current, setCurrent] = useState(1)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const fetchDrone = async () => {
    setLoading(true)
    await DroneDatasource.getCountDroneBrandList(10, current, searchText, sortField, sortDirection)
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchDrone()
  }, [current, sortDirection])
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }

  const removeDroneBrand = (data: DroneBrandEntity) => {
    Swal.fire({
      title: 'ยืนยันการลบ',
      text: 'โปรดตรวจสอบยี่ห้อโดรนที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อข้อมูลยี่ห้อโดรนและรุ่นโดรนในระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบ',
      confirmButtonColor: '#d33',
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DroneDatasource.deleteDroneBrand(data.id)
      }
      fetchDrone()
    })
  }
  const pageTitle = (
    <div className='container d-flex pb-3' style={{ padding: '8px' }}>
      <div className='col-lg-6'>
        <span
          className='card-label font-weight-bolder text-dark'
          style={{ fontSize: 22, fontWeight: 'bold', padding: '8px' }}
        >
          <strong>ยี่ห้อโดรน (Drone Brand)</strong>
        </span>
      </div>
      <div className='col-lg-3 p-1'>
        <Input
          style={{ height: 35 }}
          allowClear
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder='ค้นหาชื่อยี่ห้อโดรน'
          className='col-lg-12 p-1'
          onChange={changeTextSearch}
        />
      </div>
      <div className='col-lg p-1'>
        <Button
          style={{
            height: 35,
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          className='col-lg-12'
          onClick={fetchDrone}
        >
          ค้นหาข้อมูล
        </Button>
      </div>
      <div className='col-lg p-1'>
        <Button
          style={{
            height: 35,
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() => navigate('/AddDroneBrand')}
        >
          + เพิ่มยี่ห้อโดรน
        </Button>
      </div>
    </div>
  )
  const columns = [
    {
      title: 'ชื่อยี่ห้อ/แบรนด์',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนรุ่นโดรน
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('drone')
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
      dataIndex: 'drone',
      key: 'drone',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{row.drone !== 0 ? `${row.drone + ' ' + 'รุ่น'}` : 0 + ' ' + 'รุ่น'}</span>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนเครื่องโดรน
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('droneCount')
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
      dataIndex: 'droneCount',
      key: 'droneCount',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{row.droneCount !== 0 ? `${row.droneCount + ' ' + 'ลำ'}` : 0 + ' ' + 'ลำ'}</span>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '10%',
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
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            อัพเดตล่าสุด
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
                setSortDirection3((prev) => {
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
                  color: sortDirection3 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection3 === 'DESC' ? '#ffca37' : 'white',
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
          children: <span> {moment(row.updatedAt).format('DD/MM/YYYY, HH:mm')}</span>,
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '13%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row' style={{ justifyContent: 'center' }}>
              <div className='col-lg-4'>
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/EditDroneBrand/id=' + row.id)}
                />
              </div>
              {row.drone === 0 ? (
                <div>
                  <ActionButton
                    icon={<DeleteOutlined />}
                    color={color.Error}
                    onClick={() => removeDroneBrand(row)}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    disabled
                    style={{ borderRadius: 5 }}
                    icon={<DeleteOutlined />}
                    color={color.Disable}
                  />
                </div>
              )}
            </div>
          ),
        }
      },
    },
  ]
  return (
    <>
      {pageTitle}
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table columns={columns} dataSource={data.data} pagination={false} />
      </Spin>
      <div className='d-flex justify-content-between pt-4 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination current={current} onChange={onChangePage} total={data?.count} />
      </div>
    </>
  )
}

export default IndexDroneBrand
