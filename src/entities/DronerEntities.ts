import { DroneEntity, DroneEntity_INIT } from './DroneEntities';
import { AddressEntity, AddressEntity_INIT, AddrSubDisEntity, AddrSubDisEntity_INIT } from "./AddressEntities";
import { CreateDronerDrone, CreateDronerDrone_INIT } from './DronerDroneEntities';
import { CreateDronerAreaEntity, CreateDronerAreaEntity_INIT } from './DronerAreaEntities';
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
  address: AddrSubDisEntity;
  pin: string;
  dronerDrone: DroneEntity;
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
  expPlant: [""],
  address: AddrSubDisEntity_INIT,
  pin: "",
  dronerDrone: DroneEntity_INIT,
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
  address: AddressEntity;
  pin: string;
  dronerDrone: CreateDronerDrone[];
  // dronerArea: CreateDronerAreaEntity;
}

export const CreateDronerEntity_INIT : CreateDronerEntity = {
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "OPEN",
  expYear: 0,
  expMonth: 0,
  expPlant: [""],
  address: AddressEntity_INIT,
  pin: "123456",
  dronerDrone: [CreateDronerDrone_INIT],
  // dronerArea: CreateDronerAreaEntity_INIT,
}

export interface DronerListEntity {
  data: DronerEntity[];
  count: number;
}
