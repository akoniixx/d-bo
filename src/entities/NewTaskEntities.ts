import { CropPurposeSprayEntity } from "./CropEntities";
import { GetFarmerEntity } from "./FarmerEntities";
import {
  CreateDronerTempEntity,
  CreateDronerTempEntity_INIT,
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
    purposeSpray: CropPurposeSprayEntity;
    farmer: GetFarmerEntity;
    droner:string;
    farmerPlot:{
      
    }
  };
}
