import { BASE_URL, httpClient } from '../config/config'
import { ImageEntity } from '../entities/UploadImageEntities'

export class UploadImageDatasouce {
  static uploadImage(file: ImageEntity): Promise<any> {
    const formDataProfile = new FormData()
    formDataProfile.append('file', file.file)
    formDataProfile.append('resource', file.resource)
    formDataProfile.append('category', file.category)
    formDataProfile.append('resourceId', file.resourceId)

    return httpClient
      .post(BASE_URL + '/file/upload', formDataProfile)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insertImg')
      })
  }
  static getImage(path: any): Promise<any> {
    return httpClient
      .get(BASE_URL + '/file/geturl?path=' + path)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getImg')
      })
  }

  static async deleteImage(id: any, path: any): Promise<any> {
    const params = {
      id: id,
      path: path,
    }
    return httpClient
      .delete(BASE_URL + '/file/delete', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getImg')
      })
  }

  static getImageFinish(path: string): Promise<any> {
    const params = {
      path: path,
    }
    return httpClient
      .get(BASE_URL + '/tasks/file/geturl', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getImg')
      })
  }
}
