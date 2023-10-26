import { BASE_URL, httpClient } from "../config/config";
import {
  GetAllDronerRewardHistoryEntities,
  GetAllRewardEntities,
  RewardEntities,
} from "../entities/RewardEntites";

export class RewardDatasource {
  static addReward(data: RewardEntities) {
    const formData = new FormData();
    formData.append("rewardName", data.rewardName);
    formData.append("rewardType", data.rewardType);
    formData.append("rewardExchange", data.rewardExchange);
    data.score && formData.append("score", data.score);
    formData.append("amount", data.amount);
    formData.append("description", data.description);
    formData.append("condition", data.condition);
    formData.append("status", data.status);
    formData.append("createBy", data.createBy);
    data.startExchangeDate &&
      formData.append("startExchangeDate", data.startExchangeDate);
    data.expiredExchangeDate &&
      formData.append("expiredExchangeDate", data.expiredExchangeDate);
    data.startUsedDate && formData.append("startUsedDate", data.startUsedDate);
    data.expiredUsedDate &&
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
    take?: number,
    page?: number,
    startExchangeDate?: string,
    expiredExchangeDate?: string,
    status?: string,
    rewardType?: string[],
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
    console.log(BASE_URL + "/promotion/reward/queryall", {
      params,
    })
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
  static getAllRewardById(id: string) {
    return httpClient
      .get(BASE_URL + `/promotion/reward/query/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static deleteReward(id: string) {
    return httpClient
      .delete(BASE_URL + `/promotion/reward/query/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static updateReward(id: string, data: RewardEntities) {
    const formData = new FormData();
    formData.append("rewardName", data.rewardName);
    formData.append("rewardType", data.rewardType);
    formData.append("rewardExchange", data.rewardExchange);
    data.rewardExchange === "SCORE" && formData.append("score", data.score);
    formData.append("amount", data.amount);
    formData.append("description", data.description);
    formData.append("condition", data.condition);
    formData.append("status", data.status);
    formData.append("createBy", data.createBy);
    if (data.rewardType === "PHYSICAL" && data.rewardExchange === "SCORE") {
      formData.append("startExchangeDate", data.startExchangeDate);
      formData.append("expiredExchangeDate", data.expiredExchangeDate);
    }
    if (data.rewardType === "DIGITAL" && data.rewardExchange === "SCORE") {
      formData.append("startExchangeDate", data.startExchangeDate);
      formData.append("expiredExchangeDate", data.expiredExchangeDate);
      formData.append("startUsedDate", data.startUsedDate);
      formData.append("expiredUsedDate", data.expiredUsedDate);
    }
    if (data.rewardType === "DIGITAL" && data.rewardExchange === "MISSION") {
      formData.append("startUsedDate", data.startUsedDate);
      formData.append("expiredUsedDate", data.expiredUsedDate);
    }
    formData.append("file", data.file);
    return httpClient
      .patch(BASE_URL + `/promotion/reward/update/${id}`, formData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static getAllDronerRewardHistory(
    rewardId: string,
    page: number,
    take: number,
    startDate?: string,
    endDate?: string,
    status?: string,
    search?: string
  ): Promise<GetAllDronerRewardHistoryEntities> {
    const params = {
      rewardId:rewardId,
      page: page,
      take: take,
      startDate: startDate,
      endDate: endDate,
      status: status,
      search: search,
    };
    return httpClient
      .get(
        BASE_URL +
          "/promotion/droner-transactions/get-all-droner-reward-history",
        {
          params,
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
