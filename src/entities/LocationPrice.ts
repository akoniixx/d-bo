export interface LocationPriceEntity {
  id: string;
  provinceId: number;
  cropName: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  updateAt: string;
}
export interface PricePlantsEntity {
  province_name: string;
  id: string;
  price: number;
  plant_name: string;
}
export const PricePlantsEntity_INIT: PricePlantsEntity = {
  province_name: "",
  id: "",
  price: 0,
  plant_name: "",
};
export interface AllLocatePriceEntity {
  province_id: string;
  province_name: string;
  count_district: number;
  count_subdistrict: number;
  max_price: number;
  min_price: number;
  update_at: string;
  plants: [PricePlantsEntity];
}
export const AllLocatePriceEntity_INIT: AllLocatePriceEntity = {
  province_id: "",
  province_name: "",
  count_district: 0,
  count_subdistrict: 0,
  max_price: 0,
  min_price: 0,
  update_at: "",
  plants: [PricePlantsEntity_INIT],
};

export interface LocationPricePageEntity {
  data: AllLocatePriceEntity[];
  count: number;
}

export interface UpdateLocationPriceList {
  location_price_id: string;
      price: number;
}
export const UpdateLocationPriceList_INIT: UpdateLocationPriceList = {
  location_price_id: "",
  price: 0,
};
export interface UpdateLocationPrice {
  priceData: UpdateLocationPriceList[];
  // priceData: [
  //   {
  //     location_price_id: string;
  //     price: number;
  //   }
  // ];
}
export const UpdateLocationPrice_INIT: UpdateLocationPrice = {
  priceData: [UpdateLocationPriceList_INIT],
  // priceData: [
  //   {
  //     location_price_id: "",
  //     price: 0,
  //   },
  // ],
};
