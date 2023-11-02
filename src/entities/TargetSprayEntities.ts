export interface TargetSpayEntities {
  createdAt: string
  id: string
  isActive: boolean
  isChecked: boolean
  name: string
  updatedAt: string
}

export interface AllTargetSpayEntities {
  data: TargetSpayEntities[]
  count: number
}
