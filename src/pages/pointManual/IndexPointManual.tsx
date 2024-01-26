/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Spin,
  Table,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { color, image } from '../../resource'
import { useNavigate } from 'react-router-dom'
import AddButtton from '../../components/button/AddButton'
import { CardContainer } from '../../components/card/CardContainer'
import ActionButton from '../../components/button/ActionButton'
import ModalDelete from '../../components/modal/ModalDelete'
import ModalPointManual from '../../components/modal/ModalPointManual'
import {
  AllSpecialListEntities,
  InsertSpecialListEntities_INIT,
  SpecialListEntities,
  SpecialListEntities_INIT,
} from '../../entities/SpecialListEntities'
import { SpecialPointDataSource } from '../../datasource/SpecialPointDatasource'
import moment from 'moment'
import { numberWithCommas } from '../../utilities/TextFormatter'

function IndexPointManual() {
  const [data, setData] = useState<AllSpecialListEntities>()
  const [row, setRow] = useState(10)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTask, setSearchTask] = useState('')
  const [searchType, setSearchType] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [modalPointManual, setModalPointManual] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState(0)
  const [dataPoint, setDataPoint] = useState<SpecialListEntities>(SpecialListEntities_INIT)
  const [specialPointDelete, setSpecialPointDelete] = useState<string>()

  useEffect(() => {
    getSpecialPoint()
  }, [current, sortDirection])
  const getSpecialPoint = async () => {
    await SpecialPointDataSource.getListSpecialPoint(
      current,
      row,
      searchKeyword,
      sortField,
      sortDirection,
    ).then((res) => {
      setData(res)
    })
  }

  const showDelete = (id: string) => {
    setSpecialPointDelete(id)
    setModalDelete(!modalDelete)
  }

  const showModalPointManual = (data: any, index: number) => {
    setModalPointManual((prev) => !prev)
    setEditIndex(index)
    setDataPoint(data)
  }
  const pageTitle = (
    <>
      <div className='container d-flex justify-content-between'>
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>รายการแต้มพิเศษ</strong>
        </span>
        <div className='align-self-center'>
          <AddButtton
            text='เพิ่มรายการแต้มพิเศษ'
            onClick={() => setModalPointManual((prev) => !prev)}
          />
        </div>
      </div>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อรายการแต้มพิเศษ'
            className='col-lg-12 p-1'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
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
              if (current === 1) {
                getSpecialPoint()
              }
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{moment(row.updateAt).format('DD/MM/YYYY HH:mm')}</span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อรายการแต้มพิเศษ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('name')
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'จำนวนเกษตรกร',
      dataIndex: 'countFarmer',
      key: 'countFarmer',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {numberWithCommas(row.farmerCount) || 0} ครั้ง (
              {numberWithCommas(row.farmerAmount) || 0} คน)
            </span>
          ),
        }
      },
    },
    {
      title: 'จำนวนนักบินโดรน',
      dataIndex: 'countDroner',
      key: 'countDroner',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {numberWithCommas(row.dronerCount) || 0} ครั้ง (
              {numberWithCommas(row.dronerAmount) || 0} คน)
            </span>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            รวมแต้มที่ให้ทั้งหมด
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('point')
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
      dataIndex: 'point',
      key: 'point',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.point) || 0} แต้ม</span>,
        }
      },
    },
    {
      title: '',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row justify={'space-between'}>
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/DetailPointManual/id=' + row.id)}
                />
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => showModalPointManual(row, index + 1)}
                />
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={row.dronerAmount > 0 || row.farmerAmount > 0 ? color.Grey : color.Error}
                  onClick={() => showDelete(row.id)}
                  actionDisable={row.dronerAmount > 0 || row.farmerAmount > 0 ? true : false}
                />
              </Row>
            </>
          ),
        }
      },
    },
  ]

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', padding: '10%' }}>
      <Image src={image.empty_table_farmer} preview={false} style={{ width: 70, height: 70 }} />
      <p>ไม่มีข้อมูลรายชื่อเกษตร</p>
    </div>
  )
  return (
    <>
      {pageTitle}
      <CardContainer>
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <Table
              dataSource={data?.data}
              columns={columns}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </ConfigProvider>
        </Spin>
      </CardContainer>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
        />
      </div>
      <ModalDelete
        show={modalDelete}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={async () => {
          await SpecialPointDataSource.deleteSpecialPoint(specialPointDelete)
          setModalDelete(!modalDelete)
          getSpecialPoint()
        }}
        title1={'โปรดตรวจสอบของรายการแต้มพิเศษที่คุณต้องการลบ ก่อนที่จะกด'}
        title2={'ยืนยันเพราะอาจส่งผลต่อการแสดงผลแต้มของผู้ใช้ในแอปพลิเคชัน'}
      />
      <ModalPointManual
        action='edit'
        show={modalPointManual}
        backButton={() => {
          setEditIndex(0)
          getSpecialPoint()
          setModalPointManual((prev) => !prev)
        }}
        data={editIndex > 0 ? dataPoint : SpecialListEntities_INIT}
        callBack={() => {
          getSpecialPoint()
          setModalPointManual((prev) => !prev)
        }}
        isEditModal={editIndex > 0 ? true : false}
        title={editIndex > 0 ? 'แก้ไขชื่อรายการแต้มพิเศษ' : 'เพิ่มชื่อรายการแต้มพิเศษ'}
      />
    </>
  )
}

export default IndexPointManual
