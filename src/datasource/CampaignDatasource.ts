import { BASE_URL, httpClient } from "../config/develop-config";
import { CreateCampaignEntiry } from "../entities/CampaignPointEntites";
import { MissionDetailEntity } from "../entities/MissionEntities";
import {
  DetailRedeemDronerEntity,
  RedeemDronerListEntity,
} from "../entities/RedeemEntities";

export class CampaignDatasource {
  static getCampaignList(
    campaignType: string,
    take: number,
    page: number,
    startDate?: string,
    endStart?: string,
    status?: string,
    search?: string,
    app?: string
  ) {
    const params = {
      campaignType: campaignType,
      take: take,
      page: page,
      startDate: startDate,
      endDate: endStart,
      status: status,
      search: search,
      application: app,
    };
    return httpClient
      .get(BASE_URL + `/promotion/campaign/find-all-campaign`, { params })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static getCampaignById(id: string) {
    return httpClient
      .get(BASE_URL + `/promotion/campaign/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static createCampaign(data: CreateCampaignEntiry) {
    return httpClient
      .post(BASE_URL + `/promotion/campaign/create-campaign`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static updateCampaign(id: string, data: CreateCampaignEntiry) {
    return httpClient
      .patch(BASE_URL + `/promotion/campaign/update-campaign/${id}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static deleteCampaign(id: string) {
    return httpClient
      .delete(BASE_URL + `/promotion/campaign/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static checkDupCampaign(
    campaignType: string,
    startDate?: string,
    endStart?: string,
    app?: string,
    campaignId?: string
  ) {
    const params = {
      campaignType: campaignType,
      startDate: startDate,
      endDate: endStart,
      application: app,
      campaignId: campaignId,
    };
    return httpClient
      .post(BASE_URL + `/promotion/campaign/check-dupplicate-date`, params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static detailMissionInprogress(
    campaignId: string,
    num: number,
    take: number,
    page: number,
    status: string,
    search?: string
  ): Promise<MissionDetailEntity> {
    const params = {
      campaignId: campaignId,
      num: num,
      take: take,
      page: page,
      status: status,
      search: search,
    };
    return httpClient
      .get(BASE_URL + `/promotion/mission-campaign/query`, { params })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static detailMissionSuccess(
    num: number,
    take: number,
    page: number,
    missionNo?: string,
    search?: string
  ): Promise<RedeemDronerListEntity> {
    const params = {
      step: num,
      take: take,
      missionNo: missionNo,
      page: page,
      search: search,
    };
    return httpClient
      .get(BASE_URL + `/promotion/droner-transactions/get-mission-reward`, {
        params,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
}
