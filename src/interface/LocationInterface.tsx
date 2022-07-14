import { LocationDatasource } from "../datasource/LocationDatasource";
import { MapLocation, MapLocationUtil } from "../entities/LocationEntities";

export class LocationInterface {
  static async getMapLocation(
    provinceId: number,
    districtId: number
  ): Promise<MapLocation[]> {
    console.log(provinceId, districtId);
    const getSubdistrict : any = [];
    const getProvince = await LocationDatasource.getProvince();
    const getDistrict = await LocationDatasource.getDistrict(provinceId).then((res) => {
         return LocationDatasource.getSubdistrict(res);
    });
    return MapLocationUtil.fromEntity(getProvince, getDistrict, getSubdistrict);
  }
}
