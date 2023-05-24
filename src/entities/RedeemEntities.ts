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
  discountFee: string;
  discountPromotion: string;
  discountCampaignPoint: string;
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
