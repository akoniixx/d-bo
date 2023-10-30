import React, { useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Popover,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ReportDocDatasource } from '../../datasource/ReportDocument'
import {
  TaskReportListEntity,
  updateStatusPays,
  updateStatusPays_INIT,
} from '../../entities/TaskFinishEntities'
import { DistrictEntity, ProviceEntity, SubdistrictEntity } from '../../entities/LocationEntities'
import { useEffect } from 'react'
import moment from 'moment'
import color from '../../resource/color'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import Swal from 'sweetalert2'
import { UpdateStatusPaymentDatasource } from '../../datasource/UpdateStatusPaymentDatasource'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons'
import { CardContainer } from '../../components/card/CardContainer'
import { FINISH_TASK, STATUS_COLOR_TASK, TASK_HISTORY } from '../../definitions/FinishTask'
import { numberWithCommas, numberWithCommasToFixed } from '../../utilities/TextFormatter'
import ActionButton from '../../components/button/ActionButton'
import ModalMapPlot from '../../components/modal/task/finishTask/ModalMapPlot'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { DashboardLayout } from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import InvoiceTask from '../../components/popover/InvoiceTask'
import { InvoiceTaskEntity } from '../../entities/NewTaskEntities'
import { icon } from '../../resource'
import { DronerEntity } from '../../entities/DronerEntities'
import CheckDocument from '../../components/dropdownCheck/CheckDocument'
import { listAppType } from '../../definitions/ApplicatoionTypes'
import { ListCheck } from '../../components/dropdownCheck/ListStatusAppType'
import ShowNickName from '../../components/popover/ShowNickName'

