import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProvinceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from './LocationEntities'

export interface AddressEntity {
  id: string
  address1: string
  address2: string
  address3: string
  provinceId: number
  districtId: number
  subdistrictId: number
  postcode: string
}
export const AddressEntity_INIT: AddressEntity = {
  id: '',
  address1: '',
  address2: '',
  address3: '',
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  postcode: '',
}

export interface FullAddressEntity {
  id: string
  address1: string
  address2: string
  address3: string
  provinceId: number
  districtId: number
  subdistrictId: number
  postcode: string
  district: DistrictEntity
  province: ProvinceEntity
  subdistrict: SubdistrictEntity
}

export const FullAddressEntiry_INIT: FullAddressEntity = {
  id: '',
  address1: '',
  address2: '',
  address3: '',
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  postcode: '',
  district: DistrictEntity_INIT,
  province: ProvinceEntity_INIT,
  subdistrict: SubdistrictEntity_INIT,
}

export interface CreateAddressEntity {
  address1: string
  address2: string
  address3: string
  provinceId: number
  districtId: number
  subdistrictId: number
  postcode: string
}
export const CreateAddressEntity_INIT: CreateAddressEntity = {
  address1: '',
  address2: '',
  address3: '',
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  postcode: '',
}
