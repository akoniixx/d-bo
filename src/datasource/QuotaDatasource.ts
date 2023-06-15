import { BASE_URL, httpClient } from "../config/develop-config";
import {
  AddQuotaRedeemHisEntity,
  AllQuotaReportEntity,
} from "../entities/QuotaReportEntities";

export class QuotaDatasource {
  static getAllQuotaReport(
    campaignId: string,
    take: any,
    page: any,
    search?: string
  ): Promise<AllQuotaReportEntity> {
    const params = {
      campaignId: campaignId,
      page: page,
      take: take,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/promotion/quota-privilege/get-privilege-quota-droner", {
        params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getQuotaReport");
      });
  }
  static addRewardReceive(data: AddQuotaRedeemHisEntity): Promise<any> {
    return httpClient
      .post(
        BASE_URL + "/promotion/quota-privilege/add-quota-redeem-history",
        data
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err addQuotaReport");
      });
  }
}
