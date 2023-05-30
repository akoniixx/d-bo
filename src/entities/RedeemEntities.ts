import { string } from "yup";

export interface RedeemFarmerEntity {
  id: string;
  taskNo: string;
  createAt: string;
  status: string;
  usePoint: string;
  farmer: {
    firstname: string;
    lastname: string;
    telephoneNo: string;
  };
}
export interface RedeemFarmerListEntity {
  count: number;
  data: RedeemFarmerEntity[];
}

export interface DetailRedeemFermerEntity {
  id: string;
  taskNo: string;
  dateAppointment: string;
  createBy: string;
  updateBy: string;
  createdAt: string;
  updatedAt: string;
  usePoint: string;
  unitPrice: string;
  totalPrice: string;
  fee: string;
  price: string;
  discountFee: string;
  discountPromotion: string;
  discountCampaignPoint: string;
  discountCoupon: string;
  farmAreaAmount: string;
  statusRemark: string;
  status: string;
  farmer: {
    id: string;
    firstname: string;
    lastname: string;
    telephoneNo: string;
    address: {
      address1: string;
      address2: string;
      province: {
        provinceName: string;
      };
      district: {
        districtName: string;
      };
      subdistrict: {
        subdistrictName: string;
        postCode: string;
      };
      postcode: string;
    };
  };
  dronerId: string;
  droner: {
    id: string;
    firstname: string;
    lastname: string;
  };
  farmerPlot: {
    plotName: string;
    raiAmount: string;
    plantName: string;
    plotArea: {
      subdistrictName: string;
      districtName: string;
      provinceName: string;
      postCode: string;
    };
  };
}

export interface RedeemDronerEntity {
  id: string;
  dronerId: string;
  campaignName: string;
  campaignId: string;
  allValue: number;
  amountValue: number;
  beforeValue: number;
  balance: number;
  beforeRai: number;
  afterRai: number;
  rewardId: string;
  rewardName: string;
  rewardQuantity: number;
  createAt: string;
  updateAt: string;
  campaign: string;
  reward: {
    id: string;
    rewardName: string;
    imagePath: string;
    rewardType: string;
    rewardNo: string;
    score: number;
    amount: number;
    used: number;
    remain: number;
  };
  mission: string;
  dronerDetail: {
    dronerId: string;
    firstname: string;
    lastname: string;
    telephoneNo: string;
  };
}

export interface DetailRedeemDronerEntity {
  id: string;
  dronerId: string;
  campaignId: string;
  campaignName: string;
  allValue: number;
  amountValue: number;
  beforeValue: number;
  balance: number;
  beforeRai: number;
  afterRai: number;
  raiAmount: number;
  rewardId: string;
  rewardName: string;
  rewardQuantity: number;
  rewardCode: string;
  receiverDetail: string;
  createAt: string;
  updateAt: string;
  dronerRedeemHitories: string[];
  campaign: string;
  reward: {
    id: string;
    rewardName: string;
    imagePath: string;
    rewardType: string;
    rewardNo: string;
    score: number;
    amount: number;
    used: number;
    remain: number;
  };
  mission: string;
  dronerDetail: {
    dronerId: string;
    firstname: string;
    lastname: string;
    telephoneNo: string;
  };
}
