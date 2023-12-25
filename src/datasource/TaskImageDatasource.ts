import { BASE_URL, httpClient } from '../config/config'

export class TaskImageDatasource {
  static getImgByTask(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/tasks/task-image/get-task-image-by-task/${id}`)
      .then((response) => {
        return response.data.responseData
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
