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
} from 'antd'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import ActionButton from '../../../components/button/ActionButton'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import {
  DistrictEntity,
  ProvinceEntity,
  SubdistrictEntity,
} from '../../../entities/LocationEntities'
import color from '../../../resource/color'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
  FileTextOutlined,
  InfoCircleFilled,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons'
import { TaskFinishedDatasource } from '../../../datasource/TaskFinishDatasource'
import { TaskFinishListEntity } from '../../../entities/TaskFinishEntities'

import {
  FINISH_TASK,
  FINISH_TASK_SEARCH,
  STATUS_COLOR_TASK,
  TASK_HISTORY,
} from '../../../definitions/FinishTask'
import ModalMapPlot from '../../../components/modal/task/finishTask/ModalMapPlot'
import { numberWithCommas, numberWithCommasToFixed } from '../../../utilities/TextFormatter'
import { DashboardLayout } from '../../../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import InvoiceTask from '../../../components/popover/InvoiceTask'
import { InvoiceTaskEntity } from '../../../entities/NewTaskEntities'
import { ListCheck } from '../../../components/dropdownCheck/ListStatusAppType'
import { listAppType } from '../../../definitions/ApplicatoionTypes'
import CheckDocument from '../../../components/dropdownCheck/CheckDocument'
import { icon } from '../../../resource'
import ShowNickName from '../../../components/popover/ShowNickName'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../../store/ProfileAtom'
import { MAP_COLOR, MAP_TEXT } from './DetailTaskPage.tsx/ReviewTask'

