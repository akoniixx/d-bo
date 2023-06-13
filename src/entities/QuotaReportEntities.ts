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
