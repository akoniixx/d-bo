import AddButtton from "../../../components/button/AddButton";
import { useNavigate } from 'react-router-dom'
import { BackIconButton } from "../../../components/button/BackButton";
import color from "../../../resource/color";
import icon from "../../../resource/icon";
import { Badge, Button, DatePicker, Image, InputNumber, Pagination, PaginationProps, Popover, Row, Select, Slider, Spin, Table, Tabs } from "antd";
import { useState } from "react";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, EditOutlined, FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { CreditDronerDatasource } from "../../../datasource/CreditDatasource";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { STATUS_COLOR_CREDIT, STATUS_CREDIT_MAPPING } from "../../../definitions/Status";
import ActionButton from "../../../components/button/ActionButton";
import ModalCredit from "../../../components/modal/ModalCredit";
import Swal from "sweetalert2";
import ModalEditCredit from "../../../components/modal/ModalEditCredit";
import ModalViewCredit from "../../../components/modal/ModalViewCredit";
import ModalDeleteCredit from "../../../components/modal/ModalDeleteCredit";
import ModalCreditApprove from "../../../components/modal/ModalCreditApprove";
const _ = require('lodash')
const { RangePicker } = DatePicker
const dateSearchFormat = 'YYYY-MM-DD'

const DronerInfinityCreditList : React.FC<any> = () => {
    const navigate = useNavigate()
    const dateFormat = 'DD/MM/YYYY'
    const queryString = window.location.pathname.split("/DronerInfinity/")[1]
    const [visibleCredit, setVisibleCredit] = useState(false)
    const [visiblePoint, setVisiblePoint] = useState(false)
    const [visibleCash, setVisibleCash] = useState(false)
    const [filter,setFilter] = useState<any>({
      page : 1,
      take : 10,
      dronerId : queryString,
      status : "PENDING",
      exchangeType : null,
      startDate : "",
      endDate : "",
      sortBy : "",
      sortDirection : "DESC",
      minCredit : 0,
      maxCredit : 0,
      minPoint : 0,
      maxPoint : 0,
      minCash : 0,
      maxCash : 0,
      toggle : true
    })
    const [condition,setCondition] = useState({
      cashCreditCondition : 0,
      pointCreditCondition : 0
    })
    const [addCredit,setAddCredit] = useState({
      open : false,
      name : "",
      tel : "",
      point : 0
    })
    const [editCredit,setEditCredit] = useState({
      open : false,
      id : "",
      name : "",
      tel : "",
      point : 0
    })
    const [approveCredit,setApproveCredit] = useState({
      open : false,
      id : "",
      name : "",
      tel : "",
      point : 0
    })
    const [viewCredit,setViewCredit] = useState({
      open : false,
      name : "",
      tel : "",
      point : 0,
      credit : 0,
      exchangeType : "",
      reason : "",
      status : ""
    })
    const [deleteCredit,setDeleteCredit] = useState({
      open : false,
      id : "",
      dronerId : ""
    })
    const fetchCredit = async()=>{
      const data = await CreditDronerDatasource.getCreditDroner(
        filter.page,
        filter.take,
        filter.dronerId,
        filter.status,
        filter.exchangeType,
        filter.startDate,
        filter.endDate,
        filter.sortBy,
        filter.sortDirection,
        filter.minCredit,
        filter.maxCredit,
        filter.minPoint,
        filter.maxPoint,
        filter.minCash,
        filter.maxCash
      )
      setCondition({
        pointCreditCondition : data.pointCreditCondition,
        cashCreditCondition : data.cashCreditCondition
      })
      return data
    }
    const data = useQuery([
      'data',
      filter.page,
      filter.take,
      filter.status,
      filter.sortBy,
      filter.sortDirection,
      filter.toggle
    ],()=>fetchCredit())
    const tabConfigurations = [
      {
        title: `รอการตรวจสอบ`,
        key: 'PENDING',
      },
      {
        title: `อนุมัติ`,
        key: 'APPROVE',
      },
      {
        title: `ยกเลิก`,
        key: 'CANCEL',
      },
    ]
    const onChangeCredit = (newValue: any) => {
      setFilter({
        ...filter,
        minCredit : newValue[0],
        maxCredit : newValue[1]
      })
    }
    const onChangeDistranceMin = (e: any) => {
      setFilter({
        ...filter,
        minCredit : e,
      })
    }
    const onChangeDistranceMax = (e: any) => {
      setFilter({
        ...filter,
        maxCredit : e,
      })
    }
    const handleVisibleCredit = (newVisible: any) => {
      setVisibleCredit(newVisible)
    }
    const onChangePoint = (newValue: any) => {
      setFilter({
        ...filter,
        minPoint : newValue[0],
        maxPoint : newValue[1]
      })
    }
    const onChangePointMin = (e: any) => {
      setFilter({
        ...filter,
        minPoint : e
      })
    }
    const onChangePointMax = (e: any) => {
      setFilter({
        ...filter,
        maxPoint : e
      })
    }
    const handleVisiblePoint = (newVisible: any) => {
      setVisiblePoint(newVisible)
    }
    const onChangeCash = (newValue: any) => {
      setFilter({
        ...filter,
        minCash : newValue[0],
        maxCash : newValue[1]
      })
    }
    const onChangeCashMin = (e: any) => {
      setFilter({
        ...filter,
        minCash : e
      })
    }
    const onChangeCashMax = (e: any) => {
      setFilter({
        ...filter,
        maxCash : e
      })
    }
    const handleVisibleCash = (newVisible: any) => {
      setVisibleCash(newVisible)
    }
    const handleSearchDate = (e: any) => {
      if (e != null) {
        setFilter({
          ...filter,
          startDate : moment(new Date(e[0])).format(dateSearchFormat),
          endDate : moment(new Date(e[1])).format(dateSearchFormat)
        })
      } else {
        setFilter({
          ...filter,
          startDate : e,
          endDate : e
        })
      }
    }
    const onChangePage = (page: number) => {
      setFilter({
        ...filter,
        page : page
      })
    }

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
      setFilter({
        ...filter,
        page : 1,
        take : pageSize
      })
    }
    const columns = [
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              วันที่อัพเดต
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <CaretUpOutlined
                  style={{
                    position: 'relative',
                    top: 2,
                    color: filter.sortBy === "updatedAt" && filter.sortDirection === "ASC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "updatedAt" && filter.sortDirection === "ASC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "updatedAt",
                        sortDirection : "ASC"
                      })
                    }
                  }}
                />
                <CaretDownOutlined
                  style={{
                    position: 'relative',
                    bottom: 2,
                    color: filter.sortBy === "updatedAt" && filter.sortDirection === "DESC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "updatedAt" && filter.sortDirection === "DESC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "updatedAt",
                        sortDirection : "DESC"
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        },
        dataIndex: 'updateAt',
        key: 'updateAt',
        render: (value: any, row: any, index: number) => {
            return <>
              <span>{moment(row.updatedAt).format('DD/MM/YYYY HH:mm')}</span>
            </>
        }
      },
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              ชื่อรายการ
            </div>
          )
        },
        dataIndex: 'listname',
        key: 'listname',
        render: (value: any, row: any, index: number) => {
          return <span>{row.listname}</span>
        }
      },
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              ประเภทการแลก
            </div>
          )
        },
        dataIndex: 'exchangeType',
        key: 'exchangeType',
        width: '16%',
        render: (value: any, row: any, index: number) => {
          return <span className="p-2">{row.exchangeType === "CASH" ? "เงิน" : "แต้ม"}</span>
        }
      },      
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              จำนวนเครดิต
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <CaretUpOutlined
                  style={{
                    position: 'relative',
                    top: 2,
                    color: filter.sortBy === "credit" && filter.sortDirection === "ASC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "credit" && filter.sortDirection === "ASC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "credit",
                        sortDirection : "ASC"
                      })
                    }
                  }}
                />
                <CaretDownOutlined
                  style={{
                    position: 'relative',
                    bottom: 2,
                    color: filter.sortBy === "credit" && filter.sortDirection === "DESC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "credit" && filter.sortDirection === "DESC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "credit",
                        sortDirection : "DESC"
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        },
        dataIndex: 'credit',
        key: 'credit',
        render: (value: any, row: any, index: number) => {
          return <span>{row.credit+ " เครดิต"}</span>
        }
      },
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              จำนวนแต้ม
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <CaretUpOutlined
                  style={{
                    position: 'relative',
                    top: 2,
                    color: filter.sortBy === "point" && filter.sortDirection === "ASC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "point" && filter.sortDirection === "ASC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "point",
                        sortDirection : "ASC"
                      })
                    }
                  }}
                />
                <CaretDownOutlined
                  style={{
                    position: 'relative',
                    bottom: 2,
                    color: filter.sortBy === "point" && filter.sortDirection === "DESC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "point" && filter.sortDirection === "DESC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "point",
                        sortDirection : "DESC"
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        },
        dataIndex: 'point',
        key: 'point',
        render: (value: any, row: any, index: number) => {
          return <span>{row.point === 0? "-" : numberWithCommas(row.point)+ " แต้ม"}</span>
        }
      },
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              จำนวนเงิน
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <CaretUpOutlined
                  style={{
                    position: 'relative',
                    top: 2,
                    color: filter.sortBy === "cash" && filter.sortDirection === "ASC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "cash" && filter.sortDirection === "ASC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "cash",
                        sortDirection : "ASC"
                      })
                    }
                  }}
                />
                <CaretDownOutlined
                  style={{
                    position: 'relative',
                    bottom: 2,
                    color: filter.sortBy === "cash" && filter.sortDirection === "DESC" ? '#ffca37' : 'white',
                  }}
                  onClick={()=>{
                    if(filter.sortBy === "cash" && filter.sortDirection === "DESC"){
                      setFilter({
                        ...filter,
                        sortBy : "",
                        sortDirection : "DESC"
                      })
                    }
                    else{
                      setFilter({
                        ...filter,
                        sortBy : "cash",
                        sortDirection : "DESC"
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        },
        dataIndex: 'cash',
        key: 'cash',
        render: (value: any, row: any, index: number) => {
          return <span>{(row.cash == 0 || row.cash == "0") ? "-" : numberWithCommas(row.cash)+ " บาท"}</span>
        }
      },
      {
        title: () => {
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              สถานะ
            </div>
          )
        },
        dataIndex: 'status',
        key: 'status',
        render: (value: any, row: any, index: number) => {
          return <>
            <span style={{ color: STATUS_COLOR_CREDIT[row.status] }}>
                <Badge color={STATUS_COLOR_CREDIT[row.status]} />{' '}
                {STATUS_CREDIT_MAPPING[row.status]}
            </span>
          </>
        }
      },
      {
        dataIndex: 'tool',
        key: 'tool',
        render: (value: any, row: any, index: number) => {
          if(row.status === "CANCEL"){
            return <Row justify={'space-between'}>
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() => setViewCredit({
                    open : true,
                    name : data.data.name,
                    tel : data.data.telephoneNo,
                    point : data.data.point,
                    credit : row.credit,
                    exchangeType : row.exchangeType,
                    status : row.status,
                    reason : row.reason
                  })}
                />
            </Row>
          }
          else{
            return <Row justify={'space-between'}>
                <ActionButton
                  icon={row.status === "APPROVE" ? row.exchangeType === "CASH" ? <FileTextOutlined /> : <FileTextOutlined /> : <EditOutlined />}
                  color={color.primary1}
                  onClick={() => {
                    if(row.exchangeType === "CASH"){
                      if(row.status === "APPROVE"){
                        setApproveCredit({
                          open : true,
                          id : row.id,
                          name : data.data.name,
                          tel : data.data.telephoneNo,
                          point : data.data.point
                        })
                      }
                      else{
                        setEditCredit({
                          open : true,
                          id : row.id,
                          name : data.data.name,
                          tel : data.data.telephoneNo,
                          point : data.data.point
                        })
                      }
                    }
                    else{
                      setViewCredit({
                        open : true,
                        name : data.data.name,
                        tel : data.data.telephoneNo,
                        point : data.data.point,
                        credit : row.credit,
                        exchangeType : row.exchangeType,
                        status : row.status,
                        reason : ""
                      })
                    }
                  }}
                />
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => setDeleteCredit({
                    open : true,
                    id : row.id,
                    dronerId : queryString
                  })}
                />
            </Row>
          }
        }
      }
    ]
    return  <div>
        <ModalCreditApprove 
          cashCondition={condition.cashCreditCondition}
          pointCondition={condition.pointCreditCondition}
          dronerId={queryString} 
          open={approveCredit.open}
          name={approveCredit.name}
          tel={approveCredit.tel}
          id={approveCredit.id}
          point={approveCredit.point}
          onClose={()=>setApproveCredit({
            id : "",
            open : false,
            name : "",
            tel : "",
            point : 0
          })}
          onSubmit={()=>{
            Swal.fire({
              title: 'แก้ไขสำเร็จ',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              setApproveCredit({
                id : "",
                open : false,
                name : "",
                tel : "",
                point : 0
              })
              navigate(0)
            })
          }}
        />
        <ModalEditCredit
          cashCondition={condition.cashCreditCondition}
          pointCondition={condition.pointCreditCondition}
          dronerId={queryString} 
          open={editCredit.open}
          name={editCredit.name}
          tel={editCredit.tel}
          id={editCredit.id}
          point={editCredit.point}
          onClose={()=>setEditCredit({
            id : "",
            open : false,
            name : "",
            tel : "",
            point : 0
          })}
          onSubmit={()=>{
            Swal.fire({
              title: 'แก้ไขสำเร็จ',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              setEditCredit({
                id : "",
                open : false,
                name : "",
                tel : "",
                point : 0
              })
              navigate(0)
            })
          }}/>
        <ModalCredit
          cashCondition={condition.cashCreditCondition}
          pointCondition={condition.pointCreditCondition}
          open={addCredit.open}
          name={addCredit.name}
          tel={addCredit.tel}
          dronerId={queryString}
          point={addCredit.point}
          onClose={()=>setAddCredit({
            open : false,
            name : "",
            tel : "",
            point : 0
          })}
          onSubmit={()=>{
            Swal.fire({
              title: 'บันทึกสำเร็จ',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              setAddCredit({
                open : false,
                name : "",
                tel : "",
                point : 0
              })
              navigate(0)
            })
          }}
        />
        <ModalViewCredit
          cashCondition={condition.cashCreditCondition}
          pointCondition={condition.pointCreditCondition} 
          open={viewCredit.open}
          name={viewCredit.name}
          tel={viewCredit.tel}
          credit={viewCredit.credit}
          point={viewCredit.point}
          status={viewCredit.status}
          reason={viewCredit.reason}
          exchangeType={viewCredit.exchangeType}
          onClose={()=>setViewCredit({
            open : false,
            name : "",
            tel : "",
            credit : 0,
            point : 0,
            status : "",
            exchangeType : "",
            reason : ""
          })}
        />
        <ModalDeleteCredit 
          open={deleteCredit.open}
          dronerId={deleteCredit.dronerId}
          id={deleteCredit.id}
          onClose={()=>setDeleteCredit({
            open : false,
            dronerId : "",
            id : ""
          })}
          onSubmit={()=>{
            Swal.fire({
              title: 'บันทึกสำเร็จ',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              setDeleteCredit({
                open : false,
                dronerId : "",
                id : ""
              })
              navigate(0)
            })
          }}
        />
        <div className='d-flex justify-content-between pt-3 pb-3'>
          <div className="d-flex align-items-center">
           <BackIconButton onClick={() => navigate(-1)} />
            <span
              className='card-label font-weight-bolder text-dark'
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                padding: '8px',
              }}
            >
              <strong>เครดิตนักบินโดรน ({data.isLoading ? "" : data.data.name})</strong>
            </span>
          </div>
          <div>
            <AddButtton text='เพิ่มรายการแลก' onClick={() => setAddCredit({
              open : true,
              name : data.data.name,
              tel : data.data.telephoneNo,
              point : data.data.point
            })} />
          </div>
        </div>
        <div className="row">
            <div className="col-3">
               <div className="p-3 rounded" style={{backgroundColor : '#FFF', width:'98%'}}>
                  <p style={{
                    fontSize : '18px'
                  }}>แต้มสะสม</p>
                  <div className="px-3 py-2 d-flex justify-content-between align-items-center rounded" style={{
                    backgroundColor : color.primary1
                  }}>
                    <div className="d-flex align-items-center">
                      <img src={icon.coinDroner} style={{
                        width : '20px',
                        height : '20px'
                      }}/>
                      <p style={{
                        margin : 0,
                        color : '#fff',
                        paddingLeft : '5px'
                      }}>จำนวนแต้ม</p>
                    </div>
                    <p style={{
                      margin : 0,
                      color : '#fff'
                    }}>{data.isLoading ? 0 : numberWithCommas(data.data.point)}</p>
                  </div>
               </div>
            </div>
            <div className="col-3">
              <div className="p-3 rounded" style={{backgroundColor : '#FFF', width:'98%'}}>
                  <p style={{
                    fontSize : '18px'
                  }}>แต้มที่ใช้แลกเครดิต</p>
                  <div className="px-3 py-2 d-flex justify-content-between align-items-center rounded" style={{
                    backgroundColor : '#FFCA37'
                  }}>
                    <div className="d-flex align-items-center">
                      <img src={icon.coinDroner} style={{
                        width : '20px',
                        height : '20px'
                      }}/>
                      <p style={{
                        margin : 0,
                        color : '#000',
                        paddingLeft : '5px'
                      }}>จำนวนแต้ม</p>
                    </div>
                    <p style={{
                      margin : 0,
                      color : '#000'
                    }}>{data.isLoading ? 0 : numberWithCommas(data.data.pointCredit)}</p>
                  </div>
              </div>
            </div>
            <div className="col-3">
              <div className="p-3 rounded" style={{backgroundColor : '#FFF', width:'98%'}}>
                  <p style={{
                    fontSize : '18px'
                  }}>เงินที่ใช้แลกเครดิต</p>
                  <div className="px-3 py-2 d-flex justify-content-between align-items-center rounded" style={{
                    backgroundColor : '#EA973E'
                  }}>
                    <div className="d-flex align-items-center">
                      <img src={icon.wallet} style={{
                        width : '20px',
                        height : '20px'
                      }}/>
                      <p style={{
                        margin : 0,
                        color : '#fff',
                        paddingLeft : '5px'
                      }}>จำนวนเงิน</p>
                    </div>
                    <p style={{
                      margin : 0,
                      color : '#fff'
                    }}>{data.isLoading ? 0 : numberWithCommas(data.data.cashcredit)}</p>
                  </div>
              </div>
            </div>
            <div className="col-3">
              <div className="p-3 rounded" style={{backgroundColor : '#FFF', width:'98%'}}>
                  <p style={{
                    fontSize : '18px'
                  }}>เครดิตคงเหลือ</p>
                  <div className="px-3 py-2 d-flex justify-content-between align-items-center rounded" style={{
                    backgroundColor : '#A9CB62'
                  }}>
                    <div className="d-flex align-items-center">
                      <img src={icon.credit} style={{
                        width : '20px',
                        height : '20px'
                      }}/>
                      <p style={{
                        margin : 0,
                        color : '#fff',
                        paddingLeft : '5px'
                      }}>จำนวนเครดิต</p>
                    </div>
                    <p style={{
                      margin : 0,
                      color : '#fff'
                    }}>{data.isLoading ? 0 : numberWithCommas(data.data.credit)}</p>
                  </div>
              </div>
            </div>
        </div>
        <div className='pt-3'>
          <Tabs onChange={(key: any) => {
            setFilter({
              ...filter,
              page : 1,
              take : 10,
              dronerId : queryString,
              status : key,
              exchangeType : "",
              startDate : "",
              endDate : "",
              sortBy : "",
              sortDirection : "",
              minCredit : 0,
              maxCredit : 0,
              minPoint : 0,
              maxPoint : 0,
              minCash : 0,
              maxCash : 0,
            })
          }} type='card'>
            {tabConfigurations.map((tab) => (
              <Tabs.TabPane tab={tab.title} key={tab.key}></Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        <div className='pt-3 d-flex justify-content-between align-items-center'>
          <Select
            value={filter.exchangeType === "" ? null : filter.exchangeType}
            style={{ width : '240px'}}
            allowClear
            showSearch
            placeholder='เลือกประเภทการแลก'
            optionFilterProp='children'
            filterOption={(input: any, option: any) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            onChange={(e)=>setFilter({
              ...filter,
              exchangeType : e
            })}
          >
            <Option value="POINT">
              แต้ม
            </Option>
            <Option value="CASH">
              เงิน
            </Option>
          </Select>
          <Popover
            content={
              <>
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  value={[filter.minCredit,filter.maxCredit]}
                  onChange={onChangeCredit}
                  max={100}
                />
                <InputNumber
                  min={0}
                  max={100}
                  style={{
                    margin: '0 16px',
                  }}
                  value={filter.minCredit}
                  onChange={onChangeDistranceMin}
                />
                <InputNumber
                  min={0}
                  max={100}
                  style={{
                    margin: '0 16px',
                  }}
                  id='max'
                  value={filter.maxCredit}
                  onChange={onChangeDistranceMax}
                />
              </>
            }
            title='จำนวนเครดิต'
            trigger='click'
            visible={visibleCredit}
            onVisibleChange={handleVisibleCredit}
            placement='bottom'
          >
            <Button style={{ width : '180px'}}>{
              (filter.minCredit === 0 && filter.maxCredit === 0)?
              "เลือกจำนวนเครดิต" :
              `${filter.minCredit} - ${filter.maxCredit} เครดิต`
            }</Button>
          </Popover>
          <Popover
            content={
              <>
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  value={[filter.minPoint,filter.maxPoint]}
                  onChange={onChangePoint}
                  max={1000000}
                />
                <InputNumber
                  min={0}
                  max={1000000}
                  style={{
                    margin: '0 16px',
                  }}
                  value={filter.minPoint}
                  onChange={onChangePointMin}
                />
                <InputNumber
                  min={0}
                  max={1000000}
                  style={{
                    margin: '0 16px',
                  }}
                  id='max'
                  value={filter.maxPoint}
                  onChange={onChangePointMax}
                />
              </>
            }
            title='เลือกจำนวนแต้ม'
            trigger='click'
            visible={visiblePoint}
            onVisibleChange={handleVisiblePoint}
            placement='bottom'
          >
            <Button style={{ width : '180px'}}>{
              (filter.minPoint === 0 && filter.maxPoint === 0)?
              "เลือกจำนวนแต้ม" :
              `${filter.minPoint} - ${filter.maxPoint} แต้ม`
            }</Button>
          </Popover>
          <Popover
            content={
              <>
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  value={[filter.minCash,filter.maxCash]}
                  onChange={onChangeCash}
                  max={100000}
                />
                <InputNumber
                  min={0}
                  max={100000}
                  style={{
                    margin: '0 16px',
                  }}
                  value={filter.minCash}
                  onChange={onChangeCashMin}
                />
                <InputNumber
                  min={0}
                  max={100000}
                  style={{
                    margin: '0 16px',
                  }}
                  id='max'
                  value={filter.maxCash}
                  onChange={onChangeCashMax}
                />
              </>
            }
            title='เลือกจำนวนเงิน'
            trigger='click'
            visible={visibleCash}
            onVisibleChange={handleVisibleCash}
            placement='bottom'
          >
            <Button style={{ width : '180px'}}>{
              (filter.minCash === 0 && filter.maxCash === 0)?
              "เลือกจำนวนเงิน" :
              `${filter.minCash} - ${filter.maxCash} บาท`
            }</Button>
          </Popover>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={['เลือกวันที่เริ่ม', 'เลือกวันที่สิ้นสุด']}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: '5px',
              color: color.secondary2,
              backgroundColor: color.Success,
              padding: 6,
              paddingTop: 4,
            }}
            onClick={()=>setFilter({
              ...filter,
              toggle : !filter.toggle
            })}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
        <div className="pt-3">
          <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={data.isLoading}>
            {
              data.isLoading?
              <></>:data.isError?
              <></>:
              <Table
                columns={columns}
                dataSource={data.data.data}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            }
          </Spin>
        </div>
        <div className='d-flex justify-content-between pt-3 pb-3'>
          <p>รายการทั้งหมด {data.isLoading? 0 :data.data.count} รายการ</p>
          <Pagination
            current={data.isLoading? 1 :data.data.page}
            showSizeChanger
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
            total={data.isLoading? 0 :data.data.count}
          />
      </div>
    </div>
}

export default DronerInfinityCreditList;