import { string } from "yup/lib/locale";
import { DronerAreaEntity, DronerAreaEntity_INIT } from "./DronerAreaEntities";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
  DronerEntity,
  DronerEntity_INIT,
} from "./DronerDroneEntities";
import { FarmerEntity, FarmerEntity_INIT } from "./FarmerEntities";
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";
import {
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from "./TaskDronerTemp";

export interface GetTaskInprogressEntity {
  id: string;
  couponId: string;
  discountCoupon: string;
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
  droner: DronerEntity;
  dronerArea: DronerAreaEntity;
  dronerDrone: DronerDroneEntity[];
  farmerPlot: FarmerPlotEntity;
  taskDronerTemp: TaskDronerTempEntity[];
  taskHistory: [];
  discountPromotion: string;
  revenuePromotion: string;
  discountCampaignPoint: string;
  usePoint: string;
}
export interface TaskInprogressEntity {
  task_id: string;
  task_task_no: string;
  task_farmer_id: string;
  task_farmer_plot_id: string;
  task_farm_area_amount: string;
  task_droner_id: string;
  task_purpose_spray_id: string;
  task_date_appointment: string;
  task_traget_spray: string[];
  task_preparation_by: string;
  task_created_at: string;
  task_updated_at: string;
  task_create_by: string;
  task_update_by: string;
  task_distrance: string;
  task_status: string;
  task_status_remark: string;
  task_review_droner_avg: string;
  task_review_price_standard: string;
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
  task_status_delay: string;
  task_delay_reject_remark: string;
  farmer_id: string;
  farmer_pin: string;
  farmer_farmer_code: string;
  farmer_firstname: string;
  farmer_lastname: string;
  farmer_id_no: string;
  farmer_telephone_no: string;
  farmer_status: string;
  farmer_reason: string;
  farmer_birth_date: string;
  farmer_address_id: string;
  farmer_created_at: string;
  farmer_updated_at: string;
  farmerPlot_id: string;
  farmerPlot_plot_name: string;
  farmerPlot_rai_amount: string;
  farmerPlot_landmark: string;
  farmerPlot_plant_name: string;
  farmerPlot_plant_nature: string;
  farmerPlot_map_url: string;
  farmerPlot_lat: string;
  farmerPlot_lang: string;
  farmerPlot_location_name: string;
  farmerPlot_farmer_id: string;
  farmerPlot_plot_area_id: string;
  farmerPlot_created_at: string;
  farmerPlot_updated_at: string;
  farmerPlot_is_active: boolean;
  farmerPlot_is_delete: boolean;
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
  droner_is_open_receive_task: string;
  droner_exp_year: string;
  droner_exp_month: string;
  droner_exp_plant: string[];
  droner_address_id: string;
  droner_droner_area_id: string;
  droner_created_at: string;
  droner_updated_at: string;
  tasks_id: string;
  count_change_droner: string;
}
export interface TaskInprogressPageEntity {
  count: number;
  data: TaskInprogressEntity[];
}
export const GetTaskInprogressEntity_INIT: GetTaskInprogressEntity = {
  id: "",
  couponId: "",
  taskNo: "",
  discountCoupon: "",
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
  reviewDronerAvg: "",
  reviewPriceStandard: "",
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
  statusDelay: "",
  delayRejectRemark: "",
  farmer: FarmerEntity_INIT,
  droner: DronerEntity_INIT,
  dronerArea: DronerAreaEntity_INIT,
  dronerDrone: [DronerDroneEntity_INIT],
  farmerPlot: FarmerPlotEntity_INIT,
  taskDronerTemp: [TaskDronerTempEntity_INIT],
  taskHistory: [],
  discountPromotion: "",
  revenuePromotion: "",
  discountCampaignPoint: "",
  usePoint: "",
};
export interface UpdateInprogressTaskEntity {
  id: string;
  dronerId: string;
  distance: number;
  dateAppointment: string;
  purposeSprayId: string;
  targetSpray: string[];
  preparationBy: string;
  comment: string;
  status: string;
  isProblem: boolean;
  updateBy: string;
  problemRemark: string;
  statusRemark: string;
  farmerPlotId: string;
}
export const UpdateInprogressTaskEntity_INIT: UpdateInprogressTaskEntity = {
  id: "",
  dronerId: "",
  distance: 0,
  dateAppointment: "",
  purposeSprayId: "",
  targetSpray: [""],
  preparationBy: "",
  comment: "",
  status: "",
  isProblem: false,
  updateBy: "",
  problemRemark: "",
  statusRemark: "",
  farmerPlotId: "",
};
