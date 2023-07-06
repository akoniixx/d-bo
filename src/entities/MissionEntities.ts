export interface MissionDetailEntity {
  count: number;
  id: string;
  campaignName: string;
  campaignType: string;
  startDate: string;
  endDate: string;
  condition: ConditionMission[];
  createBy: string;
  updateBy: string;
  status: string;
  application: string;
  createAt: string;
  updateAt: string;
  missionNo: string;
  amountPeople: number;
  data: {
    id: string;
    farmerId: string;
    dronerId: string;
    campaignId: string;
    missionType: string;
    missionNo: string;
    allraiAmount: number;
    firstname: string;
    lastname: string;
    telephoneNo: string;
    updateAt: string;
  }[];
}
export interface ConditionMission {
  num: number;
  rai: number;
  rewardId: string;
  missionName: string;
  conditionReward: string;
  reward: {
    id: string;
    rewardName: string;
    imagePath: string;
    rewardType: string;
    rewardExchange: string;
    rewardNo: string;
    amountInprogressCount: number;
    amountSuccessCount: number;
    amountRequestCount: number;
  };
}