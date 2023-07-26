export interface UploadImageEntity {
  resourceId: string;
  resource: string;
  category: string;
  file: any;
  fileName?: string;
  path: string;
}

export interface ImageEntity extends UploadImageEntity {
  id: string;
}

export const ImageEntity_INTI: ImageEntity = {
  id: "",
  resourceId: "",
  resource: "",
  category: "",
  file: "",
  fileName: "",
  path: "",
};

export const UploadImageEntity_INTI: UploadImageEntity = {
  resourceId: "",
  resource: "",
  category: "",
  file: "",
  fileName: "",
  path: "",
};