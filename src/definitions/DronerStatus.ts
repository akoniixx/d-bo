import { color } from "./../resource/index";
export const DRONER_STATUS_MAPPING: any = {
  OPEN: "ยังไม่เปิดใช้งาน",
  PENDING: "รอยืนยันตัวตน",
  REJECTED: "ไม่อนุมัติ",
  ACTIVE: "ใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
};

export const DRONER_DRONE_STATUS: any = {
  ACTIVE: "อนุมัติ",
  PENDING: "รอยืนยันตัวตน",
  INACTIVE: "ปิดการใช้งาน",
  REJECTED: "ไม่อนุมัติ",
};

export const STATUS_COLOR: any = {
  PENDING: color.Warning,
  ACTIVE: color.Success,
  INACTIVE: color.Grey,
  OPEN: color.Disable,
  REJECTED: color.Error,
};

export const DRONER_STATUS = [
  { value: "", name: "ทั้งหมด" },
  { value: "OPEN", name: "ยังไม่เปิดใช้งาน" },
  { value: "PENDING", name: "รอยืนยันตัวตน" },
  { value: "REJECTED", name: "ไม่อนุมัติ" },
  { value: "ACTIVE", name: "ใช้งาน" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
];
