import { DeleteOutlined, StarFilled } from '@ant-design/icons'
import { Avatar, Badge, Form, Modal, Row, Table } from 'antd'
import React, { useState } from 'react'
import { displayName } from 'react-quill'
import { TaskDronerTempEntity } from '../../../../entities/TaskDronerTemp'
import { color } from '../../../../resource'
import ActionButton from '../../../button/ActionButton'
import { CardContainer } from '../../../card/CardContainer'
import FooterPage from '../../../footer/FooterPage'
interface ModalSelectedEditDronerProps {
  show: boolean
  backButton: () => void
  dataDroner: TaskDronerTempEntity[]
  title: string
  callBack: (data: TaskDronerTempEntity[]) => void
}
const ModalSelectedEditDroner: React.FC<ModalSelectedEditDronerProps> = ({
  show,
  backButton,
  dataDroner,
  title,
  callBack,
}) => {
  const checkDup = Array.from(new Set(dataDroner)).filter((x) => x.dronerId != '')
  const [data, setData] = useState<TaskDronerTempEntity[]>(checkDup)
  const removeDroner = (e: any) => {
    const d = data.filter((x) => x.dronerId != e.droner_id)
    setData(d)
  }
  const handelCallBack = () => {
    callBack(data)
  }

  const columns = [
    {
      title: 'ชื่อนักบินโดรน',
      width: '15%',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (value: any, row: any, index: number) => {
        const data = JSON.parse(row.dronerDetail[0])
        return {
          children: (
            <>
              <span key={index}>{data.firstname + ' ' + data.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}></span>
            </>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telephone_no',
      key: 'telephone_no',
      render: (value: any, row: any, index: number) => {
        const data = JSON.parse(row.dronerDetail[0])
        return {
          children: (
            <>
              <span key={index}>{data.telephone_no}</span>
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
        const data = JSON.parse(row.dronerDetail[0])
        const checkRating = () => {
          return data.rating_avg > 0 ? true : false
        }
        return {
          children: (
            <>
              {checkRating() ? (
                <Row key={index}>
                  <div style={{ color: '#FFCA37', fontSize: '16px' }}>
                    <StarFilled />
                  </div>
                  <span className='pt-2 ps-1'>{parseFloat(data.rating_avg).toFixed(1)}</span>
                </Row>
              ) : (
                '-'
              )}
            </>
          ),
        }
      },
    },
    {
      title: 'ตำบล/อำเภอ/จังหวัด',
      dataIndex: 'subdistrict_name',
      key: 'subdistrict_name',
      render: (value: any, row: any, index: number) => {
        const data = JSON.parse(row.dronerDetail[0])
        return {
          children: (
            <>
              {data.subdistrict_name && <span key={index}>{data.subdistrict_name}/</span>}
              {data.district_name && <span key={index}>{data.district_name}/</span>}
              {data.province_name && <span key={index}>{data.province_name}</span>}
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
              <span>{parseFloat(row.distance).toFixed(0)} km</span>
            </>
          ),
        }
      },
    },
    {
      title: 'ยี่หัอ',
      dataIndex: 'role',
      key: 'role',
      render: (value: any, row: any, index: number) => {
        const data = JSON.parse(row.dronerDetail[0])
        return {
          children: (
            <>
              <Avatar
                key={index}
                size={25}
                src={data.logo_drone_brand}
                style={{ marginRight: '5px' }}
              />
              {data.drone_brand}
              <br />
              <p style={{ fontSize: '12px', color: color.Grey }}>
                {data.count_drone > 1 && '(มากกว่า 1 ยี่หัอ)'}
              </p>
            </>
          ),
        }
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'droner_status',
      key: 'droner_status',
      render: (value: any, row: any, index: number) => {
        const data = JSON.parse(row.dronerDetail[0])
        return {
          children: (
            <>
              <span
                style={{
                  color: data.droner_status == 'สะดวก' ? color.Success : color.Error,
                }}
                key={index}
              >
                <Badge color={data.droner_status == 'สะดวก' ? color.Success : color.Error} />{' '}
                {data.droner_status}
                <br />
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'สถานะนักบิน',
      dataIndex: 'status',
      key: 'status',
      render: (value: any, row: any, index: number) => {
        const STATUS_MAPPING: any = {
          WAIT_RECEIVE: 'รอรับงาน',
          REJECTED: 'ไม่รับงาน',
          CANCELED: 'ยกเลิก',
        }
        return {
          children: (
            <>
              <span
                style={{
                  color: row.status == 'WAIT_RECEIVE' ? color.Warning : color.Error,
                }}
              >
                <Badge color={row.status == 'WAIT_RECEIVE' ? color.Warning : color.Error} />{' '}
                {STATUS_MAPPING[row.status]}
                <br />
              </span>
            </>
          ),
        }
      },
    },
    {
      title: '',
      width: '7%',
      render: (value: any, row: any, index: number) => {
        const data = JSON.parse(row.dronerDetail[0])
        return {
          children: (
            <div className='d-flex flex-row justify-content-between' key={index}>
              {row.status != 'REJECTED' && (
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => removeDroner(data)}
                />
              )}
            </div>
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
            onClickSave={() => handelCallBack()}
            disableSaveBtn={false}
          />,
        ]}
      >
        <Form>
          <CardContainer>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              size='large'
              tableLayout='fixed'
              rowKey={(data) => data.id}
            />
          </CardContainer>
        </Form>
      </Modal>
    </>
  )
}
export default ModalSelectedEditDroner
