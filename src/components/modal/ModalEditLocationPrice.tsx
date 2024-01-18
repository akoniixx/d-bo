/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Radio, Table } from 'antd'
import FooterPage from '../footer/FooterPage'
import { AllLocatePriceEntity, UpdateLocationPriceList } from '../../entities/LocationPrice'
import { LocationPriceDatasource } from '../../datasource/LocationPriceDatasource'
import { SearchOutlined } from '@ant-design/icons'
import { color } from '../../resource'
import SwitchButton from '../button/SwitchButton'
import { useLocalStorage } from '../../hook/useLocalStorage'

const _ = require('lodash')
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
  const [locationPrice, setLocationPrice] = useState<UpdateLocationPriceList[]>(editIndex)
  const [getSearch, setGetSearch] = useState<AllLocatePriceEntity[]>()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [selectPrice, setSelectPrice] = useState<any>('equal')
  const [type, setType] = useState<any>('SPRAY')
  const [equalPrice, setEqualPrice] = useState<number>()
  const [profile] = useLocalStorage('profile', [])

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
      callBack(locationPrice)
    }
  }
  const onChangeType = (e: any) => {
    setType(e.target.value)
  }

  const handleEqualPrice = (e: any) => {
    setEqualPrice(e.target.value)
  }
  const renderPriceColumn = (value: any, row: any, index: number) => {
    const handleItemClick = (indexData: number, newItem: number | null) => {
      const newItems = [...locationPrice]
      const dataChange: UpdateLocationPriceList[] = []
      const price_id = Map(dataChange).set('location_price_id', row.id)
      let price: any
      if (type === 'SPRAY') {
        price = Map(price_id.toJS()).set('price', newItem || 0)
      } else {
        price = Map(price_id.toJS()).set('priceSow', newItem || 0)
      }

      newItems[indexData] = price.toJS()
      setLocationPrice(newItems)
      setBtnSaveDisable(!newItem)
    }

    const inputNumberProps = {
      key: type === 'SOW' ? row.price_sow : row.price,
      style: {
        width: 200,
        color: (type === 'SOW' ? row.price_sow : row.price) === null ? 'grey' : 'black',
      },
      defaultValue:
        (type === 'SOW' ? row.price_sow : row.price) !== null
          ? type === 'SOW'
            ? row.price_sow
            : row.price
          : 'ยังไม่มีข้อมูล',
      step: '0.01',
      onChange: (event: number | null) => handleItemClick(index, event),
      stringMode: true,
      addonAfter: 'บาท',
    }

    return {
      children: <InputNumber {...inputNumberProps} />,
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
      dataIndex: 'prices',
      key: 'prices',
      width: '50%',
      render: renderPriceColumn,
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
              defaultValue={'equal'}
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
                    dataSource={data.plants}
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
