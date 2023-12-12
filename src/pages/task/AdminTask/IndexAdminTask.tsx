/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Input,
  Table,
  Modal,
  Spin,
  Checkbox,
} from 'antd'
import { useEffect, useState } from 'react'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import { color, image } from '../../../resource'
import { ALL_TASK_COLOR_MAPPING, ALL_TASK_MAPPING, HISTORY_TASK } from '../../../definitions/Status'
import icon from '../../../resource/icon'
import TextArea from 'antd/lib/input/TextArea'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { InputPicker } from 'rsuite'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import {
  AllTaskListEntity,
  TaskManageEntity,
  TaskManageEntity_INIT,
} from '../../../entities/NewTaskEntities'
import {
  numberWithCommas,
  numberWithCommasToFixed,
  validateOnlyNumWDecimal,
} from '../../../utilities/TextFormatter'
import 'rsuite/dist/rsuite.min.css'
import ImagCards from '../../../components/card/ImagCard'
import img_empty from '../../../resource/media/empties/uploadImgTask.png'
import '../../farmer/Style.css'
import { UploadImageDatasouce } from '../../../datasource/UploadImageDatasource'
import { resizeFileImg } from '../../../utilities/ResizeImage'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../../entities/UploadImageEntities'
import { DeleteOutlined } from '@ant-design/icons'
import UploadIMGMulti from '../../../components/uploadImg/uploadImgMulti'
import ModalDelete from '../../../components/modal/ModalDelete'
import Pagination from 'antd/es/pagination'

