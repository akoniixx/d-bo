import {
  CropPurposeSprayEntity,
  CropPurposeSprayEntity_INT,
} from "./CropEntities";
import { GetFarmerEntity, GetFarmerEntity_INIT } from "./FarmerEntities";
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";
import {
  CreateDronerTempEntity,
  CreateDronerTempEntity_INIT,
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from "./TaskDronerTemp";

export interface NewTaskEntity {
  id: string;
  farmer_plot_id: string;
  task_no: string;
  total_price: string;
  farm_area_amount: string;
  firstname: string;
  lastname: string;
  telephone_no: string;
  date_appointment: string;
  create_by: string;
  province_name: string;
  district_name: string;
  subdistrict_name: string;
  updatedat: string;
  createdat: string;
  status: string;
  task_status: string;
  count_droner: string;
}
export interface NewTaskPageEntity {
  data: NewTaskEntity[];
  count: number;
}
export interface CreateNewTaskEntity {
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId?: string;
  dateAppointment: string;
  targetSpray: string[];
  preparationBy: string;
  purposeSprayId: string;
  taskDronerTemp?: CreateDronerTempEntity[];
  status: string;
  statusRemark: string;
  createBy: string;
  unitPriceStandard: number;
  priceStandard: number;
  unitPrice: number;
  price: number;
  fee: number;
  discountFee: number;
  comment: string;
}
export const CreateNewTaskEntity_INIT: CreateNewTaskEntity = {
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  dateAppointment: "",
  targetSpray: [""],
  preparationBy: "",
  purposeSprayId: "",
  taskDronerTemp: [CreateDronerTempEntity_INIT],
  status: "",
  statusRemark: "",
  createBy: "",
  unitPriceStandard: 0,
  priceStandard: 0,
  unitPrice: 0,
  price: 0,
  fee: 0,
  discountFee: 0,
  comment: "",
};
export interface GetNewTaskEntity {
  data: {
    id: string;
    taskNo: string;
    farmerId: string;
    farmerPlotId: string;
    farmAreaAmount: string;
    dronerId: string;
    purposeSprayId: string;
    dateAppointment: string;
    targetSpray: string[];
    taskDronerTemp: TaskDronerTempEntity[];
    preparationBy: string;
    createdAt: string;
    updatedAt: string;
    distance: string;
    status: string;
    statusRemark: string;
    reviewDronerAvg: string;
    reviewDronerDetail: string;
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
    dateRemark: string;
    dateDelay: string;
    statusDelay: string;
    delayRejectRemark: string;
    purposeSpray: CropPurposeSprayEntity;
    farmer: GetFarmerEntity;
    droner: string;
    farmerPlot: FarmerPlotEntity;
  };
}
export const GetNewTaskEntity_INIT: GetNewTaskEntity = {
  data: {
    id: "",
    taskNo: "",
    farmerId: "",
    farmerPlotId: "",
    farmAreaAmount: "",
    dronerId: "",
    purposeSprayId: "",
    dateAppointment: "",
    targetSpray: [""],
    taskDronerTemp: [TaskDronerTempEntity_INIT],
    preparationBy: "",
    createdAt: "",
    updatedAt: "",
    distance: "",
    status: "",
    statusRemark: "",
    reviewDronerAvg: "",
    reviewDronerDetail: "",
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
    dateRemark: "",
    dateDelay: "",
    statusDelay: "",
    delayRejectRemark: "",
    purposeSpray: CropPurposeSprayEntity_INT,
    farmer: GetFarmerEntity_INIT,
    droner: "",
    farmerPlot: FarmerPlotEntity_INIT,
  },
};
