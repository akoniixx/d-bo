import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
import {
  ImageEntity,
  ImageEntity_INTI,
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
  status: string;
  purchaseYear: string;
  purchaseMonth: string;
  reason: string[];
  drone: DroneEntity;
  // droner: DronerEntity;
  file: ImageEntity[];
  createdAt: string;
  updatedAt: string;
}
export const GetDronerDroneEntity_INIT : GetDronerDroneEntity = {
  id: "",
  dronerId: "",
  droneId: "",
  serialNo: "",
  status: "",
  purchaseYear: "",
  purchaseMonth: "",
  reason: [""],
  drone: DroneEntity_INIT,
  // droner: DronerEntity_INIT,
  file: [ImageEntity_INTI],
  createdAt: "",
  updatedAt: "",
}

export interface DronerDroneListEntity {
  data: GetDronerDroneEntity[];
  count: number;
}

