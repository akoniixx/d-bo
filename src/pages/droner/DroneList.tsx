import { Button, Col, Input, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import ActionButton from "../../components/button/ActionButton";
import { EditOutlined } from "@ant-design/icons";
import color from "../../resource/color";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { formatDate } from "../../utilities/TextFormatter";
import { DroneEntity, DroneListEntity } from "../../entities/DroneEntities";
function DroneList() {
  const onSearch = (value: string) => console.log(value);
  const [droneList, setDroneList] = useState<DroneEntity[]>();
  const [optionalTextSearch, setTextSearch] = useState<string>();
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const fetchDroneList = async (
    page: number,
    take: number,
    sortDirection: string,
    search?: string
  ) => {
    await DroneDatasource.getDroneList(
      page,
      take,
      sortDirection,
      search
    ).then((res) => {
      setDroneList(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    fetchDroneList(1, 3, "ASC");
  }, [optionalTextSearch]);

  const changeTextSearch = (text?: string) => {
    setTextSearch(text);
  };
  const PageTitle = () => {
    return (
      <div className="container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <div>
              <span
                className="card-label font-weight-bolder text-dark"
                style={{ fontSize: 22, fontWeight: "bold", padding: "8px 0" }}
              >
                รายการโดรนเกษตร (Drone List)
              </span>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <Search
              style={{ width: "290px", padding: "8px 0" }}
              placeholder="ค้นหาเลขตัวถังหรือชื่อนักบินโดรน"
              onSearch={changeTextSearch}            />
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "140px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกยี่ห้อ"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "140px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกรุ่นโดรน"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row">
            <Select
              style={{
                width: "130px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกสถานะ"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
        </Row>
      </div>
    );
  };
  const columns = [
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {formatDate(row.createdAt)}
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "ยี่ห้อโดรน",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
    },
    {
      title: "รุ่นโดรน",
      dataIndex: "series",
      key: "series",
      width: "15%",
    },
    {
      title: "เลขตัวถัง",
      dataIndex: "numb",
      key: "numb",
      width: "15%",
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "named",
      key: "named",
      width: "15%",
    },
    {
      title: "ใบอนุญาตนักบิน ",
      dataIndex: "paper",
      key: "paper",
      width: "15%",
    },
    {
      title: "ใบอนุญาตโดรน(กสทช.) ",
      dataIndex: "paperA",
      key: "paperA",
      width: "18%",
    },
    {
      title: "สถานะ",
      dataIndex: "active",
      key: "active",
      width: "13%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row align-items-baseline">
              <div>
                <span style={{ fontWeight: "bold" }}>
                  {row.active === "Active" ? (
                    <span style={{ color: "green" }}>ใช้งาน</span>
                  ) : row.active === "inActive" ? (
                    <span style={{ color: "red" }}>ปิดการใช้งาน</span>
                  ) : (
                    <span style={{ color: color.secondary2 }}>รอตรวจสอบ</span>
                  )}
                </span>
              </div>
            </div>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      width: "9%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/EditDroneList?=" + row.id)
                }
              />
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layouts>
      <PageTitle />
      <br />
      <Table
        columns={columns}
        dataSource={droneList}
        pagination={{ position: ["bottomRight"] }}
        size="large"
        tableLayout="fixed"
      />
    </Layouts>
  );
}

export default DroneList;
