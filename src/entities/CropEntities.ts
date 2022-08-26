export interface PurposeSprayEntity {
  id: string;
  cropId: string;
  purposeSprayName: string;
}

export interface CropPurposeSprayEntity {
  id: string;
  cropName: string;
  purposeSpray: PurposeSprayEntity[];
}
