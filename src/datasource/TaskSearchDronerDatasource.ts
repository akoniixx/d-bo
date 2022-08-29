import { BASE_URL, httpClient } from "../config/develop-config";
import { TaskSearchDroner } from "../entities/TaskSearchDroner";

export class TaskSearchDronerDatasource {
  static getTaskDronerList(
    farmerId: string,
    plotId: string,
    date: string
  ): Promise<TaskSearchDroner[]> {
    const params = {
      farmerId: "2efc4c8f-f3c9-40e4-8feb-14f5f9f0f9f0",
      farmerPlotId: "21269963-f8a8-4eb5-adef-ab5d3ca622bc",
      dateAppointment: "2022-08-31",
    };
    console.log(params);
    return (
      httpClient
        //.post(BASE_URL + "/tasks/task/search-droner", { params })
        .post(
          "https://api-dev-dnds.iconkaset.com/tasks/task/search-droner?farmerId=2efc4c8f-f3c9-40e4-8feb-14f5f9f0f9f0&farmerPlotId=21269963-f8a8-4eb5-adef-ab5d3ca622bc&dateAppointment=2022-08-31"
        )
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((err) => {
          console.log(err, "err getTaskDroner");
        })
    );
  }
}
