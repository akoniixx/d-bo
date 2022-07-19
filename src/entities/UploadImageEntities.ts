export interface UploadImageEntity {
  resourceId: string;
  resource: string;
  category: string;
  file: any;
}

export interface ImageEntity extends UploadImageEntity {
  id: string;
}

export const UploadImageEntity_INIT: UploadImageEntity = {
  resourceId: "",
  resource: "",
  category: "",
  file: "",
};
