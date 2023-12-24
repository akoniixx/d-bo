import { Badge, Button, Input, Pagination, PaginationProps, Select, Spin, Table, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { color, image } from '../../../resource'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import ActionButton from '../../../components/button/ActionButton'
import { useNavigate } from 'react-router-dom'
import { ProviceEntity } from '../../../entities/LocationEntities'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import icon from '../../../resource/icon'

function IndexListStore() {
  const [status, setStatus] = useState<any>()
  const [provinceSelect, setProvinceSelect] = useState<any>()
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [province, setProvince] = useState<ProviceEntity[]>([])
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)

  const navigate = useNavigate()
  useEffect(() => {
    const fetchProvince = async () => {
      await LocationDatasource.getProvince().then((res) => {
        setProvince(res)
      })
    }

    fetchProvince()
  }, [])

  const tabConfigurations = [
    { title: 'ใช้งาน', key: 'ACTIVE' },
    { title: 'ปิดการใช้งาน', key: 'INACTIVE' },
  ]
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            รหัสร้านค้า
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('updatedAt')
                setSortDirection((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
                  } else {
                    return undefined
                  }
                })
                setSortDirection1((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
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
                  color: sortDirection1 === 'asc' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection1 === 'desc' ? '#ffca37' : 'white',
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
            ชื่อร้านค้า
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('name')
                setSortDirection((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
                  } else {
                    return undefined
                  }
                })
                setSortDirection2((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
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
                  color: sortDirection2 === 'asc' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection2 === 'desc' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'shopName',
      key: 'shopName',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div className='container'>
                <span className='text-dark-75  d-block font-size-lg'>{value}</span>
                <div>
                  <span className=' d-block font-size-lg' style={{ color: color.Grey }}>
                    {row.codeName}
                  </span>
                </div>
              </div>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อเจ้าของร้าน',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'tel',
      key: 'tel',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: 'จังหวัด',
      dataIndex: 'province',
      key: 'province',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            รายการยา / ปุ๋ย
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('count')
                setSortDirection((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
                  } else {
                    return undefined
                  }
                })
                setSortDirection3((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
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
                  color: sortDirection3 === 'asc' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection3 === 'desc' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'fer',
      key: 'fer',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(value)} รายการ</span>,
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: row.status !== 'INACTIVE' ? color.Success : color.Error,
              }}
            >
              <Badge color={row.status !== 'INACTIVE' ? color.Success : color.Error} />{' '}
              {row.status === 'INACTIVE' ? 'ปิดการใช้งาน' : 'ใช้งาน'}
            </span>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              <div className='pr-1'>
                <ActionButton
                  icon={
                    <img
                      src={icon.fertilizer}
                      style={{ width: 30, height: 30, paddingBottom: '10%' }}
                    />
                  }
                  color={color.primary1}
                  // onClick={() => navigate('/DetailStore')}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/DetailStore')}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
  const data = [
    {
      updatedAt: 'CL000001',
      shopName: 'ไม้เมืองการเกษตร',
      codeName: '3350700008073',
      name: 'สายไหม เกษตรจ๋า',
      tel: '0989284761',
      province: 'สระบุรี',
      fer: 3500,
      status: 'ACTIVE',
    },
    {
      updatedAt: 'CL000002',
      shopName: 'สมรักษ์รักป่า',
      codeName: '3350700008073',
      name: 'นายครี มีงานทำ',
      tel: '0887787442',
      province: 'อ่างทอง',
      fer: 10500,
      status: 'ACTIVE',
    },
    {
      updatedAt: 'Cl000003',
      shopName: 'อุดมการณ์ยิ่งใหญ่',
      codeName: '3350700008073',
      name: 'สมควร แล้ว',
      tel: '0928077231',
      province: 'ชัยนาท',
      fer: 720,
      status: 'ACTIVE',
    },
  ]
  const emptyState = {
    emptyText: (
      <div style={{ textAlign: 'center', padding: '4%' }}>
        <img src={image.empty_shop} style={{ width: 90, height: 90 }} />
        <p>ยังไม่มีข้อมูลร้านค้า</p>
      </div>
    ),
  }
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <span className='p-3'>
            <strong style={{ fontSize: '20px' }}>รายชื่อร้านค้า </strong>
          </span>
        </div>
      </div>
      <div className='pt-3'>
        <Tabs
          className={status === 'INACTIVE' ? 'tab-status-inactive' : ''}
          onChange={(key: any) => setStatus(key)}
          type='card'
        >
          {tabConfigurations.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={tab.key} />
          ))}
        </Tabs>
      </div>
      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-8 p-1'>
          <Input
            placeholder='ค้นหาชื่อรัหสร้านค้า / ชื่อร้านค้า / หมายเลขนิติบุคคล / เบอร์โทร'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกจังหวัด'
            onChange={(province: any) => setProvinceSelect(province)}
            showSearch
            value={provinceSelect}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {province?.map((item, index) => (
              <option key={index} value={item.provinceId.toString()}>
                {item.provinceName}
              </option>
            ))}
          </Select>
        </div>
        <div className='col-lg-1 p-1'>
          <Button
            className='col-lg-12'
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>

      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          locale={emptyState}
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data.length} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={(page: number) => setCurrent(page)}
          onShowSizeChange={onShowSizeChange}
          total={data.length}
        />
      </div>
    </div>
  )
}

export default IndexListStore
