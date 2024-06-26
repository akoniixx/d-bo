import { Badge, Button, Card, Col, Divider, Form, Modal, Row, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import { color, icon, image } from '../../../resource'
import {
  ALL_TASK_COLOR_MAPPING,
  ALL_TASK_MAPPING,
  ALL_TASK_MENU,
} from '../../../definitions/Status'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { Container } from 'react-bootstrap'
import { InputPicker } from 'rsuite'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import {
  AllTaskListEntity,
  GetNewTaskEntity,
  TaskManageEntity,
} from '../../../entities/NewTaskEntities'
import { numberWithCommas, numberWithCommasToFixed } from '../../../utilities/TextFormatter'
import 'rsuite/dist/rsuite.min.css'
import ImagCards from '../../../components/card/ImagCard'
import { UploadImageDatasouce } from '../../../datasource/UploadImageDatasource'
import ModalCancelTask from '../../../components/modal/ModalAdminCacelTask'
import ShowNickName from '../../../components/popover/ShowNickName'

const AdminCancelTask = () => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(1)
  const [taskList, setTaskList] = useState<any>()
  const [searchTaskList, setSearchTaskList] = useState<any>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)
  const [taskSelected, setTaskSelected] = useState<TaskManageEntity>()
  const [taskNo, setTaskNo] = useState<any>()
  const [count, setCount] = useState<number>(0)
  const [taskId, setTaskId] = useState('')
  const [imgControl, setImgControl] = useState<any>(null)
  const [imgDrug, setImgDrug] = useState<any>(null)
  const [dronerPoint, setDronerPoint] = useState<any>()
  const [farmerPoint, setFarmerPoint] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [checkStatus, setCheckStatus] = useState<any>()

  const fetchTaskList = () => {
    TaskDatasource.getAllTask(taskNo, current, 10).then((res: AllTaskListEntity) => {
      setTaskList(res.data)
      const data = res.data.map((item) => {
        return {
          ...item,
          label: `${item.taskNo} (${ALL_TASK_MENU[item.status]} | สถานะ : ${
            ALL_TASK_MAPPING[item.status]
          })`,
          value: item.id,
        }
      })
      setCount(res.count)
      setSearchTaskList(data)
    })
  }

  useEffect(() => {
    fetchTaskList()
  }, [taskNo])

  const onItemsRendered = (props: any) => {
    if (props.visibleStopIndex >= searchTaskList.length - 1) {
      if (searchTaskList.length < count) {
        TaskDatasource.getAllTask(taskNo, current + 1, 10).then((res: AllTaskListEntity) => {
          setTaskList([...taskList, res.data])
          const data = res.data.map((item) => {
            return {
              ...item,
              label: `${item.taskNo} (${ALL_TASK_MENU[item.status]} | สถานะ : ${
                ALL_TASK_MAPPING[item.status]
              })`,
              value: item.id,
            }
          })
          setCurrent(current + 1)
          setSearchTaskList([...searchTaskList, ...data])
        })
      }
    }
  }

  const handleSearchTask = async () => {
    try {
      setLoading(true)
      const task = await TaskDatasource.getTaskForCancel(taskId)
      setCheckStatus(task.data.status)
      if (task.data.imagePathDrug) {
        const resImg = await UploadImageDatasouce.getImage(task.data.imagePathDrug)
        setImgDrug([resImg.url])
      }
      setTaskSelected(task)
      if (task.imageTask) {
        const imgArray: any[] = task.imageTask.map((item) => {
          return {
            id: item.id,
            url: item.pathFinishTask,
            file: item.pathFinishTask,
            percent: 100,
          }
        })
        setImgControl(imgArray)
      }
      const initialValues = {
        unitPrice: task.data.unitPrice,
        farmAreaAmount: task.data.farmAreaAmount,
      }
      form.setFieldsValue(initialValues)
      const estimatePoint = await TaskDatasource.getEstimatePoint(taskId)
      const dronerPoint = estimatePoint.find((point: any) => point.application === 'DRONER')
      const farmerPoint = estimatePoint.find((point: any) => point.application === 'FARMER')
      setDronerPoint(dronerPoint)
      setFarmerPoint(farmerPoint)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  const pageTitle = (
    <Row style={{ padding: '10px' }}>
      <Col span={24}>
        <span
          className='card-label font-weight-bolder text-dark'
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            padding: '8px',
          }}
        >
          <strong>ยกเลิกงาน</strong>
        </span>
      </Col>
    </Row>
  )

  const cardTask = (
    <Col span={24}>
      <Card style={{ backgroundColor: '#FDEEEE', height: '140px' }}>
        <Row
          justify={'center'}
          gutter={8}
          style={{
            fontSize: 16,
            paddingBottom: '15px',
            fontWeight: 'bold',
            color: color.Error,
          }}
        >
          รายละเอียดงาน
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              borderRight: '2px groove',
              fontWeight: 'bold',
              color: color.Error,
            }}
          >
            เกษตรกร
          </Col>
          <Col span={12} style={{ textAlign: 'center', fontWeight: 'bold', color: color.Error }}>
            นักบินโดรน
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col span={12} style={{ textAlign: 'center', borderRight: '2px groove' }}>
            {taskSelected?.data.farmer ? (
              <>
                {`${taskSelected?.data.farmer.firstname || '-'} ${
                  taskSelected?.data.farmer.lastname || '-'
                }`}
                {` (${taskSelected?.data.farmer.telephoneNo || '-'})`}
                {taskSelected?.data.farmer.firstname && (
                  <ShowNickName
                    data={taskSelected?.data.farmer.firstname}
                    menu='INFO'
                    colorTooltip={color.Error}
                  />
                )}
              </>
            ) : (
              <span style={{ color: color.Error }}>ผู้ใช้บัญชีนี้ ถูกลบแล้ว</span>
            )}
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            {taskSelected?.data.droner ? (
              <>
                {`${taskSelected?.data.droner.firstname || '-'} ${
                  taskSelected?.data.droner.lastname || '-'
                }`}
                {` (${taskSelected?.data.droner.telephoneNo || '-'})`}
                {taskSelected?.data.droner.firstname && (
                  <ShowNickName
                    data={taskSelected?.data.droner.firstname}
                    menu='INFO'
                    colorTooltip={color.Error}
                  />
                )}
              </>
            ) : (
              <span style={{ color: color.Error }}>ผู้ใช้บัญชีนี้ ถูกลบแล้ว</span>
            )}
          </Col>
        </Row>
      </Card>
      <Card style={{ height: '45%' }}>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              วันที่นัดหมาย
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              ช่วงเวลาการพ่น
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              เป้าหมายการพ่น
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              แปลง
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              พืชที่ปลูก
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              สถานะ
            </Col>
          </>
          <>
            <Col span={4}>
              {DateTimeUtil.formatDateTime(taskSelected?.data.dateAppointment || '')}
            </Col>
            <Col span={4}>{taskSelected?.data.purposeSpray.purposeSprayName}</Col>
            <Col span={4}>
              {taskSelected?.data.targetSpray && taskSelected?.data.targetSpray.join(',')}
            </Col>
            <Col span={4}>{taskSelected?.data.farmerPlot.plotName || '-'}</Col>
            <Col span={4}>{taskSelected?.data.farmerPlot.plantName || '-'}</Col>
            <Col span={4}>
              <Badge color={ALL_TASK_COLOR_MAPPING[taskSelected?.data.status || '']} />{' '}
              <span
                style={{
                  color: ALL_TASK_COLOR_MAPPING[taskSelected?.data.status || ''],
                }}
              >
                {ALL_TASK_MAPPING[taskSelected?.data.status || '']}
              </span>
            </Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              ค่าบริการ/ไร่
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              จำนวนไร่
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }}>
              การเตรียมยา
            </Col>
            <Col span={4} style={{ fontWeight: 'bold' }} />
            <Col span={4} style={{ fontWeight: 'bold' }} />
            <Col span={4} style={{ fontWeight: 'bold' }} />
          </>
          <>
            <Col span={4}>{taskSelected?.data.unitPrice} บาท/ไร่</Col>
            <Col span={4}>{taskSelected?.data.farmAreaAmount} ไร่</Col>
            <Col span={4}>{taskSelected?.data.preparationBy}</Col>
            <Col span={4} />
            <Col span={4} />
            <Col span={4} />
          </>
        </Row>
        {taskSelected?.data.preparationBy === 'นักบินโดรนเตรียมให้' && (
          <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
            <Col span={24} style={{ fontWeight: 'bold' }}>
              รายละเอียดยา
            </Col>
            <Col span={24}>{taskSelected?.data.preparationRemark || '-'}</Col>
          </Row>
        )}
        <div className='d-flex ' style={{ paddingBottom: '15px' }}>
          <>
            <div className='col-lg-2' style={{ fontWeight: 'bold' }}>
              ภาพหลักฐานการบิน{' '}
              <span style={{ color: color.Grey, fontWeight: 'lighter' }}>
                ({taskSelected?.imageTask.length || 0} รูป)
              </span>
            </div>
            <div className='col-lg-2' style={{ fontWeight: 'bold' }}>
              ภาพปุ๋ยและยา{' '}
              <span style={{ fontWeight: 'lighter', color: color.Grey }}>
                {' '}
                ({imgDrug?.length || 0} รูป)
              </span>
            </div>
            <div className='col-lg-2' style={{ fontWeight: 'bold' }}>
              หมายเหตุ
            </div>
          </>
        </div>
        <div className='d-flex'>
          <div className='col-lg-2' style={{ paddingRight: 20 }}>
            <ImagCards image={imgControl} />
          </div>

          <div className='col-lg-2' style={{ paddingRight: 20 }}>
            <ImagCards image={imgDrug} show={true} />
          </div>

          <div className='col-lg-2'>{taskSelected?.data.comment || '-'}</div>
        </div>
      </Card>
      {checkStatus !== 'CANCELED' && (
        <div className='pt-2 pb-2'>
          <Button
            style={{
              backgroundColor: color.Error,
              color: 'white',
              width: '100%',
              borderRadius: '5px',
            }}
            size='large'
            onClick={async () => {
              setShowModal(!showModal)
            }}
          >
            ยกเลิกงาน
          </Button>
        </div>
      )}

      <Card style={{ backgroundColor: '#F2F5FC' }}>
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              borderRight: '2px groove',
              fontWeight: 'bold',
            }}
          >
            ยอดรวมค่าบริการ (เกษตรกร)
          </Col>
          <Col span={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            รายได้ที่นักบินโดรนจะได้รับ
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              fontSize: 18,
              textAlign: 'center',
              borderRight: '2px groove',
              fontWeight: 'bold',
            }}
          >
            {numberWithCommasToFixed(
              Number(taskSelected?.data.price || 0) -
                Number(taskSelected?.data.discountCoupon || 0) -
                Number(taskSelected?.data.discountCampaignPoint || 0),
            )}
          </Col>
          <Col span={12} style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
            {numberWithCommasToFixed(
              Number(taskSelected?.data.price || 0) +
                Number(taskSelected?.data.discountCoupon || 0) +
                Number(taskSelected?.data.discountCampaignPoint || 0),
            )}
          </Col>
        </Row>
        <Divider />
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold', textAlign: 'center' }}>
              ค่าบริการ <span style={{ fontSize: 12 }}> (ก่อนค่าธรรมเนียม)</span>
            </Col>
            <Col span={8} style={{ fontWeight: 'bold', textAlign: 'center' }}>
              ค่าธรรมเนียม (5%)
            </Col>
            <Col span={8} style={{ fontWeight: 'bold', textAlign: 'center' }}>
              ส่วนลดค่าธรรมเนียม
            </Col>
          </>
          <>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.price) || 0)} บาท
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.fee) || 0)} บาท
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.discountFee) || 0)} บาท
            </Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: 'bold', textAlign: 'center' }}>
              ส่วนลดคูปอง
            </Col>
            <Col span={8} style={{ fontWeight: 'bold', textAlign: 'center' }}>
              ส่วนลดจากแต้ม
            </Col>
            <Col span={8} />
          </>
          <>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.discountCoupon)) || 0} บาท
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.discountCampaignPoint)) || 0} บาท
            </Col>
            <Col span={8} />
          </>
        </Row>
        <Divider />
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              borderRight: '2px groove',
              fontWeight: 'bold',
            }}
          >
            ประมาณการแต้มเกษตรกร <br /> (Farmer Point)
          </Col>
          <Col span={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            ประมาณการแต้มนักบินโดรน <br /> (Droner Point)
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              borderRight: '2px groove',
            }}
          >
            <img src={icon.coinFarmer} style={{ width: '28px', height: '26px' }} />{' '}
            {numberWithCommas(Number(farmerPoint?.receivePoint)) || 0} แต้ม
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <img src={icon.coinDroner} style={{ width: '25px', height: '25px' }} />{' '}
            {numberWithCommas(Number(dronerPoint?.receivePoint)) || 0} แต้ม
          </Col>
        </Row>
      </Card>
    </Col>
  )

  return (
    <>
      {pageTitle}
      <div style={{ padding: '10px' }}>
        <CardContainer>
          <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
            <CardHeader textHeader='รายละเอียดงาน' />
            <Container style={{ padding: '20px', paddingBottom: '0px' }}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name='searchAddress'>
                    <InputPicker
                      virtualized
                      value={taskNo}
                      listProps={{
                        onItemsRendered,
                      }}
                      onChange={(e) => {
                        if (e !== taskId) {
                          setImgControl(null)
                          setImgDrug(null)
                        }
                        setTaskId(e)
                        setSearch(false)
                      }}
                      placeholder='ค้นหารหัสงาน (Task No.)'
                      onSearch={(val: any) => {
                        setTaskNo(val)
                      }}
                      onClean={() => {
                        setCurrent(1)
                        setTaskNo(undefined)
                        setImgControl(null)
                        setImgDrug(null)
                      }}
                      data={searchTaskList}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button
                    style={{
                      border: '1px dashed #219653',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(33, 150, 83, 0.1)',
                      color: color.Success,
                      width: 100,
                      height: 35,
                    }}
                    onClick={() => {
                      if (taskId) {
                        handleSearchTask()
                      }
                      setSearch(taskId ? true : false)
                    }}
                  >
                    ค้นหา
                  </Button>
                </Col>
              </Row>
            </Container>
            {taskId && search && (
              <Container style={{ paddingBottom: '10px' }}>{cardTask}</Container>
            )}
          </Spin>
        </CardContainer>
      </div>

      {showModal && (
        <ModalCancelTask
          show={showModal}
          title1={'โปรดตรวจสอบงานที่คุณต้องการยกเลิก ก่อนที่จะกดยืนยัน'}
          title2={'เพราะอาจส่งผลต่อการจ้างงานในระบบ และแต้มที่จะได้รับ'}
          backButton={() => setShowModal(!showModal)}
          callBack={async () => {
            setShowModal(!showModal)
            handleSearchTask()
          }}
          data={taskId}
        />
      )}
    </>
  )
}

export default AdminCancelTask