const NewTable = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(169, 203, 98, 0.1) !important;
    font-family: 'Prompt' !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`
interface ImageData {
  id: any
  url: string
  file: string
  percent?: number
}
const IndexAdminTask = () => {
  const [form] = Form.useForm()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [current, setCurrent] = useState(1)
  const [taskList, setTaskList] = useState<any>()
  const [searchTaskList, setSearchTaskList] = useState<any>()
  const [source, setSource] = useState<string>('EDIT')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)
  const [taskSelected, setTaskSelected] = useState<TaskManageEntity>(TaskManageEntity_INIT)
  const [taskNo, setTaskNo] = useState()
  const [count, setCount] = useState<number>(0)
  const [taskId, setTaskId] = useState('')
  const [edit, setEdit] = useState<any>()
  const [history, setHistory] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [imgControl, setImgControl] = useState<any>()
  const [deleteImgControl, setDeleteImgControl] = useState<any>()
  const [deleteImgDrug, setDeleteImgDrug] = useState<any>()
  const [imgDrug, setImgDrug] = useState<any>()
  const [checkTask, setCheckTask] = useState<boolean>(false)
  const { Map } = require('immutable')
  const [createImgControl, setCreateImgControl] =
    useState<UploadImageEntity>(UploadImageEntity_INTI)
  const [createImgDrug, setCreateImgDrug] = useState<UploadImageEntity>(UploadImageEntity_INTI)
  const [deleteId, setDeleteId] = useState<any>()
  const [uploadedImageCount, setUploadedImageCount] = useState<number>(0)
  const [disableUpSave, setDisableSave] = useState<boolean>(false)
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const slicedData = history && history.length > 0 ? history.slice(startIndex, endIndex) : []

  const fetchTaskList = () => {
    TaskDatasource.getAllTaskList(taskNo, current, 10).then((res: AllTaskListEntity) => {
      setTaskList(res.data)
      const data = res.data.map((item) => {
        return {
          ...item,
          label: `${item.taskNo} (สถานะ : ${ALL_TASK_MAPPING[item.status]})`,
          value: item.id,
        }
      })
      setCount(res.count)
      setSearchTaskList(data)
    })
  }
  useEffect(() => {
    fetchTaskList()
  }, [taskNo, taskId])

  const onItemsRendered = (props: any) => {
    if (props.visibleStopIndex >= searchTaskList.length - 1) {
      if (searchTaskList.length < count) {
        TaskDatasource.getAllTaskList(taskNo, current + 1, 10).then((res: AllTaskListEntity) => {
          setTaskList([...taskList, res.data])
          const data = res.data.map((item) => {
            return {
              ...item,
              label: `${item.taskNo} (สถานะ : ${ALL_TASK_MAPPING[item.status]})`,
              value: item.id,
            }
          })
          setCurrent(current + 1)
          setSearchTaskList([...searchTaskList, ...data])
        })
      }
    }
  }

  const handleSearchTask = () => {
    setLoading(true)
    TaskDatasource.getManageTaskByTaskId(taskId)
      .then(async (res) => {
        if (res.data) {
          const datas = res.data.taskHistory
          const filterData = (datas || [])
            .filter((x: any) => x.createdBy !== 'System')
            ?.sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1))
          setHistory(filterData)
          setTaskSelected(res)
          form.setFieldsValue({
            unitPrice: res.data.unitPrice,
            farmAreaAmount: res.data.farmAreaAmount,
          })
        }
        if (res.imageTask) {
          const imgArray: ImageData[] = res.imageTask.map((item) => {
            return {
              id: item.id,
              url: item.pathFinishTask,
              file: item.pathFinishTask,
              percent: 100,
            }
          })
          setLoading(true)
          setTimeout(() => {
            setImgControl(imgArray)
            setDeleteImgControl(imgArray)
            setLoading(false)
          }, 1000)
        }
        if (res.data.imagePathDrug) {
          const resImg = await UploadImageDatasouce.getImage(res.data.imagePathDrug)

          setTimeout(() => {
            setLoading(true)
            setImgDrug([
              {
                id: 1,
                url: resImg.url,
                file: resImg.url,
                percent: 100,
              },
            ])
            setDeleteImgDrug([
              {
                id: 1,
                url: resImg.url,
                file: resImg.url,
                percent: 100,
              },
            ])
            setLoading(false)
          }, 1000)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const calculateTask = () => {
    TaskDatasource.calculateManageTask(
      taskId,
      form.getFieldValue('farmAreaAmount'),
      form.getFieldValue('unitPrice'),
      form.getFieldValue('remark'),
      `${profile.firstname} ${profile.lastname}`,
    ).then((res) => {
      setEdit(res.responseData)
    })
  }
  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value: inputValue } = e.target
    const convertedNumber = validateOnlyNumWDecimal(inputValue)
    form.setFieldsValue({ [name]: convertedNumber })
  }
  const checkRai = () => {
    const oldRai = Number(taskSelected?.data.farmerPlot.raiAmount)
    const newRai = Number(form.getFieldValue('farmAreaAmount'))
    return newRai > oldRai
  }
  const onChangeControl = async (fileList: FileList | null) => {
    if (fileList) {
      try {
        const updatedImages: ImageData[] = deleteImgControl.slice()

        for (let i = 0; i < fileList.length; i++) {
          const source = fileList[i]
          let newSource: any = source
          const isFileMoreThan2MB = source.size > 2 * 1024 * 1024

          if (isFileMoreThan2MB) {
            newSource = await resizeFileImg({
              file: source,
              compressFormat: source.type.split('/')[1],
              quality: 70,
              rotation: 0,
              responseUriFunc: (res: any) => {},
            })
          }

          const imgBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(reader.error)
            reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
          })
          const timestamp = new Date().getTime()

          const imageData: ImageData = {
            id: timestamp,
            url: imgBase64,
            file: Map(createImgControl)
              .set('file', isFileMoreThan2MB ? newSource : source)
              .toJS(),
            percent: 0,
          }
          updatedImages.push(imageData)
        }

        await updateImageProgressControl(updatedImages)
      } catch (error) {
        console.error('Error occurred while processing images:', error)
      }
    }
  }

  const updateImageProgressControl = async (updatedImages: ImageData[]) => {
    return new Promise<void>((resolve) => {
      const intervalDuration = 200
      let currentImageIndex = 0
      const updatePercent = () => {
        const currentImage = updatedImages[currentImageIndex]
        if (currentImage && typeof currentImage.percent === 'number') {
          const updatedPercent = Math.min(currentImage.percent + 20, 100)
          updatedImages[currentImageIndex] = { ...currentImage, percent: updatedPercent }
          setImgControl([...updatedImages])
          setDeleteImgControl([...updatedImages])
          checkImgSave([...updatedImages], deleteImgDrug)
          if (updatedPercent < 100) {
            setTimeout(updatePercent, intervalDuration)
          } else {
            currentImageIndex++
            setUploadedImageCount(currentImageIndex)
            if (
              currentImageIndex === updatedImages.length ||
              uploadedImageCount === updatedImages.length
            ) {
              resolve()
              return
            }
            setTimeout(updatePercent, intervalDuration)
          }
        }
      }
      updatePercent()
    })
  }
  const deleteImg = (id: any[]) => {
    const updatedImages = deleteImgControl.filter((e: any) => !id.includes(e.id))
    setDeleteImgControl([...updatedImages])
    setDeleteId([...id])
    checkImgSave([...updatedImages], deleteImgDrug)
  }
  const onChangeDrug = async (fileList: FileList | null) => {
    if (fileList) {
      const file = fileList[0]
      try {
        let newSource: any

        const isFileMoreThan2MB = file.size > 2 * 1024 * 1024
        if (isFileMoreThan2MB) {
          newSource = await resizeFileImg({
            file,
            compressFormat: file.type.split('/')[1],
            quality: 70,
            rotation: 0,
            responseUriFunc: (res: any) => {},
          })
        }

        const imgBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = () => reject(reader.error)
          reader.readAsDataURL(isFileMoreThan2MB ? newSource! : file)
        })

        const d = Map(createImgDrug).set('file', isFileMoreThan2MB ? newSource : file)
        const imageData: ImageData = {
          id: 1,
          url: imgBase64,
          file: d.toJS(),
          percent: 0,
        }

        await updateImageProgressDrug(imageData)
      } catch (error) {
        console.error('Error occurred while processing the image:', error)
      }
    }
  }
  const updateImageProgressDrug = async (imageData: ImageData) => {
    return new Promise<void>((resolve) => {
      const intervalDuration = 200
      let updatedPercent = 0
      const updatePercent = () => {
        if (typeof imageData.percent === 'number') {
          updatedPercent = Math.min(imageData.percent + 20, 100)
          imageData.percent = updatedPercent
          setImgDrug([imageData])
          setDeleteImgDrug([imageData])
          checkImgSave(deleteImgControl, [imageData])
          if (updatedPercent < 100) {
            setTimeout(updatePercent, intervalDuration)
          } else {
            resolve()
          }
        }
      }
      updatePercent()
    })
  }

  const deleteImgDrugs = (id: any[]) => {
    const updatedImages = deleteImgDrug.filter((e: any) => !id.includes(e.id))
    setDeleteImgDrug([...updatedImages])
    checkImgSave(deleteImgControl, [...updatedImages])
  }

  const checkImgSave = (img1: any, img2: any) => {
    if (img1?.length !== 0 && img2.length !== 0) {
      setDisableSave(false)
    } else {
      setDisableSave(true)
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
          <strong>การแก้ไข/ประวัติงาน</strong>
        </span>
      </Col>
    </Row>
  )
  const cardCurrentTask = (
    <Col span={12}>
      <Card style={{ backgroundColor: '#F2F5FC', height: '138px' }}>
        <Row
          justify={'center'}
          gutter={8}
          style={{
            fontSize: 16,
            paddingBottom: '15px',
            fontWeight: 'bold',
          }}
        >
          รายละเอียดงานเดิม (ปัจจุบัน)
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              borderRight: '2px groove',
              fontWeight: 'bold',
            }}
          >
            เกษตรกร
          </Col>
          <Col span={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            นักบินโดรน
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col span={12} style={{ textAlign: 'center', borderRight: '2px groove' }}>
            {taskSelected?.data.farmer && (
              <>
                {`${taskSelected?.data.farmer.firstname || '-'} ${
                  taskSelected?.data.farmer.lastname || '-'
                }`}
                <br />
                {`(${taskSelected?.data.farmer.telephoneNo || '-'})`}
              </>
            )}
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            {taskSelected?.data.droner && (
              <>
                {`${taskSelected?.data.droner.firstname || '-'} ${
                  taskSelected?.data.droner.lastname || '-'
                }`}
                <br />
                {`(${taskSelected?.data.droner.telephoneNo || '-'})`}
              </>
            )}
          </Col>
        </Row>
      </Card>
      <Card style={{ height: checkTask ? '54%' : '49%' }}>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              วันที่นัดหมาย
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ช่วงเวลาการพ่น
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              เป้าหมายการพ่น
            </Col>
          </>
          <>
            <Col span={8}>
              {DateTimeUtil.formatDateTime(taskSelected?.data.dateAppointment || '')}
            </Col>
            <Col span={8}>{taskSelected?.data.purposeSpray.purposeSprayName}</Col>
            <Col span={8}>
              {taskSelected?.data.targetSpray && taskSelected?.data.targetSpray.join(',')}
            </Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              การเตรียมยา
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              แปลง
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              พืชที่ปลูก
            </Col>
          </>
          <>
            <Col span={8}>{taskSelected?.data.preparationBy || '-'}</Col>
            <Col span={8}>{taskSelected?.data.farmerPlot.plotName || '-'}</Col>
            <Col span={8}>{taskSelected?.data.purposeSpray.crop.cropName || '-'}</Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ค่าบริการ/ไร่
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              จำนวนไร่
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              สถานะ
            </Col>
          </>
          <>
            <Col span={8}>{taskSelected?.data.unitPrice} บาท/ไร่</Col>
            <Col span={8}>{taskSelected?.data.farmAreaAmount} ไร่</Col>
            <Col span={8}>
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
        <Row justify={'space-between'} gutter={14} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={12} style={{ fontWeight: 'bold' }}>
              ภาพหลักฐานการบิน{' '}
              <span style={{ color: color.Grey, fontWeight: 'lighter' }}>
                ({taskSelected.imageTask.length || 0} รูป)
              </span>
            </Col>
            <Col span={12} style={{ fontWeight: 'bold' }}>
              ภาพปุ๋ยและยา{' '}
              <span style={{ color: color.Grey, fontWeight: 'lighter' }}>
                {' '}
                ({imgDrug?.length || 0} รูป)
              </span>
            </Col>
          </>
          <>
            <Col span={12}>{imgControl ? <ImagCards image={imgControl} /> : '-'}</Col>
            <Col span={12}>{imgDrug ? <ImagCards image={imgDrug} /> : '-'}</Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={24} style={{ fontWeight: 'bold' }}>
              หมายเหตุ
            </Col>
          </>
          <>
            <Col span={24}>{taskSelected?.data.comment || '-'}</Col>
          </>
        </Row>
      </Card>
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
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ค่าบริการ <span style={{ fontSize: 12 }}> (ก่อนค่าธรรมเนียม)</span>
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ค่าธรรมเนียม (5%)
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ส่วนลดค่าธรรมเนียม
            </Col>
          </>
          <>
            <Col span={8}>{numberWithCommasToFixed(Number(taskSelected?.data.price) || 0)} บาท</Col>
            <Col span={8}>{numberWithCommasToFixed(Number(taskSelected?.data.fee) || 0)} บาท</Col>
            <Col span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.discountFee) || 0)} บาท
            </Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ส่วนลดคูปอง
            </Col>
            <Col span={16} style={{ fontWeight: 'bold' }}>
              ส่วนลดจากแต้ม
            </Col>
          </>
          <>
            <Col span={8}>
              {numberWithCommasToFixed(Number(taskSelected?.data.discountCoupon)) || 0} บาท
            </Col>
            <Col span={16}>
              {numberWithCommasToFixed(Number(taskSelected?.data.discountCampaignPoint)) || 0} บาท
            </Col>
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
            <img src={icon.coinFarmer} style={{ width: '25px', height: '25px' }} />{' '}
            {numberWithCommas(
              Number(
                taskSelected?.taskEstimatePoint.find((x) => x.application === 'FARMER')
                  ?.receivePoint,
              ),
            ) || 0}{' '}
            แต้ม
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <img src={icon.coinDroner} style={{ width: '25px', height: '25px' }} />{' '}
            {numberWithCommas(
              Number(
                taskSelected?.taskEstimatePoint.find((x) => x.application === 'DRONER')
                  ?.receivePoint,
              ),
            ) || 0}{' '}
            แต้ม
          </Col>
        </Row>
      </Card>
    </Col>
  )
  const cardEditTask = (
    <Col span={12}>
      <Card style={{ backgroundColor: 'rgba(33, 150, 83, 0.1)', height: 'max-content' }}>
        <Row
          justify={'center'}
          gutter={8}
          style={{
            fontSize: 16,
            paddingBottom: '15px',
            fontWeight: 'bold',
            color: color.Success,
          }}
        >
          แก้ไข/ปรับปรุงรายละเอียดงานใหม่
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              borderRight: '2px groove',
              color: color.Success,
              fontWeight: 'bold',
            }}
          >
            เกษตรกร
          </Col>
          <Col
            span={12}
            style={{
              textAlign: 'center',
              color: color.Success,
              fontWeight: 'bold',
            }}
          >
            นักบินโดรน
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <Col span={12} style={{ textAlign: 'center', borderRight: '2px groove' }}>
            {taskSelected?.data.farmer && (
              <>
                {`${taskSelected?.data.farmer.firstname || '-'} ${
                  taskSelected?.data.farmer.lastname || '-'
                }`}
                <br />
                {`(${taskSelected?.data.farmer.telephoneNo || '-'})`}
              </>
            )}
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            {taskSelected?.data.droner && (
              <>
                {`${taskSelected?.data.droner.firstname || '-'} ${
                  taskSelected?.data.droner.lastname || '-'
                }`}
                <br />
                {`(${taskSelected?.data.droner.telephoneNo || '-'})`}
              </>
            )}
          </Col>
        </Row>
      </Card>
      <Card>
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              วันที่นัดหมาย
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ช่วงเวลาการพ่น
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              เป้าหมายการพ่น
            </Col>
          </>
          <Col span={8}>
            {DateTimeUtil.formatDateTime(taskSelected?.data.dateAppointment || '')}
          </Col>
          <Col span={8}>{taskSelected?.data.purposeSpray.purposeSprayName}</Col>
          <Col span={8}>
            {taskSelected?.data.targetSpray && taskSelected?.data.targetSpray.join(',')}
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              การเตรียมยา
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              แปลง
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              พืชที่ปลูก
            </Col>
          </>
          <>
            <Col span={8}>{taskSelected?.data.preparationBy || '-'}</Col>
            <Col span={8}>{taskSelected?.data.farmerPlot.plotName || '-'}</Col>
            <Col span={8}>{taskSelected?.data.purposeSpray.crop.cropName || '-'}</Col>
          </>
        </Row>
        <Divider />
        <Form form={form}>
          <Row justify={'space-between'} gutter={8}>
            <Col span={12}>
              <label style={{ fontWeight: 'bold' }}>ค่าบริการ/ไร่</label>
              <Form.Item
                name='unitPrice'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกค่าบริการ',
                  },
                ]}
              >
                <Input
                  suffix='บาท/ไร่'
                  onChange={(e) => {
                    checkNumber(e, 'unitPrice')
                    calculateTask()
                  }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label style={{ fontWeight: 'bold' }}>
                จำนวนไร่{' '}
                <span style={{ color: color.Error, fontSize: '12px' }}>
                  *ปรับได้ตั้งแต่ 1 - จำนวนไร่สูงสุด*
                </span>
              </label>
              <Form.Item
                name='farmAreaAmount'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกจำนวนไร่',
                  },
                  {
                    validator: (rules, value) => {
                      return new Promise(async (resolve, reject) => {
                        if (checkRai()) {
                          reject(
                            `จำนวนไร่ต้องไม่มากกว่า ${taskSelected?.data.farmerPlot.raiAmount} ไร่`,
                          )
                        } else {
                          resolve('')
                        }
                      })
                    },
                  },
                ]}
              >
                <Input
                  disabled={taskSelected?.data.status === 'DONE'}
                  suffix='ไร่'
                  onChange={(e) => {
                    checkNumber(e, 'farmAreaAmount')
                    calculateTask()
                  }}
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <label style={{ fontWeight: 'bold' }}>หมายเหตุ</label>
            <Form.Item name='remark'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='checkImg'>
              <Checkbox
                checked={checkTask}
                disabled={
                  taskSelected?.data.status !== 'DONE' &&
                  taskSelected?.data.status !== 'WAIT_REVIEW'
                }
                onChange={(e) => {
                  setCheckTask(!checkTask)
                }}
              >
                ต้องการอัพโหลดภาพหลักฐานการบิน และปุ๋ยยาใหม่
              </Checkbox>
            </Form.Item>
          </Col>
          {checkTask && (
            <>
              <Row justify={'space-between'} gutter={8}>
                <Col span={12}>
                  <label style={{ fontWeight: 'bold' }}>ภาพหลักฐานการบิน</label>
                </Col>
                <Col span={12}>
                  <label style={{ fontWeight: 'bold' }}>ภาพปุ๋ยและยา</label>
                </Col>
              </Row>
              <Row justify={'space-between'} gutter={32} style={{ paddingBottom: '4%' }}>
                <Col span={12}>
                  <UploadIMGMulti
                    img={deleteImgControl}
                    onChangeControl={onChangeControl}
                    handleDelete={deleteImg}
                  />
                </Col>
                <Col span={12}>
                  <UploadIMGMulti
                    img={deleteImgDrug}
                    onChangeControl={onChangeDrug}
                    handleDelete={deleteImgDrugs}
                  />
                </Col>
              </Row>
            </>
          )}
        </Form>
        <Button
          disabled={disableUpSave}
          style={{
            backgroundColor: disableUpSave ? color.Grey : color.Success,
            color: 'white',
            width: '100%',
            borderRadius: '5px',
          }}
          onClick={async () => {
            await form.validateFields()
            setShowModal(!showModal)
          }}
        >
          บันทึก
        </Button>
      </Card>
      <Card style={{ backgroundColor: 'rgba(33, 150, 83, 0.1)' }}>
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
              color: color.Success,
              fontWeight: 'bold',
            }}
          >
            {numberWithCommasToFixed(
              Number(`${edit?.task.price}` || 0) -
                Number(`${edit?.task.discountCoupon}` || 0) -
                Number(`${edit?.task.discountCampaignPoint}` || 0),
            ) ||
              numberWithCommasToFixed(
                Number(taskSelected?.data.price || 0) -
                  Number(taskSelected?.data.discountCoupon || 0) -
                  Number(taskSelected?.data.discountCampaignPoint || 0),
              )}{' '}
            บาท
          </Col>
          <Col
            span={12}
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: color.Warning,
              fontWeight: 'bold',
            }}
          >
            {numberWithCommasToFixed(
              Number(`${edit?.task.price}` || 0) +
                Number(`${edit?.task.discountCoupon}` || 0) +
                Number(`${edit?.task.discountCampaignPoint}` || 0),
            ) ||
              numberWithCommasToFixed(
                Number(taskSelected?.data.price || 0) +
                  Number(taskSelected?.data.discountCoupon || 0) +
                  Number(taskSelected?.data.discountCampaignPoint || 0),
              )}{' '}
            บาท
          </Col>
        </Row>
        <Divider />
        <Row justify={'space-between'} gutter={8} style={{ paddingBottom: '15px' }}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ค่าบริการ
              <span style={{ fontSize: '12px' }}> (ก่อนค่าธรรมเนียม)</span>
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ค่าธรรมเนียม (5%)
            </Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ส่วนลดค่าธรรมเนียม
            </Col>
          </>
          <>
            <Col span={8}>
              {numberWithCommasToFixed(edit?.task.price) ||
                numberWithCommasToFixed(Number(taskSelected?.data.price) || 0)}{' '}
              บาท
            </Col>
            <Col span={8}>
              {numberWithCommasToFixed(edit?.task.fee) ||
                numberWithCommasToFixed(Number(taskSelected?.data.fee) || 0)}{' '}
              บาท
            </Col>
            <Col span={8}>
              {numberWithCommasToFixed(Number(edit?.task.discountFee)) ||
                numberWithCommasToFixed(Number(taskSelected?.data.discountFee) || 0)}{' '}
              บาท
            </Col>
          </>
        </Row>
        <Row justify={'space-between'} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: 'bold' }}>
              ส่วนลดคูปอง
            </Col>
            <Col span={16} style={{ fontWeight: 'bold' }}>
              ส่วนลดจากแต้ม
            </Col>
          </>
          <>
            <Col span={8}>
              {numberWithCommasToFixed(
                Number(`${edit?.task.discountCoupon}`) ||
                  Number(taskSelected?.data.discountCoupon) ||
                  0,
              )}{' '}
              บาท
            </Col>
            <Col span={16}>
              {numberWithCommasToFixed(
                Number(`${edit?.task.discountCampaignPoint}`) ||
                  Number(taskSelected?.data.discountCampaignPoint) ||
                  0,
              )}{' '}
              บาท
            </Col>
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
            <img src={icon.coinFarmer} style={{ width: '25px', height: '25px' }} />{' '}
            {numberWithCommas(Number(`${edit?.farmerPoint}`)) ||
              numberWithCommas(
                Number(
                  taskSelected?.taskEstimatePoint.find((x) => x.application === 'FARMER')
                    ?.receivePoint,
                ) || 0,
              )}{' '}
            แต้ม
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <img src={icon.coinDroner} style={{ width: '25px', height: '25px' }} />{' '}
            {numberWithCommas(Number(`${edit?.dronerPoint}`)) ||
              numberWithCommas(
                Number(
                  taskSelected?.taskEstimatePoint.find((x) => x.application === 'DRONER')
                    ?.receivePoint,
                ) || 0,
              )}{' '}
            แต้ม
          </Col>
        </Row>
      </Card>
    </Col>
  )
  const columns = [
    {
      title: 'วันที่อัพเดต',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{DateTimeUtil.formatDateTime(value)}</span>,
        }
      },
    },
    {
      title: 'กิจกรรม',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{HISTORY_TASK[value?.replaceAll(' ', '')]}</span>,
        }
      },
    },
    {
      title: 'ก่อนเปลี่ยนแปลง',
      dataIndex: 'beforeValue',
      key: 'beforeValue',
      render: (value: any, row: any, index: number) => {
        const action = row.action.replaceAll(' ', '')
        return {
          children: (
            <span>
              {action === 'ChangeStatus' || action === 'FinishTask'
                ? ALL_TASK_MAPPING[value]
                : action === 'ChangeDateAppointment'
                ? DateTimeUtil.formatDateTime(value)
                : value}
              {action === 'แก้ไขจำนวนแปลง' && ' ไร่'}
            </span>
          ),
        }
      },
    },
    {
      title: 'หลังเปลี่ยนแปลง',
      dataIndex: 'afterValue',
      key: 'afterValue',
      render: (value: any, row: any, index: number) => {
        const action = row.action.replaceAll(' ', '')
        return {
          children: (
            <span>
              {action === 'ChangeStatus' || action === 'FinishTask'
                ? ALL_TASK_MAPPING[value]
                : action === 'ChangeDateAppointment'
                ? DateTimeUtil.formatDateTime(value)
                : value}
              {action === 'แก้ไขจำนวนแปลง' && ' ไร่'}
            </span>
          ),
        }
      },
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'remark',
      key: 'remark',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value || '-'}</span>,
        }
      },
    },
    {
      title: 'ผู้ใช้ที่อัพเดต',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value || '-'}</span>,
        }
      },
    },
  ]
  const cardHistoryTask = (
    <>
      <NewTable
        pagination={false}
        columns={columns}
        dataSource={slicedData}
        scroll={{ x: 'max-content' }}
      />
      <div
        className='p-3'
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div style={{ flexGrow: 1, textAlign: 'left' }}>
          <p>รายการทั้งหมด {history?.length || 0} รายการ</p>
        </div>
        <div>
          <Pagination
            className='pt-3'
            current={currentPage}
            pageSize={itemsPerPage}
            total={history?.length || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  )

  const onSubmit = async () => {
    const getUpdateBy = () => `${profile.firstname} ${profile.lastname}`
    const resetFormFields = () => {
      form.setFieldsValue({
        remark: '',
      })
    }
    const filteredArray = deleteImgControl.filter((item: any) => typeof item?.id === 'number')
    const filteredTypeString = deleteImgControl.filter((item: any) => typeof item?.id === 'string')
    let sumFilters: any = []
    if (Array.isArray(deleteImgControl) && deleteImgControl.length > 0) {
      sumFilters = filteredArray
    } else {
      sumFilters = filteredTypeString
    }
    try {
      if (deleteId) {
        for (const id of deleteId) {
          await TaskDatasource.deleteImageFinishTask(id)
        }
      }
      if (sumFilters.length > 0) {
        for (let i = 0; i < sumFilters.length; i++) {
          const currentImage = sumFilters[i].file
          const remarkValue = form.getFieldValue('remark')
          if (currentImage) {
            await TaskDatasource.updateImageFinishTask(
              taskId,
              taskSelected.data.dronerId,
              getUpdateBy(),
              currentImage.file,
              remarkValue,
            )
          }
        }
      } else if (deleteImgDrug) {
        const firstMockImgFile = deleteImgDrug[0].file.file
        const timestamp = new Date().getTime()
        const fileExtension = firstMockImgFile.type.split('/')[1]
        const modifiedFile = new File([firstMockImgFile], `${timestamp}.${fileExtension}`, {
          type: firstMockImgFile.type,
        })
        if (firstMockImgFile) {
          await TaskDatasource.insertManageTaskImg(
            taskId,
            getUpdateBy(),
            form.getFieldValue('remark'),
            undefined,
            modifiedFile,
          )
        }
      } else {
        await TaskDatasource.insertManageTask(
          taskId,
          form.getFieldValue('farmAreaAmount'),
          form.getFieldValue('unitPrice'),
          form.getFieldValue('remark'),
          getUpdateBy(),
        )
      }
      fetchTaskList()
      handleSearchTask()
      setShowModal(!showModal)
      resetFormFields()
    } catch (error) {
      console.error(error)
    }
  }

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
                          setDeleteImgControl(null)
                          setDeleteImgDrug(null)
                        }
                        setTaskId(e)
                        setSearch(false)
                      }}
                      placeholder='ค้นหารหัสงาน (Task No.)'
                      onSearch={(val: any) => {
                        const uppercase = val.toUpperCase()
                        if (!uppercase) {
                          setTaskNo(uppercase)
                        }
                        setTaskNo(uppercase)
                      }}
                      onClean={() => {
                        setCurrent(1)
                        setTaskNo(undefined)
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
                      setSource('EDIT')
                    }}
                  >
                    ค้นหา
                  </Button>
                </Col>
                {taskId && search && (
                  <Col span={4}>
                    <Radio.Group buttonStyle='outline'>
                      <Radio.Button
                        value='EDIT'
                        style={
                          source === 'EDIT'
                            ? {
                                color: color.Success,
                                borderColor: color.Success,
                                borderRadius: '5px, 5px',
                                backgroundColor: 'rgba(33, 150, 83, 0.1)',
                                height: 35,
                              }
                            : { height: 35, color: color.BK }
                        }
                        onClick={() => {
                          setSource('EDIT')
                        }}
                      >
                        แก้ไขงาน
                      </Radio.Button>
                      <Radio.Button
                        value='HISTORY'
                        style={
                          source === 'HISTORY'
                            ? {
                                color: color.Success,
                                borderColor: color.Success,
                                borderRadius: '5px, 5px',
                                backgroundColor: 'rgba(33, 150, 83, 0.1)',
                                height: 35,
                              }
                            : { height: 35, color: color.BK }
                        }
                        onClick={() => {
                          setSource('HISTORY')
                        }}
                      >
                        ประวัติงาน
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                )}
              </Row>
            </Container>
            {taskId &&
              search &&
              (source === 'EDIT' ? (
                <Container style={{ paddingBottom: '10px' }}>
                  <Row gutter={8} justify={'space-between'}>
                    {cardCurrentTask}
                    {cardEditTask}
                  </Row>
                </Container>
              ) : (
                <>{cardHistoryTask}</>
              ))}
          </Spin>
        </CardContainer>
      </div>
      {showModal && (
        <Modal
          title='ยืนยันการแก้ไข'
          onCancel={() => {
            setShowModal(!showModal)
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
          style={{ top: '25%' }}
        >
          <div className='px-4 pt-4'>
            <span className='text-secondary'>
              โปรดตรวจสอบงานที่คุณต้องการแก้ไข ก่อนที่จะกดยืนยันแก้ไข
            </span>
            <p className='text-secondary'>เพราะอาจส่งผลต่อการจ้างงานในแอปพลิเคชัน</p>
          </div>
          <Divider
            style={{
              marginBottom: '20px',
            }}
          />
          <div className='d-flex justify-content-between px-4 pb-3'>
            <Button
              style={{
                borderColor: color.Success,
                color: color.Success,
              }}
              onClick={() => {
                setShowModal(!showModal)
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Success,
                backgroundColor: color.Success,
                color: color.White,
              }}
              onClick={() => onSubmit()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default IndexAdminTask
