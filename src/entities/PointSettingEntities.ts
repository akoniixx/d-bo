export interface PointSettingEntities {
  point: number;
  amounts: number;
  minPoint: number;
  pointType: string;
  application: string;
  receiveType: string;
  status: string;
}
export const PointSettingEntities_INIT: PointSettingEntities = {
  point: 0,
  amounts: 0,
  minPoint: 0,
  pointType: "",
  application: "" ,
  receiveType: "",
  status: "",
};
