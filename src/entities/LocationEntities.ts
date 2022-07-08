export interface ProviceEntity {
  provinceId: number;
  provinceName: string;
  region: string;
}
export interface DistrictEntity {
  districtId: number;
  districtName: string;
  provinceId: number;
  provinceName: string;
}
export interface SubdistrictEntity {
  subdistrictId: number;
  subdistrictName: string;
  districtId: number;
  districtName: string;
  provinceId: number;
  provinceName: string;
  lat: string;
  long: string;
  postcode: string;
}
