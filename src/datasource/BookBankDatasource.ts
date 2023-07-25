import { BASE_URL, httpClient } from "../config/config";

export class BookBankDatasource {
  static getBankData() {
    return httpClient
      .get(BASE_URL + `/bank-data`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    }
}
