import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
export interface DronerDroneEntity {
  id?: string,
  modalDroneIndex: number,
  droneName: string,
  logoImagePath: string,
  dronerId: string,
  droneId: string,
  serialNo: string,
  status: string,
}

export const DronerDroneEntity_INIT : DronerDroneEntity = {
  id: "",
  modalDroneIndex: 0,
  droneName: "",
  logoImagePath: "",
  dronerId: "",
  droneId: "",
  serialNo: "",
  status: "",
}


export interface GetDronerDroneEntity {
  id: string;
  dronerId: string;
  droneId: string;
  serialNo: string;
  status: string;
  droner: DronerEntity[];
  drone: DroneEntity[];
}


