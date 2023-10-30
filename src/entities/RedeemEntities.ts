import { string } from 'yup'

export interface RedeemFarmerEntity {
  id: string
  taskNo: string
  createAt: string
  status: string
  usePoint: string
  farmer: {
    firstname: string
    lastname: string
    telephoneNo: string
  }
}
export interface RedeemFarmerListEntity {
  count: number
  data: RedeemFarmerEntity[]
}

export interface DetailRedeemFermerEntity {
  id: string
  taskNo: string
  dateAppointment: string
  createBy: string
  updateBy: string
  createdAt: string
  updatedAt: string
  usePoint: string
  unitPrice: string
  totalPrice: string
  fee: string
  price: string
  discountFee: string
  discountPromotion: string
  discountCampaignPoint: string
  discountCoupon: string
  farmAreaAmount: string
  statusRemark: string
  status: string
  farmer: {
    id: string
    firstname: string
    lastname: string
    nickname: string
    telephoneNo: string
    isDelete: boolean
    address: {
      address1: string
      address2: string
      province: {
        provinceName: string
      }
      district: {
        districtName: string
      }
      subdistrict: {
        subdistrictName: string
        postCode: string
      }
      postcode: string
    }
  }
  dronerId: string
  droner: {
    id: string
    firstname: string
    lastname: string
    nickname: string
    isDelete: boolean
  }
  farmerPlot: {
    plotName: string
    raiAmount: string
    plantName: string
    plotArea: {
      subdistrictName: string
      districtName: string
      provinceName: string
      postCode: string
    }
  }
}

export interface RedeemDronerEntity {
  id: string
  dronerId: string
  campaignName: string
  campaignId: string
  allValue: number
  amountValue: number
  beforeValue: number
  balance: number
  beforeRai: number
  afterRai: number
  rewardId: string
  rewardName: string
  rewardQuantity: number
  createAt: string
  updateAt: string
  campaign: string
  redeemNo: string
  reward: {
    id: string
    rewardName: string
    imagePath: string
    rewardType: string
    rewardNo: string
    score: number
    amount: number
    used: number
    remain: number
    rewardExchange: string
  }
  redeemDetail: {
    redeemStatus: string
    rewardType: string
  }
  mission: {
    id: string
    missionNo: string
    missionName: string
  }
  receiverDetail: {
    firstname: string
    lastname: string
    tel: string
    address: string
  }
}
export interface RedeemDronerListEntity {
  count: number
  data: RedeemDronerEntity[]
}

export interface DetailRedeemDronerEntity {
  id: string
  redeemNo: string
  dronerId: string
  campaignId: string
  campaignName: string
  allValue: number
  amountValue: number
  beforeValue: number
  balance: number
  beforeRai: number
  afterRai: number
  raiAmount: number
  rewardId: string
  rewardName: string
  rewardQuantity: number
  rewardCode: string
  receiverDetail: {
    firstname: string
    lastname: string
    nickname: string
    tel: string
    address: string
  }
  createAt: string
  updateAt: string
  redeemDetail: {
    redeemStatus: string
    rewardType: string
    remark: string
    deliveryCompany: string
    trackingNo: string
    missionName: string
    missionNo: string
    rewardExchange: string
  }
  dronerRedeemHistories: {
    id: string
    remark: string
    status: string
    trackingNo: string
    beforeStatus: string
    createAt: string
    deliveryCompany: string
    dronerTransactionId: string
    branchCode: string
    branchName: string
    redeemCode: string
  }[]
  campaign: string
  reward: {
    id: string
    rewardName: string
    imagePath: string
    rewardType: string
    rewardExchange: string
    rewardQuantity: number
    rewardNo: string
    score: number
    amount: number
    used: number
    remain: number
  }
  mission: {
    id: string
    missionNo: string
    missionName: string
  }
}

export interface UpdateRedeemDronerEntity {
  dronerTransactionId: string | null | '' | undefined
  status: string
  updateBy: string
  deliveryCompany: string
  trackingNo: string
  remark: string
}
export const UpdateRedeemDronerEntity_INIT: UpdateRedeemDronerEntity = {
  dronerTransactionId: '',
  status: '',
  updateBy: '',
  deliveryCompany: '',
  trackingNo: '',
  remark: '',
}
