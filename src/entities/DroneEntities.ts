import { ImageEntity, ImageEntity_INTI } from './UploadImageEntities'
import { DroneBrandEntity, DroneBrandEntity_INIT } from './DroneBrandEntities'

export interface DroneEntity {
  id: string
  droneBrandId: string
  series: string
  droneBrand: DroneBrandEntity
  file: ImageEntity[]
  dronerDrone: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  droneId: number
  droneAbility: string[]
}

export const DroneEntity_INIT: DroneEntity = {
  id: '',
  droneBrandId: '',
  series: '',
  droneBrand: DroneBrandEntity_INIT,
  file: [ImageEntity_INTI],
  dronerDrone: 0,
  isActive: true,
  createdAt: '',
  updatedAt: '',
  droneId: 0,
  droneAbility: [''],
}

export interface DroneListEntity {
  data: DroneEntity[]
  count: number
}
