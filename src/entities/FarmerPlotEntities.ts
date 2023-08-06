import { PlotAreaEntity, PlotAreaEntity_INIT } from "./PlotAreaEntities";
import { LAT_LNG_BANGKOK } from "../definitions/Location";
import { FarmerEntity } from "./FarmerEntities";

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
  status: string;
  plantCharacteristics: string[]
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
  status: "PENDING",
  plantCharacteristics: []
};

export interface PlotEntity {
  id: string;
  plotName: string;
  raiAmount: string;
  landmark: string;
  plantName: string;
  plantNature: string;
  mapUrl: string;
  lat: string;
  long: string;
  locationName: string;
  farmerId: string;
  plotAreaId: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isDelete: boolean;
  reason: string;
  status: string;
  comment: string;
  dateWaitPending: string;
  farmer: FarmerEntity;
  plotArea: FarmerPlotEntity;
}
export interface SummaryPlotEntity {
  count_active: string;
  count_inactive: string;
  count_pending: string;
  count_reject: string;
}

export interface SumPlotEntity {
  data: PlotEntity[];
  count: number;
  summar: SummaryPlotEntity[];
}
