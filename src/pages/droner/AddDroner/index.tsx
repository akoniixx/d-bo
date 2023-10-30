import React, { useEffect, useState } from 'react'
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Badge,
  Tag,
  Avatar,
  DatePicker,
  Checkbox,
  Col,
  Divider,
  Space,
} from 'antd'
import { CardContainer } from '../../../components/card/CardContainer'
import { BackIconButton } from '../../../components/button/BackButton'
import emptyData from '../../../resource/media/empties/tabler_drone.png'
import { EditOutlined } from '@ant-design/icons'
import color from '../../../resource/color'
import { CardHeader } from '../../../components/header/CardHearder'
import Swal from 'sweetalert2'
import {
  BookBankEntities,
  BookBankEntities_INIT,
  CreateDronerEntity,
  CreateDronerEntity_INIT,
  DronerEntity,
} from '../../../entities/DronerEntities'
import { CreateAddressEntity, CreateAddressEntity_INIT } from '../../../entities/AddressEntities'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import FooterPage from '../../../components/footer/FooterPage'
import { EXP_PLANT } from '../../../definitions/ExpPlant'
import ActionButton from '../../../components/button/ActionButton'
import { DRONER_DRONE_MAPPING, STATUS_COLOR } from '../../../definitions/DronerStatus'
import { DronerDatasource } from '../../../datasource/DronerDatasource'
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from '../../../entities/LocationEntities'
import ModalDrone from '../../../components/modal/ModalDronerDrone'
import { DronerDroneEntity, DronerDroneEntity_INIT } from '../../../entities/DronerDroneEntities'
import { UploadImageEntity, UploadImageEntity_INTI } from '../../../entities/UploadImageEntities'
import { UploadImageDatasouce } from '../../../datasource/UploadImageDatasource'
import img_empty from '../../../resource/media/empties/uploadImg.png'
import bth_img_empty from '../../../resource/media/empties/upload_Img_btn.png'
import { DronerAreaEntity, DronerAreaEntity_INIT } from '../../../entities/DronerAreaEntities'
import { LAT_LNG_BANGKOK } from '../../../definitions/Location'
import GoogleMap from '../../../components/map/GoogleMap'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/th_TH'
import TextArea from 'antd/lib/input/TextArea'
import { useLocalStorage } from '../../../hook/useLocalStorage'
import { resizeFileImg } from '../../../utilities/ResizeImage'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../../components/layout/Layout'
import BookBankDroner from '../../../components/bookbank/BookBankDroner'
import { OtherAddressDatasource } from '../../../datasource/OtherAddress'
import { CropDatasource } from '../../../datasource/CropDatasource'
const dateFormat = 'DD/MM/YYYY'
const dateCreateFormat = 'YYYY-MM-DD'

