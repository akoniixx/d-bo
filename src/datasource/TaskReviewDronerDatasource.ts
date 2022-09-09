import { BASE_URL, httpClient } from "../config/develop-config";
import { reviewDronerDetail } from "../entities/ReviewDronerEntities";

export class TaskReviewDronerDatasource {
  static UpdateReviewDroner( data : reviewDronerDetail): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/tasks/task/review-droner" + data.taskId, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
