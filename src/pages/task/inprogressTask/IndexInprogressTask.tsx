import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  DatePicker,
  Divider,
  Image,
  Input,
  Pagination,
  PaginationProps,
  Popover,
  Select,
  Spin,
  Table,
  Tooltip,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ActionButton from '../../../components/button/ActionButton'
import { CardContainer } from '../../../components/card/CardContainer'
import ModalMapPlot from '../../../components/modal/task/newTask/ModalMapPlot'
import InvoiceTask from '../../../components/popover/InvoiceTask'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import {
  DistrictEntity,
  ProvinceEntity,
  SubdistrictEntity,
} from '../../../entities/LocationEntities'
import { InvoiceTaskEntity } from '../../../entities/NewTaskEntities'
import { TaskInprogressPageEntity } from '../../../entities/TaskInprogress'
import { color } from '../../../resource'
import icon from '../../../resource/icon'
import { numberWithCommas, numberWithCommasToFixed } from '../../../utilities/TextFormatter'
import { DashboardLayout } from '../../../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { listAppType } from '../../../definitions/ApplicatoionTypes'
import { ListCheck } from '../../../components/dropdownCheck/ListStatusAppType'
import ShowNickName from '../../../components/popover/ShowNickName'

const { RangePicker } = DatePicker
const dateFormat = 'DD/MM/YYYY'
const timeFormat = 'HH:mm'
const dateSearchFormat = 'YYYY-MM-DD'

