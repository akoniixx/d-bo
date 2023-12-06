import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, Upload, Image, Spin, Progress } from 'antd'
import img_empty from '../../resource/media/empties/uploadImgTask.png'
import { color } from '../../resource'
import icon from '../../resource/icon'

interface ImageData {
  id: number
  url: string
  percent?: number
}
interface ImagProps {
  img: ImageData[]
  onChangeControl: (file: FileList | null) => void
  handleDelete: (index: number) => void
}

const UploadIMGMulti: React.FC<ImagProps> = ({ img, onChangeControl, handleDelete }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList) {
      onChangeControl(fileList)
    }
  }
  const deleteImg = (index: number) => {
    if (index) {
      handleDelete(index)
    }
  }

  return (
    <>
      <div className='form-group col-lg-12'>
        <Row gutter={8}>
          <Col span={4} className='align-self-center'>
            <span
              style={{
                backgroundImage: `url(${img_empty})`,
                display: 'none',
                borderRadius: 0,
                width: '65px',
                height: '65px',
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100%',
              }}
            />
          </Col>
        </Row>
        <div
          className='hiddenFileInputTask'
          style={{
            backgroundImage: `url(${img_empty})`,
            display: 'block',
          }}
        >
          <input type='file' onChange={handleImageChange} title='Choose Image' multiple />
        </div>
      </div>
      <div className='position-relative' style={{ maxWidth: 'fit-content' }}>
        <div className='row justify-content-start' style={{ paddingLeft: 2 }}>
          {img?.length > 0 &&
            img.map((imageData, index) => (
              <div key={index} className='col' style={{ paddingLeft: 2 }}>
                <div className='position-relative' style={{ maxWidth: 'fit-content' }}>
                  <div className='pt-3 position-relative'>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={imageData.url}
                        style={{
                          width: '50px',
                          height: '50px',
                          overflow: 'hidden',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          borderRadius: 4,
                        }}
                        alt='Your Image'
                      />
                      {imageData.percent !== 100 && (
                        <Progress
                          key={imageData.id}
                          showInfo={false}
                          percent={imageData.percent}
                          size='small'
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            color: color.Success,
                          }}
                        />
                      )}
                    </div>
                    <span
                      className='position-absolute top-0 end-0'
                      onClick={() => deleteImg(imageData?.id)}
                      style={{ padding: 1, borderRadius: '50%', cursor: 'pointer', left: 38 }}
                    >
                      <img src={icon.cancel} style={{ width: 20, height: 20 }} alt='Delete' />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default UploadIMGMulti
