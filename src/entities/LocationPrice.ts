import { ProvinceEntity, ProvinceEntity_INIT } from './LocationEntities'

export interface LocationPriceEntity {
  createdAt: string
  cropId: string
  cropName: string
  id: string
  price: string
  priceSow: string
  province: ProvinceEntity
  provinceId: number
  updateBy: string
  updatedAt: string
}
export const LocationPriceEntity_INIT: LocationPriceEntity = {
  createdAt: '',
  cropId: '',
  cropName: '',
  id: '',
  price: '',
  priceSow: '',
  province: ProvinceEntity_INIT,
  provinceId: 0,
  updateBy: '',
  updatedAt: '',
}
export interface PricePlantsEntity {
  id: string
  price: number
  plant_name: string
}
export const PricePlantsEntity_INIT: PricePlantsEntity = {
  id: '',
  price: 0,
  plant_name: '',
}
export interface AllLocatePriceEntity {
  province_id: string
  province_name: string
  count_district: number
  count_subdistrict: number
  max_price: number
  min_price: number
  update_at: string
  plants: [PricePlantsEntity]
}
export const AllLocatePriceEntity_INIT: AllLocatePriceEntity = {
  province_id: '',
  province_name: '',
  count_district: 0,
  count_subdistrict: 0,
  max_price: 0,
  min_price: 0,
  update_at: '',
  plants: [PricePlantsEntity_INIT],
}

export interface LocationPricePageEntity {
  data: AllLocatePriceEntity[]
  count: number
}

export interface UpdateLocationPriceList {
  location_price_id: string
  price: number
  priceSow: number
}
export const UpdateLocationPriceList_INIT: UpdateLocationPriceList = {
  location_price_id: '',
  price: 0,
  priceSow: 0,
}
export interface UpdateLocationPrice {
  priceData: UpdateLocationPriceList[]
}
export const UpdateLocationPrice_INIT: UpdateLocationPrice = {
  priceData: [UpdateLocationPriceList_INIT],
}
export interface EqualPriceEntities {
  provinceId: number
  price: number
  priceSow: number
  updateBy: string
}
export const EqualPriceEntities_INIT: EqualPriceEntities = {
  provinceId: 0,
  price: 0,
  priceSow: 0,
  updateBy: '',
}
