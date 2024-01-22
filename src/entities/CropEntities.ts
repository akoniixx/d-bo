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

//master data crop entities
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
export interface PurposeCropEntities {
  cropId: string
  id: string
  purposeSprayName: string
  periodMin: string
  periodMax: string
  isSpray: boolean
  isSow: boolean
  orderPurpose: number
}
export const PurposeCropEntities_INIT: PurposeCropEntities = {
  cropId: '',
  id: '',
  purposeSprayName: '',
  periodMin: '',
  periodMax: '',
  isSpray: false,
  isSow: false,
  orderPurpose: 1,
}

export interface CreateCropEntity {
  cropName: string
  purposeSpray: PurposeCropEntities[]
}
export const CreateCropEntity_INIT: CreateCropEntity = {
  cropName: '',
  purposeSpray: [PurposeCropEntities_INIT],
}
export interface DataInsertCropEntity {
  cropName: string
  purposeSpray: PurposeCropEntities[]
  orderCrop: number
  id: string
  isActive: boolean
}
