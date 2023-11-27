import { Col, Row } from 'antd'
import React, { useState } from 'react'

interface ImagCardsProps {
  imageName: string
  image: string
  onClick: () => void
}
const ImagCards: React.FC<ImagCardsProps> = ({ imageName, image, onClick }) => {
  const pathnameParts = imageName.split('-')
  const shortImageName = pathnameParts[pathnameParts.length - 1].split('?')[0]
  const truncatedText = shortImageName.length > 30 ? shortImageName.slice(0, 20) : shortImageName
  return (
    <div className='form-group col-lg-12'>
      <Row
        onClick={onClick}
        style={{
          border: 'dotted',
          borderWidth: 0.5,
          borderRadius: '4px',
          height: 90,
          paddingLeft: 8,
          cursor: 'pointer',
        }}
        gutter={8}
      >
        <Col span={8} className='align-self-center'>
          <span
            style={{
              backgroundImage: `url(${image})`,
              display: image != undefined ? 'block' : 'none',
              width: '75px',
              height: '75px',
              overflow: 'hidden',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '100%',
              borderRadius: 5,
            }}
          />
        </Col>
        <Col span={16} className='align-self-center'>
          <span>{truncatedText || '-'}</span>
        </Col>
      </Row>
    </div>
  )
}

export default ImagCards
