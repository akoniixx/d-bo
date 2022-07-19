import { BASE_URL, httpClient } from "../config/develop-config";
import { UploadImageEntity } from "../entities/UploadImageEntities";

export class UploadImageDatasouce{
    static uploadImage(file: UploadImageEntity) :Promise<any>{
        return httpClient
        .post(BASE_URL + "/file/upload", file)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err, "err insertFarmer");
        });
    }
}