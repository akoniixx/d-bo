export interface ProviceEntity {
  provinceId: number
  provinceName: string
  region: string
}
export const ProvinceEntity_INIT: ProviceEntity = {
  provinceId: 0,
  provinceName: '',
  region: '',
}

export interface DistrictEntity {
  districtId: number
  districtName: string
  provinceId: number
  provinceName: string
}
export const DistrictEntity_INIT: DistrictEntity = {
  districtId: 0,
  districtName: '',
  provinceId: 0,
  provinceName: '',
}

export interface SubdistrictEntity {
  subdistrictId: number
  subdistrictName: string
  districtId: number
  districtName: string
  provinceId: number
  provinceName: string
  lat: string
  long: string
  postcode: string
}
export const SubdistrictEntity_INIT: SubdistrictEntity = {
  subdistrictId: 0,
  subdistrictName: '',
  districtId: 0,
  districtName: '',
  provinceId: 0,
  provinceName: '',
  lat: '',
  long: '',
  postcode: '',
}
