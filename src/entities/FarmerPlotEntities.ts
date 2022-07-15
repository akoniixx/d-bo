import { AddressEntity, AddressEntity_INIT } from "./AddressEntities";

export interface FarmerPlotEntity {
  plotName: string;
  raiAmount: number;
  landmark: string;
  plantName: string;
  plantNature: string;
  mapUrl: string;
  lat: string;
  long: string;
  isActive: boolean;
  plotId: number;
}
export const FarmerPlotEntity_INIT: FarmerPlotEntity = {
  plotName: "",
  raiAmount: 0,
  landmark: "",
  plantName: "",
  plantNature: "",
  mapUrl: "",
  lat: "",
  long: "",
  isActive: true,
  plotId: 0,
};
