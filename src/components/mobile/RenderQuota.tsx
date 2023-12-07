import React, { useLayoutEffect, useRef } from 'react'
import { Image } from 'antd'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion'
import color from '../../resource/color'
import { image } from '../../resource'
import styled from 'styled-components'
import { DateTimeUtil } from './../../utilities/DateTimeUtil'
import { validateNumber } from '../../utilities/TextFormatter'

const TextCard = styled.div<{ isFocus?: boolean }>`
  color: #523a19;
  font-size: 14px;
  font-weight: bold;
`
const CardStyle = styled.div<{ isFocus?: boolean }>`
  background-color: #f6eaa7;
  padding: 10px;
  border-radius: 10px;
  border: solid;
  border-width: 1px;
  border-color: #947d39;
`
interface RenderQuota {
  imgCover: any
  nameChallenge: any
  detailChallenge: any
  imgButton: any
  nameReward: any
  imgReward: any
  raiAmount: string
  startDate?: any
  endDate?: any
}

const RenderQuota: React.FC<RenderQuota> = ({
  imgCover,
  nameChallenge,
  detailChallenge,
  imgButton,
  nameReward,
  imgReward,
  raiAmount,
  startDate,
  endDate,
}) => {
  const div = useRef<any>()
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
  const renderRaiAmount = validateNumber(raiAmount.toString())

  return (
    <div className='col-lg-12'>
      <div ref={div}>
        <CardHeaderPromotion textHeader='ตัวอย่างในแอปพลิเคชัน' center={true} />
        <div
          style={{
            width: '100%',
          }}
          className='bg-white'
        >
          <div>
            <Image src={imgCover ? imgCover : image.empty_cover} preview={false} />
          </div>
          <div className='p-3'>
            <div
              style={{
                border: 'solid',
                borderWidth: 1,
                borderColor: '#947D39',
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #FBF5B9, #EED787)',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  padding: 10,
                  borderColor: '#523A19',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    color: '#523A19',
                    fontWeight: 'bold',
                  }}
                >
                  {nameChallenge ? nameChallenge : 'ชื่อชาเลนจ์'}
                </span>
                <br />
                <span style={{ color: '#87602A', fontSize: '14px' }}>
                  {detailChallenge ? detailChallenge : 'รายละเอียดชาเลนจ์'}
                </span>
              </div>
              <div
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #F6EAA7, #FFF7EA)',
                  borderWidth: 5,
                  borderColor: '#523A19',
                }}
              >
                <div className='row space-between'>
                  <div className='col-lg-3 align-self-center' style={{ paddingLeft: '10%' }}>
                    <Image
                      preview={false}
                      src={imgReward ? imgReward : image.emptyImgReward}
                      style={{ width: '80px', height: '80px' }}
                    />
                  </div>
                  <div className='col-lg pt-4'>
                    <div className='row' style={{ textAlign: 'center' }}>
                      <span style={{ color: '#B26003', fontWeight: '600' }}>รางวัลใหญ่</span>
                      <br />
                      <span
                        style={{
                          color: '#523A19',
                          fontWeight: '600',
                          fontSize: '15px',
                        }}
                      >
                        {nameReward ? nameReward : 'ชื่อของรางวัล'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: '#FFFCF2',
                  borderColor: '#523A19',
                  padding: 10,
                }}
              >
                <div className='row pt-3'>
                  <div className='col-lg-9'>
                    <span
                      style={{
                        color: '#523A19',
                        fontWeight: 'bold',
                      }}
                    >
                      จำนวนไร่สะสม
                    </span>
                    <br />
                  </div>
                  <div className='col'>
                    <span
                      style={{
                        color: '#523A19',
                        fontWeight: 'bold',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>XX</span>
                      {` ไร่`}
                    </span>
                  </div>
                </div>
                <Image src={image.progressBar} preview={false} />
                <div className='row'>
                  <div className='col-lg-9'>
                    <span style={{ fontSize: '12px' }}>เริ่มนับจำนวนไร่สะสม</span>
                    <br />
                    <span>
                      ตั้งแต่ {DateTimeUtil.formatDateThShort(startDate)} ถึง{' '}
                      {DateTimeUtil.formatDateThShort(endDate)}
                    </span>
                  </div>
                  <div className='col' style={{ fontWeight: '600' }}>
                    <span style={{ color: '#FB8705' }}>XX</span>/
                    <span>{renderRaiAmount !== '' ? renderRaiAmount : 'XX'}</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #B6A15C, #B89650)',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  padding: 10,
                  borderColor: '#523A19',
                  textAlign: 'center',
                }}
              >
                <div
                  className='row p-2'
                  style={{
                    color: color.White,
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                >
                  <div className='col-lg'>
                    <span>ได้รับ</span>
                    <br />
                    <span>ทั้งหมด</span>
                    <br />
                    <span style={{ fontSize: '20px', top: '4px' }}>XX</span>
                    <span style={{ fontWeight: 'lighter' }}> สิทธิ์</span>
                  </div>
                  <div className='col-lg'>
                    <span>ใช้ไป</span>
                    <br />
                    <span>(ได้รับทอง)</span>
                    <br />
                    <span style={{ fontSize: '20px', top: '4px' }}>XX</span>
                    <span style={{ fontWeight: 'lighter' }}> สิทธิ์</span>
                  </div>
                  <div className='col-lg-4'>
                    <span>คงเหลือ</span>
                    <br />
                    <span>(ลุ้นโชคครั้งถัดไป)</span>
                    <br />
                    <span style={{ fontSize: '20px', top: '4px', color: '#FFFA7D' }}>XX</span>
                    <span style={{ fontWeight: 'lighter' }}> สิทธิ์</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='p-3'>
            <div className='row'>
              <div className='col-lg'>
                <CardStyle>
                  <div className='row'>
                    <div className='col-lg-5'>
                      <Image
                        src={image.tableLucky}
                        preview={false}
                        style={{ width: 56, height: 46 }}
                      />
                    </div>
                    <div className='col-lg'>
                      <TextCard>ตาราง</TextCard>
                      <TextCard>จับรางวัล</TextCard>
                    </div>
                  </div>
                </CardStyle>
              </div>
              <div className='col-lg'>
                <CardStyle>
                  <div className='row'>
                    <div className='col-lg-5'>
                      <Image
                        src={image.condition}
                        preview={false}
                        style={{ width: 56, height: 46 }}
                      />
                    </div>
                    <div className='col-lg'>
                      <TextCard>กติกา</TextCard>
                      <TextCard>และเงื่อนไข</TextCard>
                    </div>
                  </div>
                </CardStyle>
              </div>
            </div>
            <div className='pt-3'>
              <CardStyle>
                <div className='row'>
                  <div className='col-lg-3'>
                    <Image src={image.announce} preview={false} style={{ width: 56, height: 46 }} />
                  </div>
                  <div className='col-lg'>
                    <TextCard>ประกาศรายชื่อผู้โชคดี</TextCard>
                    <TextCard>รับสร้อยคอทองคำ</TextCard>
                  </div>
                </div>
              </CardStyle>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenderQuota
