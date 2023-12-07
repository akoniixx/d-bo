import { Col, Image, Modal } from 'antd'
import React, { useState } from 'react'
import color from '../../resource/color'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'

interface ImagCardsProps {
  imageName: string
  image: string
  onClick: () => void
}
const ImagCards: React.FC<ImagCardsProps> = ({ imageName, image, onClick }) => {
  const imgList = [
    'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5nRRVgnzYSSwUoPM7rigVHaj4QhdURLfyt90hBPNzf89n8vZ5bp.jpg',
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/9970/live/9e4ab180-fd11-11ed-b2aa-9935735a579c.png',
    'https://shortrecap.co/wp-content/uploads/2020/05/Catcover_web.jpg',
    'https://www.sarakadee.com/blog/oneton/wp-content/uploads/2017/12/cat-cute-e1533862828469.jpg',
  ]

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = (url: string) => {
    setPreviewImage(url)
    setPreviewVisible(true)
  }

  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgList.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imgList.length) % imgList.length)
  }
  return (
    <div className='form-group'>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imgList.length > 0 && (
          <div style={{ margin: '5px' }}>
            <Image
              preview={false}
              width={200}
              src={imgList[0]}
              onClick={() => handlePreview(imgList[0])}
            />
          </div>
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
          <img
            alt='preview'
            style={{ width: '100%', height: 'auto' }}
            src={imgList[currentIndex]}
          />
          <div
            style={{ position: 'absolute', bottom: -40, left: 0, right: 0, textAlign: 'center' }}
          >
            <span style={{ color: 'white' }}>
              {currentIndex + 1} / {imgList.length}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ImagCards
