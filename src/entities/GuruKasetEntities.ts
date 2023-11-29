export interface GroupGuruEntities {
  _id: string
  groupName: string
  articleCount: number
  videoCount: number
  __v: number
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
