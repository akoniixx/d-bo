export interface NewsEntities {
  id?: string
  title: string
  details: string
  status: string
  createBy: string
  application: string
  categoryNews: string
  campaignId: string
  pinAll: boolean
  pinMain: boolean
  file?: any
  startDate?: string | null
  endDate?: string | null
  typeLaunch?: string | null
}
