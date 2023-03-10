import { BASE_URL, httpClient } from "../config/develop-config";
import { GetTaskCoupon } from "../entities/CalculateTask";
import { CouponEntities } from "../entities/CouponEntites";

export class CouponDataSource {
  static getCoupon(code: string) {
    return httpClient
      .get(BASE_URL + `/promotion/promotions/getoffline/${code}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static usedCoupon(code: string) {
    return httpClient
      .get(BASE_URL + `/promotion/promotions/usedoffline/${code}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  static calculateCoupon(data: GetTaskCoupon) {
    data.priceCustom === "0" && delete data.priceCustom;
    return httpClient
      .post(BASE_URL + `/tasks/task/calculate-price`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static calculateEditCoupon(data: GetTaskCoupon) {
    data.priceCustom === "0" && delete data.priceCustom;
    return httpClient
      .post(BASE_URL + `/tasks/task/calculate-price-edit-bo`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static getPromotionCode(couponId: string) {
    return httpClient
      .get(BASE_URL + `/promotion/promotions/${couponId}`, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static getCoupons(
    page : number,
    take : number,
    sortStatus? : string,
    sortCoupon? : string,
    sortType? : string,
    startDate? : string,
    expiredDate? : string,
    search? : string
  ){
    const params = {
      page : page,
      take : take,
      sortStatus : sortStatus,
      sortCoupon : sortCoupon,
      sortType : sortType,
      startDate : startDate,
      expiredDate : expiredDate,
      search : search
    }
    return httpClient.get(
      BASE_URL + '/promotion/promotions',{params}
    ).then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err, "err getCoupon");
    });
  }

  static queryCoupon(id : string){
    return httpClient.get(
      BASE_URL + `/promotion/promotions/${id}`
    ).then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  }

  static addCoupon(couponDto : CouponEntities){
    return httpClient.post(
      BASE_URL + '/promotion/promotions',couponDto
    ).then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  }

  static patchCoupon(id : string,couponDto : CouponEntities){
    return httpClient.patch(
      BASE_URL + `/promotion/promotions/${id}`,couponDto
    ).then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  }

  static deleteCoupon(id : string){
    return httpClient.delete(
      BASE_URL + `/promotion/promotions/${id}`
    ).then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  }
}
