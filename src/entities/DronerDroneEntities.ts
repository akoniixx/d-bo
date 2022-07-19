import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
export interface CreateDronerDrone {
  id?: string;
  dronerId: string,
  droneId: string,
  logoImagePath: string,
  serialNo: string,
  status: string,
  droneListId: number;

}

export const CreateDronerDrone_INIT : CreateDronerDrone = {
  id: "",
  dronerId: "",
  droneId: "",
  logoImagePath: "",
  serialNo: "",
  status: "",
  droneListId: 0
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


