export interface TaskDronerTempEntity {
  id: string;
  taskId: string;
  dronerId: string;
  status: any;
  distance: string;
  createdAt: string;
  dronerDetail: string;
  isChecked: boolean;
}
export const TaskDronerTempEntity_INIT: TaskDronerTempEntity = {
  id: "",
  taskId: "",
  dronerId: "",
  status: "",
  distance: "",
  createdAt: "",
  dronerDetail: "",
  isChecked: false,
};
export interface CreateDronerTempEntity {
  taskId?: string;
  dronerId: string;
  status: string;
  dronerDetail: string[];
}
export const CreateDronerTempEntity_INIT: CreateDronerTempEntity = {
  taskId: "",
  dronerId: "",
  status: "",
  dronerDetail: [""],
};
export interface DeletedDronerTemp {
  taskId: string;
  dronerId: string;
}
export const DeletedDronerTemp_INIT : DeletedDronerTemp = {
  taskId: "",
  dronerId: "",
}