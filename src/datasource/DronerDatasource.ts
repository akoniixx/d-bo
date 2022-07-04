import { BASE_URL, httpClient } from "../config/develop-config";
import { DronerEntity } from "../entities/DronerEntities";

export class DronerDatasource {
  static getDronerList(
    status: string,
    page: number,
    take: number,
    sortDirection: string,
    // sortField?: string,
    search?: string
  ): Promise<any> {
    const params = {
      status: status,
      page: page,
      take: take,
      sortDirection: sortDirection,
      // sortField: sortField,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/droner", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getDronerListByID(id: string): Promise<any> {
    return httpClient
      .get(`${BASE_URL}/drone/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err getDronerListById");
      });
  }

  static createDronerList(data: any): Promise<any> {
    return httpClient
      .post(BASE_URL + "/droner", { data })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteDronerList(id: string) {
    return httpClient
      .delete(BASE_URL + "/droner" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
