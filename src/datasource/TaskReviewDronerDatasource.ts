import { CreateReview } from './../entities/ReviewDronerEntities';
import { BASE_URL, httpClient } from "../config/develop-config";

export class TaskReviewDronerDatasource {
  static UpdateReviewDroner(data : CreateReview ): Promise<any> {
    console.log(data);
    return httpClient
      .post(BASE_URL + "/tasks/task/review-droner/", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("post review",error);
      });
  }
}
