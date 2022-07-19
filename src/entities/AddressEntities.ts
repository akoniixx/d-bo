import { SubdistrictEntity, SubdistrictEntity_INIT } from './LocationEntities';
export interface AddressEntity {
  id: string;
  address1: string;
  address2: string;
  address3: string;
  provinceId: 0;
  districtId: 0;
  subdistrictId: 0;
  postcode: string;
}
export const AddressEntity_INIT: AddressEntity = {
  id: "",
  address1: "",
  address2: "",
  address3: "",
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  postcode: "",
};

export interface AddrSubDisEntity  {
  // id: string;
  address1: string;
  address2: string;
  address3: string;
  provinceId: 0;
  districtId: 0;
  subdistrictId: 0;
  postcode: string;
  // subdistrict: SubdistrictEntity
}
export const AddrSubDisEntity_INIT:  AddrSubDisEntity = {
  // id: "",
  address1: "",
  address2: "",
  address3: "",
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  postcode: "",
  // subdistrict: SubdistrictEntity_INIT
}
