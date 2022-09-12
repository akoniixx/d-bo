import { LAT_LNG_BANGKOK } from "./../definitions/Location";
export interface DronerAreaEntity {
  dronerId?: string;
  provinceId?: 0;
  districtId?: 0;
  subdistrictId?: 0;
  lat: string;
  long: string;
  distance?: string;
  locationName: string;
}
export const DronerAreaEntity_INIT: DronerAreaEntity = {
  dronerId: "",
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  lat: LAT_LNG_BANGKOK.lat,
  long: LAT_LNG_BANGKOK.lng,
  distance: "",
  locationName: "",
};
