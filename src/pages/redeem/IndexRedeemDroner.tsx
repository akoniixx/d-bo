import { FileTextOutlined, InfoCircleFilled, SearchOutlined } from '@ant-design/icons'
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ActionButton from '../../components/button/ActionButton'
import { CardContainer } from '../../components/card/CardContainer'
import { RedeemDatasource } from '../../datasource/RedeemDatasource'
import { RedeemDronerListEntity, RedeemFarmerListEntity } from '../../entities/RedeemEntities'
import { color } from '../../resource'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from '../../utilities/TextFormatter'
import ShowNickName from '../../components/popover/ShowNickName'
import styled from 'styled-components'
const NewTableDroner = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: #ea973e !important;
    font-family: 'Prompt' !important;
    font-weight: 500 !important;
    color: 'white' !important;
    font-weight: bold !important;
  }
`
const { RangePicker } = DatePicker
const dateSearchFormat = 'YYYY-MM-DD'

const IndexRedeemDroner = () => {
  const navigate = useNavigate()
  const dateFormat = 'DD/MM/YYYY'
  const [current, setCurrent] = useState(1)
  const [dataDroner, setDataDroner] = useState<RedeemDronerListEntity>()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchStartDate, setSearchStartDate] = useState<any>(null)
  const [searchEndDate, setSearchEndDate] = useState<any>(null)
  const [searchStatus, setSearchStatus] = useState('')
  const [searchMission, setSearchMission] = useState('')
  const [searchType, setSearchType] = useState('PHYSICAL')
  const [searchRewardEx, setSearchRewardEx] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchRedeemDroner = () => {
    setLoading(true)
    RedeemDatasource.getRedeemDroner(
      5,
      current,
      searchKeyword,
      searchStartDate,
      searchEndDate,
      searchStatus,
      searchMission,
      searchType,
      searchRewardEx,
    )
      .then((res) => {
        const mapKey = res.data.map((x, i) => ({
          ...x,
          key: i + 1,
        }))
        setDataDroner({ ...res, data: mapKey })
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRedeemDroner()
  }, [current, searchStartDate, searchEndDate, searchType])

  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const onSearch = () => {
    setCurrent(1)
    fetchRedeemDroner()
  }
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

  const pageTitle = (
    <>
      <Row justify={'space-between'} style={{ padding: '10px' }}>
        <Col span={10}>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>ประวัติการแลก (นักบินโดรน)</strong>
          </span>
        </Col>

        <Col span={6} style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={['เลือกวันที่เริ่ม', 'เลือกวันที่สิ้นสุด']}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
        </Col>
      </Row>

      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg-3 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อนักบินโดรน/เบอร์โทร'
            className='col-lg-12 p-1'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหารหัส Reward No./Mission No.'
            className='col-lg-12 p-1'
            onChange={(e) => setSearchMission(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Radio.Group
            onChange={(e) => {
              setCurrent(1)
              setSearchType(e.target.value)
            }}
            defaultValue={searchType}
          >
            <Space size={0}>
              <Button>
                <Radio value='PHYSICAL'>Physical</Radio>
              </Button>
              <Button>
                <Radio value='DIGITAL'>Digital</Radio>
              </Button>
            </Space>
          </Radio.Group>
        </div>
        <div className='col-lg'>
          <Select
            className='col-lg-12 p-1'
            placeholder='ประเภทของรางวัล'
            allowClear
            onChange={(e) => setSearchRewardEx(e)}
          >
            <option value='SCORE'>
              {searchType === 'PHYSICAL' ? 'Physical' : 'Digital'} (ใช้แต้ม)
            </option>
            <option value='MISSION'>
              {searchType === 'PHYSICAL' ? 'Physical' : 'Digital'} (ภารกิจ)
            </option>
          </Select>
        </div>
        {searchType === 'PHYSICAL' ? (
          <div className='col-lg'>
            <Select
              className='col-lg-12 p-1'
              placeholder='สถานะทั้งหมด'
              allowClear
              onChange={(e) => setSearchStatus(e)}
            >
              <option value='REQUEST'>คำร้องขอแลก</option>
              <option value='PREPARE'>เตรียมจัดส่ง</option>
              <option value='DONE'>ส่งแล้ว</option>
              <option value='CANCEL'>ยกเลิก</option>
            </Select>
          </div>
        ) : (
          <div className='col-lg'>
            <Select
              className='col-lg-12 p-1'
              placeholder='สถานะทั้งหมด'
              allowClear
              onChange={(e) => setSearchStatus(e)}
            >
              <option value='REQUEST'>พร้อมใช้</option>
              <option value='USED'>ใช้แล้ว</option>
              <option value='EXPIRED'>หมดอายุ</option>
              <option value='CANCEL'>ยกเลิก</option>
            </Select>
          </div>
        )}
        <div className='pt-1'>
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
        </div>
      </div>
    </>
  )
  const columnsDroner = [
    {
      title: 'วันที่อัปเดต',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.updateAt && DateTimeUtil.formatDateTime(row.updateAt)}</span>,
        }
      },
    },
    {
      title: 'Redeem No',
      dataIndex: 'redeemNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.redeemNo}</span>,
        }
      },
    },
    {
      title: 'Reward No',
      dataIndex: 'rewardCode',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.reward.rewardNo}</span>,
        }
      },
    },
    {
      title: 'Mission No',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.missionId ? row.redeemDetail.missionNo : '-'}</span>
              {row.missionId && row.redeemDetail.missionNo && (
                <Tooltip
                  placement='top'
                  title={'ชื่อภารกิจ: ' + row.redeemDetail.missionName}
                  key={row.key}
                >
                  <InfoCircleFilled
                    style={{
                      position: 'relative',
                      bottom: 3,
                      left: 4,
                      color: color.Success,
                    }}
                  />
                </Tooltip>
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อนักบินโดรน',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <u style={{ color: color.Success }}>
              {row.receiverDetail.firstname + ' ' + row.receiverDetail.lastname}
              {row.receiverDetail.nickname && (
                <ShowNickName data={row.receiverDetail.nickname} menu='INFO' />
              )}
            </u>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.receiverDetail.tel}</span>,
        }
      },
    },
    {
      title: 'ประเภทของรางวัล',
      render: (value: any, row: any, index: number) => {
        const mapWording: any = {
          PHYSICAL: 'Physical',
          DIGITAL: 'Digital',
        }
        return {
          children: (
            <>
              <span>{mapWording[row.reward.rewardType]}</span>
              <span
                style={{
                  color: row.reward.rewardExchange === 'SCORE' ? color.Warning : '#A9CB62',
                }}
              >
                {row.reward.rewardExchange === 'SCORE' ? ' (ใช้แต้ม)' : ' (ภารกิจ)'}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      render: (value: any, row: any, index: number) => {
        const mapStatus: any = {
          REQUEST: row?.redeemDetail.rewardType === 'PHYSICAL' ? 'คำร้องขอแลก' : 'พร้อมใช้',
          PREPARE: 'เตรียมจัดส่ง',
          DONE: 'ส่งแล้ว',
          CANCEL: 'ยกเลิก',
          USED: 'ใช้งาน',
          EXPIRED: 'หมดอายุ',
        }
        const mapColor: any = {
          REQUEST: row?.redeemDetail.rewardType === 'PHYSICAL' ? '#FFCA37' : '#EA973E',
          PREPARE: '#EA973E',
          DONE: '#219653',
          CANCEL: color.Error,
          USED: '#219653',
          EXPIRED: '#7B7B7B',
        }
        return {
          children: (
            <>
              <span style={{ color: mapColor[row.redeemDetail?.redeemStatus] }}>
                <Badge color={mapColor[row.redeemDetail?.redeemStatus]} />{' '}
                {mapStatus[row.redeemDetail?.redeemStatus]}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'Action',
      key: 'Action',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-center'>
              <div className='col-lg-6'>
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/DetailDronerRedeem/id=' + row.id)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]

  const tableDronerFix = columnsDroner.map((item, idx) => {
    if (idx < 2) {
      return {
        ...item,
        fixed: true,
      }
    }
    return {
      ...item,
    }
  })

  const expandable = (record: any) => {
    return (
      <Container
        style={{
          backgroundColor: 'rgba(234, 151, 62, 0.10)',
        }}
        className='p-3'
      >
        <Row>
          <Col span={2}>
            <img src={record.reward.imagePath} width={55} height={55} />
          </Col>
          <Col span={10} className='p-2'>
            <div>ชื่อของรางวัล</div>
            <div>{record.reward.rewardName}</div>
          </Col>
          <Col span={4} className='p-2'>
            <div>แต้มที่แลก</div>
            <div>
              {!record.reward.score ? '-' : numberWithCommas(record.reward.score) + ' แต้ม'}
            </div>
          </Col>
          <Col span={3} className='p-2'>
            <div>จำนวน</div>
            <div>{record.rewardQuantity} ชิ้น</div>
          </Col>
          <Col span={3} className='p-2'>
            <div>รวมแต้มทั้งหมด</div>
            <div style={{ color: color.Error }}>
              {record.amountValue === 0 || !record.amountValue
                ? '-'
                : numberWithCommas(record.amountValue) + ' แต้ม'}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      {pageTitle}
      <CardContainer>
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <NewTableDroner
            dataSource={dataDroner?.data}
            expandable={{
              expandedRowRender: (record) => expandable(record),
              showExpandColumn: false,
              defaultExpandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            }}
            columns={[...tableDronerFix]}
            scroll={{
              x: 'auto',
            }}
            pagination={false}
            size='large'
            tableLayout='fixed'
          />
        </Spin>
      </CardContainer>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {dataDroner?.count} รายการ</p>
        <Pagination
          current={current}
          total={dataDroner?.count}
          onChange={onChangePage}
          pageSize={5}
          showSizeChanger={false}
        />
      </div>
    </>
  )
}

export default IndexRedeemDroner
