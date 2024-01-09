import {
  Badge,
  Button,
  Dropdown,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Slider,
  Spin,
  Table,
  Tabs,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { color, image } from '../../../resource'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
  StarFilled,
  SwapOutlined,
} from '@ant-design/icons'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import ActionButton from '../../../components/button/ActionButton'
import { useNavigate } from 'react-router-dom'
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from '../../../entities/LocationEntities'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import icon from '../../../resource/icon'
import AddButtton from '../../../components/button/AddButton'
import ModalDronerInfinity from '../../../components/modal/ModalDronerInfinity'
import ModalDelete from '../../../components/modal/ModalDelete'

import { DronerFinityDatasource } from '../../../datasource/DronerFinityDatasource'
import { AllDronerFinityEntity, updateStatus } from '../../../entities/DronerFinityEntities'
import { useLocalStorage } from '../../../hook/useLocalStorage'

function DronerInfinity() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<any>('ACTIVE')
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [dataDroner, setDataDroner] = useState<AllDronerFinityEntity>()
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [province, setProvince] = useState<ProviceEntity[]>([])
  const [district, setDistrict] = useState<DistrictEntity[]>([])
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([])
  const [provinceId, setProvinceId] = useState<any>()
  const [districtId, setDistrictId] = useState<any>()
  const [subDistrictId, setSubDistrictId] = useState<any>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState(0)
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<any>()
  const [dataEdit, setDataEdit] = useState<any>()
  const [profile] = useLocalStorage('profile', [])

  const [credit, setCredit] = useState<{
    min: number
    max: number
  }>({
    min: 0,
    max: 0,
  })
  useEffect(() => {
    fetchAllDroner()
    fetchProvince()
  }, [status, sortDirection, current, row])

  const fetchAllDroner = async () => {
    setLoading(true)
    await DronerFinityDatasource.getAllDroner(
      status,
      searchText,
      provinceId, 
      districtId,
      subDistrictId,
      credit.min,
      credit.max,
      sortField,
      sortDirection,
      current,
      row,
    )
      .then((res) => {
        setDataDroner(res)
      })
      .finally(() => setLoading(false))
  }

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res)
    })
  }
  const fetchDistrict = async (provinceId: number) => {
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res)
    })
  }
  const fetchSubdistrict = async (districtId: number) => {
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res)
    })
  }
  const tabConfigurations = [
    { title: `ใช้งาน (${dataDroner?.summary.countactive})`, key: 'ACTIVE' },
    { title: `ยกเลิก (${dataDroner?.summary.countcanceled})`, key: 'CANCELED' },
  ]
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const handleSearchProvince = (provinceId: any) => {
    if (!provinceId) {
      setDistrictId(null)
      setSubDistrictId(null)
    }
    setProvinceId(provinceId)
    fetchDistrict(provinceId)
  }
  const handleSearchDistrict = (districtId: any) => {
    if (!districtId) {
      setSubDistrictId(null)
    }
    fetchSubdistrict(districtId)
    setDistrictId(districtId)
  }
  const handleSearchSubdistrict = (subdistrictId: any) => {
    setSubDistrictId(subdistrictId)
  }
  const showModalDronerList = (data: any, index: number) => {
    setShowModal((prev) => !prev)
    setEditIndex(index)
    setDataEdit(data)
  }
  const showDelete = (id: string) => {
    setDeleteId(id)
    setModalDelete(!modalDelete)
  }
  const onChangeSlider = (newValue: any) => {
    const [newMin, newMax] = newValue
    setCredit({ min: newMin , max: newMax  })
  }
  const onChangeCreditMin = (e: any) => {
    const inputValue = e.target.value
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setCredit({ min: convertedNumber, max: credit.max })
  }
  const onChangeCreditMax = (e: any) => {
    const inputValue = e.target.value
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setCredit({ min: credit.min, max: convertedNumber })
  }
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อนักบินโดรน
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('firstname')
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
      dataIndex: 'droner',
      key: 'droner',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <div className='container'>
                <span className='text-dark-75  d-block font-size-lg'>
                  {row.droner.firstname || '-'} {row.droner.lastname || '-'}
                </span>
                <div>
                  <span className=' d-block font-size-lg' style={{ color: color.Grey }}>
                    {row.droner.dronerCode || '-'}
                  </span>
                </div>
              </div>
            </div>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telephoneNo',
      key: 'telephoneNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span className=' d-block font-size-lg'>{row.droner.telephoneNo || '-'}</span>,
        }
      },
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      render: (value: any, row: any, index: number) => {
        const subdistrict = row.droner.address !== null ? row.droner.address.subdistrict : null
        const district = row.droner.address !== null ? row.droner.address.district : null
        const province = row.droner.address !== null ? row.droner.address.province : null
        return {
          children: (
            <span>
              {' '}
              {subdistrict ? subdistrict.subdistrictName + '/' : '-/'}
              {district ? district.districtName + '/' : '-/'}
              {province ? province.provinceName : '-'}
            </span>
          ),
        }
      },
    },
    {
      title: 'แต้มสะสม',
      dataIndex: 'like',
      key: 'like',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {' '}
              <StarFilled
                style={{
                  color: '#FFCA37',
                  fontSize: '16px',
                  marginRight: '7px',
                  verticalAlign: 0.5,
                }}
              />
              {numberWithCommas(row.point) || 0}
            </span>
          ),
        }
      },
    },
    {
      title: 'เครดิต',
      dataIndex: 'credit',
      key: 'credit',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.credit)}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนยา / ปุ๋ย
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
      dataIndex: 'drugAmount',
      key: 'drugAmount',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {numberWithCommas(row.drugAmount)} ขวด / {numberWithCommas(row.fertilizerAmount)}{' '}
              กระสอบ
            </span>
          ),
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
            <span
              style={{
                color: row.status !== 'CANCELED' ? color.Success : color.Error,
              }}
            >
              <Badge color={row.status !== 'CANCELED' ? color.Success : color.Error} />{' '}
              {row.status === 'CANCELED' ? 'ยกเลิก' : 'ใช้งาน'}
            </span>
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
              {row.status === 'CANCELED' ? (
                <ActionButton
                  actionDisable={row.credit !== 0}
                  icon={<img src={icon.upload_droner} style={{ width: '20px', height: '20px' }} />}
                  color={color.Success}
                  onClick={() => {
                    showModalDronerList(row, index + 1)
                  }}
                />
              ) : (
                <>
                  <ActionButton
                    icon={<SwapOutlined />}
                    color={color.primary1}
                    onClick={() => navigate(`/DronerInfinity/${row.dronerId}`)}
                  />
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => showModalDronerList(row, index + 1)}
                  />
                  <ActionButton
                    actionDisable={row.credit > 0}
                    icon={
                      <img
                        src={row.credit > 0 ? icon.account_cancel_disable : icon.account_cancel}
                        style={{ width: '20px', height: '20px' }}
                      />
                    }
                    color={row.credit > 0 ? color.Grey : color.Error}
                    bgColor={row.credit > 0 ? '#F2F5FC' : 'none'}
                    onClick={() => {
                      showDelete(row.id)
                    }}
                  />
                </>
              )}
            </Row>
          ),
        }
      },
    },
  ]
  const emptyState = {
    emptyText: (
      <div style={{ textAlign: 'center', padding: '4%' }}>
        <img src={image.empty_shop} style={{ width: 90, height: 90 }} />
        <p>ยังไม่มีข้อมูลร้านค้า</p>
      </div>
    ),
  }
  return (
    <div>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <div>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>รายชื่อนักบินโดรน (แนะนำยา / ปุ๋ย)</strong>
          </span>
        </div>
        <div>
          <AddButtton text='เพิ่มชื่อนักบินโดรน' onClick={() => setShowModal((prev) => !prev)} />
        </div>
      </div>
      <div className='pt-3'>
        <Tabs
          className={status === 'CANCELED' ? 'tab-status-inactive' : ''}
          onChange={(key: any) => setStatus(key)}
          type='card'
        >
          {tabConfigurations.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={tab.key} />
          ))}
        </Tabs>
      </div>
      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-4 p-1'>
          <Input
            placeholder='ค้นหาชื่อนักบิน / เบอร์โทร / ID นักบินโดรน'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกจังหวัด'
            onChange={handleSearchProvince}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {province?.map((item, index) => (
              <option key={index} value={item.provinceId.toString()}>
                {item.provinceName}
              </option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกอำเภอ'
            onChange={handleSearchDistrict}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            disabled={!provinceId}
            value={districtId}
          >
            {district?.map((item, index) => (
              <option key={index} value={item.districtId.toString()}>
                {item.districtName}
              </option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกตำบล'
            onChange={handleSearchSubdistrict}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            disabled={!districtId}
            value={subDistrictId}
          >
            {subdistrict?.map((item, index) => (
              <option key={index} value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </option>
            ))}
          </Select>
        </div>

        <div className='col-lg p-1'>
          <Dropdown
            overlay={
              <div
                style={{
                  backgroundColor: color.White,
                  padding: 20,
                  width: '350px',
                  height: '150px',
                  textAlign: 'center',
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.15)',
                }}
              >
                <label>จำนวนเครดิต</label>
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  style={{ color: color.Success }}
                  value={[credit.min, credit.max]}
                  onChange={onChangeSlider}
                  max={100}
                />
                <div className='d-flex justify-content-between pt-3 pb-3'>
                  <Input
                    min={0}
                    max={100}
                    style={{
                      margin: '0 16px',
                    }}
                    id='min'
                    value={credit.min}
                    onChange={onChangeCreditMin}
                  />
                  <Input
                    min={0}
                    max={100}
                    style={{
                      margin: '0 16px',
                    }}
                    id='max'
                    value={credit.max}
                    onChange={onChangeCreditMax}
                  />
                </div>
              </div>
            }
          >
            <Button
              className='col-lg-12'
              style={{
                color: color.Disable,
              }}
            >
              {credit.min || credit.max ? (
                <span style={{color: color.font}}>{credit.min + ' - ' + credit.max} เครดิต</span>
              ) : (
                'เลือกจำนวนเครดิต'
              )}
            </Button>
          </Dropdown>
        </div>
        <div className='col-lg-1 p-1'>
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
              fetchAllDroner()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>

      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          locale={emptyState}
          columns={columns}
          dataSource={dataDroner?.data}
          pagination={false}
          rowKey='id'
          scroll={{ x: 'max-content' }}
        />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {dataDroner?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={(page: number) => setCurrent(page)}
          onShowSizeChange={onShowSizeChange}
          total={dataDroner?.count}
        />
      </div>

      <ModalDronerInfinity
        action={editIndex > 0 ? 'edit' : undefined}
        show={showModal}
        backButton={() => {
          setEditIndex(0)
          setShowModal((prev) => !prev)
          window.location.reload()
        }}
        isEditModal={editIndex > 0 ? true : false}
        data={editIndex > 0 ? dataEdit : undefined}
        title={
          dataEdit?.status === 'CANCELED'
            ? 'เปิดการเข้ากิจกรรมนักบินโดรนอีกครั้ง'
            : editIndex > 0
            ? 'แก้ไขรายชื่อนักบินโดรน'
            : 'เพิ่มรายชื่อนักบินโดรน'
        }
      />
      <ModalDelete
        show={modalDelete}
        title={'ยกเลิกนักบินโดรนที่เข้าร่วม 1-Finity'}
        title1={'โปรดตรวจสอบชื่อนักบินโดรน ก่อนที่จะกดยืนยันการยกเลิกนักบินโดรน'}
        title2={' เพราะอาจส่งผลต่อการคืนยา คืนเครดิต และคืนแต้มในระบบ'}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => {
          const params: updateStatus = {
            id: deleteId,
            updatedBy: `${profile?.firstname} ${profile?.lastname}`,
            status: status === 'ACTIVE' ? 'CANCELED' : 'ACTIVE',
          }
          DronerFinityDatasource.updateStatus(params).then((res) => {
            if (res) {
              setModalDelete(!modalDelete)
              window.location.reload()
            }
          })
        }}
      />
    </div>
  )
}

export default DronerInfinity
