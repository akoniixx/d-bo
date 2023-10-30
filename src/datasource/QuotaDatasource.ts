import axios from 'axios'
import { BASE_URL, httpClient } from '../config/config'
import {
  AddQuotaRedeemHisEntity,
  AllQuotaRRedeemEntity,
  AllQuotaReportEntity,
} from '../entities/QuotaReportEntities'

export class QuotaDatasource {
  static getAllQuotaReport(
    campaignId: string,
    take?: any,
    page?: any,
    search?: string,
  ): Promise<AllQuotaReportEntity> {
    const params = {
      campaignId: campaignId,
      page: page,
      take: take,
      search: search,
    }
    return httpClient
      .get(BASE_URL + '/promotion/quota-privilege/get-privilege-quota-droner', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getQuotaReport')
      })
  }
  static addRewardReceive(data: AddQuotaRedeemHisEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + '/promotion/quota-privilege/add-quota-redeem-history', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err addQuotaReport')
      })
  }
  static getQuotaRedeemHisId(
    dronerId: string,
    campaignId: string,
    page: any,
    take: any,
  ): Promise<AllQuotaRRedeemEntity> {
    const params = {
      page: page,
      take: take,
    }
    return httpClient
      .get(
        BASE_URL +
          `/promotion/quota-privilege/get-quota-redeem-history?dronerId=${dronerId}&campaignId=${campaignId}`,
        {
          params,
        },
      )
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getQuotaRedeemHisId')
      })
  }
  static deleteQuotaRedeemHisId(id: string): Promise<AllQuotaRRedeemEntity> {
    return httpClient
      .delete(BASE_URL + `/promotion/quota-privilege/delete-quota-redeem-history/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteQuotaRedeemHisId')
      })
  }
  static addQuotaRedeem(data: AddQuotaRedeemHisEntity): Promise<any> {
    delete data.id
    return httpClient
      .post(BASE_URL + '/promotion/quota-privilege/add-quota-redeem-history', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err addQuotaRedeem')
      })
  }
  static editQuotaRedeem(data: AddQuotaRedeemHisEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/promotion/quota-privilege/update-quota-redeem-history/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err editQuotaRedeem')
      })
  }
  static reportExcel(campaignId: string, downloadBy: string, idFileName: string) {
    const params = {
      campaignId: campaignId,
      downloadBy: downloadBy,
      idFileName: idFileName,
    }
    return axios
      .post(BASE_URL + `/promotion/report-document/report-excel-quota`, params, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        return response.data
      })
  }
  static reportExcelQuotaReceive(campaignId: string, downloadBy: string, idFileName: string) {
    const params = {
      campaignId: campaignId,
      downloadBy: downloadBy,
      idFileName: idFileName,
    }
    return axios
      .post(BASE_URL + `/promotion/report-document/report-excel-quota_receive`, params, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        return response.data
      })
  }
}
