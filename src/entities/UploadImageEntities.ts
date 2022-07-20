export interface UploadImageEntity {
  resourceId: string;
  resource: string;
  category: string;
  file: any;
}

export interface ImageEntity extends UploadImageEntity {
  id: string;
}

export const ImageEntity_INTI: ImageEntity = {
  id:"",
  resourceId: "",
  resource: "",
  category: "",
  file: "",
};
