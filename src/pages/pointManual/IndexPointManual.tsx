import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddFilled,
  FileTextFilled,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Spin,
  Table,
} from 'antd'
import React, { useState } from 'react'
import { color, icon, image } from '../../resource'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import AddButtton from '../../components/button/AddButton'
import { CardContainer } from '../../components/card/CardContainer'
import ActionButton from '../../components/button/ActionButton'
import ModalDelete from '../../components/modal/ModalDelete'
import ModalPointManual from '../../components/modal/ModalPointManual'

function IndexPointManual() {
  const [row, setRow] = useState(5)
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

  const showDelete = (id: string) => {
    setModalDelete(!modalDelete)
  }

  const showModalPointManual = (data: any, index: number) => {
    setModalPointManual((prev) => !prev)
    setEditIndex(index)
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
            // onClick={onSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )
  const data = [
    {
      updatedAt: '18/05/2565, 10:00',
      name: 'แต้มสำหรับแนะนำยาให้เกษตรกร',
      countFarmer: 1,
      timeFramer: 1,
      countDroner: 1,
      timeDroner: 1,
      sumTotal: 200,
    },
  ]
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
                setSortField('updatedAt')
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
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
                setSortField('updatedAt')
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนเกษตรกร
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('updatedAt')
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
      dataIndex: 'countFarmer',
      key: 'countFarmer',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>1 ครั้ง (1 คน)</>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนนักบินโดรน
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('updatedAt')
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
      dataIndex: 'countDroner',
      key: 'countDroner',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>1 ครั้ง (1 คน)</>,
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
                setSortField('updatedAt')
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
      dataIndex: 'sumTotal',
      key: 'sumTotal',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>200 แต้ม</>,
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
                  onClick={() => navigate('/DetailPointManual')}
                />
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => showModalPointManual(row, index + 1)}
                />
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => showDelete(row.id)}
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
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </ConfigProvider>
        </Spin>
      </CardContainer>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {1} รายการ</p>
        <Pagination
          current={1}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={1}
        />
      </div>
      <ModalDelete
        show={modalDelete}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => {
          setModalDelete(!modalDelete)
          console.log(1)
        }}
        title1={'โปรดตรวจสอบของรายการแต้มพิเศษที่คุณต้องการลบ ก่อนที่จะกด'}
        title2={'ยืนยันเพราะอาจส่งผลต่อการแสดงผลแต้มของผู้ใช้ในแอปพลิเคชัน'}
      />
      <ModalPointManual
        show={modalPointManual}
        backButton={() => setModalPointManual(!modalPointManual)}
        callBack={() => {
          setModalPointManual(!modalPointManual)
          console.log(1)
        }}
        name={''}
        detail={''}
        editIndex={editIndex}
        isEditModal={editIndex > 0 ? true : false}
        title={editIndex > 0 ? 'แก้ไขชื่อรายการแต้มพิเศษ' : 'เพิ่มชื่อรายการแต้มพิเศษ'}
      />
    </>
  )
}

export default IndexPointManual
