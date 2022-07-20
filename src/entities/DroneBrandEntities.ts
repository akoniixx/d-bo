import { CreateDroneEntity, CreateDroneEntity_INIT } from "./DroneEntities";
export interface DroneBrandEntity {
  id: string;
  name: string;
  logoImagePath: string;
  droneName: string,
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export const DroneBrandEntity_INIT : DroneBrandEntity = {
  id: "",
  name: "",
  logoImagePath: "",
  droneName:"",
  isActive: true,
  createdAt: "",
  updatedAt: ""
}

export interface CreateDroneBrandEntity {
  name: string;
  isActive: boolean;
  drone: CreateDroneEntity
}
export interface DroneBrandListEntity {
  data: DroneBrandEntity[];
  count: number;
}

