export interface PurposeSprayEntity {
  id: string
  cropId: string
  purposeSprayName: string
}
export const PurposeSprayEntity_INIT: PurposeSprayEntity = {
  id: '',
  cropId: '',
  purposeSprayName: '',
}

export interface CropPurposeSprayEntity {
  id: string
  cropName: string
  purposeSpray: PurposeSprayEntity[]
  purposeSprayName: string
}
export const CropPurposeSprayEntity_INT: CropPurposeSprayEntity = {
  id: '',
  cropName: '',
  purposeSpray: [PurposeSprayEntity_INIT],
  purposeSprayName: '',
}
export interface CropListEntity {
  cropId: string
  cropName: string
  isActive: boolean
  maxPrice: string
  minPrice: string
  maxPriceSow: string
  minPriceSow: string
}
export interface AllCropListEntity {
  data: CropListEntity[]
  count: number
}
