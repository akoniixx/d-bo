export interface SpecialListEntities {
  id: string
  name: string
  campaignId: string
  description: string
  farmerCount: number
  farmerAmount: number
  dronerCount: number
  dronerAmount: number
  point: number
  createBy: string
  updateBy: string
  createAt: string
  updateAt: string
}
export const SpecialListEntities_INIT: SpecialListEntities = {
  id: '',
  name: '',
  campaignId: '',
  description: '',
  farmerCount: 0,
  farmerAmount: 0,
  dronerCount: 0,
  dronerAmount: 0,
  point: 0,
  createBy: '',
  updateBy: '',
  createAt: '',
  updateAt: '',
}
export interface AllSpecialListEntities {
  data: SpecialListEntities[]
  count: number
}

export interface InsertSpecialListEntities {
  id?: string
  name: string
  description: string
  createBy: string
  updateBy: string
}
export const InsertSpecialListEntities_INIT: InsertSpecialListEntities = {
  id: '',
  name: '',
  description: '',
  createBy: '',
  updateBy: '',
}

export interface DetailSpecialPointEntities {
  id: string
  name: string
  campaignId: string
  description: string
  farmerCount: number
  farmerAmount: number
  dronerCount: number
  dronerAmount: number
  point: number
  createBy: string
  updateBy: string
  createAt: string
  updateAt: string
}
export const DetailSpecialPointEntities_INIT: DetailSpecialPointEntities = {
  id: '',
  name: '',
  campaignId: '',
  description: '',
  farmerCount: 0,
  farmerAmount: 0,
  dronerCount: 0,
  dronerAmount: 0,
  point: 0,
  createBy: '',
  updateBy: '',
  createAt: '',
  updateAt: '',
}

export interface AllDetailSpecialPointEntities {
  data: DetailSpecialPointEntities[]
  count: number
  pending: number
  return: number
  success: number
}
export interface SpecialPointConditionEntity {
  id?: string
  num?: number
  farmer?: string | null
  droner?: string | null
  point: number
  taskNo?: string | null
  taskId?: string | null
  reason?: string | null
}

export const SpecialPointConditionEntity_INIT: SpecialPointConditionEntity = {
  id: '',
  num: 1,
  farmer: '',
  droner: '',
  point: 0,
  taskNo: '',
  taskId: '',
  reason: '',
}
export interface InsertDetailSpecialPointEntities {
  id?: string
  isDroner: boolean
  specialPointId: string
  createBy: string
  updateBy: string
  specialPointList: SpecialPointConditionEntity[]
}
export const InsertDetailSpecialPointEntities_INIT: InsertDetailSpecialPointEntities = {
  id: '',
  isDroner: false,
  specialPointId: '',
  createBy: '',
  updateBy: '',
  specialPointList: [SpecialPointConditionEntity_INIT],
}
export interface ReturnSpecialPoint {
  id: string
  point?: number
  updateBy: string
  reason: string
  taskId: string
  taskNo: string
}
