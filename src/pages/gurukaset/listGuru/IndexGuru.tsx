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

function IndexGuru() {
  const [loading, setLoading] = useState<boolean>(false)
  const { RangePicker } = DatePicker

  const navigate = useNavigate()
  const [data, setData] = useState<any>()
  const [status, setStatus] = useState<string>('ACTIVE')
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [searchText, setSearchText] = useState<string>('')
  const [application, setApplication] = useState<any>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<string>('')
  const [expiredDate, setExpiredDate] = useState<string>('')
  const [guruType, setGuruType] = useState<any>()
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<any>()

  const fetchNewsHighlight = async () => {
    setLoading(true)
    await HighlightDatasource.getNewsHighlight(
      current,
      row,
      status,
      application,
      searchText,
      sortField,
      sortDirection,
    )
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchNewsHighlight()
  }, [current, sortDirection, status, startDate, expiredDate])

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
      setExpiredDate(moment(new Date(date[1])).format('YYYY-MM-DD'))
    } else {
      setStartDate(date)
      setExpiredDate(date)
    }
    setCurrent(1)
  }
  const type: any = 'บทความ'

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
                {DateTimeUtil.formatDateTime(row.updateAt) || '-'}
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
                  borderColor: type === 'วิดีโอ' ? color.Success : color.Warning,
                  backgroundColor: type === 'วิดีโอ' ? color.primary3 : color.secondary4,
                  padding: '0px 4px 0px 4px',
                }}
              >
                <span
                  style={{
                    color: type === 'วิดีโอ' ? color.Success : color.Warning,
                    fontWeight: 'lighter',
                    fontSize: '13px',
                  }}
                >
                  {type}
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
                setSortField('liked')
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
      dataIndex: 'liked',
      key: 'liked',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.liked) || 0} ครั้ง</span>,
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
                setSortField('commented')
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
      dataIndex: 'commented',
      key: 'commented',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.commented) || 0} ครั้ง</span>,
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
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection4((prev) => {
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
                  color: sortDirection4 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection4 === 'DESC' ? '#ffca37' : 'white',
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
          children: <span>{formatNumberToK(1500) || 0} ครั้ง</span>,
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
                    navigate('/EditGuru/id=' + row.id)
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
        <div className='col-lg-7 p-1'>
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
            onChange={(type: any) => setGuruType(type)}
            showSearch
            value={guruType}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={'1'}>บทความ</Option>
            <Option value={'2'}>วิดีโอ</Option>
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
              // fetchNewsHighlight()
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
        callBack={async () => {
          setModalDelete(!modalDelete)
        }}
      />
    </>
  )
}

export default IndexGuru
