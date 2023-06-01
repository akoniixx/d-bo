export interface PlanningPointEntity {
  task_id: string;
  task_no: string;
  created_at: string;
  droner: DronerPointEntiry[];
  farmer: FarmerPointEntiry[];
}
export interface DronerPointEntiry {
  rai: number;
  droner_id: string;
  first_name: string;
  last_name: string;
  telephone_no: string;
  point_per_rai: string;
  receive_point: string;
}
export interface FarmerPointEntiry {
  rai: number;
  farmer_id: string;
  first_name: string;
  last_name: string;
  telephone_no: string;
  point_per_rai: string;
  receive_point: string;
}

export interface PlanningPointListEntity {
  count: number;
  data: PlanningPointEntity[];
}

export interface ReceivePointEntity {
  id: string;
  taskId: string;
  taskNo: string;
  pointNo: string;
  status: string;
  createAt: string;
  action: string;
  farmerTranaction: {
    campaignId: string;
    campaignName: string;
    amountValue: number;
    firstname: string;
    lastname: string;
    telephoneNo: string;
    raiAmount: number;
  };
  dronerTransaction: {
    campaignId: string;
    campaignName: string;
    amountValue: number;
    firstname: string;
    lastname: string;
    telephoneNo: string;
    raiAmount: number;
  };
}

export interface ReceivePointListEntity {
  count: number;
  history: ReceivePointEntity[];
}

export interface FarmerSummaryPointEntity {
  id: string;
  farmerId: string;
  firstname: string;
  lastname: string;
  telephoneNo: string;
  campaignId: string;
  campaignName: string;
  allValue: number;
  amountValue: number;
  beforeValue: number;
  balance: number;
  beforeRai: number;
  afterRai: number;
  raiAmount: number;
  rewardId: string;
  rewardName: string;
  createAt: string;
  updateAt: string;
}

export interface FarmerSummaryPointListEntity {
  count: number;
  data: FarmerSummaryPointEntity[];
}

export interface DronerSummaryPointEntity {
  id: string;
  dronerId: string;
  firstname: string;
  lastname: string;
  telephoneNo: string;
  campaignId: string;
  campaignName: string;
  allValue: number;
  amountValue: number;
  beforeValue: number;
  balance: number;
  beforeRai: number;
  afterRai: number;
  raiAmount: number;
  createAt: string;
  updateAt: string;
}

export interface DronerSummaryPointListEntity {
  count: number;
  data: DronerSummaryPointEntity[];
}

export interface DetailSummaryEntity {
  histoPointQuotaId: string;
  taskNo: string;
  pointNo: string;
  redeemNo: string;
  action: string;
  farmerTransactionsId: string;
  amountValue: number;
  updateAt: string;
}

export interface DetailSummaryListEntity {
  count: number;
  data: DetailSummaryEntity[];
  summary: {
    allPoint: number;
    balance: number;
    pointAllUsed: number;
  };
  farmerName?: string;
  dronerName?: string;
}
