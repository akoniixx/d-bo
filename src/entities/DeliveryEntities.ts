export interface DeliveryEntity {
  id: string;
  name: string;
  nameEn: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryListEntity {
  count: number;
  data: DeliveryEntity[];
}
