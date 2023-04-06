export interface TaskHistoryEntity {
    action: string;
    afterValue: string;
    beforeValue: string;
    createdAt: string;
    createdBy: string;
    remark: string;
    taskHistoryId: string;
    taskId: string;
  }
  export const TaskHistoryEntity_INIT: TaskHistoryEntity = {
    action: "",
    afterValue: "",
    beforeValue: "",
    createdAt: "",
    createdBy: "",
    remark: "",
    taskHistoryId: "",
    taskId: "",
  };