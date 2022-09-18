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
  dronerId: string;
  status: string;
  dronerDetail: string[];
}
export const CreateDronerTempEntity_INIT: CreateDronerTempEntity = {
  dronerId: "",
  status: "",
  dronerDetail: [""],
};
