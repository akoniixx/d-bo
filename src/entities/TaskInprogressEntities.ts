import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
import { FarmerEntity, FarmerEntity_INIT } from "./FarmerEntities";
import {
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from "./TaskDronerTemp";
import {
  CropPurposeSprayEntity,
  CropPurposeSprayEntity_INT,
} from "./CropEntities";
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
      task_id: string;
      task_task_no: string;
      task_farmer_id:string;
      task_farmer_plot_id: string;
      task_farm_area_amount: string;
      task_droner_id: string;
      task_purpose_spray_id: string;
      task_date_appointment: string;
      task_target_spray: string[];
      task_preparation_by: string;
      task_created_at: string;
      task_updated_at: string;
      task_create_by: string;
      task_update_by:string;
      task_distance: string;
      task_status:string;
      task_status_remark: string;
      task_review_droner_avg: string;
      task_review_droner_detail: string;
      task_unit_price_standard: string;
      task_price_standard: string;
      task_unit_price: string;
      task_price: string;
      task_total_price: string;
      task_fee: string;
      task_discount_fee: string;
      task_review_farmer_score: string;
      task_review_farmer_comment: string;
      task_image_path_finish_task: string;
      task_comment: string;
      task_is_problem: boolean;
      task_problem_remark: string;
      task_is_delay: boolean;
      task_delay_remark: string;
      task_date_delay: string;
      task_status_delay: string;
      task_delay_reject_remark: string;
      farmer_id: string;
      farmer_pin: string;
      farmer_farmer_code: string;
      farmer_firstname: string;
      farmer_lastname: string;
      farmer_id_no: string;
      farmer_telephone_no: string;
      farmer_status:string;
      farmer_reason: string;
      farmer_birth_date: string;
      farmer_address_id: string;
      farmer_created_at: string;
      farmer_updated_at:string;
      farmerPlot_id:string;
      farmerPlot_plot_name: string;
      farmerPlot_rai_amount: string;
      farmerPlot_landmark: string;
      farmerPlot_plant_name: string;
      farmerPlot_plant_nature: string;
      farmerPlot_map_url: string;
      farmerPlot_lat: string;
      farmerPlot_long: string;
      farmerPlot_location_name: string;
      farmerPlot_farmer_id: string;
      farmerPlot_plot_area_id: number;
      farmerPlot_created_at:string;
      farmerPlot_updated_at: string;
      farmerPlot_is_active: true;
      farmerPlot_is_delete: false;
      plotArea_subdistrict_id: number;
      plotArea_subdistrict_name: string;
      plotArea_district_id: number;
      plotArea_district_name: string;
      plotArea_province_id: number;
      plotArea_province_name: string;
      plotArea_lat: string;
      plotArea_long: string;
      plotArea_postcode: string;
      droner_id: string;
      droner_pin: string;
      droner_droner_code: string;
      droner_firstname: string;
      droner_lastname: string;
      droner_id_no: string;
      droner_telephone_no: string;
      droner_status: string;
      droner_reason: string;
      droner_birth_date: string;
      droner_is_open_receive_task: boolean;
      droner_exp_year: string;
      droner_exp_month: string;
      droner_exp_plant: string;
      droner_address_id: string;
      droner_droner_area_id: string;
      droner_created_at: string;
      droner_updated_at: string;
      count_change_droner: string;
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
      task_id: "",
      task_task_no: "",
      task_farmer_id:"",
      task_farmer_plot_id: "",
      task_farm_area_amount: "",
      task_droner_id: "",
      task_purpose_spray_id: "",
      task_date_appointment: "",
      task_target_spray: [""],
      task_preparation_by: "",
      task_created_at: "",
      task_updated_at: "",
      task_create_by: "",
      task_update_by:"",
      task_distance: "",
      task_status:"",
      task_status_remark: "",
      task_review_droner_avg: "",
      task_review_droner_detail: "",
      task_unit_price_standard: "",
      task_price_standard: "",
      task_unit_price: "",
      task_price: "",
      task_total_price: "",
      task_fee: "",
      task_discount_fee: "",
      task_review_farmer_score: "",
      task_review_farmer_comment: "",
      task_image_path_finish_task: "",
      task_comment: "",
      task_is_problem: false,
      task_problem_remark: "",
      task_is_delay: false,
      task_delay_remark: "",
      task_date_delay: "",
      task_status_delay: "",
      task_delay_reject_remark: "",
      farmer_id: "",
      farmer_pin: "",
      farmer_farmer_code: "",
      farmer_firstname: "",
      farmer_lastname: "",
      farmer_id_no: "",
      farmer_telephone_no: "",
      farmer_status:"",
      farmer_reason: "",
      farmer_birth_date: "",
      farmer_address_id: "",
      farmer_created_at: "",
      farmer_updated_at:"",
      farmerPlot_id:"",
      farmerPlot_plot_name: "",
      farmerPlot_rai_amount: "",
      farmerPlot_landmark: "",
      farmerPlot_plant_name: "",
      farmerPlot_plant_nature: "",
      farmerPlot_map_url: "",
      farmerPlot_lat: "",
      farmerPlot_long: "",
      farmerPlot_location_name: "",
      farmerPlot_farmer_id: "",
      farmerPlot_plot_area_id: 0,
      farmerPlot_created_at:"",
      farmerPlot_updated_at: "",
      farmerPlot_is_active: true,
      farmerPlot_is_delete: false,
      plotArea_subdistrict_id: 0,
      plotArea_subdistrict_name: "",
      plotArea_district_id: 0,
      plotArea_district_name: "",
      plotArea_province_id: 0,
      plotArea_province_name: "",
      plotArea_lat: "",
      plotArea_long: "",
      plotArea_postcode: "",
      droner_id: "",
      droner_pin: "",
      droner_droner_code: "",
      droner_firstname: "",
      droner_lastname: "",
      droner_id_no: "",
      droner_telephone_no: "",
      droner_status: "",
      droner_reason: "",
      droner_birth_date: "",
      droner_is_open_receive_task: false,
      droner_exp_year: "",
      droner_exp_month: "",
      droner_exp_plant: "",
      droner_address_id: "",
      droner_droner_area_id: "",
      droner_created_at: "",
      droner_updated_at: "",
      count_change_droner: "",
    }
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
  updateBy: string;
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
  problemRemark: string;
  isDelay: boolean;
  delayRemark: null;
  dateDelay: null;
  statusDelay: null;
  delayRejectRemark: string;
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
  updateBy: "",
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
  isProblem: false,
  problemRemark: "",
  isDelay: false,
  delayRemark: null,
  dateDelay: null,
  statusDelay: null,
  delayRejectRemark: "",
  purposeSpray: CropPurposeSprayEntity_INT,
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
export const UpdateTask_INIT: UpdateTask = {
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
};