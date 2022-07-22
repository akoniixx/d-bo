import { DronerDroneEntity, DronerDroneEntity_INIT } from './DronerDroneEntities';
import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import {
  FullAddressEntiry_INIT,
  FullAddressEntity,
  CreateAddressEntity,
  CreateAddressEntity_INIT,
} from "./AddressEntities";

export interface DronerEntity {
  id: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  expYear: number;
  expMonth: number;
  expPlant: string[];
  address: FullAddressEntity;
  pin: string;
  dronerDrone: DronerDroneEntity[];
  dronerArea: string;
  createdAt: string;
  updatedAt: string;
  totalDroneCount: number;
}
export const DronerEntity_INIT: DronerEntity = {
  id: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  expYear: 0,
  expMonth: 0,
  expPlant: [],
  address: FullAddressEntiry_INIT,
  pin: "",
  dronerDrone: [DronerDroneEntity_INIT],
  dronerArea: "",
  createdAt: "",
  updatedAt: "",
  totalDroneCount: 0,
};
export interface CreateDronerEntity {
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  expYear: number;
  expMonth: number;
  expPlant: string[];
  address: CreateAddressEntity;
  pin: string;
  dronerDrone: DronerDroneEntity[];
  // dronerArea: CreateDronerAreaEntity;
}

export const CreateDronerEntity_INIT: CreateDronerEntity = {
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "OPEN",
  expYear: 0,
  expMonth: 0,
  expPlant: [],
  address: CreateAddressEntity_INIT,
  pin: "123456",
  dronerDrone: [DronerDroneEntity_INIT],
  // dronerArea: CreateDronerAreaEntity_INIT,
};

export interface DronerListEntity {
  data: DronerEntity[];
  count: number;
}
