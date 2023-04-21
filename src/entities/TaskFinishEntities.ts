import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";
import {
  CreateReview,
  CreateReview_INIT,
  reviewDronerDetail,
  reviewDronerDetail_INIT,
} from "./ReviewDronerEntities";
import { FarmerEntity, FarmerEntity_INIT } from "./FarmerEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerDroneEntities";
import { HistoryEntity, HistoryEntity_INIT } from "./HistoryEntities";
import {
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from "./TaskDronerTemp";
import { TaskHistoryEntity, TaskHistoryEntity_INIT } from "./TaskHistory";
export interface ImgEntity {
  fileName: string;
  path: string;
}
export const ImgEntity_INIT: ImgEntity = {
  fileName: "",
  path: "",
};
export interface TaskFinish {
  id: string;
  taskNo: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  purposeSpray: {
    id: string;
    cropId: string;
    purposeSprayName: string;
  };
  purposeSprayId: string;
  dateAppointment: string;
  targetSpray: string[];
  preparationBy: string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: string;
  taskHistory: HistoryEntity;
  distance: string;
  status: string;
  statusRemark: string;
  reviewDronerAvg: string;
  reviewDronerDetail: reviewDronerDetail;
  unitPriceStandard: string;
  priceStandard: string;
  unitPrice: string;
  price: string;
  totalPrice: string;
  fee: string;
  discountFee: string;
  reviewFarmerScore: string;
  reviewFarmerComment: string;
  imagePathFinishTask: string;
  comment: null;
  countResend: string;
  couponCode: string;
  couponId: string;
  statusPayment: string;
  farmer: FarmerEntity;
  farmerPlot: FarmerPlotEntity;
  droner: DronerEntity;
  taskDronerTemp: TaskDronerTempEntity[];
  discountPromotion: string;
  dissountCoupon: string;
  revenuePromotion: string;
}
export const TaskFinish_INIT: TaskFinish = {
  id: "",
  taskNo: "",
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  purposeSpray: {
    id: "",
    cropId: "",
    purposeSprayName: "",
  },
  purposeSprayId: "",
  dateAppointment: "",
  targetSpray: [""],
  preparationBy: "",
  createdAt: "",
  updatedAt: "",
  taskHistory: HistoryEntity_INIT,
  createBy: "",
  updateBy: "",
  distance: "",
  status: "",
  statusRemark: "",
  reviewDronerAvg: "",
  reviewDronerDetail: reviewDronerDetail_INIT,
  unitPriceStandard: "",
  priceStandard: "",
  unitPrice: "",
  price: "",
  totalPrice: "",
  fee: "",
  discountFee: "",
  reviewFarmerScore: "",
  reviewFarmerComment: "",
  imagePathFinishTask: "",
  comment: null,
  countResend: "",
  couponCode: "",
  couponId: "",
  statusPayment: "",
  farmerPlot: FarmerPlotEntity_INIT,
  farmer: FarmerEntity_INIT,
  droner: DronerEntity_INIT,
  taskDronerTemp: [TaskDronerTempEntity_INIT],
  discountPromotion: "",
  dissountCoupon: "",
  revenuePromotion: "",
};
export interface TaskFinishListEntity {
  data: TaskFinish[];
  count: number;
}
export interface DetailFinishTask {
  data: TaskFinish;
  imageTaskUrl: string;
  imageBookBank: ImgEntity;
  imageIdCard: ImgEntity;
}
export const DetailFinishTask_INIT: DetailFinishTask = {
  data: TaskFinish_INIT,
  imageTaskUrl: "",
  imageBookBank: ImgEntity_INIT,
  imageIdCard: ImgEntity_INIT,
};

//create review droner
export interface CreateReviewDroner {
  id: string;
  taskNo: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  purposeSpray: {
    id: string;
    cropId: string;
    purposeSprayName: string;
  };
  purposeSprayId: string;
  dateAppointment: string;
  targetSpray: string[];
  preparationBy: string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: string;
  distance: string;
  status: string;
  statusRemark: string;
  reviewDronerAvg: string;
  reviewDronerDetail: CreateReview;
  unitPriceStandard: string;
  priceStandard: string;
  unitPrice: string;
  price: string;
  totalPrice: string;
  fee: string;
  discountFee: string;
  reviewFarmerScore: string;
  reviewFarmerComment: string;
  imagePathFinishTask: string;
  comment: null;
  farmer: FarmerEntity;
  farmerPlot: FarmerPlotEntity;
  droner: DronerEntity;
  discountPromotion: string;
  dissountCoupon: string;
  revenuePromotion: string;
}
export const CreateReviewDroner_INIT: CreateReviewDroner = {
  id: "",
  taskNo: "",
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  purposeSpray: {
    id: "",
    cropId: "",
    purposeSprayName: "",
  },
  purposeSprayId: "",
  dateAppointment: "",
  targetSpray: [""],
  preparationBy: "",
  createdAt: "",
  updatedAt: "",
  createBy: "",
  updateBy: "",
  distance: "",
  status: "",
  statusRemark: "",
  reviewDronerAvg: "",
  reviewDronerDetail: CreateReview_INIT,
  unitPriceStandard: "",
  priceStandard: "",
  unitPrice: "",
  price: "",
  totalPrice: "",
  fee: "",
  discountFee: "",
  reviewFarmerScore: "",
  reviewFarmerComment: "",
  imagePathFinishTask: "",
  comment: null,
  farmerPlot: FarmerPlotEntity_INIT,
  farmer: FarmerEntity_INIT,
  droner: DronerEntity_INIT,
  discountPromotion: "",
  dissountCoupon: "",
  revenuePromotion: "",
};
export interface DetailReviewTask {
  data: CreateReviewDroner;
  imageTaskUrl: string;
}
export const DetailReviewTask_INIT: DetailReviewTask = {
  data: CreateReviewDroner_INIT,
  imageTaskUrl: "",
};

export interface TaskReportEntity {
  key: React.Key;
  id: string;
  taskNo: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  purposeSprayId: string;
  dateAppointment: string;
  targetSpray: string[];
  taskHistory: TaskHistoryEntity[];
  preparationBy: string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: string;
  distance: string;
  status: string;
  statusRemark: string;
  reviewDronerAvg: string;
  reviewDronerDetail: reviewDronerDetail;
  unitPriceStandard: string;
  priceStandard: string;
  unitPrice: string;
  price: string;
  totalPrice: string;
  fee: string;
  discountFee: string;
  reviewFarmerScore: string;
  reviewFarmerComment: string;
  imagePathFinishTask: string;
  comment: string;
  isProblem: boolean;
  problemRemark: string;
  isDelay: boolean;
  delayRemark: string;
  dateDelay: string;
  statusDelay: string;
  delayRejectRemark: string;
  couponCode: string;
  couponId: string;
  discount: string;
  countResend: string;
  statusPayment: string;
  isChecked: boolean;
  farmer: FarmerEntity;
  farmerPlot: FarmerPlotEntity;
  droner: DronerEntity;
  taskDronerTemp: TaskDronerTempEntity[];
}
export const TaskReportEntity_INIT: TaskReportEntity = {
  key: "",
  id: "",
  taskNo: "",
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  purposeSprayId: "",
  dateAppointment: "",
  targetSpray: [""],
  taskHistory: [TaskHistoryEntity_INIT],
  preparationBy: "",
  createdAt: "",
  updatedAt: "",
  createBy: "",
  updateBy: "",
  distance: "",
  status: "",
  statusRemark: "",
  reviewDronerAvg: "",
  reviewDronerDetail: reviewDronerDetail_INIT,
  unitPriceStandard: "",
  priceStandard: "",
  unitPrice: "",
  price: "",
  totalPrice: "",
  fee: "",
  discountFee: "",
  reviewFarmerScore: "",
  reviewFarmerComment: "",
  imagePathFinishTask: "",
  comment: "",
  isProblem: false,
  problemRemark: "",
  isDelay: false,
  delayRemark: "",
  dateDelay: "",
  statusDelay: "",
  delayRejectRemark: "",
  couponCode: "",
  couponId: "",
  discount: "",
  countResend: "",
  statusPayment: "",
  isChecked: false,
  farmer: FarmerEntity_INIT,
  farmerPlot: FarmerPlotEntity_INIT,
  droner: DronerEntity_INIT,
  taskDronerTemp: [TaskDronerTempEntity_INIT],
};
export interface summaryReportEntity {
  waitpayment: string;
  donepayment: string;
  successpayment: string;
  waitreview: string;
  canceledtask: string;
}
export const summaryReportEntity_INIT: summaryReportEntity = {
  waitpayment: "",
  donepayment: "",
  successpayment: "",
  waitreview: "",
  canceledtask: "",
};
export interface TaskReportListEntity {
  data: TaskReportEntity[];
  count: number;
  summary: [summaryReportEntity];
}
export interface updateStatusPays {
  id: string[];
  statusPayment: string;
  updateBy: string;
}
export const updateStatusPays_INIT: updateStatusPays = {
  id: [""],
  statusPayment: "",
  updateBy: "",
};
