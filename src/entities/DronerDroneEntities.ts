import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "./UploadImageEntities";

export interface DronerDroneEntity {
  id?: string;
  dronerId?: string;
  droneId?: string;
  serialNo: string;
  status: string;
  purchaseYear: string;
  purchaseMonth: string;
  drone: DroneEntity;
  modalDroneIndex: number;
  droneName?: string;
  logoImagePath?: string;
  createdAt: string;
  updatedAt: string;
  img: UploadImageEntity[];
}
export const DronerDroneEntity_INIT: DronerDroneEntity = {
  id: "",
  dronerId: "",
  droneId: "",
  serialNo: "",
  status: "",
  purchaseYear: "",
  purchaseMonth: "",
  drone: DroneEntity_INIT,
  modalDroneIndex: 0,
  droneName: "",
  logoImagePath: "",
  createdAt: "",
  updatedAt: "",
  img: [UploadImageEntity_INTI],
};

export interface GetDronerDroneEntity {
  id: string;
  dronerId: string;
  droneId: string;
  serialNo: string;
  purchaseYear: string;
  purchaseMonth: string;
  status: string;
  createdAt: string;
  updatedAt: string;
 // droner: DronerEntity[];
  drone: DroneEntity[];
}
export const GetDronerDroneEntity_INIT : GetDronerDroneEntity = {
  id: "",
  dronerId: "",
  droneId: "",
  serialNo: "",
  purchaseYear: "",
  purchaseMonth: "",
  status: "",
  createdAt: "",
  updatedAt: "",
  //droner: [DronerEntity_INIT],
  drone: [DroneEntity_INIT],
}

export interface DronerDroneListEntity {
  data: GetDronerDroneEntity[];
  count: number;
}

