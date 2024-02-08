import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../../../components/button/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryContent from './SummaryContent'
import { Button, Input, Pagination, PaginationProps, Spin, Table, Tabs } from 'antd'
import { color } from '../../../../resource'
import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons'
import ActionButton from '../../../../components/button/ActionButton'
import icon from '../../../../resource/icon'
import './TableStyle.css'
import { ShopProductDatasource } from '../../../../datasource/ShopProductDatasource'
import {
  ProductBrandListEntity,
  ProductBrandListEntity_INIT,
  ShopProductListEntity,
  ShopProductListEntity_INIT,
} from '../../../../entities/ShopProductEntities'
import { numberWithCommas } from '../../../../utilities/TextFormatter'
import { SelectMulti } from '../../../../components/dropdownCheck/SelectMulti'

function IndexProductShop() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<any>('ACTIVE')
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ShopProductListEntity>(ShopProductListEntity_INIT)
  const [searchText, setSearchText] = useState<string>('')
  const [current, setCurrent] = useState(1)
  const [row, setRow] = useState(10)
  const [productGroup, setProductGroup] = useState<any>()
  const [productBrandId, setProductBrandId] = useState<any>()
  const [productGroupId, setProductGroupId] = useState<any>()
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const { id } = useParams()
  const params = new URLSearchParams(id)
  const shopId = params.get('id')
  const shopName = params.get('name')
  const [brandListDropdown, setBrandListDropdown] = useState<ProductBrandListEntity>(
    ProductBrandListEntity_INIT,
  )

  useEffect(() => {
    fetchShopProduct()
  }, [status, current, sortDirection, row])

  const fetchShopProduct = async () => {
    setLoading(true)
    try {
      const res = await ShopProductDatasource.getShopProduct(
        shopId!,
        current,
        row,
        productGroupId,
        productBrandId,
        searchText,
        status,
        sortField,
        sortDirection,
      )
      setData(res)
    } catch (error) {
      console.error('Error fetching shop product:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductBrand()
    fetchProductGroup()
  }, [])

  const fetchProductBrand = () => {
    ShopProductDatasource.getProductBrand().then((res) => {
      setBrandListDropdown(res)
    })
  }
  const fetchProductGroup = () => {
    ShopProductDatasource.getProductGroup().then((res) => {
      setProductGroup(res)
    })
  }
  const styleHeader = () => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    paddingLeft: '12px',
  })
  const styleValue = () => ({
    width: '100%',
    height: '60px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  })
  const tabConfigurations = [
    { title: 'เปิดขาย', key: 'ACTIVE' },
    { title: 'เลิกขาย', key: 'INACTIVE' },
  ]
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }

  const columns = [
    {
      title: () => {
        return <div style={{ ...styleHeader(), gap: 8 }}>ชื่อสินค้า</div>
      },
      dataIndex: 'productName',
      key: 'productName',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container d-flex align-items-center'>
              <img
                src={row.product.productImage}
                style={{ width: '50px', height: '50px', padding: 6 }}
              />
              <span className='text-dark-75  d-block font-size-lg'>
                {row.product.productName || '-'}{' '}
                <span
                  className='d-block'
                  style={{ color: 'grey', fontWeight: 200, fontSize: '13px' }}
                >
                  {row.product.productGroup.productGroupName || '-'}
                </span>
              </span>
            </div>
          ),
        }
      },
    },
    {
      title: <div style={styleHeader()}>แบรนด์</div>,
      dataIndex: 'brand',
      key: 'brand',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div className='container d-flex align-items-center'>
                <img
                  src={row.product.productBrand.productBrandLogo}
                  style={{ width: '40px', height: '40px', padding: 6 }}
                />
                <span className='text-dark-75  d-block font-size-lg'>
                  {row.product.productBrand.productBrandName || '-'}
                </span>
                <div> </div>
              </div>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={styleHeader()}>
            <div style={{ ...styleHeader(), flexDirection: 'column', justifyContent: 'center' }}>
              <span>ราคา Sub Dealer</span>
              <span style={{ fontSize: '14px', fontWeight: '400' }}>(ต่อหน่วย)</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                paddingRight: '12px',
              }}
              onClick={() => {
                setSortField('subdealerPrice')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection1((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
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
      dataIndex: 'subdealerPrice',
      key: 'subdealerPrice',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div style={{ ...styleValue(), flexDirection: 'column' }}>
              <span>{numberWithCommas(value) || 0}</span>
              <span
                style={{ color: 'grey', fontSize: '13px' }}
              >{`${row.product.unitPackMea} (${row.product.unitSize} ${row.product.unitMea})`}</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={styleHeader()}>
            <div style={{ ...styleHeader(), flexDirection: 'column', justifyContent: 'center' }}>
              <span>ราคาเกษตรกร</span>
              <span style={{ fontSize: '14px', fontWeight: '400' }}>(ต่อหน่วย)</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                paddingRight: '12px',
              }}
              onClick={() => {
                setSortField('farmerPrice')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection2((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
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
      dataIndex: 'farmerPrice',
      key: 'farmerPrice',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div style={{ ...styleValue(), flexDirection: 'column' }}>
              <span>{numberWithCommas(value) || 0}</span>
              <span
                style={{ color: 'grey', fontSize: '13px' }}
              >{`${row.product.unitPackMea} (${row.product.unitSize} ${row.product.unitMea})`}</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ ...styleHeader(), backgroundColor: color.secondary2 }}>
            <div className='d-flex' style={{ flexDirection: 'column' }}>
              <span className='col' style={{ color: color.font }}>
                จำนวน
              </span>
              <span className='col' style={{ color: color.font }}>
                นักบินที่ยืม
              </span>
            </div>
          </div>
        )
      },
      dataIndex: 'dronerCount',
      key: 'dronerCount',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div style={{ ...styleValue(), flexDirection: 'column', backgroundColor: '#FEFAEB' }}>
              <span>{numberWithCommas(value) || 0} คน</span>
              <u style={{ color: color.Success, cursor: 'pointer', fontWeight: '500' }}>
                ดูรายชื่อ
              </u>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ ...styleHeader(), backgroundColor: color.blue }}>
            <div className='d-flex' style={{ flexDirection: 'column' }}>
              <span className='col'>จำนวน</span>
              <span className='col'>ของร้าน</span>
            </div>
          </div>
        )
      },
      dataIndex: 'stockShop',
      key: 'stockShop',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        const unitVolume = row.product.unitVolume * row.stockShop
        return {
          children: (
            <div style={{ ...styleValue(), flexDirection: 'column', backgroundColor: '#E7F1FE' }}>
              <span>{numberWithCommas(value) || 0} ลัง</span>
              <span style={{ color: 'grey', fontSize: '12px' }}>{`(${
                numberWithCommas(unitVolume) || 0
              } ขวด)`}</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ ...styleHeader(), backgroundColor: color.secondary1 }}>
            <div className='d-flex' style={{ flexDirection: 'column' }}>
              <span className='col'>จำนวน</span>
              <span className='col'>ของ ICK</span>
            </div>
          </div>
        )
      },
      dataIndex: 'stockIck',
      key: 'stockIck',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        const unitVolume = row.product.unitVolume * row.stockIck
        return {
          children: (
            <div style={{ ...styleValue(), flexDirection: 'column', backgroundColor: '#FBF5EB' }}>
              <span>{numberWithCommas(value) || 0} ลัง</span>
              <span style={{ color: 'grey', fontSize: '12px' }}>{`(${
                numberWithCommas(unitVolume) || 0
              } ขวด)`}</span>
            </div>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-center'>
              <div className='me-2'>
                <ActionButton
                  icon={
                    <img
                      src={icon.icon_cart}
                      style={{ width: 20, height: 20, paddingBottom: '10%' }}
                    />
                  }
                  color={color.primary1}
                />
              </div>
              <div className='me-2'>
                <ActionButton
                  icon={
                    <img
                      src={icon.inforedeem}
                      style={{ width: 20, height: 20, paddingBottom: '10%' }}
                    />
                  }
                  color={color.primary1}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
  return (
    <>
      <div className='d-flex align-items-center'>
        <BackIconButton onClick={() => navigate(-1)} />
        <strong style={{ fontSize: '20px' }}>{`รายการปุ๋ย/ยา | ร้าน "${shopName}"`}</strong>
      </div>
      <SummaryContent data={data} />
      <div className='pt-3'>
        <Tabs
          className={status ? '' : 'tab-status-inactive'}
          onChange={(key: string) => setStatus(key)}
          type='card'
        >
          {tabConfigurations.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={String(tab.key)} />
          ))}
        </Tabs>
      </div>

      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-6 p-1'>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อสินค้า'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg'>
          <SelectMulti
            name='group'
            onSearchType={(value: any) => setProductGroupId(value)}
            list={productGroup}
            title='เลือกกลุ่มสินค้า'
          />
        </div>
        <div className='col-lg'>
          <SelectMulti
            onSearchType={(value: any) => setProductBrandId(value)}
            list={brandListDropdown}
            title='เลือกแบรนด์'
          />
        </div>
        <div className='col-lg-1 p-1'>
          <Button
            className='col-lg-12'
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1)
              fetchShopProduct()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          className='table-custom'
          columns={columns}
          dataSource={data?.products}
          scroll={{ x: 'max-content' }}
          pagination={false}
        />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={(page: number) => setCurrent(page)}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
        />
      </div>
    </>
  )
}

export default IndexProductShop
