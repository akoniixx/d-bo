import { CropPurposeSprayEntity, CropPurposeSprayEntity_INT } from './CropEntities'
import { DronerEntity, DronerEntity_INIT } from './DronerEntities'
import {
  FarmerEntity,
  FarmerEntity_INIT,
  GetFarmerEntity,
  GetFarmerEntity_INIT,
} from './FarmerEntities'
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from './FarmerPlotEntities'
import {
  CreateDronerTempEntity,
  CreateDronerTempEntity_INIT,
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from './TaskDronerTemp'

export interface NewTaskEntity {
  id: string
  farmer_plot_id: string
  task_no: string
  total_price: string
  farm_area_amount: string
  firstname: string
  lastname: string
  telephone_no: string
  date_appointment: string
  create_by: string
  province_name: string
  district_name: string
  subdistrict_name: string
  updatedat: string
  createdat: string
  status: string
  task_status: string
  count_droner: string
}
export interface NewTaskPageEntity {
  data: NewTaskEntity[]
  count: number
}
export interface CreateNewTaskEntity {
  cropName: string
  farmerId: string
  farmerPlotId: string
  farmAreaAmount: string
  dronerId?: string
  distance?: number
  dateAppointment: string
  targetSpray: string[]
  preparationBy: string
  purposeSprayId: string
  purposeSprayName?: string
  taskDronerTemp?: CreateDronerTempEntity[]
  status: string
  statusRemark: string
  createBy: string
  unitPriceStandard: number
  priceStandard: number
  unitPrice: number
  price: number
  fee: number
  discountFee: number
  comment: string
  total_price: string
  discount_coupon: string
  discount_promotion: string
  farm_area_amount: string
  unit_price: string
  discount_fee: string
}
export const CreateNewTaskEntity_INIT: CreateNewTaskEntity = {
  cropName: '',
  farmerId: '',
  farmerPlotId: '',
  farmAreaAmount: '',
  dronerId: '',
  distance: 0,
  dateAppointment: '',
  targetSpray: [''],
  preparationBy: '',
  purposeSprayId: '',
  taskDronerTemp: [CreateDronerTempEntity_INIT],
  status: '',
  statusRemark: '',
  createBy: '',
  unitPriceStandard: 0,
  priceStandard: 0,
  unitPrice: 0,
  price: 0,
  fee: 0,
  discountFee: 0,
  comment: '',
  total_price: '',
  discount_coupon: '',
  discount_promotion: '',
  farm_area_amount: '',
  unit_price: '',
  discount_fee: '',
}
export interface GetNewTaskEntity {
  id: string
  couponCode: string
  couponId: string
  discountCoupon: string
  taskNo: string
  farmerId: string
  farmerPlotId: string
  farmAreaAmount: any
  dronerId: string
  purposeSprayId: string
  dateAppointment: string
  targetSpray: string[]
  taskDronerTemp?: TaskDronerTempEntity[]
  preparationBy: string
  createdAt: string
  distance: string
  status: string
  statusRemark: string
  reviewDronerAvg: string
  reviewDronerDetail: string
  unitPriceStandard: number
  priceStandard: number
  unitPrice: number
  price: any
  totalPrice: string
  fee: number
  discountFee: number
  reviewFarmerScore: string
  reviewFarmerComment: string
  imagePathFinishTask: string
  imagePathDrug: string
  comment: string
  isProblem: boolean
  problemRemark: string
  dateRemark: string
  dateDelay: string
  statusDelay: string
  delayRejectRemark: string
  purposeSpray: CropPurposeSprayEntity
  farmer: FarmerEntity
  droner: DronerEntity
  farmerPlot: FarmerPlotEntity
  updatedAt?: string
  revenuePromotion: string
  discountPromotion: string
  usePoint: string
  discountCampaignPoint: string
}
export const GetNewTaskEntity_INIT: GetNewTaskEntity = {
  id: '',
  taskNo: '',
  farmerId: '',
  discountCoupon: '',
  farmerPlotId: '',
  couponCode: '',
  couponId: '',
  farmAreaAmount: '',
  dronerId: '',
  purposeSprayId: '',
  dateAppointment: '',
  targetSpray: [''],
  taskDronerTemp: [TaskDronerTempEntity_INIT],
  preparationBy: '',
  createdAt: '',
  distance: '',
  status: '',
  statusRemark: '',
  reviewDronerAvg: '',
  reviewDronerDetail: '',
  unitPriceStandard: 0,
  priceStandard: 0,
  unitPrice: 0,
  price: '',
  totalPrice: '',
  fee: 0,
  discountFee: 0,
  reviewFarmerScore: '',
  reviewFarmerComment: '',
  imagePathFinishTask: '',
  imagePathDrug: '',
  comment: '',
  isProblem: false,
  problemRemark: '',
  dateRemark: '',
  dateDelay: '',
  statusDelay: '',
  delayRejectRemark: '',
  purposeSpray: CropPurposeSprayEntity_INT,
  farmer: FarmerEntity_INIT,
  droner: DronerEntity_INIT,
  farmerPlot: FarmerPlotEntity_INIT,
  updatedAt: '',
  revenuePromotion: '',
  discountPromotion: '',
  usePoint: '',
  discountCampaignPoint: '',
}
export interface UpdateNewTask {
  id: string
  farmerId: string
  farmerPlotId: string
  farmAreaAmount: string
  dateAppointment: string
  targetSpray: string[]
  preparationBy: string
  purposeSprayId: string
  status: string
  statusRemark: string
  updateBy: string
  unitPriceStandard: number
  priceStandard: number
  unitPrice: number
  price: string
  comment: string
  fee: number
  discountFee: number
  couponCode: string
  couponId: string
  discountCoupon: number
}
export const UpdateNewTask_INIT: UpdateNewTask = {
  id: '',
  farmerId: '',
  farmerPlotId: '',
  farmAreaAmount: '',
  dateAppointment: '',
  targetSpray: [''],
  preparationBy: '',
  purposeSprayId: '',
  status: '',
  statusRemark: '',
  updateBy: '',
  unitPriceStandard: 0,
  priceStandard: 0,
  unitPrice: 0,
  price: '',
  comment: '',
  fee: 0,
  discountFee: 0,
  couponCode: '',
  couponId: '',
  discountCoupon: 0,
}

export interface UpdateTaskStatus {
  id: string
  status: string
  statusRemark: string
  updateBy: string
}

export const UpdateTaskStatus_INIT: UpdateTaskStatus = {
  id: '',
  status: '',
  statusRemark: '',
  updateBy: '',
}

export interface InvoiceTaskEntity {
  raiAmount: string
  unitPrice: string
  price: string
  fee: string
  discountFee: string
  discountCoupon: string
  discountPromotion: string
  discountPoint: string
  totalPrice: string
}

export interface AllTaskListEntity {
  count: number
  data: AllTaskEntity[]
}

export interface AllTaskEntity {
  id: string
  taskName?: string
  taskNo: string
  createdAt: string
  updatedAt: string
  status: string
}

export interface TaskManageEntity {
  data: {
    dateAppointment: string
    discountCampaignPoint: string
    discountCoupon: string
    discountFee: string
    comment: string
    imagePathFinishTask: string
    imagePathDrug: string
    droner: {
      firstname: string
      lastname: string
      telephoneNo: string
    }
    dronerId: string
    farmAreaAmount: any
    farmer: {
      firstname: string
      lastname: string
      telephoneNo: string
    }
    farmerId: string
    farmerPlot: {
      plotName?: string
      raiAmount?: string
    }
    fee: number
    id: string
    preparationBy: string
    price?: string
    purposeSpray: {
      crop: {
        cropName: string
      }
      purposeSprayName: string
    }
    status: string
    targetSpray: string[]
    taskHistory: []
    totalPrice: number
    unitPrice: number
    usePoint: string
  }
  taskEstimatePoint: {
    application: string
    campaignId: string
    campaignName: string
    createAt: string
    dronerId: string
    farmerId: string
    id: string
    pointPerRai: string
    receivePoint: number
    status: string
    taskId: string
    updatedAt: string
  }[]
}
export const TaskManageEntity_INIT: TaskManageEntity = {
  data: {
    dateAppointment: "",
    discountCampaignPoint: "",
    discountCoupon: "",
    discountFee: "",
    comment: "",
    imagePathFinishTask: "",
    imagePathDrug: "",
    droner: {
      firstname: "",
      lastname: "",
      telephoneNo: "",
    },
    dronerId: "",
    farmAreaAmount: 0,
    farmer: {
      firstname: "",
      lastname: "",
      telephoneNo: "",
    },
    farmerId: "",
    farmerPlot: {
      plotName: "",
      raiAmount: "",
    },
    fee: 0,
    id: "",
    preparationBy: "",
    price: "",
    purposeSpray: {
      crop: {
        cropName: "",
      },
      purposeSprayName: "",
    },
    status: "",
    targetSpray: [""],
    taskHistory: [],
    totalPrice: 0,
    unitPrice: 0,
    usePoint: "",
  },
  taskEstimatePoint: []
}
