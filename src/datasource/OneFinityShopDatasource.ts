import { BASE_URL_ICK_SHOP, DEV_ICK_SHOP_URL, sellCodaClient } from '../config/config'

export class OneFinityShopDatasource {
  static getListShop(
    page?: number,
    take?: number,
    sortField?: string,
    sortDirection?: string,
    search?: string,
    isActive?: boolean | null,
    provinceId?: number,
  ): Promise<any> {
    const params = {
      page: page,
      take: take,
      sortField: sortField,
      sortDirection: sortDirection,
      search: search,
      isActive: isActive,
      provinceId: provinceId,
    }
    return sellCodaClient
      .get(BASE_URL_ICK_SHOP + '/auth/onefinity-shop', { params })
      .then((response) => {
        return response.data.responseData
      })
      .catch((err) => {
        console.log(err, 'err 1finity-shop')
      })
  }
  static getListShopById(id: string): Promise<any> {
    return sellCodaClient
      .get(BASE_URL_ICK_SHOP + `/auth/onefinity-shop/${id}`)
      .then((response) => {
        return response.data.responseData
      })
      .catch((err) => {
        console.log(err, 'err 1finity-shop-by-id')
      })
  }
}
