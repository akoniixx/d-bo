import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { color, icon } from '../../../resource'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import ActionButton from '../../../components/button/ActionButton'
import { ColumnsType } from 'antd/lib/table'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { useNavigate } from 'react-router-dom'
import { RewardDatasource } from '../../../datasource/RewardDatasource'
import { GetAllRewardEntities } from '../../../entities/RewardEntites'
import { REWARD_STATUS } from '../../../definitions/Status'

function IndexRewardFarmer() {
  const navigate = useNavigate()
  const { RangePicker } = DatePicker
  const dateFormat = 'DD/MM/YYYY'
  const dateSearchFormat = 'YYYY-MM-DD'
  const row = 10
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<GetAllRewardEntities>()
  const [startExchangeDate, setStartExchangeDate] = useState<any>(null)
  const [expiredExchangeDate, setExpiredExchangeDate] = useState<any>(null)
  const [status, setStatus] = useState<any>()
  const [rewardType, setRewardType] = useState<any>()
  const [rewardExchange, setRewardExchange] = useState<any>()
  const [searchText, setSearchText] = useState<any>()
  const [visible, setVisible] = useState(false)
  const handleVisible = (newVisible: any) => {
    setVisible(newVisible)
  }
  const [showModal, setShowModal] = useState(false)
  const [rewardId, setRewardId] = useState('')
  const [checkedListDigi, setCheckedListDigi] = useState<CheckboxValueType[]>()
  const [checkedListPhy, setCheckedListPhy] = useState<CheckboxValueType[]>()
  const [inDigi, setInDigi] = useState(false)
  const [inPhy, setInPhy] = useState(false)
  const [checkAllDigi, setCheckAllDigi] = useState(false)
  const [checkAllPhy, setCheckAllPhy] = useState(false)
  const [statusArr, setStatusArr] = useState<string[]>([])
  const statusOptions = ['SCORE', 'MISSION']
  const [loading, setLoading] = useState(false)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)
  const [sortDirection6, setSortDirection6] = useState<string | undefined>(undefined)
  const [sortDirection7, setSortDirection7] = useState<string | undefined>(undefined)

  const getAllReward = () => {
    setLoading(true)
    RewardDatasource.getAllReward(
      'FARMER',
      row,
      current,
      startExchangeDate,
      expiredExchangeDate,
      status,
      rewardType,
      rewardExchange,
      searchText,
      sortDirection,
      sortField,
    )
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getAllReward()
  }, [current, startExchangeDate, expiredExchangeDate, sortDirection])
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setStartExchangeDate(moment(new Date(e[0])).format(dateSearchFormat))
      setExpiredExchangeDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setStartExchangeDate(e)
      setExpiredExchangeDate(e)
    }
    setCurrent(1)
  }
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
  }

  const onChangeStatus = (checkedValues: any) => {
    setStatus(checkedValues)
  }

  const onCheckAllPhysical = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let arr: any = 0
    if (checked === true) {
      arr = [...statusArr, value]
      setStatusArr([...statusArr, value])
      setRewardType(value)
    } else {
      const d: string[] = statusArr.filter((x) => x != value)
      arr = [...d]
      setStatusArr(d)
      if (d.length == 0) {
        arr = undefined
      }
      setRewardType(undefined)
    }
    setRewardType(arr)
    setCheckedListPhy(e.target.checked ? statusOptions : [])
    setInPhy(false)
    setCheckAllPhy(e.target.checked)
  }
  const onCheckAllDigital = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let arr: any = 0
    if (checked === true) {
      arr = [...statusArr, value]
      setStatusArr([...statusArr, value])
      setRewardType(value)
    } else {
      const d: string[] = statusArr.filter((x) => x != value)
      arr = [...d]
      setStatusArr(d)
      if (d.length == 0) {
        arr = undefined
      }
      setRewardType(undefined)
    }
    setRewardType(arr)
    setCheckedListDigi(e.target.checked ? statusOptions : [])
    setInDigi(false)
    setCheckAllDigi(e.target.checked)
  }
  const onChangeSubPhy = (list: CheckboxValueType[]) => {
    let arr: any = 0
    arr = [...list]
    if (arr.length > 0) {
      setRewardType('PHYSICAL')
    } else {
      setRewardType(undefined)
    }
    setRewardExchange(arr)
    setCheckedListPhy(list)
    setInPhy(!!list.length && list.length < statusOptions.length)
    setCheckAllPhy(list.length === statusOptions.length)
  }

  const onChangeSubDigi = (list: CheckboxValueType[]) => {
    let arr: any = 0
    arr = [...list]
    if (arr.length > 0) {
      setRewardType('DIGITAL')
    } else {
      setRewardType(undefined)
    }
    setRewardExchange(arr)
    setCheckedListDigi(list)
    setInDigi(!!list.length && list.length < statusOptions.length)
    setCheckAllDigi(list.length === statusOptions.length)
  }
  const statusRewardType = (
    <Menu
      items={[
        {
          label: (
            <>
              <Checkbox
                indeterminate={inPhy}
                onChange={onCheckAllPhysical}
                checked={checkAllPhy}
                value='PHYSICAL'
              >
                Physical
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedListPhy}
                style={{ width: '100%' }}
                onChange={onChangeSubPhy}
              >
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='SCORE'>
                    ใช้แต้ม
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='MISSION'>
                    ภารกิจ
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: '2',
        },
        {
          label: (
            <>
              <Checkbox
                indeterminate={inDigi}
                onChange={onCheckAllDigital}
                checked={checkAllDigi}
                value='DIGITAL'
              >
                Digital
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedListDigi}
                style={{ width: '100%' }}
                onChange={onChangeSubDigi}
              >
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='SCORE'>
                    ใช้แต้ม
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='MISSION'>
                    ภารกิจ
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: '3',
        },
      ]}
    />
  )

  const showDelete = (id: string) => {
    setRewardId(id)
    setShowModal(!showModal)
  }
  const removeReward = () => {
    RewardDatasource.deleteReward(rewardId)
      .then((res) => {
        setShowModal(!showModal)
        setRewardId('')
        getAllReward()
      })
      .catch((err) => console.log(err))
  }

  const PageTitle = (
    <>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg-7 p-1'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>รายการของรางวัล (เกษตรกร)</strong>
          </span>
        </div>
        <div className='col-lg'>
          <RangePicker
            allowClear
            onCalendarChange={(val) => handleSearchDate(val)}
            format={dateFormat}
          />
        </div>
        <div>
          <Button
            style={{
              width: 170,
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate('/AddRewardFarmer')}
          >
            + เพิ่มของรางวัล
          </Button>
        </div>
      </div>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg-6 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อของรางวัล/รหัสของรางวัล'
            className='col-lg-12 p-1'
            onChange={changeTextSearch}
          />
        </div>
        <div className='col-lg p-1'>
          <Dropdown
            overlay={statusRewardType}
            trigger={['click']}
            className='col-lg-12 '
            onVisibleChange={handleVisible}
            visible={visible}
          >
            <Button style={{ color: color.Disable }}>
              เลือกประเภท
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกสถานะ'
            allowClear
            onChange={onChangeStatus}
          >
            {REWARD_STATUS.map((x) => (
              <Checkbox value={x.value}>{x.name}</Checkbox>
            ))}
          </Select>
        </div>
        <div className='pt-1'>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1)
              getAllReward()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )
  const columns: ColumnsType<any> = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            วันที่อัปเดต
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('updateAt')
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
      fixed: 'left',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {moment(row.updateAt).format('DD/MM/YYYY')}, {moment(row.updateAt).format('HH:mm')}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 2 }} />
                {row.createBy ? row.createBy : '-'}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อของรางวัล',
      dataIndex: 'rewardName',
      key: 'rewardName',
      fixed: 'left',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <Col>
                  <Image src={row.imagePath} style={{ width: 50, height: 50 }} preview={false} />
                </Col>
                <Col style={{ padding: 10 }}>
                  <span className='text-dark-75  d-block font-size-lg'>
                    {row.rewardName !== null ? row.rewardName : null}
                  </span>
                  <span style={{ color: color.Grey, fontSize: '12px' }}>{row.rewardNo}</span>
                </Col>
              </Row>
            </>
          ),
        }
      },
    },
    {
      title: 'ประเภทของรางวัล',
      dataIndex: 'rewardType',
      key: 'rewardType',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.rewardType === 'DIGITAL' ? 'Digital' : 'Physical'}
                {row.rewardExchange === 'SCORE' ? (
                  <span style={{ color: color.secondary1, fontSize: '12px' }}>{` (ใช้แต้ม)`}</span>
                ) : (
                  <span style={{ color: color.Success, fontSize: '12px' }}>{` (ภารกิจ)`}</span>
                )}
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
            แต้มที่ใช้แลก
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('score')
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
      dataIndex: 'score',
      key: 'score',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {numberWithCommas(row.score) || 0} แต้ม
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
            ช่วงเวลาที่แลก
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('startExchangeDate')
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
      dataIndex: 'startExchangeDate',
      key: 'startExchangeDate',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div style={{ paddingLeft: '3px' }}>
                {row.startExchangeDate
                  ? DateTimeUtil.formatDateTime(row.startExchangeDate) + ' - '
                  : '-'}
              </div>
              <div style={{ paddingLeft: '3px' }}>
                {row.expiredExchangeDate
                  ? DateTimeUtil.formatDateTime(row.expiredExchangeDate)
                  : '-'}
              </div>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ช่วงเวลาที่ใช้ได้
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('startUsedDate')
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
      dataIndex: 'startUsedDate',
      key: 'startUsedDate',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div style={{ paddingLeft: '3px' }}>
                {row.startUsedDate ? DateTimeUtil.formatDateTime(row.startUsedDate) + ' - ' : '-'}
              </div>
              <div style={{ paddingLeft: '3px' }}>
                {row.expiredUsedDate ? DateTimeUtil.formatDateTime(row.expiredUsedDate) : '-'}
              </div>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ทั้งหมด
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('amount')
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
      dataIndex: 'amount',
      key: 'amount',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {numberWithCommas(row.amount)}
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
            แลกแล้ว
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('used')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection6((prev) => {
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
                  color: sortDirection6 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection6 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'used',
      key: 'used',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {numberWithCommas(row.used)}
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
            คงเหลือ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('remain')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection7((prev) => {
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
                  color: sortDirection7 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection7 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'remain',
      key: 'remain',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {numberWithCommas(row.remain)}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      fixed: 'right',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.status === 'ACTIVE' && (
                <span style={{ color: color.Success }}>
                  <Badge color={color.Success} style={{ right: 5 }} />
                  ใช้งาน
                </span>
              )}
              {row.status === 'INACTIVE' && (
                <span style={{ color: color.Error }}>
                  <Badge color={color.Error} style={{ right: 5 }} />
                  ปิดการใช้งาน
                </span>
              )}
              {row.status === 'DRAFTING' && (
                <span style={{ color: color.Grey }}>
                  <Badge color={color.Grey} style={{ right: 5 }} />
                  รอเปิดใช้งาน
                </span>
              )}
            </>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'Action',
      key: 'Action',
      fixed: 'right',
      render: (value: any, row: any, index: number) => {
        const checkDelete = row.status === 'INACTIVE' && row.used === 0
        return {
          children: (
            <div className='d-flex flex-row' style={{ justifyContent: 'center' }}>
              <div className='col-lg-4'>
                <ActionButton
                  icon={
                    <Image
                      src={icon.inforedeem}
                      style={{ width: 20, height: 17 }}
                      preview={false}
                    />
                  }
                  color={color.primary1}
                  onClick={() => navigate('/RedeemHistoryFarmer/id=' + row.id)}
                />
              </div>
              <div className='col-lg-4'>
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/EditRewardFarmer/id=' + row.id)}
                />
              </div>
              <div>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={
                    row.status === 'DRAFTING' || checkDelete === true ? color.Error : color.Grey
                  }
                  onClick={() => showDelete(row.id)}
                  actionDisable={row.status === 'DRAFTING' || checkDelete === true ? false : true}
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
      {PageTitle}
      <br />
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
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>

      {showModal && (
        <Modal
          title='ยืนยันการลบ'
          onCancel={() => {
            setShowModal(!showModal)
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
        >
          <div className='px-4 pt-4'>
            <span className='text-secondary'>
              โปรดตรวจสอบของรางวัลที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ
            </span>
            <p className='text-secondary'>เพราะอาจส่งผลต่อการแลกของรางวัลในระบบ</p>
          </div>
          <Divider
            style={{
              marginBottom: '20px',
            }}
          />
          <div className='d-flex justify-content-between px-4 pt-3 pb-3'>
            <Button
              style={{
                borderColor: color.Error,
                color: color.Error,
              }}
              onClick={() => {
                setShowModal(!showModal)
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Error,
                backgroundColor: color.Error,
                color: color.White,
              }}
              onClick={() => removeReward()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
export default IndexRewardFarmer
