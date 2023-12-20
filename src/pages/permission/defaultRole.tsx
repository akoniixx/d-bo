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
const dataPoint = [
  {
    name: 'รายงานแต้ม',
    children: ['รอรับแต้ม', 'ได้รับแต้ม'],
  },
  {
    name: 'แลกแต้ม/ของรางวัล',
    children: ['นักบินโดรน', 'เกษตรกร'],
  },
]
const dataReward = ['นักบินโดรน', 'เกษตรกร']
const dataMission = ['นักบินโดรน', 'เกษตรกร']
const dataChallenge = ['นักบินโดรน', 'เกษตรกร']
const dataAdmin = ['รายชื่อผู้ดูแล', 'บทบาทผู้ดูแล']
const dataSetting = ['ยี่ห้อโดรน', 'รายชื่อพืช', 'เป้าหมาย', 'ราคา']
const dataPointSetting = ['นักบินโดรน', 'เกษตรกร']
const disableAdd = [
  'งานรอดำเนินงาน',
  'งานในวันนี้',
  'งานที่เสร็จแล้ว',
  'แก้ไขงาน/ดูประวัติงาน',
  'อันดับเกษตรกร',
  'อันดับนักบินโดรน',
  'กูรูเกษตร',
  'โปรโมชั่น',
  'ราคา',
  'นักบินโดรน',
  'เกษตรกร',
]
const disableView = ['อันดับเกษตรกร', 'กูรูเกษตร', 'โปรโมชั่น']
const disableEdit = ['อันดับเกษตรกร', 'อันดับนักบินโดรน', 'กูรูเกษตร', 'โปรโมชั่น']
const disableDelete = [
  ...dataFarmer,
  ...tacking,
  'อันดับเกษตรกร',
  'อันดับนักบินโดรน',
  'กูรูเกษตร',
  'โปรโมชั่น',
  'รายชื่อพืช',
  'ราคา',
]
const disableCancel = [
  'งานรอดำเนินงาน',
  'งานในวันนี้',
  'งานที่เสร็จแล้ว',
  ...dataFarmer,
  ...dataDroner,
  ...dataNews,
  ...dataPromotion,
  ...dataReward,
  ...dataMission,
  ...dataChallenge,
  ...dataAdmin,
  ...dataPointSetting,
  ...dataSetting,
]
const disableExcel = ['งานที่เสร็จแล้ว (บัญชี)']
const followJob: { [key: string]: RoleObject[] } = {
  followJob: tacking.map((name) => {
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
const farmerJob: { [key: string]: RoleObject[] } = {
  farmerInfo: dataFarmer.map((name) => {
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
const dronerJob: { [key: string]: RoleObject[] } = {
  dronerInfo: dataDroner.map((name) => {
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
const newsJob: { [key: string]: RoleObject[] } = {
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
const promotionJob: { [key: string]: RoleObject[] } = {
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
const pointJob: { [key: string]: RoleObject[] } = {
  pointResult: dataPoint.map((point) => {
    const isDisabled = dataPoint.some((item) => item.name === point.name)
    const filteredChildren = (point.children || []).filter((child) => typeof child === 'string')

    const subItems = filteredChildren.map((childName) => ({
      add: { value: false, disabled: false },
      sub: false,
      edit: { value: false, disabled: false },
      name: childName,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: true },
      cancel: { value: false, disabled: false },
      delete: { value: false, disabled: false },
      subItem: [],
    }))

    return {
      add: { value: false, disabled: isDisabled },
      sub: true,
      edit: { value: false, disabled: false },
      name: point.name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: true },
      cancel: { value: false, disabled: false },
      delete: { value: false, disabled: false },
      subItem: subItems,
    }
  }),
}

const rewardJob: { [key: string]: RoleObject[] } = {
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
const missionJob: { [key: string]: RoleObject[] } = {
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
const challengeJob: { [key: string]: RoleObject[] } = {
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
const adminJob: { [key: string]: RoleObject[] } = {
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
const settingJob: { [key: string]: RoleObject[] } = {
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
const pointSettingJob: { [key: string]: RoleObject[] } = {
  point: dataPointSetting.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name) },
      sub: false,
      edit: { value: false, disabled: false },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: false },
      cancel: { value: false, disabled: disableCancel.includes(name) },
      delete: { value: false, disabled: false },
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
  pointSettingJob,
}
