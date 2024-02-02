import React, { useState, useEffect, useMemo } from 'react'
import { Input, Select, Button, Spin, Table, Pagination, PaginationProps } from 'antd'
import { Option } from 'antd/lib/mentions'
import { color } from '../../../resource'
import { CaretUpOutlined, CaretDownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import ActionButton from '../../../components/button/ActionButton'
import { useNavigate } from 'react-router-dom'
import { GroupGuruDataSource } from '../../../datasource/GroupGuruDatasource'
import {
  AllGroupGuruEntities,
  GroupGuruEntities,
  GroupGuruEntities_INIT,
} from '../../../entities/GuruKasetEntities'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import ModalGroupGuru from '../../../components/modal/ModalGroupGuru'
import ModalDelete from '../../../components/modal/ModalDelete'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../../store/ProfileAtom'

function IndexGroupGuru() {
  const navigate = useNavigate
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null
  const guruRole = useMemo(() => {
    return currentRole?.guru.find((el) => el.name === 'กูรูเกษตร')
  }, [currentRole?.guru])
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [current, setCurrent] = useState(1)
  const [row, setRow] = useState(10)
  const [data, setData] = useState<AllGroupGuruEntities>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState(0)
  const [dataGroupGuru, setDataGroupGuru] = useState<GroupGuruEntities>(GroupGuruEntities_INIT)
  const [groupGuruId, setGroupGuruId] = useState('')
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  useEffect(() => {
    getGroupGuru()
  }, [sortDirection])

  const getGroupGuru = async () => {
    setLoading(true)
    await GroupGuruDataSource.getAllGroupGuru(current, row, searchText, sortField, sortDirection)
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }

  const showModalGroupGuru = (data: any, index: number) => {
    setShowModal((prev) => !prev)
    setEditIndex(index)
    setDataGroupGuru(data)
  }
  const showDelete = (id: string) => {
    setGroupGuruId(id)
    setModalDelete(!modalDelete)
  }
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
                setSortField('updatedAt')
                setSortDirection((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
                  } else {
                    return undefined
                  }
                })
                setSortDirection1((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
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
                  color: sortDirection1 === 'asc' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection1 === 'desc' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '15%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {DateTimeUtil.formatDateTime(row.updatedAt) || '-'}
              </span>
            </div>
          ),
        }
      },
    },
    {
      title: 'ชื่อหมวดหมู่',
      dataIndex: 'groupName',
      key: 'groupName',
      width: '50%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>{value}</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนบทความ/วิดีโอ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('articleCount')
                setSortDirection((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
                  } else {
                    return undefined
                  }
                })
                setSortDirection2((prev) => {
                  if (prev === 'asc') {
                    return 'desc'
                  } else if (prev === undefined) {
                    return 'asc'
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
                  color: sortDirection2 === 'asc' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection2 === 'desc' ? '#ffca37' : 'white',
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
              <span className='text-dark-75  d-block font-size-lg'>
                {numberWithCommas(row.articleCount) || 0} บทความ |{' '}
                {numberWithCommas(row.videoCount) || 0} วิดิโอ
              </span>
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
        const checkDelete = row.videoCount === 0 && row.articleCount === 0
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              {guruRole?.edit.value && (
                <div className='pr-1'>
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => showModalGroupGuru(row, index + 1)}
                  />
                </div>
              )}
              {guruRole?.delete.value && (
                <div className='pr-1'>
                  <ActionButton
                    actionDisable={!checkDelete}
                    icon={<DeleteOutlined />}
                    color={checkDelete ? color.Error : color.Grey}
                    onClick={() => showDelete(row._id)}
                  />
                </div>
              )}
            </div>
          ),
        }
      },
    },
  ]
  return (
    <div>
      <div className='d-flex'>
        <span className='p-3'>
          <strong style={{ fontSize: '20px' }}>หมวดหมู่ </strong>
        </span>
      </div>
      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-9 p-1'>
          <Input
            placeholder='ค้นหาชื่อหมวดหมู่'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Button
            className='col-lg-12'
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1)
              getGroupGuru()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
        {guruRole?.add.value && (
          <div className='col-lg-2 p-1'>
            <Button
              className='col-lg-12'
              style={{
                borderColor: color.Success,
                borderRadius: '5px',
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
              onClick={() => setShowModal((prev) => !prev)}
            >
              เพิ่มชื่อหมวดหมู่
            </Button>
          </div>
        )}
      </div>

      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={(page: number) => setCurrent(page)}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
        />
      </div>

      <ModalGroupGuru
        action='edit'
        show={showModal}
        backButton={() => {
          setEditIndex(0)
          getGroupGuru()
          setShowModal((prev) => !prev)
        }}
        data={editIndex > 0 ? dataGroupGuru : GroupGuruEntities_INIT}
        callBack={() => {
          getGroupGuru()
          setShowModal((prev) => !prev)
        }}
        isEditModal={editIndex > 0 ? true : false}
        title={editIndex > 0 ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่'}
      />
      <ModalDelete
        show={modalDelete}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => {
          GroupGuruDataSource.deleteGroupGuru(groupGuruId).then((res) => {
            if (res) {
              setModalDelete(!modalDelete)
              getGroupGuru()
            }
          })
        }}
        title1={'โปรดตรวจสอบหมวดหมู่ที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ '}
        title2={'เพราะอาจต่อการแสดงผลบทความ/วิดีโอในระบบแอปพลิเคชัน'}
      />
    </div>
  )
}

export default IndexGroupGuru
