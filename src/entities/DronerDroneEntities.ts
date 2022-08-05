import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity } from "./DronerEntities";
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
  reason: [""];
  status: string;
  createdAt: string;
  updatedAt: string;
  droner: DronerEntity[];
  drone: DroneEntity[];
}

export interface DronerDroneListEntity {
  data: GetDronerDroneEntity[];
  count: number;
}
