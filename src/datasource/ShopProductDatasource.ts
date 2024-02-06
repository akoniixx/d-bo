import { BASE_URL_ICK_SHOP, sellCodaClient } from '../config/config'

export class ShopProductDatasource {
  static getShopProduct(
    shopId: string,
    page?: number,
    take?: number,
    groupId?: string,
    brandId?: string,
    search?: string,
    status?: string,
    sortBy?: string,
    sortDirection?: string,
  ): Promise<any> {
    const params = {
      page: page,
      take: take,
      groupId: groupId,
      brandId: brandId,
      search: search,
      status: status,
      sortBy: sortBy,
      sortDirection: sortDirection,
    }
    return sellCodaClient
      .get(BASE_URL_ICK_SHOP + `/master/onefinity-shop-product?shopId=${shopId}`, { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err shop product')
      })
  }
  static getProductBrand(
    page?: number,
    take?: number,
    search?: string,
    sortField?: string,
    sortDirection?: string,
    isActive?: string,
  ): Promise<any> {
    const params = {
      page: page,
      take: take,
      search: search,
      sortField: sortField,
      sortDirection: sortDirection,
      isActive: isActive,
    }
    return sellCodaClient
      .get(BASE_URL_ICK_SHOP + `/master/onefinity-product-brand`, { params })
      .then((response) => {
        return response.data.responseData
      })
      .catch((err) => {
        console.log(err, 'err product brand')
      })
  }
  static getProductGroup(): Promise<any> {
    return sellCodaClient
      .get(BASE_URL_ICK_SHOP + `/master/onefinity-product-group`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err product group')
      })
  }
}
