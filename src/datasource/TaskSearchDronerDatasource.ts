import { BASE_URL, httpClient } from "../config/config";
import { TaskSearchDroner } from "../entities/TaskSearchDroner";

export class TaskSearchDronerDatasource {
  static getTaskDronerList(
    farmerId?: string,
    plotId?: string,
    date?: string,
    search?: string,
    distanceMin?: number,
    distanceMax?: number,
    status?: string,
    ratingMin?: number,
    ratingMax?: number
  ): Promise<TaskSearchDroner[]> {
    const params = {
      farmerId: farmerId,
      farmerPlotId: plotId,
      dateAppointment: date,
      search: search,
      distanceMin: distanceMin,
      distanceMax: distanceMax,
      status: status,
      ratingMin: ratingMin,
      ratingMax: ratingMax,
    };
    if (params.distanceMax == 0) {
      delete params["distanceMin"];
      delete params["distanceMax"];
    }
    return httpClient
      .post(BASE_URL + "/tasks/task/search-droner", params)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getTaskDroner");
      });
  }
}
