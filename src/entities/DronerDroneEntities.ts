import { DroneBrandEntity, DroneBrandEntity_INIT } from "./DroneBrandEntities";
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
  modalDroneIndex: number;
  droneName: string;
  logoImagePath: string;
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
  reason: [""];
  status: string;
  droner: DronerEntity[];
  drone: DroneEntity[];
}

export interface DronerDroneListEntity {
  data: GetDronerDroneEntity[];
  count: number;
}
