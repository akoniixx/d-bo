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
  dronerCode: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  reason: string[];
  expYear: number;
  expMonth: number;
  expPlant: string[];
  address: FullAddressEntity;
  isBookBank: boolean;
  bankName: string;
  bankAccountName: string;
  accountNumber: string;
  isConsentBookBank: boolean;
  otherAddress: FullAddressEntity;
  pin: string;
  dronerDrone?: DronerDroneEntity[];
  dronerArea: DronerAreaEntity;
  file: ImageEntity[];
  createdAt: string;
  updatedAt: string;
  totalDroneCount: number;
  birthDate: string;
  comment?: string;
  createBy?: string;
}
export const DronerEntity_INIT: DronerEntity = {
  id: "",
  dronerCode: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  reason: [""],
  expYear: 0,
  expMonth: 0,
  expPlant: [""],
  address: FullAddressEntiry_INIT,
  isBookBank: false,
  bankName: "",
  bankAccountName: "",
  accountNumber: "",
  isConsentBookBank: false,
  otherAddress: FullAddressEntiry_INIT,
  pin: "",
  dronerDrone: [DronerDroneEntity_INIT],
  dronerArea: DronerAreaEntity_INIT,
  file: [ImageEntity_INTI],
  createdAt: "",
  updatedAt: "",
  totalDroneCount: 0,
  birthDate: "",
};
export interface CreateDronerEntity {
  id?: string;
  firstname: string;
  lastname: string;
  idNo: string;
  telephoneNo: string;
  status: string;
  expYear: number;
  expMonth: number;
  expPlant: string[];
  address: CreateAddressEntity;
  isBookBank: boolean;
  bankName: string;
  bankAccountName: string;
  accountNumber: string;
  isConsentBookBank: boolean;
  otherAddress: CreateAddressEntity;
  pin: string;
  dronerDrone: DronerDroneEntity[];
  file: ImageEntity[];
  dronerArea: DronerAreaEntity;
  birthDate: string;
}

export const CreateDronerEntity_INIT: CreateDronerEntity = {
  id: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "PENDING",
  expYear: 0,
  expMonth: 0,
  expPlant: [""],
  address: CreateAddressEntity_INIT,
  isBookBank: false,
  bankName: "",
  bankAccountName: "",
  accountNumber: "",
  isConsentBookBank: false,
  otherAddress: CreateAddressEntity_INIT,
  pin: "123456",
  dronerDrone: [DronerDroneEntity_INIT],
  file: [ImageEntity_INTI],
  dronerArea: DronerAreaEntity_INIT,
  birthDate: "",
};

export interface DronerListEntity {
  data: DronerEntity[];
  count: number;
}
