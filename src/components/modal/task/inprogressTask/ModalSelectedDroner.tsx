import { DownOutlined, SearchOutlined, StarFilled } from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Popover,
  Row,
  Select,
  Slider,
  Table,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { TaskSearchDronerDatasource } from '../../../../datasource/TaskSearchDronerDatasource'
import { DronerEntity } from '../../../../entities/DronerDroneEntities'
import { GetTaskInprogressEntity } from '../../../../entities/TaskInprogress'
import { TaskSearchDroner, TaskSearchDroner_INIT } from '../../../../entities/TaskSearchDroner'
import color from '../../../../resource/color'
import { CardContainer } from '../../../card/CardContainer'
import FooterPage from '../../../footer/FooterPage'
import ShowNickName from '../../../popover/ShowNickName'

const _ = require('lodash')
const { Map } = require('immutable')

interface ModalSelectedDronerProps {
  show: boolean
  backButton: () => void
  dataTask: GetTaskInprogressEntity
  title: string
  dataDroner: DronerEntity
  callBack: (data: TaskSearchDroner) => void
}
const ModalSelectedDroner: React.FC<ModalSelectedDronerProps> = ({
  show,
  backButton,
  title,
  dataTask,
  dataDroner,
  callBack,
}) => {
  const [newDronerSelected, setNewDronerSelected] =
    useState<TaskSearchDroner>(TaskSearchDroner_INIT)
  const [dataDronerList, setDataDronerList] = useState<TaskSearchDroner[]>([TaskSearchDroner_INIT])
  const [searchTextDroner, setSearchTextDroner] = useState<string>('')
  const ratingStar = (
    <Menu
      items={[
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '1',
          icon: <Checkbox value={5} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '2',
          icon: <Checkbox value={4} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '3',
          icon: <Checkbox value={3} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: '4',
          icon: <Checkbox value={2} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: '#FFCA37', fontSize: '16px' }}>
              <StarFilled />
            </div>
          ),
          key: '5',
          icon: <Checkbox value={1} onClick={(e) => onChangeRating(e)} />,
        },
      ]}
    />
  )
  const [visibleSlider, setVisibleSlider] = useState(false)
  const [visibleRating, setVisibleRating] = useState(false)
  const [distrance, setDistrance] = useState<{
    min: number
    max: number
  }>({
    min: 0,
    max: 0,
  })
  const [accuNumber, setAccuNumber] = useState<number[]>([])
  const [rating, setRating] = useState<{
    ratingMin: number
    ratingMax: number
  }>()
  const [statusDroner, setStatusDroner] = useState<string>()

  const fetchDronerList = async (
    search?: string,
    status?: string,
    ratingMin?: number,
    ratingMax?: number,
  ) => {
    await TaskSearchDronerDatasource.getTaskDronerList(
      dataTask.farmerId,
      dataTask.farmerPlotId,
      dataTask.dateAppointment,
      search,
      distrance.min,
      distrance.max,
      status,
      ratingMin,
      ratingMax,
    ).then((res) => {
      res.map((item) => _.set(item, 'isChecked', item.droner_id == dataDroner.id ? true : false))
      setDataDronerList(res)
    })
  }
  useEffect(() => {
    fetchDronerList()
  }, [])

  const handleVisibleSlider = (newVisible: any) => {
    setVisibleSlider(newVisible)
  }
  const onChangeSlider = (newValue: any) => {
    setDistrance({ min: newValue[0], max: newValue[1] })
  }
  const onChangeDistranceMin = (e: any) => {
    setDistrance({ min: e, max: distrance.max })
  }
  const onChangeDistranceMax = (e: any) => {
    setDistrance({ min: distrance.min, max: e })
  }
  const onChangeStatusDroner = (e: any) => {
    setStatusDroner(e)
  }
  const onChangeRating = (e: any) => {
    const value = e.target.value
    const checked = e.target.checked
    let min = 0
    let max = 0
    if (checked) {
      min = Math.min(...accuNumber, value)
      max = Math.max(...accuNumber, value)
      setAccuNumber([...accuNumber, value])
    } else {
      const d: number[] = accuNumber.filter((x) => x != value)
      min = Math.min(...d)
      max = Math.max(...d)
      setAccuNumber(d)
    }
    setRating({ ratingMin: min, ratingMax: max })
  }
  const handleSelectDroner = async (e: any, data: any) => {
    const inputType = e.target.type
    const checked = e.target.checked
    let d: TaskSearchDroner[] = []
    d = dataDronerList.map((item) =>
      _.set(item, 'isChecked', item.droner_id == data.droner_id ? checked : false),
    )
    setDataDronerList(d)
    setNewDronerSelected(d.filter((x) => x.isChecked)[0])
  }
  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible)
  }
  const handleCallBack = () => {
    callBack(newDronerSelected)
  }

  const searchSection = (
    <div className='d-flex justify-content-start' style={{ padding: '10px' }}>
      <div className='col-lg-3 p-1'>
        <Input
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder='ค้นหาชื่อนักบินโดรน หรือเบอร์โทร'
          className='col-lg-12'
          onChange={(e: any) => setSearchTextDroner(e.target.value)}
        />
      </div>
      <div className='col-lg-2 p-1'>
        <Popover
          content={
            <>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                value={[distrance.min, distrance.max]}
                onChange={onChangeSlider}
                max={200}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: '0 16px',
                }}
                value={distrance.min}
                onChange={onChangeDistranceMin}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: '0 16px',
                }}
                id='max'
                value={distrance.max}
                onChange={onChangeDistranceMax}
              />
            </>
          }
          title='ระยะทาง (กิโลเมตร)'
          trigger='click'
          visible={visibleSlider}
          onVisibleChange={handleVisibleSlider}
          placement='bottom'
        >
          <Button className='col-lg-12'>เลือกระยะทาง</Button>
        </Popover>
      </div>
      <div className='col-lg-2 p-1'>
        <Dropdown
          overlay={ratingStar}
          trigger={['click']}
          className='col-lg-12'
          onVisibleChange={handleVisibleRating}
          visible={visibleRating}
        >
          <Button>
            เลือก Rating
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className='col-lg-2'>
        <Select
          allowClear
          className='col-lg-12 p-1'
          placeholder='เลือกสถานะ'
          onChange={onChangeStatusDroner}
        >
          <option value='สะดวก'>สะดวก</option>
          <option value='ไม่สะดวก'>ไม่สะดวก</option>
        </Select>
      </div>
      <div className='col-lg-1 p-1'>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: '5px',
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() =>
            fetchDronerList(searchTextDroner, statusDroner, rating?.ratingMin, rating?.ratingMax)
          }
        >
          ค้นหาข้อมูล
        </Button>
      </div>
    </div>
  )

  const columns = [
    {
      title: <></>,
      width: '4%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <input
                type='radio'
                onChange={(e) => handleSelectDroner(e, row)}
                checked={row.isChecked}
                style={{ width: '18px', height: '18px' }}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ชื่อนักบินโดรน',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        const tooltipTitle = (
          <>
            {'เคยให้บริการเกษตรกรท่านนี้,'}
            <br />
            {'คะแนนรีวิวล่าสุด '}
            <StarFilled style={{ color: '#FFCA37', fontSize: '16px' }} />{' '}
            {parseFloat(row.rating_avg).toFixed(1)}
          </>
        )
        return {
          children: (
            <>
              <span>{row.firstname + ' ' + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>
                {row.droner_code}
                {row.nickname && <ShowNickName data={row.nickname} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telephone_no',
      key: 'telephone_no',
    },
    {
      title: 'จำนวนให้บริการ',
      dataIndex: 'total_task',
      key: 'total_task',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.total_task == null ? 0 : row.total_task} งาน</span>
              <br />
              <span style={{ color: color.Grey }}>
                รวม {row.total_area == null ? 0 : row.total_area} ไร่
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating_avg',
      key: 'rating_avg',
      render: (value: any, row: any, index: number) => {
        const checkRating = () => {
          return row.rating_avg > 0 ? true : false
        }
        return {
          children: (
            <>
              {checkRating() ? (
                <Row>
                  <div style={{ color: '#FFCA37', fontSize: '16px' }}>
                    <StarFilled />
                  </div>
                  <span className='pt-2 ps-1'>
                    {parseFloat(row.rating_avg).toFixed(1)} ({row.count_rating})
                  </span>
                </Row>
              ) : (
                <p>-</p>
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'ตำบล/อำเภอ/จังหวัด',
      dataIndex: 'subdistrict_name',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.subdistrict_name ? <span>{row.subdistrict_name}/</span> : '-/'}
              {row.district_name ? <span>{row.district_name}/</span> : '-/'}
              {row.province_name ? <span>{row.province_name}</span> : '-'}
            </>
          ),
        }
      },
    },
    {
      title: 'ระยะทาง',
      dataIndex: 'distance',
      key: 'distance',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.distance.toFixed(0)} km</span>
            </>
          ),
        }
      },
    },
    {
      title: 'ยี่หัอ',
      dataIndex: 'brand',
      key: 'brand',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Avatar size={25} src={row.logo_drone_brand} style={{ marginRight: '5px' }} />
              <span>{row.drone_brand}</span>
              <br />
              {row.count_drone > 1 && (
                <p style={{ fontSize: '12px', color: color.Grey }}>(มากกว่า 1 ยี่ห้อ)</p>
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'สะดวก/ไม่สะดวก',
      dataIndex: 'droner_status',
      key: 'droner_status',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: row.droner_status == 'สะดวก' ? color.Success : color.Error,
                }}
              >
                <Badge color={row.droner_status == 'สะดวก' ? color.Success : color.Error} />{' '}
                {row.droner_status}
                <br />
              </span>
            </>
          ),
        }
      },
    },
  ]
  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
          >
            {title}
          </div>
        }
        width={1300}
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => {
              handleCallBack()
            }}
            disableSaveBtn={false}
          />,
        ]}
      >
        <Form>
          {searchSection}
          <CardContainer>
            <Table
              dataSource={dataDronerList}
              columns={columns}
              pagination={false}
              tableLayout='fixed'
              scroll={{ x: 'max-content', y: 300 }}
              rowKey={(data) => data.droner_id}
            />
          </CardContainer>
        </Form>
      </Modal>
    </>
  )
}
export default ModalSelectedDroner
