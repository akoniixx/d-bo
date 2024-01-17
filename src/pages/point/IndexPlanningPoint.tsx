import { InfoCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Input, Pagination, Row, Select, Spin, Table, Tooltip } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { CardContainer } from '../../components/card/CardContainer'
import { PointReceiveDatasource } from '../../datasource/PointReceiveDatasource'
import { PlanningPointListEntity } from '../../entities/PointReceiveEntities'
import { color } from '../../resource'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { numberWithCommas } from '../../utilities/TextFormatter'
import ShowNickName from '../../components/popover/ShowNickName'
const { RangePicker } = DatePicker
const dateSearchFormat = 'YYYY-MM-DD'

const IndexPlanningPoint = () => {
  const dateFormat = 'DD/MM/YYYY'
  const row = 5
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<PlanningPointListEntity>()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTask, setSearchTask] = useState('')
  const [searchStartDate, setSearchStartDate] = useState<any>(null)
  const [searchEndDate, setSearchEndDate] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [typeEstimate, setTypeEstimate] = useState<any>()

  const fetchPlanningPoint = () => {
    setLoading(true)
    PointReceiveDatasource.getPlanningPoint(
      'PENDING',
      row,
      current,
      searchKeyword,
      searchTask,
      searchStartDate,
      searchEndDate,
      typeEstimate,
    )
      .then((res) => {
        const mapKey = res.data.map((x, i) => ({
          ...x,
          key: i + 1,
        }))
        setData({ ...res, data: mapKey })
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPlanningPoint()
  }, [searchStartDate, searchEndDate, current])

  const onSearch = () => {
    setCurrent(1)
    fetchPlanningPoint()
  }

  const onChangePage = (page: number) => {
    setCurrent(page)
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
            <strong>รายการแต้ม (รอรับแต้ม)</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={['เลือกวันที่เริ่ม', 'เลือกวันที่สิ้นสุด']}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
        </div>
      </div>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหานักบินโดรน/เกษตรกร/เบอร์โทร'
            className='col-lg-12 p-1'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหารหัส Task No.'
            className='col-lg-12 p-1'
            onChange={(e) => setSearchTask(e.target.value)}
          />
        </div>
        <div className='col-lg-2'>
          <Select
            className='col-lg-12 p-1'
            placeholder='ประเภทการได้รับแต้ม'
            allowClear
            onChange={(e) => setTypeEstimate(e)}
          >
            <option value='POINT'>การจ้างงาน</option>
            <option value='SPECIAL_POINT'>แต้มพิเศษ</option>
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
  const expandData = (record: any) => {
    const checkFarmer = record.farmer
    const checkDroner = record.droner
    return (
      <Row justify={'space-between'} gutter={16}>
        {checkFarmer !== null && (
          <Col span={checkDroner !== null ? 12 : 24}>
            <Container
              style={{
                backgroundColor: 'rgba(86, 167, 104, 0.1)',
                borderRadius: '5px',
              }}
              className='p-3'
            >
              <Row>
                <Col span={12}>
                  <label>เกษตรกร : </label>{' '}
                  <span style={{ color: color.Success }}>
                    <u>{checkFarmer[0].first_name + ' ' + checkFarmer[0].last_name}</u>
                  </span>
                  {checkFarmer[0].nickname && (
                    <ShowNickName data={checkFarmer[0].nickname} menu='INFO' />
                  )}
                </Col>
                <Col span={7}>
                  <label>เบอร์ : </label> <span>{checkFarmer[0].telephone_no}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label>{' '}
                  <span>+ {numberWithCommas(checkFarmer[0].receive_point)}</span>
                  <Tooltip
                    placement='top'
                    title={
                      'แต้มที่จะได้รับ : ' +
                      checkFarmer[0].rai +
                      ' ไร่ x ' +
                      checkFarmer[0].point_per_rai +
                      ' แต้ม'
                    }
                    key={1}
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
                </Col>
              </Row>
            </Container>
          </Col>
        )}
        {checkDroner !== null && (
          <Col span={checkFarmer !== null ? 12 : 24}>
            <Container
              style={{
                backgroundColor: 'rgba(235, 87, 87, 0.1)',
                borderRadius: '5px',
              }}
              className='p-3'
            >
              <Row>
                <Col span={12}>
                  <label>นักบินโดรน :</label>{' '}
                  <span>
                    <u style={{ color: color.Warning }}>
                      {checkDroner[0].first_name + ' ' + checkDroner[0].last_name}
                    </u>
                  </span>
                  {checkDroner[0].nickname && (
                    <ShowNickName
                      data={checkDroner[0].nickname}
                      menu='INFO'
                      colorTooltip={color.Warning}
                    />
                  )}
                </Col>
                <Col span={7}>
                  <label>เบอร์ :</label> <span>{checkDroner[0].telephone_no}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label>{' '}
                  <span>+ {numberWithCommas(checkDroner[0].receive_point)}</span>
                  <Tooltip
                    placement='top'
                    title={
                      'แต้มที่จะได้รับ : ' +
                      checkDroner[0].rai +
                      ' ไร่ x ' +
                      checkDroner[0].point_per_rai +
                      ' แต้ม'
                    }
                    key={1}
                  >
                    <InfoCircleFilled
                      style={{
                        position: 'relative',
                        bottom: 3,
                        left: 4,
                        color: color.Warning,
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    )
  }

  const columns = [
    {
      title: 'วันที่อัปเดต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '15%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{(row.created_at && DateTimeUtil.formatDateTime(row.created_at)) || '-'}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'Task No',
      dataIndex: 'task_no',
      width: '25%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>{row.task_no ? <u style={{ color: color.Success }}>{row.task_no}</u> : '-'}</>
          ),
        }
      },
    },
    {
      title: 'ชื่อรายการแต้มพิเศษ',
      dataIndex: '',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.type_estimate === 'SPECIAL_POINT' ? row.campaign_name : '-'}</span>,
        }
      },
    },
    {
      title: 'ประเภทการได้รับแต้ม',
      width: '20%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.type_estimate === 'POINT' ? 'การจ้างงาน' : 'แต้มพิเศษ'}</span>,
        }
      },
    },
  ]

  return (
    <>
      {pageTitle}
      <CardContainer>
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <Table
            dataSource={data?.data}
            expandable={{
              expandedRowRender: (record) => expandData(record),
              showExpandColumn: false,
              expandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            }}
            columns={columns}
            pagination={false}
            size='large'
            tableLayout='fixed'
          />
        </Spin>
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
export default IndexPlanningPoint
