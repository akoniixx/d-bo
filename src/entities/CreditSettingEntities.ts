export interface CreditSettingEntity {
  applicationType: string
  cashCredit: number
  id?: string
  isActive: boolean
  pointCredit: number
  updatedBy: string
}
export const CreditSettingEntity_INIT: CreditSettingEntity = {
    applicationType: '',
    cashCredit: 0,
    id: '',
    isActive: false,
    pointCredit: 0,
    updatedBy: '',
  }
