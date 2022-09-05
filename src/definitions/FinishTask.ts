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