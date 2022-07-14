export interface ProviceEntity {
  provinceId: number;
  provinceName: string;
  region: string;
}
export const ProvinceEntity_INIT: ProviceEntity = {
  provinceId: 0,
  provinceName: "",
  region: "",
};

export interface DistrictEntity {
  districtId: number;
  districtName: string;
  provinceId: number;
  provinceName: string;
}
export const DistrictEntity_INIT: DistrictEntity = {
  districtId: 0,
  districtName: "",
  provinceId: 0,
  provinceName: "",
};

export interface SubdistrictEntity {
  subdistrictId: number;
  subdistrictName: string;
  districtId: number;
  districtName: string;
  provinceId: number;
  provinceName: string;
  lat: string;
  long: string;
  postcode: string;
}

export const SubdistrictEntity_INIT: SubdistrictEntity = {
  subdistrictId: 0,
  subdistrictName: "",
  districtId: 0,
  districtName: "",
  provinceId: 0,
  provinceName: "",
  lat: "",
  long: "",
  postcode: "",
};

export interface MapLocation {
  provinceid?: number;
  provinceName?: string;
  regien?: string;
  district: MapDistrict[];
}
export interface MapDistrict {
  provinceId?: number;
  districtId?: number;
  districtName?: string;
  subdistrict: MapSubdistrict[];
}
export interface MapSubdistrict {
  districtId?: number;
  subdistrictId?: number;
  subdistrictName?: string;
  lat?: string;
  long?: string;
  postcode?: string;
}

export class MapLocationUtil {
  static fromEntity(
    province: ProviceEntity[],
    district: DistrictEntity[],
    subdistrict: SubdistrictEntity[]
  ): MapLocation[] {
    const locationList: MapLocation[] = [];
    const districtList: MapDistrict[] = [];
    const subdistrictList: MapSubdistrict[] = [];
    let mapDistrict = province.map((x) =>
      district.filter((y) => y.provinceId == x.provinceId)
    );
    let mapSubdistrict = district.map((z) =>
      subdistrict.filter((p) => p.districtId == z.districtId)
    );

    //console.log("map", mapSubdistrict);

    mapSubdistrict.map((x) => {
      x.map((y) => {
        subdistrictList.push({
          districtId: y.districtId,
          subdistrictId: y.subdistrictId,
          subdistrictName: y.subdistrictName,
          lat: y.lat,
          long: y.long,
          postcode: y.postcode,
        });
      });
    });

    mapDistrict.map((x) => {
      x.map((y) => {
        districtList.push({
          provinceId: y.provinceId,
          districtId: y.districtId,
          districtName: y.districtName,
          subdistrict: subdistrictList.filter(
            (z) => z.districtId == y.districtId
          ),
        });
      });
    });

    province.map((x) => {
      locationList.push({
        provinceid: x.provinceId,
        provinceName: x?.provinceName,
        regien: x.region,
        district: districtList.filter((y) => y.provinceId == x.provinceId),
      });
    });

    //console.log(locationList);
    return locationList;
  }
}
