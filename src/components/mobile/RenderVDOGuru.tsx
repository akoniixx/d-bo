import React, { useState, useRef } from 'react'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion'
import { Button } from 'antd'
import '../../pages/gurukaset/styles.css'
import icon from '../../resource/icon'
import color from '../../resource/color'
interface RenderVDOGuruProps {
  vdo: string
  caption: string
}
const RenderVDOGuru: React.FC<RenderVDOGuruProps> = ({ vdo, caption }) => {
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
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)
  const videoRef = useRef<any>(null)

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  return (
    <div className='col'>
      <CardHeaderPromotion textHeader='ตัวอย่างในแอปพลิเคชัน' center={false} button={headButton} />
      <div
        className='bg-white'
        style={{ padding: key === 'feed' ? 20 : 0, justifyContent: 'center', alignItems: 'center' }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: key === 'feed' ? 'rgb(207 233 213)' : 'none',
            backgroundImage:
              key !== 'feed'
                ? 'linear-gradient(rgb(207 233 213), rgb(207 233 213), rgb(207 233 213), rgb(153 167 156), rgb(43, 43, 43))'
                : 'none',
            height: key === 'feed' ? '750px' : '850px',
            minWidth: key === 'feed' ? '420px' : '460px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {vdo && (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <video
                ref={videoRef}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onClick={togglePlayPause}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              >
                <source src={vdo} type='video/mp4' />
              </video>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {!isVideoPlaying ? (
                  <img src={icon.pause} style={{ width: 118, height: 118 }} />
                ) : (
                  <img src={icon.play} style={{ width: 118, height: 118 }} />
                )}
              </div>
            </div>
          )}

          {key !== 'feed' && (
            <>
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 22,
                  padding: '8px',
                  textAlign: caption ? 'start' : 'center',
                  color: color.White,
                }}
              >
                <div className='pb-3'>
                  <img
                    src={icon.iconkaset}
                    style={{
                      width: '24px',
                      height: '24px',
                      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                      marginRight: '8px',
                    }}
                  />
                  <span>ไอคอนเกษตร</span>
                </div>
                <div className='pb-2 col-lg-8'>
                  <span>
                    {' '}
                    {!caption ? (
                      <span>Caption</span>
                    ) : (
                      <>
                        {caption.trim().length > 70 ? (
                          <div
                            className='d-flex'
                            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}
                          >
                            <span
                              style={{
                                fontFamily: 'sarabun',
                                color: color.White,
                                fontSize: 16,
                                fontWeight: '500',
                              }}
                            >
                              {caption.substring(0, 70)}
                              <label style={{ color: color.Grey, fontSize: 14 }}>
                                ... อ่านเพิ่ม
                              </label>
                            </span>
                          </div>
                        ) : (
                          <span
                            style={{
                              fontFamily: 'sarabun',
                              color: color.White,
                              fontSize: 16,
                              fontWeight: '500',
                            }}
                          >
                            {caption}
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 34,
                  right: 22,
                  padding: '8px',
                  textAlign: 'center',
                  color: color.White,
                }}
              >
                <div className='pb-3'>
                  <img
                    src={icon.love_bullet}
                    style={{
                      width: '32px',
                      height: '32px',
                      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                  <p>1.5k</p>
                </div>
                <div className='pb-2'>
                  <img
                    src={icon.comments_bullet}
                    style={{
                      width: '32px',
                      height: '32px',
                      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                  <p>21</p>
                </div>
              </div>
            </>
          )}
          {!vdo && <img src={icon.typcn_video} style={{ width: '90px', height: '90px' }} />}
        </div>
        {key === 'feed' && (
          <div className='d-flex justify-content-between pt-4'>
            <div className='d-flex col-lg align-self-center'>
              <div className='col-3'>
                <img src={icon.love} style={{ width: '20px', height: '20px' }} alt='Love Icon' />
                <span> 0</span>
              </div>
              <div>
                <img
                  src={icon.comment}
                  style={{ width: '20px', height: '20px' }}
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
        )}
      </div>
    </div>
  )
}

export default RenderVDOGuru
