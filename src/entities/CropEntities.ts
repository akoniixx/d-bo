export interface PurposeSpayEntity {
  id: string;
  cropId: string;
  purposeSprayName: string;
}

export interface CropPurposeSpayEntity {
  id: string;
  cropName: string;
  purposeSpray: PurposeSpayEntity[];
}
