import { BASE_URL, httpClient } from "../config/develop-config";
import { GetTaskCoupon } from "../entities/CalculateTask";

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
}
