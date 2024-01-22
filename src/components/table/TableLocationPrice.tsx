import React, { useEffect, useState } from 'react'
import { color } from '../../resource'
import { Button, Form, Input, InputNumber, Select, Table } from 'antd'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import {
  ProvinceEntity,
  ProvinceEntity_INIT,
  ProvincePriceEntity,
  ProvincePriceEntity_INIT,
} from '../../entities/LocationEntities'
import ModalSearchProvince from '../modal/ModalSearchProvince'

interface TableLocationPriceProps {
  price: number
}
export const TableLocationPrice: React.FC<TableLocationPriceProps> = ({ price }) => {
  const [searchProvince, setSearchProvince] = useState<ProvinceEntity[]>()
  const [searchText, setSearchText] = useState<ProvincePriceEntity[]>()
  const [checkSearch, setCheckSearch] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [equalProvince, setEqualProvince] = useState<ProvincePriceEntity[]>([
    ProvincePriceEntity_INIT,
  ])

  useEffect(() => {
    fetchProvince()
  }, [])

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setSearchProvince(res)
      const arrayOfObjectsWithPrice = res.map((obj: ProvinceEntity) => ({
        ...obj,
        price: price,
      }))
      setEqualProvince(arrayOfObjectsWithPrice)
    })
  }
  const handleOnPrice = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }

    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setEqualProvince((prev:any) =>
      prev.map((item:any, i:any) =>
        i === index
          ? {
              ...item,
              price: convertedNumber,
            }
          : item,
      ),
    )
  }

  const handleSearchProvince = (provinceId: any) => {
    if (provinceId) {
      const findProvince = equalProvince.find((i) => i.provinceId === Number(provinceId))
      setSearchText([findProvince!])
    } else {
      fetchProvince()
      setSearchText(undefined)
      setCheckSearch(false)
    }
  }
  const updatePriceTable = (updatedPrices: ProvincePriceEntity[]) => {
    updatedPrices.forEach((updatedProvince) => {
      const matchingIndex = equalProvince.findIndex(
        (equalProvince) => equalProvince.provinceId === updatedProvince.provinceId,
      )

      if (matchingIndex !== -1) {
        equalProvince[matchingIndex].price = updatedProvince.price
      }
    })
  }
  const columns = [
    {
      title: 'ชื่อจังหวัด',
      dataIndex: 'provinceName',
      key: 'provinceName',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{value}</>,
        }
      },
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
      width: '30%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Input
              placeholder='ยังไม่ได้กรอกข้อมูล'
              value={value}
              suffix='บาท'
              autoComplete='off'
              onChange={handleOnPrice(index)}
            />
          ),
        }
      },
    },
  ]

  return (
    <>
      <div className='d-flex pb-3'>
        <div className='col-lg-4 me-2'>
          <Select
            allowClear
            className='col-lg-12'
            placeholder='ค้นหาชื่อจังหวัด'
            onChange={handleSearchProvince}
            showSearch
            optionFilterProp='children'
          >
            {searchProvince?.map((item) => (
              <option key={item.provinceId} value={item.provinceId.toString()}>
                {item.provinceName}
              </option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              if (searchText) {
                fetchProvince()
                setCheckSearch(true)
              }
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
        <div className='col-lg' style={{ textAlign: 'end' }}>
          <Button
            style={{
              borderColor: 'rgba(33, 150, 83, 0.1)',
              borderRadius: '5px',
              color: color.Success,
              backgroundColor: 'rgba(33, 150, 83, 0.1)',
              fontWeight: '600',
            }}
            onClick={() => {
              setShowModal((prev) => !prev)
            }}
          >
            ระบุบางจังหวัด
          </Button>
        </div>
      </div>
      {/* {searchText && checkSearch ? (
        <Table
          style={{ borderWidth: 0.2, borderStyle: 'solid', borderColor: color.Disable }}
          columns={columns}
          dataSource={searchText}
          scroll={{ y: 260 }}
          pagination={false}
        />
      ) : ( */}
        <Table
          style={{ borderWidth: 0.2, borderStyle: 'solid', borderColor: color.Disable }}
          columns={columns}
          dataSource={equalProvince}
          scroll={{ y: 260 }}
          pagination={false}
        />
      {/* )} */}

      <ModalSearchProvince
        show={showModal}
        backButton={() => setShowModal((prev) => !prev)}
        title={'ระบุบางจังหวัด'}
        callBack={updatePriceTable}
        data={ProvincePriceEntity_INIT}
      />
    </>
  )
}
