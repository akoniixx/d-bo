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
  Spin,
  Table,
  Tooltip,
} from 'antd'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { RedeemDronerListEntity, RedeemFarmerListEntity } from '../../../entities/RedeemEntities'
import { RedeemDatasource } from '../../../datasource/RedeemDatasource'
import { color } from '../../../resource'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import ShowNickName from '../../../components/popover/ShowNickName'
import ActionButton from '../../../components/button/ActionButton'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import { CardContainer } from '../../../components/card/CardContainer'
import { useEffect, useState } from 'react'
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

const ViewHisRedeem = () => {
  const navigate = useNavigate()
  const dateFormat = 'DD/MM/YYYY'
  const [current, setCurrent] = useState(1)
  const [source, setSource] = useState<string>(window.location.pathname.split('/')[2])
  const [dataFarmer, setDataFarmer] = useState<RedeemFarmerListEntity>()
  const [dataDroner, setDataDroner] = useState<RedeemDronerListEntity>()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchStartDate, setSearchStartDate] = useState<any>(null)
  const [searchEndDate, setSearchEndDate] = useState<any>(null)
  const [searchStatus, setSearchStatus] = useState('')
  const [searchMission, setSearchMission] = useState('')
  const [searchType, setSearchType] = useState('PHYSICAL')
  const [searchRewardEx, setSearchRewardEx] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchRedeemFarmer = () => {
    setLoading(true)
    RedeemDatasource.getRedeemFarmer(
      10,
      current,
      searchKeyword,
      searchStartDate,
      searchEndDate,
      searchStatus,
    )
      .then((res) => {
        setDataFarmer(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const fetchRedeemDroner = () => {
    setLoading(true)
    RedeemDatasource.getRedeemDroner(
      10,
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
    if (source === 'Farmer') {
      fetchRedeemFarmer()
    } else {
      fetchRedeemDroner()
    }
  }, [current, searchStartDate, searchEndDate, source, searchType])

  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const onSearch = () => {
    setCurrent(1)
    if (source === 'Farmer') {
      fetchRedeemFarmer()
    } else {
      fetchRedeemDroner()
    }
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
        <Col span={14}>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>ประวัติการแลกแต้ม</strong>
          </span>
        </Col>
        <Col span={4}>
          <Radio.Group buttonStyle='outline'>
            <Radio.Button
              value='Farmer'
              style={
                source === 'Farmer'
                  ? {
                      color: color.Success,
                      borderColor: color.Success,
                      borderRadius: '5px, 5px',
                      backgroundColor: 'rgba(33, 150, 83, 0.1)',
                    }
                  : {}
              }
              onClick={() => {
                setCurrent(1)
                setSource('Farmer')
              }}
            >
              เกษตรกร
            </Radio.Button>
            <Radio.Button
              value='Droner'
              style={
                source === 'Droner'
                  ? {
                      color: color.Warning,
                      borderColor: color.Warning,
                      borderRadius: '5px, 5px',
                      backgroundColor: 'rgba(234, 151, 62, 0.1)',
                    }
                  : {}
              }
              onClick={() => {
                setCurrent(1)
                setSource('Droner')
              }}
            >
              นักบินโดรน
            </Radio.Button>
          </Radio.Group>
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
        <div className='col-lg-8 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder={
              source === 'Farmer' ? 'ค้นหาชื่อเกษตรกร/เบอร์โทร' : 'ค้นหาชื่อนักบินโดรน/เบอร์โทร'
            }
            className='col-lg-12 p-1'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className='col-lg'>
          <Select
            className='col-lg-12 p-1'
            placeholder='สถานะทั้งหมด'
            allowClear
            onChange={(e) => {
              setSearchStatus(e)
            }}
          >
            <option value='SUCCESS'>แลกสำเร็จ</option>
            <option value='CANCELED'>ยกเลิก</option>
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
            onClick={onSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )
  const columnsFarmer = [
    {
      title: 'วันที่อัปเดต',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.createdAt && DateTimeUtil.formatDateTime(row.createdAt)}</span>,
        }
      },
    },
    {
      title: 'Redeem No',
      dataIndex: 'redeemNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.redeemNo || '-'}</span>,
        }
      },
    },
    {
      title: 'Task No',
      dataIndex: 'taskNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.taskNo || '-'}</span>,
        }
      },
    },
    {
      title: 'Reward No',
      dataIndex: 'rewardCode',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{value ? <u style={{ color: color.Success }}>{row.rewardNo}</u> : '-'}</>,
        }
      },
    },
    {
      title: 'ชื่อเกษตรกร',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.farmer.firstname + ' ' + row.farmer.lastname}
              {row.farmer.nickname && <ShowNickName data={row.farmer.nickname} menu='INFO' />}
            </span>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telephone',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.farmer.telephoneNo || '-'}</span>,
        }
      },
    },
    {
      title: 'แต้มที่แลก',
      dataIndex: 'point',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: color.Error }}>- {numberWithCommas(row.usePoint)} แต้ม</span>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: row.status !== 'CANCELED' ? color.Success : color.Error,
                }}
              >
                <Badge color={row.status !== 'CANCELED' ? color.Success : color.Error} />{' '}
                {row.status === 'CANCELED' ? 'ยกเลิก' : 'แลกสำเร็จ'}
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
                  onClick={() => navigate('/ViewDetailFarmer/id=' + row.id)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
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
      title: 'Task No',
      dataIndex: 'taskNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.taskNo || '-'}</span>,
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
            <u style={{ color: color.Warning }}>
              {row.receiverDetail.firstname + ' ' + row.receiverDetail.lastname}
              {row.receiverDetail.nickname && (
                <ShowNickName
                  data={row.receiverDetail.nickname}
                  menu='INFO'
                  colorTooltip={color.Warning}
                />
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
        return {
          children: (
            <>
              <span
                style={{
                  color: row.redeemDetail?.redeemStatus !== 'CANCEL' ? color.Success : color.Error,
                }}
              >
                <Badge
                  color={row.redeemDetail?.redeemStatus !== 'CANCEL' ? color.Success : color.Error}
                />{' '}
                {row.redeemDetail?.redeemStatus === 'CANCEL' ? 'ยกเลิก' : 'แลกสำเร็จ'}
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
                  onClick={() => navigate('/ViewDetailDroner/id=' + row.id)}
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

  return (
    <>
      {pageTitle}
      <CardContainer>
        {source === 'Farmer' ? (
          <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
            <Table
              dataSource={dataFarmer?.data}
              columns={columnsFarmer}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </Spin>
        ) : (
          <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
            <NewTableDroner
              dataSource={dataDroner?.data}
              columns={[...tableDronerFix]}
              scroll={{ x: 'max-content' }}
              pagination={false}
              size='large'
              tableLayout='fixed'
            />
          </Spin>
        )}
      </CardContainer>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {source === 'Farmer' ? dataFarmer?.count : dataDroner?.count} รายการ</p>
        <Pagination
          current={current}
          total={source === 'Farmer' ? dataFarmer?.count : dataDroner?.count}
          onChange={onChangePage}
          pageSize={10}
          showSizeChanger={false}
        />
      </div>
    </>
  )
}

export default ViewHisRedeem
