import { color } from "../resource";

export const STATUS_NORMAL_MAPPING: any = {
  true: "ใช้งาน",
  false: "ไม่ใช้งาน",
};

export const STATUS_FARMERPLOT_COLOR_MAPPING: any = {
  true: color.Success,
  false: color.Error,
};

export const STATUS_FARMER_MAPPING: any = {
  PENDING: "รอยืนยันตัวตน",
  ACTIVE: "ใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
};

export const STATUS_COLOR_MAPPING: any = {
  PENDING: "#EA973E",
  ACTIVE: color.Success,
  INACTIVE: color.Error,
};

export const FARMER_STATUS_SEARCH = [
  { value: "PENDING", name: "รอยืนยันตัวตน" },
  { value: "ACTIVE", name: "ใช้งาน" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
];

export const STATUS_NEWTASK_MAPPING: any = {
  WAIT_RECEIVE: "ไม่มีนักบินรับงาน",
  WAIT_START: "รอนักบินโดรนรับงาน",
};
export const NEWTASK_STATUS_SEARCH = [
  { value: "WAIT_RECEIVE", name: "ไม่มีนักบินรับงาน" },
  { value: "WAIT_RECEIVE", name: "รอนักบินโดรนรับงาน" },
];
export const STATUS_NEWTASK_COLOR_MAPPING: any = {
  ไม่มีนักบินรับงาน: color.Error,
  รอนักบินโดรนรับงาน: "#EA973E",
};

export const TASK_TODAY_STATUS : any = {
  WAIT_START : "รอเริ่มงาน",
  IN_PROGRESS : "กำลังดำเนินงาน",
}
export const TASK_TODAY_STATUS_MAPPING : any = {
  ACTIVE : "สะดวก",
  INACTIVE : "ไม่สะดวก"
}
export const TASKTODAY_STATUS: any = [
  { value: "WAIT_START", name: "รอเริ่มงาน" },
  { value: "IN_PROGRESS", name: "กำลังดำเนินงาน" },
  { value: "CANCELED", name: "ยกเลิก" },
];
export const TASKTODAY_STATUS1: any = [

  { value: "IN_PROGRESS", name: "กำลังดำเนินงาน" },
  { value: "CANCELED", name: "ยกเลิก" },
];
export const REDIO_WAIT_START = [
  { key: 0, name: "ปกติ", isChecked: false },
  { key: 1, name: "งานมีปัญหา", isChecked: false },
];
export const REDIO_IN_PROGRESS = [
  { key: 0, name: "ปกติ", isChecked: false },
  { key: 1, name: "รออนุมัติการขยายเวลา", isChecked: false },
  { key: 2, name: "อนุมัติขยายเวลา", isChecked: false },
  { key: 3, name: "งานมีปัญหา", isChecked: false },
];

export const STATUS_COLOR_TASK_TODAY: any = {
  WAIT_START: color.secondary3,
  IN_PROGRESS: color.primary1,
};
export const STATUS_IS_PROBLEM: any = {
  true: "งานมีปัญหา",
  false: "ปกติ",
};
export const STATUS_IS_DELAY: any = {
  true: "ขยายเวลา",
  false: "ปกติ",
};
export const STATUS_DELAY = [
  { value: "WAIT_APPROVE", name: "รออนุมัติขยายเวลา" },
  { value: "APPROVE", name: "อนุมัติขยายเวลา" },
  { value: "EXTENDED", name: "ขยายเวลา" },
  { value: "REJECT", name: "งานมีปัญหา" },
]
export const STATUS_SUMMARY = [
  { value: "inprogressnormal", name: "ปกติ" },
  { value: "inprogressproblem", name: "งานมีปัญหา" },
  { value: "waitstartnormal", name: "ปกติ" },
  { value: "waitstartproblem", name: "งานมีปัญหา" },
  { value: "waitapprovedelay", name: "รออนุมัติขยายเวลา" },
  { value: "extended", name: "อนุมัติขยายเวลา" },
]
export const STATUS_INPROGRESS = [
  { value: "inprogressnormal", name: "ปกติ", isChecked: false },
  { value: "waitapprovedelay", name: "รออนุมัติขยายเวลา", isChecked: false },
  { value: "extended", name: "อนุมัติขยายเวลา", isChecked: false },
  { value: "inprogressproblem", name: "งานมีปัญหา", isChecked: false },
];
export const STATUS_WAITSTART = [
  { value: "waitstartnormal", name: "ปกติ", isChecked: false },
  { value: "waitstartproblem", name: "งานมีปัญหา", isChecked: false },
];

