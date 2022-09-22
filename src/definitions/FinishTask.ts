import color from "../resource/color";

export const FINISH_TASK: any = {
    WAIT_REVIEW: "รอรีวิว",
    DONE: "เสร็จสิ้น",
    CANCELED: "ยกเลิก"
  };
  export const FINISH_TASK_SEARCH = [
    { value: "WAIT_REVIEW", name: "รอรีวิว" },
    { value: "DONE", name: "เสร็จสิ้น" },
    { value: "CANCELED", name: "ยกเลิก" }
  ];

export const STATUS_COLOR_TASK: any = {
    WAIT_REVIEW: "#2F80ED",
    DONE: color.Success,
    CANCELED: color.Error,
  };
  export const RATE_SELECT: any = [
    { value: "1", name: "1" },
    { value: "2", name: "2" },
    { value: "3", name: "3" },
    { value: "4", name: "4" },
    { value: "5", name: "5" },
  ];
  export const TASK_HISTORY: any = {
    WAIT_START: "รอเริ่มงาน",
    IN_PROGRESS: "กำลังดำเนินงาน",
  };
