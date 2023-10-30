export interface TaskCoupon {
  couponId: string
  pricePerRai: string
  priceBefore: number
  fee: number
  discountFee: number
  priceCouponDiscountStandard: number
  priceCouponDiscount: number
  netPrice: number
  couponName: string
}

export const TaskCoupon_INIT: TaskCoupon = {
  couponId: '',
  pricePerRai: '',
  priceBefore: 0,
  fee: 0,
  discountFee: 0,
  priceCouponDiscountStandard: 0,
  priceCouponDiscount: 0,
  netPrice: 0,
  couponName: '',
}

export interface GetTaskCoupon {
  farmerPlotId: string
  cropName: string
  raiAmount: number
  couponCode: string
  priceCustom?: string
}

export const GetTaskCoupon_INIT: GetTaskCoupon = {
  farmerPlotId: '',
  cropName: '',
  raiAmount: 0,
  couponCode: '',
  priceCustom: '',
}
