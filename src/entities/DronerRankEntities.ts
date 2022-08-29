import { FullAddressEntiry_INIT, FullAddressEntity } from "./AddressEntities";

export interface DronerRankEntity {
  id: string;
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
  task: [
    {
      id: string;
      taskNo: string;
      farmerId: string;
      farmerPlotId: string;
      farmAreaAmount: string;
      dronerId: string;
      purposeSprayId: string;
      dateAppointment: string;
      targetSpray: null;
      preparationBy: string;
      createdAt: string;
      updatedAt: string;
      createBy: string;
      updateBy: string;
      distance: string;
      status: string;
      statusRemark: string;
      reviewDronerAvg: string;
      reviewDronerDetail: {
        avg: number;
        taskId: string;
        comment: string;
        canReview: string;
        punctuality: string;
        pilotEtiquette: string;
        sprayExpertise: string;
      };
      unitPrice: null;
      totalPrice: null;
      reviewFarmerScore: null;
      reviewFarmerComment: null;
      imagePathFinishTask: null;
    }
  ];
  createdAt: string;
  updatedAt: string;
  totalTaskCount: number;
  totalRaiCount: number;
  avgrating: number;
}
export const DronerRankEntity_INIT: DronerRankEntity = {
  id: "",
  firstname: "",
  lastname: "",
  idNo: "",
  telephoneNo: "",
  status: "",
  reason: [],
  expYear: 0,
  expMonth: 0,
  expPlant: [],
  address: FullAddressEntiry_INIT,
  task: [
    {
      id: "",
      taskNo: "",
      farmerId: "",
      farmerPlotId: "",
      farmAreaAmount: "",
      dronerId: "",
      purposeSprayId: "",
      dateAppointment: "",
      targetSpray: null,
      preparationBy: "",
      createdAt: "",
      updatedAt: "",
      createBy: "",
      updateBy: "",
      distance: "",
      status: "",
      statusRemark: "",
      reviewDronerAvg: "",
      reviewDronerDetail: {
        avg: 0,
        taskId: "",
        comment: "",
        canReview: "",
        punctuality: "",
        pilotEtiquette: "",
        sprayExpertise: "",
      },
      unitPrice: null,
      totalPrice: null,
      reviewFarmerScore: null,
      reviewFarmerComment: null,
      imagePathFinishTask: null,
    },
  ],
  createdAt: "",
  updatedAt: "",
  totalTaskCount: 0,
  totalRaiCount: 0,
  avgrating: 0,
};
export interface DronerRankListEntity {
  data: DronerRankEntity[];
  count: number;
}