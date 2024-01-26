import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Form, Input, Row, Table } from 'antd'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import { RoleManage } from '../../datasource/RoleManageDatasource'
import { numberWithCommas } from '../../utilities/TextFormatter'
import TableRole from '../../components/table/TableRole'
import {
  adminJob,
  challengeJob,
  dronerJob,
  farmerJob,
  followJob,
  missionJob,
  newsJob,
  oneFinity,
  pointJob,
  promotionJob,
  rewardJob,
  settingJob,
} from './DefaultRole'
const _ = require('lodash')

function EditPermission() {
  const queryString = _.split(window.location.pathname, '=')
  const roleId = queryString[1]
  const [saveBtnDisable, setSaveBtnDisable] = useState<boolean>(false)

  const navigate = useNavigate()
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
  const [pointResult, setPointResult] = useState({
    name: 'แต้มสะสม',
    value: pointJob,
  })
  const [promotion, setPromotion] = useState({
    name: 'โปรโมชั่น',
    value: promotionJob,
  })
  const [finity, setDataFinity] = useState({
    name: 'ระบบ 1-finity',
    value: oneFinity,
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
  const [form] = Form.useForm()
  const [loading, setReloading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRoleById = async () => {
      await RoleManage.getRoleById(roleId).then((res) => {
        setFollowjobs({
          ...followjobs,
          value: {
            followJob: res.followJob,
          },
        })
        setReloading(false)
        setAdmin({
          ...admin,
          value: {
            admin: res.admin,
          },
        })
        setDataFinity({
          ...finity,
          value: {
            finity: res.finity,
          },
        })
        setChallenge({
          ...challenge,
          value: {
            challenge: res.challenge,
          },
        })
        setDronerInfo({
          ...dronerInfo,
          value: {
            dronerJob: res.dronerInfo,
          },
        })
        setFarmerInfo({
          ...farmerInfo,
          value: {
            farmerJob: res.farmerInfo,
          },
        })
        setGuru({
          ...guru,
          value: {
            guru: res.guru,
          },
        })
        setMission({
          ...mission,
          value: {
            mission: res.mission,
          },
        })
        setPointResult({
          ...pointResult,
          value: {
            pointResult: res.pointResult,
          },
        })
        setPromotion({
          ...promotion,
          value: {
            promotion: res.promotion,
          },
        })
        setReward({
          ...reward,
          value: {
            reward: res.reward,
          },
        })
        setSettings({
          ...settings,
          value: {
            settings: res.settings,
          },
        })
        setReportPoint({
          ...reportPoint,
          value: {
            subPointResult: res.pointResult[0].subItem.subPointResult,
          },
        })
        setRedeemPoint({
          ...redeemPoint,
          value: {
            subPointResult: res.pointResult[1].subItem.subPointResult,
          },
        })
        form.setFieldsValue({
          role: res.role,
          count: numberWithCommas(res.count),
        })
      })
    }
    fetchRoleById()
  }, [])

  const permissionData = (
    <div className='pt-1'>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลบทบาทผู้ดูแล' />
        <Form form={form} style={{ padding: '32px' }} className='row'>
          <div className='form-group col-lg-6'>
            <label>
              ชื่อบทบาท <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='role'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อบทบาท!',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อบทบาท' autoComplete='off' />
            </Form.Item>
          </div>
          <div className='form-group col-lg-6'>
            <label>จำนวนผู้ดูแลระบบ</label>
            <Form.Item name='count'>
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )
  const updatePermission = async () => {
    setSaveBtnDisable(true)
    const payload: any = {}
    payload.id = roleId
    payload.role = form.getFieldValue('role')
    payload.count = form.getFieldValue('count')
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
    await RoleManage.updateRole(payload)
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

  if (loading) {
    return <></>
  } else {
    return (
      <div>
        <Row>
          <BackIconButton onClick={() => navigate(-1)} />
          <span className='pt-3'>
            <strong style={{ fontSize: '20px' }}>แก้ไขบทบาทผู้ดูแลระบบ</strong>
          </span>
        </Row>
        {permissionData}
        <TableRole
          page='edit'
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
          onClickSave={updatePermission}
          disableSaveBtn={saveBtnDisable}
        />
      </div>
    )
  }
}

export default EditPermission
