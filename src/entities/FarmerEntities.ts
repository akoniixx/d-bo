import { FullAddressEntity, FullAddressEntiry_INIT } from "./AddressEntities";
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";

export interface FarmerEntity {
  pin: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  address: FullAddressEntity;
  farmerPlot: FarmerPlotEntity[];
}
export const FarmerEntity_INIT: FarmerEntity = {
  pin: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  address: FullAddressEntiry_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
};

export interface FarmerPageEntity {
  data: FarmerEntity[];
  count: number;
}
export const FarmerPageEntity_INIT: FarmerPageEntity = {
  data: [FarmerEntity_INIT],
  count: 0,
};
