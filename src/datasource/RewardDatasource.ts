import { BASE_URL, httpClient } from "../config/develop-config";
import { GetAllRewardEntities, RewardEntities } from "../entities/RewardEntites";

export class RewardDatasource {
  static addReward(data: RewardEntities) {
    const formData = new FormData();
    formData.append("rewardName", data.rewardName);
    formData.append("rewardType", data.rewardType);
    formData.append("rewardExchange", data.rewardExchange);
    formData.append("score", data.score);
    formData.append("amount", data.amount);
    formData.append("description", data.description);
    formData.append("condition", data.condition);
    formData.append("status", data.status);
    formData.append("createBy", data.createBy);
    formData.append("startExchangeDate", data.startExchangeDate);
    formData.append("expiredExchangeDate", data.expiredExchangeDate);
    formData.append("startUsedDate", data.startUsedDate);
    formData.append("expiredUsedDate", data.expiredUsedDate);
    formData.append("file", data.file);
    return httpClient
      .post(BASE_URL + "/promotion/reward/upload", formData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static getAllReward(
    take: number,
    page: number,
    startExchangeDate?: string,
    expiredExchangeDate?: string,
    status?: string,
    rewardType?: string,
    rewardExchange?: string,
    search?: string
  ): Promise<GetAllRewardEntities> {
    const params = {
      take: take,
      page: page,
      startExchangeDate: startExchangeDate,
      expiredExchangeDate: expiredExchangeDate,
      rewardType: rewardType,
      status: status,
      rewardExchange: rewardExchange,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/promotion/reward/queryall", {
        params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getAllRewardById(id : string){
    return httpClient.
    get(BASE_URL + `/promotion/reward/query/${id}`)
    .then(res => {return res.data})
    .catch(err => console.log(err))
}
}
