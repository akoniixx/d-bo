import {
  PlotAreaEntity,
  PlotAreaEntity_INIT,
} from "./PlotAreaEntities";
import { LAT_LNG_BANGKOK } from "../definitions/Location";

export interface FarmerPlotEntity {
  id?: string;
  plotName: string;
  raiAmount?: string;
  landmark: string;
  plantName: string;
  plantNature: string;
  plotArea: PlotAreaEntity;
  mapUrl: string;
  lat: string;
  long: string;
  isActive?: boolean;
  locationName: string;
  plotId: number;
  farmerId?: string;
  plotAreaId: number;
  comment?: string;
  status : string;
}
export const FarmerPlotEntity_INIT: FarmerPlotEntity = {
  id: "",
  plotName: "",
  raiAmount: "",
  landmark: "",
  plantName: "",
  plantNature: "",
  plotArea: PlotAreaEntity_INIT,
  mapUrl: "",
  lat: LAT_LNG_BANGKOK.lat,
  long: LAT_LNG_BANGKOK.lng,
  isActive: true,
  locationName: "",
  plotId: 0,
  farmerId: "",
  plotAreaId: 0,
  status : "PENDING"
};
