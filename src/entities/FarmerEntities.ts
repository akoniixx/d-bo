import {
  FullAddressEntity,
  FullAddressEntiry_INIT,
  CreateAddressEntity,
  CreateAddressEntity_INIT,
  AddressEntity,
  AddressEntity_INIT,
} from "./AddressEntities";
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from "./FarmerPlotEntities";
import { ImageEntity, ImageEntity_INTI } from "./UploadImageEntities";

export interface FarmerEntity {
  id: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  addressId: string;
  createdAt: string;
  updatedAt: string;
  address: FullAddressEntity;
  farmerPlot: FarmerPlotEntity[];
}
export const FarmerEntity_INIT: FarmerEntity = {
  id: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  addressId: "",
  createdAt: "",
  updatedAt: "",
  address: FullAddressEntiry_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
};

export interface GetFarmerEntity {
  id: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  address: AddressEntity;
  farmerPlot: FarmerPlotEntity[];
  file: ImageEntity[];
}
export const GetFarmerEntity_INIT: GetFarmerEntity = {
  id: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  address: AddressEntity_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
  file: [ImageEntity_INTI],
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
  status:string,
  address: CreateAddressEntity;
  farmerPlot: FarmerPlotEntity[];
}
export const CreateFarmerEntity_INIT: CreateFarmerEntity = {
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status:"PENDING",
  address: CreateAddressEntity_INIT,
  farmerPlot: [FarmerPlotEntity_INIT],
};
