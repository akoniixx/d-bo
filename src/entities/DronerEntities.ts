import { DronerAreaEntity, DronerAreaEntity_INIT } from "./DronerAreaEntities";
import { ImageEntity, ImageEntity_INTI } from "./UploadImageEntities";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
} from "./DronerDroneEntities";
import { DroneEntity, DroneEntity_INIT } from "./DroneEntities";
import {
  AddressEntity,
  FullAddressEntiry_INIT,
  FullAddressEntity,
  AddressEntity_INIT,
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
  reason : string[];
  expYear: number;
  expMonth: number;
  expPlant: string[];
  address: FullAddressEntity;
  pin: string;
  dronerDrone: DronerDroneEntity[];
  dronerArea: DronerAreaEntity;
  file: ImageEntity[];
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
  reason:[""],
  expYear: 0,
  expMonth: 0,
  expPlant: [""],
  address: FullAddressEntiry_INIT,
  pin: "",
  dronerDrone: [DronerDroneEntity_INIT],
  dronerArea: DronerAreaEntity_INIT,
  file: [ImageEntity_INTI],
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
  file: ImageEntity[];
  dronerArea: DronerAreaEntity;
}

export const CreateDronerEntity_INIT: CreateDronerEntity = {
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "PENDING",
  expYear: 0,
  expMonth: 0,
  expPlant: [""],
  address: CreateAddressEntity_INIT,
  pin: "123456",
  dronerDrone: [DronerDroneEntity_INIT],
  file: [ImageEntity_INTI],
  dronerArea: DronerAreaEntity_INIT,
};

export interface DronerListEntity {
  data: DronerEntity[];
  count: number;
}
