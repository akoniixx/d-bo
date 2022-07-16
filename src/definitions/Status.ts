import { color } from "../resource";

export const STATUS_NORMAL_MAPPING: any = {
  true: "ใช้งาน",
  false: "ไม่ใช้งาน",
};

export const STATUS_FARMER_MAPPING: any = {
  PENDING: "รอยืนยันตัวตน",
  ACTIVE: "อนุมัติ",
  INACTIVE: "ไม่อนุมัติ",
};

export const STATUS_COLOR_MAPPING: any = {
  PENDING: color.secondary2,
  ACTIVE: color.Success,
  INACTIVE: color.Error,
};

export const FARMER_STATUS_SEARCH = [
  { value: "PENDING", name: "รอยืนยันตัวตน" },
  { value: "ACTIVE", name: "อนุมัติ" },
  { value: "INACTIVE", name: "ไม่อนุมัติ" }
];
