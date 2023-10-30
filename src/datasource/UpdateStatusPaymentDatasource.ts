import { BASE_URL, httpClient } from '../config/config'
import { updateStatusPays } from '../entities/TaskFinishEntities'

export class UpdateStatusPaymentDatasource {
  static UpdateStatusPayment(data: updateStatusPays): Promise<any> {
    return httpClient
      .post(BASE_URL + `/tasks/task/update-payment-status/{id}`, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
