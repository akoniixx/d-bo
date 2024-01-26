export interface RoleObject {
  add: {
    value: boolean
    disabled: boolean
  }
  sub: boolean
  edit: {
    value: boolean
    disabled: boolean
  }
  name: string
  view: {
    value: boolean
    disabled: boolean
  }
  excel: {
    value: boolean
    disabled: boolean
  }
  cancel: {
    value: boolean
    disabled: boolean
  }
  delete: {
    value: boolean
    disabled: boolean
  }
  subItem: any[]
}
export interface ConvertedDataType {
  name: string
  value: {
    [key: string]: any
  }
}
export interface TableRoleProps {
  page: string
  dataJob: ConvertedDataType[]
  dataFarmer: ConvertedDataType[]
  dataDroner: ConvertedDataType[]
  dataGuru: ConvertedDataType[]
  dataReward: ConvertedDataType[]
  dataMission: ConvertedDataType[]
  dataPromotion: ConvertedDataType[]
  dataPointResult: ConvertedDataType[]
  dataAdmin: ConvertedDataType[]
  dataSetting: ConvertedDataType[]
  dataChallenge: ConvertedDataType[]
  dataFinity: ConvertedDataType[]
}
export const method = ['view', 'add', 'edit', 'delete', 'cancel', 'excel']
const tacking = [
  'งานใหม่ (รอนักบิน)',
  'งานรอดำเนินงาน',
  'งานในวันนี้',
  'งานที่เสร็จแล้ว',
  'แก้ไขงาน/ดูประวัติงาน',
]
const dataFarmer = ['รายชื่อเกษตรกร', 'รายการแปลงเกษตร', 'อันดับเกษตรกร']
const dataDroner = ['รายชื่อนักบินโดรน', 'รายการโดรนเกษตร', 'อันดับนักบินโดรน']
const dataNews = ['ข่าวสาร', 'กูรูเกษตร']
const dataPromotion = ['โปรโมชั่น', 'คูปอง']
const dataPoint = ['รายงานแต้ม', 'รายการแต้มพิเศษ', 'แต้มรายบุคคล', 'แคมเปญแต้ม']
const dataReward = ['รายการของรางวัล', 'ประวัติการแลก']
const dataMission = ['นักบินโดรน', 'เกษตรกร']
const dataChallenge = ['นักบินโดรน', 'เกษตรกร']
const dataAdmin = ['รายชื่อผู้ดูแล', 'บทบาทผู้ดูแล']
const dataFinity = ['สถิติภาพรวม', 'รายชื่อนักบิน', 'รายชื่อร้านค้า', 'รายการยา/ปุ๋ย']
const dataSetting = [
  'ยี่ห้อโดรน',
  'รายชื่อพืช',
  'รายชื่อบริษัท/ธนาคาร',
  'เป้าหมาย',
  'ราคา',
  'เครดิต',
  'แต้ม',
]
const disableAdd = [
  'งานรอดำเนินงาน',
  'งานในวันนี้',
  'งานที่เสร็จแล้ว',
  'แก้ไขงาน/ดูประวัติงาน',
  'อันดับเกษตรกร',
  'อันดับนักบินโดรน',
  'กูรูเกษตร',
  'โปรโมชั่น',
  'นักบินโดรน',
  'เกษตรกร',
  'แต้มรายบุคคล',
  'รายการแต้มพิเศษ',
  'ราคา',
  'เครดิต',
  'แต้ม',
  'สถิติภาพรวม',
]
const disableView = ['อันดับเกษตรกร', 'กูรูเกษตร', 'โปรโมชั่น']
const disableEdit = ['อันดับเกษตรกร', 'อันดับนักบินโดรน', 'กูรูเกษตร', 'โปรโมชั่น', 'สถิติภาพรวม']
const disableDelete = [
  ...dataFarmer,
  ...tacking,
  'อันดับเกษตรกร',
  'อันดับนักบินโดรน',
  'กูรูเกษตร',
  'โปรโมชั่น',
  'รายชื่อพืช',
  'แต้มรายบุคคล',
  'รายการแต้มพิเศษ',
  'ราคา',
  'เครดิต',
  'แต้ม',
  ...dataFinity,
]
const disableCancel = [
  'งานรอดำเนินงาน',
  'งานในวันนี้',
  'งานที่เสร็จแล้ว',
  'แต้มรายบุคคล',
  'สถิติภาพรวม',
  ...dataFarmer,
  ...dataDroner,
  ...dataNews,
  ...dataPromotion,
  ...dataReward,
  ...dataMission,
  ...dataChallenge,
  ...dataAdmin,
  ...dataSetting,
  ...dataFinity,
]
const disableExcel = ['งานที่เสร็จแล้ว (บัญชี)']

const followJob: { [key: string]: any } = {
  followJob: tacking.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: false },
      name: name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}
const farmerJob: { [key: string]: any } = {
  farmerJob: dataFarmer.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name) },
      name,
      view: { value: false, disabled: disableView.includes(name) },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}
const dronerJob: { [key: string]: any } = {
  dronerJob: dataDroner.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name) },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}
const newsJob: { [key: string]: any } = {
  guru: dataNews.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name) },
      name,
      view: { value: false, disabled: disableView.includes(name) },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}
const promotionJob: { [key: string]: any } = {
  promotion: dataPromotion.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name) },
      name,
      view: { value: false, disabled: disableView.includes(name) },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}

const pointJob: { [key: string]: any } = {
  pointResult: dataPoint.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}

const rewardJob: { [key: string]: any } = {
  reward: dataReward.map((name) => {
    return {
      add: { value: false, disabled: false },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: false },
      subItem: [],
    }
  }),
}
const oneFinity: { [key: string]: any } = {
  finity: dataFinity.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name) },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}
const missionJob: { [key: string]: any } = {
  mission: dataMission.map((name) => {
    return {
      add: { value: false, disabled: false },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: false },
      subItem: [],
    }
  }),
}
const challengeJob: { [key: string]: any } = {
  challenge: dataChallenge.map((name) => {
    return {
      add: { value: false, disabled: false },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: false },
      subItem: [],
    }
  }),
}
const adminJob: { [key: string]: any } = {
  admin: dataAdmin.map((name) => {
    return {
      add: { value: false, disabled: false },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: false },
      subItem: [],
    }
  }),
}
const settingJob: { [key: string]: any } = {
  settings: dataSetting.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name) },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: disableDelete.includes(name) },
      subItem: [],
    }
  }),
}

export {
  followJob,
  farmerJob,
  dronerJob,
  newsJob,
  promotionJob,
  pointJob,
  rewardJob,
  missionJob,
  challengeJob,
  adminJob,
  settingJob,
  oneFinity,
}
