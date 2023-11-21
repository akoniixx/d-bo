import React, { useState } from 'react'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion'
import { color, icon } from '../../resource'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Divider, Image, Radio } from 'antd'
import '../../pages/gurukaset/styles.css'
import uploadImg from '../../resource/media/empties/defaultImgGuru.png'
import moment from 'moment'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'

interface RenderArticleGuruProps {
  img: string
  title: string
  detail: string
  date: any
  category: string
}
const RenderArticleGuru: React.FC<RenderArticleGuruProps> = ({
  img = uploadImg,
  title = 'หัวข้อ',
  detail,
  date,
  category = 'ชื่อหมวดหมู่',
}) => {
  const [key, setKey] = useState<string>('feed')

  const handleButtonClick = (value: string) => {
    setKey(value)
  }

  const headButton = (
    <div>
      <Button onClick={() => handleButtonClick('feed')} className='custom-btn-left'>
        ฟีด
      </Button>
      <Button onClick={() => handleButtonClick('detail')} className='custom-btn-right'>
        รายละเอียด
      </Button>
    </div>
  )

  return (
    <div className='col'>
      <CardHeaderPromotion textHeader='ตัวอย่างในแอปพลิเคชั่น' center={false} button={headButton} />
      <div className='bg-white p-4'>
        <div style={{ position: 'relative' }}>
          <Image src={img} width={'100%'} height={'100%'} preview={false} />
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              padding: '8px',
              backgroundColor: color.White,
              borderRadius: '16px',
            }}
          >
            <strong>{category}</strong>
          </div>
        </div>
        <div className='p-4'>
          <h4>{title}</h4>
          {key !== 'detail' ? (
            <p style={{ fontSize: 16, fontFamily: 'Sarabun' }}>
              {!detail ? (
                <span>
                  รายละเอียด... <span style={{ color: 'grey' }}>อ่านเพิ่ม</span>
                </span>
              ) : (
                detail
              )}
            </p>
          ) : (
            <span>{DateTimeUtil.formatDateThShort(moment().toString())}</span>
          )}

          <div className='d-flex justify-content-between'>
            <div className='d-flex col-lg '>
              <div className='col-3'>
                <img src={icon.love} style={{ width: '16px', height: '16px' }} alt='Love Icon' />
                <span> 0</span>
              </div>
              <div>
                <img
                  src={icon.comment}
                  style={{ width: '16px', height: '16px' }}
                  alt='Comment Icon'
                />
                <span> 0</span>
              </div>
            </div>
            <div className='d-flex col-lg justify-content-end'>
              <span className='text-secondary' style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '5px' }}>xx นาที</span>
                <span style={{ fontSize: '24px', margin: '0 5px' }}>•</span>
                <img
                  src={icon.view}
                  style={{ width: '16px', height: '14px', marginLeft: '5px' }}
                  alt='View Icon'
                />
                <span style={{ marginLeft: '5px' }}>xx</span>
              </span>
            </div>
          </div>
          <Divider />
          <div>
            {!detail ? <span style={{ fontFamily: 'Sarabun' }}>รายละเอียด...</span> : detail}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenderArticleGuru
