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
import { TableRoleManage } from './tableRole/TableRoleManage'
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

function AddPermission() {
  const navigate = useNavigate()
  const [followjob, setFollowjob] = useState({
    key: 'ติดตามงาน',
    name: 'ติดตามงาน',
    value: followJob,
  })
  const [admin, setAdmin] = useState({
    key: 'ผู้ดูแลระบบ',
    name: 'ผู้ดูแลระบบ',
    value: adminJob,
  })
  const [challenge, setChallenge] = useState({
    key: 'ชาเลนจ์',
    name: 'ชาเลนจ์',
    value: challengeJob,
  })
  const [dronerInfo, setDronerInfo] = useState({
    key: 'ข้อมูลนักบินโดรน',
    name: 'ข้อมูลนักบินโดรน',
    value: dronerJob,
  })
  const [farmerInfo, setFarmerInfo] = useState({
    key: 'ข้อมูลเกษตรกร',
    name: 'ข้อมูลเกษตรกร',
    value: farmerJob,
  })
  const [guru, setGuru] = useState({
    key: 'ข่าวสาร / กูรูเกษตร',
    name: 'ข่าวสาร / กูรูเกษตร',
    value: newsJob,
  })
  const [mission, setMission] = useState({
    key: 'ภารกิจ',
    name: 'ภารกิจ',
    value: missionJob,
  })
  const [point, setPoint] = useState({
    key: 'แต้ม',
    name: 'แต้ม',
    value: pointSettingJob,
  })
  const [pointResult, setPointResult] = useState({
    key: 'แต้มสะสม',
    name: 'แต้มสะสม',
    value: pointJob,
  })
  const [promotion, setPromotion] = useState({
    key: 'โปรโมชั่น',
    name: 'โปรโมชั่น',
    value: promotionJob,
  })
  const [reward, setReward] = useState({
    key: 'ของรางวัล',
    name: 'ของรางวัล',
    value: rewardJob,
  })
  const [settings, setSettings] = useState({
    key: 'ตั้งค่า',
    name: 'ตั้งค่า',
    value: settingJob,
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleCheckMenu = (checked: boolean, row: any, value: any, index: number) => {
    switch (row[value].name) {
      case 'followJob':
        const newFollowJob = followjob.value
        newFollowJob[row[value].name][index][value]['value'] = checked
        console.log(newFollowJob)
        // setFollowjob(newFollowJob)
        break
        // case 'farmerInfo':
        //   const newFarmerInfo = farmerInfo
        //   newFarmerInfo[row[value].name][index][value]['value'] = checked
        //   setFarmerInfo(newFarmerInfo)
        //   break
        // case 'dronerInfo':
        //   const droner = dronerInfo
        //   droner[row[value].name][index][value]['value'] = checked
        //   setDronerInfo(droner)
        //   break
        // case 'guru':
        //   const guruInfo = guru
        //   guruInfo[row[value].name][index][value]['value'] = checked
        //   setGuru(guruInfo)
        //   break
        // case 'pointResult':
        //   const pointResultInfo = pointResult
        //   pointResultInfo[row[value].name][index][value]['value'] = checked
        //   setPoint(pointResultInfo)
        //   break
        // case 'promotion':
        //   const promotionInfo = promotion
        //   promotionInfo[row[value].name][index][value]['value'] = checked
        //   setPromotion(promotionInfo)
        //   break
        // case 'reward':
        //   const rewardInfo = reward
        //   rewardInfo[row[value].name][index][value]['value'] = checked
        //   setReward(rewardInfo)
        //   break
        // case 'mission':
        //   const missionInfo = mission
        //   missionInfo[row[value].name][index][value]['value'] = checked
        //   setMission(missionInfo)
        //   break
        // case 'challenge':
        //   const challengeInfo = challenge
        //   challengeInfo[row[value].name][index][value]['value'] = checked
        //   setChallenge(challengeInfo)
        //   break
        // case 'admin':
        //   const adminInfo = admin
        //   adminInfo[row[value].name][index][value]['value'] = checked
        //   setAdmin(adminInfo)
        //   break
        // case 'settings':
        //   const settingsInfo = settings
        //   settingsInfo[row[value].name][index][value]['value'] = checked
        //   setSettings(settingsInfo)
        //   break
        // case 'point':
        // const pointInfo = point
        // pointInfo[row[value].name][index][value]['value'] = checked
        // setPointResult(pointInfo)
        break
      default:
        break
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
              <Input placeholder='กรอกชื่อบทบาท' onChange={handleOnChange} autoComplete='off' />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )
  const listMenuData = (
    <div className='pt-3'>
      <Table
        columns={columns}
        dataSource={[followjob]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={followjob?.value?.followJob}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[farmerInfo]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={farmerInfo?.value.farmerJob}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[dronerInfo]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={dronerInfo?.value?.dronerJob}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[guru]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={guru?.value?.guru}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[promotion]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={promotion?.value?.promotion}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[pointResult]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={pointResult?.value.pointResult}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[reward]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={reward?.value.reward}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[mission]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={mission?.value.mission}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[challenge]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={challenge?.value.challenge}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[admin]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={admin?.value.admin}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[settings]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={settings?.value.settings}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={columns}
        dataSource={[point]}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={columns}
              dataSource={point?.value.point}
              pagination={false}
            />
          ),
        }}
      />
    </div>
  )
  const insertPermission = () => {
    Swal.fire({
      title: 'บันทึกสำเร็จ',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/IndexPermission')
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
      {listMenuData}
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={insertPermission}
        // disableSaveBtn={saveBtnDisable}
      />
    </div>
  )
}

export default AddPermission
