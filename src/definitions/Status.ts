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
