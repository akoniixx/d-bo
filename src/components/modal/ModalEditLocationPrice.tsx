/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Radio, Table } from 'antd'
import FooterPage from '../footer/FooterPage'
import { AllLocatePriceEntity, UpdateLocationPriceList } from '../../entities/LocationPrice'
import { LocationPriceDatasource } from '../../datasource/LocationPriceDatasource'
import { SearchOutlined } from '@ant-design/icons'
import { color } from '../../resource'
import SwitchButton from '../button/SwitchButton'
import { useLocalStorage } from '../../hook/useLocalStorage'

const { Map } = require('immutable')
interface ModalLocationPriceProps {
  show: boolean
  backButton: () => void
  callBack: (data: UpdateLocationPriceList[]) => void
  data: any
  editIndex: any
  isEditModal?: boolean
}
const ModalEditLocationPrice: React.FC<ModalLocationPriceProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  isEditModal = false,
}) => {
  const [form] = Form.useForm()
  const [defaultData, setDefaultData] = useState<AllLocatePriceEntity>(data)
  const [locationPrice, setLocationPrice] = useState<UpdateLocationPriceList[]>(editIndex)
  const [getSearch, setGetSearch] = useState<AllLocatePriceEntity[]>()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [selectPrice, setSelectPrice] = useState<any>()
  const [type, setType] = useState<any>('SPRAY')
  const [equalPrice, setEqualPrice] = useState<number>()
  const [profile] = useLocalStorage('profile', [])

  useEffect(() => {
    const arePricesEqual = data?.min_price === data?.max_price
    const areSowPricesEqual = data?.min_price_sow === data?.max_price_sow

    if (arePricesEqual || areSowPricesEqual) {
      setSelectPrice('equal')
    } else {
      setSelectPrice('customize')
    }
  }, [data])

  const searchPlants = async () => {
    await LocationPriceDatasource.getPrice(data.province_name, searchText).then((res) => {
      if (searchText.length > 0) {
        setGetSearch(res.data)
      } else {
        setGetSearch(undefined)
      }
    })
  }
  const changeTextSearch = (search: any) => {
    setSearchText(search.target.value)
  }

  const handelCallBack = async () => {
    if (selectPrice === 'equal') {
      const equalData: any = {}
      equalData.provinceId = data?.province_id
      if (type === 'SOW') {
        equalData.priceSow = equalPrice
      } else if (type === 'SPRAY') {
        equalData.price = equalPrice
      }
      equalData.updateBy = `${profile.firstname} ${profile.lastname}`
      callBack(equalData)
    } else {
      const transformedData = locationPrice.map((location: any) => ({
        location_price_id: location.id,
        price: location.price,
        priceSow: location.price_sow,
      }))

      callBack(transformedData)
    }
  }

  const onChangeType = (e: any) => {
    setType(e.target.value)
  }

  const handleEqualPrice = (e: any) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    if (type === 'SPRAY') {
      setDefaultData((prev) => ({
        ...prev,
        min_price: convertedNumber,
        max_price: convertedNumber,
      }))
      setEqualPrice(convertedNumber)
    } else {
      setDefaultData((prev) => ({
        ...prev,
        min_price_sow: convertedNumber,
        max_price_sow: convertedNumber,
      }))
      setEqualPrice(convertedNumber)
    }
  }
  const onChancePrice = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    if (type === 'SPRAY') {
      setLocationPrice((prev: any) =>
        prev.map((item: any, i: any) =>
          i === index
            ? {
                ...item,
                price: convertedNumber,
              }
            : item,
        ),
      )
    } else {
      setLocationPrice((prev: any) =>
        prev.map((item: any, i: any) =>
          i === index
            ? {
                ...item,
                price_sow: convertedNumber,
              }
            : item,
        ),
      )
    }
  }
  const columns = [
    {
      title: 'ชื่อพืช',
      dataIndex: 'plant_name',
      key: 'plant_name',
      width: '50%',
      render: (value: any, row: any, index: any) => {
        return {
          children: <>{row.plant_name}</>,
        }
      },
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
      width: '50%',
      render: (value: any, row: any, index: any) => {
        return {
          children: (
            <Input
              value={type === 'SPRAY' ? value : row.price_sow}
              placeholder='กรอกราคา'
              suffix='บาท'
              onChange={onChancePrice(index)}
              autoComplete='off'
            />
          ),
        }
      },
    },
  ]

  return (
    <>
      <Modal
        key={data}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
          >
            {`แก้ไขราคา : จังหวัด${data.province_name}`}
          </div>
        }
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => form.submit()}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form key={data.plants} form={form} onFinish={handelCallBack}>
          <div className='row col-lg-12 pb-3'>
            <span style={{ color: color.Grey }}>
              โปรดตรวจสอบราคาการฉีดพ่นก่อนที่จะกดบันทึกเสมอ เพราะอาจจะทำให้ราคาฉีดพ่น ของอำเภอ
              และตำบลทั้งหมดเปลี่ยนแปลงตาม อาจจะส่งผลต่อการจ้างงานในระบบ
            </span>
            <div className='pt-3'>
              <SwitchButton label1={type} label2={type} onClick={onChangeType} />
            </div>
            <label className='pt-2'>
              ราคา<span style={{ color: color.Error }}>*</span>
            </label>
            <Radio.Group
              name='radiogroup'
              value={selectPrice}
              onChange={(e) => setSelectPrice(e.target.value)}
            >
              <Radio value='equal'>ใช้ราคาเท่ากัน</Radio>
              <Radio value='customize'>กำหนดรายพืช</Radio>
            </Radio.Group>
            {selectPrice === 'equal' ? (
              <div className='pt-3'>
                <Input
                  placeholder='กรอกราคา'
                  suffix='บาท'
                  onChange={(e) => handleEqualPrice(e)}
                  autoComplete='off'
                  value={
                    type === 'SPRAY'
                      ? defaultData.max_price === defaultData.min_price
                        ? defaultData.max_price
                        : undefined
                      : type === 'SOW'
                      ? defaultData.max_price_sow === defaultData.min_price_sow
                        ? defaultData.max_price_sow
                        : undefined
                      : undefined
                  }
                />
              </div>
            ) : (
              <>
                <div className='col-lg-10 pt-3'>
                  <Input
                    allowClear
                    prefix={<SearchOutlined style={{ color: color.Disable }} />}
                    placeholder='ค้นหาชื่อพืช'
                    onChange={changeTextSearch}
                  />
                </div>
                <div className='col-lg-2 pt-3 pb-4'>
                  <Button
                    style={{
                      borderColor: color.Success,
                      borderRadius: '5px',
                      color: color.secondary2,
                      backgroundColor: color.Success,
                      padding: 6,
                      paddingTop: 4,
                    }}
                    onClick={searchPlants}
                  >
                    ค้นหาข้อมูล
                  </Button>
                </div>
                {getSearch ? (
                  <Table
                    dataSource={getSearch?.map((x) => x.plants)[0]}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 0, y: 300 }}
                  />
                ) : (
                  <Table
                    dataSource={locationPrice}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 0, y: 300 }}
                  />
                )}
              </>
            )}
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ModalEditLocationPrice
