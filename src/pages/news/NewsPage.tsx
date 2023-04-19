import React, { useState } from 'react'
import Layouts from '../../components/layout/Layout'
import Search from 'antd/lib/input/Search'
import Select from 'antd/lib/select'
import { Option } from "antd/lib/mentions";
import { Button, Pagination, Table } from 'antd';
import { color } from '../../resource';
import ActionButton from '../../components/button/ActionButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function NewsPage() {
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<any>({
    count: 0,
    promotions: [],
  });
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
      <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>ข่าวสาร (News)</strong>
          </span>
        </div>
        <div className="d-flex">
          <div className="col">
            <Search
              placeholder="ค้นหาชื่อข่าวสาร"
              className="col-lg-12 p-1"
              // value={searchText}
              onChange={(e: any) => {}}
            />
          </div>
          <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            // onChange={handleChangeCoupon}
            showSearch
            // value={sortCoupon}
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
            <Option value={"ACTIVE"}>ใช้งาน</Option>
            <Option value={"DRAFTING"}>รอเปิดใช้งาน</Option>
            <Option value={"INACTIVE"}>ปิดการใช้งาน</Option>
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกแอปพลิเคชั่น"
            // onChange={handleChangePromotionType}
            showSearch
            // value={sortType}
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
            <Option value={"Farmer"}>Farmer App</Option>
            <Option value={"Droner"}>Droner App</Option>
          </Select>
          </div>
          <div className="pt-1 me-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
        <div className="pt-1 col">
          <Button
            onClick={()=>navigate("/AddNews")}
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
              paddingLeft : "50px",
              paddingRight : '50px'
            }}
          >
            + เพิ่มข่าวสาร
          </Button>
        </div>
        </div>
      </div>
    </>
  )

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            วันที่เผยแพร่
          </div>
        );
      },
      dataIndex: "dateBroadcast",
      key: "dateBroadcast",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span
                className="text-dark-75  d-block font-size-lg"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {row.couponName}
              </span>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#7B7B7B",
                }}
              >
                {/* {row.couponCode && "รหัส : " + row.couponCode} */}
              </p>
            </div>
          ),
        };
      },
    },
    {
      title: "ชื่อข่าวสาร",
      dataIndex: "newsName",
      key: "newsName",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {/* {row.couponType === "INJECTION" ? "ส่วนลดการฉีดพ่น" : "ส่วนลดปุ๋ยและยา"} */}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "อ่านแล้ว",
      dataIndex: "readCount",
      key: "readCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {/* {row.couponType === "INJECTION" ? "ส่วนลดการฉีดพ่น" : "ส่วนลดปุ๋ยและยา"} */}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "แอปพลิเคชั่น",
      dataIndex: "application",
      key: "application",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {/* {row.couponType === "INJECTION" ? "ส่วนลดการฉีดพ่น" : "ส่วนลดปุ๋ยและยา"} */}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "newsStatus",
      key: "newsStatus",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {/* {row.couponType === "INJECTION" ? "ส่วนลดการฉีดพ่น" : "ส่วนลดปุ๋ยและยา"} */}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <div className="pr-1">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => {
                    
                  }}
                />
              </div>
              <div className="pr-1">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={row.used > 0 ? color.Grey : color.Error}
                  onClick={() => {}}
                  actionDisable={row.used > 0 ? true : false}
                />
              </div>
            </div>
          ),
        };
      },
    },
  ]

  return (
    <Layouts>
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={[]}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data.count} รายการ</p>
        <Pagination
          current={current}
          total={data.count}
          onChange={()=>{}}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  )
}

export default NewsPage