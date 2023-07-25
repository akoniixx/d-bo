import { BASE_URL, httpClient } from "../config/config";

export class TaskReviewDronerDatasource {
  static async UpdateReviewDroner(
    taskId: string,
    canReview: string,
    pilotEtiquette: number,
    punctuality: number,
    sprayExpertise: number,
    comment: string,
    updateBy: string,
  ): Promise<any> {
    const params = {
      taskId: taskId,
      canReview: canReview,
      pilotEtiquette: pilotEtiquette,
      punctuality: punctuality,
      sprayExpertise: sprayExpertise,
      comment: comment,
      updateBy: updateBy,
    };
    return httpClient
      .post(BASE_URL + '/tasks/task/review-droner', params)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  }
}
