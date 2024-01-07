import { Checkbox, Table } from 'antd'
import TableSubRole from './TableSubRole'
import { useEffect, useState } from 'react'
import TableHeaderRole from './TableHeaderRole'
import TableInSubRole from './TableInSubRole'
import { redeemHeaderPoint, reportHeaderPoint } from '../../pages/permission/DefaultRole'

interface ConvertedDataType {
  name: string
  value: {
    [key: string]: any
  }
}
interface TableRoleProps {
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
  dataPoint: ConvertedDataType[]
  dataChallenge: ConvertedDataType[]
  dataReportPoint: ConvertedDataType[]
  dataRedeemPoint: ConvertedDataType[]
}
export const method = ['view', 'add', 'edit', 'delete', 'cancel', 'excel']

function TableRole({
  dataJob,
  dataFarmer,
  dataDroner,
  dataGuru,
  dataReward,
  dataMission,
  dataPromotion,
  dataPointResult,
  dataAdmin,
  dataSetting,
  dataPoint,
  dataChallenge,
  dataReportPoint,
  dataRedeemPoint,
}: TableRoleProps) {
  const [followJob, setFollowJob] = useState(dataJob[0].value.followJob)
  const [farmer, setFarmer] = useState(dataFarmer[0].value.farmerJob)
  const [droner, setDroner] = useState(dataDroner[0].value.dronerJob)
  const [guru, setGuru] = useState(dataGuru[0].value.guru)
  const [reward, setReward] = useState(dataReward[0].value.reward)
  const [mission, setMission] = useState(dataMission[0].value.mission)
  const [promotion, setPromotion] = useState(dataPromotion[0].value.promotion)
  const [pointResult, setPointResult] = useState(dataPointResult[0].value.pointResult)
  const [admin, setAdmin] = useState(dataAdmin[0].value.admin)
  const [setting, setSetting] = useState(dataSetting[0].value.settings)
  const [point, setPoint] = useState(dataPoint[0].value.point)
  const [challenge, setChallenge] = useState(dataChallenge[0].value.challenge)
  const [reportPoint, setReportPoint] = useState(dataReportPoint[0].value.subPointResult)
  const [redeemPoint, setRedeemPoint] = useState(dataRedeemPoint[0].value.subPointResult)
  const [headReportPoint, setHeadReportPoint] = useState(reportHeaderPoint)
  const [headRedeemPoint, setHeadRedeemPoint] = useState(redeemHeaderPoint)

  const [followJobHeader, setFollowHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [farmerHeader, setFarmerHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [dronerHeader, setDronerHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [guruHeader, setGuruHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [rewardHeader, setRewardHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [missionHeader, setMissionHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [promotionHeader, setPromotionHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [pointResultHeader, setPointResultHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [adminHeader, setAdminHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [settingHeader, setSettingHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [pointHeader, setPointHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [challengeHeader, setChallengeHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [reportPointHeader, setReportPointHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [redeemPointHeader, setRedeemPointHeader] = useState<boolean[]>(new Array(6).fill(true))
  const [headerAllPoint, setHeaderAllPoint] = useState<boolean[]>(new Array(6).fill(true))

  const onChangeHeader = (header: string, category: string, value: boolean) => {
    const dataMap: any = {
      ติดตามงาน: {
        data: followJob,
        headerState: followJobHeader,
        setState: setFollowJob,
        setHeaderState: setFollowHeader,
      },
      ข้อมูลเกษตรกร: {
        data: farmer,
        headerState: farmerHeader,
        setState: setFarmer,
        setHeaderState: setFarmerHeader,
      },
      ข้อมูลนักบินโดรน: {
        data: droner,
        headerState: dronerHeader,
        setState: setDroner,
        setHeaderState: setDronerHeader,
      },
      'ข่าวสาร / กรูรูเกษตร': {
        data: guru,
        headerState: guruHeader,
        setState: setGuru,
        setHeaderState: setGuruHeader,
      },
      โปรโมชั่น: {
        data: promotion,
        headerState: promotionHeader,
        setState: setPromotion,
        setHeaderState: setPromotionHeader,
      },
      แต้มสะสม: {
        data: pointResult,
        headerState: pointHeader,
        setState: setPointResult,
        setHeaderState: setPointResultHeader,
      },
      ของรางวัล: {
        data: reward,
        headerState: rewardHeader,
        setState: setReward,
        setHeaderState: setRewardHeader,
      },
      ภารกิจ: {
        data: mission,
        headerState: missionHeader,
        setState: setMission,
        setHeaderState: setMissionHeader,
      },
      ชาเลนจ์: {
        data: challenge,
        headerState: challengeHeader,
        setState: setChallenge,
        setHeaderState: setChallengeHeader,
      },
      ผู้ดูแลระบบ: {
        data: admin,
        headerState: adminHeader,
        setState: setAdmin,
        setHeaderState: setAdminHeader,
      },
      ตั้งค่า: {
        data: setting,
        headerState: settingHeader,
        setState: setSetting,
        setHeaderState: setSettingHeader,
      },
      แต้ม: {
        data: point,
        headerState: pointHeader,
        setState: setPointHeader,
        setHeaderState: setPointResultHeader,
      },
      รายงานแต้ม: {
        data: reportPoint,
        headerState: reportPointHeader,
        setState: setReportPoint,
        setHeaderState: setReportPointHeader,
      },
      'แลกแต้ม/ของรางวัล': {
        data: redeemPoint,
        headerState: redeemPointHeader,
        setState: setRedeemPoint,
        setHeaderState: setRedeemPointHeader,
      },
    }

    const { data, headerState, setState, setHeaderState } = dataMap[header]

    const res = data.map((item: any) => {
      item[category].value = value
      return item
    })

    const index = method.indexOf(category)
    headerState[index] = !headerState[index]
    setHeaderState([...headerState])
    setState(res)
  }

  return (
    <div className='pt-3'>
      <TableHeaderRole
        showHeader={true}
        header='ติดตามงาน'
        data={dataJob}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={followJobHeader}
        subColumns={
          <TableSubRole
            data={followJob}
            onChange={(data, index, key) => {
              followJob[index] = data
              const checkHeader = followJob.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              followJobHeader[method.indexOf(key)] = result
              setFollowJob(followJob)
              setFollowHeader([...followJobHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ข้อมูลเกษตรกร'
        data={dataFarmer}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={farmerHeader}
        subColumns={
          <TableSubRole
            data={farmer}
            onChange={(data, index, key) => {
              farmer[index] = data
              const checkHeader = farmer.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              farmerHeader[method.indexOf(key)] = result
              setFarmer(farmer)
              setFarmerHeader([...farmerHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ข้อมูลนักบินโดรน'
        data={dataDroner}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={dronerHeader}
        subColumns={
          <TableSubRole
            data={droner}
            onChange={(data, index, key) => {
              droner[index] = data
              const checkHeader = droner.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              dronerHeader[method.indexOf(key)] = result
              setDroner(droner)
              setDronerHeader([...dronerHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ข่าวสาร / กูรูเกษตร'
        data={dataGuru}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={guruHeader}
        subColumns={
          <TableSubRole
            data={guru}
            onChange={(data, index, key) => {
              guru[index] = data
              const checkHeader = guru.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              guruHeader[method.indexOf(key)] = result
              setGuru(guru)
              setGuruHeader([...guruHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='โปรโมชั่น'
        data={dataPromotion}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={promotionHeader}
        subColumns={
          <TableSubRole
            data={promotion}
            onChange={(data, index, key) => {
              promotion[index] = data
              const checkHeader = promotion.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              promotionHeader[method.indexOf(key)] = result
              setPromotion(promotion)
              setPromotionHeader([...promotionHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='แต้มสะสม'
        data={dataPointResult}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={headerAllPoint}
        subColumns={
          <>
            <TableHeaderRole
              showHeader={false}
              header='รายงานแต้ม'
              data={headReportPoint}
              onChange={(data, key, checked, index) => {
                onChangeHeader(data, key, checked)
              }}
              stateHeader={reportPointHeader}
              subColumns={
                <TableSubRole
                  data={reportPoint}
                  onChange={(data, index, key) => {
                    reportPoint[index] = data
                    const checkHeader = reportPoint.map((item: any) => {
                      return item[key].value
                    })
                    const result = checkHeader.includes(false)
                    reportPointHeader[method.indexOf(key)] = result
                    setReportPoint(reportPoint)
                    setReportPointHeader([...reportPointHeader])
                    if (
                      !reportPointHeader[method.indexOf(key)] &&
                      !redeemPointHeader[method.indexOf(key)]
                    ) {
                      headerAllPoint[method.indexOf(key)] = true
                      setHeaderAllPoint([...headerAllPoint])
                    } else {
                      headerAllPoint[method.indexOf(key)] = false
                      setHeaderAllPoint([...headerAllPoint])
                    }
                  }}  
                />
              }
            />
            <TableHeaderRole
              showHeader={false}
              header='แลกแต้ม/ของรางวัล'
              data={headRedeemPoint}
              onChange={(data, key, checked, index) => {
                onChangeHeader(data, key, checked)
              }}
              stateHeader={redeemPointHeader}
              subColumns={
                <TableSubRole
                  data={redeemPoint}
                  onChange={(data, index, key) => {
                    redeemPoint[index] = data
                    const checkHeader = redeemPoint.map((item: any) => {
                      return item[key].value
                    })
                    const result = checkHeader.includes(false)
                    redeemPointHeader[method.indexOf(key)] = result
                    setRedeemPoint(redeemPoint)
                    setRedeemPointHeader([...redeemPointHeader])
                    console.log(reportPointHeader[method.indexOf(key)], redeemPointHeader[method.indexOf(key)])
                    if (
                      !reportPointHeader[method.indexOf(key)] &&
                      !redeemPointHeader[method.indexOf(key)]
                    ) {
                      headerAllPoint[method.indexOf(key)] = true
                      setHeaderAllPoint([...headerAllPoint])
                    } else {
                      headerAllPoint[method.indexOf(key)] = false
                      setHeaderAllPoint([...headerAllPoint])
                    }
                    console.log(headerAllPoint)
                  }}
                />
              }
            />
          </>
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ของรางวัล'
        data={dataReward}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={rewardHeader}
        subColumns={
          <TableSubRole
            data={reward}
            onChange={(data, index, key) => {
              reward[index] = data
              const checkHeader = reward.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              rewardHeader[method.indexOf(key)] = result
              setReward(reward)
              setRewardHeader([...rewardHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ภารกิจ'
        data={dataMission}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={missionHeader}
        subColumns={
          <TableSubRole
            data={mission}
            onChange={(data, index, key) => {
              mission[index] = data
              const checkHeader = mission.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              missionHeader[method.indexOf(key)] = result
              setMission(mission)
              setMissionHeader([...missionHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ชาเลนจ์'
        data={dataChallenge}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={challengeHeader}
        subColumns={
          <TableSubRole
            data={challenge}
            onChange={(data, index, key) => {
              challenge[index] = data
              const checkHeader = challenge.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              challengeHeader[method.indexOf(key)] = result
              setChallenge(challenge)
              setChallengeHeader([...challengeHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ผู้ดูแลระบบ'
        data={dataAdmin}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={adminHeader}
        subColumns={
          <TableSubRole
            data={admin}
            onChange={(data, index, key) => {
              admin[index] = data
              const checkHeader = admin.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              adminHeader[method.indexOf(key)] = result
              setAdmin(admin)
              setAdminHeader([...adminHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='ตั้งค่า'
        data={dataSetting}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={settingHeader}
        subColumns={
          <TableSubRole
            data={setting}
            onChange={(data, index, key) => {
              setting[index] = data
              const checkHeader = setting.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              settingHeader[method.indexOf(key)] = result
              setSetting(setting)
              setSettingHeader([...settingHeader])
            }}
          />
        }
      />
      <TableHeaderRole
        showHeader={false}
        header='แต้ม'
        data={dataPoint}
        onChange={(data, key, checked, index) => {
          onChangeHeader(data, key, checked)
        }}
        stateHeader={pointHeader}
        subColumns={
          <TableSubRole
            data={point}
            onChange={(data, index, key) => {
              point[index] = data
              const checkHeader = point.map((item: any) => {
                return item[key].value
              })
              const result = checkHeader.includes(false)
              pointHeader[method.indexOf(key)] = result
              setPoint(point)
              setPointHeader([...pointHeader])
            }}
          />
        }
      />
    </div>
  )
}

export default TableRole
