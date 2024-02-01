import React, { useState } from 'react'
import { BackIconButton } from '../../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import SummaryContent from './SummaryContent'
import { Badge, Button, Input, Select, Table, Tabs } from 'antd'
import { color } from '../../../../resource'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { numberWithCommas } from '../../../../utilities/TextFormatter'
import ActionButton from '../../../../components/button/ActionButton'
import icon from '../../../../resource/icon'
import './TableStyle.css'

function IndexProductShop() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined)
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortField, setSortField] = useState<string | undefined>(undefined)

  const data = [{}]

  const styleHeader = () => ({
    display: 'flex',
    // gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60px',
  })
  const tabConfigurations = [
    { title: 'เปิดขาย', key: true },
    { title: 'เลิกขาย', key: false },
  ]
  const columns = [
    {
      title: () => {
        return (
          <div style={{ ...styleHeader(), gap: 8 }}>
            ชื่อสินค้า
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('name')
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
      dataIndex: 'name',
      key: 'name',
      className: 'table-custom-body',
      width: '18%',
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
      title: <div style={styleHeader()}>แบรนด์</div>,
      dataIndex: 'brand',
      key: 'brand',
      className: 'table-custom-body',
      width: '18%',
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
      title: () => {
        return (
          <div style={styleHeader()}>
            <div style={{ ...styleHeader(), flexDirection: 'column' }}>
              <span>ราคา Sub Dealer</span>
              <span style={{ fontSize: '14px', fontWeight: '400' }}>(ต่อหน่วย)</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('name')
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
      dataIndex: 'name',
      key: 'name',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span></span>,
        }
      },
    },
    {
        title: () => {
            return (
              <div style={styleHeader()}>
                <div style={{ ...styleHeader(), flexDirection: 'column' }}>
                  <span>ราคาเกษตรกร</span>
                  <span style={{ fontSize: '14px', fontWeight: '400' }}>(ต่อหน่วย)</span>
                </div>
    
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSortField('name')
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
      dataIndex: 'telephoneFirst',
      key: 'telephoneFirst',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: <></>,
        }
      },
    },
    {
      title: (
        <div style={{ ...styleHeader(), backgroundColor: color.secondary2 }}>จำนวนนักบินที่ยืม</div>
      ),
      dataIndex: 'dronerCount',
      key: 'dronerCount',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div
              style={{
                backgroundColor: '#FEFAEB',
                width: '100%',
                height: '60px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <span>test</span>
            </div>
          ),
        }
      },
    },
    {
      title: <div style={{ ...styleHeader(), backgroundColor: color.blue }}>จำนวนของร้าน</div>,
      dataIndex: 'fer',
      key: 'fer',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div
              style={{
                backgroundColor: '#E7F1FE',
                width: '100%',
                height: '60px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <span>test</span>
            </div>
          ),
        }
      },
    },
    {
      title: (
        <div style={{ ...styleHeader(), backgroundColor: color.secondary1 }}>จำนวนของ ICK</div>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      className: 'table-custom-body',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div
              style={{
                backgroundColor: '#FBF5EB',
                width: '100%',
                height: '60px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <span>test</span>
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
                  //   onClick={() => navigate('/IndexProductShop/id=' + row.shopId)}
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
                  //   onClick={() => navigate('/DetailStore/id=' + row.shopId)}
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
        <strong style={{ fontSize: '20px' }}>{`รายการปุ๋ย/ยา | ร้าน "ไม้เมืองการเกษตร"`}</strong>
      </div>
      <SummaryContent data={undefined} />
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
        <div className='col-lg-6 p-1'>
          <Input
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อสินค้า'
            className='col-lg-12'
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกกลุ่มสินค้า'
            // onChange={(province: any) => setSearchProvince(province)}
            showSearch
            value={undefined}
            allowClear
            optionFilterProp='children'
          ></Select>
        </div>
        <div className='col-lg p-1'>
          <Select
            className='col-lg-12'
            placeholder='เลือกกลุ่มแบรนด์'
            // onChange={(province: any) => setSearchProvince(province)}
            showSearch
            value={undefined}
            allowClear
            optionFilterProp='children'
          ></Select>
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
              //   setCurrent(1)
              //   fetchListShop()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>

      <Table
        className='table-custom'
        columns={columns}
        dataSource={data}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}

export default IndexProductShop
