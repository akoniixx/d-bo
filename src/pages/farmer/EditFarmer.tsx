import React, { useCallback, useEffect, useState } from 'react'
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Badge,
  Radio,
  Space,
  Tag,
  DatePicker,
} from 'antd'
import { CardContainer } from '../../components/card/CardContainer'
import { BackIconButton } from '../../components/button/BackButton'
import TextArea from 'antd/lib/input/TextArea'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import emptyData from '../../resource/media/empties/iconoir_farm.png'
import color from '../../resource/color'
import FooterPage from '../../components/footer/FooterPage'
import ActionButton from '../../components/button/ActionButton'
import { CardHeader } from '../../components/header/CardHearder'
import { GetFarmerEntity, GetFarmerEntity_INIT } from '../../entities/FarmerEntities'
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProvinceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from '../../entities/LocationEntities'
import { FarmerDatasource } from '../../datasource/FarmerDatasource'
import { FarmerPlotEntity, FarmerPlotEntity_INIT } from '../../entities/FarmerPlotEntities'
import {
  FARMER_STATUS_SEARCH,
  STATUS_FARMERPLOT_COLOR_MAPPING,
  STATUS_NORMAL_MAPPING,
} from '../../definitions/Status'
import { AddressEntity, AddressEntity_INIT } from '../../entities/AddressEntities'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import ModalFarmerPlot from '../../components/modal/ModalFarmerPlot'
import { FarmerPlotDatasource } from '../../datasource/FarmerPlotDatasource'
import Swal from 'sweetalert2'
import { UploadImageDatasouce } from '../../datasource/UploadImageDatasource'
import { ImageEntity, ImageEntity_INTI } from '../../entities/UploadImageEntities'
import '../farmer/Style.css'
import img_empty from '../../resource/media/empties/uploadImg.png'
import bth_img_empty from '../../resource/media/empties/upload_Img_btn.png'
import moment from 'moment'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { resizeFileImg } from '../../utilities/ResizeImage'
import { useNavigate } from 'react-router-dom'
import locale from 'antd/es/date-picker/locale/th_TH'
import ShowLandmark from '../../components/popover/ShowLandmark'

const dateFormat = 'DD/MM/YYYY'
const dateCreateFormat = 'YYYY-MM-DD'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Map } = require('immutable')

