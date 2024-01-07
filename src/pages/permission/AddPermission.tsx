/* eslint-disable no-case-declarations */
import React, { useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Form, Input, Row, Table } from 'antd'
import color from '../../resource/color'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import {
  adminJob,
  challengeJob,
  dronerJob,
  farmerJob,
  followJob,
  missionJob,
  newsJob,
  pointJob,
  pointSettingJob,
  promotionJob,
  rewardJob,
  settingJob,
} from './DefaultRole'
import TableRole from '../../components/table/TableRole'

function AddPermission() {
  const navigate = useNavigate()
  const [role, setRole] = useState<string>('')
  const [followjobs, setFollowjobs] = useState({
    name: 'ติดตามงาน',
    value: followJob,
  })
  const [admin, setAdmin] = useState({
    name: 'ผู้ดูแลระบบ',
    value: adminJob,
  })
  const [challenge, setChallenge] = useState({
    name: 'ชาเลนจ์',
    value: challengeJob,
  })
  const [dronerInfo, setDronerInfo] = useState({
    name: 'ข้อมูลนักบินโดรน',
    value: dronerJob,
  })
  const [farmerInfo, setFarmerInfo] = useState({
    name: 'ข้อมูลเกษตรกร',
    value: farmerJob,
  })
  const [guru, setGuru] = useState({
    name: 'ข่าวสาร / กูรูเกษตร',
    value: newsJob,
  })
  const [mission, setMission] = useState({
    name: 'ภารกิจ',
    value: missionJob,
  })
  const [point, setPoint] = useState({
    name: 'แต้ม',
    value: pointSettingJob,
  })
  const [pointResult, setPointResult] = useState({
    name: 'แต้มสะสม',
    value: pointJob,
  })
  const [promotion, setPromotion] = useState({
    name: 'โปรโมชั่น',
    value: promotionJob,
  })
  const [reward, setReward] = useState({
    name: 'ของรางวัล',
    value: rewardJob,
  })
  const [settings, setSettings] = useState({
    name: 'ตั้งค่า',
    value: settingJob,
  })
  const [reportPoint, setReportPoint] = useState({
    name: 'รายงานแต้ม',
    value: pointJob.pointResult[0].subItem
    ,
  })
  const [redeemPoint, setRedeemPoint] = useState({
    name: 'แลกแต้ม/ของรางวัล',
    value: pointJob.pointResult[1].subItem,
  })

  const handleCheckMenu = (checked: boolean, row: any, value: any, index: number) => {
    console.log(checked, row, value)
    switch (row.key) {
      case 0:
        row.value['followJob'].map((item: any) => item)
        break
      case 1:
        break
      case 2:
        break
      case 3:
        break
      case 4:
        break
      case 6:
        break
      case 7:
        break
      case 8:
        break
      case 9:
        break
      case 10:
        break

      default:
        break
    }
  }
  const handleCheckMenuSub = (checked: boolean, row: any, value: any, index: number) => {
    switch (row[value].name) {
      case 'followJob':
        const newFollowJob = followjobs.value
        newFollowJob[row[value].name][index][value]['value'] = checked
        setFollowjobs({
          name: 'ติดตามงาน',
          value: {
            ...followJob.value,
            ...newFollowJob,
          },
        })
        break
      case 'farmerInfo':
        const newFarmerInfo = farmerInfo.value
        newFarmerInfo[row[value].name][index][value]['value'] = checked
        setFarmerInfo({
          name: 'ข้อมูลเกษตรกร',
          value: {
            ...farmerInfo.value,
            ...newFarmerInfo,
          },
        })
        break
      case 'dronerInfo':
        const newDronerInfo = dronerInfo.value
        newDronerInfo[row[value].name][index][value]['value'] = checked
        setDronerInfo({
          name: 'ข้อมูลนักบินโดรน',
          value: {
            ...dronerInfo.value,
            ...newDronerInfo,
          },
        })
        break
      case 'guru':
        const newGuru = guru.value
        newGuru[row[value].name][index][value]['value'] = checked
        setGuru({
          name: 'ข่าวสาร / กูรูเกษตร',
          value: {
            ...guru.value,
            ...newGuru,
          },
        })
        break
      case 'pointResult':
        const newPointResult = pointResult.value
        newPointResult[row[value].name][index][value]['value'] = checked
        setPointResult({
          name: 'แต้มสะสม',
          value: {
            ...pointResult.value,
            ...newPointResult,
          },
        })
        break
      case 'promotion':
        const newPromotion = promotion.value
        newPromotion[row[value].name][index][value]['value'] = checked
        setPromotion({
          name: 'แต้มสะสม',
          value: {
            ...promotion.value,
            ...newPromotion,
          },
        })
        break
      case 'reward':
        const newReward = reward.value
        newReward[row[value].name][index][value]['value'] = checked
        setReward({
          name: 'แต้มสะสม',
          value: {
            ...reward.value,
            ...newReward,
          },
        })
        break
      case 'mission':
        const newMission = mission.value
        newMission[row[value].name][index][value]['value'] = checked
        setMission({
          name: 'แต้มสะสม',
          value: {
            ...mission.value,
            ...newMission,
          },
        })
        break
      case 'challenge':
        const newChallenge = challenge.value
        newChallenge[row[value].name][index][value]['value'] = checked
        setChallenge({
          name: 'แต้มสะสม',
          value: {
            ...challenge.value,
            ...newChallenge,
          },
        })
        break
      case 'admin':
        const newAdmin = admin.value
        newAdmin[row[value].name][index][value]['value'] = checked
        setAdmin({
          name: 'แต้มสะสม',
          value: {
            ...admin.value,
            ...newAdmin,
          },
        })
        break
      case 'settings':
        const newSetting = settings.value
        newSetting[row[value].name][index][value]['value'] = checked
        setSettings({
          name: 'แต้มสะสม',
          value: {
            ...settings.value,
            ...newSetting,
          },
        })
        break
      case 'point':
        const newPoint = point.value
        newPoint[row[value].name][index][value]['value'] = checked
        setPoint({
          name: 'แต้มสะสม',
          value: {
            ...point.value,
            ...newPoint,
          },
        })
        break
      default:
        break
    }
  }
  const checkValues = (row: any, value: any, index: number): boolean => {
    switch (row[value]?.name) {
      case 'followJob':
        return followjobs.value[row[value]?.name][index][value]['value']
      // case 'farmerInfo':
      //   return farmerInfo.value[row[value]?.name][index][value]['value']
      // case 'dronerInfo':
      //   return dronerInfo.value[row[value]?.name][index][value]['value']
      // case 'guru':
      //   return guru.value[row[value]?.name][index][value]['value']
      // case 'pointResult':
      //   return pointResult.value[row[value]?.name][index][value]['value']
      // case 'promotion':
      //   return promotion.value[row[value]?.name][index][value]['value']
      // case 'reward':
      //   return reward.value[row[value]?.name][index][value]['value']
      // case 'mission':
      //   return mission.value[row[value]?.name][index][value]['value']
      // case 'challenge':
      //   return challenge.value[row[value]?.name][index][value]['value']
      // case 'admin':
      //   return admin.value[row[value]?.name][index][value]['value']
      // case 'settings':
      //   return settings.value[row[value]?.name][index][value]['value']
      // case 'point':
      //   return point.value[row[value]?.name][index][value]['value']
      default:
        return false
    }
  }

  const columns = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'name',
      key: 'name',
      width: '21%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: 'ดูข้อมูล (View)',
      dataIndex: 'view',
      key: 'view',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenu(e.target.checked, row, 'view', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'เพิ่ม (Add)',
      dataIndex: 'add',
      key: 'add',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenu(e.target.checked, row, 'add', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'แก้ไข (Edit)',
      dataIndex: 'edit',
      key: 'edit',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenu(e.target.checked, row, 'edit', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ลบ (Delete)',
      dataIndex: 'delete',
      key: 'delete',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenu(e.target.checked, row, 'delete', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ยกเลิก (cancel)',
      dataIndex: 'cancel',
      key: 'cancel',
      width: '13%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenu(e.target.checked, row, 'cancel', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'บันทึกไฟล์ (Export File)',
      dataIndex: 'excel',
      key: 'excel',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenu(e.target.checked, row, 'excel', index)}
              />
            </>
          ),
        }
      },
    },
  ]
  const subColumns = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'name',
      key: 'name',
      width: '21%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: 'ดูข้อมูล (View)',
      dataIndex: 'view',
      key: 'view',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                checked={checkValues(row, 'view', index)}
                onChange={(e) => handleCheckMenuSub(e.target.checked, row, 'view', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'เพิ่ม (Add)',
      dataIndex: 'add',
      key: 'add',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenuSub(e.target.checked, row, 'add', index)}
                checked={checkValues(row, 'add', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'แก้ไข (Edit)',
      dataIndex: 'edit',
      key: 'edit',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenuSub(e.target.checked, row, 'edit', index)}
                checked={checkValues(row, 'edit', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ลบ (Delete)',
      dataIndex: 'delete',
      key: 'delete',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenuSub(e.target.checked, row, 'delete', index)}
                checked={checkValues(row, 'delete', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ยกเลิก (cancel)',
      dataIndex: 'cancel',
      key: 'cancel',
      width: '13%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenuSub(e.target.checked, row, 'cancel', index)}
                checked={checkValues(row, 'cancel', index)}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'บันทึกไฟล์ (Export File)',
      dataIndex: 'excel',
      key: 'excel',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => handleCheckMenuSub(e.target.checked, row, 'excel', index)}
                checked={checkValues(row, 'excel', index)}
              />
            </>
          ),
        }
      },
    },
  ]

  const permissionData = (
    <div className='pt-1'>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลบทบาทผู้ดูแล' />
        <Form style={{ padding: '32px' }}>
          <div className='form-group col-lg'>
            <label>
              ชื่อบทบาท <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='permission'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อบทบาท!',
                },
              ]}
            >
              <Input
                placeholder='กรอกชื่อบทบาท'
                onChange={(e) => setRole(e.target.value)}
                autoComplete='off'
              />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )
  // const listMenuData = (
  //   <div className='pt-3'>
  //     <Table
  //       columns={columns}
  //       dataSource={[followjob]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={followjob?.value?.followJob}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[farmerInfo]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={farmerInfo?.value.farmerJob}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[dronerInfo]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={dronerInfo?.value?.dronerJob}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[guru]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={guru?.value?.guru}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[promotion]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={promotion?.value?.promotion}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[pointResult]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={pointResult?.value.pointResult}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[reward]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={reward?.value.reward}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[mission]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={mission?.value.mission}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[challenge]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={challenge?.value.challenge}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[admin]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={admin?.value.admin}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[settings]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={settings?.value.settings}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //     <Table
  //       showHeader={false}
  //       columns={columns}
  //       dataSource={[point]}
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: () => (
  //           <Table
  //             showHeader={false}
  //             columns={subColumns}
  //             dataSource={point?.value.point}
  //             pagination={false}
  //           />
  //         ),
  //       }}
  //     />
  //   </div>
  // )
  const insertPermission = () => {
    const payload: any = {}
    payload.role = role
    payload.followJob = followjobs.value
    payload.farmerInfo = farmerInfo.value
    payload.dronerInfo = dronerInfo.value
    payload.admin = admin.value
    payload.guru = guru.value
    payload.mission = mission.value
    payload.challenge = challenge.value
    payload.reward = reward.value
    payload.pointResult = pointResult.value
    payload.settings = settings.value
    payload.point = point.value
    payload.promotion = promotion.value

    console.log(payload)

    // Swal.fire({
    //   title: 'บันทึกสำเร็จ',
    //   icon: 'success',
    //   timer: 1500,
    //   showConfirmButton: false,
    // }).then(() => {
    //   navigate('/IndexPermission')
    // })
  }
  return (
    <div>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>เพิ่มบทบาทผู้ดูแลระบบ</strong>
        </span>
      </Row>
      {permissionData}
      <TableRole
        dataJob={[followjobs]}
        dataFarmer={[farmerInfo]}
        dataDroner={[dronerInfo]}
        dataGuru={[guru]}
        dataReward={[reward]}
        dataMission={[mission]}
        dataPromotion={[promotion]}
        dataPointResult={[pointResult]}
        dataReportPoint={[reportPoint]}
        dataRedeemPoint={[redeemPoint]}
        dataAdmin={[admin]}
        dataSetting={[settings]}
        dataPoint={[point]}
        dataChallenge={[challenge]}
      />
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={insertPermission}
        // disableSaveBtn={saveBtnDisable}
      />
    </div>
  )
}

export default AddPermission
