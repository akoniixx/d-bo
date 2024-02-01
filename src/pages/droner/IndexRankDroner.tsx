import { Button, DatePicker, Input, Pagination, Select, Spin, Table } from 'antd'
import moment, { min } from 'moment'
import React, { useEffect, useState } from 'react'
import ActionButton from '../../components/button/ActionButton'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import { DistrictEntity, ProvinceEntity, SubdistrictEntity } from '../../entities/LocationEntities'
import color from '../../resource/color'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FileTextOutlined,
  SearchOutlined,
  StarFilled,
} from '@ant-design/icons'
import { DronerRankDatasource } from '../../datasource/DronerRankDatasource'
import { DronerRankListEntity } from '../../entities/DronerRankEntities'
import { useNavigate } from 'react-router-dom'
import CheckRatingDroner from '../../components/dropdownCheck/CheckRatingDroner'
import { formatNumberWithCommas, validateOnlyNumWDecimal } from '../../utilities/TextFormatter'
import ShowNickName from '../../components/popover/ShowNickName'

export default function IndexRankDroner() {
  const navigate = useNavigate()
  const row = 10
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<DronerRankListEntity>()
  const [searchText, setSearchText] = useState<string>()
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [searchProvince, setSearchProvince] = useState<any>()
  const [searchDistrict, setSearchDistrict] = useState<any>()
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>()
  const [province, setProvince] = useState<ProvinceEntity[]>()
  const [district, setDistrict] = useState<DistrictEntity[]>()
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>()
  const [accuNumber, setAccuNumber] = useState<number[]>([])
  const [rating, setRating] = useState<{
    ratingMin: any
    ratingMax: any
  }>()
  const [loading, setLoading] = useState(false)
  const { RangePicker } = DatePicker
  const [sortDirection, setSortDirection] = useState<string | undefined>()
  const [sortField, setSortField] = useState<string | undefined>()
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(undefined)
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(undefined)
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(undefined)
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(undefined)
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(undefined)
  const [sortDirection6, setSortDirection6] = useState<string | undefined>(undefined)
  const dateSearchFormat = 'YYYY-MM-DD'
  useEffect(() => {
    fetchDronerRank()
    fetchProvince()
  }, [current, startDate, endDate, sortDirection])
  useEffect(() => {
    LocationDatasource.getDistrict(searchProvince).then((res) => {
      setDistrict(res)
      setSearchDistrict(null)
    })
  }, [searchProvince])

  useEffect(() => {
    LocationDatasource.getSubdistrict(searchDistrict).then((res) => {
      setSubdistrict(res)
      setSearchSubdistrict(null)
    })
  }, [searchDistrict])
  const fetchDronerRank = async () => {
    setLoading(true)
    await DronerRankDatasource.getDronerRank(
      current,
      row,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      rating?.ratingMin,
      rating?.ratingMax,
      startDate,
      endDate,
      searchText,
      sortDirection,
      sortField,
    )
      .then((res: DronerRankListEntity) => {
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res)
    })
  }
  const fetchDistrict = async (provinceId: number) => {
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res)
    })
  }
  const fetchSubdistrict = async (districtId: number) => {
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res)
    })
  }
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const handleProvince = (provinceId: any) => {
    const filterId = district?.map((x) => x.provinceId)[0]
    if (!provinceId || parseFloat(provinceId) !== filterId) {
      setSearchDistrict(undefined)
      setSearchSubdistrict(undefined)
      setSearchProvince(undefined)
    }
    setSearchProvince(provinceId)
    fetchDistrict(provinceId)
  }
  const handleDistrict = (districtId: any) => {
    if (!districtId) {
      setSearchSubdistrict(undefined)
    }
    fetchSubdistrict(districtId)
    setSearchDistrict(districtId)
  }
  const handleSubDistrict = (subdistrictId: any) => {
    setSearchSubdistrict(subdistrictId)
  }
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat))
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat))
    } else {
      setStartDate(e)
      setEndDate(e)
    }
  }
  const onSearchStatus = (value: number, checked: boolean) => {
    let min: any = 0
    let max: any = 0
    if (checked) {
      min = Math.min(...accuNumber, value)
      max = Math.max(...accuNumber, value)
      setAccuNumber([...accuNumber, value])
    } else {
      const d: number[] = accuNumber.filter((x) => x != value)
      min = Math.min(...d)
      max = Math.max(...d)
      setAccuNumber(d)
      if (d.length == 0) {
        min = undefined
        max = undefined
      }
    }
    setRating({ ratingMin: min, ratingMax: max })
  }

  const PageTitle = (
    <>
      <div className='container d-flex justify-content-between' style={{ padding: '10px' }}>
        <div>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{ fontSize: 22, fontWeight: 'bold', padding: '8px' }}
          >
            <strong>อันดับนักบินโดรน (Ranking Droner)</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            allowClear
            onCalendarChange={(val) => handleSearchDate(val)}
            format={dateSearchFormat}
          />
        </div>
      </div>
      <div className='container d-flex justify-content-between' style={{ padding: '8px' }}>
        <div className='col-lg-4 p-1' style={{ maxWidth: '1200px' }}>
          <Input
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อนักบินโดรน/เบอร์โทร/ID นักบินโดรน'
            className='col-lg-12 p-1'
            onChange={changeTextSearch}
          />
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกจังหวัด'
            onChange={handleProvince}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {province?.map((item) => (
              <option value={item.provinceId.toString()}>{item.provinceName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกอำเภอ'
            onChange={handleDistrict}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            disabled={!searchProvince}
            value={searchDistrict}
          >
            {district?.map((item) => (
              <option value={item.districtId.toString()}>{item.districtName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg'>
          <Select
            allowClear
            className='col-lg-12 p-1'
            placeholder='เลือกตำบล'
            onChange={handleSubDistrict}
            showSearch
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            disabled={!searchDistrict}
            value={searchSubdistrict}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId.toString()}>{item.subdistrictName}</option>
            ))}
          </Select>
        </div>
        <div className='col-lg-2'>
          <CheckRatingDroner
            onSearchType={(value: any, checked: any) => onSearchStatus(value, checked)}
            title='เลือกแต้ม Rating'
          />
        </div>
        <div className='pt-1'>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1)
              fetchDronerRank()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  )
  const columns = [
    {
      title: 'ชื่อนักบินโดรน',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.droner_firstname + ' ' + row.droner_lastname}
              </span>
              <span style={{ color: color.Grey, fontSize: '13px' }}>
                {row.droner_droner_code}
                {row.droner_nickname && (
                  <ShowNickName
                    data={row.droner_nickname}
                    menu='drone'
                    status={row.droner_status}
                  />
                )}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'droner_telephone_no',
      key: 'droner_telephone_no',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.droner_telephone_no ? row.droner_telephone_no : '-'}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนให้บริการ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('totalTaskCount')
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
      dataIndex: 'totalTaskCount',
      key: 'totalTaskCount',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.totalTaskCount + ' ' + 'งาน'}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            จำนวนไร่
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('totalRaiCount')
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
      dataIndex: 'totalRaiCount',
      key: 'totalRaiCount',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.totalRaiCount ? formatNumberWithCommas(row.totalRaiCount) : 0} ไร่
              </span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            คะแนน Rating
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('avgrating')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection3((prev) => {
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
      dataIndex: 'avgrating',
      key: 'avgrating',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className='text-dark-75  d-block font-size-lg'>
                {row.avgrating > '0' ? (
                  <span>
                    <StarFilled
                      style={{
                        color: '#FFCA37',
                        fontSize: '20px',
                        marginRight: '7px',
                        verticalAlign: 0.5,
                      }}
                    />
                    {parseFloat(row.avgrating).toFixed(1)}
                  </span>
                ) : (
                  '-'
                )}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            ตำบล
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('subdistrict_subdistrict_name')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection4((prev) => {
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
      dataIndex: 'subdistrict_subdistrict_name',
      key: 'subdistrict_subdistrict_name',
      render: (value: any, row: any, index: number) => {
        const subdistrict = row.subdistrict_subdistrict_name
        return {
          children: (
            <span className='text-dark-75  d-block font-size-lg'>
              {subdistrict != null ? subdistrict : '-'}
            </span>
          ),
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            อำเภอ
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortField('district_district_name')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection5((prev) => {
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
      dataIndex: 'district_district_name',
      key: 'district_district_name',
      render: (value: any, row: any, index: number) => {
        const district = row.district_district_name
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {district !== null ? district : '-'}
              </span>
            </div>
          ),
        }
      },
    },
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
                setSortField('province_province_name')
                setSortDirection((prev) => {
                  if (prev === 'ASC') {
                    return 'DESC'
                  } else if (prev === undefined) {
                    return 'ASC'
                  } else {
                    return undefined
                  }
                })
                setSortDirection6((prev) => {
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
      dataIndex: 'province_province_name',
      key: 'province_province_name',
      render: (value: any, row: any, index: number) => {
        const province = row.province_province_name
        return {
          children: (
            <div className='container'>
              <span className='text-dark-75  d-block font-size-lg'>
                {province !== null ? province : '-'}
              </span>
            </div>
          ),
        }
      },
    },
    {
      title: '',
      dataIndex: 'Action',
      key: 'Action',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-between'>
              <ActionButton
                icon={<FileTextOutlined />}
                color={color.primary1}
                onClick={() => navigate('/DetailRankDroner?=' + row.droner_id)}
              />
            </div>
          ),
        }
      },
    },
  ]
  return (
    <>
      {PageTitle}
      <br />
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
          showSizeChanger={false}
        />
      </div>
    </>
  )
}
