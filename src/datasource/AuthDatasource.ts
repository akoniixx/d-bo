import axios from 'axios'
import { BASE_URL, BASE_URL_ICK_SHOP } from '../config/config'

export class AuthDatasource {
  static login(username: string, password: string) {
    return axios
      .post(BASE_URL + '/auth/login-user-staff', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('username', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  static logout() {
    localStorage.removeItem('username')
  }

  static loginUserSellCoda(email: string) {
    return axios
      .post(BASE_URL_ICK_SHOP + '/auth/auth/login-user-staff', {
        email,
      })
      .then((response) => {
        return response.data
      })
  }
}
