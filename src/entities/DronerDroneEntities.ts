import { DroneBrandEntity, DroneBrandEntity_INIT } from "./DroneBrandEntities";
import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";

export interface DronerDroneEntity {
  id?: string;
  dronerId?: string;
  droneId?: string;
  serialNo: string;
  status: string;
  purchaseYear: string;
  purchaseMonth: string;
  reason: [""];
  modalDroneIndex: number;
  droneName: string;
  logoImagePath: string;
  createdAt: string;
  updatedAt: string;
}
export const DronerDroneEntity_INIT: DronerDroneEntity = {
  id: "",
  dronerId: "",
  droneId: "",
  serialNo: "",
  status: "PENDING",
  purchaseYear: "",
  purchaseMonth: "",
  reason: [""],
  modalDroneIndex: 0,
  droneName: "",
  logoImagePath: "",
  createdAt: "",
  updatedAt: "",
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
  createdAt: string;
  updatedAt: string;
}

export interface DronerDroneListEntity {
  data: GetDronerDroneEntity[];
  count: number;
}
