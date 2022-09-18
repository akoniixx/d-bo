import { DronerEntity,DronerEntity_INIT } from "./DronerEntities";
import { FarmerEntity, FarmerEntity_INIT } from "./FarmerEntities";
export interface TaskInprogressEntity {
  count: number;
  summary: {
    inprogressnormal: string;
    inprogressproblem: string;
    waitstartnormal: string;
    waitstartproblem: string;
    waitapprovedelay: string;
    extended: string;
  };
  data: [
    {
      id: string;
      taskNo: string;
      farmerId: string;
      farmerPlotId: string;
      farmAreaAmount: string;
      dronerId: string;
      purposeSprayId: null;
      dateAppointment: string;
      targetSpray: string[];
      preparationBy: string;
      createdAt: string;
      updatedAt: string;
      createBy: string;
      updateBy: null;
      distance: string;
      status: string;
      statusRemark: string;
      reviewDronerAvg: null;
      reviewDronerDetail: null;
      unitPriceStandard: string;
      priceStandard: string;
      unitPrice: string;
      price: string;
      totalPrice: string;
      fee: string;
      discountFee: string;
      reviewFarmerScore: null;
      reviewFarmerComment: null;
      imagePathFinishTask: null;
      comment: string;
      isProblem: false;
      problemRemark: null;
      isDelay: false;
      delayRemark: null;
      dateDelay: null;
      statusDelay: null;
      delayRejectRemark: null;
      farmer: FarmerEntity;
      droner: DronerEntity;
    }
  ];
}
export const TaskInprogressEntity_INIT : TaskInprogressEntity = {
    count: 0,
    summary: {
      inprogressnormal: "",
      inprogressproblem: "",
      waitstartnormal: "",
      waitstartproblem: "",
      waitapprovedelay: "",
      extended: "",
    },
    data: [
      {
        id: "",
        taskNo: "",
        farmerId: "",
        farmerPlotId: "",
        farmAreaAmount: "",
        dronerId: "",
        purposeSprayId: null,
        dateAppointment: "",
        targetSpray: [""],
        preparationBy: "",
        createdAt: "",
        updatedAt: "",
        createBy: "",
        updateBy: null,
        distance: "",
        status: "",
        statusRemark: "",
        reviewDronerAvg: null,
        reviewDronerDetail: null,
        unitPriceStandard: "",
        priceStandard: "",
        unitPrice: "",
        price: "",
        totalPrice: "",
        fee: "",
        discountFee: "",
        reviewFarmerScore: null,
        reviewFarmerComment: null,
        imagePathFinishTask: null,
        comment: "",
        isProblem: false,
        problemRemark: null,
        isDelay: false,
        delayRemark: null,
        dateDelay: null,
        statusDelay: null,
        delayRejectRemark: null,
        farmer: FarmerEntity_INIT,
        droner: DronerEntity_INIT,
      }
    ]
}
export interface summaryEntity {
  inprogressnormal: string;
  inprogressproblem: string;
  waitstartnormal: string;
  waitstartproblem: string;
  waitapprovedelay: string;
  extended: string;
}
export const summaryEntity_INIT : summaryEntity = {
  inprogressnormal: "",
  inprogressproblem: "",
  waitstartnormal: "",
  waitstartproblem: "",
  waitapprovedelay: "",
  extended: "",
}
export interface TaskTodayListEntity {
  data: TaskInprogressEntity[];
  count: number;
  summary: summaryEntity
}