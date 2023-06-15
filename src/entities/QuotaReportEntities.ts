export interface QuotaReportEntity {
  dronerId: string;
  allRai: number;
  quotaAmount: number;
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
  id?: string;
  dronerId: string;
  firstName: string;
  lastName: string;
  roundNo: number;
  rewardName: string;
  description: string;
}
export const AddQuotaRedeemHisEntity_INIT: AddQuotaRedeemHisEntity = {
  id: "",
  dronerId: "",
  firstName: "",
  lastName: "",
  roundNo: 0,
  rewardName: "",
  description: "",
};
