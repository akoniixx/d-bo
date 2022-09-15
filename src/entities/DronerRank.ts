import { FarmerEntity, FarmerEntity_INIT } from './FarmerEntities';
export interface taskByDronerEntity {
  id: string;
  taskNo: string;
  farmerId: string;
  farmerPlotId: string;
  farmAreaAmount: string;
  dronerId: string;
  purposeSprayId: null;
  dateAppointment: string;
  targetSpray: string;
  preparationBy:string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: string;
  distance: string;
  status: string;
  statusRemark: string;
  reviewDronerAvg:string;
  reviewDronerDetail: {
    avg: 0;
    taskId: string;
    comment: string;
    canReview: string;
    punctuality: string;
    pilotEtiquette: string;
    sprayExpertise: string;
  };
  unitPriceStandard: null;
  priceStandard: null;
  unitPrice: null;
  price: null;
  totalPrice: null;
  fee: null;
  discountFee: null;
  reviewFarmerScore: string;
  reviewFarmerComment: string;
  imagePathFinishTask: string;
  farmer: FarmerEntity; 
}
export const taskByDronerEntity_INIT: taskByDronerEntity = {
  id: "",
  taskNo: "",
  farmerId: "",
  farmerPlotId: "",
  farmAreaAmount: "",
  dronerId: "",
  purposeSprayId: null,
  dateAppointment: "",
  targetSpray: "",
  preparationBy:"",
  createdAt: "",
  updatedAt: "",
  createBy: "",
  updateBy: "",
  distance: "",
  status: "",
  statusRemark: "",
  reviewDronerAvg:"",
  reviewDronerDetail: {
    avg: 0,
    taskId: "",
    comment: "",
    canReview: "",
    punctuality: "",
    pilotEtiquette: "",
    sprayExpertise: "",
  },
  unitPriceStandard: null,
  priceStandard: null,
  unitPrice: null,
  price: null,
  totalPrice: null,
  fee: null,
  discountFee: null,
  reviewFarmerScore: "",
  reviewFarmerComment: "",
  imagePathFinishTask: "",
  farmer: FarmerEntity_INIT
}