const EditFarmer = () => {
  const queryString = _.split(window.location.pathname, '=')
  const [profile] = useLocalStorage('profile', [])
  const navigate = useNavigate()
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const farmerId = queryString[1]
  const [data, setData] = useState<GetFarmerEntity>(GetFarmerEntity_INIT)
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT)
  const [farmerPlotList, setFarmerPlotList] = useState<FarmerPlotEntity[]>([FarmerPlotEntity_INIT])
  const [locateNull, setLocateNull] = useState<any>()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editIndex, setEditIndex] = useState(0)
  const [birthDay, setBirthDay] = useState<string>()
  const [province, setProvince] = useState<ProvinceEntity[]>([ProvinceEntity_INIT])
  const [district, setDistrict] = useState<DistrictEntity[]>([DistrictEntity_INIT])
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([SubdistrictEntity_INIT])
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false)
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(FarmerPlotEntity_INIT)
  const [form] = Form.useForm()
  const [imgProfile, setImgProfile] = useState<any>()
  const [imgIdCard, setImgIdCard] = useState<any>()
  const [createImgProfile, setCreateImgProfile] = useState<ImageEntity>(ImageEntity_INTI)
  const [createImgIdCard, setCreateImgIdCrad] = useState<ImageEntity>(ImageEntity_INTI)

  const fetchLocation = useCallback(async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      if (res) {
        const findId = res.find((x) => x.provinceId === 0)
        setLocateNull(findId)
      }
    })
  }, [])
  const fecthFarmer = async () => {
    await FarmerDatasource.getFarmerById(farmerId).then((res) => {
      setData(res)
      form.setFieldsValue({
        ...res,
      })
      if (
        res.address &&
        res.address.provinceId &&
        res.address.districtId &&
        res.address.subdistrictId
      ) {
        setAddress(res.address)
      } else {
        if (res.farmerPlot.length > 0) {
          const findAddress = res.farmerPlot.map((item) => item.plotArea)
          const province = Map(address).set('provinceId', findAddress[0].provinceId)
          const districtId = Map(province.toJS()).set('districtId', findAddress[0].districtId)
          const subdistrictId = Map(districtId.toJS()).set(
            'subdistrictId',
            findAddress[0].subdistrictId,
          )
          const postcode = Map(subdistrictId.toJS()).set('postcode', findAddress[0].postcode)
          const addressId = Map(postcode.toJS()).set('id', res.addressId)
          setAddress(addressId.toJS())
        }
      }
      setFarmerPlotList(res.farmerPlot)
      const getPathPro = res.file.filter((x) => x.category === 'PROFILE_IMAGE')
      const getPathCard = res.file.filter((x) => x.category === 'ID_CARD_IMAGE')
      const imgList: {
        path: string
        category: string
      }[] = []
      if (getPathPro.length > 0) {
        imgList.push(getPathPro[0])
      }
      if (getPathCard.length > 0) {
        imgList.push(getPathCard[0])
      }

      let i = 0
      for (i; imgList.length > i; i++) {
        i === 0 &&
          UploadImageDatasouce.getImage(imgList[i].path.toString()).then((resImg) => {
            if (resImg.url) {
              imgList[0].category === 'PROFILE_IMAGE'
                ? setImgProfile(resImg.url)
                : setImgIdCard(resImg.url)
            }
          })
        i === 1 &&
          UploadImageDatasouce.getImage(imgList[i].path.toString()).then((resImg) => {
            resImg?.url && setImgIdCard(resImg.url)
          })
      }
    })
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = farmerPlotList.slice(indexOfFirstItem, indexOfLastItem)
  const [searchLocation] = useState('')

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    fecthFarmer()
    fetchLocation(searchLocation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocation])

  useEffect(() => {
    LocationDatasource.getProvince().then((res) => {
      setProvince(res)
    })
    if (address) {
      if (address.provinceId) {
        LocationDatasource.getDistrict(address.provinceId).then((res) => {
          setDistrict(res)
        })
      }
      if (address.districtId) {
        LocationDatasource.getSubdistrict(address.districtId).then((res) => {
          setSubdistrict(res)
        })
      }
    }
  }, [address !== null && address.provinceId, address !== null && address.districtId])

  //#region function farmer
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value)
    setData(m.toJS())
    checkValidate(m.toJS())
  }

  const handleOnChangeProvince = async (provinceId: number) => {
    const d = Map(address).set('provinceId', provinceId == undefined ? 0 : provinceId)
    setAddress(d.toJS())
    checkValidateAddr(d.toJS())
  }

  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set('districtId', districtId == undefined ? 0 : districtId)
    setAddress(d.toJS())
    checkValidateAddr(d.toJS())
  }

  const handleOnChangeSubdistrict = async (subdistrictId: number) => {
    const d = Map(address).set('subdistrictId', subdistrictId == undefined ? 0 : subdistrictId)
    setAddress(d.toJS())
    checkValidateAddr(d.toJS())
    await handleOnChangePostcode(d.toJS())
  }

  const handleOnChangePostcode = (addr: AddressEntity) => {
    const getPostcode = subdistrict.filter((x) => x.subdistrictId == addr.subdistrictId)[0].postcode
    const c = Map(addr).set('postcode', getPostcode)
    setAddress(c.toJS())
    checkValidateAddr(c.toJS())
  }

  const handleOnChangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = Map(address).set('address1', e.target.value)
    setAddress(d.toJS())
  }

  const handleOnChangeAddress2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(address).set('address2', e.target.value)
    setAddress(d.toJS())
  }

  const handleChangeFarmerstatus = (e: any) => {
    if (e.target.value != 'INATIVE' || e.target.value != 'REJECTED') {
      data.reason = ''
    }
    const m = Map(data).set('status', e.target.value)
    setData(m.toJS())
    checkValidateReason(m.toJS())
  }

  const handleOnChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(data).set('reason', e.target.value)
    setData(d.toJS())
    checkValidateReason(d.toJS())
  }
  //#endregion

  //#region function farmer plot
  const editPlot = (item: any, index: number) => {
    setShowAddModal((prev) => !prev)
    setEditIndex(index)
    setEditFarmerPlot(item)
  }

  const removePlot = (data: FarmerPlotEntity) => {
    Swal.fire({
      title: 'ยืนยันการลบ',
      text: 'โปรดตรวจสอบแปลงเกษตรที่คุณต้องการลบ เพราะอาจจะส่งผลต่อการจ้างงานในแอปพลิเคชัน',
      cancelButtonText: 'ย้อนกลับ',
      confirmButtonText: 'ลบ',
      confirmButtonColor: '#d33',
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await FarmerPlotDatasource.deleteFarmerPlot(data.id)
      }
      fecthFarmer()
    })
  }

  const updateFarmerPlot = async (plot: FarmerPlotEntity) => {
    const payload = {
      ...plot,
      farmerId,
    }
    const addr = {
      id: '',
      address1: '',
      address2: '',
      address3: '',
      provinceId: plot.provinceId || 0,
      districtId: plot.districtId || 0,
      subdistrictId: plot.subdistrictId || 0,
      postcode: plot.postcode || '',
    }
    checkValidateAddr(addr)
    if (payload.id) {
      await FarmerPlotDatasource.updateFarmerPlot(payload).then((res) => {
        if (res) {
          Swal.fire({
            title: 'แก้ไขแปลงสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            setEditIndex(0)
            setShowAddModal((prev) => !prev)
          })
        }
      })
    } else {
      await FarmerPlotDatasource.insertFarmerPlot(payload).then((res) => {
        if (res) {
          Swal.fire({
            title: 'บันทึกแปลงสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            setEditIndex(0)
            setShowAddModal((prev) => !prev)
          })
        }
      })
    }
    fecthFarmer()
  }
  //#endregion

  //#region image
  const onChangeProfile = async (file: any) => {
    const source = file.target.files[0]
    let newSource: any

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split('/')[1],
        quality: 70,
        rotation: 0,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        responseUriFunc: () => {},
      })
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
      reader.onload = () => resolve(reader.result)
    })

    setImgProfile(img_base64)
    const d = Map(createImgProfile).set('file', isFileMoreThan2MB ? newSource : source)
    const e = Map(d.toJS()).set('resource', 'FARMER')
    const f = Map(e.toJS()).set('category', 'PROFILE_IMAGE')
    const g = Map(f.toJS()).set('resourceId', farmerId)
    setCreateImgProfile(g.toJS())
  }
  const onPreviewProfile = async () => {
    let src = imgProfile
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgProfile)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const removeImg = () => {
    Swal.fire({
      title: 'ยืนยันการลบ',
      text: 'โปรดตรวจสอบรูปภาพที่คุณต้องการลบ',
      cancelButtonText: 'ย้อนกลับ',
      confirmButtonText: 'ลบ',
      confirmButtonColor: '#d33',
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const getImg = data.file.filter((x) => x.category == 'PROFILE_IMAGE')[0]
        UploadImageDatasouce.deleteImage(getImg.id, getImg.path)
        setCreateImgProfile(ImageEntity_INTI)
        setImgProfile(undefined)
      }
    })
  }
  const onChangeIdCard = async (file: any) => {
    const source = file.target.files[0]
    let newSource: any

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split('/')[1],
        quality: 70,
        rotation: 0,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        responseUriFunc: () => {},
      })
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
      reader.onload = () => resolve(reader.result)
    })

    setImgIdCard(img_base64)
    const d = Map(createImgProfile).set('file', isFileMoreThan2MB ? newSource : source)
    const e = Map(d.toJS()).set('resource', 'FARMER')
    const f = Map(e.toJS()).set('category', 'ID_CARD_IMAGE')
    const g = Map(f.toJS()).set('resourceId', farmerId)
    setCreateImgIdCrad(g.toJS())
  }

  const onPreviewIdCard = async () => {
    let src = imgIdCard
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgIdCard)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const removeImgIdCard = () => {
    Swal.fire({
      title: 'ยืนยันการลบ',
      text: 'โปรดตรวจสอบรูปภาพที่คุณต้องการลบ',
      cancelButtonText: 'ย้อนกลับ',
      confirmButtonText: 'ลบ',
      confirmButtonColor: '#d33',
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const getImg = data.file.filter((x) => x.category == 'ID_CARD_IMAGE')[0]
        UploadImageDatasouce.deleteImage(getImg.id, getImg.path)
        setCreateImgIdCrad(ImageEntity_INTI)
        setImgIdCard(undefined)
      }
    })
  }
  //#endregion

  const checkValidate = (data: GetFarmerEntity) => {
    const checkEmptySting = ![data.firstname, data.lastname, data.telephoneNo].includes('')
    const checkEmptyNumber = ![
      address.provinceId,
      address.districtId,
      address.subdistrictId,
    ].includes(0)
    if (checkEmptySting && checkEmptyNumber) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }

  const checkValidateAddr = (addr: AddressEntity) => {
    const checkEmptySting = ![data.firstname, data.lastname, data.telephoneNo].includes('')
    const checkEmptyNumber = ![addr.provinceId, addr.districtId, addr.subdistrictId].includes(0)
    if (checkEmptySting && checkEmptyNumber) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }

  const checkValidateReason = (data: GetFarmerEntity) => {
    if (data.status == 'INACTIVE' && (data.reason == null || data.reason == '')) {
      setBtnSaveDisable(true)
    } else {
      setBtnSaveDisable(false)
    }
  }
  const updateFarmer = async () => {
    const pushAddr = Map(data).set('address', address)
    const pushPin = Map(pushAddr.toJS()).set('pin', '')
    const payload = {
      ...pushPin.toJS(),
      updateBy: `${profile.firstname} ${profile.lastname}`,
      birthDate: birthDay,
    }
    delete payload.farmerPlot
    try {
      setBtnSaveDisable(true)
      await FarmerDatasource.updateFarmer(payload).then((res) => {
        if (res !== undefined) {
          let i = 0
          for (i; 2 > i; i++) {
            i === 0 &&
              createImgProfile.file !== '' &&
              UploadImageDatasouce.uploadImage(createImgProfile).then(res)
            i === 1 &&
              createImgIdCard.file !== '' &&
              UploadImageDatasouce.uploadImage(createImgIdCard).then(res)
          }
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate('/IndexFarmer')
          })
        } else {
          Swal.fire({
            title: 'เบอร์โทร หรือ รหัสบัตรประชาชน <br/> ซ้ำในระบบ',
            icon: 'error',
            showConfirmButton: true,
          })
        }
      })
      setBtnSaveDisable(false)
    } catch (error) {
      setBtnSaveDisable(false)
      console.error('Error inserting farmer data:', error)
    }
  }
  const renderFromData = (
    <div className='col-lg-7'>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลเกษตรกร' />
        <Form style={{ padding: '32px' }} initialValues={{ birthDate: null }}>
          <div className='row'>
            <div className='form-group text-center pb-4'>
              <div
                className='hiddenFileInput zoom'
                style={{
                  backgroundImage: `url(${imgProfile === undefined ? img_empty : imgProfile})`,
                }}
              >
                <input key={imgProfile} type='file' onChange={onChangeProfile} title='เลือกรูป' />
              </div>
              <div>
                {imgProfile !== undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewProfile}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImg}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>Farmer ID</label>

              <div style={{ marginBottom: 24 }}>
                <Input
                  style={{
                    padding: '4px 12px',
                  }}
                  disabled
                  value={data.farmerCode}
                />
              </div>
            </div>
            <div className='form-group col-lg-6'>
              <label>วันที่ลงทะเบียน</label>

              <div style={{ marginBottom: 24 }}>
                <Input
                  style={{
                    padding: '4px 12px',
                  }}
                  disabled
                  value={`${moment(data.createdAt).format('DD/MM/YYYY')} ${
                    data.createBy === null || data.createBy === undefined
                      ? 'ลงทะเบียนโดยเกษตรกร'
                      : `(${data.createBy})`
                  }`}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-4'>
              <label>
                ชื่อ <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='firstname'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อ!',
                  },
                ]}
              >
                <Input
                  placeholder='กรอกชื่อ'
                  defaultValue={data.firstname}
                  autoComplete='off'
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className='form-group col-lg-4'>
              <label>
                นามสกุล <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='lastname'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกนามสกุล!',
                  },
                ]}
              >
                <Input
                  placeholder='กรอกนามสกุล'
                  defaultValue={data.lastname}
                  autoComplete='off'
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className='form-group col-lg-4'>
              <label>ชื่อเล่น</label>
              <Form.Item name='nickname'>
                <Input
                  placeholder='กรอกชื่อเล่น'
                  defaultValue={data.nickname}
                  autoComplete='off'
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>
                เบอร์โทร <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='telephoneNo'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเบอร์โทร!',
                  },
                  {
                    pattern: new RegExp(/^[0-9\b]+$/) && new RegExp(/^0[689]\d{8}$/),
                    message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง!',
                  },
                  {
                    min: 10,
                    message: 'กรุณากรอกเบอร์โทรให้ครบ 10 หลัก!',
                  },
                ]}
              >
                <Input
                  placeholder='กรอกเบอร์โทร'
                  defaultValue={data.telephoneNo}
                  autoComplete='off'
                  maxLength={10}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>วันเดือนปีเกิด</label>
              <Form.Item name='birthDay'>
                <DatePicker
                  placeholder='กรอกวันเดือนปีเกิด'
                  locale={locale}
                  format={dateFormat}
                  disabledDate={(current) =>
                    (current && current > moment().endOf('day')) ||
                    moment().diff(current, 'years') < 18
                  }
                  defaultValue={data.birthDate !== null ? moment(data.birthDate) : undefined}
                  onChange={(e) => {
                    setBirthDay(moment(e).toISOString())
                  }}
                  className='col-lg-12'
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>รหัสบัตรประชาชน</label>
              <Form.Item
                name='idNo'
                rules={[
                  {
                    min: 13,
                    message: 'กรุณากรอกรหัสบัตรประชาชนให้ครบ 13 หลัก!',
                  },
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: 'กรุณากรอกรหัสบัตรประชาชนให้ถูกต้อง!',
                  },
                ]}
              >
                <Input
                  placeholder='กรอกรหัสบัตรประชาชน'
                  defaultValue={data.idNo}
                  autoComplete='off'
                  maxLength={13}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-12 pb-5'>
              <label>รูปถ่ายผู้สมัครคู่กับบัตรประชาชน </label>
              <br />
              <div className='pb-2'>
                <div
                  className='hiddenFileInput'
                  style={{
                    backgroundImage: `url(${imgIdCard})`,
                    display: imgIdCard != undefined ? 'block' : 'none',
                  }}
                ></div>
              </div>
              <div className='text-left ps-4'>
                {imgIdCard != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewIdCard}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImgIdCard}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
              <div
                className='hiddenFileBtn'
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgIdCard == undefined ? 'block' : 'none',
                }}
              >
                <input key={imgIdCard} type='file' onChange={onChangeIdCard} title='เลือกรูป' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>
                จังหวัด <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item name='province'>
                <Select
                  allowClear
                  placeholder='เลือกจังหวัด'
                  defaultValue={
                    address && address.provinceId !== 0
                      ? address.provinceId
                      : locateNull?.provinceName
                  }
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeProvince}
                  key={address ? address.provinceId : 0}
                >
                  {province.map((item: any, index: any) => (
                    <Select.Option key={index} value={item.provinceId}>
                      {item.provinceName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>
                อำเภอ <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item name='district'>
                <Select
                  allowClear
                  placeholder='เลือกอำเภอ'
                  defaultValue={
                    address && address.districtId !== 0
                      ? address.districtId
                      : locateNull?.districtName
                  }
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA: any, optionB: any) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  disabled={!address || !address.provinceId}
                  onChange={handleOnChangeDistrict}
                  key={address ? address.districtId : 0}
                >
                  {district.map((item: any, index: any) => (
                    <Select.Option key={index} value={item.districtId}>
                      {item.districtName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>
                ตำบล <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item name='subdistrict'>
                <Select
                  allowClear
                  placeholder='เลือกตำบล'
                  defaultValue={
                    address && address.subdistrictId !== 0
                      ? address.subdistrictId
                      : locateNull?.subdistrictName
                  }
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeSubdistrict}
                  disabled={!address || !address.districtId}
                  key={address ? address.subdistrictId : 0}
                >
                  {subdistrict?.map((item: any, index: any) => (
                    <Select.Option key={index} value={item.subdistrictId}>
                      {item.subdistrictName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>
                รหัสไปรษณีย์ <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item name='postcode'>
                <Input
                  placeholder='เลือกรหัสไปรษณีย์'
                  defaultValue={
                    address && address.postcode ? address.postcode : locateNull?.postcode
                  }
                  key={address ? address.postcode : 0}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-12'>
              <label>บ้านเลขที่</label>
              <Form.Item name='address1'>
                <Input
                  placeholder='กรอกบ้านเลขที่'
                  onChange={handleOnChangeAddress1}
                  defaultValue={address !== null ? address.address1 : '-'}
                  autoComplete='off'
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group'>
              <label>ที่อยู่บ้าน</label>
              <Form.Item name='Address'>
                <TextArea
                  className='col-lg-12'
                  rows={5}
                  placeholder='กรอกที่อยู่บ้าน (เลขที่บ้าน, หมู่บ้าน, ชื่ออาคาร/ตึก, ซอย)'
                  defaultValue={address !== null ? address.address2 : '-'}
                  autoComplete='off'
                  onChange={handleOnChangeAddress2}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <div className='form-group'>
              <label>
                สถานะ <span style={{ color: 'red' }}>*</span>
              </label>
              <br />
              <Radio.Group defaultValue={data.status} onChange={handleChangeFarmerstatus}>
                <Space direction='vertical'>
                  {FARMER_STATUS_SEARCH.map((item, index) => (
                    <>
                      <Radio value={item.value} key={index}>
                        {item.name}
                        {(data.status == 'REJECTED' && index == 3) ||
                        (data.status == 'INACTIVE' && index == 4) ? (
                          <div>
                            <div className='form-group'>
                              <label></label>
                              <br />
                              <Form.Item>
                                <TextArea
                                  className='col-lg-12'
                                  rows={3}
                                  placeholder='กรอกเหตุผล/เหตุหมายเพิ่มเติม'
                                  autoComplete='off'
                                  onChange={handleOnChangeReason}
                                  defaultValue={data.reason}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        ) : null}
                      </Radio>
                    </>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className='form-group col-lg-12' style={{ marginTop: 16 }}>
            <label>หมายเหตุ</label>
            <Form.Item>
              <TextArea
                value={data.comment}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )

  const renderLand = (
    <div className='col-lg-4'>
      <CardContainer>
        <div
          style={{
            backgroundColor: color.Success,
            borderRadius: '12px 12px 0px 0px',
            padding: '10px 10px 10px 10px',
          }}
          className='d-flex justify-content-between'
        >
          <h4 className='pt-2 ps-3' style={{ color: 'white' }}>
            แปลงเกษตร
          </h4>
          <Button
            className='pt-2'
            style={{
              backgroundColor: color.secondary1,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            เพิ่มแปลง
          </Button>
        </div>
        <Form>
          {farmerPlotList.length !== 0 ? (
            <div className='container'>
              {currentItems.map((item, index) => (
                <>
                  <div className='row pt-3 pb-3' style={{ justifyContent: 'space-between' }}>
                    <div className='col-lg-5'>
                      <p
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          marginBottom: 0,
                        }}
                      >
                        {item.plotName.length > 15
                          ? `${item.plotName.slice(0, 15)}...`
                          : item.plotName}
                        {item.landmark && <ShowLandmark landmark={item.landmark} />}
                      </p>
                      <p style={{ fontSize: '12px', color: color.Grey }}>{item.plantName}</p>
                    </div>
                    <div className='col-lg'>
                      <span>{item.raiAmount} ไร่</span>
                    </div>
                    <div className='col-lg'>
                      <span
                        style={{
                          color: STATUS_FARMERPLOT_COLOR_MAPPING[item.status],
                        }}
                      >
                        <Badge color={STATUS_FARMERPLOT_COLOR_MAPPING[item.status]} />{' '}
                        {STATUS_NORMAL_MAPPING[item.status]}
                      </span>
                    </div>
                    <div className='col-lg d-flex justify-content-between'>
                      <div className='col-lg-6'>
                        <ActionButton
                          icon={<EditOutlined />}
                          color={color.primary1}
                          onClick={() => editPlot(item, index + 1)}
                        />
                      </div>
                      <div className='col-lg-6'>
                        <ActionButton
                          icon={<DeleteOutlined />}
                          color={color.Error}
                          onClick={() => removePlot(item)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div className='container text-center' style={{ padding: '80px' }}>
              <img src={emptyData} alt='' />
              <h5>ยังไม่มีแปลงเกษตร</h5>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className='d-flex justify-content-between pt-5'>
        <p>รายการทั้งหมด {farmerPlotList.length} รายการ</p>
        <Pagination
          simple
          current={currentPage}
          total={farmerPlotList.length}
          pageSize={10}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )

  return (
    <>
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1)
          }}
        />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>แก้ไขข้อมูลเกษตรกร (Farmer)</strong>
        </span>
      </Row>
      <Row className='d-flex justify-content-around' key={data.id}>
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={updateFarmer}
        disableSaveBtn={saveBtnDisable}
      />
      <ModalFarmerPlot
        show={showAddModal}
        backButton={() => {
          setEditIndex(0)
          setShowAddModal((prev) => !prev)
        }}
        callBack={updateFarmerPlot}
        data={editIndex > 0 ? editFarmerPlot : FarmerPlotEntity_INIT}
        editIndex={editIndex}
        title={editIndex > 0 ? 'แก้ไขแปลงเกษตร' : 'เพิ่มแปลงเกษตร'}
        callBackModal={(val) => setShowAddModal(!val)}
        isEditModal={editIndex > 0 ? true : false}
        action='edit'
      />
    </>
  )
}

export default EditFarmer
