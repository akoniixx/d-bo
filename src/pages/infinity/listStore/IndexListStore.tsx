import {
  Alert,
  Badge,
  Button,
  Input,
  Pagination,
  PaginationProps,
  Select,
  Spin,
  Table,
  Tabs,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { color, image } from '../../../resource'
import { CaretDownOutlined, CaretUpOutlined, FileTextOutlined } from '@ant-design/icons'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import ActionButton from '../../../components/button/ActionButton'
import { useNavigate } from 'react-router-dom'
import { ProviceEntity } from '../../../entities/LocationEntities'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import icon from '../../../resource/icon'
import { AuthDatasource } from '../../../datasource/AuthDatasource'
import { AllshopOneFinityEntity } from '../../../entities/OneFinityShopEntities'
import { OneFinityShopDatasource } from '../../../datasource/OneFinityShopDatasource'

function IndexListStore() {
  const [status, setStatus] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>('')
  const [searchProvince, setSearchProvince] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [row, setRow] = useState(10)
  const [current, setCurrent] = useState(1)
  const [province, setProvince] = useState<ProviceEntity[]>([])
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)
  const [shopData, setShopData] = useState<AllshopOneFinityEntity>()
  const [checkToken, setCheckToken] = useState<boolean>(false)

  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAuthUserShop = async () => {
      await AuthDatasource.loginUserSellCoda(profile?.email).then((res) => {
        if (res.accessToken) {
          setCheckToken(true)
          localStorage.setItem('onefinity-shop', res.accessToken)
        } else {
          setError(
            <Alert
              description={
                <span>
                  <strong>แจ้งเตือน!!</strong> เนื่องจากอีเมล์ของคุณไม่ได้เชื่อมต่อระบบ IconKaset
                  Shop ทำให้ไม่สามารถดึงข้อมูลต่างๆ ได้ กรุณาติดต่อเจ้าหน้าที่เพื่อเชื่อมต่ออีเมล์
                </span>
              }
              type='warning'
              showIcon
            />,
          )
        }
      })
    }
    const fetchProvince = async () => {
      await LocationDatasource.getProvince().then((res) => {
        setProvince(res)
      })
    }
    fetchAuthUserShop()
    fetchProvince()
  }, [])
  useEffect(() => {
    if (checkToken) {
      fetchListShop()
    }
  }, [checkToken, status, sortDirection])

  const fetchListShop = async () => {
    setLoading(true)
    await OneFinityShopDatasource.getListShop(
      current,
      row,
      sortField,
      sortDirection,
      searchText,
      status,
      searchProvince,
    )
      .then((res) => {
        setShopData(res)
      })
      .finally(() => setLoading(false))
  }

  const tabConfigurations = [
    { title: 'ใช้งาน', key: true },
    { title: 'ปิดการใช้งาน', key: false },
  ]
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current)
    setRow(pageSize)
  }
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            รหัสร้านค้า
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('shopNo')
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
      dataIndex: 'shopNo',
      key: 'shopNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>{value || '-'}</span>
            </div>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ชื่อร้านค้า
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('shopName')
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
      dataIndex: 'shopName',
      key: 'shopName',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div className='container'>
                <span className='text-dark-75  d-block font-size-lg'>{value || '-'}</span>
                <div> </div>
              </div>
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อเจ้าของร้าน',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.title + ' ' + row.firstname + ' ' + row.lastname}</span>,
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telephoneFirst',
      key: 'telephoneFirst',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        }
      },
    },
    {
      title: 'จังหวัด',
      dataIndex: 'province',
      key: 'province',
      render: (value: any, row: any, index: number) => {
        const province = row.address
        return {
          children: <span>{province ? row.address.provinceName : '-'}</span>,
        }
      },
    },
    {
      title: ' รายการยา / ปุ๋ย',
      dataIndex: 'fer',
      key: 'fer',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(value)} รายการ</span>,
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: row.isActive ? color.Success : color.Error,
              }}
            >
              <Badge color={row.isActive ? color.Success : color.Error} />{' '}
              {row.isActive ? 'ใช้งาน' : 'ปิดการใช้งาน'}
            </span>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              <div className='pr-1'>
                <ActionButton
                  icon={
                    <img
                      src={icon.fertilizer}
                      style={{ width: 30, height: 30, paddingBottom: '10%' }}
                    />
                  }
                  color={color.primary1}
                  // onClick={() => navigate('/DetailStore')}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => navigate('/DetailStore/id=' + row.shopId)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]

  const emptyState = {
    emptyText: (
      <div style={{ textAlign: 'center', padding: '4%' }}>
        <img src={image.empty_shop} style={{ width: 90, height: 90 }} />
        <p>ยังไม่มีข้อมูลร้านค้า</p>
      </div>
    ),
  }
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <span className='p-3'>
            <strong style={{ fontSize: '20px' }}>รายชื่อร้านค้า </strong>
          </span>
        </div>
      </div>
      <div className='pt-3'>
        <Tabs
          className={status ? '' : 'tab-status-inactive'}
          onChange={(key: string) => setStatus(key === 'true')}
          type='card'
        >
          {tabConfigurations.map((tab) => (
            <Tabs.TabPane tab={tab.title} key={String(tab.key)} />
          ))}
        </Tabs>
      </div>
      <div className='d-flex justify-content-between pb-4'>
        <div className='col-lg-8 p-1'>
          <Input
            placeholder='ค้นหาชื่อรหัสร้านค้า / ชื่อร้านค้า / หมายเลขนิติบุคคล / เบอร์โทร'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกจังหวัด'
            onChange={(province: any) => setSearchProvince(province)}
            showSearch
            value={searchProvince}
            allowClear
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {province?.map((item, index) => (
              <option key={index} value={item.provinceId.toString()}>
                {item.provinceName}
              </option>
            ))}
          </Select>
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
              fetchListShop()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
      {error && <div className='error-message pb-4'>{error}</div>}

      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <Table
          locale={emptyState}
          columns={columns}
          dataSource={shopData?.data}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Spin>
      <div className='d-flex justify-content-between pt-3 pb-3'>
        <p>รายการทั้งหมด {shopData?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={(page: number) => setCurrent(page)}
          onShowSizeChange={onShowSizeChange}
          total={shopData?.count}
        />
      </div>
    </div>
  )
}

export default IndexListStore
