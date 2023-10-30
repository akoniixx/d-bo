export interface reviewDronerDetail {
  avg: number
  taskId: string
  comment: string
  canReview: string
  punctuality: string
  pilotEtiquette: string
  sprayExpertise: string
}
export const reviewDronerDetail_INIT: reviewDronerDetail = {
  avg: 0,
  taskId: '',
  comment: '',
  canReview: '',
  punctuality: '',
  pilotEtiquette: '',
  sprayExpertise: '',
}

export interface CreateReview {
  taskId: string
  canReview: string
  punctuality: number
  pilotEtiquette: number
  sprayExpertise: number
  comment: string
  updateBy: string
}
export const CreateReview_INIT: CreateReview = {
  taskId: '',
  canReview: '',
  punctuality: 0,
  pilotEtiquette: 0,
  sprayExpertise: 0,
  comment: '',
  updateBy: '',
}
