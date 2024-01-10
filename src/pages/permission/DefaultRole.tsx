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

const followJob: { [key: string]: any } = {
  followJob: tacking.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'followJob' },
      sub: false,
      edit: { value: false, disabled: false, name: 'followJob' },
      name: name,
      view: { value: false, disabled: false, name: 'followJob' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'followJob' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'followJob' },
      delete: { value: false, disabled: disableDelete.includes(name), name: 'followJob' },
      subItem: [],
    }
  }),
}
const farmerJob: { [key: string]: any } = {
  farmerJob: dataFarmer.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'farmerInfo' },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name), name: 'farmerInfo' },
      name,
      view: { value: false, disabled: disableView.includes(name), name: 'farmerInfo' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'farmerInfo' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'farmerInfo' },
      delete: { value: false, disabled: disableDelete.includes(name), name: 'farmerInfo' },
      subItem: [],
    }
  }),
}
const dronerJob: { [key: string]: any } = {
  dronerJob: dataDroner.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'dronerInfo' },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name), name: 'dronerInfo' },
      name,
      view: { value: false, disabled: false },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'dronerInfo' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'dronerInfo' },
      delete: { value: false, disabled: disableDelete.includes(name), name: 'dronerInfo' },
      subItem: [],
    }
  }),
}
const newsJob: { [key: string]: any } = {
  guru: dataNews.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'guru' },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name), name: 'guru' },
      name,
      view: { value: false, disabled: disableView.includes(name), name: 'guru' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'guru' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'guru' },
      delete: { value: false, disabled: disableDelete.includes(name), name: 'guru' },
      subItem: [],
    }
  }),
}
const promotionJob: { [key: string]: any } = {
  promotion: dataPromotion.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'promotion' },
      sub: false,
      edit: { value: false, disabled: disableEdit.includes(name), name: 'promotion' },
      name,
      view: { value: false, disabled: disableView.includes(name), name: 'promotion' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'promotion' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'promotion' },
      delete: { value: false, disabled: disableDelete.includes(name), name: 'promotion' },
      subItem: [],
    }
  }),
}
const reportHeaderPoint = [
  {
    name: 'รายงานแต้ม',
    sub: false,
    subItem: [],
    view: {
      value: false,
      disabled: false,
    },
    add: {
      value: false,
      disabled: false,
    },
    edit: {
      value: false,
      disabled: false,
    },
    delete: {
      value: false,
      disabled: true,
    },
    cancel: {
      value: false,
      disabled: false,
    },
    excel: {
      value: false,
      disabled: true,
    },
  },
]
const redeemHeaderPoint = [
  {
    name: 'แลกแต้ม/ของรางวัล',
    sub: false,
    subItem: [],
    view: {
      value: false,
      disabled: false,
    },
    add: {
      value: false,
      disabled: false,
    },
    edit: {
      value: false,
      disabled: false,
    },
    delete: {
      value: false,
      disabled: true,
    },
    cancel: {
      value: false,
      disabled: false,
    },
    excel: {
      value: false,
      disabled: true,
    },
  },
]
const pointJob: { [key: string]: any } = {
  pointResult: dataPoint.map((point) => {
    const isDisabled = dataPoint.some((item) => item.name === point.name)
    const filteredChildren = (point.children || []).filter((child) => typeof child === 'string')

    const subItems: { [key: string]: any } = {
      subPointResult: filteredChildren.map((childName) => {
        return {
          add: { value: false, disabled: false, name: childName },
          sub: false,
          edit: { value: false, disabled: false, name: childName },
          name: childName,
          view: { value: false, disabled: false, name: childName },
          excel: { value: false, disabled: true, name: childName },
          cancel: { value: false, disabled: false, name: childName },
          delete: { value: false, disabled: true, name: childName },
          subItem: [],
        }
      }),
    }

    return {
      add: { value: false, disabled: isDisabled, name: 'pointResult' },
      sub: true,
      edit: { value: false, disabled: false, name: 'pointResult' },
      name: point.name,
      view: { value: false, disabled: false, name: 'pointResult' },
      excel: { value: false, disabled: true, name: 'pointResult' },
      cancel: { value: false, disabled: false, name: 'pointResult' },
      delete: { value: false, disabled: false, name: 'pointResult' },
      subItem: subItems,
    }
  }),
}

const rewardJob: { [key: string]: any } = {
  reward: dataReward.map((name) => {
    return {
      add: { value: false, disabled: false, name: 'reward' },
      sub: false,
      edit: { value: false, disabled: false, name: 'reward' },
      name,
      view: { value: false, disabled: false, name: 'reward' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'reward' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'reward' },
      delete: { value: false, disabled: false, name: 'reward' },
      subItem: [],
    }
  }),
}
const missionJob: { [key: string]: any } = {
  mission: dataMission.map((name) => {
    return {
      add: { value: false, disabled: false, name: 'mission' },
      sub: false,
      edit: { value: false, disabled: false, name: 'mission' },
      name,
      view: { value: false, disabled: false, name: 'mission' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'mission' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'mission' },
      delete: { value: false, disabled: false, name: 'mission' },
      subItem: [],
    }
  }),
}
const challengeJob: { [key: string]: any } = {
  challenge: dataChallenge.map((name) => {
    return {
      add: { value: false, disabled: false, name: 'challenge' },
      sub: false,
      edit: { value: false, disabled: false, name: 'challenge' },
      name,
      view: { value: false, disabled: false, name: 'challenge' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'challenge' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'challenge' },
      delete: { value: false, disabled: false, name: 'challenge' },
      subItem: [],
    }
  }),
}
const adminJob: { [key: string]: any } = {
  admin: dataAdmin.map((name) => {
    return {
      add: { value: false, disabled: false, name: 'admin' },
      sub: false,
      edit: { value: false, disabled: false, name: 'admin' },
      name,
      view: { value: false, disabled: false, name: 'admin' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'admin' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'admin' },
      delete: { value: false, disabled: false, name: 'admin' },
      subItem: [],
    }
  }),
}
const settingJob: { [key: string]: any } = {
  settings: dataSetting.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'settings' },
      sub: false,
      edit: { value: false, disabled: false, name: 'settings' },
      name,
      view: { value: false, disabled: false, name: 'settings' },
      excel: { value: false, disabled: !disableExcel.includes(name), name: 'settings' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'settings' },
      delete: { value: false, disabled: disableDelete.includes(name), name: 'settings' },
      subItem: [],
    }
  }),
}
const pointSettingJob: { [key: string]: any } = {
  point: dataPointSetting.map((name) => {
    return {
      add: { value: false, disabled: disableAdd.includes(name), name: 'point' },
      sub: false,
      edit: { value: false, disabled: false, name: 'point' },
      name,
      view: { value: false, disabled: false, name: 'point' },
      excel: { value: false, disabled: false, name: 'point' },
      cancel: { value: false, disabled: disableCancel.includes(name), name: 'point' },
      delete: { value: false, disabled: false, name: 'point' },
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
  redeemHeaderPoint,
  reportHeaderPoint,
}
