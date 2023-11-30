import {
  Badge,
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Select,
  Spin,
  Table,
  Tabs,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { color, icon } from '../../../resource'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Option } from 'antd/lib/mentions'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { formatNumberToK, numberWithCommas } from '../../../utilities/TextFormatter'
import { STATUS_COLOR_GURU, STATUS_HIGHLIGHT } from '../../../definitions/Status'
import ActionButton from '../../../components/button/ActionButton'
import { HighlightDatasource } from '../../../datasource/HighlightDatasource'
import moment from 'moment'
import ModalDelete from '../../../components/modal/ModalDelete'
import { AllGuruKasetEntities } from '../../../entities/GuruKasetEntities'
import { GuruKasetDataSource } from '../../../datasource/GuruKasetDatasource'

function IndexGuru() {
  const [loading, setLoading] = useState<boolean>(false)
  const { RangePicker } = DatePicker

  const navigate = useNavigate()
  const [data, setData] = useState<AllGuruKasetEntities>()
  const [status, setStatus] = useState<string>('ACTIVE')
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [searchText, setSearchText] = useState<string>('')
  const [application, setApplication] = useState<any>()
  const [type, setType] = useState<any>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<any>()
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)

  const getGuruKaset = async () => {
    setLoading(true)
    await GuruKasetDataSource.getAllGuruKaset(
      current,
      row,
      type,
      status,
      application,
      searchText,
      sortField,
      sortDirection,
      startDate,
      endDate,
    )
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getGuruKaset()
  }, [current, sortDirection, status, startDate, endDate])

  const tabConfigurations = [
    { title: 'ใช้งาน', key: 'ACTIVE' },
    { title: 'รอเผยแพร่', key: 'PENDING' },
    { title: 'แบบร่าง', key: 'DRAFTING' },
    { title: 'ปิดการใช้งาน', key: 'INACTIVE' },
  ]
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const handleChangeDateRange = (date: any) => {
    if (date !== null) {
      setStartDate(moment(new Date(date[0])).format('YYYY-MM-DD'))
      setEndDate(moment(new Date(date[1])).format('YYYY-MM-DD'))
    } else {
      setStartDate(date)
      setEndDate(date)
    }
    setCurrent(1)
  }

  const showDelete = (id: string) => {
    setDeleteId(id)
    setModalDelete(!modalDelete)
  }
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
              <span className='text-dark-75  d-block font-size-lg'>
                {DateTimeUtil.formatDateTime(row.updatedAt) || '-'}
              </span>
              {row.status === 'PENDING' && (
                <span style={{ display: 'flex', alignItems: 'center', color: color.secondary3 }}>
                  <ClockCircleOutlined style={{ marginRight: '5px' }} />
                  ตั้งเวลา
                </span>
              )}
            </div>
          ),
        }
      },
    },
    {
      title: 'ชื่อหัวข้อ/แคปชั่น',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>{row.name || '-'}</span>
              <span
                style={{
                  borderRadius: '5px',
                  border: '1px solid',
                  borderColor: row.type !== 'ARTICLE' ? color.Success : color.Warning,
                  backgroundColor: row.type !== 'ARTICLE' ? color.primary3 : color.secondary4,
                  padding: '0px 4px 0px 4px',
                }}
              >
                <span
                  style={{
                    color: row.type !== 'ARTICLE' ? color.Success : color.Warning,
                    fontWeight: 'lighter',
                    fontSize: '13px',
                  }}
                >
                  {row.type !== 'ARTICLE' ? 'วิดีโอ' : 'บทความ'}
                </span>
              </span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ถูกใจ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('like')
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
      dataIndex: 'like',
      key: 'like',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.like) || 0} ครั้ง</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ความคิดเห็น
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('commentCount')
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
      dataIndex: 'commentCount',
      key: 'commentCount',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.commentCount) || 0} ครั้ง</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            อ่านแล้ว
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('read')
                setSortDirection((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
                  } else {
                    return undefined
                  }
                })
                setSortDirection4((prev) => {
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
                  color: sortDirection4 === 'asc' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection4 === 'desc' ? '#ffca37' : 'white',
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
          children: <span>{formatNumberToK(row.read) || 0} ครั้ง</span>,
        }
      },
    },
    {
      title: 'แอปพลิเคชั่น',
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
                </span>
              </div>
            ),
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
              <Badge color={STATUS_COLOR_GURU[row.status]} />
              <span style={{ color: STATUS_COLOR_GURU[row.status], paddingLeft: '6px' }}>
                {STATUS_HIGHLIGHT[row.status]}
              </span>
              <div className='d-flex'>
                <span style={{ color: color.Grey }}>
                  <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 0.5 }} />
                  {row.updateBy ?? '-'}
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
                {(row.status === 'ACTIVE' || row.status === 'INACTIVE') && (
                  <ActionButton
                    icon={<CommentOutlined />}
                    color={color.primary1}
                    onClick={() => {
                      // navigate('/AddGuru')
                    }}
                  />
                )}
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => {
                    navigate('/EditArticleGuru/id=' + row._id)
                  }}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => {
                    showDelete(row._id)
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
    <>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <span className='p-3'>
            <strong style={{ fontSize: '20px' }}>รายการกูรูเกษตร </strong>
          </span>
        </div>

        <div className='d-flex align-self-center'>
          <div className='p-1'>
            <RangePicker allowClear onCalendarChange={handleChangeDateRange} format='DD/MM/YYYY' />
          </div>
          <div className='p-1'>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key='article' onClick={() => navigate('/AddArticleGuru')}>
                    เพิ่มบทความ
                  </Menu.Item>
                  <Menu.Item key='video' onClick={() => navigate('/AddVideoGuru')}>
                    เพิ่มวิดีโอ
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                style={{
                  backgroundColor: color.primary1,
                  color: color.secondary2,
                  borderColor: color.Success,
                  borderRadius: '5px',
                }}
              >
                + เพิ่มบทความ/วิดีโอ <DownOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Dropdown>
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
      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-6 p-1'>
          <Input
            placeholder='ค้นหาชื่อหัวข้อ / ชื่อแคปชั่น'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกประเภท'
            onChange={(type: any) => setType(type)}
            showSearch
            value={type}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={'ARTICLE'}>บทความ</Option>
            <Option value={'VIDEO'}>วิดีโอ</Option>
          </Select>
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกแอปพลิเคชั่น'
            onChange={(val: any) => setApplication(val)}
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
        <div className='col-lg-1 p-1'>
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
              getGuruKaset()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
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
          onChange={(page: number) => setCurrent(page)}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
        />
      </div>
      <ModalDelete
        show={modalDelete}
        title1={'โปรดตรวจสอบบทความที่คุณต้องการลบก่อนที่จะกดยืนยันการลบ '}
        title2={'เพราะอาจต่อการแสดงผลบทความในระบบแอปพลิเคชัน'}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => {
          GuruKasetDataSource.deleteGuru(deleteId).then((res) => {
            if (res) {
              setModalDelete(!modalDelete)
              getGuruKaset()
            }
          })
        }}
      />
    </>
  )
}

export default IndexGuru
