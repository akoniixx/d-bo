/* eslint-disable react-hooks/exhaustive-deps */
import {
  DownOutlined,
  EditOutlined,
  UserOutlined,
  ExceptionOutlined,
  SearchOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  DatePicker,
  Dropdown,
  Image,
  Input,
  MenuProps,
  Pagination,
  PaginationProps,
  Select,
  Spin,
  Table,
} from 'antd'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import ActionButton from '../../../components/button/ActionButton'
import { CardContainer } from '../../../components/card/CardContainer'
import ModalDronerList from '../../../components/modal/task/newTask/ModalDronerList'
import ModalMapPlot from '../../../components/modal/task/newTask/ModalMapPlot'
import InvoiceTask from '../../../components/popover/InvoiceTask'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import { NEWTASK_STATUS_SEARCH, STATUS_NEWTASK_COLOR_MAPPING } from '../../../definitions/Status'
import {
  InvoiceTaskEntity,
  NewTaskPageEntity,
  UpdateTaskStatus,
  UpdateTaskStatus_INIT,
} from '../../../entities/NewTaskEntities'
import { color } from '../../../resource'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { numberWithCommasToFixed } from '../../../utilities/TextFormatter'
import { useNavigate } from 'react-router-dom'
import { listAppType } from '../../../definitions/ApplicatoionTypes'
import { ListCheck } from '../../../components/dropdownCheck/ListStatusAppType'
import { ModalAcceptedTask } from '../../../components/modal/ModalAcceptedTask'
import ShowNickName from '../../../components/popover/ShowNickName'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../../store/ProfileAtom'

const { RangePicker } = DatePicker
const dateFormat = 'DD-MM-YYYY'
const dateSearchFormat = 'YYYY-MM-DD'

