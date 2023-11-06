import { DeleteOutlined, DownCircleFilled, UpCircleFilled } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, Radio, Row, Table } from 'antd'
import Select, { Props as SelectProps } from 'react-select'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionButton from '../../../components/button/ActionButton'
import { BackIconButton } from '../../../components/button/BackButton'
import { CardContainer } from '../../../components/card/CardContainer'
import FooterPage from '../../../components/footer/FooterPage'
import { CardHeader } from '../../../components/header/CardHearder'
import { color } from '../../../resource'
import { FarmerPageEntity } from '../../../entities/FarmerEntities'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import { ProviceEntity } from '../../../entities/LocationEntities'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import { TaskFinishedDatasource } from '../../../datasource/TaskFinishDatasource'
import { DronerDatasource } from '../../../datasource/DronerDatasource'
import { DronerListEntity } from '../../../entities/DronerEntities'
import {
  SpecialPointConditionEntity,
  SpecialPointConditionEntity_INIT,
} from '../../../entities/SpecialListEntities'
import { SpecialPointListDataSource } from '../../../datasource/SpecialPointDatasource'
import Swal from 'sweetalert2'

const AddDetailPointManual = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [formTable] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [dataSubSpecial, setDataSubSpecial] = useState<SpecialPointConditionEntity[]>([
    SpecialPointConditionEntity_INIT,
  ])
  const [count, setCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [row, setRow] = useState(10)
  const [rowTask, setRowTask] = useState(10)
  const [farmerList, setFarmerList] = useState<any>()
  const [dronerList, setDronerList] = useState<any>()
  const [searchFarmer, setSearchFarmer] = useState<string>('')
  const [searchDroner, setSearchDroner] = useState<string>('')
  const [searchTask, setSearchTask] = useState<string>('')
  const [selectedTask, setSelectedTask] = useState<any>()
  const [provinceListId, setProvinceListId] = useState<ProviceEntity[]>([])
  const [provinceList, setProvinceList] = useState<string[]>([])
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [checkTask, setCheckTask] = useState<any>()
  const [taskList, setTaskList] = useState<any>()
  const [currentTask, setCurrentTask] = useState(1)
  const [isDroner, setIsDroner] = useState<boolean>()
  const [userId, setUserId] = useState<any>()

  useEffect(() => {
    // fetchFarmer(searchFarmer, provinceListId)
    // fetchDroner(searchDroner, provinceListId)
    if(isDroner === true){
      fetchDroner(searchDroner, provinceListId)
    }else{
      fetchFarmer(searchFarmer, provinceListId)}
    if (checkTask === 'YES' || userId) {
      getTaskStatusDone()
    }
  }, [searchFarmer, provinceListId, currentPage, row, searchTask, rowTask])
  useEffect(() => {
    getProvince()
  }, [])
  const getProvince = async () => {
    await LocationDatasource.getProvince()
      .then((res) => {
        setProvinceList(res.map((item: any) => (item.provinceName ? item.provinceName : '-')))
        setProvinceListId(res)
      })
      .catch((err) => console.log(err))
  }
  const fetchFarmer = (text?: string, dataProvice?: any) => {
    TaskDatasource.getFarmerListTask(text, currentPage, text ? 0 : row).then(
      (res: FarmerPageEntity) => {
        const data = res.data.map((x: any) => {
          const res = { ...x, provinceName: '' }
          return res
        })
        const mapData = data.map((x) => {
          if (x.address && x.address.provinceId) {
            const matching = dataProvice.find(
              (i: any) => `${i.provinceId}` === `${x.address.provinceId}`,
            )
            if (matching) {
              return { ...x, provinceName: matching.provinceName }
            }
          }

          return {
            ...x,
            provinceName: x.provinceName,
          }
        })

        const result = mapData.map((item) => {
          return {
            ...item,
            label:
              item.firstname +
              ' ' +
              item.lastname +
              ' | ' +
              item.telephoneNo +
              ' | ' +
              (item.provinceName ? item.provinceName : '-'),
            value: item.id,
          }
        })
        setFarmerList(result)
      },
    )
  }
  const fetchDroner = (text?: string, dataProvice?: any) => {
    DronerDatasource.getDronerList([], [], [], currentPage, row, ['ACTIVE']).then(
      (res: DronerListEntity) => {
        const data = res.data.map((x: any) => {
          const res = { ...x, provinceName: '' }
          return res
        })
        const mapData = data.map((x) => {
          if (x.address && x.address.provinceId) {
            const matching = dataProvice.find(
              (i: any) => `${i.provinceId}` === `${x.address.provinceId}`,
            )
            if (matching) {
              return { ...x, provinceName: matching.provinceName }
            }
          }

          return {
            ...x,
            provinceName: x.provinceName,
          }
        })

        const result = mapData.map((item) => {
          return {
            ...item,
            label:
              item.firstname +
              ' ' +
              item.lastname +
              ' | ' +
              item.telephoneNo +
              ' | ' +
              (item.provinceName ? item.provinceName : '-'),
            value: item.id,
          }
        })
        setDronerList(result)
      },
    )
  }
  const getTaskStatusDone = async () => {
    const id = userId && userId.id
    await TaskFinishedDatasource.getTaskFinishList(
      currentTask,
      rowTask,
      'DONE',
      id ? userId.telephoneNo : '',
    ).then((res) => {
      setTaskList(res.data)
    })
  }
  const options =
    taskList &&
    taskList.map((task: any) => ({
      label: task.taskNo,
      value: task.id,
    }))

  const handleInputChange = (inputValue: any) => {
    if (currentPage === 1) {
      setSearchFarmer(inputValue)
    }
    return inputValue
  }
  const handleInputTask = (inputValue: any) => {
    if (currentTask === 1) {
      setSearchTask(inputValue)
    }
    return inputValue
  }
  const handleMenuScrollToBottom = () => {
    if (row === farmerList.length) {
      setCurrentPage(currentPage)
      setRow(row + 10)
    }
  }
  const handleMenuScrollTask = () => {
    if (rowTask === taskList.length) {
      setCurrentTask(currentTask)
      setRowTask(rowTask + 10)
    }
  }
  const countExpand = () => {
    const allCount = []
    for (let i = 0; 50 > i; i++) {
      allCount.push(i + 1)
    }
    return allCount
  }

  const mapCondition = (e: any) => {
    const mapList = e
    const sTable = formTable.getFieldsValue()
    const value = mapList.map((y: any, i: number) => {
      return {
        ...y,
        num: i + 1,
        farmer: sTable[`${y.num}_Farmer`],
        droner: sTable[`${y.num}_Droner`],
        point: sTable[`${y.num}_point`],
        taskNo: sTable[`${y.num}_taskNo`],
        taskId: sTable[`${y.num}_taskNo`],
        reason: sTable[`${y.num}_reason`],
      }
    })
    return value
  }

  const mapForm = (e: any) => {
    const mapList = e
    console.log(mapList)
    mapList.map((y: any, i: number) => {
      console.log(y)
      formTable.setFieldValue(`${y.num}_Farmer`, y.farmer)
      formTable.setFieldValue(`${y.num}_Droner`, y.droner)
      formTable.setFieldValue(`${y.num}_point`, y.point)
      formTable.setFieldValue(`${y.num}_taskNo`, y.taskNo)
      formTable.setFieldValue(`${y.num}_taskNo`, y.taskId)
      formTable.setFieldValue(`${y.num}_reason`, y.reason)
    })
  }

  const newDataSubSpecial = useMemo(() => {
    if (dataSubSpecial.length > 0) {
      const d = dataSubSpecial.map((el: any, index: any) => {
        return {
          ...el,
          key: index + 1,
          num: index + 1,
        }
      })
      return d
    }
  }, [dataSubSpecial])

  const addRow = () => {
    setCount(count + 1)
    const addList = mapCondition([
      ...dataSubSpecial,
      { ...SpecialPointConditionEntity_INIT, num: dataSubSpecial.length + 1 },
    ])
    setDataSubSpecial(addList)
  }

  const removeRow = async (key: number) => {
    const mapData = await mapCondition(dataSubSpecial)
    const e = mapData.filter((x: any) => x.num !== key)
    const mData = await mapCondition(e)
    mapForm(mData)
    setDataSubSpecial(e)
    setCount(count - 1)
    formTable.setFieldValue(`${e.length + 1}_nameUser`, '')
    formTable.setFieldValue(`${e.length + 1}_point`, '')
    formTable.setFieldValue(`${e.length + 1}_taskNo`, '')
    formTable.setFieldValue(`${e.length + 1}_reason`, '')
  }

  const checkLimit = () => {
    const v = formTable.getFieldsValue()
    const d = []
    if (count > 1) {
      for (let i = 0; count > i; i++) {
        d.push(parseFloat(v[`${i + 1}_point`]))
      }
    }
    if (d.length > 0) {
      if (d[0] < d[1] && d[d.length - 2] <= d[d.length - 1]) {
        return false
      } else {
        return true
      }
    }
  }
  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value: inputValue } = e.target
    const withoutDecimal = inputValue.replace(/[^0-9]/g, '')
    const convertedNumber = withoutDecimal.replace(/^0+(\d*)/, '$1')
    formTable.setFieldsValue({ [name]: convertedNumber })
  }
  const handleSelectUsers = (id?: any) => {
    getTaskStatusDone()
    setUserId(id)
  }
  const columns = [
    {
      title: '',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{index + 1}</span>,
        }
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: 'ชื่อผู้ใช้',
      width: '30%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={isDroner === true ? `${row.num}_Droner` : `${row.num}_Farmer`}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อผู้ใช้',
                },
              ]}
            >
              <Select
                placeholder='กรุณาเลือกชื่อผู้ใช้'
                isSearchable
                isClearable
                onInputChange={handleInputChange}
                options={isDroner === false ? farmerList : dronerList}
                value={isDroner === false ? farmerList : dronerList}
                onMenuScrollToBottom={handleMenuScrollToBottom}
                onChange={(selectedOptions: any) => {
                  selectedOptions ? getTaskStatusDone() : null
                  handleSelectUsers(selectedOptions)
                }}
                closeMenuOnSelect
              />
            </Form.Item>
          ),
        }
      },
    },
    {
      title: 'จำนวนแต้ม',
      dataIndex: 'point',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={`${row.num}_point`}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกจำนวนแต้ม',
                },
              ]}
            >
              <Input
                placeholder='กรอกจำนวนแต้ม'
                suffix='แต้ม'
                autoComplete='off'
                onChange={(e) => checkNumber(e, `${row.num}_point`)}
              />
            </Form.Item>
          ),
        }
      },
    },
    {
      title: 'งานที่เกี่ยวข้อง (เฉพาะงานที่รีวิวแล้วเท่านั้น)',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex'>
              {/* <Form.Item style={{ margin: 0 }}>
                <Radio.Group
                  onChange={(e) => {
                    e.target.value === 'YES' ? getTaskStatusDone() : null
                    setCheckTask(e.target.value)
                  }}
                >
                  <Radio key={1} value='NO'>
                    ไม่มี
                  </Radio>
                  <Radio key={2} value='YES'>
                    มี
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                className='col-lg-12'
                style={{ margin: 0, width: '65%' }}
                name={`${row.num}_taskNo`}
                rules={[
                  {
                    required: checkTask === 'YES',
                    message: 'กรุณากรอกรหัส Task No.',
                  },
                ]}
              >
                <Select
                  isDisabled={checkTask !== 'YES'}
                  placeholder='กรอกรหัส Task No.'
                  isSearchable
                  isClearable={checkTask === 'NO'}
                  onInputChange={handleInputTask}
                  options={options}
                  value={checkTask === 'NO' ? undefined : selectedTask}
                  onMenuScrollToBottom={handleMenuScrollTask}
                  closeMenuOnSelect
                  onChange={(selectedOption) => {
                    setSelectedTask(checkTask === 'YES' ? selectedOption : undefined)
                  }}
                />
              </Form.Item> */}
              <Form.Item style={{ margin: 0 }}>
                <Radio.Group
                  onChange={(e) => {
                    if (e.target.value === 'NO') {
                      // Clear the selectedTask state when 'NO' is selected
                      setSelectedTask(undefined)
                    } else if (e.target.value === 'YES') {
                      getTaskStatusDone()
                    }
                    setCheckTask(e.target.value)
                  }}
                >
                  <Radio key={1} value='NO'>
                    ไม่มี
                  </Radio>
                  <Radio key={2} value='YES'>
                    มี
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                className='col-lg-12'
                style={{ margin: 0, width: '65%' }}
                name={`${row.num}_taskNo`}
                rules={[
                  {
                    required: checkTask === 'YES',
                    message: 'กรุณากรอกรหัส Task No.',
                  },
                ]}
              >
                <Select
                  isDisabled={checkTask !== 'YES'}
                  placeholder='กรอกรหัส Task No.'
                  isSearchable
                  isClearable={checkTask === 'NO'}
                  onInputChange={handleInputTask}
                  options={options}
                  value={checkTask === 'NO' ? undefined : selectedTask}
                  onMenuScrollToBottom={handleMenuScrollTask}
                  closeMenuOnSelect
                  onChange={(selectedOption) => {
                    setSelectedTask(checkTask === 'YES' ? selectedOption : undefined)
                  }}
                />
              </Form.Item>
            </div>
          ),
        }
      },
    },
    {
      title: '',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex flex-row justify-content-center'>
              <div className='col-lg-3'>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={count > 1 ? color.Error : color.Grey}
                  actionDisable={count > 1 ? false : true}
                  onClick={() => removeRow(row.num)}
                />
              </div>
            </div>
          ),
        }
      },
    },
  ]
  const onFieldsChange = () => {
    const typeUser = form.getFieldsValue()
    const dataSub: any = newDataSubSpecial
    const fs = formTable.getFieldsValue()
    const condition: any = dataSub?.map((y: any, i: number) => {
      return {
        num: i + 1,
        farmer: (isDroner === false && userId?.id) || undefined,
        droner: (isDroner === true && userId?.id) || undefined,
        point: fs[`${y.num}_point`],
        taskNo: checkTask === 'YES' ? fs[`${y.num}_taskNo`] : undefined,
        taskId: checkTask === 'YES' ? fs[`${y.num}_taskNo`] : undefined,
      }
    })
    let fieldErr: boolean = true
    let fieldNull: boolean = true
    condition.length > 0 &&
    condition.every(
      (item: any) =>
        item && (item.farmer || item.droner) && item.point && item.num && !checkLimit(),
    )
      ? (fieldNull = false)
      : (fieldNull = true)

    if (typeUser) {
      fieldErr = false
    } else {
      fieldErr = true
    }
    setBtnSaveDisable(fieldErr || fieldNull)
  }
  const subMissionTextArea = (recode: any) => {
    return (
      <Row justify={'space-between'} gutter={16}>
        <Col span={24}>
          <label>หมายเหตุ</label>
          <Form.Item style={{ margin: 0 }} name={`${recode.num}_reason`}>
            <TextArea placeholder='กรอกรายหมายเหตุ' rows={4} />
          </Form.Item>
        </Col>
      </Row>
    )
  }

  const subMission = (
    <>
      <Row className='pb-3'>
        <Col span={21}>
          <label>รายชื่อผู้ใช้</label>
        </Col>
        <Col span={3}>
          <Button
            style={{
              borderColor: 'rgba(33, 150, 83, 0.1)',
              borderRadius: '5px',
              color: color.Success,
              backgroundColor: 'rgba(33, 150, 83, 0.1)',
            }}
            onClick={() => addRow()}
          >
            + เพิ่มชื่อผู้ใช้
          </Button>
        </Col>
      </Row>
      <Form form={formTable} onFieldsChange={onFieldsChange}>
        <Table
          columns={columns}
          dataSource={newDataSubSpecial}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => subMissionTextArea(record),
            defaultExpandedRowKeys: countExpand(),
            expandIcon: ({ expanded, onExpand, record }) => {
              return expanded ? (
                <UpCircleFilled
                  className='pb-2'
                  style={{ fontSize: '20px', color: '#A9CB62' }}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <DownCircleFilled
                  className='pb-2'
                  style={{ fontSize: '20px', color: '#A9CB62' }}
                  onClick={(e) => onExpand(record, e)}
                />
              )
            },
          }}
        />
      </Form>
    </>
  )

  const submit = async () => {
    await form.validateFields()
    await formTable.validateFields()
    const specialPointId: any = localStorage.getItem('specialPointId')
    const create: any = {}
    const fs = formTable.getFieldsValue()
    const dataSub: any = newDataSubSpecial
    const specialPointList = dataSub?.map((y: any, i: number) => {
      return {
        farmer: (isDroner === false && userId.id) || undefined,
        droner: (isDroner === true && userId.id) || undefined,
        point: fs[`${y.num}_point`],
        taskNo: (checkTask === 'YES' && fs[`${y.num}_taskNo`].label) || undefined,
        taskId: (checkTask === 'YES' && fs[`${y.num}_taskNo`].value) || undefined,
        reason: fs[`${y.num}_reason`],
      }
    })
    create.isDroner = isDroner
    create.specialPointId = specialPointId
    create.specialPointList = specialPointList
    create.createBy = profile.firstname + ' ' + profile.lastname
    console.log(create)
    // await SpecialPointListDataSource.insertSpecialPointList(create).then((res)=> {
    //   console.log(res)
    //   if (res.success) {
    //     Swal.fire({
    //       title: 'บันทึกสำเร็จ',
    //       icon: 'success',
    //       timer: 1500,
    //       showConfirmButton: false,
    //     }).then(() => {
    //       // navigate('/DetailPointManual')
    //     })
    //   }
    // })
  }

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>เพิ่มแต้มพิเศษ</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='รายละแต้มพิเศษ' />
        <Form style={{ padding: '32px' }} form={form} onFieldsChange={onFieldsChange}>
          <label>
            ประเภทผู้ใช้งาน <span style={{ color: color.Error }}>*</span>
          </label>
          <Form.Item
            name='typeUser'
            rules={[
              {
                required: true,
                message: 'กรุณาเลือกประเภทผู้ใช้งาน',
              },
            ]}
          >
            <Radio.Group onChange={(e) => {
              console.log(e.target.value)
              if(e.target.value === true){
                fetchDroner(searchDroner, provinceListId)
              }else{
                fetchFarmer(searchFarmer, provinceListId)
              }
              setIsDroner(e.target.value)}
              } className='d-flex flex-row'>
              <Radio value={false}>เกษตรกร</Radio>
              <Radio value={true}>นักบินโดรน</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          {subMission}
        </Form>
      </CardContainer>
      <div className='pt-3'>
        <FooterPage
          onClickBack={() => navigate(-1)}
          styleFooter={{ padding: '6px' }}
          onClickSave={() => submit()}
          // disableSaveBtn={saveBtnDisable}
        />
      </div>
    </>
  )
}

export default AddDetailPointManual
