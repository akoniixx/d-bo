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

function DronerInfinity() {
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
 

  const tabConfigurations = [
    { title: 'ใช้งาน', key: 'ACTIVE' },
    { title: 'ยกเลิก', key: 'CANCEL' },
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
            ชื่อนักบินโดรน
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
              <div className='container'>
                <span className='text-dark-75  d-block font-size-lg'>โดรนเนอร์ พ่นปุ๋ย 1</span>
                <div>
                  <span className=' d-block font-size-lg' style={{ color: color.Grey }}>
                    DN00000001{' '}
                  </span>
                </div>
              </div>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            เบอร์โทร
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
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span className=' d-block font-size-lg' >
              081-234-5678
            </span>
          ),
        }
      },
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'like',
      key: 'like',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>บ่อถ้ำ/ขาณุวรลักษบุรี/กำแพงเพชร</span>,
        }
      },
    },
    {
      title: 'แต้มสะสม',
      dataIndex: 'like',
      key: 'like',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>30,000</span>,
        }
      },
    },
    {
      title: 'เครดิต',
      dataIndex: 'commentCount',
      key: 'commentCount',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>1</span>,
        }
      },
    },
    {
      title: 'จำนวนยา / ปุ๋ย',
      dataIndex: 'view',
      key: 'view',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>10 ขวด / 1 กระสอบ</span>,
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
                    color: row.status !== 'CANCEL' ? color.Success : color.Error,
                  }}
                >
                  <Badge color={row.status !== 'CANCEL' ? color.Success : color.Error} />{' '}
                  {row.status === 'CANCEL' ? 'ปิดการใช้งาน' : 'ใช้งาน'}
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
                {/* <ActionButton
                  icon={
                    <img
                      src={icon.fertilizer}
                      style={{ width: 30, height: 30, paddingBottom: '10%' }}
                    />
                  }
                  color={color.primary1}
                  // onClick={() => navigate('/DetailStore')}
                /> */}
              </div>
            </div>
          ),
        }
      },
    },
  ]
  const data = [{}]
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
            <strong style={{ fontSize: '20px' }}>รายชื่อนักบินโดรน (แนะนำยา / ปุ๋ย) </strong>
          </span>
        </div>
      </div>
      <div className='pt-3'>
        <Tabs
          className={status === 'CANCEL' ? 'tab-status-inactive' : ''}
          onChange={(key: any) => setStatus(key)}
          type='card'
        >
          {tabConfigurations.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={tab.key} />
          ))}
        </Tabs>
      </div>
      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-6 p-1'>
          <Input
            placeholder='ค้นหาชื่อนักบิน / เบอร์โทร / ID นักบินโดรน'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกที่อยู่นักบินโดรน'
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
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกจำนวนเครดิต'
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

export default DronerInfinity
