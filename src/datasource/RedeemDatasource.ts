import { BASE_URL, httpClient } from '../config/config'
import {
  DetailRedeemDronerEntity,
  DetailRedeemFarmerEntity,
  DetailRedeemFermerEntity,
  RedeemDronerEntity,
  RedeemDronerListEntity,
  RedeemFarmerListEntity,
  UpdateRedeemDronerEntity,
  UpdateRedeemFarmerEntity,
} from '../entities/RedeemEntities'

export class RedeemDatasource {
  static getRedeemFarmer(
    take: number,
    page: number,
    search?: string,
    startDate?: string,
    endDate?: string,
    status?: string,
  ): Promise<RedeemFarmerListEntity> {
    const params = {
      page: page,
      take: take,
      search: search,
      startDate: startDate,
      endDate: endDate,
      status: status,
    }
    return httpClient
      .post(BASE_URL + '/tasks/task/get-task-redeem-point', params)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getRedeemFarmerById(id: string): Promise<DetailRedeemFermerEntity> {
    return httpClient
      .get(BASE_URL + `/tasks/task/get-task-redeem-point-detail/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getFarmerTransactions(
    take: number,
    page: number,
    search?: string,
    startDate?: string,
    endDate?: string,
    status?: string,
    secondSearch?: string,
    rewardType?: string,
    rewardExchange?: string,
  ): Promise<RedeemDronerListEntity> {
    const params = {
      take: take,
      page: page,
      search: search,
      startDate: startDate,
      endDate: endDate,
      status: status,
      secondSearch: secondSearch,
      rewardType: rewardType,
      rewardExchange: rewardExchange,
    }
    return httpClient
      .get(BASE_URL + '/promotion/farmer-transactions/get-all-farmer-reward-history', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err farmer transactions')
      })
  }
  static getRedeemDroner(
    take: number,
    page: number,
    search?: string,
    startDate?: string,
    endDate?: string,
    status?: string,
    secondSearch?: string,
    rewardType?: string,
    rewardExchange?: string,
  ): Promise<RedeemDronerListEntity> {
    const params = {
      take: take,
      page: page,
      search: search,
      startDate: startDate,
      endDate: endDate,
      status: status,
      secondSearch: secondSearch,
      rewardType: rewardType,
      rewardExchange: rewardExchange,
    }
    return httpClient
      .get(BASE_URL + '/promotion/droner-transactions/get-all-droner-reward-history', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getRedeemDronerById(id: string): Promise<DetailRedeemDronerEntity> {
    return httpClient
      .get(BASE_URL + `/promotion/droner-transactions/get-droner-reward-history/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getRedeemFarmerTransactionsById(id: string): Promise<DetailRedeemFarmerEntity> {
    return httpClient
      .get(BASE_URL + `/promotion/farmer-transactions/get-farmer-reward-history/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err farmer-transactions by id')
      })
  }
  static updateStatusRedeem(data: UpdateRedeemDronerEntity) {
    return httpClient
      .post(BASE_URL + '/promotion/droner-transactions/update-redeem-status', data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static updateStatusFarmerRedeem(data: UpdateRedeemFarmerEntity) {
    return httpClient
      .post(BASE_URL + '/promotion/farmer-transactions/update-redeem-status', data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
