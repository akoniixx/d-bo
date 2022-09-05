import { LAT_LNG_BANGKOK } from "../definitions/Location";

export interface FarmerPlotEntity {
  id?: string;
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
  farmerId?: string;
  plotAreaId: number;
  locationName: string;
}
export const FarmerPlotEntity_INIT: FarmerPlotEntity = {
  id: "",
  plotName: "",
  raiAmount: 0,
  landmark: "",
  plantName: "",
  plantNature: "",
  mapUrl: "",
  lat: LAT_LNG_BANGKOK.lat,
  long: LAT_LNG_BANGKOK.lng,
  isActive: true,
  plotId: 0,
  farmerId: "",
  plotAreaId: 0,
  locationName: "",
};
