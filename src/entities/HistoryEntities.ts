export interface HistoryEntity {
  taskHistoryId: string
  taskId: string
  action: string
  beforeValue: string
  afterValue: string
  remark: string
  createdAt: string
  createdBy: string
}
export const HistoryEntity_INIT: HistoryEntity = {
  taskHistoryId: '',
  taskId: '',
  action: '',
  beforeValue: '',
  afterValue: '',
  remark: '',
  createdAt: '',
  createdBy: '',
}
