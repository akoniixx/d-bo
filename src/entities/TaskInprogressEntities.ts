import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
import { FarmerEntity, FarmerEntity_INIT } from "./FarmerEntities";
import { TaskDronerTempEntity, TaskDronerTempEntity_INIT} from "./TaskDronerTemp";
import { CropPurposeSprayEntity, CropPurposeSprayEntity_INIT } from "./CropEntities";
export interface TaskInprogressEntity {
  count: number;
  summary: {
    inprogressnormal: string;
    inprogressproblem: string;
    waitstartnormal: string;
    waitstartproblem: string;
    waitapprovedelay: string;
    extended: string;
  };
  data: [
    {
      id: string;
      taskNo: string;
      farmerId: string;
      farmerPlotId: string;
      farmAreaAmount: string;
      dronerId: string;
      purposeSprayId: null;
      dateAppointment: string;
      targetSpray: string[];
      preparationBy: string;
      createdAt: string;
      updatedAt: string;
      createBy: string;
      updateBy: null;
      distance: string;
      status: string;
      statusRemark: string;
      reviewDronerAvg: null;
      reviewDronerDetail: null;
      unitPriceStandard: string;
      priceStandard: string;
      unitPrice: string;
      price: string;
      totalPrice: string;
      fee: string;
      discountFee: string;
      reviewFarmerScore: null;
      reviewFarmerComment: null;
      imagePathFinishTask: null;
      comment: string;
      isProblem: boolean;
      problemRemark: null;
      isDelay: boolean;
      delayRemark: null;
      dateDelay: null;
      statusDelay: null;
      delayRejectRemark: null;
      farmer: FarmerEntity;
      droner: DronerEntity;
    }
  ];
}
export const TaskInprogressEntity_INIT: TaskInprogressEntity = {
  count: 0,
  summary: {
    inprogressnormal: "",
    inprogressproblem: "",
    waitstartnormal: "",
    waitstartproblem: "",
    waitapprovedelay: "",
    extended: "",
  },
  data: [
    {
      id: "",
      taskNo: "",
      farmerId: "",
      farmerPlotId: "",
      farmAreaAmount: "",
      dronerId: "",
      purposeSprayId: null,
      dateAppointment: "",
      targetSpray: [""],
      preparationBy: "",
      createdAt: "",
      updatedAt: "",
      createBy: "",
      updateBy: null,
      distance: "",
      status: "",
      statusRemark: "",
      reviewDronerAvg: null,
      reviewDronerDetail: null,
      unitPriceStandard: "",
      priceStandard: "",
      unitPrice: "",
      price: "",
      totalPrice: "",
      fee: "",
      discountFee: "",
      reviewFarmerScore: null,
      reviewFarmerComment: null,
      imagePathFinishTask: null,
      comment: "",
      isProblem: true,
      problemRemark: null,
      isDelay: true,
      delayRemark: null,
      dateDelay: null,
      statusDelay: null,
      delayRejectRemark: null,
      farmer: FarmerEntity_INIT,
      droner: DronerEntity_INIT,
    },
  ],
};
export interface summaryEntity {
  inprogressnormal: string;
  inprogressproblem: string;
  waitstartnormal: string;
  waitstartproblem: string;
  waitapprovedelay: string;
  extended: string;
}
export const summaryEntity_INIT: summaryEntity = {
  inprogressnormal: "",
  inprogressproblem: "",
  waitstartnormal: "",
  waitstartproblem: "",
  waitapprovedelay: "",
  extended: "",
};
export interface TaskTodayListEntity {
  data: TaskInprogressEntity[];
  count: number;
  summary: summaryEntity;
}
export interface TaskDetailEntity {
  id: string;
  taskNo: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  purposeSprayId: string;
  dateAppointment: string;
  targetSpray: string[];
  preparationBy: string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: null;
  distance: string;
  status: string;
  statusRemark: string;
  reviewDronerAvg: null;
  reviewDronerDetail: null;
  unitPriceStandard: string;
  priceStandard: string;
  unitPrice: string;
  price: string;
  totalPrice: string;
  fee: string;
  discountFee: string;
  reviewFarmerScore: null;
  reviewFarmerComment: null;
  imagePathFinishTask: null;
  comment: string;
  isProblem: boolean;
  problemRemark: null;
  isDelay: boolean;
  delayRemark: null;
  dateDelay: null;
  statusDelay: null;
  delayRejectRemark: null;
  purposeSpray: CropPurposeSprayEntity;
  farmer: FarmerEntity;
  droner: DronerEntity;
  farmerPlot: FarmerPlotEntity;
  taskDronerTemp: TaskDronerTempEntity;
}
export const TaskDetailEntity_INIT: TaskDetailEntity = {
  id: "",
  taskNo: "",
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  purposeSprayId: "",
  dateAppointment: "",
  targetSpray: [""],
  preparationBy: "",
  createdAt: "",
  updatedAt: "",
  createBy: "",
  updateBy: null,
  distance: "",
  status: "",
  statusRemark: "",
  reviewDronerAvg: null,
  reviewDronerDetail: null,
  unitPriceStandard: "",
  priceStandard: "",
  unitPrice: "",
  price: "",
  totalPrice: "",
  fee: "",
  discountFee: "",
  reviewFarmerScore: null,
  reviewFarmerComment: null,
  imagePathFinishTask: null,
  comment: "",
  isProblem: true,
  problemRemark: null,
  isDelay: true,
  delayRemark: null,
  dateDelay: null,
  statusDelay: null,
  delayRejectRemark: null,
  purposeSpray: CropPurposeSprayEntity_INIT,
  farmer: FarmerEntity_INIT,
  droner: DronerEntity_INIT,
  farmerPlot: FarmerPlotEntity_INIT,
  taskDronerTemp: TaskDronerTempEntity_INIT,
};
export interface UpdateTask {
  id: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  dateAppointment: string;
  targetSpray: [string];
  preparationBy: string;
  purposeSprayId: string;
  status: string;
  statusRemark: string;
  updateBy: string;
  unitPriceStandard: string;
  priceStandard: string;
  unitPrice: string;
  price: string;
  comment: string;
  isProblem: boolean;
  problemRemark: string;
  isDelay: boolean;
  delayRemark: string;
  dateDelay: string;
}
export const  UpdateTask_INIT : UpdateTask =  {
  id: "",
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  dateAppointment: "",
  targetSpray: [""],
  preparationBy: "",
  purposeSprayId: "",
  status: "",
  statusRemark: "",
  updateBy: "",
  unitPriceStandard: "",
  priceStandard: "",
  unitPrice: "",
  price: "",
  comment: "",
  isProblem: false,
  problemRemark: "",
  isDelay: false,
  delayRemark: "",
  dateDelay: "",
}
