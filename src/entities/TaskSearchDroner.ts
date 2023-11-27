export interface TaskSearchDroner {
  droner_id: string
  firstname: string
  lastname: string
  telephone_no: string
  subdistrict_name: string
  district_name: string
  province_name: string
  drone_brand: string
  logo_drone_brand: string
  count_drone: string
  total_task: string
  total_area: string
  rating_avg: string
  count_rating: string
  last_review_avg: string
  distance: number
  droner_status: string
  isChecked: boolean
  droner_code: string
  is_open_receive_task: boolean
}
export const TaskSearchDroner_INIT: TaskSearchDroner = {
  droner_id: '',
  firstname: '',
  lastname: '',
  telephone_no: '',
  subdistrict_name: '',
  district_name: '',
  province_name: '',
  drone_brand: '',
  logo_drone_brand: '',
  count_drone: '',
  total_task: '',
  total_area: '',
  rating_avg: '',
  count_rating: '',
  last_review_avg: '',
  distance: 0,
  droner_status: '',
  isChecked: false,
  droner_code: '',
  is_open_receive_task: false,
}
