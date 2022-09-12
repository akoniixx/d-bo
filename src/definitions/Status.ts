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
