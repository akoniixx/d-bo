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
  price: number;
  plant_name: string;
}
export const PricePlantsEntity_INIT: PricePlantsEntity = {
  price: 0,
  plant_name: ""
};
export interface AllLocatePriceEntity {
  province_name: string;
  count_district: number;
  count_subdistrict: number;
  max_price: number;
  min_price: number;
  update_at: string;
  plants: [PricePlantsEntity];
}
export const AllLocatePriceEntity_INIT: AllLocatePriceEntity = {
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