const IndexInprogressTask = () => {
  const navigate = useNavigate()
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<TaskInprogressPageEntity>()
  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [plotId, setPlotId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>()
  const [searchProvince, setSearchProvince] = useState<any>()
  const [searchDistrict, setSearchDistrict] = useState<any>()
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>()
  const [searchStatus, setSearchStatus] = useState<any>()
  const [province, setProvince] = useState<ProvinceEntity[]>()
  const [district, setDistrict] = useState<DistrictEntity[]>()
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>()
  const [appTypeArr, setAppTypeArr] = useState<string[]>([])
  const [applicationType, setApplicationType] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const statusSearch = [
    { value: 'false', name: 'รอดำเนินงาน' },
    { value: 'true', name: 'งานมีปัญหา' },
  ]

  const fetchInprogressTask = async () => {
    setLoading(true)
    await TaskDatasource.getInprogressTaskList(
      row,
      current,
      searchProvince,
      searchDistrict,
      searchSubdistrict,
      searchText,
      startDate,
      endDate,
      searchStatus,
      applicationType,
      sortDirection,
      sortField,
    )
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log(err))
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
  useEffect(() => {
    LocationDatasource.getDistrict(searchProvince).then((res) => {
      setDistrict(res)
      setSearchDistrict(null)
    })
  }, [searchProvince])

  useEffect(() => {
    LocationDatasource.getSubdistrict(searchDistrict).then((res) => {
      setSubdistrict(res)
      setSearchSubdistrict(null)
    })
  }, [searchDistrict])
  useEffect(() => {
    fetchInprogressTask()
    fetchProvince()
  }, [current, startDate, endDate, row, sortDirection])

  const SearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setStartDate(e)
      setEndDate(e)
    }
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
  }
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev)
    setPlotId(plotId)
  }
  const handleProvince = (provinceId: any) => {
    if (!provinceId) {
      setSearchDistrict(undefined)
      setSearchSubdistrict(undefined)
    }
    setSearchProvince(provinceId)
    fetchDistrict(provinceId)
  }
  const handleDistrict = (districtId: any) => {
    if (!districtId) {
      setSearchSubdistrict(undefined)
    }
    fetchSubdistrict(districtId)
    setSearchDistrict(districtId)
  }
  const handleSubDistrict = (subdistrictId: any) => {
    setSearchSubdistrict(subdistrictId)
  }

  const handleStatus = (status: boolean) => {
    setSearchStatus(status)
  }
  const onSearchCreateBy = (value: string, checked: boolean) => {
    let arr: any = 0
    if (checked === true) {
      arr = [...appTypeArr, value]
      setAppTypeArr([...appTypeArr, value])
      setApplicationType(value)
    } else {
      const d: string[] = appTypeArr.filter((x) => x != value)
      arr = [...d]
      setAppTypeArr(d)
      if (d.length === 0) {
        arr = undefined
      }
    }
    setApplicationType(arr)
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const PageTitle = (
    <>
      <div className='d-flex justify-content-between' style={{ padding: '10px' }}>
        <div>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>งานรอดำเนินงาน</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker allowClear onCalendarChange={SearchDate} format={dateFormat} />
        </div>
      </div>
      <div className='d-flex justify-content-between pb-3'>
        <div className='col-lg-2 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อเกษตรกร, คนบินโดรน หรือเบอร์โทร'
            className='col-lg-12'
            onChange={changeTextSearch}
          />
        </div>
        <div className='col-lg p-1'>
          <Select
            allowClear
            className='col-lg-12'
            placeholder='เลือกจังหวัด'
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            onChange={handleProvince}
          >
            {province?.map((item) => <option value={item.provinceId}>{item.provinceName}</option>)}
          </Select>
        </div>
        <div className='col-lg p-1'>
          <Select
            allowClear
            className='col-lg-12'
            placeholder='เลือกอำเภอ'
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            onChange={handleDistrict}
            disabled={!searchProvince}
            value={searchDistrict}
          >
            {district?.map((item) => <option value={item.districtId}>{item.districtName}</option>)}
          </Select>
        </div>
        <div className='col-lg p-1'>
          <Select
            allowClear
            className='col-lg-12'
            placeholder='เลือกตำบล'
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            onChange={handleSubDistrict}
            disabled={!searchDistrict}
            value={searchSubdistrict}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId}>{item.subdistrictName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <ListCheck
            onSearchType={(value: any, checked: any) => onSearchCreateBy(value, checked)}
            list={applicationType}
            title='เลือกรูปแบบการสร้าง'
            menu='TASK'
          />
        </div>
        <div className='col-lg p-1'>
          <Select className='col-lg-12' placeholder='เลือกสถานะ' onChange={handleStatus} allowClear>
            {statusSearch.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
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
            onClick={() => {
              setCurrent(1)
              fetchInprogressTask()
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
            วัน/เวลานัดหมาย{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('task_date_appointment')
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
      dataIndex: 'dateAppointment',
      key: 'dateAppointment',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {moment(new Date(row.task_date_appointment)).format(dateFormat)},{' '}
                {moment(new Date(row.task_date_appointment)).format(timeFormat)}
                {row.count_change_appointment != null && (
                  <Tooltip title='มีการเปลี่ยนแปลงวันและเวลานัดหมาย' className='p-2'>
                    <img src={icon.iconChangeTime} style={{ width: 30, height: 30 }} />
                  </Tooltip>
                )}
              </span>

              <span style={{ color: color.Grey, fontSize: '12px' }}>{row.task_task_no}</span>
            </>
          ),
        }
      },
    },
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
                setSortField('droner_firstname')
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
      dataIndex: 'droner',
      key: 'droner',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.droner !== null ? row.droner_firstname + ' ' + row.droner_lastname : null}
                {row.count_change_droner != null && (
                  <Tooltip title='มีการเปลี่ยนแปลงนักบินโดรนคนใหม่' className='p-2'>
                    <img src={icon.iconChangeDroner} style={{ width: 30, height: 30 }} />
                  </Tooltip>
                )}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                {row.droner !== null ? row.droner_telephone_no : null}
                {row.droner_nickname && <ShowNickName data={row.droner_nickname} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อเกษตรกร
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('farmer_firstname')
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
      dataIndex: 'farmer',
      key: 'farmer',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.farmer_firstname + ' ' + row.farmer_lastname}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                {row.farmer_telephone_no}
                {row.farmer_nickname && <ShowNickName data={row.farmer_nickname} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'พื้นที่แปลงเกษตร',
      dataIndex: 'plotArea',
      key: 'plotArea',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.plotArea_subdistrict_name +
                  '/' +
                  row.plotArea_district_name +
                  '/' +
                  row.plotArea_province_name}
              </span>
              <a
                onClick={() => handleModalMap(row.task_farmer_plot_id)}
                style={{ color: color.primary1 }}
              >
                ดูแผนที่แปลง
              </a>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ค่าบริการ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('task_total_price')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection4((prev) => {
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
                  color: sortDirection4 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection4 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'task_total_price',
      key: 'task_total_price',
      render: (value: any, row: any, index: number) => {
        const inv: InvoiceTaskEntity = {
          raiAmount: row.task_farm_area_amount,
          unitPrice: row.task_unit_price,
          price: row.task_price,
          fee: row.task_fee,
          discountFee: row.task_discount_fee,
          discountCoupon: row.task_discount_coupon,
          discountPromotion: row.task_discount_promotion,
          discountPoint: row.task_discount_campaign_point,
          totalPrice: row.task_total_price,
        }
        return {
          children: (
            <>
              <span>
                {row.task_total_price !== null
                  ? numberWithCommas(parseFloat(row.task_total_price)) + ' บาท'
                  : '0 บาท'}
              </span>
              <InvoiceTask iconColor={color.Success} title='รายละเอียดค่าบริการ' data={inv} />
            </>
          ),
        }
      },
    },
    {
      title: 'สร้างโดย',
      dataIndex: 'createByWho',
      key: 'createByWho',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {listAppType.map(
                (item) =>
                  row.task_application_type === item.value && (
                    <>
                      <Image src={item.icon} preview={false} style={{ width: 24, height: 24 }} />
                      <span>
                        {' '}
                        {row.task_create_by ? row.task_create_by + ` ${item.create}` : '-'}
                      </span>
                    </>
                  ),
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (value: any, row: any, index: number) => {
        const statusColor: { text?: string; color?: any } = {}
        statusColor.text = !row.task_is_problem ? 'รอดำเนินงาน' : 'งานมีปัญหา'
        statusColor.color = !row.task_is_problem ? color.Warning : color.Error
        return {
          children: (
            <>
              <span style={{ color: statusColor.color }}>
                <Badge color={statusColor.color} /> {statusColor.text}
              </span>
              <br />
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 0.5 }} />
                {row.task_create_by}
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
            <div className='d-flex flex-row justify-content-between'>
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => navigate('/EditInprogressTask/id=' + row.task_id)}
              />
            </div>
          ),
        }
      },
    },
  ]

  return (
    <div>
      <>
        {PageTitle}
        <CardContainer>
          <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns}
              dataSource={data?.data}
              pagination={false}
              rowClassName={(a) => (a.task_is_problem ? 'table-row-older' : 'table-row')}
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
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </>
      {showModalMap && (
        <ModalMapPlot
          show={showModalMap}
          backButton={() => setShowModalMap((prev) => !prev)}
          title='แผนที่แปลงเกษตร'
          plotId={plotId}
        />
      )}
    </div>
  )
}
export default IndexInprogressTask
