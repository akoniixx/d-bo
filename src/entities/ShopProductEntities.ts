export interface ProductBrandEntity {
  productBrandId: string
  productBrandName: string
  productBrandLogo: string
  isActive: boolean
  createdAt: string
  createBy: string
  updatedAt: string
  updateBy: string
}
export interface ProductGroupEntity {
  productGroupId: string
  productGroupName: string
  isActive: boolean
  createdAt: string
  createBy: string
  updatedAt: string
  updateBy: string
}
export const ProductBrandEntity_INIT: ProductBrandEntity = {
  productBrandId: '',
  productBrandName: '',
  productBrandLogo: '',
  isActive: false,
  createdAt: '',
  createBy: '',
  updatedAt: '',
  updateBy: '',
}
export const ProductGroupEntity_INIT: ProductGroupEntity = {
  productGroupId: '',
  productGroupName: '',
  isActive: false,
  createdAt: '',
  createBy: '',
  updatedAt: '',
  updateBy: '',
}
export interface ProductListEntity {
  id: string
  shopId: string
  stockIck: string
  stockShop: string
  subdealerPrice: string
  farmerPrice: string
  status: string
  product: {
    productId: string
    productName: string
    commonName: string
    productBrandId: string
    productGroupId: string
    productStrategy: string
    unitSize: string
    unitMea: string
    unitVolume: string
    unitPrice: string
    unitPackMea: string
    packVolume: string
    packSubVolume: string
    packPrice: string
    isProductICP: boolean
    isProductDrone: boolean
    productStatus: boolean
    productDescription: string
    productImage: string
    createDate: string
    createBy: string
    updateDate: string
    updateBy: string
    productBrand: ProductBrandEntity
    productGroup: ProductGroupEntity
  }
}
export const ProductListEntity_INIT: ProductListEntity = {
  id: '',
  shopId: '',
  stockIck: '',
  stockShop: '',
  subdealerPrice: '',
  farmerPrice: '',
  status: '',
  product: {
    productId: '',
    productName: '',
    commonName: '',
    productBrandId: '',
    productGroupId: '',
    productStrategy: '',
    unitSize: '',
    unitMea: '',
    unitVolume: '',
    unitPrice: '',
    unitPackMea: '',
    packVolume: '',
    packSubVolume: '',
    packPrice: '',
    isProductICP: false,
    isProductDrone: false,
    productStatus: false,
    productDescription: '',
    productImage: '',
    createDate: '',
    createBy: '',
    updateDate: '',
    updateBy: '',
    productBrand: ProductBrandEntity_INIT,
    productGroup: ProductGroupEntity_INIT,
  },
}
export interface ShopProductListEntity {
  count: number
  countIck: number
  countProduct: number
  products: ProductListEntity[]
}
export const ShopProductListEntity_INIT: ShopProductListEntity = {
  count: 0,
  countIck: 0,
  countProduct: 0,
  products: [ProductListEntity_INIT],
}
export interface ProductBrandListEntity {
  count: number
  data: ProductBrandEntity[]
}
export const ProductBrandListEntity_INIT: ProductBrandListEntity = {
  count: 0,
  data: [ProductBrandEntity_INIT],
}