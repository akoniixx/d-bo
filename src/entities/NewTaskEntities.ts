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
  dronerId: string;
  dateAppointment: string;
  targetSpray: string[];
  preparationBy: string;
  purposeSprayId: string;
  taskDronerTemp: CreateDronerTempEntity[];
  status: string;
  statusRemark: string;
  createBy: string;
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
  status: "OPEN",
  statusRemark: "",
  createBy: "",
};
