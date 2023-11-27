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
import { AllTaskListEntity, GetNewTaskEntity } from '../../../entities/NewTaskEntities'
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
  const [taskSelected, setTaskSelected] = useState<GetNewTaskEntity>()
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
      const task = await TaskDatasource.getNewTaskById(taskId)
      setCheckStatus(task.status)
      if (task.imagePathFinishTask) {
        const resImg = await UploadImageDatasouce.getImage(task.imagePathFinishTask)
        setImgControl(resImg.url)
      }
      if (task.imagePathDrug) {
        const resImg = await UploadImageDatasouce.getImage(task.imagePathDrug)
        setImgDrug(resImg.url)
      }
      setTaskSelected(task)
      const initialValues = {
        unitPrice: task.unitPrice,
        farmAreaAmount: task.farmAreaAmount,
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

  const onPreviewImg = async (e: any) => {
    let src = e
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
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
            {taskSelected?.farmer ? (
              <>
                {`${taskSelected?.farmer.firstname || '-'} ${taskSelected?.farmer.lastname || '-'}`}
                {` (${taskSelected?.farmer.telephoneNo || '-'})`}
                {taskSelected?.farmer.firstname && (
                  <ShowNickName
                    data={taskSelected?.farmer.firstname}
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
            {taskSelected?.droner ? (
              <>
                {`${taskSelected?.droner.firstname || '-'} ${taskSelected?.droner.lastname || '-'}`}
                {` (${taskSelected?.droner.telephoneNo || '-'})`}
                {taskSelected?.droner.firstname && (
                  <ShowNickName
                    data={taskSelected?.droner.firstname}
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
            <Col span={4}>{DateTimeUtil.formatDateTime(taskSelected?.dateAppointment || '')}</Col>
            <Col span={4}>{taskSelected?.purposeSpray.purposeSprayName}</Col>
            <Col span={4}>{taskSelected?.targetSpray && taskSelected?.targetSpray.join(',')}</Col>
            <Col span={4}>{taskSelected?.farmerPlot.plotName || '-'}</Col>
            <Col span={4}>{taskSelected?.farmerPlot.plantName || '-'}</Col>
            <Col span={4}>
              <Badge color={ALL_TASK_COLOR_MAPPING[taskSelected?.status || '']} />{' '}
              <span
                style={{
                  color: ALL_TASK_COLOR_MAPPING[taskSelected?.status || ''],
                }}
              >
                {ALL_TASK_MAPPING[taskSelected?.status || '']}
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
            <Col span={4}>{taskSelected?.unitPrice} บาท/ไร่</Col>
            <Col span={4}>{taskSelected?.farmAreaAmount} ไร่</Col>
            <Col span={4}>{taskSelected?.preparationBy}</Col>
            <Col span={4} />
            <Col span={4} />
            <Col span={4} />
          </>
        </Row>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ภาพหลักฐานการบิน
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ภาพปุ๋ยและยา
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              หมายเหตุ
            </Col>
          </>
          <>
            <Col span={8} style={{ paddingRight: 20 }}>
              <ImagCards
                imageName={
                  taskSelected?.imagePathFinishTask ? taskSelected?.imagePathFinishTask : ''
                }
                image={imgControl || image.empty_cover}
                onClick={() => onPreviewImg(imgControl)}
              />
            </Col>

            <Col span={8} style={{ paddingRight: 20 }}>
              <ImagCards
                imageName={taskSelected?.imagePathDrug ? taskSelected?.imagePathDrug : ''}
                image={imgDrug || image.empty_cover}
                onClick={() => onPreviewImg(imgDrug)}
              />
            </Col>

            <Col span={8}>{taskSelected?.comment || '-'}</Col>
          </>
        </Row>
      </Card>
      {checkStatus !== 'CANCELED' &&
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
     </div>}
     

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
              Number(taskSelected?.price || 0) -
                Number(taskSelected?.discountCoupon || 0) -
                Number(taskSelected?.discountCampaignPoint || 0),
            )}
          </Col>
          <Col span={12} style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
            {numberWithCommasToFixed(
              Number(taskSelected?.price || 0) +
                Number(taskSelected?.discountCoupon || 0) +
                Number(taskSelected?.discountCampaignPoint || 0),
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
              {numberWithCommasToFixed(Number(taskSelected?.price) || 0)} บาท
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.fee) || 0)} บาท
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.discountFee) || 0)} บาท
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
              {numberWithCommasToFixed(Number(taskSelected?.discountCoupon)) || 0} บาท
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.discountCampaignPoint)) || 0} บาท
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
