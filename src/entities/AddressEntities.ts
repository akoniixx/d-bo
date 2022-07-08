export interface AddressEntity {
  id: string;
  address1: string;
  address2: string;
  address3: string;
  provinceId: number;
  districtId: number;
  subdistrictId: number;
  postcode: string;
}
export const AddressEntity_INIT: AddressEntity = {
  id: "",
  address1: "",
  address2: "",
  address3: "",
  provinceId: 0,
  districtId: 0,
  subdistrictId: 0,
  postcode: "",
};
