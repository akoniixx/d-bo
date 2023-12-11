import React, { useLayoutEffect, useRef } from 'react'
import { Image } from 'antd'
import parse from 'html-react-parser'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion'
import uploadImg from '../../resource/media/empties/upload_img_news.png'
import { numberWithCommas, numberWithCommasToFixed } from '../../utilities/TextFormatter'
import { DateTimeUtil } from '../../utilities/DateTimeUtil'
import { convertBuddhistYear } from '../../utilities/ConvertToBuddhistYear'
import moment from 'moment'
import color from '../../resource/color'
interface RenderReward {
  img: string
  name: any
  description: any
  condition: any
  point: any
  type: string | null
  endUseDateTime: any
  exChange: string | null
  countdownTime: any
}

const RenderReward: React.FC<RenderReward> = ({
  img,
  name,
  description,
  condition,
  point,
  type,
  endUseDateTime,
  exChange,
  countdownTime,
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
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div className='p-3'>
              <Image
                style={{ borderRadius: 10 }}
                src={img ? img : uploadImg}
                width={'100%'}
                height={'26.7%'}
                preview={false}
              />
            </div>

            <div className='p-4'>
              <h5 style={{ fontWeight: '600' }}>{!name ? 'ชื่อของรางวัล' : name}</h5>

              {exChange === 'MISSION' ? (
                <p style={{ fontSize: '18px', fontWeight: '500' }}>ภารกิจ</p>
              ) : (
                <p style={{ fontSize: '18px', fontWeight: '500' }}>{`ใช้แต้ม  ${
                  !point ? 0 : numberWithCommas(parseFloat(point))
                } แต้ม`}</p>
              )}
              {type === 'DIGITAL' && (
                <div
                  style={{
                    width: '185px',
                    height: '65px',
                    backgroundColor: 'rgba(220, 241, 254, 1)',
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      color: 'rgba(12, 100, 141, 1)',
                      fontSize: '15spanx',
                      fontWeight: '500',
                      lineHeight: '22px',
                      paddingLeft: '12px',
                    }}
                  >
                    {`หมดอายุอีก ${countdownTime ? countdownTime : '0'} วัน`}
                  </div>
                  <div
                    style={{
                      color: 'black',
                      fontSize: '18px',
                      fontWeight: '700',
                      lineHeight: '22px',
                      paddingLeft: '12px',
                    }}
                  >
                    {endUseDateTime
                      ? convertBuddhistYear.toBuddhistYear(moment(endUseDateTime), 'DD MMM YY')
                      : '-'}
                  </div>
                </div>
              )}
              <p className='pt-3'>รายละเอียด</p>
              <p style={{ fontWeight: '400', color: 'rgba(107, 117, 128, 1)' }}>
                {!description ? '-' : parse(description)}
              </p>
              <p>เงื่อนไข</p>
              <p style={{ fontWeight: '400', color: 'rgba(107, 117, 128, 1)' }}>
                {!condition ? '-' : parse(condition)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenderReward
