import { ImageEntity, ImageEntity_INTI } from './UploadImageEntities';
import { DroneBrandEntity, DroneBrandEntity_INIT } from "./DroneBrandEntities";

export interface DroneEntity {
  id: string;
  droneBrandId: string;
  series: string;
  droneBrand: DroneBrandEntity;
  file: ImageEntity[];
  createdAt: string;
  updatedAt: string;
}

export const DroneEntity_INIT: DroneEntity = {
  id: "",
  droneBrandId: "",
  series: "",
  droneBrand: DroneBrandEntity_INIT,
  file: [ImageEntity_INTI],
  createdAt: "",
  updatedAt: "",
};

export interface UpdateDroneEntity {
  droneBrandId: string;
  series: string;
  id: string;
}
export const UpdateDroneEntity_INIT: UpdateDroneEntity = {
  droneBrandId: "",
  series: "",
  id: "",
};

export interface CreateDroneEntity {
  droneBrandId: string;
  series: string;
}
export const CreateDroneEntity_INIT: CreateDroneEntity = {
  droneBrandId: "",
  series: "",
};

export interface DroneListEntity {
  data: DroneEntity[];
  count: number;
}
