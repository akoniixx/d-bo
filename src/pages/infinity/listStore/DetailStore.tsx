import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { CardHeaderPromotion } from '../../../components/header/CardHeaderPromotion'
import MapGoogle from '../../../components/map/GoogleMap'
import { LAT_LNG_BANGKOK } from '../../../definitions/Location'
import color from '../../../resource/color'
import { Badge, Button, Divider, Upload, UploadFile } from 'antd'
import image from '../../../resource/image'
import { CardContainer } from '../../../components/card/CardContainer'
import { OneFinityShopDatasource } from '../../../datasource/OneFinityShopDatasource'
import { shopOneFinityEntity } from '../../../entities/OneFinityShopEntities'
const _ = require('lodash')

function DetailStore() {
  const navigate = useNavigate()
  const queryString = _.split(window.location.pathname, '=')

  const [detail, setDetail] = useState<shopOneFinityEntity>()

  useEffect(() => {
    const fetchShopDetail = async () => {
      await OneFinityShopDatasource.getListShopById(queryString[1]).then((res) => {
        setDetail(res)
        console.log(res)
      })
    }
    fetchShopDetail()
  }, [])

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
        <strong style={{ fontSize: '20px' }}>{`รายละเอียด | ร้าน "${detail?.shopName}"`}</strong>
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
              <div className='col'>{detail?.shopNo || '-'}</div>
              <div className='col'>{detail?.shopName || '-'}</div>
              <div className='col'>{detail?.taxNo || '-'}</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col'>ที่อยู่ (บ้านเลขที่ หมู่ ซอย ชั้น อาคาร)</div>
              <div className='col' />
              <div className='col'>รหัสไปรษณีย์</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>{detail?.addressDesc || '-'}</div>
              <div className='col' />
              <div className='col'>{detail?.address.postcode || '-'}</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col'>ตำบล</div>
              <div className='col'>อำเภอ</div>
              <div className='col'>จังหวัด</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>{detail?.address.subdistrictName || '-'}</div>
              <div className='col'>{detail?.address.districtName || '-'}</div>
              <div className='col'>{detail?.address.provinceName || '-'}</div>
            </div>
            <Divider />
            <div className='row' style={{ fontWeight: '500' }}>
              <div className='col'>เจ้าของร้าน</div>
              <div className='col'>ชื่อเล่น</div>
              <div className='col'>เบอร์โทรศัพท์</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>
                {detail?.title + ' ' + detail?.firstname + ' ' + detail?.lastname}
              </div>
              <div className='col'>{detail?.nickname || '-'}</div>
              <div className='col'>{detail?.telephoneFirst || '-'}</div>
            </div>
            <div className='row pt-4' style={{ fontWeight: '500' }}>
              <div className='col'>อีเมล์</div>
            </div>
            <div className='row' style={{ fontWeight: '300' }}>
              <div className='col'>{detail?.email || '-'}</div>
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
            <div
              className='row'
              style={{ fontWeight: '500', color: detail?.isActive ? color.Success : color.Error }}
            >
              <div className='col'>
                <Badge color={detail?.isActive ? color.Success : color.Error} />{' '}
                {detail?.isActive ? 'ใช้งาน' : 'ปิดการใช้งาน'}
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
              lat={Number(detail?.latitude)}
              lng={Number(detail?.longitude)}
            />
            <div className='p-3'>
              <span>ละติจูด / ลองติจูด</span>
              <p>
                {detail?.latitude || '-'} / {detail?.longitude || '-'}
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
                    'https://maps.google.com?q=' + detail?.latitude + ',' + detail?.longitude,
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
