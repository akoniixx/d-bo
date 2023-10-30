import { Button, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, TimePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIconButton } from '../../../components/button/BackButton'
import { CardContainer } from '../../../components/card/CardContainer'
import FooterPage from '../../../components/footer/FooterPage'
import { CardHeader } from '../../../components/header/CardHearder'
import { DashboardLayout } from '../../../components/layout/Layout'
import { CampaignDatasource } from '../../../datasource/CampaignDatasource'
import {
  CampaignEntiry,
  CampaignEntiry_INIT,
  CreateCampaignEntiry,
} from '../../../entities/CampaignPointEntites'
import { color } from '../../../resource'
import { validateOnlyNumber } from '../../../utilities/TextFormatter'

const _ = require('lodash')
const EditCampaignPoint = () => {
  const queryString = _.split(window.location.pathname, '=')
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const navigate = useNavigate()
  const dateSearchFormat = 'YYYY-MM-DD'
  const dateFormat = 'DD/MM/YYYY'

  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<CampaignEntiry>(CampaignEntiry_INIT)
  const [update, setUpdate] = useState<CreateCampaignEntiry>()
  const [isEdit, setIsEdit] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [checkDup, setCheckDup] = useState(false)

  const fetchCampaignById = () => {
    CampaignDatasource.getCampaignById(queryString[1]).then((res) => {
      const checkIsEdit = () => {
        if (res.status === 'ACTIVE') {
          setIsActive(
            moment(res.startDate).format(dateSearchFormat) <=
              moment(Date()).format(dateSearchFormat)
              ? true
              : false,
          )
        } else if (res.status === 'INACTIVE') {
          setIsEdit(
            moment(res.endDate).format(dateSearchFormat) < moment(Date()).toISOString()
              ? true
              : false,
          )
          setIsActive(
            moment(res.endDate).format(dateSearchFormat) < moment(Date()).toISOString()
              ? true
              : false,
          )
        }
      }
      checkIsEdit()
      setData(res)
      form.setFieldsValue({
        campaignName: res.campaignName,
        campaignType: res.campaignType,
        application: res.application,
        status: res.status,
        point: res.condition[0].point,
        rai: res.condition[0].rai,
        startDate: !res.startDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startDate).toUTCString()),
        endDate: !res.endDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.endDate).toUTCString()),
        startTime: !res.startDate
          ? moment(new Date().getTime())
          : moment(new Date(res.startDate).getTime()),
        endTime: !res.endDate
          ? moment(new Date().getTime())
          : moment(new Date(res.endDate).getTime()),
      })
    })
  }
  const checkDupCampiagn = async () => {
    const getForm = form.getFieldsValue()
    const startDate = new Date(moment(getForm.startDate).format('YYYY-MM-DD')).toISOString()
    const endDate = new Date(moment(getForm.endDate).format('YYYY-MM-DD')).toISOString()
    const application = getForm.application
    const check = await CampaignDatasource.checkDupCampaign(
      'POINT',
      startDate,
      endDate,
      application,
      queryString[1],
    ).then((res) => {
      if (!res.success) {
        setCheckDup(true)
      } else {
        setCheckDup(false)
      }
      return !res.success
    })
    return check
  }

  useEffect(() => {
    fetchCampaignById()
  }, [])

  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value: inputValue } = e.target
    const convertedNumber = validateOnlyNumber(inputValue)
    form.setFieldsValue({ [name]: convertedNumber })
  }

  const updateCampaign = () => {
    const getForm = form.getFieldsValue()
    const update: any = {}
    const condition: any = {}
    condition.num = 1
    condition.point = parseFloat(getForm.point)
    condition.rai = parseFloat(getForm.rai)
    condition.rewardId = null

    update.campaignName = getForm.campaignName
    update.campaignType = 'POINT'
    update.application = getForm.application
    update.status = getForm.status
    update.condition = [condition]
    update.createBy = profile.firstname + ' ' + profile.lastname
    update.updateBy = profile.firstname + ' ' + profile.lastname
    update.startDate = new Date(
      moment(getForm.startDate).format('YYYY-MM-DD') +
        ' ' +
        moment(getForm.startTime).format('HH:mm:ss'),
    ).toISOString()
    update.endDate = new Date(
      moment(getForm.endDate).format('YYYY-MM-DD') +
        ' ' +
        moment(getForm.endTime).format('HH:mm:ss'),
    ).toISOString()
    setUpdate(update)
    CampaignDatasource.updateCampaign(queryString[1], update).then((res) => {
      if (res.success) {
        navigate('/IndexCampaignPoint')
      }
    })
  }
  const submit = async () => {
    await form.validateFields()
    setShowModal(!showModal)
  }

  return (
    <>
      <>
        <Row>
          <BackIconButton onClick={() => navigate(-1)} />
          <span className='pt-3'>
            <strong style={{ fontSize: '20px' }}>แก้ไขแคมเปญแต้ม</strong>
          </span>
        </Row>
        <CardContainer>
          <CardHeader textHeader='ข้อมูลแคมเปญแต้ม' />
          <Form style={{ padding: '32px' }} form={form}>
            <Col span={24}>
              <label>
                ชื่อแคมเปญแต้ม<span style={{ color: color.Error }}>*</span>
              </label>
              <Form.Item
                name='campaignName'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อแคมเปญแต้ม!',
                  },
                ]}
              >
                <Input placeholder='กรอกชื่อแคมเปญแต้ม' autoComplete='off' disabled={isEdit} />
              </Form.Item>
            </Col>
            <Row>
              <Col span={7}>
                <label>
                  วันเริ่มต้น<span style={{ color: color.Error }}>*</span>
                </label>
                <div className='d-flex'>
                  <Form.Item
                    dependencies={['endDate', 'application', 'startTime', 'endTime']}
                    name='startDate'
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกวันที่!',
                      },
                      {
                        validator: (rules, value) => {
                          return new Promise(async (resolve, reject) => {
                            if (await checkDupCampiagn()) {
                              reject('')
                            } else {
                              resolve(true)
                            }
                          })
                        },
                      },
                    ]}
                  >
                    <DatePicker placeholder='เลือกวันที่' format={dateFormat} disabled={isActive} />
                  </Form.Item>
                  <Form.Item name='startTime' initialValue={moment('00:00', 'HH:mm')}>
                    <TimePicker
                      format={'HH:mm'}
                      className='ms-3'
                      placeholder='เลือกเวลา'
                      defaultValue={moment('00:00', 'HH:mm')}
                      allowClear={false}
                      disabled={isActive}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <label>
                  วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
                </label>
                <Col className='d-flex'>
                  <Form.Item
                    dependencies={['endDate', 'application', 'startTime', 'endTime']}
                    name='endDate'
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกวันที่!',
                      },
                      {
                        validator: (rules, value) => {
                          return new Promise(async (resolve, reject) => {
                            if (await checkDupCampiagn()) {
                              reject('')
                            } else {
                              resolve(true)
                            }
                          })
                        },
                      },
                    ]}
                  >
                    <DatePicker placeholder='เลือกวันที่' format={dateFormat} disabled={isEdit} />
                  </Form.Item>
                  <Form.Item name='endTime' initialValue={moment('23:59', 'HH:mm')}>
                    <TimePicker
                      format={'HH:mm'}
                      className='ms-3'
                      placeholder='เลือกเวลา'
                      defaultValue={moment('00:00', 'HH:mm')}
                      allowClear={false}
                      disabled={isEdit}
                    />
                  </Form.Item>
                </Col>
              </Col>
            </Row>
            {checkDup && (
              <p style={{ color: color.Error }}>
                กรุณาเปลี่ยนแปลงช่วงเวลา “วันเริ่มต้น” หรือ “วันสิ้นสุด”
                เนื่องจากซ้ำกับช่วงเวลาของแคมเปญอื่นที่สร้างไว้ก่อนหน้า
              </p>
            )}
            <Row gutter={8} justify={'start'}>
              <Col span={7}>
                <label>
                  แต้มที่ได้รับ<span style={{ color: color.Error }}>*</span>
                </label>
                <Form.Item
                  name='point'
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกจำนวนแต้ม!',
                    },
                  ]}
                >
                  <Input
                    placeholder='กรอกแต้มที่ได้รับ'
                    suffix='แต้ม'
                    autoComplete='off'
                    disabled={isActive}
                    onChange={(e) => checkNumber(e, 'point')}
                  />
                </Form.Item>
              </Col>
              <Col>
                <label style={{ paddingTop: '25px' }}> : </label>
              </Col>
              <Col span={7}>
                <label>
                  จำนวนไร่ <span style={{ color: color.Error }}>*</span>
                </label>
                <Form.Item
                  name='rai'
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกจำนวนไร่!',
                    },
                  ]}
                >
                  <Input
                    placeholder='กรอกจำนวนไร่ '
                    suffix='ไร่'
                    autoComplete='off'
                    disabled={isActive}
                    onChange={(e) => checkNumber(e, 'rai')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col>
              <label>
                แอปพลิเคชัน <span style={{ color: color.Error }}>*</span>
              </label>
              <Form.Item
                name='application'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกแอปพลิเคชัน',
                  },
                ]}
              >
                <Radio.Group className='d-flex flex-column' disabled={isActive}>
                  <Radio value={'FARMER'}>Farmer</Radio>
                  <Radio value={'DRONER'}>Droner</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col>
              <label>
                สถานะ <span style={{ color: color.Error }}>*</span>
              </label>
              <Form.Item
                name='status'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกแอปพลิเคชัน',
                  },
                ]}
              >
                <Radio.Group className='d-flex flex-column' disabled={isEdit}>
                  <Radio value={'ACTIVE'}>ใช้งาน</Radio>
                  <Radio value={'DRAFTING'}>รอเปิดใช้งาน</Radio>
                  <Radio value={'INACTIVE'}>ปิดการใช้งาน</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Form>
        </CardContainer>
        <FooterPage
          onClickBack={() => navigate(-1)}
          styleFooter={{ padding: '6px' }}
          onClickSave={() => submit()}
        />
      </>
      {showModal && (
        <Modal
          title='ยืนยันการแก้ไข'
          onCancel={() => {
            setShowModal(!showModal)
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
        >
          <div className='px-4 pt-4'>
            <span className='text-secondary'>
              โปรดตรวจสอบแคมเปญที่คุณต้องการแก้ไข ก่อนที่จะกดยืนยันแก้ไข
            </span>
            <p className='text-secondary'>เพราะอาจส่งผลต่อการแต้มในแอปพลิเคชัน</p>
          </div>
          <Divider
            style={{
              marginBottom: '20px',
            }}
          />
          <div className='d-flex justify-content-between px-4 pb-4'>
            <Button
              style={{
                borderColor: color.Success,
                color: color.Success,
              }}
              onClick={() => {
                setShowModal(!showModal)
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Success,
                backgroundColor: color.Success,
                color: color.White,
              }}
              onClick={() => updateCampaign()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default EditCampaignPoint
