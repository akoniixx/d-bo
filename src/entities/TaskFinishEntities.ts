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
import { TaskDronerTempEntity, TaskDronerTempEntity_INIT } from "./TaskDronerTemp";
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
  farmer: FarmerEntity;
  farmerPlot: FarmerPlotEntity;
  droner: DronerEntity;
  taskDronerTemp: TaskDronerTempEntity[];
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
  farmerPlot: FarmerPlotEntity_INIT,
  farmer: FarmerEntity_INIT,
  droner: DronerEntity_INIT,
  taskDronerTemp: [TaskDronerTempEntity_INIT],
};
export interface TaskFinishListEntity {
  data: TaskFinish[];
  count: number;
}
export interface DetailFinishTask {
  data: TaskFinish;
  imageTaskUrl: string;
}
export const DetailFinishTask_INIT: DetailFinishTask = {
  data: TaskFinish_INIT,
  imageTaskUrl: "",
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
};
export interface DetailReviewTask {
  data: CreateReviewDroner;
  imageTaskUrl: string;
}
export const DetailReviewTask_INIT: DetailReviewTask = {
  data: CreateReviewDroner_INIT,
  imageTaskUrl: "",
};
