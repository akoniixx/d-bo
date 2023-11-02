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