interface DataType {
  key: React.Key
  date: string
  droner: string
  farmer: string
  plotArea: any
  plotId: string
  farmAreaAmount: string
  rating: string
  totalPrice: string
  statusPay: string
  status: string
  telDroner: string
  telFarmer: string
  taskNo: string
  updateBy: string
  id: string
  discountFee: string
  price: string
  fee: string
  discountCoupon: string
  taskHistory: string
  unitPrice: string
  discountCampaignPoint: string
  file: any
  isBookBank: boolean
  dateWaitPayment: any
  applicationType: string
  createBy: string
  nickname_farmer: string
  nickname_droner: string
}
function IndexReport() {
  const navigate = useNavigate()
  const [getData, setGetData] = useState<TaskReportListEntity>()
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [searchText, setSearchText] = useState<string>()
  const [searchStatus, setSearchStatus] = useState()
  const [searchStatusPayment, setSearchStatusPayment] = useState()
  const [searchStatusCancel, setSearchStatusCancel] = useState()
  const [documentPersons, setDocumentPersons] = useState<any>()
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [searchProvince, setSearchProvince] = useState<any>()
  const [searchDistrict, setSearchDistrict] = useState<any>()
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>()
  const [province, setProvince] = useState<ProviceEntity[]>()
  const [district, setDistrict] = useState<DistrictEntity[]>()
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [plotId, setPlotId] = useState<string>('')
  const [visibleRating, setVisibleRating] = useState(false)
  const [statusArrDoc, setStatusArrDoc] = useState<string[]>([])
  const [statusArr, setStatusArr] = useState<string[]>([])
  const [CheckEnum, setCheckEnum] = useState<string[]>([])
  const [clickPays, setClickPays] = useState<any[]>([])
  const [statusPayment, setStatusPayment] = useState<updateStatusPays>(updateStatusPays_INIT)
  const [appTypeArr, setAppTypeArr] = useState<string[]>([])
  const [applicationType, setApplicationType] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { RangePicker } = DatePicker
  const dateSearchFormat = 'YYYY-MM-DD'
  const dateFormat = 'DD/MM/YYYY'
  const timeFormat = 'HH:mm'
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)
  const fetchAllReport = async () => {
    setLoading(true)
    await ReportDocDatasource.getAllReportDroner(
      current,
      row,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      startDate,
      endDate,
      searchStatus,
      searchStatusPayment,
      searchStatusCancel,
      searchText,
      documentPersons,
      sortDirection,
      sortField,
      applicationType,
    )
      .then((res: TaskReportListEntity) => {
        setGetData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchAllReport()
    fetchProvince()
  }, [current, row, startDate, endDate, sortDirection])
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
  const [persistedProfile, setPersistedProfile] = useLocalStorage('profile', [])

  const SearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setStartDate(e)
      setEndDate(e)
    }
    setCurrent(1)
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
  const changeTextSearch = (value: any) => {
    setSearchText(value.target.value)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const handleStatus = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let arr: any = 0
    if (checked) {
      arr = [...statusArr, value]
      setStatusArr([...statusArr, value])
    } else {
      const d: string[] = statusArr.filter((x) => x !== value)
      arr = [...d]
      setStatusArr(d)
      if (d.length === 0) {
        arr = undefined
      }
    }
    setSearchStatus(arr)
  }
  const handleProvince = (provinceId: number) => {
    setSearchProvince(provinceId)
    fetchDistrict(provinceId)
  }
  const handleDistrict = (districtId: number) => {
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
  const isNumber = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible)
  }

  const statusOptions = ['WAIT_START', 'IN_PROGRESS', 'WAIT_RECEIVE']
  const statusDoneOptions = ['WAIT_PAYMENT', 'DONE_PAYMENT', 'SUCCESS']

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>()
  const [checkedListDone, setCheckedListDone] = useState<CheckboxValueType[]>()

  const [indeterminate, setIndeterminate] = useState(false)
  const [indeterminateDone, setIndeterminateDone] = useState(false)

  const [checkAll, setCheckAll] = useState(false)
  const [checkAllDone, setCheckAllDone] = useState(false)

  const onCheckAllChange = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let arr: any = 0
    if (checked === true) {
      arr = [...statusArr, value]
      setStatusArr([...statusArr, value])
      setSearchStatus(value)
    } else {
      const d: string[] = statusArr.filter((x) => x !== value)
      arr = [...d]
      setStatusArr(d)
      if (d.length === 0) {
        arr = undefined
      }
      setSearchStatusCancel(undefined)
    }
    setSearchStatus(arr)
    setCheckedList(e.target.checked ? statusOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }
  const onChange = (list: CheckboxValueType[]) => {
    setSearchStatus(undefined)
    let arr: any = 0
    arr = [...list]
    setSearchStatusCancel(arr)
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < statusOptions.length)
    setCheckAll(list.length === statusOptions.length)
  }
  const onCheckAllDoneChange = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let arr: any = 0
    if (checked === true) {
      arr = [...statusArr, value]
      setStatusArr([...statusArr, value])
      setSearchStatus(value)
    } else {
      const d: string[] = statusArr.filter((x) => x !== value)
      arr = [...d]
      setStatusArr(d)
      if (d.length === 0) {
        arr = undefined
      }
      setSearchStatusPayment(undefined)
    }
    setSearchStatus(arr)
    setCheckedListDone(e.target.checked ? statusDoneOptions : [])
    setIndeterminateDone(false)
    setCheckAllDone(e.target.checked)
  }
  const onChangeDone = (list: CheckboxValueType[]) => {
    setSearchStatus(undefined)
    let arr: any = 0
    arr = [...list]
    setSearchStatusPayment(arr)
    setCheckedListDone(list)
    setIndeterminateDone(!!list.length && list.length < statusDoneOptions.length)
    setCheckAllDone(list.length === statusDoneOptions.length)
  }
  const onSearchCheckDocument = (value: string, checked: boolean) => {
    let arr: any = 0
    if (checked) {
      arr = [...statusArrDoc, value]
      setStatusArrDoc([...statusArrDoc, value])
    } else {
      const d: string[] = statusArrDoc.filter((x) => x !== value)
      arr = [...d]
      setStatusArrDoc(d)
      if (d.length === 0) {
        arr = undefined
      }
    }
    setDocumentPersons(arr)
  }
  const SubStatus = (
    <Menu
      items={[
        {
          label: 'รอรีวิว',
          key: '1',
          icon: <Checkbox value='WAIT_REVIEW' onClick={(e) => handleStatus(e)} />,
        },
        {
          label: (
            <>
              <Checkbox
                indeterminate={indeterminateDone}
                onChange={onCheckAllDoneChange}
                checked={checkAllDone}
                value='DONE'
              >
                เสร็จสิ้น
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedListDone}
                style={{ width: '100%' }}
                onChange={onChangeDone}
              >
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='WAIT_PAYMENT'>
                    รอจ่ายเงิน
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='DONE_PAYMENT'>
                    จ่ายเงินแล้ว
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='SUCCESS'>
                    เสร็จสิ้น
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: '2',
        },
        {
          label: (
            <>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                value='CANCELED'
              >
                ยกเลิก
              </Checkbox>
              <br />
              <Checkbox.Group value={checkedList} style={{ width: '100%' }} onChange={onChange}>
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='WAIT_START'>
                    รอเริ่มงาน
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: '20px' }} value='IN_PROGRESS'>
                    กำลังดำเนินงาน
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: '3',
        },
      ]}
    />
  )
  const DownloadPDF = async () => {
    setLoading(true)
    if (clickPays.length > 1) {
      const filterId = clickPays.map((x: any) => x.id)
      const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`
      await ReportDocDatasource.getFileName('ZIP_PDF', downloadBy).then((res) => {
        if (res.responseData) {
          const idFileName = res.responseData.id
          const fileName = res.responseData.fileName
          ReportDocDatasource.reportPDF(filterId, downloadBy, idFileName)
            .then((res) => {
              const blob = new Blob([res], { type: 'application/zip' })
              const a = document.createElement('a')
              a.href = window.URL.createObjectURL(blob)
              a.download = fileName
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
        }
      })
    } else if (clickPays.length === 1) {
      const filterId = clickPays.map((x: any) => x.id)
      const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`
      await ReportDocDatasource.getFileName('PDF', downloadBy, filterId).then((res) => {
        if (res.responseData) {
          const idFileName = res.responseData.id
          const fileName = res.responseData.fileName
          ReportDocDatasource.reportPDF(filterId, downloadBy, idFileName)
            .then((res) => {
              const blob = new Blob([res], { type: 'application/pdf' })
              const a = document.createElement('a')
              a.href = window.URL.createObjectURL(blob)
              a.download = fileName
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
        }
      })
    }
  }
  const DownloadExcel = async () => {
    setLoading(true)
    const filterId = clickPays.map((x: any) => x.id)
    const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`
    await ReportDocDatasource.getFileName('EXCEL', downloadBy, filterId).then((res) => {
      if (res.responseData) {
        const idFileName = res.responseData.id
        const fileName = res.responseData.fileName
        ReportDocDatasource.reportExcel(filterId, downloadBy, idFileName)
          .then((res) => {
            const blob = new Blob([res], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            const a = document.createElement('a')
            a.href = window.URL.createObjectURL(blob)
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false))
      }
    })
  }
  const downloadFile = (
    <Menu
      items={[
        {
          label: <span onClick={DownloadPDF}>ดาวน์โหลดไฟล์ PDF</span>,
          key: 'pdf',
        },
        {
          label: <span onClick={DownloadExcel}>ดาวน์โหลดไฟล์ Excel</span>,
          key: 'excel',
        },
      ]}
    />
  )
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
  const updateStatusPayment = async () => {
    Swal.fire({
      title: 'ยืนยันการเปลี่ยนสถานะ',
      text: 'โปรดตรวจสอบงานที่คุณต้องการเปลี่ยนสถานะ ก่อนที่จะกดยืนยัน เพราะอาจส่งผลต่อการจ่ายเงินของนักบินโดรนในระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'บันทึก',
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (clickPays.map((x) => x.statusPay)[0] === 'DONE_PAYMENT') {
          const updateBy = profile.firstname + ' ' + profile.lastname
          const updateInfo = { ...statusPayment }
          updateInfo.id = clickPays.map((x) => x.id)
          updateInfo.statusPayment = 'WAIT_PAYMENT'
          updateInfo.updateBy = updateBy
          await UpdateStatusPaymentDatasource.UpdateStatusPayment(updateInfo).then((res) => {
            navigate('/IndexReport')
          })
        } else if (clickPays.map((x) => x.statusPay)[0] === 'WAIT_PAYMENT') {
          const updateBy = profile.firstname + ' ' + profile.lastname
          const updateInfo = { ...statusPayment }
          updateInfo.id = clickPays.map((x) => x.id)
          updateInfo.statusPayment = 'DONE_PAYMENT'
          updateInfo.updateBy = updateBy
          await UpdateStatusPaymentDatasource.UpdateStatusPayment(updateInfo).then((res) => {
            navigate('/IndexReport')
          })
        }
        fetchAllReport()
      }
    })
  }
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      const filterEnum = selectedRows.map((x) => x.statusPay)
      const checkData = filterEnum.filter((item, index) => filterEnum.indexOf(item) === index)
      setClickPays(selectedRows)
      setCheckEnum(checkData)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled:
        record.status === 'WAIT_REVIEW' ||
        (record.statusPay != 'DONE_PAYMENT' && record.statusPay != 'WAIT_PAYMENT'),
      statusPay: record.statusPay,
    }),
  }
  const columns: ColumnsType<DataType> = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            วัน/เวลา นัดหมาย
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
      dataIndex: 'date',
      fixed: 'left',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {moment(new Date(value)).format(dateFormat)},{' '}
                {moment(new Date(value)).format(timeFormat)}
              </span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>{row.taskNo}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อนักบินโดรน',
      dataIndex: 'droner',
      fixed: 'left',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>{value}</span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                {row.telDroner}
                {row.nickname_droner && <ShowNickName data={row.nickname_droner} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อเกษตรกร',
      dataIndex: 'farmer',
      fixed: 'left',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>{value}</span>
              <span style={{ color: color.Grey, fontSize: '12px' }}>
                {row.telFarmer}
                {row.nickname_farmer && row.nickname_farmer !== 'null' && (
                  <ShowNickName data={row.nickname_farmer} menu='INFO' />
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>{value}</span>
              <a onClick={() => handleModalMap(row.plotId)} style={{ color: color.primary1 }}>
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
            จำนวนไร่
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('farmAreaAmount')
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
      dataIndex: 'farmAreaAmount',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{`${numberWithCommasToFixed(parseFloat(value))} ไร่`}</>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            Rating
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
      dataIndex: 'rating',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {value > '0' ? (
                  <span>
                    <StarFilled
                      style={{
                        color: '#FFCA37',
                        fontSize: '20px',
                        marginRight: '7px',
                        verticalAlign: 0.5,
                      }}
                    />
                    {parseFloat(value).toFixed(1)}
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
                  src={row.file ? icon.check : icon.cancel}
                  preview={false}
                  style={{ width: 18, height: 18, marginRight: 6 }}
                />
                บัตรประชาชน
              </div>
              <div>
                <Image
                  src={row.isBookBank === true ? icon.check : icon.cancel}
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
            ยอดรวมค่าบริการ{' '}
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
      dataIndex: 'totalPrice',
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
              <span className='text-dark-75 d-block'>
                {value != null ? numberWithCommasToFixed(parseFloat(value)) + ' บาท' : '0 บาท'}
                <InvoiceTask iconColor={color.Success} title='รายละเอียดค่าบริการ' data={inv} />
              </span>
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
                      <span style={{ paddingLeft: '8px' }}>
                        {row.createBy ? row.createBy + ` ${item.create}` : '-'}
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
      fixed: 'right',
      render: (value: any, row: any, index: number) => {
        const countDay = () => {
          if (row.dateWaitPayment != null) {
            const nowDate = new Date(Date.now())
            const rowDate = new Date(row.dateWaitPayment)
            const diffTime = nowDate.getTime() - rowDate.getTime()
            let diffDay = Math.floor(diffTime / (1000 * 3600 * 24))
            diffDay = diffDay == 0 ? 1 : diffDay
            return diffDay
          }
        }

        return {
          children: (
            <>
              {value === 'WAIT_REVIEW' || value === 'CANCELED' ? (
                <>
                  <span style={{ color: STATUS_COLOR_TASK[value] }}>
                    <Badge color={STATUS_COLOR_TASK[value]} /> {FINISH_TASK[value]}
                    {row.taskHistory != undefined
                      ? row.status == 'CANCELED'
                        ? ' ' + '(' + TASK_HISTORY[row.taskHistory] + ')'
                        : null
                      : null}
                    <br />
                  </span>
                </>
              ) : (
                <>
                  {row.statusPay != '' ? (
                    <span style={{ color: STATUS_COLOR_TASK[row.statusPay] }}>
                      <Badge color={STATUS_COLOR_TASK[row.statusPay]} />{' '}
                      {FINISH_TASK[row.statusPay]}
                      <span style={{ color: color.Error }}>
                        {row.statusPay === 'WAIT_PAYMENT' && countDay() != undefined
                          ? ` (${countDay()} วัน)`
                          : null}
                      </span>
                    </span>
                  ) : (
                    <span style={{ color: STATUS_COLOR_TASK[value] }}>
                      <Badge color={STATUS_COLOR_TASK[value]} /> {FINISH_TASK[value]}
                    </span>
                  )}

                  <br />
                </>
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
      dataIndex: 'id',
      fixed: 'right',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              <ActionButton
                icon={<EditOutlined />}
                color={row.status === 'CANCELED' ? color.Grey : color.primary1}
                onClick={() => (window.location.href = '/EditReport?=' + value)}
                actionDisable={row.status === 'CANCELED' ? true : false}
              />
            </div>
          ),
        }
      },
    },
  ]
  const PageTitle = (
    <>
      <div className=' d-flex justify-content-between' style={{ padding: '10px' }}>
        <div className='col-lg-6'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
            }}
          >
            <strong>งานที่เสร็จแล้ว</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker allowClear onCalendarChange={SearchDate} format={dateFormat} />
        </div>
        {CheckEnum[0] != undefined ? (
          <>
            {CheckEnum.length > 0 && CheckEnum.length != 2 ? (
              <>
                <div>
                  <div>
                    <Dropdown overlay={downloadFile}>
                      <Button
                        style={{
                          padding: '8 0',
                          backgroundColor: color.primary1,
                          color: color.secondary2,
                          borderColor: color.Success,
                          borderRadius: '5px',
                        }}
                      >
                        ดาวน์โหลดเอกสาร
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <Button
                    style={{
                      borderColor: color.Success,
                      borderRadius: '5px',
                      color: color.secondary2,
                      backgroundColor: color.Success,
                    }}
                    onClick={() => updateStatusPayment()}
                  >
                    {clickPays.find((x) => x.statusPay === 'WAIT_PAYMENT')
                      ? 'จ่ายเงินแล้ว'
                      : clickPays.find((x) => x.statusPay === 'DONE_PAYMENT')
                      ? 'รอจ่ายเงิน'
                      : null}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div style={{ width: '240px' }}>
                    <Dropdown overlay={downloadFile}>
                      <Button
                        style={{
                          backgroundColor: color.primary1,
                          color: color.secondary2,
                          borderColor: color.Success,
                          borderRadius: '5px',
                        }}
                      >
                        ดาวน์โหลดเอกสาร
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div style={{ width: '240px' }}>
              <Dropdown disabled>
                <Button
                  style={{
                    padding: '8 0',
                    backgroundColor: color.Disable,
                    color: color.Grey,
                    borderColor: color.Disable,
                    borderRadius: '5px',
                  }}
                >
                  ดาวน์โหลดเอกสาร
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </>
        )}
      </div>
      <div className=' d-flex justify-content-between pt-3'>
        <CardContainer
          style={{
            width: '20%',
            padding: '15px',
            marginRight: '20px',
            borderRadius: '5px',
          }}
        >
          <p>รอรีวิว</p>
          <div className='d-flex justify-content-between'>
            <CardContainer
              style={{
                backgroundColor: color.blue,
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
            >
              <div
                className='d-flex justify-content-between'
                style={{ color: color.White, fontWeight: 'bold' }}
              >
                <span>รอรีวิว</span>
                <strong>
                  {getData?.summary != undefined
                    ? numberWithCommas(parseFloat(getData?.summary[0].waitreview))
                    : '0'}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{
            width: '55%',
            padding: '15px',
            marginRight: '20px',
            borderRadius: '5px',
          }}
        >
          <p>เสร็จสิ้น</p>
          <div className='d-flex justify-content-between'>
            <CardContainer
              style={{
                backgroundColor: color.primary1,
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
                marginRight: '10px',
              }}
            >
              <div
                className='d-flex justify-content-between'
                style={{ color: color.White, fontWeight: 'bold' }}
              >
                <span>รอจ่ายเงิน</span>
                <strong>
                  {getData?.summary != undefined
                    ? numberWithCommas(parseFloat(getData?.summary[0].waitpayment))
                    : '0'}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: color.secondary3,
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
                marginRight: '10px',
              }}
            >
              <div
                className='d-flex justify-content-between'
                style={{ color: color.White, fontWeight: 'bold' }}
              >
                <span>จ่ายเงินแล้ว (บริษัท)</span>
                <strong>
                  {getData?.summary != undefined
                    ? numberWithCommas(parseFloat(getData?.summary[0].donepayment))
                    : '0'}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: color.Warning,
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
                marginRight: '10px',
              }}
            >
              <div
                className='d-flex justify-content-between'
                style={{ color: color.White, fontWeight: 'bold' }}
              >
                <span>เสร็จสิ้น</span>
                <strong>
                  {getData?.summary != undefined
                    ? numberWithCommas(parseFloat(getData?.summary[0].successpayment))
                    : '0'}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{
            width: '20%',
            padding: '15px',
            marginRight: '20px',
            borderRadius: '5px',
          }}
        >
          <p>ยกเลิก</p>
          <div className='d-flex justify-content-between'>
            <CardContainer
              style={{
                backgroundColor: color.Error,
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
            >
              <div
                className='d-flex justify-content-between'
                style={{ color: color.White, fontWeight: 'bold' }}
              >
                <span>ยกเลิก</span>
                <strong>
                  {getData?.summary != undefined
                    ? numberWithCommas(parseFloat(getData?.summary[0].canceledtask))
                    : '0'}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
      </div>
      <div className=' d-flex justify-content-between pt-3'>
        <div className='col-lg-2 p-1'>
          <Input
            allowClear
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
        <div className='col-lg'>
          <CheckDocument
            onSearchType={(value: any, checked: any) => onSearchCheckDocument(value, checked)}
            list={documentPersons}
            title='เลือกการตรวจเอกสาร'
          />
        </div>
        <div className='col-lg-2'>
          <ListCheck
            onSearchType={(value: any, checked: any) => onSearchCreateBy(value, checked)}
            list={applicationType}
            title='เลือกรูปแบบการสร้าง'
            menu='TASK'
          />
        </div>
        <div className='col-lg p-1'>
          <Dropdown
            overlay={SubStatus}
            trigger={['click']}
            className='col-lg-12'
            onVisibleChange={handleVisibleRating}
            visible={visibleRating}
          >
            <Button style={{ color: color.Disable }}>
              เลือกสถานะ
              <DownOutlined />
            </Button>
          </Dropdown>
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
              fetchAllReport()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )
  const data: DataType[] = []
  if (getData != undefined) {
    for (let i = 0; i < getData.data.length; i++) {
      data.push({
        key: i,
        date: `${getData?.data.map((x) => x.dateAppointment)[i]}`,
        droner: `${getData?.data.map((x) =>
          x.droner != null ? x.droner.firstname + ' ' + x.droner.lastname : '-',
        )[i]}`,
        farmer: `${getData?.data.map((x) => x.farmer.firstname + ' ' + x.farmer.lastname)[i]}`,
        plotArea: `${getData?.data.map((x) =>
          x.farmerPlot.plotArea != null
            ? x.farmerPlot.plotArea.subdistrictName +
              '/' +
              x.farmerPlot.plotArea.districtName +
              '/' +
              x.farmerPlot.plotArea.provinceName
            : '-',
        )[i]}`,
        plotId: `${getData?.data.map((x) => x.farmerPlot.id)[i]}`,
        farmAreaAmount: `${getData?.data.map((x) => x.farmAreaAmount)[i]}`,
        rating: `${getData?.data.map((x) => (x.reviewDronerAvg != null ? x.reviewDronerAvg : '0'))[
          i
        ]}`,
        totalPrice: `${getData?.data.map((x) => (x.totalPrice != null ? x.totalPrice : '0'))[i]}`,
        statusPay: `${getData?.data.map((x) => (x.statusPayment != null ? x.statusPayment : ''))[
          i
        ]}`,
        status: `${getData?.data.map((x) => x.status)[i]}`,
        telDroner: `${getData?.data.map((x) => (x.droner != null ? x.droner.telephoneNo : '-'))[
          i
        ]}`,
        telFarmer: `${getData?.data.map((x) => x.farmer.telephoneNo)[i]}`,
        taskNo: `${getData?.data.map((x) => x.taskNo)[i]}`,
        updateBy: `${getData?.data.map((x) => (x.updateBy != null ? x.updateBy : '-'))[i]}`,
        discountFee: `${getData?.data.map((x) => x.discountFee)[i]}`,
        price: `${getData?.data.map((x) => x.price)[i]}`,
        fee: `${getData?.data.map((x) => x.fee)[i]}`,
        discountCoupon: `${getData?.data.map((x) => x.discountCoupon)[i]}`,
        id: `${getData?.data.map((x) => x.id)[i]}`,
        taskHistory: `${getData?.data.map((x) =>
          x.taskHistory.length > 0 ? x.taskHistory[0].beforeValue : [],
        )[i]}`,
        unitPrice: `${getData?.data.map((x) => x.unitPrice)[i]}`,
        discountCampaignPoint: `${getData?.data.map((x) => x.discountCampaignPoint)[i]}`,
        file: getData.data.map(
          (x) => x.droner && (x.droner.file.length > 0 ? x.droner.file : null),
        )[i],
        isBookBank: getData.data.map((x) => x.droner && x.droner.isBookBank)[i],
        dateWaitPayment: getData.data.map((x) => x.dateWaitPayment)[i],
        applicationType: getData.data.map((x) => x.applicationType)[i],
        createBy: getData.data.map((x) => x.createBy)[i],
        nickname_droner: `${getData?.data.map((x) => (x.droner ? x.droner?.nickname : ''))[i]}`,
        nickname_farmer: `${getData?.data.map((x) => (x.farmer ? x.farmer?.nickname : ''))[i]}`,
      })
    }
  }

  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        {PageTitle}
        <br />
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Spin>
      </Space>

      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {getData?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={getData?.count}
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

export default IndexReport
