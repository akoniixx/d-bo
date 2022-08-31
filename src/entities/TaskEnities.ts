import { FarmerEntity, FarmerEntity_INIT } from './FarmerEntities';
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from './FarmerPlotEntities';
import { DronerEntity, DronerEntity_INIT } from './DronerEntities';
export interface taskEntity {
  data: {
    id: string;
    taskNo: string;
    farmerId: string;
    farmerPlotId: string;
    farmAreaAmount: string;
    dronerId: string;
    purposeSprayId: null;
    dateAppointment: string;
    targetSpray: string;
    preparationBy: string;
    createdAt: string;
    updatedAt: string;
    createBy:string;
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
      pilotEtiquette:string;
      sprayExpertise: string;
    };
    unitPrice: null;
    totalPrice: null;
    reviewFarmerScore: string;
    reviewFarmerComment: string;
    imagePathFinishTask: string;
    purposeSpray: null;
    farmer: FarmerEntity;
    droner: DronerEntity;
    farmerPlot: FarmerPlotEntity;
    taskDronerTemp: [
      {
        id: string;
        taskId: string;
        dronerId: string;
        status: string;
        distance: string;
        createdAt: string;
        dronerDetail: null;
      },
    ];
  };
  image_profile_url: {};
}
export const taskEntity_INIT: taskEntity = {
    data: {
        id:"",
        taskNo:"",
        farmerId:"",
        farmerPlotId:"",
        farmAreaAmount:"",
        dronerId:"",
        purposeSprayId: null,
        dateAppointment:"",
        targetSpray:"",
        preparationBy:"",
        createdAt:"",
        updatedAt:"",
        createBy: "",
        updateBy:"",
        distance:"",
        status:"",
        statusRemark:"",
        reviewDronerAvg:"",
        reviewDronerDetail: {
          avg: 0,
          taskId:"",
          comment:"",
          canReview:"",
          punctuality:"",
          pilotEtiquette:"",
          sprayExpertise:"",
        },
        unitPrice: null,
        totalPrice: null,
        reviewFarmerScore:"",
        reviewFarmerComment:"",
        imagePathFinishTask:"",
        purposeSpray: null,
        farmer: FarmerEntity_INIT,
        droner: DronerEntity_INIT,
        farmerPlot: FarmerPlotEntity_INIT,
        taskDronerTemp: [
          {
            id:"",
            taskId:"",
            dronerId:"",
            status:"",
            distance:"",
            createdAt:"",
            dronerDetail: null,
          },
        ],
      },
      image_profile_url: {},
}
