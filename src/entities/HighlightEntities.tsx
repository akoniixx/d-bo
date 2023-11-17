export interface HighlightEntities {
  id: string
  name: string
  status: string
  imagePath: string
  urlNews: string
  read: number
  application: string
  startDate: string
  endDate: string
  createAt: string
  updateAt: string
  createBy: string
  updateBy: string
}

export interface AllHighlightEntities {
  data: HighlightEntities[]
  count: number
}

export interface AddHighlightEntities {
  id?: string
  name: string
  status: string
  urlNews: string
  application: string
  startDate?: string | null
  endDate?: string | null
  createBy?: string
  updateBy: string
  file?: any
}
