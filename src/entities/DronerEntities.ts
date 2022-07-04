export interface DronerEntity {
  pin: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  expYear: number;
  expMonth: number;
  address: {
    address1: null;
    address2: null;
    address3: null;
    provinceId: null;
    districtId: null;
    subDistrictId: null;
    postcode: null;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  addressId: string;
  imgIdCard: null;
  imgProfle: null;
  id: string;
  createdAt: string;
  updatedAt: string;
}
export const DronerEntity_INIT: DronerEntity = {
  pin: '',
  firstname: '',
  lastname: '',
  idNo: '',
  telephoneNo: '',
  status: '',
  expYear: 0,
  expMonth: 0,
  address: {
    address1: null,
    address2: null,
    address3: null,
    provinceId: null,
    districtId: null,
    subDistrictId: null,
    postcode: null,
    id: '',
    createdAt: '',
    updatedAt: '',
  },
  addressId: '',
  imgIdCard: null,
  imgProfle: null,
  id: '',
  createdAt: '',
  updatedAt: '',
};

export interface DronerListEntity {
  data: DronerEntity[],
  count: number
}

