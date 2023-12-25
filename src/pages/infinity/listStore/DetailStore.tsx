import React from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { CardHeaderPromotion } from '../../../components/header/CardHeaderPromotion'
import MapGoogle from '../../../components/map/GoogleMap'
import { LAT_LNG_BANGKOK } from '../../../definitions/Location'
import color from '../../../resource/color'
import { Badge, Button, Divider, Upload, UploadFile } from 'antd'
import image from '../../../resource/image'
import { CardContainer } from '../../../components/card/CardContainer'

function DetailStore() {
  const navigate = useNavigate()
  const fileList: UploadFile[] = [
    {
      uid: '1',
      name: 'yyy.png',
      status: 'done',
      url: image.condition,
      thumbUrl: image.condition,
    },
  ]
  return (
    <>
      <div className='d-flex align-items-center'>
        <BackIconButton onClick={() => navigate(-1)} />
        <strong style={{ fontSize: '20px' }}>{`รายละเอียด | ร้าน "ไม้เมืองการเกษตร"`}</strong>
      </div>
      <div className='row p-2 pb-4'>
        <div className='col-8'>
          <CardHeaderPromotion textHeader='ข้อมูลร้านค้า' center={false} />
          <div className='bg-white px-5 py-3'>
            <div className='row' style={{ fontWeight: '500' }}>
              <div className='col'>รหัสร้านค้า</div>
              <div className='col'>ชื่อร้านค้า</div>
              <div className='col'>หมายเลขนิติบุคคล</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>CL00169</div>
              <div className='col'>ไม้เมืองการเกษตร</div>
              <div className='col'>33600006789</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col'>ที่อยู่ (บ้านเลขที่ หมู่ ซอย ชั้น อาคาร)</div>
              <div className='col' />
              <div className='col'>รหัสไปรษณีย์</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>245 ม.5</div>
              <div className='col' />
              <div className='col'>62000</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col'>ตำบล</div>
              <div className='col'>อำเภอ</div>
              <div className='col'>จังหวัด</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>นครชุม</div>
              <div className='col'>เมือง</div>
              <div className='col'>กำแพงเพชร</div>
            </div>
            <Divider />
            <div className='row' style={{ fontWeight: '500' }}>
              <div className='col'>เจ้าของร้าน</div>
              <div className='col'>หมายเลขบัตรประชาชน</div>
              <div className='col'>อีเมล์</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>นางแก้วคำมา แสนแปลง</div>
              <div className='col'>-</div>
              <div className='col'>-</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col'>เบอร์โทรศัพท์ (หลัก)</div>
              <div className='col'>เบอร์โทรศัพท์ (รอง)</div>
              <div className='col' />
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>0989284761</div>
              <div className='col'>0855233635</div>
              <div className='col' />
            </div>
            <Divider />
            <div className='row' style={{ fontWeight: '500' }}>
              <div className='col'>สัญญาเข้าร่วมโครงการ</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col-lg-6'>
                <Upload
                  listType='picture'
                  defaultFileList={[...fileList]}
                  showUploadList={{ showRemoveIcon: false }}
                />
              </div>
            </div>
            <Divider />
            <div className='row' style={{ fontWeight: '500' }}>
              <div className='col'>สถานะ</div>
            </div>
            <div className='row' style={{ fontWeight: '500', color: color.Success }}>
              <div className='col'>
                <Badge color={color.Success} /> ใช้งาน
              </div>
            </div>
          </div>
        </div>
        <div className='col-4'>
          <CardHeaderPromotion textHeader='แผนที่ร้าน' center={false} />
          <div className='bg-white'>
            <MapGoogle
              width='100%'
              height='370px'
              zoom={17}
              lat={LAT_LNG_BANGKOK.lat}
              lng={LAT_LNG_BANGKOK.lng}
            />
            <div className='p-3'>
              <span>ละติจูด / ลองติจูด</span>
              <p>
                {LAT_LNG_BANGKOK.lat} / {LAT_LNG_BANGKOK.lng}
              </p>
              <Button
                style={{
                  color: color.Success,
                  width: '100%',
                  height: '40px',
                  borderRadius: '6px',
                  borderWidth: 1,
                  borderColor: color.Success,
                  background: color.White,
                }}
                onClick={() =>
                  window.open(
                    'https://maps.google.com?q=' +
                      LAT_LNG_BANGKOK?.lat +
                      ',' +
                      LAT_LNG_BANGKOK?.lng,
                  )
                }
              >
                ดูแผนที่ร้าน
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailStore
