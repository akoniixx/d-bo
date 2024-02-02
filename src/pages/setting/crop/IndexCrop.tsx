import { CaretDownOutlined, CaretUpOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Input, Pagination, Select, Spin, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { color } from '../../../resource'
import { useNavigate } from 'react-router-dom'
import { Option } from 'antd/lib/mentions'
import ActionButton from '../../../components/button/ActionButton'
import { AllCropListEntity } from '../../../entities/CropEntities'
import { CropDatasource } from '../../../datasource/CropDatasource'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../../store/ProfileAtom'

function IndexCrop() {
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null
  const settingRole = useMemo(() => {
    const find = currentRole?.settings.find((el) => el.name === 'รายชื่อพืช')
    return find
  }, [currentRole?.settings])
  const navigate = useNavigate()
  const [data, setData] = useState<AllCropListEntity>()
  const [loading, setLoading] = useState<boolean>(false)
  const [row, setRow] = useState<number>(10)
  const [current, setCurrent] = useState<number>(1)
  const [status, setStatus] = useState<boolean>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    fetchDataCrop()
  }, [sortDirection, current])

  const fetchDataCrop = async () => {
    setLoading(true)
    await CropDatasource.getCropList(current, row, searchText, sortField, sortDirection, status)
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อพืช
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('cropName')
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
      dataIndex: 'cropName',
      key: 'cropName',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>{value}</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ราคาฉีดพ่น
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('maxPrice')
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
      dataIndex: 'maxPrice',
      key: 'maxPrice',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        const checkNull = row.minPrice === null && row.maxPrice === null

        return {
          children: (
            <span style={{ color: color.primary1, fontWeight: '700' }}>{`${
              checkNull ? '-' : row.minPrice + ' - ' + row.maxPrice + ' บาท'
            }`}</span>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ราคาหว่าน
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('maxPriceSow')
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
      dataIndex: 'maxPriceSow',
      key: 'maxPriceSow',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        const checkNull = row.minPriceSow === null && row.maxPriceSow === null

        return {
          children: (
            <span style={{ color: color.primary1, fontWeight: '700' }}>{`${
              checkNull ? '-' : row.minPriceSow + ' - ' + row.maxPriceSow + ' บาท'
            }`}</span>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '14%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: value ? color.Success : color.Error }}>
              <Badge color={value ? color.Success : color.Error} />{' '}
              {value ? 'ใช้งาน' : 'ปิดการใช้งาน'}
            </span>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'cropId',
      key: 'cropId',
      width: '6%',
      render: (value: any, row: any, index: number) => {
        return {
          children: settingRole?.edit.value && (
            <div className='d-flex flex-row justify-content-between'>
              <div className='pr-1'>
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/EditCrop/id=' + value)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
  return (
    <div>
      <div className='pt-3'>
        <div className='row pb-4'>
          <div className='col-lg-4'>
            <span
              className='card-label font-weight-bolder text-dark'
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                padding: '8px',
              }}
            >
              <strong>รายชื่อพืช (Crop)</strong>
            </span>
          </div>
          <div className='col-lg-8 d-flex'>
            <div className='col-lg pt-1 me-2'>
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: color.Disable }} />}
                placeholder='ค้นหาชื่อพืช'
                className='col-lg-12'
                onChange={(e: any) => setSearchText(e.target.value)}
              />
            </div>
            <div className='col-lg-3 pt-1 me-2'>
              <Select
                className='col-lg-12'
                placeholder='เลือกสถานะ'
                onChange={(e) => setStatus(e)}
                showSearch
                value={status}
                allowClear
                optionFilterProp='children'
                filterOption={(input: any, option: any) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value={'true'}>ใช้งาน</Option>
                <Option value={'false'}>ปิดการใช้งาน</Option>
              </Select>
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
                  fetchDataCrop()
                }}
              >
                ค้นหาข้อมูล
              </Button>
            </div>
            {settingRole?.add.value && (
              <div className='pt-1 col-lg-2'>
                <Button
                  className='col-lg-12'
                  onClick={() => navigate('/AddCrop')}
                  style={{
                    borderColor: color.Success,
                    borderRadius: '5px',
                    color: color.secondary2,
                    backgroundColor: color.Success,
                  }}
                >
                  + เพิ่มพืช
                </Button>
              </div>
            )}
          </div>
        </div>
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <Table columns={columns} dataSource={data?.data} pagination={false} />
        </Spin>
        <div className='d-flex justify-content-between pt-3 pb-3'>
          <p>รายการทั้งหมด {data?.count} รายการ</p>
          <Pagination
            current={current}
            total={data?.count}
            onChange={(e) => setCurrent(e)}
            pageSize={row}
          />
        </div>
      </div>
    </div>
  )
}

export default IndexCrop
