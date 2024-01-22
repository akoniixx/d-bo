import { Button, Checkbox, Col, Form, Input, Radio, Row, Space, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { CardContainer } from '../../../components/card/CardContainer'
import { CardHeader } from '../../../components/header/CardHearder'
import color from '../../../resource/color'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import FooterPage from '../../../components/footer/FooterPage'
import {
  DataInsertCropEntity,
  PurposeCropEntities,
  PurposeCropEntities_INIT,
} from '../../../entities/CropEntities'
import ActionButton from '../../../components/button/ActionButton'
import { CropDatasource } from '../../../datasource/CropDatasource'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import Swal from 'sweetalert2'
import { TableLocationPrice } from '../../../components/table/TableLocationPrice'
import ModalSearchProvince from '../../../components/modal/ModalSearchProvince'

function AddCrop() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [formTable] = Form.useForm()
  const [typePrice, setTypePrice] = useState<any>('EQUAL')
  const [count, setCount] = useState(1)
  const [provinceId, setProvinceId] = useState<any>()
  const [provincePrice, setProvincePrice] = useState<any>()

  const [dataSubPurpose, setDataSubPurpose] = useState<PurposeCropEntities[]>([
    PurposeCropEntities_INIT,
  ])
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')

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
  const onFieldsChange = () => {}

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
  const newDataPurPose = useMemo(() => {
    if (dataSubPurpose.length > 0) {
      const d = dataSubPurpose.map((el: any, index: any) => {
        return {
          ...el,
          key: index + 1,
          orderPurpose: index + 1,
        }
      })
      return d
    }
  }, [dataSubPurpose])

  const addRow = () => {
    setCount(count + 1)
    const addList = mapCondition([
      ...dataSubPurpose,
      { ...PurposeCropEntities_INIT, orderPurpose: dataSubPurpose.length + 1 },
    ])
    setDataSubPurpose(addList)
  }

  const removeRow = async (key: number) => {
    const mapData = await mapCondition(dataSubPurpose)
    const e = mapData.filter((x: any) => x.orderPurpose !== key)
    const mData = await mapCondition(e)
    mapForm(mData)
    setDataSubPurpose(e)
    setCount(count - 1)
    formTable.setFieldValue(`${e.length + 1}_purposeSprayName`, '')
    formTable.setFieldValue(`${e.length + 1}_periodMin`, '')
    formTable.setFieldValue(`${e.length + 1}_periodMax`, '')
    formTable.setFieldValue(`${e.length + 1}_periodMax`, '')
    formTable.setFieldValue(`${e.length + 1}_isSpray`, false)
    formTable.setFieldValue(`${e.length + 1}_isSow`, false)
  }

  const insertCrop = async () => {
    const dataSub = newDataPurPose
    await form.validateFields()
    await formTable.validateFields()

    const create: any = {}
    const f = form.getFieldsValue()
    const fs = formTable.getFieldsValue()
    const condition = dataSub?.map((y: any, i: number) => {
      return {
        purposeSprayName: fs[`${y.orderPurpose}_purposeSprayName`],
        periodMin: fs[`${y.orderPurpose}_periodMin`],
        periodMax: fs[`${y.orderPurpose}_periodMax`],
        isSpray: Boolean(fs[`${y.orderPurpose}_isSpray`]),
        isSow: Boolean(fs[`${y.orderPurpose}_isSow`]),
        orderPurpose: i + 1,
      }
    })

    create.cropName = f.cropName
    create.purposeSpray = condition
    try {
      const res: DataInsertCropEntity = await CropDatasource.insertCrop(create)
      if (res) {
        const locationPriceData = provinceId.map((province: any) => {
          return {
            provinceId: province,
            cropId: res.id,
            cropName: res.cropName,
            price: Number(f.price),
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
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
              <strong>-</strong>
              <Form.Item style={{ margin: 0 }} name={`${row.orderPurpose}_periodMax`}>
                <Input style={{ textAlign: 'center' }} />
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
                  onClick={() => removeRow(row.orderPurpose)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
  const subPurposeSpray = (
    <div className='pt-3  '>
      <Row className='pb-3 pt-3'>
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
        <Table
          style={{ borderWidth: 0.2, borderStyle: 'solid', borderColor: color.Disable }}
          columns={columns}
          dataSource={newDataPurPose}
          pagination={false}
        />
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
          <strong style={{ fontSize: '20px' }}>เพิ่มพืช</strong>
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
          <Radio.Group
            className='d-flex flex-row pb-3'
            defaultValue={typePrice}
            onChange={(e) => setTypePrice(e.target.value)}
          >
            <Radio value={'EQUAL'}>ใช้ราคาเท่ากัน</Radio>
            <Radio value={'CUSTOM'}>กำหนดรายจังหวัด</Radio>
          </Radio.Group>
          {typePrice === 'EQUAL' ? (
            <Form.Item
              className='col-lg-3'
              name='price'
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกจำนวน',
                },
              ]}
            >
              <Input placeholder='กรอกจำนวน' autoComplete='off' suffix='บาท' />
            </Form.Item>
          ) : (
            <TableLocationPrice price={provincePrice} />
          )}

          {subPurposeSpray}
        </Form>
      </CardContainer>
      <FooterPage onClickBack={() => navigate(-1)} onClickSave={insertCrop} />
    </div>
  )
}

export default AddCrop
