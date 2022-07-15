import { FullAddressEntity, FullAddressEntiry_INIT, AddressEntity, AddressEntity_INIT } from "./AddressEntities";
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";

export interface FarmerEntity {
  
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  address: FullAddressEntity;
  farmerPlot: FarmerPlotEntity[];
}
export const FarmerEntity_INIT: FarmerEntity = {
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
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

export interface CreateFarmerEntity {
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  address: AddressEntity;
  farmerPlot: FarmerPlotEntity[];
}
export const CreateFarmerEntity_INIT : CreateFarmerEntity ={
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  address: AddressEntity_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
}
