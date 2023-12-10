import { Col, Image, Modal } from 'antd'
import React, { useState } from 'react'
import color from '../../resource/color'
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'

interface ImagCardsProps {
  show?: boolean
  image: any[]
  onClick?: () => void
  imageName?: any
}
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
    <div className='form-group'>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {image.length > 0 && image ? (
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
        )}
      </div>
      <Modal
        visible={previewVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
        bodyStyle={{ padding: 0, backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div
            style={{ position: 'absolute', top: '40%', left: -60, transform: 'translateY(-50%)' }}
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
            style={{ position: 'absolute', top: '40%', right: -30, transform: 'translateY(-50%)' }}
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
          <div style={{ position: 'absolute', top: -40, right: -30 }}>
            <CloseOutlined
              onClick={handleCancel}
              style={{ backgroundColor: color.White, padding: 8, borderRadius: 50 }}
            />
          </div>
          {image.length > 0 && image ? (
            <img
              alt='preview'
              style={{ width: '100%', height: '100%' }}
              src={show ? image[currentIndex] : image[currentIndex].url}
            />
          ) : (
            '-'
          )}

          <div
            style={{ position: 'absolute', bottom: -40, left: 0, right: 0, textAlign: 'center' }}
          >
            <span style={{ color: 'white' }}>
              {currentIndex + 1} / {image.length}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ImagCards
