import { BASE_URL } from './../config/develop-config';
import { intanceAuth } from "../config/develop-config";

export class AuthDatasource {
  static login (username: string, password: string) : Promise<any> {
    const params ={
      username, password
    }
  return intanceAuth
      .post(`${BASE_URL}/auth/signin-user-staff`, {params})
       .then((response) => {
         return response.data
       })
       .catch((error) => {
         console.log(error)
       })
   }
}