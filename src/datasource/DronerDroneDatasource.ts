import { BASE_URL, httpClient } from "../config/develop-config";

export class DronerDroneDatasource {
  static getDronerDrone(
    status: string,
    page: number,
    take: number,
    droneId?: string,
    search?: string
  ): Promise<any> {
    const params = {
    status: status,
      page: page,
      take: take,
      droneId:droneId,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/droner-drone", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

 
}
