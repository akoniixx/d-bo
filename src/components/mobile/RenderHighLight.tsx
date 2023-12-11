import React from 'react'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion'
import { color } from '../../resource'
import { CloseOutlined } from '@ant-design/icons'
import imgUp from '../../resource/media/empties/emptyImgReward.png'

interface RenderHighLightProps {
  img: string
}

const RenderHighLight: React.FC<RenderHighLightProps> = ({ img }) => {
  return (
    <div className='col-4'>
      <CardHeaderPromotion textHeader='ตัวอย่างในแอปพลิเคชัน' center={true} />
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '18px',
        }}
        className='bg-white'
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: color.Disable,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '25%',
            position: 'relative',
          }}
        >
          {img ? (
            <>
              <div style={{ position: 'relative', width: '90%', height: '418px' }}>
                <img
                  src={img}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-78px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '45px',
                    height: '45px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CloseOutlined style={{ fontSize: '20px', color: 'black' }} />
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                width: '90%',
                height: '418px',
                backgroundColor: '#DEEFE5',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={imgUp}
                style={{
                  maxWidth: '30%',
                  maxHeight: '30%',
                  objectFit: 'contain',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20%',
                  width: 45,
                  height: 45,
                  backgroundColor: 'white',
                  borderRadius: 24,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CloseOutlined style={{ fontSize: '20px', color: 'black' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RenderHighLight
