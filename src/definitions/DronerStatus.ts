export const DRONER_STATUS = [
  { key: "OPEN", status: "OPEN" },
  { key: "PENDING", status: "PENDING" },
  { key: "REJECTED", status: "REJECTED" },
  { key: "ACTIVE", status: "ACTIVE" },
  { key: "INACTIVE", status: "INACTIVE" },
];
export const DRONER_STATUS_MAPPING: any = {
  OPEN: "ยังไม่ได้ใช้งาน",
  PENDING: "รอยืนยันตัวตน",
  ACTIVE: "ใช้งาน",
  REJECTED: "ไม่อนุมัติ",
  INACTIVE: "ปิดการใช้งาน",
};

export const DRONER_DRONE_STATUS: any = {
  OPEN : "ยังไม่เปิดใช้งาน",
  PENDING: "รอยืนยันตัวตน",
  ACTIVE: "ใช้งาน",
  INACTIVE: "ปิดการใช้งาน",
  REJECTED: "ไม่อนุมัติ",
};
