import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Checkbox, DatePicker, Input, Pagination, Select, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIconButton } from '../../../components/button/BackButton'
import color from '../../../resource/color'
import { RewardDatasource } from '../../../datasource/RewardDatasource'
import { GetAllDronerRewardHistoryEntities } from '../../../entities/RewardEntites'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import {
  COLOR_QUOTA_REDEEM,
  COLOR_QUOTA_REDEEM_DIG,
  REWARD_REDEEM_HIS_DIG_STATUS,
  REWARD_REDEEM_HIS_STATUS,
  STATUS_QUOTA_REDEEM,
  STATUS_QUOTA_REDEEM_DIG,
} from '../../../definitions/Status'

const _ = require('lodash')
function RedeemHistoryFarmer() {
  const queryString = _.split(window.location.pathname, '=')
  const { RangePicker } = DatePicker
  const [data, setData] = useState<GetAllDronerRewardHistoryEntities>()
  const [dataRewardNo, setDataRewardNo] = useState<any | undefined>()
  const [rewardType, setRewardType] = useState<any | undefined>()
  const [rewardExChange, setRewardExchange] = useState<any | undefined>()
  const [current, setCurrent] = useState(1)
  const row = 10
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [status, setStatus] = useState()
  const [searchText, setSearchText] = useState()
  const dateFormat = 'DD/MM/YYYY'
  const dateSearchFormat = 'YYYY-MM-DD'
  const navigate = useNavigate()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()

  const fetchData = () => {
    RewardDatasource.getAllFarmerRewardHistory(
      queryString[1],
      current,
      row,
      startDate,
      endDate,
      status,
      searchText,
      sortField,
      sortDirection,
    ).then((res) => {
      setData(res)
    })
  }

  useEffect(() => {
    const getAllReward = () => {
      RewardDatasource.getAllReward('FARMER').then((res) => {
        if (res.data) {
          const dataFilter = res.data.filter((x) => x.id === queryString[1])
          setDataRewardNo(dataFilter.map((x) => x.rewardNo)[0])
          setRewardType(dataFilter.map((x) => x.rewardType)[0])
          setRewardExchange(dataFilter.map((x) => x.rewardExchange)[0])
        }
      })
    }
    getAllReward()
  }, [])
  useEffect(() => {
    fetchData()
  }, [current, startDate, endDate, sortDirection])

  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setStartDate(e)
      setEndDate(e)
    }
    setCurrent(1)
  }
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
    setCurrent(1)
  }

  const onChangeStatus = (checkedValues: any) => {
    setStatus(checkedValues)
  }
  const optionsToRender =
    rewardType === 'DIGITAL' ? REWARD_REDEEM_HIS_DIG_STATUS : REWARD_REDEEM_HIS_STATUS

  const renderOptions = optionsToRender.map((x) => (
    <Select.Option key={x.value} value={x.value}>
      {x.name}
    </Select.Option>
  ))
  const PageTitle = (
    <>
      <div className='container d-flex' style={{ padding: '8px' }}>
        <BackIconButton onClick={() => navigate(-1)} />
        <div className='col-lg-8 p-3'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{ fontSize: 22, fontWeight: 'bold' }}
          >
            <strong>
              ประวัติการแลก {dataRewardNo} | {rewardType}
              <span style={{ color: color.secondary3 }}>{` ${
                rewardExChange === 'SCORE' ? '(ใช้แต้ม)' : '(ภารกิจ)'
              } `}</span>
            </strong>
          </span>
        </div>
        <div className='col-lg-4 p-3'>
          <RangePicker
            className='col-lg'
            allowClear
            onCalendarChange={handleSearchDate}
            format={dateFormat}
          />
        </div>
      </div>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg-9 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อนักบินโดรน / เบอร์โทร / รหัส Redeem No.'
            className='col-lg-12 p-1'
            onChange={changeTextSearch}
          />
        </div>
        <div className='col-lg-2 p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกสถานะ'
            allowClear
            onChange={onChangeStatus}
          >
            {renderOptions}
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
            onClick={fetchData}
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
            วันที่อัพเดต
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {moment(row.updateAt).format('DD/MM/YYYY')}, {moment(row.updateAt).format('HH:mm')}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อผู้ใช้งาน',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <u style={{ color: color.Success }}>
                {row.receiverDetail !== null
                  ? row.receiverDetail.firstname + ' ' + row.receiverDetail.lastname
                  : '-'}
              </u>
            </>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'tel',
      key: 'tel',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.receiverDetail !== null ? row.receiverDetail.tel : '-'}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'Redeem No.',
      dataIndex: 'redeemNo',
      key: 'redeemNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <u style={{ color: color.Success }}>{row.redeemNo !== null ? row.redeemNo : '-'}</u>
            </>
          ),
        }
      },
    },
    {
      title: 'จำนวน',
      dataIndex: 'rewardQuantity',
      key: 'rewardQuantity',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.rewardQuantity !== null
                  ? numberWithCommas(row.rewardQuantity) + ' ' + 'ชิ้น'
                  : '-'}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'แต้มที่ใช้แลก',
      dataIndex: 'score',
      key: 'score',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.reward.score !== null
                  ? numberWithCommas(row.reward.score) + ' ' + 'แต้ม'
                  : '-'}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'redeemStatus',
      key: 'redeemStatus',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {rewardType === 'DIGITAL' ? (
                <span
                  style={{
                    color: COLOR_QUOTA_REDEEM_DIG[row.redeemDetail.redeemStatus],
                  }}
                >
                  <Badge
                    style={{ right: 5 }}
                    color={COLOR_QUOTA_REDEEM_DIG[row.redeemDetail.redeemStatus]}
                  />
                  {STATUS_QUOTA_REDEEM_DIG[row.redeemDetail.redeemStatus]}
                </span>
              ) : (
                <span
                  style={{
                    color: COLOR_QUOTA_REDEEM[row.redeemDetail.redeemStatus],
                  }}
                >
                  <Badge
                    style={{ right: 5 }}
                    color={COLOR_QUOTA_REDEEM[row.redeemDetail.redeemStatus]}
                  />
                  {STATUS_QUOTA_REDEEM[row.redeemDetail.redeemStatus]}
                </span>
              )}
            </>
          ),
        }
      },
    },
  ]
  return (
    <>
      {PageTitle}
      <br />
      <Table columns={columns} dataSource={data?.data} pagination={false} />

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
    </>
  )
}
export default RedeemHistoryFarmer
