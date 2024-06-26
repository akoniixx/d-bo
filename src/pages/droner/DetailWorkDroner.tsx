import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Form, Input, Row, Select, Tag } from 'antd'
import { BackIconButton } from '../../components/button/BackButton'
import { CardContainer } from '../../components/card/CardContainer'
import { CardHeader } from '../../components/header/CardHearder'
import color from '../../resource/color'
import GoogleMap from '../../components/map/GoogleMap'
import { LAT_LNG_BANGKOK } from '../../definitions/Location'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import { taskDetailEntity, taskDetailEntity_INIT } from '../../entities/DronerRankEntities'
import { DronerRankDatasource } from '../../datasource/DronerRankDatasource'
import { StarFilled, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { UploadImageDatasouce } from '../../datasource/UploadImageDatasource'
import { CouponDataSource } from '../../datasource/CouponDatasource'
import { useNavigate } from 'react-router-dom'
import { formatNumberWithCommas } from '../../utilities/TextFormatter'
import ImagCards from '../../components/card/ImagCard'
import { image } from '../../resource'
import ShowNickName from '../../components/popover/ShowNickName'
import { TaskImageDatasource } from '../../datasource/TaskImageDatasource'
const _ = require('lodash')
const dateFormat = 'DD/MM/YYYY'
const timeFormat = 'HH:mm'

function DetailWorkDroner() {
  const queryString = _.split(window.location.search, '=')
  const navigate = useNavigate()
  const taskId = queryString[1]
  const [data, setData] = useState<taskDetailEntity>(taskDetailEntity_INIT)
  const imgList: (string | boolean)[] = []
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  })
  const [imgDrug, setImgDrug] = useState<any>()

  const [imgFinish, setImgFinish] = useState<any>(null)
  const [couponData, setCouponData] = useState<{
    couponCode: string
    couponName: string
    couponDiscount: number | null
  }>({
    couponCode: '',
    couponName: '',
    couponDiscount: null,
  })

  const fetchTask = async () => {
    await DronerRankDatasource.getTaskDetail(taskId).then((res) => {
      if (res.couponId !== null) {
        CouponDataSource.getPromotionCode(res.couponId).then((result) =>
          setCouponData({
            couponCode: result.couponCode ? result.couponCode : '-',
            couponDiscount: !res.discount ? 0 : parseInt(res.discount),
            couponName: result.couponName ? result.couponName : '-',
          }),
        )
      }
      setData(res)
      if (res.imagePathDrug) {
        UploadImageDatasouce.getImage(res.imagePathDrug).then((resImg) => {
          setImgDrug([resImg.url])
        })
      }
      setMapPosition({
        lat: parseFloat(res.farmerPlot.lat),
        lng: parseFloat(res.farmerPlot.long),
      })
    })
  }
  useEffect(() => {
    const getImageTask = async () => {
      await TaskImageDatasource.getImgByTask(taskId).then((res) => {
        if (res) {
          const imgArray: any[] = res.map((item: any) => {
            return {
              id: item.id,
              url: item.pathFinishTask,
              file: item.pathFinishTask,
              percent: 100,
            }
          })
          setImgFinish(imgArray)
        }
      })
    }
    getImageTask()
  }, [])

  useEffect(() => {
    fetchTask()
  }, [])

  const starIcon = (
    <StarFilled
      style={{
        color: '#FFCA37',
        fontSize: '20px',
        marginRight: '10px',
      }}
    />
  )
  const renderAppointment = (
    <Form style={{ padding: '32px' }}>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-lg-6'>
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <Input
                  style={{ width: '100%' }}
                  value={moment(new Date(data.dateAppointment)).format(dateFormat)}
                  disabled
                  suffix={<CalendarOutlined />}
                />
              </Form.Item>
            </div>
            <div className='col-lg-6'>
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <Input
                  style={{ width: '100%' }}
                  value={moment(new Date(data.dateAppointment)).format(timeFormat)}
                  disabled
                  suffix={<ClockCircleOutlined />}
                />
              </Form.Item>
            </div>
          </div>
          <label>ช่วงเวลาฉีดพ่น</label>
          <Form.Item>
            <Select
              disabled
              value={data.purposeSpray !== null ? data.purposeSpray.purposeSprayName : '-'}
            />
          </Form.Item>
          <label>เป้าหมายการฉีดพ่น</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.targetSpray !== null ? data.targetSpray.join(',') : '-'}
            </span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <div className='row'>
            <div className='col-lg'>
              <label>ภาพหลักฐานการบิน </label>
              <span style={{ color: color.Grey }}> ({imgFinish?.length || 0} รูป)</span>
              <br />
              <ImagCards image={imgFinish || image.empty_cover} />
            </div>
            <div className='col-lg'>
              <label>ภาพปุ๋ยและยา </label>
              <span style={{ color: color.Grey }}> ({imgDrug?.length || 0} รูป)</span>
              <br />
              <ImagCards image={imgDrug ? imgDrug : image.empty_cover} show={true} />
            </div>
          </div>
          <br />
          <label>หมายเหตุ</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>{data.comment ? data.comment : '-'}</span>
          </Form.Item>
        </div>
        <div className='col-lg-1'></div>
        <div className='col-lg-5'>
          <label>ค่าบริการ</label>
          <Form.Item style={{ color: color.Grey }}>
            <span>
              {data.price !== null
                ? formatNumberWithCommas(data.price) + ' ' + 'บาท'
                : '0.00' + ' ' + 'บาท'}
            </span>{' '}
            <span>
              {data.farmAreaAmount !== null
                ? '(จำนวน' +
                  ' ' +
                  formatNumberWithCommas(parseFloat(data.farmAreaAmount)) +
                  ' ' +
                  'ไร่)'
                : '0'}
            </span>
          </Form.Item>
          <br />
          <Form.Item>
            <div className='row'>
              <label className='col-lg-3'>คะแนนรีวิว </label>
              <div className='col-lg-6'>
                {data.reviewDronerAvg > '0' ? (
                  <Row>
                    {starIcon}
                    <span>{parseFloat(data.reviewDronerAvg).toFixed(1)}</span>
                  </Row>
                ) : (
                  '-'
                )}
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-lg-6' style={{ color: color.Grey }}>
                1. มารยาทนักบิน{' '}
              </div>
              <div className='col-lg-6'>
                {data.reviewDronerDetail !== null ? (
                  <Row>
                    {starIcon}
                    <span>{parseFloat(data.reviewDronerDetail.pilotEtiquette).toFixed(1)}</span>
                  </Row>
                ) : (
                  '-'
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6' style={{ color: color.Grey }}>
                2. ความตรงต่อเวลา{' '}
              </div>
              <div className='col-lg-6'>
                {data.reviewDronerDetail !== null ? (
                  <Row>
                    {starIcon}
                    <span>{parseFloat(data.reviewDronerDetail.punctuality).toFixed(1)}</span>
                  </Row>
                ) : (
                  '-'
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6' style={{ color: color.Grey }}>
                3. ความเชี่ยวชาญในการพ่น{' '}
              </div>
              <div className='col-lg-6'>
                {data.reviewDronerDetail !== null ? (
                  <Row>
                    {starIcon}
                    <span>{parseFloat(data.reviewDronerDetail.sprayExpertise).toFixed(1)}</span>
                  </Row>
                ) : (
                  '-'
                )}
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={3}
              disabled
              value={
                data.reviewDronerDetail && data.reviewDronerDetail.comment
                  ? data.reviewDronerDetail.comment
                  : '-'
              }
            />
          </Form.Item>
          <label>สถานะ</label>
          <Form.Item>
            <span style={{ color: color.Success }}>
              <Badge color={color.Success} />
              {data.status == 'DONE' ? ' เสร็จสิ้น' : null}
              <br />
            </span>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
  const renderFarmer = (
    <Form key={data.farmerId}>
      <div style={{ padding: '30px' }}>
        <div className='row'>
          <div className='col-lg-4 text-start'>
            <label>ชื่อ-นามสกุล</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmer.firstname + ' ' + data.farmer.lastname} />
            </Form.Item>
          </div>
          <div className='col-lg-4 text-start'>
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmer.telephoneNo} />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4 text-start'>
            <label>แปลง</label>
            <Form.Item>
              <Select disabled defaultValue={data.farmerPlot.plotName} />
            </Form.Item>
          </div>
          <div className='col-lg-4 text-start'>
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmerPlot.plantName} />
            </Form.Item>
          </div>
          <div className='col-lg-4 text-start'>
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.farmerPlot.raiAmount
                    ? formatNumberWithCommas(parseFloat(data.farmerPlot.raiAmount))
                    : 0
                }
                suffix='ไร่'
              />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12 text-start'>
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.farmerPlot.plotArea !== null
                    ? data.farmerPlot.plotArea.subdistrictName +
                      '/' +
                      data.farmerPlot.plotArea.districtName +
                      '/' +
                      data.farmerPlot.plotArea.provinceName
                    : '-'
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 text-start'>
            <label>Latitude (ละติจูด)</label>
            <Form.Item key={mapPosition.lat}>
              <Input disabled defaultValue={mapPosition.lat} />
            </Form.Item>
          </div>
          <div className='col-lg-6 text-start'>
            <label>Longitude (ลองติจูด)</label>
            <Form.Item key={mapPosition.lng}>
              <Input disabled defaultValue={mapPosition.lng} />
            </Form.Item>
          </div>
        </div>
        <GoogleMap
          width='100%'
          height='300px'
          zoom={17}
          lat={mapPosition.lat}
          lng={mapPosition.lng}
        />
        <div className='row'>
          <div className='col-lg-12 text-start'>
            <label>จุดสังเกต</label>
            <Form.Item>
              <Input disabled value={data.farmerPlot.landmark} />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  )
  const renderDroner = (
    <Form style={{ padding: '32px' }}>
      {data.droner !== null && data.droner.isDelete !== true ? (
        <div className='row'>
          <div className='col-lg-3'>
            <span>
              {data.droner.firstname + ' ' + data.droner.lastname}
              <br />
              <p style={{ fontSize: '12px', color: color.Grey }}>
                {data.droner.dronerCode}
                {data.droner.nickname && (
                  <ShowNickName
                    data={data.droner.nickname}
                    menu='Detail'
                    status={data.droner.status}
                  />
                )}
              </p>
            </span>
          </div>
          <div className='col-lg-3'>
            <span>{data.droner.telephoneNo ? data.droner.telephoneNo : '-'}</span>
          </div>
          <div className='col-lg-4'>
            {data.droner.address.subdistrict.subdistrictName
              ? data.droner.address.subdistrict.subdistrictName + ','
              : '-/'}

            {data.droner.address.district.districtName
              ? data.droner.address.district.districtName + ','
              : '-/'}

            {data.droner.address.province.provinceName
              ? data.droner.address.province.provinceName
              : '-'}
          </div>
          <div className='col-lg'>
            <span>
              <Avatar
                size={25}
                src={
                  data.droner.dronerDrone && data.droner.dronerDrone[0] !== null
                    ? data.droner.dronerDrone[0].drone.droneBrand.logoImagePath
                    : null
                }
                style={{ marginRight: '5px' }}
              />
              {data.droner.dronerDrone && data.droner.dronerDrone[0] !== null
                ? data.droner.dronerDrone[0].drone.droneBrand.name
                : '-'}
            </span>
            <br />
            <span style={{ color: color.Grey, fontSize: '12px' }}>
              {data.droner.dronerDrone && data.droner.dronerDrone.length! > 1
                ? '(มากกว่า 1 ยี่ห้อ)'
                : null}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <strong style={{ color: color.Error, alignItems: 'center' }}>
            ผู้ใช้งานนี้ถูกลบแล้ว
          </strong>
        </div>
      )}
    </Form>
  )
  const renderPrice = (
    <Form style={{ padding: '20px' }}>
      <Form style={{ padding: '20px', backgroundColor: '#2196531A' }}>
        <div className='row'>
          <div className='col-lg'>
            <Form.Item>
              <span>
                ยอดรวมค่าบริการ (หลังรวมค่าธรรมเนียม)
                <br />
                <b style={{ fontSize: '20px', color: color.Success }}>
                  {data.totalPrice !== null
                    ? formatNumberWithCommas(data.totalPrice) + ' ' + 'บาท'
                    : '0.00' + ' ' + 'บาท'}
                </b>
              </span>
            </Form.Item>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4'>
            <Form.Item>
              <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
              <Input
                disabled
                value={data.price !== null ? formatNumberWithCommas(data.price) : '0.00'}
                suffix='บาท'
              />
            </Form.Item>
          </div>
          <div className='col-lg-4'>
            <Form.Item>
              <label>ค่าธรรมเนียม (5% ของค่าบริการ)</label>
              <Input
                disabled
                placeholder='0.0'
                value={data.fee !== null ? formatNumberWithCommas(data.fee) : '0.00'}
                suffix='บาท'
              />
            </Form.Item>
          </div>
          <div className='col-lg-4'>
            <Form.Item>
              <label>ส่วนลดค่าธรรมเนียม</label>
              <Input
                disabled
                value={
                  data.discountFee !== null ? formatNumberWithCommas(data.discountFee) : '0.00'
                }
                suffix='บาท'
              />
            </Form.Item>
          </div>
          <div className='form-group col-lg-4'>
            <label>รหัสคูปอง</label>
            <Input value={couponData.couponCode} disabled autoComplete='off' />
          </div>
          <div className='form-group col-lg-4'>
            <label>ชื่อคูปอง</label>
            <Input value={couponData.couponName} disabled autoComplete='off' />
          </div>
          <div className='form-group col-lg-4'>
            <label>ส่วนลดคูปอง</label>
            <Input value={couponData.couponDiscount!} disabled autoComplete='off' />
          </div>
        </div>
      </Form>
    </Form>
  )

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate('/DetailRankDroner?=' + data.dronerId)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>รายละเอียดงาน #{data.taskNo}</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='นัดหมายบริการ' />
        {renderAppointment}
      </CardContainer>{' '}
      <br />
      <CardContainer>
        <CardHeader textHeader='ข้อมูลเกษตรกรและแปลง' />
        {renderFarmer}
      </CardContainer>
      <br />
      <CardContainer>
        <CardHeader textHeader='รายชื่อนักบินโดรน' />
        {renderDroner}
      </CardContainer>
      <br />
      <CardContainer>
        <CardHeader textHeader='ยอดรวมค่าบริการ' />
        {renderPrice}
      </CardContainer>
    </>
  )
}

export default DetailWorkDroner
