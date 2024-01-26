export interface HighlightEntities {
  id: string
  name: string
  status: string
  imagePath: string
  urlNews: any
  read: number
  application: string
  startDate: string
  endDate: string
  createAt: string
  updateAt: string
  createBy: string
  updateBy: string
}

export interface summaryHightLight {
  active: string
  pending: string
  drafting: string
  inactive: string
}
export const summaryHightLight_INIT: summaryHightLight = {
  active: '',
  pending: '',
  drafting: '',
  inactive: '',
}
export interface AllHighlightEntities {
  data: HighlightEntities[]
  count: number
  summary: [summaryHightLight]
}

export interface AddHighlightEntities {
  id?: string
  name: string
  status: string
  urlNews?: string
  application: string
  startDate?: string | null
  endDate?: string | null
  createBy?: string
  updateBy: string
  file?: any
}
