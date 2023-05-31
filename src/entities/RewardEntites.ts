export interface RewardEntities {
  id?: string;
  rewardName: string;
  rewardType: string;
  rewardExchange: string;
  score: string;
  amount: string;
  description: string;
  condition: string;
  status: string;
  createBy: string;
  startExchangeDate: string;
  expiredExchangeDate: string;
  startUsedDate: string;
  expiredUsedDate: string;
  file?: any;
}
export interface GetRewardEntities {
  id: string;
  rewardName: string;
  imagePath: string;
  rewardType: string;
  rewardExchange: string;
  rewardNo: string;
  score: number;
  amount: number;
  used: number;
  remain: number;
  description: string;
  condition: string;
  startExchangeDate: string;
  expiredExchangeDate: string;
  startUsedDate: string;
  expiredUsedDate: string;
  startExchangeDateCronJob: string;
  expiredExchangeDateCronJob: string;
  startUsedDateCronJob: string;
  expiredUsedDateCronJob: string;
  digitalCode: string;
  status: string;
  statusUsed: string;
  createBy: string;
  createAt: string;
  updateAt: string;
}
export interface GetAllRewardEntities {
  data: GetRewardEntities[];
  count: number;
}
