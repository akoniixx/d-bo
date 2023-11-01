import { BASE_URL, httpClient } from '../config/config'

export class TargetSpray {
  static getAllTargetSpray(): Promise<any> {
    return httpClient
      .get(BASE_URL + '/tasks/target-spary/find-target-spary-on-task')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getTargetSpray')
      })
  }
}
