import '../../pages/gurukaset/styles.css'
import moment from 'moment'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion'
import { Button, Divider, Image } from 'antd'
import parse from 'html-react-parser'
import '../../news.css'
import { color, icon } from '../../resource'
import uploadImg from '../../resource/media/empties/defaultImgGuru.png'

interface RenderArticleGuruProps {
  img: string
  title: string
  detail: string
  category: string
}

const RenderArticleGuru: React.FC<RenderArticleGuruProps> = ({
  img = uploadImg,
  title,
  detail,
  category = 'ชื่อหมวดหมู่',
}) => {
  const div = useRef<any>()
  const [key, setKey] = useState<string>('feed')
  useLayoutEffect(() => {
    const divAnimate = div.current.getBoundingClientRect().top
    const onScroll = () => {
      if (divAnimate < window.scrollY) {
        div.current.style.position = 'sticky'
        div.current.style.top = 0
      } else {
        div.current.style.position = 'relative'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleButtonClick = (value: string) => {
    setKey(value)
  }

  const headButton = (
    <div>
      <Button
        style={{ width: '90px' }}
        onClick={() => handleButtonClick('feed')}
        className='custom-btn-left'
      >
        ฟีด
      </Button>
      <Button
        style={{ width: '90px' }}
        onClick={() => handleButtonClick('detail')}
        className='custom-btn-right'
      >
        รายละเอียด
      </Button>
    </div>
  )

  return (
    <div className='col-lg-5'>
      <div ref={div}>
        <CardHeaderPromotion
          textHeader='ตัวอย่างในแอปพลิเคชัน'
          center={false}
          button={headButton}
        />
        <div
          style={{
            width: '100%',
          }}
          className='bg-white'
        >
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Image src={img} width={'100%'} height={'100%'} preview={false} />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  right: 12,
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                }}
              >
                <strong>{category}</strong>
              </div>
            </div>
            <div className='p-4'>
              <h4>{title}</h4>
              {key !== 'detail' ? (
                <>
                  <p style={{ fontSize: 16, fontFamily: 'Sarabun' }}>
                    {!detail ? (
                      <span style={{ fontFamily: 'Sarabun' }}>รายละเอียด...</span>
                    ) : (
                      <>
                        {detail.trim().length > 50 ? (
                          <div className='d-flex'>
                            {parse(detail.substring(0, 50))}

                            <span style={{ fontFamily: 'Sarabun', color: color.Grey }}>
                              ... อ่านเพิ่ม
                            </span>
                          </div>
                        ) : (
                          parse(detail)
                        )}
                      </>
                    )}
                  </p>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex col-lg '>
                      <div className='col-3'>
                        <img
                          src={icon.love}
                          style={{ width: '16px', height: '16px' }}
                          alt='Love Icon'
                        />
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
                      <span
                        className='text-secondary'
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
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
                  <Divider style={{ margin: '8px', paddingBottom: '15%' }} />
                </>
              ) : (
                <>
                  <div className='d-flex' style={{ fontFamily: 'sarabun', color: color.Grey }}>
                    <span className='col-3'>
                      {DateTimeUtil.formatDateThShort(moment().toString())}
                    </span>
                    <p>อ่านแล้ว 0 ครั้ง</p>
                  </div>
                  <Divider style={{ margin: '8px' }} />
                  <div
                    className='d-flex justify-content-between'
                    style={{ padding: '0px 42px 0px 42px' }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      <img
                        src={icon.love}
                        style={{ width: '22px', height: '22px', marginRight: 6 }}
                      />
                      ถูกใจ
                    </span>
                    <span style={{ fontWeight: 'bold' }}>
                      <img
                        src={icon.comment}
                        style={{ width: '22px', height: '22px', marginRight: 6 }}
                      />
                      ความคิดเห็น
                    </span>{' '}
                  </div>
                  <Divider style={{ margin: '8px' }} />
                  <div className='pt-3 pb-5' style={{ maxHeight: '440px', overflowY: 'auto' }}>
                    <p style={{ fontSize: 16, fontFamily: 'Sarabun' }}>
                      <div className='d-flex'>
                        <p style={{ fontSize: 16, fontFamily: 'Sarabun' }}>
                          {!detail ? (
                            <span style={{ fontFamily: 'Sarabun' }}>รายละเอียด...</span>
                          ) : (
                            <>
                              <span style={{ fontFamily: 'Sarabun' }}>{parse(detail)}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenderArticleGuru
