export interface QuotaReportEntity {
  dronerId: string;
  allRai: number;
  quotaAmount: number;
  allValue: string;
  amountReceive: number;
  updateAt: string;
  firstname: string;
  lastname: string;
  telephoneNo: string;
}
export interface AllQuotaReportEntity {
  count: number;
  data: QuotaReportEntity[];
}
export interface AddQuotaRedeemHisEntity {
  id?: any;
  dronerId: string;
  firstName: string;
  lastName: string;
  telephoneNo: string;
  roundNo: any;
  rewardName: string;
  description: string;
  QuotaId: number;
}
export const AddQuotaRedeemHisEntity_INIT: AddQuotaRedeemHisEntity = {
  id: "",
  dronerId: "",
  firstName: "",
  lastName: "",
  telephoneNo: "",
  roundNo: undefined,
  rewardName: "",
  description: "",
  QuotaId: 0,
};
export interface QuotaRedeemEntity {
  createAt: string ;
  description: string;
  dronerId: string;
  firstName: string;
  id: string;
  lastName: string;
  rewardName: string;
  roundNo: any;
  updateAt: string;
}
export interface AllQuotaRRedeemEntity {
  count: number;
  data: QuotaRedeemEntity[];
}
