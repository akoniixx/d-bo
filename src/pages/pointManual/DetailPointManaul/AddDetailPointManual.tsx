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
import { RewardDatasource } from '../../../datasource/RewardDatasource'
import {
  CampaignConditionEntity,
  CampaignConditionEntity_INIT,
} from '../../../entities/CampaignPointEntites'
import { GetAllRewardEntities } from '../../../entities/RewardEntites'
import { color } from '../../../resource'
import { FarmerPageEntity } from '../../../entities/FarmerEntities'
import { TaskDatasource } from '../../../datasource/TaskDatasource'
import { ProviceEntity } from '../../../entities/LocationEntities'
import { LocationDatasource } from '../../../datasource/LocationDatasource'

const AddDetailPointManual = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [formTable] = Form.useForm()
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)
  const [dataSubMission, setDataSubMission] = useState<CampaignConditionEntity[]>([
    CampaignConditionEntity_INIT,
  ])
  const [count, setCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [row, setRow] = useState(10)
  const [farmerList, setFarmerList] = useState<any>()
  const [searchFarmer, setSearchFarmer] = useState<string>('')
  const [provinceListId, setProvinceListId] = useState<ProviceEntity[]>([])
  const [provinceList, setProvinceList] = useState<string[]>([])

  useEffect(() => {
    fetchTypeUserList(searchFarmer, provinceListId)
  }, [searchFarmer, provinceListId, currentPage, row])
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
  const fetchTypeUserList = (text?: string, dataProvice?: any) => {
    // const typeUser = form.getFieldsValue();
    //   console.log(typeUser)
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
  const handleInputChange = (inputValue: any) => {
    if (currentPage === 1) {
      setSearchFarmer(inputValue)
    }
    return inputValue
  }
  const handleMenuScrollToBottom = () => {
    if (row === farmerList.length) {
      setCurrentPage(currentPage)
      setRow(row + 10)
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
        nameUser: sTable[`${y.num}_nameUser`],
        point: sTable[`${y.num}_point`],
        task: sTable[`${y.num}_task`],
        taskNo: sTable[`${y.num}_taskNo`],
        description: sTable[`${y.num}_description`],
      }
    })
    return value
  }

  const mapForm = (e: any) => {
    const mapList = e
    mapList.map((y: any, i: number) => {
      formTable.setFieldValue(`${y.num}_nameUser`, y.nameUser)
      formTable.setFieldValue(`${y.num}_point`, y.point)
      formTable.setFieldValue(`${y.num}_task`, y.task)
      formTable.setFieldValue(`${y.num}_taskNo`, y.taskNo)
      formTable.setFieldValue(`${y.num}_description`, y.description)
    })
  }

  const newDataSubMission = useMemo(() => {
    if (dataSubMission.length > 0) {
      const d = dataSubMission.map((el: any, index: any) => {
        return {
          ...el,
          key: index + 1,
          num: index + 1,
        }
      })
      return d
    }
  }, [dataSubMission])

  const addRow = () => {
    setCount(count + 1)
    const addList = mapCondition([
      ...dataSubMission,
      { ...CampaignConditionEntity_INIT, num: dataSubMission.length + 1 },
    ])
    setDataSubMission(addList)
  }

  const removeRow = async (key: number) => {
    const mapData = await mapCondition(dataSubMission)
    const e = mapData.filter((x: any) => x.num !== key)
    const mData = await mapCondition(e)
    mapForm(mData)
    setDataSubMission(e)
    setCount(count - 1)
    formTable.setFieldValue(`${e.length + 1}_nameUser`, '')
    formTable.setFieldValue(`${e.length + 1}_point`, '')
    formTable.setFieldValue(`${e.length + 1}_task`, '')
    formTable.setFieldValue(`${e.length + 1}_taskNo`, '')
    formTable.setFieldValue(`${e.length + 1}_description`, '')
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
    const checkName = name.split('_')[1]
    const { value: inputValue } = e.target
    if (checkName === 'taskNo') {
      const allowedCharacters = inputValue.replace(/[^0-9A-Za-z.]/g, '')
      const convertedValue = allowedCharacters.replace(/^(\d*\.\d{0,2}).*$/, '$1')
      formTable.setFieldsValue({ [name]: convertedValue })
    } else {
      const withoutDecimal = inputValue.replace(/[^0-9]/g, '')
      const convertedNumber = withoutDecimal.replace(/^0+(\d*)/, '$1')
      formTable.setFieldsValue({ [name]: convertedNumber })
    }
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
              name={`${row.num}_nameUser`}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อผู้ใช้',
                },
              ]}
            >
              <Select
                placeholder='กรุณาเลือกเกษตรกร'
                isSearchable
                isClearable
                onInputChange={handleInputChange}
                options={farmerList}
                value={farmerList}
                onMenuScrollToBottom={handleMenuScrollToBottom}
                closeMenuOnSelect={false}
              />
            </Form.Item>
          ),
        }
      },
    },
    {
      title: 'จำนวนแต้ม',
      dataIndex: 'point',
      width: '20%',
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
              <Form.Item name={`${row.num}_task`} style={{ margin: 0 }}>
                <Radio.Group>
                  <Radio value='YES'>ไม่มี</Radio>
                  <Radio value='NO'>มี</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                name={`${row.num}_taskNo`}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรหัส Task No.',
                  },
                ]}
              >
                <Input
                  placeholder='กรอกรหัส Task No.'
                  onChange={(e) => checkNumber(e, `${row.num}_taskNo`)}
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
    const dataSub: any = newDataSubMission
    const fs = formTable.getFieldsValue()
    const condition: any = dataSub?.map((y: any, i: number) => {
      const filterIdUser = fs[`${y.num}_nameUser`]
      return {
        num: i + 1,
        nameUser: filterIdUser ? filterIdUser.id : null,
        point: fs[`${y.num}_point`],
        task: fs[`${y.num}_task`],
        taskNo: fs[`${y.num}_taskNo`],
        description: fs[`${y.num}_description`],
      }
    })
    let fieldErr: boolean = true
    let fieldNull: boolean = true
    condition.length > 0 &&
    condition.every(
      (item: any) =>
        item &&
        item.nameUser &&
        item.point &&
        item.task &&
        item.taskNo &&
        item.num &&
        !checkLimit(),
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
          <Form.Item style={{ margin: 0 }} name={`${recode.num}_description`}>
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
          dataSource={newDataSubMission}
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

  const submit = async () => {}

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
            <Radio.Group className='d-flex flex-row'>
              <Radio value='FARMER'>เกษตรกร</Radio>
              <Radio value='DRONER'>นักบินโดรน</Radio>
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
          disableSaveBtn={saveBtnDisable}
        />
      </div>
    </>
  )
}

export default AddDetailPointManual