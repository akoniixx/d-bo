import { BASE_URL, httpClient } from "../config/config";
import { GetTaskCoupon } from "../entities/CalculateTask";
import { CouponEntities, CouponFarmerUsed } from "../entities/CouponEntites";

export class CouponDataSource {
  static getCoupon(code: string) {
    return httpClient
      .get(BASE_URL + `/promotion/promotions/getbycode/${code}`)
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
    page: number,
    take: number,
    sortStatus?: string,
    sortCoupon?: string,
    sortType?: string,
    startDate?: string,
    expiredDate?: string,
    search?: string
  ) {
    const params = {
      page: page,
      take: take,
      sortStatus: sortStatus,
      sortCoupon: sortCoupon,
      sortType: sortType,
      startDate: startDate,
      expiredDate: expiredDate,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/promotion/promotions", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getCoupon");
      });
  }

  static queryCoupon(id: string) {
    return httpClient
      .get(BASE_URL + `/promotion/promotions/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static addCoupon(couponDto: CouponEntities) {
    return httpClient
      .post(BASE_URL + "/promotion/promotions", couponDto)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static patchCoupon(id: string, couponDto: CouponEntities) {
    return httpClient
      .patch(BASE_URL + `/promotion/promotions/${id}`, couponDto)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static deleteCoupon(id: string) {
    return httpClient
      .delete(BASE_URL + `/promotion/promotions/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static getAllOffline(id: string, page: number, take: number) {
    const params = {
      id: id,
      page: page,
      take: take,
    };
    return httpClient
      .get(BASE_URL + `/promotion/promotions/alloffline`, { params })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static getCouponKeepByFarmerId(id?: string) {
    return httpClient
      .get(BASE_URL + `/promotion/farmer-promotions/queryall/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  static updateCouponFarmerUsed(data: CouponFarmerUsed) {
    return httpClient
      .post(BASE_URL + `/promotion/farmer-promotions/used`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
}
