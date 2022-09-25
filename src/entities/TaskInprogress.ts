import { DronerAreaEntity } from "./DronerAreaEntities";
import { DronerDroneEntity, DronerEntity } from "./DronerDroneEntities";
import { FarmerEntity } from "./FarmerEntities";
import { FarmerPlotEntity } from "./FarmerPlotEntities";
import { TaskDronerTempEntity } from "./TaskDronerTemp";

export interface TaskInprogressEntity {
  id: string;
  taskNo: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  purposeSprayId: string;
  dateAppointment: string;
  tragetSpray: string[];
  preparationBy: string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: string;
  distrance: string;
  status: string;
  statusRemark: string;
  reviewDronerAvg: string;
  reviewPriceStandard: string;
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
  statusDelay: string;
  delayRejectRemark: string;
  farmer: FarmerEntity;
}
export interface TaskInprogressPageEntity {
  count: number;
  data: TaskInprogressEntity[];
}

export interface GetTaskInprogressEntity extends TaskInprogressEntity {
  droner: DronerEntity;
  dronerArea: DronerAreaEntity;
  dronerDrone: DronerDroneEntity[];
  farmerPlot: FarmerPlotEntity;
  taskDronerTemp: TaskDronerTempEntity[];
  taskHistory: [];
}
