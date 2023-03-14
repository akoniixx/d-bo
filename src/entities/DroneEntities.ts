import { ImageEntity, ImageEntity_INTI } from "./UploadImageEntities";
import { DroneBrandEntity, DroneBrandEntity_INIT } from "./DroneBrandEntities";

export interface DroneEntity {
  id: string;
  droneBrandId: string;
  series: string;
  droneBrand: DroneBrandEntity;
  file: ImageEntity[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  droneId: number;
}

export const DroneEntity_INIT: DroneEntity = {
  id: "",
  droneBrandId: "",
  series: "",
  droneBrand: DroneBrandEntity_INIT,
  file: [ImageEntity_INTI],
  isActive: true,
  createdAt: "",
  updatedAt: "",
  droneId: 0
};

export interface DroneListEntity {
  data: DroneEntity[];
  count: number;
}