export default function IndexFinishTask() {
  const navigate = useNavigate()
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<TaskFinishListEntity>()
  const [searchText, setSearchText] = useState<string>()
  const [searchStatus, setSearchStatus] = useState<string>()
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [searchProvince, setSearchProvince] = useState<any>()
  const [searchDistrict, setSearchDistrict] = useState<any>()
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>()
  const [province, setProvince] = useState<ProvinceEntity[]>()
  const [district, setDistrict] = useState<DistrictEntity[]>()
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>()
  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [plotId, setPlotId] = useState<string>('')
  const { RangePicker } = DatePicker
  const dateFormat = 'DD/MM/YYYY'
  const timeFormat = 'HH:mm'
  const dateSearchFormat = 'YYYY-MM-DD'
  const [checkDocArr, setCheckDocArr] = useState<string[]>([])
  const [appTypeArr, setAppTypeArr] = useState<string[]>([])
  const [applicationType, setApplicationType] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [documentPersons, setDocumentPersons] = useState<any>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)

  const finishTaskRole = useMemo(() => {
    const find = currentRole?.followJob?.find((el) => el.name === 'งานที่เสร็จแล้ว')
    return find
  }, [currentRole])

  const fetchTaskFinish = async () => {
    setLoading(true)
    await TaskFinishedDatasource.getTaskFinishList(
      current,
      row,
      searchStatus,
      searchText,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      startDate,
      endDate,
      applicationType,
      sortDirection,
      sortField,
      documentPersons,
    )
      .then((res: TaskFinishListEntity) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
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
    fetchTaskFinish()
    fetchProvince()
  }, [current, row, startDate, endDate, sortDirection])
  const SearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setStartDate(e)
      setEndDate(e)
    }
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
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const handleStatus = (status: any) => {
    setSearchStatus(status)
  }

  const handleProvince = (provinceId: any) => {
    const filterId = district?.map((x) => x.provinceId)[0]
    if (!provinceId || parseFloat(provinceId) !== filterId) {
      setSearchDistrict(undefined)
      setSearchSubdistrict(undefined)
      setSearchProvince(undefined)
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
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev)
    setPlotId(plotId)
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
  const onSearchCheckDocument = (value: string, checked: boolean) => {
    let arr: any = 0
    if (checked === true) {
      arr = [...checkDocArr, value]
      setCheckDocArr([...checkDocArr, value])
      setDocumentPersons(value)
    } else {
      const d: string[] = checkDocArr.filter((x) => x != value)
      arr = [...d]
      setCheckDocArr(d)
      if (d.length === 0) {
        arr = undefined
      }
    }
    setDocumentPersons(arr)
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
            <strong>งานที่เสร็จแล้ว</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker allowClear onCalendarChange={SearchDate} format={dateFormat} />
        </div>
      </div>
      <div className='d-flex justify-content-between' style={{ padding: '0px' }}>
        <div className='col-lg-2 p-1'>
          <Input
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อเกษตรกร, คนบินโดรน หรือเบอร์โทร'
            className='col-lg-12 p-1'
            onChange={changeTextSearch}
          />
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกจังหวัด'
            onChange={handleProvince}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {province?.map((item) => (
              <option value={item.provinceId.toString()}>{item.provinceName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกอำเภอ'
            onChange={handleDistrict}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            disabled={!searchProvince}
            value={searchDistrict}
          >
            {district?.map((item) => (
              <option value={item.districtId.toString()}>{item.districtName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกตำบล'
            onChange={handleSubDistrict}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            disabled={!searchDistrict}
            value={searchSubdistrict}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId.toString()}>{item.subdistrictName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg-2'>
          <ListCheck
            onSearchType={(value: any, checked: any) => onSearchCreateBy(value, checked)}
            list={applicationType}
            title='เลือกรูปแบบการสร้าง'
            menu='TASK'
          />
        </div>
        <div className='col-lg'>
          <CheckDocument
            onSearchType={(value: any, checked: any) => onSearchCheckDocument(value, checked)}
            list={documentPersons}
            title='เลือกการตรวจเอกสาร'
          />
        </div>
        <div className='col-lg'>
          <Select
            className='col-lg-12 p-1'
            placeholder='เลือกสถานะ'
            onChange={handleStatus}
            allowClear
          >
            {FINISH_TASK_SEARCH.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
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
              fetchTaskFinish()
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
            วัน/เวลานัดหมาย
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('dateAppointment')
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
                {moment(new Date(row.dateAppointment)).format(dateFormat)},{' '}
                {moment(new Date(row.dateAppointment)).format(timeFormat)}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>{row.taskNo}</span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อนักบินโดรน{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('dronerFirstname')
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
                {row.droner !== null ? row.droner.firstname + ' ' + row.droner.lastname : '-'}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                {row?.droner?.telephoneNo || '-'}
                {row.droner && row.droner.nickname && (
                  <ShowNickName data={row.droner.nickname} menu='INFO' />
                )}
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
                setSortField('farmerFirstname')
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
                {row.farmer.firstname + ' ' + row.farmer.lastname}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                {row.farmer.telephoneNo || '-'}
                {row.farmer && row.farmer.nickname && (
                  <ShowNickName data={row.farmer.nickname} menu='INFO' />
                )}
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
        const subdistrict = row.farmerPlot.plotArea
        const district = row.farmerPlot.plotArea
        const province = row.farmerPlot.plotArea
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {subdistrict !== null ? subdistrict.subdistrictName + '/' : '-/'}
                {district !== null ? district.districtName + '/' : '-/'}
                {province !== null ? province.provinceName + '' : '-'}
              </span>
              <a onClick={() => handleModalMap(row.farmerPlotId)} style={{ color: color.primary1 }}>
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
            Rating{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('reviewDronerAvg')
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
      dataIndex: 'avgrating',
      key: 'avgrating',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.reviewDronerAvg > '0' ? (
                  <span>
                    <StarFilled
                      style={{
                        color: '#FFCA37',
                        fontSize: '20px',
                        marginRight: '7px',
                        verticalAlign: 0.5,
                      }}
                    />
                    {parseFloat(row.reviewDronerAvg).toFixed(1)}
                  </span>
                ) : (
                  '-'
                )}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'ตรวจเอกสาร',
      dataIndex: '',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div>
                <Image
                  src={row.droner?.file.length === 1 ? icon.check : icon.cancel}
                  preview={false}
                  style={{ width: 18, height: 18, marginRight: 6 }}
                />
                บัตรประชาชน
              </div>
              <div>
                <Image
                  src={row.droner?.isBookBank === true ? icon.check : icon.cancel}
                  preview={false}
                  style={{ width: 18, height: 18, marginRight: 6 }}
                />
                สมุดบัญชี
              </div>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ค่าบริการ{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('totalPrice')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection5((prev) => {
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
                  color: sortDirection5 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection5 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'subdistrict_subdistrict_name',
      key: 'subdistrict_subdistrict_name',
      render: (value: any, row: any, index: number) => {
        const inv: InvoiceTaskEntity = {
          raiAmount: row.farmAreaAmount,
          unitPrice: row.unitPrice,
          price: row.price,
          fee: row.fee,
          discountFee: row.discountFee,
          discountCoupon: row.discountCoupon,
          discountPromotion: row.discountPromotion,
          discountPoint: row.discountCampaignPoint,
          totalPrice: row.totalPrice,
        }
        return {
          children: (
            <>
              <span>
                {row.totalPrice != null ? numberWithCommas(row.totalPrice) + ' บาท' : '0 บาท'}
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
                  row.applicationType === item.value && (
                    <>
                      <Image src={item.icon} preview={false} style={{ width: 24, height: 24 }} />
                      <span> {row.createBy ? row.createBy + ` ${item.create}` : '-'}</span>
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
      dataIndex: 'district_district_name',
      key: 'district_district_name',
      render: (value: any, row: any, index: number) => {
        const beforeValue = row.taskHistory[0]
        const isDelay = row.isDelay
        const statusDelayText = MAP_TEXT[row.statusDelay as keyof typeof MAP_TEXT]
        const statusDelayColor = MAP_COLOR[row.statusDelay as keyof typeof MAP_COLOR]
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_TASK[row.status] }}>
                <Badge color={STATUS_COLOR_TASK[row.status]} /> {FINISH_TASK[row.status]}
                {beforeValue
                  ? row.status === 'CANCELED'
                    ? ' ' + '(' + TASK_HISTORY[beforeValue?.beforeValue] + ')'
                    : null
                  : null}
                <br />
              </span>
              {isDelay && (
                <div style={{ color: statusDelayColor, fontSize: 13 }}>({statusDelayText})</div>
              )}
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 0.5 }} />
                {row.updateBy}
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
          children: finishTaskRole?.edit.value && (
            <div className='d-flex flex-row justify-content-between'>
              {row.status == 'WAIT_REVIEW' ? (
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/ReviewTask?=' + row.id)}
                />
              ) : row.status == 'CANCELED' ? (
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/CancelTask?=' + row.id)}
                />
              ) : row.status == 'DONE' ? (
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/FinishTasks?=' + row.id)}
                />
              ) : null}
            </div>
          ),
        }
      },
    },
  ]
  return (
    <>
      {PageTitle}
      <br />
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          scroll={{ x: 'max-content' }}
          rowClassName={(a) =>
            a.status == 'WAIT_REVIEW'
              ? 'table-row-wait-review'
              : a.status === 'CANCELED'
              ? 'table-row-older'
              : 'table-row-lasted'
          }
        />
      </Spin>

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
      {showModalMap && (
        <ModalMapPlot
          show={showModalMap}
          backButton={() => setShowModalMap((prev) => !prev)}
          title='แผนที่แปลงเกษตร'
          plotId={plotId}
        />
      )}
    </>
  )
}