const { Map } = require('immutable')
const { Option } = Select
function AddDroner() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [profile] = useLocalStorage('profile', [])
  const [data] = useState<CreateDronerEntity>(CreateDronerEntity_INIT)
  const [dataBookBank] = useState<any>()
  const [address, setAddress] = useState<CreateAddressEntity>(CreateAddressEntity_INIT)
  const [otherAddress, setOtherAddress] = useState<CreateAddressEntity>()
  const [dronerArea, setDronerArea] = useState<DronerAreaEntity>(DronerAreaEntity_INIT)
  const [dronerDroneList, setDronerDroneList] = useState<DronerDroneEntity[]>([])
  const [showModal, setShowModal] = useState(false)
  const [imgBB, setImgBB] = useState<any>()
  const [bookBank, setBookBank] = useState<BookBankEntities>(BookBankEntities_INIT)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState(0)
  const [editDrone, setEditDrone] = useState<DronerDroneEntity>(DronerDroneEntity_INIT)
  const [birthDay, setBirthDay] = useState<string>()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [province, setProvince] = useState<ProviceEntity[]>([ProvinceEntity_INIT])
  const [district, setDistrict] = useState<DistrictEntity[]>([DistrictEntity_INIT])
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([SubdistrictEntity_INIT])
  const [plantsName, setPlantsName] = useState<any[]>([])
  const [otherProvince, setOtherProvince] = useState<ProviceEntity[]>([ProvinceEntity_INIT])
  const [otherDistrict, setOtherDistrict] = useState<DistrictEntity[]>([DistrictEntity_INIT])
  const [otherSubdistrict, setOtherSubdistrict] = useState<SubdistrictEntity[]>([
    SubdistrictEntity_INIT,
  ])

  const [imgProfile, setImgProfile] = useState<any>()
  const [imgIdCard, setImgIdCard] = useState<any>()
  const [imgDroneList] = useState<UploadImageEntity[]>([UploadImageEntity_INTI])

  const [createImgProfile, setCreateImgProfile] =
    useState<UploadImageEntity>(UploadImageEntity_INTI)
  const [createImgIdCard, setCreateImgIdCard] = useState<UploadImageEntity>(UploadImageEntity_INTI)
  const [imagBookBank, setImagBookBank] = useState<any>()
  const [mapPosition, setMapPosition] = useState<{
    lat?: number
    lng?: number
  }>()
  const [location, setLocation] = useState<SubdistrictEntity[]>([])
  const [searchLocation] = useState('')

  useEffect(() => {
    fetchProvince()
    getCropsName()
    fetchLocation(searchLocation)
  }, [searchLocation])
  //#region data droner
  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res)
      setOtherProvince(res)
    })
  }
  const fetchLocation = async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res)
    })
  }
  const getCropsName = async () => {
    await CropDatasource.getCropJustName().then((res) => {
      setPlantsName(res)
    })
  }

  //#endregion

  //#region address

  const handleOnChangeProvince = async (provinceId: number) => {
    await getProvince(provinceId, CreateAddressEntity_INIT)
  }
  const getProvince = async (provinceId: number, addr: CreateAddressEntity) => {
    const d = Map(addr).set('provinceId', provinceId)
    setAddress(d.toJS())
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res)
    })
  }
  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set('districtId', districtId)
    setAddress(d.toJS())
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res)
    })
  }
  const handleOnChangeSubdistrict = async (subdistrictId: number) => {
    const d = Map(address).set('subdistrictId', subdistrictId)
    setAddress(d.toJS())
    await handleOnChangePostcode(d.toJS())
  }
  const handleOnChangePostcode = (addr: CreateAddressEntity) => {
    const getPostcode = subdistrict.filter((x) => x.subdistrictId === addr.subdistrictId)[0]
      .postcode
    const c = Map(addr).set('postcode', getPostcode)
    setAddress(c.toJS())
    form.setFieldsValue({
      postcode: c.toJS().postcode,
    })
  }
  //#otherAddress
  const handleOtherProvince = async (otherProvinceId: number) => {
    await getOtherProvince(otherProvinceId, CreateAddressEntity_INIT)
  }
  const getOtherProvince = async (otherProvinceId: number, otherAddr: CreateAddressEntity) => {
    const d = Map(otherAddr).set('provinceId', otherProvinceId)
    setOtherAddress(d.toJS())
    await LocationDatasource.getDistrict(otherProvinceId).then((res) => {
      setOtherDistrict(res)
    })
  }
  const handleOtherDistrict = async (otherDistrictId: number) => {
    const d = Map(otherAddress).set('districtId', otherDistrictId)
    setOtherAddress(d.toJS())
    await LocationDatasource.getSubdistrict(otherDistrictId).then((res) => {
      setOtherSubdistrict(res)
    })
  }
  const handleOtherSubdistrict = async (otherSubdistrictId: number) => {
    const d = Map(otherAddress).set('subdistrictId', otherSubdistrictId)
    setOtherAddress(d.toJS())
    await handleOtherPostcode(d.toJS())
  }
  const handleOtherPostcode = (addr: CreateAddressEntity) => {
    const getPostcode = otherSubdistrict.filter((x) => x.subdistrictId === addr.subdistrictId)[0]
      .postcode
    const c = Map(addr).set('postcode', getPostcode)
    setOtherAddress(c.toJS())
    form.setFieldsValue({
      otherPostcode: c.toJS().postcode,
    })
  }
  //#endregion

  //#region map
  const handleSearchLocation = async (value: any) => {
    if (value) {
      const a = location.filter((x) => x.subdistrictId === value)[0]
      const pushProvince = Map(dronerArea).set('provinceId', a.provinceId)
      const pushDistric = Map(pushProvince.toJS()).set('districtId', a.districtId)
      const pushSubDis = Map(pushDistric.toJS()).set('subdistrictId', a.subdistrictId)
      const pushLat = Map(pushSubDis.toJS()).set('lat', a.lat)
      const pushLong = Map(pushLat.toJS()).set('long', a.long)
      let locationName = ''
      const geocoder = new google.maps.Geocoder()
      const latlng = {
        lat: parseFloat(pushLong.toJS().lat),
        lng: parseFloat(pushLong.toJS().long),
      }
      await geocoder
        .geocode({
          location: latlng,
          region: 'th',
        })
        .then((res) => {
          const location = res.results[0].address_components
          locationName =
            location[1].short_name + ' ' + location[2].short_name + ' ' + location[3].long_name
        })
      const l = Map(pushLong.toJS()).set('locationName', locationName)
      setDronerArea(l.toJS())
      setMapPosition({
        lat: a.lat != null ? parseFloat(a.lat) : 0,
        lng: a.long != null ? parseFloat(a.long) : 0,
      })
      if (!!a.lat && !!a.long) {
        form.setFieldsValue({
          latitude: a.lat,
          longitude: a.long,
        })
      }
    } else {
      setMapPosition(LAT_LNG_BANGKOK)
    }
  }

  const handleOnChangeLat = (value: any) => {
    const m = Map(dronerArea).set('lat', value.target.value)
    setDronerArea(m.toJS())
    setMapPosition((prev) => ({
      lat: parseFloat(value.target.value),
      lng: prev?.lng,
    }))
    form.setFieldsValue({
      latitude: value.target.value,
    })
  }
  const handleOnChangeLng = (value: any) => {
    const m = Map(dronerArea).set('long', value.target.value)
    setDronerArea(m.toJS())
    setMapPosition((prev) => ({
      lat: prev?.lat,
      lng: parseFloat(value.target.value),
    }))
    form.setFieldsValue({
      longitude: value.target.value,
    })
  }
  //#endregion
  //#region modal
  const editDroneList = (data: DronerDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev)
    setEditDrone(data)
    setEditIndex(index)
  }
  const insertDroneList = (data: DronerDroneEntity) => {
    if (data.modalDroneIndex === 0) {
      const pushId = Map(data).set('modalDroneIndex', dronerDroneList.length + 1)
      setDronerDroneList([...dronerDroneList, pushId.toJS()])
    } else {
      const m = dronerDroneList.filter((x) => x.modalDroneIndex !== data.modalDroneIndex)
      setDronerDroneList([...m, data])
    }
    setShowAddModal(false)
    setShowEditModal(false)
    setEditIndex(0)
  }
  const insertBookBank = (data: DronerEntity) => {
    const sumData = {
      bankName: data.bankName,
      bankAccountName: data.bankAccountName,
      accountNumber: data.accountNumber,
      isConsentBookBank: data.isConsentBookBank,
      isBookBank: data.isConsentBookBank,
    }
    const filterImg = data.file.find((x: any) => x.category === 'BOOK_BANK')
    setImgBB(filterImg)
    setBookBank(sumData)
    setBtnSaveDisable(false)
  }
  //#endregion

  //#region Image
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
        responseUriFunc: (res: any) => {},
      })
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
      reader.onload = () => resolve(reader.result)
    })
    setImgProfile(img_base64)
    const d = Map(createImgProfile).set('file', isFileMoreThan2MB ? newSource : source)
    const e = Map(d.toJS()).set('resource', 'DRONER')
    const f = Map(e.toJS()).set('category', 'PROFILE_IMAGE')
    setCreateImgProfile(f.toJS())
    setBtnSaveDisable(false)
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
  const removeImgProfile = () => {
    setImgProfile(undefined)
    setCreateImgProfile(UploadImageEntity_INTI)
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
        responseUriFunc: (res: any) => {},
      })
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source)
      reader.onload = () => resolve(reader.result)
    })
    setImgIdCard(img_base64)
    const d = Map(createImgIdCard).set('file', isFileMoreThan2MB ? newSource : source)
    const e = Map(d.toJS()).set('resource', 'DRONER')
    const f = Map(e.toJS()).set('category', 'ID_CARD_IMAGE')
    setCreateImgIdCard(f.toJS())
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
    setImgIdCard(undefined)
    setCreateImgIdCard(UploadImageEntity_INTI)
  }
  //#endregion

  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes('*') ||
      data.includes('/') ||
      data.includes(' ') ||
      data.includes('-') ||
      data.includes('+')
    return data.trim().length !== 0 ? (checkSyntax ? true : false) : true
  }
  const validatePlants = (_: any, value: any) => {
    const plantsOther = form.getFieldValue('plantsOther')

    if ((!value || value.length === 0) && !plantsOther) {
      return Promise.reject('กรุณาเลือกพืชที่เคยฉีดพ่นอย่างน้อย 1 อย่าง')
    } else {
      return Promise.resolve()
    }
  }
  const validatePlantsOther = (rule: any, value: any) => {
    const splitValue = (value && value.split(',')) || []
    const valueCheckbox = form.getFieldValue('checkPlantsOther')
    const isDuplicate = splitValue && splitValue.some((el: string) => valueCheckbox?.includes(el))
    const isDupTyping = new Set(splitValue).size !== splitValue.length
    if (!!value && checkValidateComma(value)) {
      return Promise.reject('กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง')
    } else if (isDuplicate || isDupTyping) {
      return Promise.reject('กรุณากรอกพืชที่เคยฉีดพ่นให้ถูกต้อง ไม่ควรมีพืชที่ซ้ำกัน')
    } else if (!value && valueCheckbox?.length === 0) {
      return Promise.reject('กรุณาเลือกพืชที่เคยฉีดพ่น/กรอกพืชที่เคยฉีดพ่นอย่างน้อย 1 อย่าง')
    } else {
      return Promise.resolve()
    }
  }

  const onFieldsChange = () => {
    const isHasError = form.getFieldsError().some(({ errors }) => {
      return errors.length > 0
    })
    const { mapUrl, plantsOther, dronerArea, checkPlantsOther, idNo, comment, ...rest } =
      form.getFieldsValue()
    const expPlant = []
    if (checkPlantsOther?.length > 0) {
      expPlant.push(...checkPlantsOther)
    }
    if (plantsOther) {
      expPlant.push(plantsOther)
    }
    const isHasValues = Object.values({
      ...rest,
      expPlant: expPlant.length > 0,
    }).every((el) => el)

    if (!isHasError && isHasValues) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }
  const insertDroner = async (values: any) => {
    const splitPlant = values?.plantsOther ? values?.plantsOther?.split(',') : []
    const valuePlant = values?.checkPlantsOther || []
    const expPlant = splitPlant.length > 0 ? [...valuePlant, ...splitPlant] : valuePlant

    const pushAdd = Map(data).set('address', address)
    const pushOtherAdd = Map(pushAdd.toJS()).set('otherAddress', otherAddress)
    const pushDronerArea = Map(pushOtherAdd.toJS()).set('dronerArea', dronerArea)
    const pushDroneList = Map(pushDronerArea.toJS()).set('dronerDrone', dronerDroneList)
    data.dronerDrone?.push.apply(dronerDroneList)
    const setOtherPlant = Array.from(new Set(pushDroneList.toJS().expPlant)).filter((x) => x !== '')
    const pushOtherPlant = Map(pushDroneList.toJS()).set('expPlant', setOtherPlant)

    const payload = {
      ...pushOtherPlant.toJS(),
      ...values,
      expPlant: expPlant,
      birthDate: birthDay,
      address: {
        ...pushOtherPlant.toJS().address,
        address1: values.address1,
        address2: values.address2,
      },
      otherAddress: {
        ...pushOtherPlant.toJS().otherAddress,
        address1: otherAddress?.address1,
        address2: otherAddress?.address2,
      },
      dronerArea: {
        ...pushOtherPlant.toJS().dronerArea,
        mapUrl: values.mapUrl,
      },
      createBy: `${profile?.firstname} ${profile?.lastname}`,
      bankName: bookBank?.bankName,
      bankAccountName: bookBank?.bankAccountName,
      accountNumber: bookBank?.accountNumber,
      isConsentBookBank: bookBank?.isConsentBookBank,
      isBookBank: bookBank?.isBookBank,
      file: imgBB,
    }
    await DronerDatasource.createDronerList(payload).then(async (res) => {
      if (res !== undefined) {
        if (imgBB) {
          UploadImageDatasouce.uploadImage(Map(imgBB).set('resourceId', res.id).toJS())
        }
        const fileList = [createImgProfile, createImgIdCard]
          .filter((el) => {
            return el.file !== '' && el.file !== undefined
          })
          .map((el) => {
            return UploadImageDatasouce.uploadImage(Map(el).set('resourceId', res.id).toJS())
          })

        await Promise.all(fileList)

        for (let i = 0; res.dronerDrone.length > i; i++) {
          const findId = res.dronerDrone[i]
          const getData = dronerDroneList.filter((x) => x.serialNo === findId.serialNo)[0]

          for (let j = 0; getData.file.length > j; j++) {
            const getImg = getData.file[j]
            imgDroneList?.push({
              resourceId: findId.id,
              category: getImg.category,
              file: getImg.file,
              resource: getImg.resource,
              path: '',
            })
          }
        }
        const checkImg = imgDroneList.filter((x) => x.resourceId !== '')
        for (let k = 0; checkImg.length > k; k++) {
          const getDataImg: any = checkImg[k]
          await UploadImageDatasouce.uploadImage(getDataImg).then(res)
        }
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          navigate('/IndexDroner')
        })
      } else {
        Swal.fire({
          title: 'เบอร์โทร หรือ รหัสบัตรประชาชน <br/> ซ้ำในระบบ',
          icon: 'error',
          showConfirmButton: true,
        })
      }
    })
  }
  const renderFromData = (
    <div className='col-lg-7'>
      <CardContainer>
        <CardHeader textHeader='ข้อมูลนักบินโดรน' />
        <Form
          style={{ padding: '32px' }}
          onFinish={insertDroner}
          onFieldsChange={onFieldsChange}
          form={form}
        >
          <div className='row'>
            <div className='form-group text-center pb-5'>
              <div
                className='hiddenFileInput'
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
                      onClick={removeImgProfile}
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
                <Input placeholder='กรอกชื่อ' autoComplete='off' />
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
                <Input placeholder='กรอกนามสกุล' autoComplete='off' />
              </Form.Item>
            </div>
            <div className='form-group col-lg-4'>
              <label>ชื่อเล่น</label>
              <Form.Item name='nickname'>
                <Input placeholder='กรอกชื่อเล่น' autoComplete='off' />
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
                <Input placeholder='กรอกเบอร์โทร' autoComplete='off' maxLength={10} />
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>วันเดือนปีเกิด</label>
              <Form.Item>
                <DatePicker
                  placeholder='กรอกวันเดือนปีเกิด'
                  format={dateFormat}
                  locale={locale}
                  disabledDate={(current) =>
                    (current && current > moment().endOf('day')) ||
                    moment().diff(current, 'years') < 18
                  }
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
                    message: 'กรุณากรอกรหัสบัตรประชาชน 13 หลัก',
                  },
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: 'กรุณากรอกรหัสบัตรประชาชนให้ถูกต้อง!',
                  },
                ]}
              >
                <Input placeholder='กรอกบัตรประชาชน' maxLength={13} autoComplete='off' />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6 pb-5'>
              <label>รูปถ่ายผู้สมัครคู่กับบัตรประชาชน</label>
              <br />
              <div className='pb-2'>
                <div
                  className='hiddenFileInput'
                  style={{
                    backgroundImage: `url(${imgIdCard})`,
                    display: imgIdCard !== undefined ? 'block' : 'none',
                  }}
                ></div>
              </div>
              <div className='text-left ps-4'>
                {imgIdCard !== undefined && (
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
                  display: imgIdCard === undefined ? 'block' : 'none',
                }}
              >
                <input type='file' key={imgIdCard} onChange={onChangeIdCard} title='เลือกรูป' />
              </div>
            </div>
            <Divider />
          </div>
          <h6>ที่อยู่นักบินโดรน</h6>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>
                จังหวัด <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='provinceId'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกจังหวัด',
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='เลือกจังหวัด'
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeProvince}
                  key={address.provinceId}
                >
                  {province?.map((item) => (
                    <Option value={item.provinceId}>{item.provinceName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>
                อำเภอ <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='districtId'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกอำเภอ',
                  },
                ]}
              >
                <Select
                  showSearch
                  disabled={address.provinceId === undefined || address.provinceId === 0}
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onClear={() =>
                    form.setFieldsValue({
                      postcode: undefined,
                      districtId: undefined,
                      subdistrictId: undefined,
                    })
                  }
                  value={address?.districtId}
                  placeholder='เลือกอำเภอ'
                  allowClear
                  onChange={handleOnChangeDistrict}
                >
                  {district?.map((item) => (
                    <Option value={item.districtId}>{item.districtName}</Option>
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
              <Form.Item
                name='subdistrictId'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกตำบล',
                  },
                ]}
              >
                <Select
                  disabled={address.districtId === undefined || address.districtId === 0}
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  value={address?.subdistrictId}
                  placeholder='เลือกตำบล'
                  allowClear
                  onClear={() => form.setFieldsValue({ postcode: undefined })}
                  onChange={handleOnChangeSubdistrict}
                >
                  {subdistrict?.map((item) => (
                    <Option value={item.subdistrictId}>{item.subdistrictName}</Option>
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
                  name='postcode'
                  placeholder='กรอกรหัสไปรษณีย์'
                  key={address.subdistrictId}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group'>
              <label>
                ที่อยู่บ้าน <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='address1'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกบ้านเลขที่!',
                  },
                ]}
              >
                <Input className='col-lg-12' placeholder='กรุณากรอกบ้านเลขที่' />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group'>
              <label>
                รายละเอียดที่อยู่ (หมู่, ถนน) <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='address2'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรายละเอียดที่อยู่บ้าน!',
                  },
                ]}
              >
                <TextArea rows={4} className='col-lg-12' placeholder='กรอกรายละเอียดที่อยู่บ้าน' />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <h6>ที่อยู่จัดส่ง</h6>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>จังหวัด</label>
              <Form.Item>
                <Select
                  allowClear
                  showSearch
                  placeholder='เลือกจังหวัด'
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOtherProvince}
                  defaultValue={otherAddress?.provinceId}
                >
                  {otherProvince?.map((item) => (
                    <Option value={item.provinceId}>{item.provinceName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>อำเภอ</label>
              <Form.Item>
                <Select
                  showSearch
                  disabled={otherAddress?.provinceId === undefined}
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onClear={() =>
                    form.setFieldsValue({
                      otherPostcode: undefined,
                      otherDistrictId: undefined,
                      otherSubdistrictId: undefined,
                    })
                  }
                  placeholder='เลือกอำเภอ'
                  allowClear
                  onChange={handleOtherDistrict}
                  defaultValue={otherAddress?.districtId}
                >
                  {otherDistrict?.map((item) => (
                    <Option value={item.districtId}>{item.districtName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>ตำบล</label>
              <Form.Item>
                <Select
                  disabled={
                    otherAddress?.districtId === undefined || otherAddress?.districtId === 0
                  }
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  defaultValue={otherAddress?.subdistrictId}
                  placeholder='เลือกตำบล'
                  allowClear
                  onClear={() => form.setFieldsValue({ otherPostcode: undefined })}
                  onChange={handleOtherSubdistrict}
                >
                  {otherSubdistrict?.map((item) => (
                    <Option value={item.subdistrictId}>{item.subdistrictName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>รหัสไปรษณีย์</label>
              <Form.Item>
                <Input
                  placeholder='กรอกรหัสไปรษณีย์'
                  key={otherAddress?.subdistrictId}
                  defaultValue={otherAddress?.postcode}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group'>
              <label>ที่อยู่บ้าน</label>
              <Form.Item>
                <Input
                  className='col-lg-12'
                  placeholder='กรุณากรอกบ้านเลขที่'
                  onChange={(e) => {
                    const m = Map(otherAddress).set('address1', e.target.value)
                    setOtherAddress(m.toJS())
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group'>
              <label>รายละเอียดที่อยู่ (หมู่, ถนน) </label>
              <Form.Item>
                <TextArea
                  rows={4}
                  className='col-lg-12'
                  placeholder='กรอกรายละเอียดที่อยู่บ้าน'
                  onChange={(e) => {
                    const m = Map(otherAddress).set('address2', e.target.value)
                    setOtherAddress(m.toJS())
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <Divider />

          <div className='form-group'>
            <label>พื้นที่ให้บริการหลัก </label>
            <Form.Item name='dronerArea'>
              <Select
                allowClear
                showSearch
                placeholder='ค้นหาตำบล/อำเภอ/จังหวัด'
                onChange={handleSearchLocation}
                optionFilterProp='children'
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                filterOption={(input: any, option: any) => option.children.includes(input)}
              >
                {location?.map((item) => (
                  <Option value={item.subdistrictId}>
                    {item.subdistrictName + '/' + item.districtName + '/' + item.provinceName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>Google Map Link</label>
            <Form.Item name='mapUrl'>
              <Input placeholder='กรอกข้อมูล Url Google Map Link' autoComplete='off' />
            </Form.Item>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>Latitude (ละติจูด) </label>
              <span style={{ color: 'red' }}>*</span>
              <Form.Item
                name='latitude'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกละติจูด!',
                  },
                ]}
                key={mapPosition?.lat}
              >
                <Input
                  placeholder='กรอกข้อมูล Latitude'
                  value={mapPosition?.lat}
                  onBlur={handleOnChangeLat}
                  autoComplete='off'
                />
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>Longitude (ลองติจูด) </label>
              <span style={{ color: 'red' }}>*</span>
              <Form.Item
                name='longitude'
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกลองติจูด!',
                  },
                ]}
                key={mapPosition?.lng}
              >
                <Input
                  placeholder='กรอกข้อมูล Longitude'
                  value={mapPosition?.lng}
                  onBlur={handleOnChangeLng}
                  autoComplete='off'
                />
              </Form.Item>
            </div>
          </div>
          <GoogleMap
            changeLatLng={(lat, lng) => {
              setDronerArea({
                ...dronerArea,
                lat: lat,
                long: lng,
              })
              form.setFieldsValue({
                latitude: lat,
                longitude: lng,
              })
            }}
            isEdit={true}
            width='100%'
            height='300px'
            zoom={17}
            lat={mapPosition?.lat}
            lng={mapPosition?.lng}
          />

          <div className='form-group col-lg-6'>
            <label>
              พืชที่เคยฉีดพ่น{' '}
              <span style={{ color: color.Disable }}>(กรุณาเลือกอย่างน้อย 1 อย่าง)</span>
              <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='checkPlantsOther'
              style={{
                marginBottom: '0px',
              }}
              dependencies={['plantsOther']}
              rules={[{ validator: validatePlants }]}
            >
              <Checkbox.Group>
                <Space direction='vertical'>
                  {plantsName.map((el) => (
                    <Checkbox key={el.id} value={el.cropName}>
                      <label>{el.cropName}</label>
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className='form-group col-lg-12'>
            <Form.Item
              name='plantsOther'
              dependencies={['checkPlantsOther']}
              rules={[{ validator: validatePlantsOther }]}
            >
              <Input
                placeholder='กรอกข้อมูลพืชอื่นๆ เช่น ส้ม,มะขาม (กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง)'
                autoComplete='off'
              />
            </Form.Item>
          </div>
          <div className='form-group col-lg-12'>
            <label>หมายเหตุ</label>
            <Form.Item name='comment'>
              <TextArea />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  )

  const renderDrone = (
    <>
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
              รายการโดรน
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
              เพิ่มโดรน
            </Button>
          </div>
          <Form>
            {dronerDroneList?.length !== 0 ? (
              <>
                {dronerDroneList
                  .sort((x, y) => x.modalDroneIndex - y.modalDroneIndex)
                  .map((item, index) => (
                    <Row justify={'space-between'} gutter={16} className='p-2'>
                      <Col span={2}>
                        <Avatar
                          size={25}
                          src={item.drone?.droneBrand.logoImagePath}
                          style={{ marginRight: '5px' }}
                        />
                      </Col>
                      <Col span={8}>
                        <h6>{item.drone?.droneBrand.name}</h6>
                        <p style={{ color: '#ccc' }}>{item.serialNo}</p>
                      </Col>
                      <Col span={8}>
                        <span style={{ color: STATUS_COLOR[item.status] }}>
                          <Badge color={STATUS_COLOR[item.status]} />{' '}
                          {DRONER_DRONE_MAPPING[item.status]}
                          <br />
                        </span>
                      </Col>
                      <Col span={4}>
                        <Row justify={'space-between'} gutter={16}>
                          <Col span={12}>
                            <ActionButton
                              icon={<EditOutlined />}
                              color={color.primary1}
                              onClick={() => editDroneList(item, index + 1)}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))}
              </>
            ) : (
              <div className='container text-center' style={{ padding: '80px' }}>
                <img src={emptyData} alt='' />
                <p>ยังไม่มีข้อมูลโดรน</p>
              </div>
            )}
          </Form>
        </CardContainer>
        <div className='d-flex justify-content-between pt-3'>
          <p>รายการทั้งหมด {dronerDroneList.length} รายการ</p>
          {dronerDroneList.length > 10 && <Pagination defaultCurrent={1} total={1} />}
        </div>
        <BookBankDroner callBack={insertBookBank} data={dataBookBank} dronerId='' />
      </div>
    </>
  )

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-4'>
          <strong style={{ fontSize: '20px' }}>เพิ่มข้อมูลนักบินโดรน (Droner)</strong>
        </span>
      </Row>
      <Row className='d-flex justify-content-around'>
        {renderFromData}
        {renderDrone}
      </Row>
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={() => form.submit()}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalDrone
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={insertDroneList}
          data={DronerDroneEntity_INIT}
          editIndex={editIndex}
          title='เพิ่มข้อมูลโดรนเกษตร'
        />
      )}
      {showEditModal && (
        <ModalDrone
          isEdit
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={insertDroneList}
          data={editDrone}
          editIndex={editIndex}
          title='แก้ไขข้อมูลโดรนเกษตร'
        />
      )}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <p>Are you sure you want to leave?</p>
            <button onClick={() => setShowModal(false)}>Stay</button>
            <button onClick={() => setShowModal(false)}>Leave</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AddDroner
