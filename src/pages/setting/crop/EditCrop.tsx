import { Button, Checkbox, Col, Form, Input, Radio, Row, Space, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import color from '../../../resource/color'
import { DeleteOutlined } from '@ant-design/icons'
import FooterPage from '../../../components/footer/FooterPage'
import { PurposeCropEntities, PurposeCropEntities_INIT } from '../../../entities/CropEntities'
import ActionButton from '../../../components/button/ActionButton'
import { CropDatasource } from '../../../datasource/CropDatasource'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import Swal from 'sweetalert2'
import { TableLocationPrice } from '../../../components/table/TableLocationPrice'
import { LocationPriceEntity } from '../../../entities/LocationPrice'
import ModalDelete from '../../../components/modal/ModalDelete'

const _ = require('lodash')

function EditCrop() {
  const navigate = useNavigate()
  const queryString = _.split(window.location.pathname, '=')
  const cropId = queryString[1]
  const [form] = Form.useForm()
  const [formTable] = Form.useForm()
  const [count, setCount] = useState(1)
  const [provinceId, setProvinceId] = useState<any>()
  const [dataSubPurpose, setDataSubPurpose] = useState<PurposeCropEntities[]>([
    PurposeCropEntities_INIT,
  ])
  const [type, setType] = useState<boolean>(false)
  const [price, setPrice] = useState<any>()
  const [locationPrice, setLocationPrice] = useState<LocationPriceEntity[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [purposeSprayId, setPurposeSprayId] = useState<any>()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [dataFromTable, setDataFromTable] = useState<any>()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false)
  const [checkPrice, setCheckPrice] = useState<boolean>(true)
  const [deleteId, setDeleteId] = useState<any>()

  useEffect(() => {
    const getProvinceId = () => {
      LocationDatasource.getProvince()
        .then((res) => {
          if (res && Array.isArray(res)) {
            const provinceIds = res.map((province) => province.provinceId)
            setProvinceId(provinceIds)
          }
        })
        .catch((error) => {
          console.error('Error fetching province data:', error)
        })
    }

    getProvinceId()
  }, [])
  useEffect(() => {
    fetchCropById()
  }, [])

  const fetchCropById = () => {
    setLoading(true)
    CropDatasource.getCropById(cropId)
      .then((res) => {
        form.setFieldsValue({
          cropName: res.data?.cropName,
          status: res.data?.isActive,
          equal: res.equalPrice?.checkEqualPrice,
        })
        setLocationPrice(res.data?.locationPrice)
        setType(res.equalPrice?.checkEqualPrice)
        setPrice(res.equalPrice?.equalPrice)
        const mapKey = res.data?.purposeSpray
        setDataSubPurpose(mapKey)
        setPurposeSprayId(res.data?.purposeSpray)
        setCount(mapKey.length)
        mapKey?.forEach((p: any, index: number) => {
          const currentOrderPurpose = p.orderPurpose !== null ? p.orderPurpose : index + 1
          formTable.setFieldValue(`${currentOrderPurpose}_id`, p.id)
          formTable.setFieldValue(`${currentOrderPurpose}_purposeSprayName`, p.purposeSprayName)
          formTable.setFieldValue(`${currentOrderPurpose}_periodMin`, p.periodMin)
          formTable.setFieldValue(`${currentOrderPurpose}_periodMax`, p.periodMax)
          formTable.setFieldValue(`${currentOrderPurpose}_isSpray`, p.isSpray)
          formTable.setFieldValue(`${currentOrderPurpose}_isSow`, p.isSow)
        })
      })
      .finally(() => setLoading(false))
  }

  const mapCondition = (e: any) => {
    const mapList = e
    const sTable = formTable.getFieldsValue()
    const value = mapList.map((y: any, i: number) => {
      return {
        ...y,
        orderPurpose: i + 1,
        purposeSprayName: sTable[`${y.orderPurpose}_purposeSprayName`],
        periodMin: sTable[`${y.orderPurpose}_periodMin`],
        periodMax: sTable[`${y.orderPurpose}_periodMax`],
        isSpray: sTable[`${y.orderPurpose}_isSpray`],
        isSow: sTable[`${y.orderPurpose}_isSow`],
      }
    })
    return value
  }
  const mapForm = (e: any) => {
    const mapList = e
    mapList.map((y: any, i: number) => {
      formTable.setFieldValue(`${y.orderPurpose}_purposeSprayName`, y.purposeSprayName)
      formTable.setFieldValue(`${y.orderPurpose}_periodMin`, y.periodMin)
      formTable.setFieldValue(`${y.orderPurpose}_periodMax`, y.periodMax)
      formTable.setFieldValue(`${y.orderPurpose}_isSpray`, y.isSpray)
      formTable.setFieldValue(`${y.orderPurpose}_isSow`, y.isSow)
    })
  }
  const newDataPurPose =
    useMemo(() => {
      if (dataSubPurpose.length > 0) {
        return dataSubPurpose.map((el: any, index: any) => ({
          ...el,
          key: index + 1,
          orderPurpose: index + 1,
        }))
      } else {
        return []
      }
    }, [dataSubPurpose]) || []

  const addRow = () => {
    setCount(count + 1)
    const addList = mapCondition([
      ...dataSubPurpose,
      { ...PurposeCropEntities_INIT, orderPurpose: dataSubPurpose.length + 1 },
    ])
    setDataSubPurpose(addList)
  }

  const handleSuccessfulDelete = (row: any) => {
    const mapData = mapCondition(dataSubPurpose)
    const e = mapData.filter((x: any) => x.orderPurpose !== row.key)
    const mData = mapCondition(e)
    mapForm(mData)
    setDataSubPurpose(e)
    setCount(count - 1)
    formTable.setFieldValue(`${e.length + 1}_purposeSprayName`, '')
    formTable.setFieldValue(`${e.length + 1}_periodMin`, '')
    formTable.setFieldValue(`${e.length + 1}_periodMax`, '')
    formTable.setFieldValue(`${e.length + 1}_isSpray`, false)
    formTable.setFieldValue(`${e.length + 1}_isSow`, false)
    console.log(purposeSprayId)
  }
  const showDelete = (row: any) => {
    setDeleteId(row)
    setModalDelete(!modalDelete)
  }

  const updatePriceTable = (data: any) => {
    setDataFromTable(data)
    checkPriceData(data)
  }
  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const checkName = name.split('_')[1]
    const { value: inputValue } = e.target
    const justNumber = inputValue.replace(/[^0-9.]/g, '')
    if (checkName === 'periodMax' || checkName === 'periodMin') {
      formTable.setFieldsValue({ [name]: justNumber })
    }
  }
  const handleOnPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setPrice(convertedNumber)
    checkPriceData(convertedNumber)
  }
  const checkPriceData = (data: any) => {
    if (type) {
      setCheckPrice(data ? false : true)
    } else {
      for (const entry of data) {
        if (!Object.prototype.hasOwnProperty.call(entry, 'price')) {
          setCheckPrice(true)
          return
        }
      }
      setCheckPrice(false)
    }
  }
  const onFieldsChange = () => {
    const { cropName, status } = form.getFieldsValue()
    const dataSub: any = newDataPurPose
    const fs = formTable.getFieldsValue()
    const condition: any = dataSub?.map((y: any, i: number) => {
      return {
        orderPurpose: i + 1,
        purposeSprayName: fs[`${y.orderPurpose}_purposeSprayName`],
        isSpray: Boolean(fs[`${y.orderPurpose}_isSpray`]),
        isSow: Boolean(fs[`${y.orderPurpose}_isSow`]),
      }
    })
    let fieldErr: boolean = true
    let fieldNull: boolean = true
    condition.length > 0 &&
    condition.every(
      (item: any) =>
        item && item.purposeSprayName && (item.isSpray || item.isSow) && item.orderPurpose,
    )
      ? (fieldNull = false)
      : (fieldNull = true)

    if (cropName) {
      fieldErr = false
    } else {
      fieldErr = true
    }
    setBtnSaveDisable(fieldErr || fieldNull)
  }
  const insertCrop = async () => {
    const dataSub = newDataPurPose
    await form.validateFields()
    await formTable.validateFields()

    const create: any = {}
    const f = form.getFieldsValue()
    const fs = formTable.getFieldsValue()
    const condition = dataSub?.map((y: any, i: number) => {
      const id = purposeSprayId[i]?.id
      return {
        ...(id && { id }),
        purposeSprayName: fs[`${y.orderPurpose}_purposeSprayName`],
        periodMin: fs[`${y.orderPurpose}_periodMin`],
        periodMax: fs[`${y.orderPurpose}_periodMax`],
        isSpray: Boolean(fs[`${y.orderPurpose}_isSpray`]),
        isSow: Boolean(fs[`${y.orderPurpose}_isSow`]),
        orderPurpose: i + 1,
      }
    })
    create.id = cropId
    create.isActive = f.status
    create.cropName = f.cropName
    create.purposeSpray = condition
    try {
      await CropDatasource.updateCrop(create)
      if (type) {
        await CropDatasource.insertEqualPriceCrop({
          cropId: cropId,
          price: Number(price),
          updateBy: `${profile.firstname} ${profile.lastname}`,
        })
      } else {
        const locationPriceData = dataFromTable.map((item: any) => {
          return {
            id: item.id,
            provinceId: item.provinceId,
            cropId: cropId,
            cropName: f.cropName,
            price: Number(item.price),
            updateBy: `${profile.firstname} ${profile.lastname}`,
          }
        })
        await CropDatasource.insertMultiPriceCrop({ locationPriceData })
      }
      Swal.fire({
        title: 'บันทึกสำเร็จ',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate('/IndexCrop'))
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
  const columns = [
    {
      title: 'ลำดับ',
      width: '3%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{index + 1}</span>,
        }
      },
    },
    {
      title: 'ชื่อช่วงเวลา',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={`${row.orderPurpose}_purposeSprayName`}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อช่วงเวลา',
                },
              ]}
            >
              <Input placeholder='กรอกชื่อช่วงเวลา' autoComplete='off' />
            </Form.Item>
          ),
        }
      },
    },
    {
      title: 'ระยะเวลาเพาะปลูก (วัน)',
      width: '22%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Space>
              <Form.Item style={{ margin: 0 }} name={`${row.orderPurpose}_periodMin`}>
                <Input
                  style={{ textAlign: 'center' }}
                  autoComplete='off'
                  placeholder=''
                  onChange={(e) => checkNumber(e, `${row.orderPurpose}_periodMin`)}
                />
              </Form.Item>
              <strong>-</strong>
              <Form.Item style={{ margin: 0 }} name={`${row.orderPurpose}_periodMax`}>
                <Input
                  style={{ textAlign: 'center' }}
                  autoComplete='off'
                  onChange={(e) => checkNumber(e, `${row.orderPurpose}_periodMax`)}
                />
              </Form.Item>
            </Space>
          ),
        }
      },
    },
    {
      title: 'ประเภทงาน',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div>
              <Space>
                <Form.Item
                  style={{ margin: 0 }}
                  name={`${row.orderPurpose}_isSpray`}
                  valuePropName='checked'
                >
                  <Checkbox>ฉีดพ่น</Checkbox>
                </Form.Item>
                <Form.Item
                  style={{ margin: 0 }}
                  name={`${row.orderPurpose}_isSow`}
                  valuePropName='checked'
                >
                  <Checkbox value='SOW'>หว่าน</Checkbox>
                </Form.Item>
              </Space>
            </div>
          ),
        }
      },
    },
    {
      title: '',
      width: '3%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-center'>
              <div className='col-lg-4'>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={count > 1 ? color.Error : color.Grey}
                  actionDisable={count > 1 ? false : true}
                  onClick={() => showDelete(row)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
  const subPurposeSpray = (
    <div className='pt-3'>
      <Row className='pb-3'>
        <Col span={21}>
          <label>
            ช่วงเวลา
            <span style={{ color: color.Error }}>*</span>
          </label>
        </Col>
        <Col span={3}>
          <Button
            style={{
              borderColor: 'rgba(33, 150, 83, 0.1)',
              borderRadius: '5px',
              color: color.Success,
              backgroundColor: 'rgba(33, 150, 83, 0.1)',
              fontWeight: '600',
            }}
            onClick={() => addRow()}
          >
            + เพิ่มช่วงเวลา
          </Button>
        </Col>
      </Row>
      <Form form={formTable} onFieldsChange={onFieldsChange}>
        <Table columns={columns} dataSource={newDataPurPose} pagination={false} />
      </Form>
    </div>
  )
  return (
    <div className='p-2'>
      <Row className='pb-3'>
        <BackIconButton
          onClick={() => {
            navigate(-1)
          }}
        />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>แก้ไขพืช</strong>
        </span>
      </Row>

      <CardContainer>
        <CardHeader textHeader='ข้อมูลพืช' />
        <Form style={{ padding: '32px' }} form={form} onFieldsChange={onFieldsChange}>
          <label>
            ชื่อพืช <span style={{ color: color.Error }}>*</span>
          </label>
          <Form.Item
            name='cropName'
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อพืช',
              },
            ]}
          >
            <Input placeholder='กรอกชื่อพืช' autoComplete='off' />
          </Form.Item>
          <label>
            ราคา <span style={{ color: color.Error }}>*</span>
          </label>
          <Form.Item name='equal'>
            <Radio.Group onChange={(e) => setType(e.target.value)} className='d-flex flex-row'>
              <Radio value={true}>ใช้ราคาเท่ากัน</Radio>
              <Radio value={false}>กำหนดรายจังหวัด</Radio>
            </Radio.Group>
          </Form.Item>

          {type ? (
            <div className='pb-4'>
              <Input
                className='col-lg-4'
                placeholder='กรอกจำนวน'
                suffix='บาท'
                onChange={(e) => {
                  handleOnPrice(e)
                }}
                autoComplete='off'
                value={price}
              />
            </div>
          ) : (
            <TableLocationPrice data={locationPrice} callBack={updatePriceTable} />
          )}
          {subPurposeSpray}

          <label className='pt-4'>
            สถานะ<span style={{ color: color.Error }}>*</span>
          </label>
          <Form.Item name='status'>
            <Radio.Group className='d-flex flex-column'>
              <Radio value={true}>ใช้งาน</Radio>
              <Radio value={false}>ปิดการใช้งาน</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </CardContainer>
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={insertCrop}
        disableSaveBtn={saveBtnDisable || checkPrice}
      />

      <ModalDelete
        show={modalDelete}
        title1={'โปรดตรวจสอบรายชื่อช่วงเวลาที่คุณต้องการลบ '}
        title2={'ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อการจ้างงานในระบบ'}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => {
          if (deleteId.id) {
            CropDatasource.deletePurpose(deleteId.id).then((res) => {
              if (res.success) {
                Swal.fire({
                  title: 'สำเร็จ',
                  icon: 'success',
                  timer: 1500,
                  text: 'งานที่ดำเนินงาน “ยกเลิก” ถูกดำเนินการเรียบร้อยแล้ว',
                  showConfirmButton: false,
                })
                setModalDelete(!modalDelete)
                handleSuccessfulDelete(deleteId)
              } else {
                Swal.fire({
                  title: 'ไม่สามารถดำเนินรายการได้',
                  text: 'เนื่องจากข้อมูลช่วงเวลาถูกใช้งานในการสร้างงานบินแล้ว',
                  icon: 'error',
                  showConfirmButton: false,
                })
                setModalDelete(!modalDelete)
              }
            })
          } else {
            handleSuccessfulDelete(deleteId)
            setModalDelete(!modalDelete)
          }
        }}
      />
    </div>
  )
}

export default EditCrop
