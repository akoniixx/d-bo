import DatePicker from 'antd/lib/date-picker';
import React, { useEffect, useRef, useState } from 'react'
import Search from "antd/lib/input/Search";
import AddButtton from '../../components/button/AddButton';
import Layouts from '../../components/layout/Layout'
import Select from 'antd/lib/select';
import { Option } from "antd/lib/mentions";
import Table from 'antd/lib/table';
import Pagination from 'antd/lib/pagination';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { CouponDataSource } from '../../datasource/CouponDatasource';
import { CouponListEntities, CouponQueryEntities } from '../../entities/CouponEntites';
import { DateTimeUtil } from '../../utilities/DateTimeUtil';
import { Image } from 'antd';
import icon from '../../resource/icon';
import ActionButton from '../../components/button/ActionButton';
import { EditOutlined } from '@ant-design/icons';
import { color } from '../../resource';
import ModalDeleteCoupon from '../../components/modal/ModalDeleteCoupon';

function PromotionPage() {
  const dateSearchFormat = "YYYY-MM-DD";
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const row = 10;
  const fetchTwice = useRef(true)
  const couponId = useRef("")
  const stateChange = useRef(false)
  const [searchText,setSearchText] = useState<string>("")
  const [current, setCurrent] = useState(1);
  const [startDate,setStartDate] = useState<string>("")
  const [expiredDate,setExpiredDate] = useState<string>("")
  const [modalDelete,setModalDelete] = useState<boolean>(false);
  const [data,setData] = useState<CouponListEntities>({
    count : 0,
    promotions : []
  })
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [sortStatus,setSortStatus] 
  = useState<string>()

  const [sortCoupon,setSortCoupon] 
  = useState<string>()

  const [sortType,setSortType] 
  = useState<string>()

  const handleChangeStatus = (status : any)=>{
    setSortStatus(status)
    setCurrent(1);
  } 
  const handleChangeCoupon = (type : any)=>{
    setSortCoupon(type)
    setCurrent(1);
  } 
  const handleChangePromotionType = (type : any)=>{
    setSortType(type)
    setCurrent(1);
  }
  const handleChangeDateRange = (date : any)=>{
    setStartDate(moment(date[0]).format())
    setExpiredDate(moment(date[1]).format())
    setCurrent(1);
  }

  const handleSearchText = (text : string)=>{
    setSearchText(text)
    setCurrent(1);
  }

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const fetchCouponList = () => {
    CouponDataSource.getCoupons(
      current,
      row,
      sortStatus,
      sortCoupon,
      sortType,
      startDate,
      expiredDate,
      searchText
    ).then(
      res => {
        setData(res)
      }
    ).catch(err => console.log(err))
  }

  const duplicateCoupon = (id: string)=>{
    CouponDataSource.queryCoupon(id).then(
      res=> {
        let couponDto  = {
          couponName : res.couponName,
          couponType : res.couponType,
          promotionStatus : "DRAFTING",
          promotionType : res.promotionType,
          discountType : res.discountType,
          discount : res.discount,
          count : res.count,
          keep : res.count,
          used : 0,
          description : res.description,
          condition : res.condition,
          specialCondition : res.specialCondition,
          couponConditionRai : res.couponConditionRai,
          couponConditionRaiMin : res.couponConditionRaiMin,
          couponConditionRaiMax : res.couponConditionRaiMax,
          couponConditionService : res.couponConditionService,
          couponConditionServiceMin : res.couponConditionServiceMin,
          couponConditionServiceMax : res.couponConditionServiceMax,
          couponConditionPlant : res.couponConditionPlant,
          couponConditionPlantList : res.couponConditionPlantList,
          couponConditionProvince : res.couponConditionProvince,
          couponConditionProvinceList : res.couponConditionProvinceList,
          createBy : profile.username + " " + profile.lastname
        }
        CouponDataSource.addCoupon(couponDto).then(res=>{
          window.location.reload()
        }).catch(err => console.log(err))
      }
    ).catch(err => console.log(err))
  }

  const deleteCoupon = (id: string) =>{
    console.log(id)
    CouponDataSource.deleteCoupon(id).then(
      res => {
        setModalDelete(false);
        window.location.reload()
      }
    ).catch(err => console.log(err))
  }

  useEffect(()=>{
    if(fetchTwice.current){
      fetchCouponList()
      if(!stateChange.current){
        fetchTwice.current = false
        stateChange.current = true
      }
    }
    else{
      fetchTwice.current = true
    }
  },[
    current,
    sortStatus,
    sortCoupon,
    sortType,
    startDate,
    expiredDate,
    searchText
  ])
  
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}>
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}>
            <strong>คูปอง (Coupon)</strong>
          </span>
        </div>
        <div className='d-flex'>
          <RangePicker
            allowClear
            onCalendarChange={handleChangeDateRange}
            format={dateSearchFormat}
          />
          <div className='ps-3'>
            <AddButtton
              text="เพิ่มคูปอง"
              onClick={() => navigate("/AddPromotion")}
            />
          </div>
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}>
        <div className="col-lg-3">
          <Search
            placeholder="ค้นหาชื่อคูปอง หรือรหัส"
            className="col-lg-12 p-1"
            // value={searchText}
            onSearch={handleSearchText}
          />
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกประเภทคูปอง"
            onChange={handleChangeCoupon}
            showSearch
            value={sortCoupon}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            >
              <Option value={"INJECTION"}>
                การฉีดพ่น
              </Option>
              <Option value={"DRUG"}>
                ปุ๋ยและยา
              </Option>
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกรูปแบบคูปอง"
            onChange={handleChangePromotionType}
            showSearch
            value={sortType}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            >
              <Option value={"ONLINE"}>
                ออนไลน์ (Online)
              </Option>
              <Option value={"OFFLINE"}>
                ออฟไลน์ (Offline)
              </Option>
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            onClear={() => {

            }}
            placeholder="เลือกสถานะ"
            onChange={handleChangeStatus}
            showSearch
            value={sortStatus}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            >
              <Option value={"ACTIVE"}>
                 ใช้งาน
              </Option>
              <Option value={"DRAFTING"}>
                แบบร่าง
              </Option>
              <Option value={"INACTIVE"}>
                ปิดการใช้งาน
              </Option>
          </Select>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: () => {
        return (
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อคูปอง
          </div>
        );
      },
      dataIndex: "couponName",
      key: "couponName",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg" style={{
                fontSize : '16px',
                fontWeight : 500
              }}>
                {row.couponName}
              </span>
              <p style={{
                fontSize : '14px',
                fontWeight : 400,
                color : '#7B7B7B'
              }}>รหัสคูปอง : {row.couponCode}</p>
            </div>
          ),
        };
      },
    },
    {
      title: "ประเภทคูปอง",
      dataIndex: "couponType",
      key: "couponType",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.couponType === "INJECTION"?"การฉีดพ่น":"ปุ๋ยและยา"}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "รูปแบบ",
      dataIndex: "promotionType",
      key: "promotionType",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
            <span className="text-dark-75  d-block font-size-lg">
              {row.promotionType}
            </span>
            <p>{row.promotionType === "ONLINE"?"(ออนไลน์)":"(ออฟไลน์)"}</p>
            </div>
          ),
        };
      },
    },
    {
      title: "ช่วงเวลาเริ่มต้น - สิ้นสุด",
      dataIndex: "startDate",
      key: "startDate",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container d-flex align-items-center">
              <div className='pe-2'>
                <Image src={icon.iconTime} width={16} height={16}/>
              </div>
              <div>
                <span className="text-dark-75  d-block font-size-lg">
                  {(!row.startDate)?"":DateTimeUtil.formatDateTime(row.startDate)}
                </span>
                <span className="text-dark-75  d-block font-size-lg">
                  - {(!row.expiredDate)?"":DateTimeUtil.formatDateTime(row.expiredDate)}
                </span>
                <span style={{
                  fontSize : '14px',
                  color : '#7B7B7B',
                  fontWeight : 400
                }}>
                  เหลือเวลาอีก {(!row.expiredDate)?"":DateTimeUtil.calculateDay(row.expiredDate)} วัน
                </span>
              </div>
            </div>
          ),
        };
      },
    },
    {
      title: "ทั้งหมด",
      dataIndex: "count",
      key: "count",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.count}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "ถูกใช้แล้ว",
      dataIndex: "used",
      key: "used",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.used}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "promotionStatus",
      key: "promotionStatus",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              {
                row.promotionStatus === "ACTIVE"?
                <div className='d-flex'>
                  <span className='ps-2 text-success'><Image src={icon.pointActive} width={10} height={10} /> ใช้งาน</span>
                </div>:
                row.promotionStatus === "INACTIVE"?
                <div className='d-flex'>
                  <span className='ps-2 text-danger'><Image src={icon.pointDisabled} width={10} height={10}/> ปิดการใช้งาน</span>
                </div>:<div className='d-flex'>
                  <span className='ps-2 text-secondary'><Image src={icon.pointDrafting} width={10} height={10} /> แบบร่าง</span>
                </div>
              }
              <div className='d-flex'>
                  <span className='p-2 text-secondary'><Image src={icon.adminlogo} width={10} height={10} />{row.createBy??" - (Admin)"}</span>
                </div>
            </div>
          ),
        };
      },
    },
    {
      title : "",
      dataIndex : "action",
      key : "action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <div className='pr-1'>
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>{
                    (window.location.href = "/EditPromotion/id=" + row.id)
                  }}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<Image src={icon.iconcopy} width={12} height={14}/>}
                  color={color.primary1}
                  onClick={() =>{
                    duplicateCoupon(row.id)
                  }}
                />
              </div>
              <div className='pr-1'>
                <ActionButton
                  icon={<Image src={icon.icondelete} width={12} height={15}/>}
                  color={color.Error}
                  onClick={() =>{
                    couponId.current = row.id
                    setModalDelete(true)
                  }}
                />
              </div>
            </div>
          ),
        };
      },
    }
  ];


  return (
    <Layouts>
      <ModalDeleteCoupon 
          show={modalDelete}
          backButton={()=>setModalDelete(false)}
          callBack={()=>{
            deleteCoupon(couponId.current)
          }}
        />
       {PageTitle}
       <br />
       <Table
        columns={columns}
        dataSource={data.promotions}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data.count} รายการ</p>
        <Pagination
          current={current}
          total={data.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  )
}

export default PromotionPage