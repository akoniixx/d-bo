import DatePicker from 'antd/lib/date-picker'
import React, { useEffect, useRef, useState } from 'react'
import Search from 'antd/lib/input/Search'
import AddButtton from '../../components/button/AddButton'
import Select from 'antd/lib/select'
import { Option } from 'antd/lib/mentions'
import Table from 'antd/lib/table'
import Pagination from 'antd/lib/pagination'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { CouponDataSource } from '../../datasource/CouponDatasource'
import { CouponListEntities, CouponQueryEntities } from '../../entities/CouponEntites'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { Badge, Button, Image, Spin } from 'antd'
import icon from '../../resource/icon'
import ActionButton from '../../components/button/ActionButton'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { color } from '../../resource'
import ModalDeleteCoupon from '../../components/modal/ModalDeleteCoupon'
import { STATUS_COUPON } from '../../definitions/Status'
import { DashboardLayout } from '../../components/layout/Layout'

function PromotionPage() {
  const dateSearchFormat = 'YYYY-MM-DD'
  const dateFormat = 'DD/MM/YYYY'
  const navigate = useNavigate()
  const { RangePicker } = DatePicker
  const row = 10
  const fetchTwice = useRef(true)
  const [couponId, setCouponId] = useState('')
  const stateChange = useRef(false)
  const [searchText, setSearchText] = useState<string>('')
  const [current, setCurrent] = useState(1)
  const [startDate, setStartDate] = useState<string>('')
  const [expiredDate, setExpiredDate] = useState<string>('')
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [data, setData] = useState<CouponListEntities>({
    count: 0,
    promotions: [],
  })
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [sortStatus, setSortStatus] = useState<string>()
  const [sortCoupon, setSortCoupon] = useState<string>()
  const [sortType, setSortType] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection, setSortDirection] = useState<string | undefined>()

  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)

  const fetchCouponList = () => {
    setLoading(true)
    CouponDataSource.getCoupons(
      current,
      row,
      sortStatus,
      sortCoupon,
      sortType,
      startDate,
      expiredDate,
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
    fetchCouponList()
  }, [current, startDate, expiredDate, sortDirection])

  const handleChangeStatus = (status: any) => {
    setSortStatus(status)
  }
  const handleChangeCoupon = (type: any) => {
    setSortCoupon(type)
  }
  const handleChangePromotionType = (type: any) => {
    setSortType(type)
  }
  const handleChangeDateRange = (date: any) => {
    if (date != null) {
      setStartDate(moment(new Date(date[0])).format(dateSearchFormat))
      setExpiredDate(moment(new Date(date[1])).format(dateSearchFormat))
    } else {
      setStartDate(date)
      setExpiredDate(date)
    }
    setCurrent(1)
  }
  const handleSearchText = (text: any) => {
    setSearchText(text.target.value)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const duplicateCoupon = (id: string) => {
    CouponDataSource.queryCoupon(id)
      .then((res) => {
        const couponDto = {
          couponName: `${res.couponName} (คัดลอก)`,
          couponType: res.couponType,
          promotionStatus: 'DRAFTING',
          promotionType: res.promotionType,
          discountType: res.discountType,
          discount: res.discount,
          count: res.count,
          keep: res.count,
          used: 0,
          description: res.description,
          condition: res.condition,
          conditionSpecialFirsttime: res.conditionSpecialFirsttime,
          couponConditionRai: res.couponConditionRai,
          couponConditionRaiMin: res.couponConditionRaiMin,
          couponConditionRaiMax: res.couponConditionRaiMax,
          couponConditionService: res.couponConditionService,
          couponConditionServiceMin: res.couponConditionServiceMin,
          couponConditionServiceMax: res.couponConditionServiceMax,
          couponConditionPlant: res.couponConditionPlant,
          couponConditionPlantList: res.couponConditionPlantList,
          couponConditionProvince: res.couponConditionProvince,
          couponConditionProvinceList: res.couponConditionProvinceList,
          createBy: profile.username + ' ' + profile.lastname,
          conditionSpecificFarmer: res.specificFarmer,
        }
        CouponDataSource.addCoupon(couponDto)
          .then((resSave) => {
            setData({
              count: data.count + 1,
              promotions: [
                {
                  id: resSave.id,
                  couponCode: resSave.couponCode,
                  couponName: resSave.couponName,
                  couponType: resSave.couponType,
                  promotionStatus: resSave.promotionStatus,
                  promotionType: resSave.promotionType,
                  discountType: resSave.discountType,
                  discount: resSave.discount,
                  count: resSave.count,
                  keep: resSave.count,
                  used: resSave.used,
                  startDate: resSave.startDate,
                  expiredDate: resSave.expiredDate,
                  description: resSave.description,
                  condition: resSave.condition,
                  conditionSpecialFirsttime: resSave.conditionSpecialFirsttime,
                  couponConditionRai: resSave.couponConditionRai,
                  couponConditionRaiMin: resSave.couponConditionRaiMin,
                  couponConditionRaiMax: resSave.couponConditionRaiMax,
                  couponConditionService: resSave.couponConditionService,
                  couponConditionServiceMin: resSave.couponConditionServiceMin,
                  couponConditionServiceMax: resSave.couponConditionServiceMax,
                  couponConditionPlant: resSave.couponConditionPlant,
                  couponConditionPlantList: resSave.couponConditionPlantList,
                  couponConditionProvince: resSave.couponConditionProvince,
                  couponConditionProvinceList: resSave.couponConditionProvinceList,
                  createBy: resSave.createBy,
                  conditionSpecificFarmer: false,
                },
                ...data.promotions,
              ],
            })
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }
  const showDelete = (id: string) => {
    setCouponId(id)
    setModalDelete(!modalDelete)
  }
  const deleteCoupon = () => {
    CouponDataSource.deleteCoupon(couponId)
      .then((res) => {
        setModalDelete(!modalDelete)
        fetchCouponList()
      })
      .catch((err) => console.log(err))
  }

  const PageTitle = (
    <>
      <div className='container d-flex justify-content-between' style={{ padding: '10px' }}>
        <div>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>คูปอง (Coupon)</strong>
          </span>
        </div>
        <div className='d-flex'>
          <RangePicker allowClear onCalendarChange={handleChangeDateRange} format={dateFormat} />
          <div className='ps-3'>
            <AddButtton text='เพิ่มคูปอง' onClick={() => navigate('/AddPromotion')} />
          </div>
        </div>
      </div>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg-3'>
          <Search
            placeholder='ค้นหาชื่อคูปอง หรือรหัส'
            className='col-lg-12 p-1'
            // value={searchText}
            onChange={(e: any) => handleSearchText(e)}
          />
        </div>
        <div className='col'>
          <Select
            className='col-lg-12 p-1'
            placeholder='เลือกประเภทคูปอง'
            onChange={handleChangeCoupon}
            showSearch
            value={sortCoupon}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={'INJECTION'}>ส่วนลดการฉีดพ่น</Option>
            <Option value={'DRUG'}>ส่วนลดปุ๋ยและยา</Option>
          </Select>
        </div>
        <div className='col'>
          <Select
            className='col-lg-12 p-1'
            placeholder='เลือกรูปแบบคูปอง'
            onChange={handleChangePromotionType}
            showSearch
            value={sortType}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={'ONLINE'}>ออนไลน์ (Online)</Option>
            <Option value={'OFFLINE'}>ออฟไลน์ (Offline)</Option>
          </Select>
        </div>
        <div className='col'>
          <Select
            className='col-lg-12 p-1'
            onClear={() => {}}
            placeholder='เลือกสถานะ'
            onChange={handleChangeStatus}
            showSearch
            value={sortStatus}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={'ACTIVE'}>ใช้งาน</Option>
            <Option value={'DRAFTING'}>รอเปิดใช้งาน</Option>
            <Option value={'INACTIVE'}>ปิดการใช้งาน</Option>
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
              fetchCouponList()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อคูปอง
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('couponName')
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
      dataIndex: 'couponName',
      key: 'couponName',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span
                className='text-dark-75  d-block font-size-lg'
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {row.couponName}
              </span>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#7B7B7B',
                }}
              >
                {row.couponCode && 'รหัส : ' + row.couponCode}
              </p>
            </div>
          ),
        }
      },
    },
    {
      title: 'ประเภทคูปอง',
      dataIndex: 'couponType',
      key: 'couponType',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.couponType === 'INJECTION' ? 'ส่วนลดการฉีดพ่น' : 'ส่วนลดปุ๋ยและยา'}
              </span>
            </div>
          ),
        }
      },
    },
    {
      title: 'รูปแบบ',
      dataIndex: 'promotionType',
      key: 'promotionType',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.promotionType === 'ONLINE' ? 'ออนไลน์' : 'ออฟไลน์'}
              </span>
              <p>{row.promotionType === 'ONLINE' ? '(Online)' : '(Offline)'}</p>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ช่วงเวลาเริ่มต้น - สิ้นสุด
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('expiredDate')
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
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container d-flex align-items-center'>
              <div className='pe-2'>
                <ClockCircleOutlined style={{ color: color.Success, fontSize: '20px' }} />
              </div>
              <div>
                <span className='text-dark-75  d-block font-size-lg'>
                  {!row.startDate ? '' : DateTimeUtil.formatDateTime(row.startDate)}
                </span>
                <span className='text-dark-75  d-block font-size-lg'>
                  - {!row.expiredDate ? '' : DateTimeUtil.formatDateTime(row.expiredDate)}
                </span>
                {DateTimeUtil.calculateDay(row.expiredDate) > 0 && (
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#7B7B7B',
                      fontWeight: 400,
                    }}
                  >
                    เหลือเวลาอีก{' '}
                    {!row.expiredDate ? '' : DateTimeUtil.calculateDay(row.expiredDate)} วัน
                  </span>
                )}
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
            ทั้งหมด{' '}
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
      dataIndex: 'count',
      key: 'count',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>{row.count | 0} สิทธิ์</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            เก็บแล้ว{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('keep')
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
      dataIndex: 'keep',
      key: 'keep',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>{row.keep} สิทธิ์</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ถูกใช้แล้ว{' '}
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
      dataIndex: 'used',
      key: 'used',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>{row.used | 0} สิทธิ์</span>
            </div>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'promotionStatus',
      key: 'promotionStatus',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span
                style={{
                  color:
                    row.promotionStatus === 'ACTIVE'
                      ? color.Success
                      : row.promotionStatus === 'INACTIVE'
                      ? color.Error
                      : color.Grey,
                }}
              >
                <Badge
                  color={
                    row.promotionStatus === 'ACTIVE'
                      ? color.Success
                      : row.promotionStatus === 'INACTIVE'
                      ? color.Error
                      : color.Grey
                  }
                />{' '}
                {STATUS_COUPON[row.promotionStatus]}
              </span>
              <div className='d-flex'>
                <span style={{ color: color.Grey }}>
                  <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 0.5 }} />
                  {row.createBy ?? ' - (Admin)'}
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
                    navigate('/EditPromotion/id=' + row.id)
                  }}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<img src={icon.iconcopy} width={12} height={14} />}
                  color={color.primary1}
                  onClick={() => {
                    duplicateCoupon(row.id)
                  }}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={row.used > 0 ? color.Grey : color.Error}
                  onClick={() => showDelete(row.id)}
                  actionDisable={row.used > 0 ? true : false}
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
      <ModalDeleteCoupon
        show={modalDelete}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => {
          deleteCoupon()
        }}
      />
      {PageTitle}
      <br />
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          columns={columns}
          dataSource={data.promotions}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Spin>

      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data.count} รายการ</p>
        <Pagination
          current={current}
          total={data.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  )
}

export default PromotionPage
