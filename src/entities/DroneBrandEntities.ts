import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";

export interface UpdateDroneEntity {
  droneBrandId: string;
  series: string;
  isActive: boolean;
  id: string;
}
export const UpdateDroneEntity_INIT: UpdateDroneEntity = {
  droneBrandId: "",
  series: "",
  isActive: true,
  id: "",
};
export interface DroneBrandEntity {
  id: string;
  name: string;
  logoImagePath: string;
  drone: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export const DroneBrandEntity_INIT: DroneBrandEntity = {
  id: "",
  name: "",
  logoImagePath: "",
  drone: 0,
  isActive: true,
  createdAt: "",
  updatedAt: "",
};
export interface CreateDroneEntity {
  id?: string;
  droneBrandId?: string;
  droneId: number;
  series: string;
  isActive: boolean;
}
export const CreateDroneEntity_INIT: CreateDroneEntity = {
  id: "",
  droneBrandId: "",
  droneId: 0,
  series: "",
  isActive: true,
};
export interface CreateDroneBrandEntity {
  name: string;
  logoImagePath: string;
  isActive: boolean;
  drone: CreateDroneEntity[];
}
export const CreateDroneBrandEntity_INIT: CreateDroneBrandEntity = {
  name: "",
  logoImagePath: "",
  isActive: true,
  drone: [CreateDroneEntity_INIT],
};
export interface DroneBrandListEntity {
  data: DroneBrandEntity[];
  count: number;
}
export interface UpdateDroneBrand {
  name: string;
  logoImagePath: string;
  isActive: boolean;
  id: string;
  drone: [UpdateDroneEntity];
}