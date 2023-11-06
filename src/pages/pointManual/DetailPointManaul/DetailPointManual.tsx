/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import AddButtton from '../../../components/button/AddButton'
import { Badge, Button, Col, Image, Input, Pagination, Row, Select, Spin, Table, Tabs } from 'antd'
import SummaryPoint from '../../../components/card/SummaryPoint'
import { color, icon } from '../../../resource'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Container } from 'react-bootstrap'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { STATUS_COLOR_POINT_MANUAL, STATUS_POINT_MANUAL } from '../../../definitions/Status'
import ActionButton from '../../../components/button/ActionButton'
import ModalDelete from '../../../components/modal/ModalDelete'
import {
  SpecialPointDataSource,
  SpecialPointListDataSource,
} from '../../../datasource/SpecialPointDatasource'
import ShowNickName from '../../../components/popover/ShowNickName'
import {
  AllDetailSpecialPointEntities,
  SpecialListEntities,
} from '../../../entities/SpecialListEntities'
import _ from 'lodash'

function DetailPointManual() {
  const { TabPane } = Tabs
  const navigate = useNavigate()
  const row = 5
  const queryString = _.split(window.location.pathname, '=')
  const specialPointId = queryString[1]
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<AllDetailSpecialPointEntities>()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchKeyPoint, setSearchKeyPoint] = useState('รอ')
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>()
  const [summaryCount, setSummaryCount] = useState<SpecialListEntities>()
  const [returnPoint, setReturnPoint] = useState<any>()
  const [status, setStatus] = useState<any>('PENDING')
  const [modalReturnPoint, setModalReturnPoint] = useState<boolean>(false)
  const [modalDeletePoint, setModalDeletePoint] = useState<boolean>(false)

  useEffect(() => {
    fetchAllSpecialPointList()
    getSummaryCount()
  }, [current, status])

  const fetchAllSpecialPointList = () => {
    setLoading(true)
    SpecialPointListDataSource.getSpecialPointList(
      specialPointId,
      current,
      row,
      user,
      status,
      searchKeyword,
      sortField,
      sortDirection,
    )
      .then((res) => {
        console.log(res)
        const mapKey = res.data.map((x, i) => ({
          ...x,
          key: i + 1,
        }))
        setData({ ...res, data: mapKey })
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const getSummaryCount = async () => {
    await SpecialPointDataSource.getListSpecialPointById(specialPointId).then((res) => {
      setSummaryCount(res)
    })
  }

  const summary = (
    <>
      <Row justify={'space-between'} gutter={16}>
        <Col span={8}>
          <SummaryPoint
            title={'จำนวนนักบินโดรน'}
            bgColor={color.Warning}
            point={summaryCount?.dronerAmount || 0}
            time={summaryCount?.dronerCount || 0}
            label={'นักบินโดรน'}
            pointManual={true}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={'จำนวนเกษตรกร'}
            bgColor={color.Success}
            point={summaryCount?.farmerAmount || 0}
            time={summaryCount?.farmerCount || 0}
            label={'เกษตรกร'}
            pointManual={true}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={'แต้มที่ให้ทั้งหมด'}
            bgColor={color.Grey}
            point={summaryCount?.point || 0}
            label={'แต้มที่ให้ทั้งหมด'}
          />
        </Col>
      </Row>
    </>
  )
  const onChange = (key: string) => {
    setStatus(key)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const returnPointManual = (value: any) => {
    setModalReturnPoint((prev) => !prev)
    setReturnPoint(value)
  }
  const DeletePointManual = (value: any) => {
    setModalDeletePoint((prev) => !prev)
  }

  const columns = [
    {
      title: 'วันที่อัพเดต',
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.updateAt && DateTimeUtil.formatDateTime(row.updateAt)}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'Point No.',
      dataIndex: 'pointNo',
      key: 'pointNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.pointNo || '-'}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'Task No.',
      dataIndex: 'taskNo',
      key: 'taskNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.taskNo || '-'}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'reason',
      key: 'reason',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.reason || '-'}</span>,
        }
      },
    },
    {
      title: 'สร้างโดย',
      dataIndex: 'createBy',
      key: 'createBy',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.createBy}</span>,
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
            <>
              {' '}
              <span style={{ color: STATUS_COLOR_POINT_MANUAL[row.status] }}>
                <Badge color={STATUS_COLOR_POINT_MANUAL[row.status]} />{' '}
                {STATUS_POINT_MANUAL[row.status]}
              </span>
            </>
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
            <Row justify={'space-between'}>
              {status === 'PENDING' ? (
                <>
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => navigate('/EditDetailPointManual')}
                  />
                  <ActionButton
                    icon={<DeleteOutlined />}
                    color={color.Error}
                    onClick={() => DeletePointManual(row)}
                  />
                </>
              ) : status === 'SUCCESS' ? (
                <ActionButton
                  icon={
                    <Image
                      src={icon.returnPoint}
                      preview={false}
                      style={{ width: 15, height: 18 }}
                    />
                  }
                  color={color.Error}
                  onClick={() => returnPointManual(row)}
                />
              ) : null}
            </Row>
          ),
        }
      },
    },
  ]

  const searchContent = (
    <>
      <div className='d-flex justify-content-between pb-3'>
        <div className='col-lg-8 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อนักบินโดรน / ชื่อเกษตรกร / รหัส / เบอร์โทร'
            className='col-lg-12'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className='col-lg-3 p-1'>
          <Select
            className='col-lg-12'
            placeholder='ประเภทผู้ใช้งาน'
            allowClear
            onChange={(e) => setUser(e)}
          >
            <option value='FARMER'>เกษตรกร</option>
            <option value='DRONER'>นักบินโดรน</option>
          </Select>
        </div>
        <div className='col-lg p-1'>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1)
              fetchAllSpecialPointList()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )
  const expandData = (record: any) => {
    const checkFarmer = record.farmerId
    const checkDroner = record.dronerId

    return (
      <Row justify={'space-between'} gutter={16}>
        {checkFarmer !== null && (
          <Col span={24}>
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
                    <u>{record.firstname + ' ' + record.lastname}</u>
                  </span>
                  {record.nickname && <ShowNickName data={record.nickname} menu='INFO' />}
                </Col>
                <Col span={7}>
                  <label>เบอร์ : </label> <span>{record.telephoneNo}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label>{' '}
                  <span>
                    {' '}
                    {status === 'RETURN' && '-'} {numberWithCommas(record.point)}
                  </span>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
        {checkDroner !== null && (
          <Col span={24}>
            <Container
              style={{
                backgroundColor: '#EA973E1A',
                borderRadius: '5px',
              }}
              className='p-3'
            >
              <Row>
                <Col span={12}>
                  <label>นักบินโดรน : </label>{' '}
                  <span style={{ color: color.Warning }}>
                    <u>{record.firstname + ' ' + record.lastname}</u>
                  </span>
                  {record.nickname && (
                    <ShowNickName data={record.nickname} menu='INFO' colorTooltip={color.Warning} />
                  )}
                </Col>
                <Col span={7}>
                  <label>เบอร์ : </label> <span>{record.telephoneNo}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label>{' '}
                  <span>
                    {' '}
                    {status === 'RETURN' && '-'} {numberWithCommas(record.point)}
                  </span>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    )
  }
  const tableContent = (
    <>
      <Table
        dataSource={data?.data}
        expandable={{
          expandedRowRender: (record) => expandData(record),
          showExpandColumn: false,
          expandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }}
        columns={columns}
        pagination={false}
      />
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
  const tabsContent = (
    <div className='pt-3'>
      <Tabs onChange={onChange} type='card'>
        <TabPane tab={`รอรับแต้ม ${data?.pending}`} key='PENDING'>
          {searchContent}
          {tableContent}
        </TabPane>
        <TabPane tab={`ได้รับแต้ม ${data?.success}`} key='SUCCESS'>
          {searchContent}
          {tableContent}
        </TabPane>
        <TabPane tab={`คืนแต้ม ${data?.return}`} key='RETURN'>
          {searchContent}
          {tableContent}
        </TabPane>
      </Tabs>
    </div>
  )

  return (
    <>
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <BackIconButton onClick={() => navigate(-1)} />
            <span className='pt-3'>
              <strong style={{ fontSize: '20px' }}>รายละเอียด : {summaryCount?.name}</strong>
            </span>
          </div>

          <div className='align-self-center'>
            <AddButtton
              text='เพิ่มแต้มพิเศษ'
              onClick={() => {
                localStorage.setItem('specialPointId', specialPointId)
                navigate('/AddDetailPointManual')
              }}
            />
          </div>
        </div>
        {summary}
        {tabsContent}
        <ModalDelete
          title='ยืนยันการคืนแต้ม'
          show={modalReturnPoint}
          backButton={() => setModalReturnPoint(!modalReturnPoint)}
          callBack={async () => {
            const dataReturn = {
              id: returnPoint.id,
              updateBy: returnPoint.updateBy,
              reason: returnPoint.reason,
              taskId: returnPoint.taskId,
              taskNo: returnPoint.taskNo,
            }
            setModalReturnPoint(!modalReturnPoint)
            await SpecialPointListDataSource.returnSpecialPoint(returnPoint)
            fetchAllSpecialPointList()
          }}
          title1={'โปรดตรวจสอบของคืนแต้มที่คุณต้องการ ก่อนที่จะกดยืนยัน'}
          title2={'เพราะอาจส่งผลต่อการแสดงผลแต้มของผู้ใช้ในแอปพลิเคชัน'}
        />
        <ModalDelete
          show={modalDeletePoint}
          backButton={() => setModalDeletePoint(!modalDeletePoint)}
          callBack={() => {
            setModalDeletePoint(!modalDeletePoint)
            console.log(1)
          }}
          title1={'โปรดตรวจสอบของแต้มพิเศษที่คุณต้องการลบ ก่อนที่จะกดยืนยัน'}
          title2={'เพราะอาจส่งผลต่อการแสดงผลแต้มของผู้ใช้ในแอปพลิเคชัน'}
        />
      </Spin>
    </>
  )
}

export default DetailPointManual
