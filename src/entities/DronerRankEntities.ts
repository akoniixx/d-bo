import { FullAddressEntiry_INIT, FullAddressEntity } from "./AddressEntities";
import { taskEntity, taskEntity_INIT } from "./TaskEnities";

export interface AllDronerRankEntity {
  droner_id: null;
  droner_pin: null;
  droner_droner_code: string;
  droner_firstname: string;
  droner_lastname: string;
  droner_id_no: string;
  droner_telephone_no: string;
  droner_status: string;
  droner_reason: null;
  droner_exp_year: 0;
  droner_exp_month: 0;
  droner_exp_plant: string[];
  droner_address_id: string;
  droner_droner_area_id: string;
  droner_created_at: string;
  droner_updated_at: string;
  address_id: string;
  address_address_1: string;
  address_address_2: string;
  address_address_3: string;
  address_province_id: number;
  address_district_id: number;
  address_subdistrict_id: number;
  address_postcode: number;
  address_created_at: string;
  address_updated_at: string;
  province_province_id: number;
  province_province_name: number;
  province_region: string;
  district_district_id: number;
  district_district_name: string;
  district_province_id: number;
  district_province_name: string;
  subdistrict_subdistrict_id: number;
  subdistrict_subdistrict_name: string;
  subdistrict_district_id: number;
  subdistrict_district_name: string;
  subdistrict_province_id: number;
  subdistrict_province_name: string;
  subdistrict_lat: string;
  subdistrict_long: string;
  subdistrict_postcode: string;
  avgrating: null;
  totalTaskCount: number;
  totalRaiCount: number;
}
export const AllDronerRankEntity_INIT: AllDronerRankEntity = {
  droner_id: null,
  droner_pin: null,
  droner_droner_code: "",
  droner_firstname: "",
  droner_lastname: "",
  droner_id_no: "",
  droner_telephone_no: "",
  droner_status: "",
  droner_reason: null,
  droner_exp_year: 0,
  droner_exp_month: 0,
  droner_exp_plant: [],
  droner_address_id: "",
  droner_droner_area_id: "",
  droner_created_at: "",
  droner_updated_at: "",
  address_id: "",
  address_address_1: "",
  address_address_2: "",
  address_address_3: "",
  address_province_id: 0,
  address_district_id: 0,
  address_subdistrict_id: 0,
  address_postcode: 0,
  address_created_at: "",
  address_updated_at: "",
  province_province_id: 0,
  province_province_name: 0,
  province_region: "",
  district_district_id: 0,
  district_district_name: "",
  district_province_id: 0,
  district_province_name: "",
  subdistrict_subdistrict_id: 0,
  subdistrict_subdistrict_name: "",
  subdistrict_district_id: 0,
  subdistrict_district_name: "",
  subdistrict_province_id: 0,
  subdistrict_province_name: "",
  subdistrict_lat: "",
  subdistrict_long: "",
  subdistrict_postcode: "",
  avgrating: null,
  totalTaskCount: 0,
  totalRaiCount: 0,
};
export interface DronerRankDetailEntity {
  id: string;
  dronerCode: null;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  reason: null;
  expYear: 0;
  expMonth: 0;
  expPlant: string[];
  addressId: string;
  dronerAreaId: string;
  createdAt: string;
  updatedAt: string;
  address: FullAddressEntity;
  task: taskEntity[];
  avgrating: string;
  totalTaskCount: string;
  totalRaiCount: string;
}
export const  DronerRankDetailEntity_INIT: DronerRankDetailEntity = {
  id: "",
  dronerCode: null,
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  reason: null,
  expYear: 0,
  expMonth: 0,
  expPlant: [],
  addressId: "",
  dronerAreaId: "",
  createdAt: "",
  updatedAt: "",
  address: FullAddressEntiry_INIT,
  task: [taskEntity_INIT],
  avgrating: "",
  totalTaskCount: "",
  totalRaiCount: "",

}
export interface DronerRankListEntity {
  data: AllDronerRankEntity[];
  count: number;
}
