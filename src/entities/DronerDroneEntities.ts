import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
export interface CreateDronerDrone {
  modalDroneIndex: number,
  dronerId: string,
  droneId: string,
  logoImagePath: string,
  droneName: string,
  serialNo: string,
  status: string,

}

export const CreateDronerDrone_INIT : CreateDronerDrone = {
  modalDroneIndex: 0,
  dronerId: "",
  droneId: "",
  logoImagePath: "",
  droneName:"",
  serialNo: "",
  status: "",
}
export interface DronerDroneEntity {
  id: string;
  dronerId: string;
  droneId: string;
  serialNo: string;
  status: string;
  droner: DronerEntity[];
  drone: DroneEntity[];
  createdAt: string;
  updatedAt: string;
}

