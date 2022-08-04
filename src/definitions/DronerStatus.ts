import { color } from "./../resource/index";
export const DRONER_STATUS_MAPPING: any = {
  OPEN: "ยังไม่เปิดใช้งาน",
  PENDING: "รอตรวจสอบ",
  REJECTED: "ไม่อนุมัติ",
  ACTIVE: "ใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
};
export const DRONER_STATUS = [
  { value: "", name: "ทั้งหมด" },
  { value: "OPEN", name: "ยังไม่เปิดใช้งาน" },
  { value: "PENDING", name: "รอตรวจสอบ" },
  { value: "REJECTED", name: "ไม่อนุมัติ" },
  { value: "ACTIVE", name: "ใช้งาน" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
];
export const DRONE_STATUS = [
  { value: "", name: "ทั้งหมด" },
  { value: "PENDING", name: "รอตรวจสอบ" },
  { value: "REJECTED", name: "ไม่อนุมัติ" },
  { value: "ACTIVE", name: "อนุมัติ" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
];

export const DRONER_DRONE_STATUS: any = [
  { value: "ACTIVE", name: "อนุมัติ" },
  { value: "PENDING", name: "รอตรวจสอบ" },
  { value: "INACTIVE", name: "ปิดการใช้งาน" },
  { value: "REJECTED", name: "ไม่อนุมัติ" },
];
export const DRONER_DRONE_MAPPING: any = {
  ACTIVE: "อนุมัติ",
  PENDING: "รอตรวจสอบ",
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
