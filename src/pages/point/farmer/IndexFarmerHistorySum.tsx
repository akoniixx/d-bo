import { Button, Col, DatePicker, Pagination, Radio, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { CardContainer } from '../../../components/card/CardContainer'
import { color, icon } from '../../../resource'
import { useNavigate } from 'react-router-dom'
import { BackIconButton } from '../../../components/button/BackButton'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import SummaryPoint from '../../../components/card/SummaryPoint'
import { PointReceiveDatasource } from '../../../datasource/PointReceiveDatasource'
import { DetailSummaryListEntity } from '../../../entities/PointReceiveEntities'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import moment from 'moment'
import { sorter } from '../../../utilities/Sorting'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import CampaignNames from '../../../components/popover/CampaignNames'
const { RangePicker } = DatePicker

const _ = require('lodash')

function IndexFarmerHistorySum() {
  const queryString = _.split(window.location.pathname, '=')
  const navigate = useNavigate()
  const dateFormat = 'DD/MM/YYYY'
  const dateSearchFormat = 'YYYY-MM-DD'
  const row = 10
  const [current, setCurrent] = useState(1)
  const [type, setType] = useState('INCREASE')
  const [data, setData] = useState<DetailSummaryListEntity>()
  const [searchStartDate, setSearchStartDate] = useState<any>(null)
  const [searchEndDate, setSearchEndDate] = useState<any>(null)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)

  const fetchFarmerSumById = () => {
    PointReceiveDatasource.getFarmerSumById(
      queryString[1],
      type,
      row,
      current,
      searchStartDate,
      searchEndDate,
      sortField,
      sortDirection,
    ).then((res) => {
      setData(res)
    })
  }

  useEffect(() => {
    fetchFarmerSumById()
  }, [type, current, sortField, sortDirection])

  const handleSearchDate = (e: any) => {
    if (e != null) {
      setSearchStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setSearchEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setSearchStartDate(e)
      setSearchEndDate(e)
    }
    setCurrent(1)
  }

  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const onSearch = () => {
    setCurrent(1)
    fetchFarmerSumById()
  }

  const setField = (field?: string) => {
    setSortField(field)
  }
  const sortTitle = (title: string, field?: string) => {
    return (
      <>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {title}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
            onClick={() => {
              setField(field)
              setSortDirection((prev: any) => {
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
                color: sortDirection === 'ASC' && field === sortField ? '#ffca37' : 'white',
              }}
            />
            <CaretDownOutlined
              style={{
                position: 'relative',
                bottom: 2,
                color: sortDirection === 'DESC' && field === sortField ? '#ffca37' : 'white',
              }}
            />
          </div>
        </div>
      </>
    )
  }

  const pageTitle = (
    <>
      <Row justify={'space-between'}>
        <BackIconButton
          onClick={() => {
            navigate(-1)
          }}
        />
        <Col span={10} className='pt-3'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
            }}
          >
            <strong>ประวัติแต้ม | {data?.farmerName} </strong>
          </span>
        </Col>
        <Col span={4} className='pt-3'>
          <Radio.Group
            onChange={(e) => {
              setSortField(undefined)
              setSortDirection(undefined)
              setCurrent(1)
              setType(e.target.value)
            }}
          >
            <Radio.Button
              style={{
                width: '90px',
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                backgroundColor: type === 'INCREASE' ? 'rgba(33, 150, 83, 0.1)' : color.White,
                color: type === 'INCREASE' ? color.Success : color.BK,
                borderColor: type === 'INCREASE' ? color.Success : color.BK,
              }}
              value='INCREASE'
            >
              ได้รับแต้ม
            </Radio.Button>
            <Radio.Button
              style={{
                width: '90px',
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: type === 'DECREASE' ? 'rgba(235, 87, 87, 0.1)' : color.White,
                color: type === 'DECREASE' ? color.Error : color.BK,
                borderColor: type === 'DECREASE' ? color.Error : color.BK,
              }}
              value='DECREASE'
            >
              แลกแต้ม
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={6} className='pt-3' style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={['เลือกวันที่เริ่ม', 'เลือกวันที่สิ้นสุด']}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
        </Col>
        <Col span={2} className='pt-3'>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={onSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </Col>
      </Row>
      <Row justify={'space-between'} gutter={16}>
        <Col span={8}>
          <SummaryPoint
            title={'แต้มทั้งหมดที่ได้รับ'}
            bgColor={color.Success}
            point={data?.summary.allPoint || 0}
            label={'แต้มที่ได้'}
            icon={icon.coinFarmer}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={'แต้มใช้ไปแล้ว'}
            bgColor={color.Error}
            point={data?.summary.pointAllUsed || 0}
            label={'แต้มที่ใช้'}
            icon={icon.coinFarmer}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={'แต้มคงเหลือ'}
            bgColor={color.secondary3}
            point={data?.summary.balance || 0}
            label={'แต้มคงเหลือ'}
            icon={icon.coinFarmer}
          />
        </Col>
      </Row>
      <br />
    </>
  )

  const columns = [
    {
      title: (a: any) => sortTitle('วันที่อัปเดต', 'updateAt'),
      dataIndex: 'updateAt',
      key: 'updateAt',
      width: '15%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{DateTimeUtil.formatDateTime(value)}</span>
            </>
          ),
        }
      },
    },
    {
      title: (a: any) =>
        sortTitle(
          type === 'INCREASE' ? 'Point No' : 'Taks No',
          type === 'INCREASE' ? 'pointNo' : 'taskNo',
        ),
      dataIndex: type === 'INCREASE' ? 'pointNo' : 'taskNo',
      key: type === 'INCREASE' ? 'pointNo' : 'taskNo',
      width: type === 'INCREASE' ? '20%' : '50%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{type === 'INCREASE' ? row.pointNo : row.taskNo || '-'}</span>,
        }
      },
    },
    {
      title: 'Task No.',
      dataIndex: 'taskNo1',
      key: 'taskNo1',
      width: '30%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.taskNo || '-'}</span>,
        }
      },
    },
    {
      title: (a: any) => sortTitle('จำนวนแต้ม', 'amountValue'),
      dataIndex: 'amountValue',
      key: 'amountValue',
      width: '20%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {type !== 'INCREASE' ? (
                row.action !== 'RETURN' ? (
                  <span style={{ color: color.Error }}>{numberWithCommas(value) + ` แต้ม`}</span>
                ) : (
                  <span style={{ color: color.Success }}>
                    {'+' + numberWithCommas(value) + ` แต้ม`}
                  </span>
                )
              ) : (
                <>
                  {' '}
                  {row.action === 'RETURN_REVERT' ? (
                    <span style={{ color: color.Error }}>
                      {'-' + numberWithCommas(value) + ` แต้ม`}
                    </span>
                  ) : (
                    <span>{numberWithCommas(value) + ` แต้ม`}</span>
                  )}
                </>
              )}
              {row.action === 'RETURN_REVERT' && <CampaignNames data={row.campaignName} />}
            </>
          ),
        }
      },
    },
  ]

  return (
    <>
      {pageTitle}
      <CardContainer>
        <Table
          dataSource={data?.data}
          columns={type === 'INCREASE' ? columns : columns.filter((x) => x.key !== 'taskNo1')}
          pagination={false}
          size='large'
          tableLayout='fixed'
        />
      </CardContainer>
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

export default IndexFarmerHistorySum
