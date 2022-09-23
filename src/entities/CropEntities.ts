export interface PurposeSprayEntity {
  id: string;
  cropId: string;
  purposeSprayName: string;
}
export const PurposeSprayEntity_INIT: PurposeSprayEntity = {
  id: "",
  cropId: "",
  purposeSprayName: "",
};

export interface CropPurposeSprayEntity {
  id: string;
  cropName: string;
  purposeSpray: PurposeSprayEntity[];
}
export const CropPurposeSprayEntity_INT: CropPurposeSprayEntity = {
  id: "",
  cropName: "",
  purposeSpray: [PurposeSprayEntity_INIT],
};
