export interface MenuPermission {
  value: boolean
  disabled: boolean
}
export interface listMenu {
  add: MenuPermission
  sub: boolean
  edit: MenuPermission
  name: string
  view: MenuPermission
  excel: MenuPermission
  cancel: MenuPermission
  delete: MenuPermission
  subItem: any[]
}
export const listMenu_INIT: listMenu = {
  add: {
    value: false,
    disabled: false,
  },
  sub: false,
  edit: {
    value: false,
    disabled: false,
  },
  name: '',
  view: {
    value: false,
    disabled: false,
  },
  excel: {
    value: false,
    disabled: false,
  },
  cancel: {
    value: false,
    disabled: false,
  },
  delete: {
    value: false,
    disabled: false,
  },
  subItem: [],
}

export interface RoleEntity {
  [key: string]: any;
  id: string
  role: string
  count: number
  followJob: listMenu[]
  farmerInfo: listMenu[]
  dronerInfo: listMenu[]
  guru: listMenu[]
  promotion: listMenu[]
  pointResult: listMenu[]
  reward: listMenu[]
  mission: listMenu[]
  challenge: listMenu[]
  admin: listMenu[]
  settings: listMenu[]
  point: listMenu[]
}
export const RoleEntity_INIT: RoleEntity = {
  id: '',
  role: '',
  count: 0,
  followJob: [listMenu_INIT],
  farmerInfo: [listMenu_INIT],
  dronerInfo: [listMenu_INIT],
  guru: [listMenu_INIT],
  promotion: [listMenu_INIT],
  pointResult: [listMenu_INIT],
  reward: [listMenu_INIT],
  mission: [listMenu_INIT],
  challenge: [listMenu_INIT],
  admin: [listMenu_INIT],
  settings: [listMenu_INIT],
  point: [listMenu_INIT],
}
export interface RoleAllEntity {
  data: RoleEntity[]
  count: number
}
