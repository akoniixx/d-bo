import { DroneEntity, DroneEntity_INIT } from './DroneEntities'
export interface fileEntity {
  id: string
  fileName: string
  fileType: string
  resource: string
  category: string
  path: string
}
export const fileEntity_INIT: fileEntity = {
  id: '',
  fileName: '',
  fileType: '',
  resource: '',
  category: '',
  path: '',
}
export interface UpdateDroneEntity {
  droneBrandId: string
  series: string
  isActive: boolean
  id: string
}

export const UpdateDroneEntity_INIT: UpdateDroneEntity = {
  droneBrandId: '',
  series: '',
  isActive: true,
  id: '',
}
export interface DroneBrandEntity {
  id: string
  name: string
  logoImagePath: string
  drone: number
  file: fileEntity[]
  droneCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
export const DroneBrandEntity_INIT: DroneBrandEntity = {
  id: '',
  name: '',
  logoImagePath: '',
  drone: 0,
  file: [fileEntity_INIT],
  droneCount: 0,
  isActive: true,
  createdAt: '',
  updatedAt: '',
}
export interface CreateDroneEntity {
  id?: string
  droneBrandId?: string
  droneId: number
  series: string
  isActive: boolean
}
export const CreateDroneEntity_INIT: CreateDroneEntity = {
  id: '',
  droneBrandId: '',
  droneId: 0,
  series: '',
  isActive: true,
}
export interface CreateDroneBrandEntity {
  id?: string
  droneBrandId?: number
  name: string
  logoImagePath: string
  isActive: boolean
  drone: CreateDroneEntity[]
}
export const CreateDroneBrandEntity_INIT: CreateDroneBrandEntity = {
  id: '',
  droneBrandId: 0,
  name: '',
  logoImagePath: '',
  isActive: true,
  drone: [CreateDroneEntity_INIT],
}
export interface DroneBrandListEntity {
  data: DroneBrandEntity[]
  count: number
}
export const DroneBrandListEntity_INIT: DroneBrandListEntity = {
  data: [DroneBrandEntity_INIT],
  count: 0,
}
export interface UpdateDroneBrand {
  name: string
  logoImagePath: string
  isActive: boolean
  id: string
  drone: [UpdateDroneEntity]
}
