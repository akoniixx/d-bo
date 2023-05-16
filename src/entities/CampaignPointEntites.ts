export interface CampaignConditionEntity {
  num: number;
  rai: number;
  point: number;
  rewardId: string | null;
}
export const CampaignConditionEntity_INIT: CampaignConditionEntity = {
  num: 0,
  rai: 0,
  point: 0,
  rewardId: null,
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
  isDelete: boolean;
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
  isDelete: false,
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
}
