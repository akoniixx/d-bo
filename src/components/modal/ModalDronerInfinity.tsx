/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'antd'
import FooterPage from '../footer/FooterPage'
import { DeleteOutlined, StarFilled } from '@ant-design/icons'
import { color, icon } from '../../resource'
import upload_droner_infinity from '../../resource/media/empties/upload_Img_btn.png'
import '../../pages/farmer/Style.css'
import { DronerFinityDatasource } from '../../datasource/DronerFinityDatasource'
import Select from 'react-select'
import {
  SearchDronerByIdEntity,
  SearchDronerByIdEntity_INIT,
  SearchDronerEntity,
} from '../../entities/DronerFinityEntities'
import { numberWithCommas, numberWithCommasToFixed1 } from '../../utilities/TextFormatter'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { resizeFileImg } from '../../utilities/ResizeImage'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../entities/UploadImageEntities'
import Swal from 'sweetalert2'

interface ModalDronerInfinityProps {
  show: boolean
  backButton: () => void
  title: string
  isEditModal?: boolean
  action?: string
  data: any
}
const ModalDronerInfinity: React.FC<ModalDronerInfinityProps> = ({
  show,
  backButton,
  title,
  isEditModal,
  action,
  data,
}) => {
  const [form] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [saveBtnDisableEdit, setBtnSaveDisableEdit] = useState<boolean>(false)
  const [fileList, setFileList] = useState<any>()
  const [currenSearch, setCurrentSearch] = useState(1)
  const [selectDroner, setSelectDroner] = useState<string>('')
  const [dronerListDropdown, setDronerListDropdown] = useState<any>([])
  const [searchFilterDroner, setSearchFilterDroner] = useState<string>('')
  const [rowDroner, setRowDroner] = useState<number>(10)
  const [showData, setShowData] = useState<boolean>(false)
  const [DronerSelected, setDronerSelected] = useState<any>()
  const [pathFile, setPathFile] = useState<any>()
  const [detailDroner, setDetailDroner] = useState<SearchDronerByIdEntity>(
    SearchDronerByIdEntity_INIT,
  )
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [profile] = useLocalStorage('profile', [])
  const [createImg, setCreateImg] = useState<UploadImageEntity>(UploadImageEntity_INTI)
  const [editCreateImg, setEditCreateImg] = useState<UploadImageEntity>(UploadImageEntity_INTI)
  const { Map } = require('immutable')

  useEffect(() => {
    if (action && isEditModal) {
      DronerFinityDatasource.getSearchDronerById(data.dronerId).then((res) => {
        if (res) {
          setDetailDroner(res)
        }
      })
      DronerFinityDatasource.getDronerById(data.id).then((res) => {
        if (res) {
          const file = res.pathImage
          const parts = file.split('/')
          const filename = parts[parts.length - 1]
          setPathFile(filename)
        }
      })
    }
  }, [data, isEditModal])
  useEffect(() => {
    fetchDronerList()
    getDetailDroner()
  }, [currenSearch, rowDroner, DronerSelected])

  const fetchDronerList = () => {
    DronerFinityDatasource.getSearchDroner(searchFilterDroner, currenSearch, rowDroner).then(
      (res: SearchDronerEntity) => {
        const data = res.data.map(
          (item: { firstname: string; lastname: string; telephoneNo: string; id: any }) => {
            return {
              ...item,
              label: item.firstname + ' ' + item.lastname + ' | ' + item.telephoneNo,
              value: item.id,
            }
          },
        )
        setDronerListDropdown(data)
      },
    )
  }
  useEffect(() => {
    DronerFinityDatasource.getSearchDroner(searchFilterDroner, currenSearch, 10).then(
      (res: SearchDronerEntity) => {
        const data = res.data.map((item) => {
          return {
            ...item,
            label: item.firstname + ' ' + item.lastname + ' | ' + item.telephoneNo,
            value: item.id,
          }
        })
        setDronerListDropdown(data)
      },
    )
  }, [searchFilterDroner, currenSearch])

  const resetState = () => {
    form.resetFields()
    setSelectDroner('')
    setSearchFilterDroner('')
    setShowData(false)
    setDronerSelected(null)
    setDetailDroner(SearchDronerByIdEntity_INIT)
    setFileList(undefined)
    setCreateImg(UploadImageEntity_INTI)
    setEditCreateImg(UploadImageEntity_INTI)
    setPathFile(undefined)
  }
  const onChangeImg = async (file: any) => {
    const source = file.target.files[0]
    let newSource: any

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split('/')[1],
        quality: 70,
        rotation: 0,
        responseUriFunc: (res: any) => {},
      })
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
      reader.onload = () => resolve(reader.result)
    })
    if (action) {
      const d = Map(editCreateImg).set('file', isFileMoreThan2MB ? newSource : source)
      setEditCreateImg(d.toJS())
    } else {
      setFileList(img_base64)
      const d = Map(createImg).set('file', isFileMoreThan2MB ? newSource : source)
      setCreateImg(d.toJS())
    }
  }
  const deleteFile = () => {
    setFileList(undefined)
    setCreateImg(UploadImageEntity_INTI)
    setEditCreateImg(UploadImageEntity_INTI)
    setPathFile(undefined)
    form.setFieldValue('img', null)
    onFieldsChange()
  }
  const handleInputChange = (inputValue: any) => {
    setSearchFilterDroner(inputValue)
  }
  const handleSearchFarmer = (id: any) => {
    setSelectDroner(id)
    setDronerSelected(id)
    setShowData(id ? true : false)
  }
  const getDetailDroner = async () => {
    await DronerFinityDatasource.getSearchDronerById(DronerSelected?.id).then((res) => {
      if (res) {
        setDetailDroner(res)
      }
    })
  }

  const handleMenuScrollToBottom = () => {
    if (rowDroner === dronerListDropdown.length) {
      setCurrentSearch(currenSearch)
      setRowDroner(rowDroner + 10)
    }
  }
  const downloadFile = async () => {
    try {
      const response = await DronerFinityDatasource.downloadFile()
      const blob = new Blob([response], { type: 'application/pdf' })
      const fileName = 'สัญญาการเข้าร่วมโครงการแนะนำปุ๋ยยาให้แก่เกษตรกร.pdf'
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = fileName
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download the file. Please try again later.')
    }
  }

  const handelCallBack = async () => {
    setBtnSaveDisable(true)
    const update = `${profile?.firstname} ${profile?.lastname}`
    if (action) {
      if (data?.status === 'CANCELED') {
        await DronerFinityDatasource.uploadFile(data.id, update, editCreateImg.file, 'ACTIVE').then(
          (res) => {
            if (res.success) {
              setBtnSaveDisable(false)
              Swal.fire({
                title: 'บันทึกสำเร็จ',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              }).then(() => backButton())
            }
          },
        )
      } else {
        await DronerFinityDatasource.uploadFile(data.id, update, editCreateImg.file).then((res) => {
          setBtnSaveDisable(false)
          if (res.success) {
            Swal.fire({
              title: 'บันทึกสำเร็จ',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }).then(() => backButton())
          }
        })
      }
    } else {
      await DronerFinityDatasource.createUploadFile(
        DronerSelected?.id,
        update,
        createImg.file,
      ).then((res) => {
        setBtnSaveDisable(false)
        if (res.success) {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => backButton())
        } else {
          Swal.fire({
            title: 'ไม่สามารถบันทึกได้ เนื่องจากมีข้อมูลนักบินโดรนอยู่แล้ว',
            icon: 'error',
            showConfirmButton: false,
          }).then(() => backButton())
        }
      })
    }
    resetState()
  }
  const renderFile = (
    fileName:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined,
  ) => {
    return (
      <div className='d-flex'>
        <span style={{ fontSize: 14 }}>{fileName}</span>
        {fileName && (
          <DeleteOutlined
            style={{ color: color.Error, alignSelf: 'center', paddingLeft: 8 }}
            onClick={deleteFile}
          />
        )}
      </div>
    )
  }
  const handleDropdownVisibility = (visible: boolean | ((prevState: boolean) => boolean)) => {
    setDropdownVisible(visible)
  }
  const onFieldsChange = () => {
    const namePoint = form.getFieldValue('img')
    setBtnSaveDisable(!namePoint)
    setBtnSaveDisableEdit(!namePoint)
  }
  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
          >
            {title}
          </div>
        }
        visible={show}
        onCancel={() => {
          backButton()
          resetState()
        }}
        width={600}
        footer={[
          <FooterPage
            onClickBack={() => {
              backButton()
              resetState()
            }}
            onClickSave={() => form.submit()}
            disableSaveBtn={action ? saveBtnDisableEdit : saveBtnDisable}
          />,
        ]}
      >
        {action !== 'edit' && (
          <div className='form-group' style={{ height: dropdownVisible ? '380px' : '80px' }}>
            <Form form={form}>
              <Form.Item name='searchDroner'>
                <Select
                  placeholder='ค้นหาชื่อนักบิน / เบอร์โทร / ID นักบินโดรน'
                  isSearchable
                  isClearable
                  onMenuOpen={() => handleDropdownVisibility(true)}
                  onMenuClose={() => handleDropdownVisibility(false)}
                  onInputChange={handleInputChange}
                  onChange={(selectedOptions: any) => {
                    setCurrentSearch(1)
                    handleSearchFarmer(selectedOptions)
                  }}
                  options={dronerListDropdown}
                  value={selectDroner}
                  onMenuScrollToBottom={handleMenuScrollToBottom}
                />
              </Form.Item>
            </Form>
          </div>
        )}

        {(showData || action) && (
          <Form
            key={detailDroner?.dronerId}
            form={form}
            onFinish={handelCallBack}
            onFieldsChange={onFieldsChange}
          >
            <div
              style={{
                borderRadius: '5px',
                opacity: 1,
                backgroundColor: color.primary3,
                padding: 20,
              }}
            >
              <div className='row' style={{ fontWeight: '500' }}>
                <div className='col-lg'>ชื่อนักบินโดรน</div>
                <div className='col-lg'>เบอร์โทร</div>
                <div className='col-lg'>แต้มสะสม</div>
              </div>
              <div className='row pt-2'>
                <div className='col-lg'>
                  {detailDroner?.firstname || '-'} {detailDroner?.lastname || '-'}
                </div>
                <div className='col-lg'>{detailDroner?.telephoneNo || '-'}</div>
                <div className='col-lg'>
                  <img src={icon.coinFarmer} style={{ width: 22, height: 22, marginBottom: 2 }} />{' '}
                  {numberWithCommas(detailDroner?.point) || 0}
                </div>
              </div>
              <div className='row pt-4' style={{ fontWeight: '500' }}>
                <div className='col-lg'>ที่อยู่</div>
              </div>
              <div className='row pt-2'>
                <div className='col-lg'>
                  {detailDroner?.subdistrictName + '/' || '-/'}
                  {detailDroner?.districtName + '/' || '-/'}
                  {detailDroner?.provinceName || '-'}
                </div>
              </div>
              <div className='row pt-4' style={{ fontWeight: '500' }}>
                <div className='col-lg'>งานที่บินเสร็จ</div>
                <div className='col-lg'>จำนวนไร่สะสม</div>
                <div className='col-lg'>Rating</div>
              </div>
              <div className='row pt-2'>
                <div className='col-lg'>
                  {' '}
                  {numberWithCommas(parseInt(detailDroner?.totalTaskCount)) || 0} งาน
                </div>
                <div className='col-lg'>
                  {numberWithCommasToFixed1(parseInt(detailDroner?.totalRaiCount)) || 0} ไร่
                </div>
                <div className='col-lg'>
                  <StarFilled
                    style={{
                      color: '#FFCA37',
                      fontSize: '20px',
                      marginRight: '7px',
                      verticalAlign: 0.5,
                    }}
                  />
                  {numberWithCommasToFixed1(parseInt(detailDroner?.ratingAvg)) || 0}
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-between pt-3'>
              <div className='col-lg-8'>
                <span>สัญญาเข้าร่วมโครงการ</span>
                <span style={{ color: color.Grey }}> (ไฟล์รูปภาพ PNG/PDF)</span>
                <span style={{ color: color.Error }}> *</span>
              </div>
              <div className='col-lg' style={{ textAlign: 'end' }}>
                <u
                  onClick={downloadFile}
                  style={{ color: color.Success, fontWeight: 500, cursor: 'pointer' }}
                >
                  ดาวน์โหลดสัญญา
                </u>
              </div>
            </div>
            <div className='d-flex pt-2'>
              <Form.Item name='img'>
                <div
                  className='hiddenFileBtn'
                  style={{
                    backgroundImage: `url(${upload_droner_infinity})`,
                    display: 'block',
                  }}
                >
                  <input key={fileList} type='file' onChange={onChangeImg} title='เลือกรูป' />
                </div>
              </Form.Item>
            </div>
            {action
              ? renderFile(editCreateImg.file.name ? editCreateImg.file.name : pathFile)
              : renderFile(createImg.file.name)}
          </Form>
        )}
      </Modal>
    </>
  )
}

export default ModalDronerInfinity
