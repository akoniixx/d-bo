export interface address {
  districtId: number
  districtName: string
  masterAddressId: string
  postcode: string
  provinceId: number
  provinceName: string
  subdistrictId: number
  subdistrictName: string
}
export interface shopFiles {
  createDate: string
  filePath: string
  fileSize: string
  onefinityShopFileId: string
  shopId: string
  updateDate: string
  fileName: string
}

export interface shopOneFinityEntity {
  address: address
  shopNo: string
  addressDesc: string
  createBy: string
  createDate: string
  email: string
  firstname: string
  isActive: string
  lastname: string
  latitude: string
  longitude: string
  masterAddressId: string
  nickname: string
  postcode: string
  shopId: string
  shopName: string
  taxNo: string
  telephoneFirst: string
  title: string
  updateBy: string
  updateDate: string
  shopFiles: shopFiles[]
}

export interface AllshopOneFinityEntity {
  data: shopOneFinityEntity[]
  count: number
}