const IndexNewTask = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null

  const navigate = useNavigate()
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<NewTaskPageEntity>()
  const [searchStatus, setSearchStatus] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [searchStartDate, setSearchStartDate] = useState<any>(null)
  const [searchEndDate, setSearchEndDate] = useState<any>(null)
  const [showModalMap, setShowModalMap] = useState<boolean>(false)
  const [showModalDroner, setShowModalDroner] = useState<boolean>(false)
  const [appTypeArr, setAppTypeArr] = useState<string[]>([])
  const [applicationType, setApplicationType] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [plotId, setPlotId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [modalCheckUpdate, setModalCheckUpdate] = useState<boolean>(false)

  const fetchNewTaskList = async () => {
    setLoading(true)
    await TaskDatasource.getNewTaskList(
      row,
      current,
      searchStatus,
      searchText,
      searchStartDate,
      searchEndDate,
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

  useEffect(() => {
    fetchNewTaskList()
  }, [searchStartDate, searchEndDate, current, sortDirection, row])

  const handleSearchStatus = (status: any) => {
    setSearchStatus(status.target.value)
  }
  const handleSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setSearchStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setSearchEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setSearchStartDate(e)
      setSearchEndDate(e)
    }
  }
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev)
    setPlotId(plotId)
  }
  const handleModalDronerList = (taskId: string) => {
    setShowModalDroner((prev) => !prev)
    setTaskId(taskId)
  }
  const removeNewTask = async (id: string) => {
    Swal.fire({
      title: 'ยืนยันการยกเลิก',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: '#d33',
      showCancelButton: true,
      showCloseButton: true,
      input: 'textarea',
      inputPlaceholder: 'กรอกเหตุผลการยกเลิก',
      inputAttributes: { input: 'text', required: 'true' },
      html:
        "<p class='text-left'>โปรดตรวจสอบงานใหม่ที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อการจ้างงานในระบบ</p>" +
        "<p class='text-left'>เหตุผล</p>",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data: UpdateTaskStatus = UpdateTaskStatus_INIT
        data.id = id
        data.status = 'CANCELED'
        data.statusRemark = result.value
        data.updateBy = profile.firstname + ' ' + profile.lastname
        await TaskDatasource.cancelNewTask(data).then(() => {
          //navigate("/IndexNewTask");
        })
      }
      fetchNewTaskList()
    })
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
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
  const checkDronerReceive = async (id: string) => {
    await TaskDatasource.getNewTaskById(id).then((res) => {
      if (!res.dronerId) {
        navigate('/EditNewTask/id=' + id)
      } else {
        setModalCheckUpdate(!modalCheckUpdate)
      }
    })
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const menu: MenuProps['items'] = [
    {
      label: 'เลือกนักบินหลายคน (แบบปกติ)',
      key: '1',
      onClick: () => navigate('/AddNewTask=checkbox'),
    },
    {
      label: 'บังคับเลือกนักบิน (ติดต่อแล้ว)',
      key: '2',
      onClick: () => navigate('/AddNewTask=radio'),
    },
  ]
  const followJobRole = useMemo(() => {
    const find = currentRole?.followJob.find((el) => {
      return el.name === 'งานใหม่ (รอนักบิน)'
    })
    return find
  }, [])
  const pageTitle = (
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
            <strong>งานใหม่ (รอนักบิน)</strong>
          </span>
        </div>
        <div style={{ color: color.Error, textAlign: 'end' }}>
          <RangePicker
            allowClear
            onCalendarChange={(val) => handleSearchDate(val)}
            format={dateFormat}
          />

          {followJobRole?.add.value && (
            <>
              <div
                style={{
                  width: 4,
                }}
              />
              <Dropdown
                menu={{
                  items: menu,
                }}
              >
                <Button
                  style={{
                    padding: '8 0',
                    backgroundColor: color.primary1,
                    color: color.secondary2,
                    borderColor: color.Success,
                    borderRadius: '5px',
                  }}
                >
                  เพิ่มงานบินโดรนใหม่
                  <DownOutlined />
                </Button>
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <div className=' d-flex justify-content-between pb-3'>
        <div className='col-lg-7 pt-1' style={{ paddingRight: 5 }}>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อเกษตรกร, คนบินโดรน หรือเบอร์โทร'
            className='col-lg-12'
            onChange={handleSearchText}
          />
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
          <Select
            style={{ paddingRight: 5 }}
            className='col-lg-12'
            placeholder='สถานะทั้งหมด'
            onChange={handleSearchStatus}
            allowClear
          >
            {NEWTASK_STATUS_SEARCH.map((item, index) => (
              <option key={index} value={item.name}>
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
              fetchNewTaskList()
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
                setSortField('date_appointment')
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
      dataIndex: 'date_appointment',
      key: 'date_appointment',
      render: (value: any, row: any) => {
        return {
          children: (
            <>
              <span>{DateTimeUtil.formatDateTime(value)}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.task_no}</span>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อเกษตรกร',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (value: any, row: any) => {
        return {
          children: (
            <>
              <span>{row.firstname + ' ' + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>
                {row.telephone_no}
                {row.nickname && <ShowNickName data={row.nickname} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'พื้นที่แปลงเกษตร',
      render: (value: any, row: any) => {
        const checkAddress = () => {
          const province = row.province_name + ''
          const district = row.district_name == null ? '' : row.district_name + '/'
          const subdistrict = row.subdistrict_name == null ? '' : row.subdistrict_name + '/'
          return subdistrict + district + province
        }
        return {
          children: (
            <>
              <span>{checkAddress()}</span>
              <br />
              <div
                onClick={() => handleModalMap(row.farmer_plot_id)}
                style={{ color: color.primary1, cursor: 'pointer' }}
              >
                ดูแผนที่แปลง
              </div>
            </>
          ),
        }
      },
    },
    {
      title: 'นักบินโดรน',
      dataIndex: 'count_droner',
      key: 'count_droner',
      render: (value: any, row: any) => {
        return {
          children: (
            <>
              <span>จำนวน {row.count_droner} ราย</span>
              <br />
              <span
                onClick={() => handleModalDronerList(row.id)}
                style={{ color: color.primary1, cursor: 'pointer' }}
              >
                ดูรายชื่อนักบินโดรน
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
            ค่าบริการ{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('total_price')
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
      dataIndex: 'total_price',
      key: 'total_price',
      render: (value: any, row: any) => {
        const inv: InvoiceTaskEntity = {
          raiAmount: row.farm_area_amount,
          unitPrice: row.unit_price,
          price: row.price,
          fee: row.fee,
          discountFee: row.discount_fee,
          discountCoupon: row.discount_coupon,
          discountPromotion: row.discount_promotion,
          discountPoint: row.discount_campaign_point,
          totalPrice: row.total_price,
        }
        return {
          children: (
            <>
              <span>
                {!row.total_price
                  ? 0.0 + ' บาท'
                  : numberWithCommasToFixed(parseFloat(row.total_price)) + ' บาท'}
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
      render: (value: any, row: any) => {
        return {
          children: (
            <>
              {listAppType.map(
                (item) =>
                  row.application_type === item.value && (
                    <>
                      <Image src={item.icon} preview={false} style={{ width: 24, height: 24 }} />
                      <span> {row.create_by ? row.create_by + ` ${item.create}` : '-'}</span>
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
      dataIndex: 'task_status',
      key: 'task_status',
      render: (value: any, row: any) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: STATUS_NEWTASK_COLOR_MAPPING[row.task_status],
                }}
              >
                <Badge color={STATUS_NEWTASK_COLOR_MAPPING[row.task_status]} /> {row.task_status}
              </span>
              <br />
              <span style={{ color: color.Grey }}>
                <UserOutlined style={{ padding: '0 4px 0 0', verticalAlign: 0.5 }} />
                {row.create_by}
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
      render: (value: any, row: any) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-center'>
              {followJobRole?.edit.value && (
                <div className='col-lg-6'>
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => checkDronerReceive(row.id)}
                  />
                </div>
              )}
              {followJobRole?.delete.value && (
                <div className='col-lg-6'>
                  <ActionButton
                    icon={<ExceptionOutlined />}
                    color={color.Error}
                    onClick={() => removeNewTask(row.id)}
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
    <>
      {pageTitle}
      <CardContainer>
        <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
          <Table
            scroll={{ x: 'max-content' }}
            dataSource={data?.data}
            columns={columns}
            pagination={false}
            size='large'
            tableLayout='fixed'
            rowClassName={(a) =>
              a.task_status === 'ไม่มีนักบินรับงาน' ? 'table-row-older' : 'table-row-lasted'
            }
          />
        </Spin>
      </CardContainer>
      <div className='d-flex justify-content-between pt-4 pb-3'>
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
      {showModalDroner && (
        <ModalDronerList
          show={showModalDroner}
          backButton={() => setShowModalDroner((prev) => !prev)}
          title='รายชื่อนักโดรนบิน'
          taskId={taskId}
        />
      )}
      {modalCheckUpdate && (
        <ModalAcceptedTask
          titleButton={'ตกลง'}
          textHeader={'คุณไม่สามารถแก้ไขงานนี้ได้'}
          textDetail={
            'เนื่องจากมีนักบินโดรนในระบบกดรับงานนี้แล้ว คุณสามารถตรวจสอบ/แก้ไขงานนี้ได้อีกครั้งในเมนูจัดการงานอื่นๆ'
          }
          visible={modalCheckUpdate}
          backButton={() => {
            setModalCheckUpdate(!modalCheckUpdate)
            fetchNewTaskList()
          }}
        />
      )}
    </>
  )
}

export default IndexNewTask
