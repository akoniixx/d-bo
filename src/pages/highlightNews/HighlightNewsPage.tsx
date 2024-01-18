import { Badge, Button, Input, Pagination, PaginationProps, Select, Spin, Table, Tabs } from 'antd'
import { Option } from 'antd/lib/mentions'
import React, { useEffect, useState } from 'react'
import { color, icon } from '../../resource'
import { useNavigate } from 'react-router-dom'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import ActionButton from '../../components/button/ActionButton'
import { STATUS_COLOR_HIGHLIGHT, STATUS_HIGHLIGHT } from '../../definitions/Status'
import { HighlightDatasource } from '../../datasource/HighlightDatasource'
import { AllHighlightEntities } from '../../entities/HighlightEntities'
import { numberWithCommas } from '../../utilities/TextFormatter'
import ModalDelete from '../../components/modal/ModalDelete'

function HighlightNewsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AllHighlightEntities>()
  const [status, setStatus] = useState<string>('ACTIVE')
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [searchText, setSearchText] = useState<string>('')
  const [application, setApplication] = useState<any>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<any>()
  const [summary, setSummary] = useState<AllHighlightEntities>()

  const fetchNewsHighlight = async () => {
    await HighlightDatasource.getNewsHighlight(
      current,
      row,
      status,
      application,
      searchText,
      sortField,
      sortDirection,
    ).then((res: AllHighlightEntities) => {
      setData(res)
    })
  }

  useEffect(() => {
    fetchNewsHighlight()
  }, [current, sortDirection, status])

  const onChangeApplication = (e: string) => {
    setApplication(e)
  }
  const showDelete = (id: string) => {
    setDeleteId(id)
    setModalDelete(!modalDelete)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }

  const tabConfigurations = [
    {
      title: `ใช้งาน (${numberWithCommas(parseFloat(data?.summary[0].active || '0'))})`,
      key: 'ACTIVE',
    },
    {
      title: `รอเผยแพร่ (${numberWithCommas(parseFloat(data?.summary[0].pending || '0'))})`,
      key: 'PENDING',
    },
    {
      title: `แบบร่าง (${numberWithCommas(parseFloat(data?.summary[0].drafting || '0'))})`,
      key: 'DRAFTING',
    },
    {
      title: `ปิดการใช้งาน (${numberWithCommas(parseFloat(data?.summary[0].inactive || '0'))})`,
      key: 'INACTIVE',
    },
  ]

  const PageTitle = (
    <div className='row pb-4'>
      <div className='col-lg-4' style={{ padding: '10px' }}>
        <div className='col-lg'>
          <span
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>ข่าวสารไฮไลท์</strong>
          </span>
        </div>
      </div>
      <div className='col-lg justify-content-end' style={{ padding: '10px' }}>
        <div className='row d-flex justify-content-end'>
          <div className='col-lg-5'>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder='ค้นหาชื่อข่าวสาร'
              className='col-lg-12 p-1'
              onChange={(e: any) => setSearchText(e.target.value)}
            />
          </div>
          <div className='col-lg'>
            <Select
              className='col-lg-12'
              placeholder='เลือกแอปพลิเคชัน'
              onChange={onChangeApplication}
              showSearch
              value={application}
              allowClear
              optionFilterProp='children'
              filterOption={(input: any, option: any) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value={'FARMER'}>Farmer App</Option>
              <Option value={'DRONER'}>Droner App</Option>
            </Select>
          </div>
          <div className='col-lg-2'>
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
                fetchNewsHighlight()
              }}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
          <div className='col-lg-2'>
            <Button
              className='col-lg-12'
              onClick={() => navigate('/AddHighlightPage')}
              style={{
                borderColor: color.Success,
                borderRadius: '5px',
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
            >
              + ข่าวสารไฮไลท์
            </Button>
          </div>
        </div>
      </div>
      <div className='pt-3'>
        <Tabs onChange={(key: any) => setStatus(key)} type='card'>
          {tabConfigurations.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={tab.key}></Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            วันที่เผยแพร่
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('startDate')
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
      dataIndex: 'updateAt',
      key: 'updateAt',
      width: '16%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.startDate || row.endDate
                  ? DateTimeUtil.formatDateTime(row.startDate) +
                    ' - ' +
                    DateTimeUtil.formatDateTime(row.endDate)
                  : '-'}
              </span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อข่าวสารไฮไลท์
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'แอปพลิเคชัน',
      dataIndex: 'application',
      key: 'application',
      render: (value: any, row: any, index: number) => {
        return {
          children:
            row.application === 'FARMER' ? (
              <div className='container'>
                <span
                  style={{
                    color: '#000',
                  }}
                >
                  <img src={icon.farmerApp} style={{ width: '30px', height: '30px' }} />{' '}
                  {'Farmer App'}
                </span>
              </div>
            ) : (
              <div className='container'>
                <span
                  style={{
                    color: '#000',
                  }}
                >
                  <img src={icon.dronerApp} style={{ width: '30px', height: '30px' }} />{' '}
                  {'Droner App'}
                </span>
              </div>
            ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            กดลิ้งค์
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('read')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection5((prev) => {
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
                  color: sortDirection5 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection5 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'read',
      key: 'read',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.read) || 0} ครั้ง</span>,
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
            <div className='container'>
              <Badge color={STATUS_COLOR_HIGHLIGHT[row.status]} />
              <span style={{ color: STATUS_COLOR_HIGHLIGHT[row.status], paddingLeft: '6px' }}>
                {STATUS_HIGHLIGHT[row.status]}
              </span>
              <div className='d-flex'>
                <span style={{ color: color.Grey }}>
                  <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 0.5 }} />
                  {row.createBy ?? '-'}
                </span>
              </div>
            </div>
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
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => {
                    navigate('/EditAddHighlightPage/id=' + row.id)
                  }}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => {
                    showDelete(row.id)
                  }}
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
      {PageTitle}
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
        />
      </div>
      <ModalDelete
        show={modalDelete}
        title1={'โปรดตรวจสอบข่าวสารไฮไลท์ที่คุณต้องการลบ ก่อนที่จะกดยืนยัน'}
        title2={' การลบ เพราะอาจส่งผลต่อการแสดงผลในแอปพลิเคชัน'}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={async () => {
          setLoading(true)
          await HighlightDatasource.deleteNewsHighlightById(deleteId)
            .then((res) => {
              if (res) {
                setModalDelete(!modalDelete)
                fetchNewsHighlight()
              }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
        }}
      />
    </div>
  )
}

export default HighlightNewsPage
