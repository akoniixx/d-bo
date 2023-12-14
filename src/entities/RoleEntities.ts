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
  id: string
  role: string
  count: number
  followJob: listMenu
  farmerInfo: listMenu
  dronerInfo: listMenu
  guru: listMenu
  promotion: listMenu
  pointResult: listMenu
  reward: listMenu
  mission: listMenu
  challenge: listMenu
  admin: listMenu
  settings: listMenu
  point: listMenu
}
export interface RoleAllEntity {
  data: RoleEntity[]
  count: number
}
