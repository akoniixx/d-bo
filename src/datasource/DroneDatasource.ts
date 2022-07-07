import { BASE_URL, httpClient } from "../config/develop-config";

export class DroneDatasource {
  static getDroneList(
    page: number,
    take: number,
    sortField: string,
    sortDirection: string,
    search?: string
  ): Promise<any> {
    const params = {
      page: page,
      take: take,
      sortField: sortField,
      sortDirection: sortDirection,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/drone", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getDroneListByID(id: string): Promise<any> {
    return httpClient
      .get(`${BASE_URL}/drone/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err getDroneListById");
      });
  }

  static UpdateDroneList(data: any): Promise<any> {
    return httpClient
      .post(BASE_URL + "/drone", { data })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteDroneList(id: string) {
    return httpClient
      .delete(BASE_URL + "/drone" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
