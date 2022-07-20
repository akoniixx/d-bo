import { BASE_URL, httpClient } from "../config/develop-config";

export class FileDatasource {
  static getUploadFile(): Promise<any> {

    return httpClient
      .post(BASE_URL + "/", )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }


  
}
