import { DronerEntity } from './DronerEntities'

export interface DronerFinityEntity {
  id: string
  dronerId: string
  credit: number
  pointCredit: number
  cashcredit: number
  drugAmount: number
  fertilizerAmount: number
  status: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  pathImage: string
  droner: DronerEntity
  point: number
}
export interface AllDronerFinityEntity {
  data: DronerFinityEntity[]
  count: number
  summary: {
    countactive: string
    countcanceled: string
  }
}
export interface SearchDronerEntity {
  count: number
  data: [
    {
      id: string
      dronerCode: string
      firstname: string
      lastname: string
      nickname: string
      telephoneNo: string
    },
  ]
}
export interface SearchDronerByIdEntity {
  dronerId: string
  firstname: string
  lastname: string
  nickname: string
  telephoneNo: string
  ratingAvg: string
  address1: string
  address2: string
  address3: string
  postcode: string
  provinceName: string
  districtName: string
  subdistrictName: string
  totalTaskCount: string
  totalRaiCount: string
  point: number
}
export const SearchDronerByIdEntity_INIT: SearchDronerByIdEntity = {
  dronerId: '',
  firstname: '',
  lastname: '',
  nickname: '',
  telephoneNo: '',
  ratingAvg: '',
  address1: '',
  address2: '',
  address3: '',
  postcode: '',
  provinceName: '',
  districtName: '',
  subdistrictName: '',
  totalTaskCount: '',
  totalRaiCount: '',
  point: 0,
}

export interface updateFile {
  dronerId: string
  updatedBy: string
  file: any
}
export const updateFile_INIT: updateFile = {
  dronerId: '',
  updatedBy: '',
  file: '',
}
export interface updateStatus {
  id: string
  updatedBy: string
  status: string
}
export const updateStatus_INIT: updateStatus = {
  id: '',
  updatedBy: '',
  status: '',
}
