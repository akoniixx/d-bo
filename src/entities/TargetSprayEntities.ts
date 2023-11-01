export interface TargetSpayEntities {
  createdAt: string
  id: string
  isActive: boolean
  name: string
  updatedAt: string
}

export interface AllTargetSpayEntities {
  data: TargetSpayEntities[]
  count: number
}
