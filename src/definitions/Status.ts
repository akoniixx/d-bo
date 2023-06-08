import { color } from "../resource";

export const STATUS_NORMAL_MAPPING: any = {
  PENDING: "รอยืนยันตัวแปลง",
  ACTIVE: "ใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
  REJECTED: "ไม่อนุมัติ",
};

export const STATUS_FARMERPLOT_COLOR_MAPPING: any = {
  PENDING: "#EA973E",
  ACTIVE: color.Success,
  INACTIVE: color.Error,
  REJECTED: color.Error,
};

export const STATUS_FARMER_MAPPING: any = {
  PENDING: "รอยืนยันตัวตน",
  ACTIVE: "ใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
  REJECTED: "ไม่อนุมัติ",
  OPEN: "ข้อมูลไม่ครบถ้วน",
};

export const STATUS_COLOR_MAPPING: any = {
  PENDING: "#EA973E",
  ACTIVE: color.Success,
  REJECTED: color.Error,
  INACTIVE: color.Error,
  OPEN: color.Grey,
  DRAFTING: color.Grey,
};

export const FARMER_STATUS_SEARCH = [
  { value: "OPEN", name: "ยังไม่เปิดใช้งาน" },
  { value: "PENDING", name: "รอยืนยันตัวตน" },
  { value: "ACTIVE", name: "ใช้งาน" },
  { value: "REJECTED", name: "ไม่อนุมัติ" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
];

export const STATUS_NEWTASK_MAPPING: any = {
  WAIT_RECEIVE: "ไม่มีนักบินโดรนรับงาน",
  REJECTED: "นักบินโดรนไม่รับงาน",
  CANCELED: "ไม่มีนักบินโดรนรับงาน",
  RECEIVED: "นักบินโดรนรับงานแล้ว",
};
export const NEWTASK_STATUS_SEARCH = [
  { value: "WAIT_RECEIVE", name: "ไม่มีนักบินรับงาน" },
  { value: "WAIT_RECEIVE", name: "รอนักบินโดรนรับงาน" },
];
export const STATUS_NEWTASK_COLOR_MAPPING: any = {
  ไม่มีนักบินรับงาน: color.Error,
  รอนักบินโดรนรับงาน: "#EA973E",
};
export const STATUS_EN_NEWTASK_COLOR_MAPPING: any = {
  WAIT_RECEIVE: color.Error,
  REJECTED: color.Error,
  CANCELED: color.Error,
  RECEIVED: color.Success,
};
export const STATUS_INDEX_FINISHTASK = [
  { value: "WAIT_START", name: "รอเริ่มงาน" },
  { value: "IN_PROGRESS", name: "กำลังดำเนินงาน" },
];
export const STATUS_INPROGRESS_CHECKBOX = [
  {
    key: "0",
    value: "WAIT_START",
    name: "รอดำเนินงาน",
  },
  {
    key: "1",
    value: "CANCELED",
    name: "ยกเลิกงาน",
  },
];

export const TASK_TODAY_STATUS: any = {
  WAIT_START: "รอเริ่มงาน",
  IN_PROGRESS: "กำลังดำเนินงาน",
};
export const TASK_TODAY_STATUS_MAPPING: any = {
  ACTIVE: "สะดวก",
  INACTIVE: "ไม่สะดวก",
};
export const TASKTODAY_STATUS: any = [
  { key: "0", value: "WAIT_START", name: "รอเริ่มงาน" },
  { key: "1", value: "IN_PROGRESS", name: "กำลังดำเนินงาน" },
  { key: "2", value: "CANCELED", name: "ยกเลิก" },
];
export const TASKTODAY_STATUS1: any = [
  { value: "IN_PROGRESS", name: "กำลังดำเนินงาน" },
  { value: "CANCELED", name: "ยกเลิก" },
];
export const APPROVED: any = [
  { value: "APPROVED", name: "อนุมัติ" },
  { value: "REJECTED", name: "ไม่อนุมัติ" },
];
export const REDIO_WAIT_START = [
  { key: 0, name: "ปกติ", isChecked: false },
  { key: 1, name: "งานมีปัญหา", isChecked: false },
];
export const REDIO_IN_PROGRESS = [
  { value: "EXTENDED", name: "ปกติ" },
  { value: "WAIT_APPROVE", name: "รออนุมัติขยายเวลา" },
  { value: "APPROVED", name: "อนุมัติขยายเวลา" },
  { value: "REJECTED", name: "งานมีปัญหา" },
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
];
export const STATUS_SUMMARY = [
  { value: "inprogressnormal", name: "ปกติ" },
  { value: "inprogressproblem", name: "งานมีปัญหา" },
  { value: "waitstartnormal", name: "ปกติ" },
  { value: "waitstartproblem", name: "งานมีปัญหา" },
  { value: "waitapprovedelay", name: "รออนุมัติขยายเวลา" },
  { value: "extended", name: "อนุมัติขยายเวลา" },
];
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
export const STATUS_COUPON: any = {
  ACTIVE: "ใช้งาน",
  DRAFTING: "รอเปิดการใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
};
export const REWARD_STATUS = [
  { value: "", name: "ทั้งหมด" },
  { value: "ACTIVE", name: "ใช้งาน" },
  { value: "DRAFTING", name: "รอเปิดใช้งาน" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
];
