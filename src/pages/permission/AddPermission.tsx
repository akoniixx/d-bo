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
import { RoleManage } from '../../datasource/RoleManageDatasource'
import { RoleEntity, RoleEntity_INIT } from '../../entities/RoleEntities'

function AddPermission() {
  const navigate = useNavigate()
  const [role, setRole] = useState<string>('')
  const [insertRole, setInsertRole] = useState<any>()
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
    value: pointJob.pointResult[0].subItem,
  })
  const [redeemPoint, setRedeemPoint] = useState({
    name: 'แลกแต้ม/ของรางวัล',
    value: pointJob.pointResult[1].subItem,
  })
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
  const insertPermission = async () => {
    const payload: any = {}
    payload.role = role
    payload.followJob = followjobs.value?.followJob
    payload.farmerInfo = farmerInfo.value?.farmerJob
    payload.dronerInfo = dronerInfo.value?.dronerJob
    payload.admin = admin.value?.admin
    payload.guru = guru.value?.guru
    payload.mission = mission.value?.mission
    payload.challenge = challenge.value?.challenge
    payload.reward = reward.value?.reward
    payload.pointResult = pointResult.value?.pointResult
    payload.settings = settings.value?.settings
    payload.point = point.value?.point
    payload.promotion = promotion.value?.promotion
    setInsertRole(payload)
     await RoleManage.insertRole(payload).then((res) => {
      if (res) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/IndexPermission')
        })
      }
    })
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
