import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons'
import { Col, Divider, Form, Input, Radio, Row, Table } from 'antd'
import Select from 'react-select'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIconButton } from '../../../components/button/BackButton'
import { CardContainer } from '../../../components/card/CardContainer'
import FooterPage from '../../../components/footer/FooterPage'
import { CardHeader } from '../../../components/header/CardHearder'
import { color } from '../../../resource'
import { LocationDatasource } from '../../../datasource/LocationDatasource'
import { SpecialPointListDataSource } from '../../../datasource/SpecialPointDatasource'
import _ from 'lodash'
import {
  SpecialPointConditionEntity,
  SpecialPointConditionEntity_INIT,
} from '../../../entities/SpecialListEntities'
import { DronerDatasource } from '../../../datasource/DronerDatasource'
import { FarmerDatasource } from '../../../datasource/FarmerDatasource'
import Swal from 'sweetalert2'
import { TaskFinishedDatasource } from '../../../datasource/TaskFinishDatasource'

const EditDetailPointManual = () => {
  const navigate = useNavigate()
  const queryString = _.split(window.location.pathname, '=')
  const specialPointId = queryString[1]
  const [form] = Form.useForm()
  const [formTable] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [dataSubSpecial, setDataSubSpecial] = useState<SpecialPointConditionEntity[]>([
    SpecialPointConditionEntity_INIT,
  ])
  const [taskList, setTaskList] = useState<any>()
  const [currentTask, setCurrentTask] = useState(1)
  const [rowTask, setRowTask] = useState(10)
  const [checkTask, setCheckTask] = useState<boolean>()
  const [searchTask, setSearchTask] = useState<string>('')
  const [selectedTask, setSelectedTask] = useState<any>()
  const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
  const [editData, setEditData] = useState<any>()
  const [tel, setTel] = useState<any>()
  useEffect(() => {
    getSpecialPointById()
    getTaskStatusDone()
  }, [tel, rowTask, searchTask])

  const getSpecialPointById = async () => {
    await SpecialPointListDataSource.getSpecialPointListById(specialPointId).then((res) => {
      if (res) {
        getInfoUserManual(res)
        const mapKey = res
        setDataSubSpecial([mapKey])
        setEditData(res)
        form.setFieldsValue({
          status: res.status,
          user: res.dronerId ? 'นักบินโดรน' : 'เกษตรกร',
        })
        formTable.setFieldsValue({
          user: res.dronerId ? 'นักบินโดรน' : 'เกษตรกร',
          point: res.point,
          reason: res.reason,
          taskNo: res.taskNo ? { value: res.taskId, label: res.taskNo } : undefined,
          taskId: res.taskId || undefined,
          checkTaskNo: res.taskId ? true : false,
        })
      }
    })
  }
  const getInfoUserManual = async (data: any) => {
    const mapData = [data]
    let result: any
    if (data.farmerId) {
      result = await Promise.all(
        mapData.map(async (item: any, index: number) => {
          const farmer = await FarmerDatasource.getFarmerById(item.farmerId)
          setTel(farmer.telephoneNo)
          const province = await LocationDatasource.getSubdistrict(farmer.address.districtId)
          return {
            id: item.id,
            farmerId: item.farmerId,
            firstname: farmer.firstname,
            lastname: farmer.lastname,
            tel: farmer.telephoneNo,
            provinceName: province[0].provinceName,
          }
        }),
      )
    } else {
      result = await Promise.all(
        mapData.map(async (item: any, index: number) => {
          const droner = await DronerDatasource.getDronerByID(item.dronerId)
          setTel(droner.telephoneNo)
          const province = await LocationDatasource.getSubdistrict(droner.address.districtId)
          return {
            id: item.id,
            farmerId: item.dronerId,
            firstname: droner.firstname,
            lastname: droner.lastname,
            tel: droner.telephoneNo,
            provinceName: province ? province[0].provinceName : '-',
          }
        }),
      )
    }
    formTable.setFieldValue(
      'user',
      result.map((item: any) => {
        return {
          value: item.farmerId,
          label:
            item.firstname +
            ' ' +
            item.lastname +
            ' | ' +
            item.tel +
            ' | จังหวัด ' +
            item.provinceName,
          id: item.id,
        }
      }),
    )
  }
  const getTaskStatusDone = async () => {
    await TaskFinishedDatasource.getTaskManual(
      editData.dronerId ? editData.dronerId : editData.farmerId,
      editData.dronerId ? 'DRONER' : 'FARMER',
      currentTask,
      rowTask,
    ).then((res) => {
      setTaskList(res.data)
    })
  }
  const options = taskList?.map((task: any) => ({
    label: task.taskNo,
    value: task.id,
  }))

  const handleInputTask = (inputValue: any) => {
    if (currentTask === 1) {
      setSearchTask(inputValue)
    }
    return inputValue
  }
  const handleMenuScrollTask = () => {
    if (rowTask === taskList.length) {
      setCurrentTask(currentTask)
      setRowTask(rowTask + 10)
    }
  }
  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value: inputValue } = e.target
    const withoutDecimal = inputValue.replace(/[^0-9]/g, '')
    const convertedNumber = withoutDecimal.replace(/^0+(\d*)/, '$1')
    formTable.setFieldsValue({ [name]: convertedNumber })
  }

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{index + 1}</span>,
        }
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: 'ชื่อผู้ใช้',
      dataIndex: 'farmerId',
      key: 'farmerId',
      width: '30%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item className='col-lg-12' style={{ margin: 0, width: '100%' }} name='user'>
              <Select isDisabled />
            </Form.Item>
          ),
        }
      },
    },
    {
      title: 'จำนวนแต้ม',
      dataIndex: 'point',
      key: 'point',
      width: '20%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              key={index}
              style={{ margin: 0 }}
              name='point'
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
                onChange={(e) => checkNumber(e, 'point')}
              />
            </Form.Item>
          ),
        }
      },
    },
    {
      title: 'งานที่เกี่ยวข้อง (เฉพาะงานที่รีวิวแล้วเท่านั้น)',
      dataIndex: 'taskNo',
      key: 'taskNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className='d-flex'>
              <Form.Item name='checkTaskNo' style={{ margin: 0 }}>
                <Radio.Group
                  onChange={(e) => {
                    if (e.target.value === false) {
                      formTable.setFieldValue('taskNo', undefined)
                    }
                    setCheckTask(e.target.value)
                    onFieldsChange()
                  }}
                >
                  <Radio value={false}>ไม่มี</Radio>
                  <Radio value={true}>มี</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item className='col-lg-12' style={{ margin: 0, width: '65%' }} name='taskNo'>
                <Select
                  isDisabled={!formTable.getFieldValue('checkTaskNo')}
                  placeholder='กรอกรหัส Task No.'
                  isSearchable
                  isClearable
                  onInputChange={handleInputTask}
                  options={options || []}
                  onMenuScrollToBottom={handleMenuScrollTask}
                  closeMenuOnSelect
                  onChange={(selectedOption) => {
                    setSelectedTask(selectedOption)
                  }}
                />
              </Form.Item>
            </div>
          ),
        }
      },
    },
  ]
  const onFieldsChange = () => {
    const fs = formTable.getFieldsValue()
    let fieldErr = true
    let formErr = true
    if (formTable.getFieldError('taskNo').length === 0) {
      formErr = false
    } else {
      formErr = true
    }

    if (fs.point) {
      fieldErr = false
    } else {
      fieldErr = true
    }
    setBtnSaveDisable(fieldErr || formErr || form.getFieldValue('status') !== 'SUCCESS')
  }
  const subMissionTextArea = (recode: any) => {
    return (
      <Row justify={'space-between'} gutter={16}>
        <Col span={24}>
          <label>หมายเหตุ</label>
          <Form.Item style={{ margin: 0 }} name='reason'>
            <TextArea placeholder='กรอกรายหมายเหตุ' rows={4} />
          </Form.Item>
        </Col>
      </Row>
    )
  }
  const countExpand = () => {
    const allCount = []
    for (let i = 0; 50 > i; i++) {
      allCount.push(i + 1)
    }
    return allCount
  }
  const subMission = (
    <>
      <Row className='pb-3'>
        <Col span={21}>
          <label>รายชื่อผู้ใช้</label>
        </Col>
      </Row>
      <Form form={formTable} onFieldsChange={onFieldsChange}>
        <Table
          columns={columns}
          dataSource={dataSubSpecial}
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submit = async () => {
    await form.validateFields()
    await formTable.validateFields()
    const create: any = {}
    const fs = formTable.getFieldsValue()
    create.id = specialPointId
    create.point = fs.point
    create.reason = fs.reason
    create.taskId = fs.taskNo?.value
    create.taskNo = fs.taskNo?.label
    create.createBy = profile.firstname + ' ' + profile.lastname
    await SpecialPointListDataSource.updateToSuccess(create).then((res) => {
      if (res) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(-1)
        })
      }
    })
  }

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>แก้ไขแต้มพิเศษ</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='รายละแต้มพิเศษ' />
        <Form style={{ padding: '32px' }} form={form} onFieldsChange={onFieldsChange}>
          <div className='row'>
            <Form.Item name='user' className='col-lg-2'>
              <label style={{ fontWeight: '500' }}>
                ประเภทผู้ใช้งาน <span style={{ color: color.Error }}>*</span>
              </label>
              <p className='pt-2'>{form.getFieldValue('user')}</p>
            </Form.Item>

            <div className='col-lg'>
              <label style={{ fontWeight: '500' }}>
                สถานะ <span style={{ color: color.Error }}>*</span>
              </label>
              <Form.Item
                name='status'
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกประเภทผู้ใช้งาน',
                  },
                ]}
              >
                <Radio.Group className='d-flex flex-row'>
                  <Radio value='PENDING'>รอรับแต้ม</Radio>
                  <Radio value='SUCCESS'>ได้รับแต้ม</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <Divider />
          {subMission}
        </Form>
      </CardContainer>
      <div className='pt-3'>
        <FooterPage
          onClickBack={() => navigate(-1)}
          styleFooter={{ padding: '6px' }}
          onClickSave={() => submit()}
          disableSaveBtn={saveBtnDisable}
        />
      </div>
    </>
  )
}

export default EditDetailPointManual
