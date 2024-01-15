import { Col, Image, Modal } from 'antd'
import React, { useState } from 'react'
import color from '../../resource/color'
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import styled from 'styled-components'
interface ImagCardsProps {
  show?: boolean
  image: any[]
  onClick?: () => void
  imageName?: any
}
const MoDalCard = styled(Modal)`
  .ant-modal-content {
    position: relative;
    background-color: #fff0;
    border: 0;
    border-radius: 2px;
    box-shadow: none;
  }
`
const ImagCards: React.FC<ImagCardsProps> = ({ image, show }) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePreview = (url: string) => {
    setPreviewVisible(true)
  }

  const handleCancel = () => {
    setPreviewVisible(false)
    setCurrentIndex(0)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + image.length) % image.length)
  }
  return (
    <div className='form-group' style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {image ? (
          image.length > 0 ? (
            <div className='pt-3'>
              <Image
                preview={false}
                style={{
                  borderRadius: '8px',
                  width: '140px',
                  height: '90px',
                  objectFit: 'cover',
                }}
                src={show ? image[0] : image[0].url}
                onClick={() => handlePreview(image[0].url)}
              />
            </div>
          ) : (
            '-'
          )
        ) : (
          '-'
        )}
      </div>
      <MoDalCard
        visible={previewVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
        bodyStyle={{ padding: 50 }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', textAlign: 'center' }}>
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '-10%',
              transform: 'translateY(-50%)',
            }}
          >
            <LeftOutlined
              onClick={handlePrevious}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 8,
                borderRadius: 50,
                position: 'absolute',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: '-4%',
              transform: 'translateY(-50%)',
            }}
          >
            <RightOutlined
              onClick={handleNext}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 8,
                borderRadius: 50,
                position: 'absolute',
              }}
            />
          </div>
          <div style={{ position: 'absolute', top: -40, right: '1%' }}>
            <CloseOutlined
              onClick={handleCancel}
              style={{ backgroundColor: color.White, padding: 8, borderRadius: 50 }}
            />
          </div>
          {image ? (
            image.length > 0 ? (
              <>
                <Image width={400} src={show ? image[currentIndex] : image[currentIndex].url} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: -40,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                  }}
                >
                  <span style={{ color: 'white' }}>
                    {currentIndex + 1} / {image.length}
                  </span>
                </div>
              </>
            ) : (
              '-'
            )
          ) : (
            '-'
          )}
        </div>
      </MoDalCard>
    </div>
  )
}

export default ImagCards
