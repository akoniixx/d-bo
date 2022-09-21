export interface PurposeSprayEntity {
  id: string;
  cropId: string;
  purposeSprayName: string;
}
export const PurposeSprayEntity_INIT : PurposeSprayEntity = {
  id: "",
  cropId: "",
  purposeSprayName: "",
}

export interface CropPurposeSprayEntity {
  id: string;
  cropName: string;
  purposeSpray: PurposeSprayEntity[];
  purposeSprayName: string;
}
export const CropPurposeSprayEntity_INIT : CropPurposeSprayEntity = {
  id: "",
  cropName: "",
  purposeSpray: [PurposeSprayEntity_INIT],
  purposeSprayName: "",
}