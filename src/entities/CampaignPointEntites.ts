export interface CampaignConditionEntity {
  num: number;
  rai: number;
  point: number;
  rewardId: string | null;
  rewardName?: string | null;
  descriptionReward?: string | null;
  conditionReward?: string | null;
  missionName?: string | null;
  quata?: number;
  rewardRound?: number;
  isDelete: boolean;
}

export const CampaignConditionEntity_INIT: CampaignConditionEntity = {
  num: 1,
  rai: 0,
  point: 0,
  rewardId: null,
  rewardName: null,
  descriptionReward: null,
  conditionReward: null,
  missionName: null,
  quata: 0,
  rewardRound: 0,
  isDelete: false,
};

export interface CampaignEntiry {
  id: string;
  campaignName: string;
  campaignType: string;
  startDate: string;
  endDate: string;
  condition: CampaignConditionEntity[];
  createBy: string;
  updateBy: string;
  status: string;
  application: string;
  createAt: string;
  updateAt: string;
  isDeleteFarmer: boolean;
  isDeleteDroner: boolean;
}

export const CampaignEntiry_INIT: CampaignEntiry = {
  id: "",
  campaignName: "",
  campaignType: "",
  startDate: "",
  endDate: "",
  condition: [CampaignConditionEntity_INIT],
  createBy: "",
  updateBy: "",
  status: "",
  application: "",
  createAt: "",
  updateAt: "",
  isDeleteFarmer: false,
  isDeleteDroner: false,
};

export interface CampaignListEntity {
  count: number;
  data: CampaignEntiry[];
}

export const CampaignListEntity_INIT: CampaignListEntity = {
  count: 0,
  data: [CampaignEntiry_INIT],
};

export interface CreateCampaignEntiry {
  campaignName: string;
  campaignType: string;
  startDate: string;
  endDate: string;
  condition: CampaignConditionEntity[];
  createBy: string;
  updateBy: string;
  status: string;
  application: string;
  isDeleteDroner: boolean;
  isDeleteFarmer: boolean;
}
export const CreateCampaignEntiry_INIT: CreateCampaignEntiry = {
  campaignName: "",
  campaignType: "",
  startDate: "",
  endDate: "",
  condition: [CampaignConditionEntity_INIT],
  createBy: "",
  updateBy: "",
  status: "",
  application: "",
  isDeleteFarmer: false,
  isDeleteDroner: false,
};
export interface CampaignConQuotaEntity {
  num: number;
  rai: number;
  point: string;
  quata: number;
  rewardId: null;
  rewardName: string;
  missionName: null;
  rewardRound: number;
  conditionReward: string;
  descriptionReward: string;
}
export interface CampaignQuotaEntiry {
  id: string;
  condition: CampaignConQuotaEntity[];
  status: string;
  application: string;
  description: string;
  campaignName: string;
  campaignType: string;
  startDate: string;
  endDate: string;
  createBy: string;
  updateBy: string;
  pathImageBanner: string;
  pathImageReward: string;
  pathImageFloating: string;
  pathImageRewardRound: string;
  missionNo: string;
  rulesCampaign: string;
  createdAt: string;
  updatedAt: string;
  isDeleteFarmer: boolean;
  isDeleteDroner: boolean;
  quotaAmount: number;
  amountReceive: number;
  countSubMission: number;
}
export interface CampaignQuotaListEntity {
  count: number;
  data: CampaignQuotaEntiry[];
}
