import {
  Button,
  Col,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  Pagination,
  Popover,
  Row,
  Spin,
  Table,
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { color, icon } from '../../../resource'
import { InfoCircleFilled, SearchOutlined } from '@ant-design/icons'
import { BackIconButton } from '../../../components/button/BackButton'
import { numberWithCommas } from '../../../utilities/TextFormatter'
import { QuotaDatasource } from '../../../datasource/QuotaDatasource'
import {
  AddQuotaRedeemHisEntity,
  AddQuotaRedeemHisEntity_INIT,
  AllQuotaReportEntity,
  QuotaReportEntity,
} from '../../../entities/QuotaReportEntities'
import { DateTimeUtil } from '../../../utilities/DateTimeUtil'
import ModalQuotaRedeem from '../../../components/modal/ModalQuotaRedeem'
import Swal from 'sweetalert2'
import { CampaignDatasource } from '../../../datasource/CampaignDatasource'
import { useLocalStorage } from '../../../hook/useLocalStorage'
import ShowNickName from '../../../components/popover/ShowNickName'

const _ = require('lodash')
const { Map } = require('immutable')
function QuotaReport() {
  const queryString = _.split(window.location.pathname, '=')
  const navigate = useNavigate()
  const row = 10
  const [current, setCurrent] = useState(1)
  const onChangePage = (page: number) => {
    setCurrent(page)
  }
  const [getRow, setGetRow] = useState<QuotaReportEntity>()
  const [rewardRound, setRewardRound] = useState<any>()
  const [clNo, setCLNo] = useState<any>()
  const [campId, setCampId] = useState<any>()
  const [campaignName, setCampaignName] = useState<any>()
  const [raiQuota, setRaiQuota] = useState<any>()
  const [searchText, setSearchText] = useState<any>()
  const [data, setData] = useState<AllQuotaReportEntity>()
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleVisible = (newVisible: any) => {
    setVisible(newVisible)
  }
  const [persistedProfile, setPersistedProfile] = useLocalStorage('profile', [])

  const getRewardRound = async () => {
    await CampaignDatasource.getCampaignById(queryString[1]).then((res) => {
      setRaiQuota(res.condition[0])
      setCLNo(res.missionNo)
      setCampaignName(res.campaignName)
      setRewardRound(res.condition[0])
      setCampId(res.id)
    })
  }

  const getQuotaReport = async () => {
    setLoading(true)
    await QuotaDatasource.getAllQuotaReport(queryString[1], row, current, searchText)
      .then((res) => {
        console.log(res)
        setData(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getQuotaReport()
    getRewardRound()
  }, [current])

  const DownloadExcelQuota = async () => {
    const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`
    await QuotaDatasource.reportExcel(campId, downloadBy, 'รายชื่อผู้มีสิทธิ์').then((res) => {
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = 'รายชื่อผู้มีสิทธิ์'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }
  const DownloadExcelQuotaReceive = async () => {
    const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`
    await QuotaDatasource.reportExcelQuotaReceive(
      campId,
      downloadBy,
      'รายชื่อผู้ใช้ที่ได้รับของรางวัล',
    ).then((res) => {
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = 'รายชื่อผู้ใช้ที่ได้รับของรางวัล'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }

  const downloadListName = (
    <Menu
      items={[
        {
          label: <span onClick={DownloadExcelQuota}>ดาวน์โหลดรายชื่อผู้ใช้ที่มีสิทธิ์</span>,
          key: '1',
        },
        {
          label: (
            <span onClick={DownloadExcelQuotaReceive}>ดาวน์โหลดรายชื่อผู้ใช้ที่ได้รับรางวัล</span>
          ),
          key: '2',
        },
      ]}
    />
  )

  const PageTitle = (
    <>
      <Row justify={'space-between'} gutter={8}>
        <Col span={1}>
          <BackIconButton
            onClick={() => {
              navigate(-1)
            }}
          />
        </Col>
        <Col span={19} className='p-3'>
          <span
            className='card-label font-weight-bolder text-dark'
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            <strong>
              จัดการคนที่ได้รับสิทธิ์ | {campaignName} | {clNo}
            </strong>
          </span>
        </Col>
        <Col span={4} className='p-3'>
          <Dropdown overlay={downloadListName}>
            <Button
              style={{
                borderColor: color.Success,
                borderRadius: '5px',
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
            >
              <span style={{ paddingRight: 'inherit' }}>ดาวน์โหลดข้อมูล</span>
              <Image src={icon.arrowReport} preview={false} style={{ width: 15, height: 16 }} />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row justify={'space-between'} gutter={8}>
        <Col span={22}>
          <Input
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder='ค้นหาชื่อนักบินโดรน / เบอร์โทร'
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col span={2}>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1)
              getQuotaReport()
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </Col>
      </Row>
    </>
  )

  const columns = [
    {
      title: 'วันที่อัพเดต',
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.updateAt ? DateTimeUtil.formatDateTime(row.updateAt) : ' - '}</>,
        }
      },
    },
    {
      title: 'ชื่อนักบินโดรน',
      dataIndex: 'droner',
      key: 'droner',
      width: '20%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: row.isDelete === true ? color.Error : color.font,
                }}
              >
                {row.firstname + ' ' + row.lastname}
                {row.nickname && <ShowNickName data={row.nickname} menu='INFO' />}
              </span>
            </>
          ),
        }
      },
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: row.isDelete === true ? color.Error : color.font,
              }}
            >
              {row.telephoneNo}
            </span>
          ),
        }
      },
    },
    {
      title: 'จำนวนไร่สะสม',
      dataIndex: 'allRai',
      key: 'allRai',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.allRai ? numberWithCommas(row.allRai) : 0} {'ไร่'}
            </span>
          ),
        }
      },
    },
    {
      title: 'จำนวนสิทธิ์คงเหลือ',
      dataIndex: 'quotaAmount',
      key: 'quotaAmount',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{numberWithCommas(row.quotaAmount)}</span>
              <Popover
                title={
                  <span
                    style={{
                      color: color.White,
                    }}
                  >
                    รายละเอียดสิทธิ์
                  </span>
                }
                content={
                  <table style={{ width: '300px' }}>
                    <tr>
                      <td>
                        สิทธิ์ที่ได้รับทั้งหมด
                        <br />
                        <div style={{ fontSize: '12px', color: color.Disable }}>
                          ({raiQuota.rai} ไร่ / {raiQuota.quata} สิทธิ์)
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>{numberWithCommas(row.allValue)}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: 10 }}>จำนวนรางวัลที่ได้รับ</td>
                      <td style={{ textAlign: 'right', color: color.Error }}>
                        {numberWithCommas(row.amountReceive)}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}>
                        <Divider />
                      </td>
                    </tr>
                    <tr>
                      <td>จำนวนสิทธิ์คงเหลือ</td>
                      <td
                        style={{
                          textAlign: 'right',
                          color: color.Success,
                          fontWeight: 'bold',
                        }}
                      >
                        {numberWithCommas(row.quotaAmount)}
                      </td>
                    </tr>
                  </table>
                }
              >
                <InfoCircleFilled
                  style={{
                    color: color.Success,
                    fontSize: '15px',
                    marginLeft: '7px',
                    verticalAlign: 1.5,
                  }}
                />
              </Popover>
            </>
          ),
        }
      },
    },
    {
      title: 'จำนวนรางวัลที่ได้รับ',
      dataIndex: 'amountReceive',
      key: 'amountReceive',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  cursor: 'pointer',
                  color: color.Success,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  navigate('/RewardReceived/id=' + row.dronerId)
                  localStorage.setItem('id', campId)
                }}
              >
                {row.amountReceive}
              </span>
            </>
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
            <div>
              <Button
                disabled={row.isDelete === true || row.quotaAmount === 0}
                onClick={() => {
                  setShowModal((prev) => !prev)
                  setGetRow(row)
                }}
                style={{
                  padding: 5,
                  borderColor:
                    row.isDelete === true || row.quotaAmount === 0 ? color.Grey : color.Success,
                  borderRadius: 5,
                  paddingTop: 2,
                }}
              >
                <Image
                  src={
                    row.isDelete === true || row.quotaAmount === 0
                      ? icon.quotaReport
                      : icon.iconQuotaReport
                  }
                  style={{ width: 20, height: 20 }}
                  preview={false}
                />
              </Button>
            </div>
          ),
        }
      },
    },
  ]

  const updateRewardReceive = async (dataQuotaRedeem: AddQuotaRedeemHisEntity) => {
    const fName = Map(dataQuotaRedeem).set('firstName', getRow?.firstname)
    const lName = Map(fName.toJS()).set('lastName', getRow?.lastname)
    const dronerId = Map(lName.toJS()).set('dronerId', getRow?.dronerId)
    const cpId = Map(dronerId.toJS()).set('campaignId', campId)
    const tel = Map(cpId.toJS()).set('telephoneNo', getRow?.telephoneNo)
    await QuotaDatasource.addQuotaRedeem(tel.toJS()).then((res) => {
      Swal.fire({
        title: 'บันทึกสำเร็จ',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then((time) => {
        getQuotaReport()
      })
      setShowModal(false)
    })
  }

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

      {showModal && (
        <ModalQuotaRedeem
          show={showModal}
          backButton={() => setShowModal((prev) => !prev)}
          callBack={updateRewardReceive}
          data={AddQuotaRedeemHisEntity_INIT}
          round={rewardRound.rewardRound}
        />
      )}
    </>
  )
}
export default QuotaReport
