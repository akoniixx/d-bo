export interface RewardEntities {
  id?: string
  rewardName: string
  rewardType: string
  rewardExchange: string
  score: string
  amount: string
  description: string
  condition: string
  status: string
  createBy: string
  startExchangeDate: string
  expiredExchangeDate: string
  startUsedDate: string
  expiredUsedDate: string
  file?: any
}
export interface GetRewardEntities {
  id: string
  rewardName: string
  imagePath: string
  rewardType: string
  rewardExchange: string
  rewardNo: string
  score: number
  amount: number
  used: number
  remain: number
  description: string
  condition: string
  startExchangeDate: string
  expiredExchangeDate: string
  startUsedDate: string
  expiredUsedDate: string
  startExchangeDateCronJob: string
  expiredExchangeDateCronJob: string
  startUsedDateCronJob: string
  expiredUsedDateCronJob: string
  digitalCode: string
  status: string
  statusUsed: string
  createBy: string
  createAt: string
  updateAt: string
}
export interface GetAllRewardEntities {
  data: GetRewardEntities[]
  count: number
}

export interface DronerRewardHistoryEntities {
  id: string
  dronerId: string
  campaignId: string
  campaignName: string
  missionId: string
  allValue: string
  amountValue: string
  beforeValue: string
  balance: string
  beforeRai: string
  afterRai: string
  raiAmount: string
  rewardId: string
  rewardName: string
  rewardQuantity: number
  redeemNo: string
  receiverDetail: {
    tel: string
    address: string
    lastname: string
    addressId: string
    firstname: string
  }
  redeemDetail: {
    step: number
    missionNo: string
    rewardType: string
    missionName: string
    redeemStatus: string
    rewardExchange: string
    rewardQuantity: number
  }
  createAt: string
  updateAt: string
  mission: {
    id: string
    farmerId: string
    dronerId: string
    campaignId: string
    status: {
      status1: string
      status2: string
      status3: string
      status4: string
    }
    missionType: string
    missionNo: string
    allraiAmount: number
    createAt: string
    updateAt: string
  }
  reward: GetRewardEntities
}
export interface GetAllDronerRewardHistoryEntities {
  data: DronerRewardHistoryEntities[]
  count: number
}
