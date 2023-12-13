/* eslint-disable react/jsx-key */
import { Form, Input, Modal, Radio, Select, Space, Tag } from 'antd'
import { Option } from 'antd/lib/mentions'
import React, { useEffect, useState } from 'react'
import { DroneDatasource } from '../../datasource/DroneDatasource'
import { DroneBrandEntity } from '../../entities/DroneBrandEntities'
import { DroneEntity } from '../../entities/DroneEntities'
import { DronerDroneEntity } from '../../entities/DronerDroneEntities'
import { UploadImageEntity } from '../../entities/UploadImageEntities'
import color from '../../resource/color'
import FooterPage from '../footer/FooterPage'
import bth_img_empty from '../../resource/media/empties/upload_Img_btn.png'
import { MONTH_SALE } from '../../definitions/Month'
import { UploadImageDatasouce } from '../../datasource/UploadImageDatasource'
import { DRONE_STATUS } from '../../definitions/DronerStatus'
import { REASON_IS_CHECK } from '../../definitions/Reason'
import TextArea from 'antd/lib/input/TextArea'

const _ = require('lodash')
const { Map } = require('immutable')

interface ModalDroneProps {
  show: boolean
  backButton: () => void
  callBack: (data: DronerDroneEntity) => void
  data: DronerDroneEntity
  editIndex: number
  title: string
  isEdit?: boolean
}
const ModalDrone: React.FC<ModalDroneProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  isEdit = false,
  title,
}) => {
  const [form] = Form.useForm()
  const [dataDrone, setDataDrone] = useState<DronerDroneEntity>(data)
  const [droneList, setDroneList] = useState<DroneBrandEntity[]>()
  const [droneBrandId, setDroneBrandId] = useState<string>()
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>()
  const [pushDrone, setPushDrone] = useState<DroneEntity>(data.drone)
  const [pushSeries, setPushSeries] = useState<DroneBrandEntity>(data.drone.droneBrand)
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(isEdit ? false : true)

  const checkDronerLicense = data.file?.filter((x) => x.category == 'DRONER_LICENSE')
  const checkDroneLicense = data.file?.filter((x) => x.category == 'DRONE_LICENSE')
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>(false)
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>(false)

  const [createLicenseDroner, setCreateLicenseDroner] = useState<UploadImageEntity>()
  const [createLicenseDrone, setCreateLicenseDrone] = useState<UploadImageEntity>()
  const [moreReason, setMoreReason] = useState<any>('')

  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneList(res.data)
    })
  }
  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500, droneBrandId).then((res) => {
      setSeriesDrone(res.data)
      setSearchSeriesDrone(res.data)
    })
  }
  const fetchImg = async () => {
    if (checkDronerLicense?.length > 0) {
      if (checkDronerLicense[0].path == '') {
        let src = checkDronerLicense[0].file
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(src)
          reader.onload = () => resolve(reader.result)
        })
        setImgLicenseDroner(src)
      } else {
        await UploadImageDatasouce.getImage(checkDronerLicense[0].path).then((resImg) => {
          setImgLicenseDroner(resImg.url)
        })
      }
    }
    if (checkDroneLicense?.length > 0) {
      if (checkDroneLicense[0].path == '') {
        let src = checkDroneLicense[0].file
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(src)
          reader.onload = () => resolve(reader.result)
        })
        setImgLicenseDrone(src)
      } else {
        await UploadImageDatasouce.getImage(checkDroneLicense[0].path).then((resImg) => {
          setImgLicenseDrone(resImg.url)
        })
      }
    }
  }

  useEffect(() => {
    fetchDrone()
    fetchDroneSeries()
    fetchImg()
  }, [droneBrandId])

  const handleBrand = (brand: string) => {
    setDroneBrandId(brand)
    const filterSeries = seriesDrone?.filter((x) => x.droneBrandId == brand)
    const m = Map(pushDrone).set('droneBrandId', brand)
    setPushDrone({
      ...m.toJS(),
    })
    setSearchSeriesDrone(filterSeries)
    setDataDrone((prev) => ({
      ...prev,
      droneId: '',
    }))
    form.setFieldsValue({
      series: '',
    })
    setBtnSaveDisable(true)
    checkValidate(dataDrone, m.toJS(), pushSeries, imgLicenseDrone)
  }
  const handleSeries = (id: string) => {
    const getSeries = seriesDrone?.filter((x) => x.id == id)[0]
    const m = Map(dataDrone).set('droneId', id)
    const n = Map(pushSeries).set('id', id)
    const o = Map(n.toJS()).set('name', getSeries?.droneBrand.name)
    const p = Map(o.toJS()).set('logoImagePath', getSeries?.droneBrand.logoImagePath)
    const pushDroneSeries = Map(pushDrone).set('droneBrand', p.toJS())
    setPushDrone(pushDroneSeries.toJS())
    setPushSeries(p.toJS())
    setDataDrone(m.toJS())
    checkValidate(m.toJS(), pushDroneSeries.toJS(), p.toJS(), imgLicenseDrone)
  }
  const handleSerialNo = (e: any) => {
    const m = Map(dataDrone).set('serialNo', e.target.value)
    setDataDrone(m.toJS())
    checkValidate(m.toJS(), pushDrone, pushSeries, imgLicenseDrone)
  }
  const handleYear = (e: any) => {
    const m = Map(dataDrone).set('purchaseYear', e.target.value)
    setDataDrone(m.toJS())
    checkValidate(m.toJS(), pushDrone, pushSeries, imgLicenseDrone)
  }
  const handleMonth = (e: any) => {
    const m = Map(dataDrone).set('purchaseMonth', e)
    setDataDrone(m.toJS())
    checkValidate(m.toJS(), pushDrone, pushSeries, imgLicenseDrone)
  }
  const handleChangeStatus = (e: any) => {
    const status = e.target.value
    const m = Map(dataDrone).set('status', status)
    if (status == 'REJECTED' || status == 'INACTIVE') {
      setBtnSaveDisable(true)
    } else {
      checkValidate(m.toJS(), pushDrone, pushSeries, imgLicenseDrone)
    }
    const n = Map(m.toJS()).set('reason', [])
    REASON_IS_CHECK.map((reason) => _.set(reason, 'isChecked', false))
    setDataDrone(n.toJS())
  }
  const handleCheckBoxReason = (e: any) => {
    const checked = e.target.checked
    const value = e.target.value
    REASON_IS_CHECK.map((item) =>
      _.set(item, 'isChecked', value === item.reason ? checked : item.isChecked),
    )
    let p
    if (checked) {
      p = Map(dataDrone).set(
        'reason',
        [...(dataDrone.reason == null ? [''] : dataDrone.reason), value].filter((x) => x != ''),
      )
    } else {
      const removeReason = dataDrone.reason.filter((x) => x != value)
      p = Map(dataDrone).set('reason', removeReason)
    }
    setDataDrone(p.toJS())
    checkValidateReason(p.toJS())
  }
  const handleMoreReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setBtnSaveDisable(dataDrone.reason != null ? false : value.trim().length != 0 ? false : true)
    checkValidateReason(dataDrone, value)
    setMoreReason(value)
  }

  //#region Image
  const onChangeLicenseDroner = async (file: any) => {
    let src = file.target.files[0]
    src = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(src)
      reader.onload = () => resolve(reader.result)
    })
    setImgLicenseDroner(src)
    const d = Map(createLicenseDroner).set('file', file.target.files[0])
    const e = Map(d.toJS()).set('resource', 'DRONER_DRONE')
    const f = Map(e.toJS()).set('category', 'DRONER_LICENSE')
    const g = Map(f.toJS()).set('path', '')
    setCreateLicenseDroner(g.toJS())
    const pushImg = Map(dataDrone).set('file', [
      ...dataDrone.file.filter((x) => x.file != ''),
      g.toJS(),
    ])
    setDataDrone(pushImg.toJS())
    checkValidate(pushImg.toJS(), pushDrone, pushSeries, createLicenseDrone)
  }
  const previewLicenseDroner = async () => {
    let src = imgLicenseDroner
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgLicenseDroner)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const removeLicenseDroner = async () => {
    const removeImg = dataDrone.file?.filter((x) => x.category != 'DRONER_LICENSE')[0]
    const findDroner = dataDrone.file?.find((el) => {
      return el.category == 'DRONER_LICENSE'
    })
    if (findDroner) {
      await UploadImageDatasouce.deleteImage(findDroner?.id, findDroner?.path)
    }
    const d = Map(dataDrone).set('file', removeImg == undefined ? [] : [removeImg])
    setDataDrone(d.toJS())
    setImgLicenseDroner(false)
    checkValidate(dataDrone, pushDrone, pushSeries, createLicenseDrone)
  }
  const onChangeLicenseDrone = async (file: any) => {
    let src = file.target.files[0]
    src = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(src)
      reader.onload = () => resolve(reader.result)
    })
    setImgLicenseDrone(src)
    checkValidate(data)
    const d = Map(createLicenseDrone).set('file', file.target.files[0])
    const e = Map(d.toJS()).set('resource', 'DRONER_DRONE')
    const f = Map(e.toJS()).set('category', 'DRONE_LICENSE')
    const g = Map(f.toJS()).set('path', '')
    setCreateLicenseDrone(g.toJS())
    const pushImg = Map(dataDrone).set('file', [
      ...dataDrone.file.filter((x) => x.file != ''),
      g.toJS(),
    ])
    setDataDrone(pushImg.toJS())
    checkValidate(pushImg.toJS(), pushDrone, pushSeries, g.toJS())
  }
  const previewLicenseDrone = async () => {
    let src = imgLicenseDrone
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(imgLicenseDrone)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const removeLicenseDrone = async () => {
    const removeImg = dataDrone.file?.filter((x) => x.category != 'DRONE_LICENSE')[0]
    const findDrone = dataDrone.file?.find((el) => {
      return el.category == 'DRONE_LICENSE'
    })
    if (findDrone) {
      await UploadImageDatasouce.deleteImage(findDrone?.id, findDrone?.path)
    }
    const d = Map(dataDrone).set('file', removeImg == undefined ? [] : [removeImg])

    setDataDrone(d.toJS())
    setImgLicenseDrone(false)
    setCreateLicenseDrone(undefined)
    checkValidate(dataDrone, pushDrone, pushSeries, false)
  }
  //#endregion

  const handleCallBack = async () => {
    const pushReasonChecked = []
    if (dataDrone.status == 'REJECTED') {
      const reasonChecked = REASON_IS_CHECK.filter((x) => x.isChecked).map((y) => y.reason)
      for (let i: number = 0; reasonChecked.length > i; i++) {
        await pushReasonChecked.push(reasonChecked[i])
      }
      pushReasonChecked.push(moreReason)
    } else if (dataDrone.status == 'INACTIVE') {
      pushReasonChecked.push(moreReason)
    }
    const pushReason = Map(dataDrone).set('reason', pushReasonChecked)
    const m = Map(pushReason.toJS()).set('modalDroneIndex', editIndex)
    const n = Map(m.toJS()).set('drone', pushDrone)
    callBack(n.toJS())
  }

  const checkValidate = (
    main: DronerDroneEntity,
    drone?: DroneEntity,
    serise?: DroneBrandEntity,
    img?: any,
  ) => {
    const checkEmptyMain = ![main.droneId, main.status, serise?.name].includes('')
    setBtnSaveDisable(checkEmptyMain ? false : true)
  }
  const checkValidateReason = (data: DronerDroneEntity, moreReason?: string) => {
    const checkEmptyMoreReason = [moreReason].includes('')
    setBtnSaveDisable(checkEmptyMoreReason)
  }
  const debouncedHandleCallBack = _.debounce(handleCallBack, 300)
  return (
    <>
      <Modal
        key={dataDrone.id}
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
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={debouncedHandleCallBack}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form key={data.droneId} form={form}>
          <div className='form-group'>
            <label>
              ยี่ห้อโดรนที่ฉีดพ่น <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='droneBrand'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกยี่ห้อโดรนที่ฉีดพ่น',
                },
              ]}
            >
              <Select
                placeholder='เลือกยี่ห้อโดรน'
                allowClear
                onChange={handleBrand}
                defaultValue={
                  dataDrone.drone.droneBrandId ? dataDrone.drone.droneBrandId : undefined
                }
              >
                {droneList?.map((item: any) => <Option value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>
              รุ่น <span style={{ color: 'red' }}>*</span>
            </label>
            <Form.Item
              name='series'
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกรุ่นโดรน',
                },
              ]}
            >
              <Select
                placeholder='เลือกรุ่น'
                allowClear
                defaultValue={dataDrone.droneId ? dataDrone.droneId : undefined}
                onChange={handleSeries}
              >
                {searchSeriesDrone?.map((item: any, index: any) => (
                  <option key={index} value={item.id}>
                    {item.series}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='form-group '>
            <label>เลขตัวถังโดรน</label>
            <Form.Item>
              <Input
                onChange={handleSerialNo}
                placeholder='กรอกเลขตัวถังโดรน'
                defaultValue={dataDrone.serialNo}
                autoComplete='off'
              />
            </Form.Item>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6'>
              <label>ปีที่ซื้อ</label>
              <Form.Item name='purchaseYear'>
                <Input
                  placeholder='กรอกปี พ.ศ. ที่ซื้อ'
                  onChange={handleYear}
                  defaultValue={dataDrone.purchaseYear}
                  autoComplete='off'
                />
              </Form.Item>
            </div>
            <div className='form-group col-lg-6'>
              <label>เดือนที่ซื้อ</label>
              <Form.Item name='purchaseMonth'>
                <Select
                  className='col-lg-6'
                  placeholder='เลือกเดือน'
                  onChange={handleMonth}
                  defaultValue={dataDrone.purchaseMonth ? dataDrone.purchaseMonth : undefined}
                >
                  {MONTH_SALE.map((item) => (
                    <Option value={item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-lg-6 pb-5'>
              <label>ใบอนุญาตนักบิน</label>
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className='pb-2'>
                <div
                  className='hiddenFileInput'
                  style={{
                    backgroundImage: `url(${imgLicenseDroner})`,
                    display: imgLicenseDroner != false ? 'block' : 'none',
                  }}
                ></div>
              </div>
              <div className='text-left ps-4'>
                {imgLicenseDroner != false && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDroner}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDroner}
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
                  display: imgLicenseDroner == false ? 'block' : 'none',
                }}
              >
                <input
                  key={imgLicenseDroner}
                  type='file'
                  onChange={onChangeLicenseDroner}
                  title='เลือกรูป'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group'>
              <label>ใบอนุญาตโดรนจาก กสทช.</label>
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className='pb-2'>
                <div
                  className='hiddenFileInput'
                  style={{
                    backgroundImage: `url(${imgLicenseDrone})`,
                    display: imgLicenseDrone != false ? 'block' : 'none',
                  }}
                ></div>
              </div>
              <div className='text-left ps-4'>
                {imgLicenseDrone != false && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDrone}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={() => {
                        removeLicenseDrone()
                      }}
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
                  display: imgLicenseDrone == false ? 'block' : 'none',
                }}
              >
                <input
                  required
                  key={imgLicenseDrone}
                  type='file'
                  onChange={onChangeLicenseDrone}
                  title='เลือกรูป'
                />
              </div>
            </div>
          </div>

          <br />
          <div className='form-group col-lg-12'>
            <label>หมายเหตุ</label>
            <TextArea
              value={dataDrone.comment}
              placeholder='กรอกหมายเหตุ'
              onChange={(e) => {
                setDataDrone((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }}
            />
          </div>
          <br />

          <div className='row'>
            <div className='form-group'>
              <label style={{ marginBottom: '10px' }}>
                สถานะ <span style={{ color: 'red' }}>*</span>
              </label>
              <Form.Item
                name='status'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกสถานะ!',
                  },
                ]}
              >
                <Radio.Group defaultValue={dataDrone.status} onChange={handleChangeStatus}>
                  <Space direction='vertical'>
                    {DRONE_STATUS.filter((x) => x.value != '').map((item, index) => (
                      <Radio value={item.value}>
                        {item.name}
                        {dataDrone.status == 'REJECTED' && index == 2 ? (
                          <div className='form-group ps-3'>
                            {REASON_IS_CHECK.map((reason) =>
                              _.set(
                                reason,
                                'isChecked',
                                dataDrone?.reason.map((x) => x).find((y) => y === reason.reason)
                                  ? true
                                  : reason.isChecked,
                              ),
                            ).map((x) => (
                              <>
                                <input
                                  key={x.key}
                                  type='checkbox'
                                  value={x.reason}
                                  onChange={handleCheckBoxReason}
                                  checked={x.isChecked}
                                />{' '}
                                <label>{x.reason}</label>
                                <br />
                              </>
                            ))}
                            <TextArea
                              className='col-lg-12'
                              rows={3}
                              placeholder='กรอกเหตุผล/เหตุหมายเพิ่มเติม'
                              autoComplete='off'
                              onChange={handleMoreReason}
                              defaultValue={dataDrone.reason.filter(
                                (a) => !REASON_IS_CHECK.some((x) => x.reason === a),
                              )}
                            />
                          </div>
                        ) : dataDrone.status == 'INACTIVE' && index == 3 ? (
                          <div>
                            <div className='form-group ps-3'>
                              <TextArea
                                className='col-lg-12'
                                rows={3}
                                placeholder='กรอกเหตุผล/เหตุหมายเพิ่มเติม'
                                autoComplete='off'
                                onChange={handleMoreReason}
                                defaultValue={dataDrone.reason.filter(
                                  (a) => !REASON_IS_CHECK.some((x) => x.reason === a),
                                )}
                              />{' '}
                            </div>
                          </div>
                        ) : null}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default ModalDrone
