import React, { useEffect, useState } from 'react'
import { Modal, Pagination, Table } from 'antd'
import { color } from '../../resource'
import { numberWithCommas } from '../../utilities/TextFormatter'
import { AllHistoryFarmerPlotEntity, FarmerPlotEntity } from '../../entities/FarmerPlotEntities'
import { FarmerPlotDatasource } from '../../datasource/FarmerPlotDatasource'
import moment from 'moment'
import { LeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const NewTableStyle = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(232, 236, 243, 1) !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`

const ModalNewStyle = styled(Modal)`
  .ant-modal-body {
    padding: 0px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }
`
interface ModalHistoryProps {
  show: boolean
  backButton: () => void
  data: FarmerPlotEntity
  callBackReturn: (data: boolean) => void
}
const ModalHistory: React.FC<ModalHistoryProps> = ({ show, backButton, data, callBackReturn }) => {
  const [historyPlot, setHistoryPlot] = useState<AllHistoryFarmerPlotEntity>()
  const [current, setCurrent] = useState<number>(1)
  const row = 5

  useEffect(() => {
    const getHistoryPlot = async () => {
      await FarmerPlotDatasource.getHistoryFarmerPlot(data.farmerId!, data.id!, current, row).then(
        (res) => {
          setHistoryPlot(res)
        },
      )
    }
    getHistoryPlot()
  }, [current, data])

  const onPreviewImg = async (e: any) => {
    let src = e
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const columns = [
    {
      title: 'วัน/เวลา',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{moment(row.updatedAt).format('DD/MM/YYYY, HH:mm')}</span>,
        }
      },
    },
    {
      title: 'จำนวนไร่',
      dataIndex: 'raiAmount',
      key: 'raiAmount',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{numberWithCommas(row.raiAfter) + ' ไร่'}</>,
        }
      },
    },
    {
      title: 'หลักฐาน',
      dataIndex: 'evidence',
      key: 'evidence',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: color.Success,
                textDecoration: row.fileName ? 'underline' : 'none',
                cursor: row.fileName ? 'pointer' : 'default',
              }}
              onClick={() => onPreviewImg(row.pathFile)}
            >
              {row.fileName ? row.fileName : '-'}
            </span>
          ),
        }
      },
    },
    {
      title: 'ผู้อัปเดต',
      dataIndex: 'createBy',
      key: 'createBy',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.createBy}</>,
        }
      },
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'reason',
      key: 'reason',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.reason ? row.reason : '-'}</>,
        }
      },
    },
  ]
  return (
    <>
      <ModalNewStyle
        title={
          <div className='row'>
            <div className='col-lg-1'>
              <LeftOutlined
                style={{ width: 15, height: 15, cursor: 'pointer' }}
                onClick={() => callBackReturn(true)}
              />
            </div>
            <div className='col pt-1'>
              <span>ประวัติการแก้ไขจำนวนไร่</span>
            </div>
          </div>
        }
        width={1000}
        visible={show}
        onCancel={backButton}
        footer={false}
      >
        <NewTableStyle
          className='tableModal'
          dataSource={historyPlot?.data}
          columns={columns}
          pagination={false}
        />
        <div className='d-flex justify-content-between pt-4 pb-3 p-4'>
          <p>รายการทั้งหมด {historyPlot?.count} รายการ</p>
          <Pagination
            current={current}
            total={historyPlot?.count}
            onChange={onChangePage}
            pageSize={row}
            showSizeChanger={false}
          />
        </div>
      </ModalNewStyle>
    </>
  )
}

export default ModalHistory
