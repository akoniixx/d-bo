export interface DronerEntity {
  id: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  expYear: 0;
  expMonth: 0;
  expPlant: string;
  address: {
    id: string;
    address1: string;
    address2: string;
    address3: string;
    provinceId: 0;
    districtId: 0;
    subsistrictId: 0;
    postcode: string;
    province: {
      provinceId: 0;
      provinceName: string;
      region: string;
    };
    district: {
      districtId: 0;
      districtName: string;
      provinceId: 0;
      provinceName: string;
    };
    subdistrict: {
      subdistrictId: 0;
      subdistrictName: string;
      districtId: 0;
      districtName: string;
      provinceId: 0;
      provinceName: string;
      lat: string;
      long: string;
      postcode: string;
    };
  };
  dronerDrone: [
    {
      id: string;
      dronerId: string;
      droneId: string;
      serialNo: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  dronerArea: {
    id: string;
    dronerId: string;
    provinceId: 0;
    districtId: 0;
    subdistrictId: 0;
    lat: string;
    long: string;
    distance: string;
    createdAt: string;
    updatedAt: string;
  };
  pin: string;
}

export const DronerEntity_INIT: DronerEntity = {
  id: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  expYear: 0,
  expMonth: 0,
  expPlant: "",
  address: {
    id: "",
    address1: "",
    address2: "",
    address3: "",
    provinceId: 0,
    districtId: 0,
    subsistrictId: 0,
    postcode: "",
    province: {
      provinceId: 0,
      provinceName: "",
      region: "",
    },
    district: {
      districtId: 0,
      districtName: "",
      provinceId: 0,
      provinceName: "",
    },
    subdistrict: {
      subdistrictId: 0,
      subdistrictName: "",
      districtId: 0,
      districtName: "",
      provinceId: 0,
      provinceName: "",
      lat: "",
      long: "",
      postcode: "",
    },
  },
  dronerDrone: [
    {
      id: "",
      dronerId: "",
      droneId: "",
      serialNo: "",
      status: "",
      createdAt: "",
      updatedAt: "",
    }
  ],
  dronerArea: {
    id: "",
    dronerId: "",
    provinceId: 0,
    districtId: 0,
    subdistrictId: 0,
    lat: "",
    long: "",
    distance: "",
    createdAt: "",
    updatedAt: "",
  },
  pin: "",
};

export interface DronerListEntity {
  data: DronerEntity[];
  count: number;
}
