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
