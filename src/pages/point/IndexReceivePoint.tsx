import { InfoCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Input, Pagination, Row, Select, Spin, Table, Tooltip } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { CardContainer } from '../../components/card/CardContainer'
import { PointReceiveDatasource } from '../../datasource/PointReceiveDatasource'
import { ReceivePointListEntity } from '../../entities/PointReceiveEntities'
import { color } from '../../resource'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { numberWithCommas } from '../../utilities/TextFormatter'
import ShowNickName from '../../components/popover/ShowNickName'
import { STATUS_RECEIVE_TYPE } from '../../definitions/Status'
const { RangePicker } = DatePicker
const dateSearchFormat = 'YYYY-MM-DD'
const dateFormat = 'DD/MM/YYYY'

const IndexReceivePoint = () => {
  const [loading, setLoading] = useState(false)
  const row = 5
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<ReceivePointListEntity>()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchMission, setSearchMission] = useState('')
  const [searchStartDate, setSearchStartDate] = useState<any>(null)
  const [searchEndDate, setSearchEndDate] = useState<any>(null)
  const [searchType, setSearchType] = useState('')

  const fetchReceivePoint = () => {
    setLoading(true)
    PointReceiveDatasource.getReceivePoint(
      row,
      current,
      searchKeyword,
      searchMission,
      searchStartDate,
      searchEndDate,
      searchType,
    )
      .then((res) => {
        const mapKey = res.history.map((x, i) => ({
          ...x,
          key: i + 1,
        }))
        setData({ ...res, history: mapKey })
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchReceivePoint()
  }, [current, searchStartDate, searchEndDate])

  const onSearch = () => {
    setCurrent(1)
    fetchReceivePoint()
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
            <strong>รายการแต้ม (ได้รับแต้ม)</strong>
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
            placeholder='ค้นหารหัส Task No. / Mission No.'
            className='col-lg-12 p-1'
            onChange={(e) => setSearchMission(e.target.value)}
          />
        </div>
        <div className='col-lg-2'>
          <Select
            className='col-lg-12 p-1'
            placeholder='ประเภทการได้รับแต้ม'
            allowClear
            onChange={(e) => setSearchType(e)}
          >
            <option value='JOB'>การจ้างงาน</option>
            <option value='MISSION'>ภารกิจ</option>
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
    const checkFarmer = record.farmerTransaction
    const checkDroner = record.dronerTransaction
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
                <Col span={11}>
                  <label>ชื่อเกษตรกร : </label>{' '}
                  <u
                    style={{
                      color: checkFarmer.firstname === 'ผู้ใช้งานนี้' ? color.Error : color.Success,
                    }}
                  >
                    {checkFarmer.mission !== null
                      ? (checkFarmer.firstname + ' ' + checkFarmer.lastname).length > 20 &&
                        checkFarmer.mission === null
                        ? (checkFarmer.firstname + ' ' + checkFarmer.lastname).substring(0, 20)
                        : checkFarmer.firstname + ' ' + checkFarmer.lastname
                      : checkFarmer.firstname + ' ' + checkFarmer.lastname}
                  </u>
                  {checkFarmer.nickname && <ShowNickName data={checkFarmer.nickname} menu='INFO' />}
                </Col>
                <Col span={8}>
                  <label>เบอร์โทร : </label>{' '}
                  <span
                    style={{
                      color:
                        checkFarmer.telephoneNo === 'ไม่พบหมายเลขนี้' ? color.Error : color.font,
                    }}
                  >
                    {checkFarmer.telephoneNo}
                  </span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label> <span>+ {numberWithCommas(checkFarmer.amountValue)}</span>
                  {checkFarmer.raiAmount > 0 && (
                    <Tooltip
                      placement='top'
                      title={
                        'แต้มที่จะได้รับ : ' +
                        checkFarmer.raiAmount +
                        ' ไร่ x ' +
                        checkFarmer.amountValue / checkFarmer.raiAmount +
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
                  )}
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
                <Col span={11}>
                  <label>ชื่อนักบินโดรน :</label>{' '}
                  <u style={{ color: checkDroner.isDelete ? color.Error : color.Warning }}>
                    {(checkDroner.firstname + ' ' + checkDroner.lastname).length > 20 &&
                    checkDroner.mission === null
                      ? (checkDroner.firstname + ' ' + checkDroner.lastname).substring(0, 20) +
                        '...'
                      : checkDroner.firstname + ' ' + checkDroner.lastname}
                  </u>
                  {checkDroner.nickname && (
                    <ShowNickName
                      data={checkDroner.nickname}
                      menu='INFO'
                      colorTooltip={color.Warning}
                    />
                  )}
                </Col>
                <Col span={8}>
                  <label>เบอร์โทร :</label>{' '}
                  <span style={{ color: checkDroner.isDelete ? color.Error : color.font }}>
                    {checkDroner.telephoneNo}
                  </span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label> <span>+ {numberWithCommas(checkDroner.amountValue)}</span>
                  {checkDroner.raiAmount > 0 && (
                    <Tooltip
                      placement='top'
                      title={
                        'แต้มที่จะได้รับ : ' +
                        checkDroner.raiAmount +
                        ' ไร่ x ' +
                        checkDroner.amountValue / checkDroner.raiAmount +
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
                  )}
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
      dataIndex: 'dateTime',
      key: 'dateTime',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.createAt && DateTimeUtil.formatDateTime(row.createAt)}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.task_no}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'Point No',
      dataIndex: 'pointNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.pointNo}</span>,
        }
      },
    },
    {
      title: 'Task No',
      dataIndex: 'taskNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.taskNo ? <u style={{ color: color.Success }}>{row.taskNo}</u> : '-'}</>,
        }
      },
    },
    {
      title: 'Mission No',
      dataIndex: 'missionId',
      render: (value: any, row: any, index: number) => {
        return {
          children:
            row.dronerTransaction !== null ? (
              row.dronerTransaction.mission ? (
                <>
                  <u style={{ color: color.Success }}>{row.dronerTransaction.mission.missionNo}</u>
                  <Tooltip placement='top' title='' key={row.id}>
                    <InfoCircleFilled
                      style={{
                        position: 'relative',
                        bottom: 3,
                        left: 4,
                        color: color.Success,
                      }}
                    />
                  </Tooltip>
                </>
              ) : (
                <>-</>
              )
            ) : (
              <>-</>
            ),
        }
      },
    },
    {
      title: 'ชื่อรายการแต้มพิเศษ',
      dataIndex: '',
      render: (value: any, row: any, index: number) => {
        const checkPointSpecial = row.dronerTransaction || row.farmerTransaction
        return {
          children: (
            <span>
              {checkPointSpecial.campaign.campaignType === 'SPECIAL_POINT'
                ? checkPointSpecial.campaignName
                : '-'}
            </span>
          ),
        }
      },
    },
    {
      title: 'ประเภทการได้รับแต้ม',
      render: (value: any, row: any, index: number) => {
        const checkPointSpecial = row.dronerTransaction || row.farmerTransaction
        return {
          children: (
            <>
              <span>
                {STATUS_RECEIVE_TYPE[checkPointSpecial.campaign.campaignType]}
                {row.action === 'RETURN' && ' (คืนแต้ม)'}
              </span>
              <br />
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
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <Table
            dataSource={data?.history}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => expandData(record),
              expandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              showExpandColumn: false,
            }}
            scroll={{ x: 'max-content' }}
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
export default IndexReceivePoint
