import { DronerRankDetailEntity, DronerRankListEntity, taskDetailEntity } from './../entities/DronerRankEntities';
import { BASE_URL, httpClient } from "../config/develop-config";
export class DronerRankDatasource {
  static getDronerRank(
    page: number,
    row: number,
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    ratingMin?: number,
    ratingMax?: number,
    startDate?: number,
    endDate?: number,
    search?: string
  ): Promise<DronerRankListEntity> {
    const params = {
      page: page,
      take: row,
      subdistrictId: subdistrictId,
      districtId: districtId,
      provinceId: provinceId,
      ratingMin: ratingMin,
      ratingMax: ratingMax,
      startDate: startDate,
      endDate: endDate,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/tasks/droner-ranking/get-all-droner-ranking", {
        params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getDronerRankById(id: string): Promise<DronerRankDetailEntity> {
    return httpClient
      .get(BASE_URL + "/tasks/droner-ranking/get-droner-detail/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getTaskDetail(id: string): Promise<taskDetailEntity> {
    return httpClient
      .get(BASE_URL + "/tasks/droner-ranking/get-task-detail/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}