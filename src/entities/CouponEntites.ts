export interface CouponEntities{
    id? : string;
    couponCode? : string;
    couponName : string;
    couponType : string;
    promotionStatus : string;
    promotionType : string;
    discountType : string;
    discount : number;
    count : number;
    keep? : number;
    used? : number;
    point? : number;
    startDate? : Date;
    expiredDate? : Date;
    description : string;
    condition : string;
    conditionSpecialFirsttime : boolean;
    couponConditionRai : boolean;
    couponConditionRaiMin : number;
    couponConditionRaiMax : number;
    couponConditionService : boolean;
    couponConditionServiceMin : number;
    couponConditionServiceMax : number;
    couponConditionPlant : boolean;
    couponConditionPlantList : CouponPlantList[] | null;
    couponConditionProvince : boolean;
    couponConditionProvinceList : string[];
    createBy : string;
}

export interface CouponPlantList{
    id? : string;
    plantName : string;
    injectionTime : string[]
}

export interface CouponListEntities{
    promotions : CouponEntities[],
    count : number
}

export interface CouponQueryEntities{
    page : number;
    take : number;
    sortStatus? : string;
    sortCoupon? : string;
    sortType? : string;
    startDate? : Date;
    expiredDate? : Date;
    search? : string;
}