export interface TargetSpayEntities {
  createdAt: string
  id: string
  isActive: boolean
  isChecked: boolean
  name: string
  updatedAt: string
}
export const TargetSpayEntities_INIT: TargetSpayEntities = {
  createdAt: '',
  id: '',
  isActive: false,
  isChecked: false,
  name: '',
  updatedAt: '',
}

export interface AllTargetSpayEntities {
  data: TargetSpayEntities[]
  count: number
}
