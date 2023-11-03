import { Moment } from 'moment'
import {
  FullAddressEntity,
  FullAddressEntiry_INIT,
  CreateAddressEntity,
  CreateAddressEntity_INIT,
  AddressEntity,
  AddressEntity_INIT,
} from './AddressEntities'
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from './FarmerPlotEntities'
import { ImageEntity, ImageEntity_INTI } from './UploadImageEntities'

export interface summaryFarmerEntity {
  count_active: string
  count_inactive: string
  count_pending: string
  count_reject: string
}
export interface FarmerEntity {
  id: string
  firstname: string
  lastname: string
  nickname: string
  idNo: string
  telephoneNo: string
  status: string
  addressId: string
  createdAt: string
  updatedAt: string
  address: FullAddressEntity
  farmerPlot: FarmerPlotEntity[]
  applicationType: string
  dateWaitPending: string
  totalPlotCount: number
  totalRaiCount: number
}
export const FarmerEntity_INIT: FarmerEntity = {
  id: '',
  firstname: '',
  lastname: '',
  nickname: '',
  idNo: '',
  telephoneNo: '',
  status: '',
  addressId: '',
  createdAt: '',
  updatedAt: '',
  address: FullAddressEntiry_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
  applicationType: '',
  dateWaitPending: '',
  totalPlotCount: 0,
  totalRaiCount: 0,
}

export interface GetFarmerEntity {
  id: string
  farmerCode: string
  firstname: string
  lastname: string
  nickname: string
  idNo: string
  telephoneNo: string
  status: string
  reason: string
  birthDate: string | Moment
  address: AddressEntity
  addressId: string
  farmerPlot: FarmerPlotEntity[]
  file: ImageEntity[]
  createdAt?: string
  createBy?: string
  comment?: string
}
export const GetFarmerEntity_INIT: GetFarmerEntity = {
  id: '',
  farmerCode: '',
  firstname: '',
  lastname: '',
  nickname: '',
  idNo: '',
  telephoneNo: '',
  status: '',
  reason: '',
  birthDate: '',
  address: AddressEntity_INIT,
  addressId: '',
  farmerPlot: [FarmerPlotEntity_INIT],
  file: [ImageEntity_INTI],
  comment: '',
}

export interface FarmerPageEntity {
  data: FarmerEntity[]
  count: number
  summary: summaryFarmerEntity[]
}

export interface CreateFarmerEntity {
  firstname: string
  lastname: string
  idNo: string
  telephoneNo: string
  status: string
  birthDate: string
  address: CreateAddressEntity
  farmerPlot: FarmerPlotEntity[]
  comment?: string
}
export const CreateFarmerEntity_INIT: CreateFarmerEntity = {
  firstname: '',
  lastname: '',
  idNo: '',
  telephoneNo: '',
  status: 'PENDING',
  birthDate: '',
  address: CreateAddressEntity_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
}
