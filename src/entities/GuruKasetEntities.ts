export interface GroupGuruEntities {
  _id: string
  groupName: string
  articleCount: number
  videoCount: number
  __v: number
}
export const GroupGuruEntities_INIT: GroupGuruEntities = {
  _id: '',
  groupName: '',
  articleCount: 0,
  videoCount: 0,
  __v: 0,
}
export interface insertGroupGuru {
  _id?: string
  groupName: string
}

export interface AllGroupGuruEntities {
  data: GroupGuruEntities[]
  count: number
}

export interface GuruKasetEntities {
  _id: string
  type: string
  name: string
  view: number
  like: number
  commentCount: number
  read: number
  application: string
  status: string
  grouping: string
  startDate: any
  createdAt: string
  updatedAt: string
  __v: number
  description: string
  image: string
  startDateCronJob: string
}
export interface AllGuruKasetEntities {
  data: GuruKasetEntities[]
  count: number
}
export interface AddGuruKasetEntities {
  id?: string
  name: string
  description: string
  createBy: string
  updateBy: string
  type: string
  application: string
  startDate?: string | null
  status: string
  file: any
  groupingId: string
}
