import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import { DronerEntity, DronerEntity_INIT } from "./DronerEntities";
export interface CreateDronerDrone {
  dronerId: string,
  droneId: string,
  serialNo: string,
  status: string,
}

export const CreateDronerDrone_INIT : CreateDronerDrone = {
  dronerId: "",
  droneId: "",
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
// export const DronerDroneEntity_INIT: DronerDroneEntity = {
//   id: "",
//   dronerId: "",
//   droneId: "",
//   serialNo: "",
//   status: "",
//   droner: [DronerEntity_INIT],
//   drone: [DroneEntity_INIT],
//   createdAt: "",
//   updatedAt: "",
// };

