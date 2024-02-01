import React, { useEffect, useState } from 'react'
import { color } from '../../resource'
import { Button, Input, Select, Spin, Table } from 'antd'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import {
  ProvinceEntity,
  ProvincePriceEntity,
  ProvincePriceEntity_INIT,
} from '../../entities/LocationEntities'
import ModalSearchProvince from '../modal/ModalSearchProvince'

interface TableLocationPriceProps {
  callBack: (data: ProvincePriceEntity[]) => void
  data: any
}
export const TableLocationPrice: React.FC<TableLocationPriceProps> = ({ callBack, data }) => {
  const [searchProvince, setSearchProvince] = useState<ProvinceEntity[]>()
  const [searchText, setSearchText] = useState<ProvincePriceEntity[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [equalProvince, setEqualProvince] = useState<ProvincePriceEntity[]>([data])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (data?.id !== '') {
      setEqualProvince(data)
    } else {
      fetchProvince()
    }
  }, [data])

  useEffect(() => {
    callBack(equalProvince)
  }, [equalProvince])

  useEffect(() => {
    fetchProvinceInSearch()
  }, [])

  const fetchProvinceInSearch = async () => {
    setLoading(true)
    await LocationDatasource.getProvince()
      .then((res) => {
        setSearchProvince(res)
      })
      .finally(() => setLoading(false))
  }
  const fetchProvince = async () => {
    setLoading(true)
    await LocationDatasource.getProvince()
      .then((res) => {
        const arrayOfObjectsWithPrice = res.map((obj: ProvinceEntity) => ({
          ...obj,
          price: null,
        }))
        setEqualProvince(arrayOfObjectsWithPrice)
      })
      .finally(() => setLoading(false))
  }
  const handleOnPrice = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setEqualProvince((prev: any) =>
      prev.map((item: any, i: any) =>
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
    if (!provinceId) {
      const updatedData = data.map((existingItem: any) => {
        const matchingNewItem = equalProvince.find(
          (newItem) => newItem.provinceId === existingItem.provinceId,
        )
        if (matchingNewItem) {
          return { ...existingItem, ...matchingNewItem }
        }
        return existingItem
      })

      setEqualProvince(updatedData)
      setSearchText(undefined)
    } else {
      const findProvince = equalProvince.find((i) => i.provinceId === Number(provinceId))
      setSearchText([findProvince!])
    }
  }

  const searchUpdatePrice = (data: any) => {
    setEqualProvince(data)
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
        row
        return {
          children: <>{value || row.province?.provinceName}</>,
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
                searchUpdatePrice(searchText)
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
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          style={{ borderWidth: 0.2, borderStyle: 'solid', borderColor: color.Disable }}
          columns={columns}
          dataSource={equalProvince}
          scroll={{ y: 260 }}
          pagination={false}
        />
      </Spin>

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
