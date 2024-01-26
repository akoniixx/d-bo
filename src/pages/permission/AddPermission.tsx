/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react'
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
  promotionJob,
  rewardJob,
  settingJob,
  oneFinity,
} from './DefaultRole'
import TableRole from '../../components/table/TableRole'
import { RoleManage } from '../../datasource/RoleManageDatasource'

function AddPermission() {
  const navigate = useNavigate()
  const [role, setRole] = useState<string>('')
  const [saveBtnDisable, setSaveBtnDisable] = useState<boolean>(true)
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
  const [finity, setDataFinity] = useState({
    name: 'ระบบ 1-finity',
    value: oneFinity,
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
                onChange={(e) => {
                  setRole(e.target.value)
                  setSaveBtnDisable(e.target.value ? false : true)
                }}
                autoComplete='off'
              />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )

  const insertPermission = async () => {
    setSaveBtnDisable(true)
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
    payload.promotion = promotion.value?.promotion
    payload.finity = finity.value?.finity
    await RoleManage.insertRole(payload)
      .then((res) => {
        setSaveBtnDisable(false)
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
      .catch((err) => {
        setSaveBtnDisable(false)
        console.log(err)
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
        page='add'
        dataJob={[followjobs]}
        dataFarmer={[farmerInfo]}
        dataDroner={[dronerInfo]}
        dataGuru={[guru]}
        dataReward={[reward]}
        dataMission={[mission]}
        dataPromotion={[promotion]}
        dataPointResult={[pointResult]}
        dataAdmin={[admin]}
        dataSetting={[settings]}
        dataChallenge={[challenge]}
        dataFinity={[finity]}
      />
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={insertPermission}
        disableSaveBtn={saveBtnDisable}
      />
    </div>
  )
}

export default AddPermission
