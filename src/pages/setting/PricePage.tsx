import { CaretDownOutlined, CaretUpOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Pagination, PaginationProps, Spin, Table } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import ActionButton from '../../components/button/ActionButton'
import ModalCropByProvince from '../../components/modal/ModalCropByProvince'
import ModalEditLocationPrice from '../../components/modal/ModalEditLocationPrice'
import color from '../../resource/color'
import { LocationPriceDatasource } from '../../datasource/LocationPriceDatasource'
import {
  LocationPricePageEntity,
  UpdateLocationPrice,
  UpdateLocationPriceList,
  UpdateLocationPrice_INIT,
} from '../../entities/LocationPrice'
import moment from 'moment'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../store/ProfileAtom'

function PricePage() {
  const role = useRecoilValueLoadable(getUserRoleById)
  const currentRole = role.state === 'hasValue' ? role.contents : null
  const settingRole = useMemo(() => {
    const find = currentRole?.settings.find((el) => el.name === 'ราคา')
    return find
  }, [currentRole?.settings])
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<LocationPricePageEntity>()
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [editIndex, setEditIndex] = useState()
  const [showModalCrop, setShowModalCrop] = useState(false)
  const [searchText, setSearchText] = useState<string>()
  const [provinceId, setProvinceId] = useState()
  const [loading, setLoading] = useState(false)
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)
  const [sortDirection6, setSortDirection6] = useState<string | undefined>(undefined)

  const [editLocationPrice, setEditLocationPrice] =
    useState<UpdateLocationPrice>(UpdateLocationPrice_INIT)
  useEffect(() => {
    fetchLocationPrice()
  }, [current, sortDirection, row])
  const fetchLocationPrice = async () => {
    setLoading(true)
    await LocationPriceDatasource.getAllLocationPrice(
      row,
      current,
      searchText,
      sortField,
      sortDirection,
    )
      .then((res: LocationPricePageEntity) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const handleModalEdit = (plants: UpdateLocationPrice, index: any) => {
    setShowModalEdit((prev) => !prev)
    setEditIndex(index)
    setEditLocationPrice(plants)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
  }
  const previewCrop = (province: any) => {
    setShowModalCrop((prev) => !prev)
    setProvinceId(province)
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const updatePriceCrop = async (dataUpdate: UpdateLocationPriceList[]) => {
    if (Array.isArray(dataUpdate)) {
      const dataArrPlants = {
        priceData: dataUpdate,
      }
      await LocationPriceDatasource.updateLocationPrice(dataArrPlants)
    } else {
      await LocationPriceDatasource.updateLocationEqualPrice(dataUpdate)
    }
    setShowModalEdit((prev) => !prev)
    fetchLocationPrice()
  }
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จังหวัด
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('province_name')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
                setSortDirection1((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection1 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection1 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'province_name',
      key: 'province_name',
    },
    {
      title: 'พืช',
      dataIndex: 'plants',
      key: 'plants',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                cursor: 'pointer',
                color: color.Success,
                textDecorationLine: 'underline',
                fontWeight: '700',
              }}
              onClick={() => previewCrop(row)}
            >
              ดูรายการพืช
            </span>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ราคาฉีดพ่น
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('max_price')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
                setSortDirection2((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection2 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection2 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'price',
      key: 'price',
      render: (value: any, row: any, index: number) => {
        const priceText =
          row.min_price === null || row.max_price === null
            ? '-'
            : row.min_price === row.max_price
            ? `${row.max_price} บาท`
            : `${row.min_price} - ${row.max_price} บาท`
        return {
          children: <span style={{ color: color.primary1, fontWeight: '700' }}>{priceText}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ราคาหว่าน
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('max_price_sow')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
                setSortDirection3((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection3 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection3 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'priceSow',
      key: 'priceSow',
      render: (value: any, row: any, index: number) => {
        const priceText =
          row.min_price_sow === null || row.max_price_sow === null
            ? '-'
            : row.min_price_sow === row.max_price_sow
            ? `${row.max_price_sow} บาท`
            : `${row.min_price_sow} - ${row.max_price_sow} บาท`
        return {
          children: <span style={{ color: color.primary1, fontWeight: '700' }}>{priceText}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนอำเภอ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('count_district')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
                setSortDirection4((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection4 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection4 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'count_district',
      key: 'count_district',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.count_district + `  อำเภอ`}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนตำบล
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('count_subdistrict')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
                setSortDirection5((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection5 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection5 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'count_subdistrict',
      key: 'count_subdistrict',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.count_subdistrict + `  ตำบล`}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            อัปเดตล่าสุด
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('update_at')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
                setSortDirection6((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return ''
                  }
                })
              }}
            >
              <CaretUpOutlined
                style={{
                  position: 'relative',
                  top: 2,
                  color: sortDirection6 === 'ASC' ? '#ffca37' : 'white',
                }}
              />
              <CaretDownOutlined
                style={{
                  position: 'relative',
                  bottom: 2,
                  color: sortDirection6 === 'DESC' ? '#ffca37' : 'white',
                }}
              />
            </div>
          </div>
        )
      },
      dataIndex: 'update_at',
      key: 'update_at',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {moment(row.update_at).format('DD/MM/YYYY, HH:mm')}
              </span>
            </div>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (value: any, row: any, index: number) => {
        return {
          children: settingRole?.edit.value && (
            <div className='d-flex flex-row justify-content-between'>
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => handleModalEdit(row, row.plants)}
              />
            </div>
          ),
        }
      },
    },
  ]
  const pageTitle = (
    <div className='container d-flex' style={{ padding: '8px' }}>
      <div className='col-lg-6'>
        <span
          className='card-label font-weight-bolder text-dark'
          style={{ fontSize: 22, fontWeight: 'bold', padding: '8px' }}
        >
          <strong>ราคาฉีดพ่น (Price)</strong>
        </span>
      </div>
      <div className='col-lg-3 p-1'>
        <Input
          allowClear
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder='ค้นหาจังหวัด'
          className='col-lg-12 p-1'
          onChange={changeTextSearch}
        />
      </div>
      <div className='col-lg p-1'>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          className='col-lg-12'
          onClick={() => {
            setCurrent(1)
            fetchLocationPrice()
          }}
        >
          ค้นหาข้อมูล
        </Button>
      </div>
      {settingRole?.add.value && (
        <div className='col-lg p-1'>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
          >
            อัปโหลดราคา Excel
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {pageTitle}
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table columns={columns} dataSource={data?.data} pagination={false} />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          onShowSizeChange={onShowSizeChange}
        />
      </div>

      {showModalEdit && (
        <ModalEditLocationPrice
          isEditModal
          show={showModalEdit}
          backButton={() => setShowModalEdit((prev) => !prev)}
          callBack={updatePriceCrop}
          data={editLocationPrice}
          editIndex={editIndex}
        />
      )}
      {showModalCrop && (
        <ModalCropByProvince
          show={showModalCrop}
          data={provinceId}
          backButton={() => setShowModalCrop((prev) => !prev)}
        />
      )}
    </>
  )
}
export default PricePage
