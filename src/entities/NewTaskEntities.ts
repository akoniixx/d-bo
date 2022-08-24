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
