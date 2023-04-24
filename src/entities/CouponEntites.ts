export interface CouponEntities {
  id?: string;
  couponCode?: string;
  couponName: string;
  couponType: string;
  promotionStatus: string;
  promotionType: string;
  discountType: string;
  discount: number;
  count: number;
  keep?: number;
  used?: number;
  point?: number;
  startDate?: Date;
  expiredDate?: Date;
  description: string;
  condition: string;
  specialCondition: boolean;
  couponConditionRai: boolean;
  couponConditionRaiMin: number;
  couponConditionRaiMax: number;
  couponConditionService: boolean;
  couponConditionServiceMin: number;
  couponConditionServiceMax: number;
  couponConditionPlant: boolean;
  couponConditionPlantList: CouponPlantList[];
  couponConditionProvince: boolean;
  couponConditionProvinceList: string[];
  createBy: string;
}

export interface CouponPlantList {
  id?: string;
  plantName: string;
  injectionTime: string[];
}

export interface CouponListEntities {
  promotions: CouponEntities[];
  count: number;
}

export interface CouponQueryEntities {
  page: number;
  take: number;
  sortStatus?: string;
  sortCoupon?: string;
  sortType?: string;
  startDate?: Date;
  expiredDate?: Date;
  search?: string;
}
export interface CouponKeepByFarmer {
  id: string;
  farmerId: string;
  promotionId: string;
  used: boolean;
  offlineCode: string;
  createAt: string;
  updateAt: string;
  promotion: {
    id:string,
    couponCode: string,
    couponName: string,
    couponType: string,
    promotionStatus: string,
    "promotionType": "ONLINE",
    "discountType": "DISCOUNT",
    "discount": 200,
    "count": 100,
    "keep": 98,
    "used": 1,
    "point": null,
    "startDate": "2023-04-19T10:49:07.000Z",
    "expiredDate": "2023-04-25T10:49:07.000Z"}
}
