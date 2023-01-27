import { BASE_URL, httpClient } from "../config/develop-config";

export class CouponDataSource{
    static getCoupon(code : string){
        return httpClient.get(BASE_URL + `/promotion/promotions/getoffline/${code}`)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }
    static usedCoupon(code : string){
        return httpClient.get(BASE_URL + `/promotion/promotions/usedoffline/${code}`)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }
    static calculateCoupon(farmerPlotId : string,cropName : string,raiAmount : number,couponCode : string){
        return httpClient.post(BASE_URL + `/tasks/task/calculate-price`,{
            farmerPlotId : farmerPlotId,
            cropName : cropName,
            raiAmount : raiAmount,
            couponCode : couponCode
        })
        .then(res => {
            return res.data
        }) 
        .catch(err => console.log(err))
    }

    static getPromotionCode(couponId : string){
        return httpClient.get(BASE_URL + `/promotion/promotions/${couponId}`,{
        })
        .then(res => {
            return res.data
        }) 
        .catch(err => console.log(err))
    }
}