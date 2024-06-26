import {
  ImageEntity,
  ImageEntity_INTI,
  UploadImageEntity,
  UploadImageEntity_INTI,
} from './UploadImageEntities'
import { DroneEntity, DroneEntity_INIT } from './DroneEntities'
import { FullAddressEntiry_INIT, FullAddressEntity } from './AddressEntities'
import { DronerAreaEntity, DronerAreaEntity_INIT } from './DronerAreaEntities'
import { summaryFarmerEntity } from './FarmerEntities'

export interface DronerDroneEntity {
  id?: string
  dronerId?: string
  droneId?: string
  serialNo: string
  status: string
  purchaseYear: string
  purchaseMonth: string
  drone: DroneEntity
  modalDroneIndex: number
  droneName?: string
  logoImagePath?: string
  createdAt?: string
  updatedAt?: string
  file: ImageEntity[]
  reason: string[]
  comment?: string
}
export const DronerDroneEntity_INIT: DronerDroneEntity = {
  id: '',
  dronerId: '',
  droneId: '',
  serialNo: '',
  status: '',
  purchaseYear: '',
  purchaseMonth: '',
  drone: DroneEntity_INIT,
  modalDroneIndex: 0,
  droneName: '',
  logoImagePath: '',
  createdAt: '',
  updatedAt: '',
  file: [ImageEntity_INTI],
  reason: [''],
  comment: '',
}

export interface DronerEntity {
  id: string
  dronerCode: string
  firstname: string
  lastname: string
  nickname: string
  idNo: string
  telephoneNo: string
  status: string
  expYear: number
  expMonth: number
  expPlant: string[]
  address: FullAddressEntity
  pin: string
  dronerDrone: DronerDroneEntity[]
  dronerArea: DronerAreaEntity
  file: ImageEntity[]
  isBookBank: boolean
  bankName: string
  bankAccountName: string
  accountNumber: string
  isConsentBookBank: boolean
  createdAt: string
  updatedAt: string
  totalDroneCount: number
  distance?: number
  isDelete: boolean
}
export const DronerEntity_INIT: DronerEntity = {
  id: '',
  dronerCode: '',
  firstname: '',
  lastname: '',
  nickname: '',
  idNo: '',
  telephoneNo: '',
  status: '',
  expYear: 0,
  expMonth: 0,
  expPlant: [''],
  address: FullAddressEntiry_INIT,
  pin: '',
  dronerDrone: [DronerDroneEntity_INIT],
  dronerArea: DronerAreaEntity_INIT,
  file: [ImageEntity_INTI],
  isBookBank: false,
  bankName: '',
  bankAccountName: '',
  accountNumber: '',
  isConsentBookBank: false,
  createdAt: '',
  updatedAt: '',
  totalDroneCount: 0,
  distance: 0,
  isDelete: false,
}
export interface GetDronerDroneEntity {
  id: string
  dronerId: string
  droneId: string
  serialNo: string
  status: string
  purchaseYear: string
  purchaseMonth: string
  reason: string[]
  drone: DroneEntity
  droner: DronerEntity
  file: ImageEntity[]
  createdAt: string
  updatedAt: string
  comment?: string
  dateWaitPending: string
}
export const GetDronerDroneEntity_INIT: GetDronerDroneEntity = {
  id: '',
  dronerId: '',
  droneId: '',
  serialNo: '',
  status: '',
  purchaseYear: '',
  purchaseMonth: '',
  reason: [],
  drone: DroneEntity_INIT,
  droner: DronerEntity_INIT,
  file: [ImageEntity_INTI],
  createdAt: '',
  updatedAt: '',
  dateWaitPending: '',
}
export interface DronerDroneListEntity {
  data: GetDronerDroneEntity[]
  count: number
  summary: summaryFarmerEntity[]
}
