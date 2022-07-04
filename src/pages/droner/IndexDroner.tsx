import { Button, Col, Empty, Input, Row, Select, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import Layouts from "../../components/layout/Layout";
import EditButton from "../../components/button/ActionButton";
import ActionButton from "../../components/button/ActionButton";
import { EditOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";

function IndexDroner() {
  const { Search } = Input;
  const [optionalTextSearch, setTextSearch] = useState<string>();
  const [dronerList, setDronerList] = useState<DronerEntity[]>([
    DronerEntity_INIT,
  ]);

  const fetchDronerList = async (
    status: string,
    page: number,
    take: number,
    sortDirection: string,
    search?: string
  ) => {
    await DronerDatasource.getDronerList(
      status,
      page,
      take,
      sortDirection,
      search
    ).then((res) => {
      setDronerList(res.data);
      console.log(res.data);
    });
  };

  const changeTextSearch = (text?: string) => {
    setTextSearch(text);
  };

  useEffect(() => {
    fetchDronerList("OPEN", 1, 5, "ASC", optionalTextSearch);
  }, [optionalTextSearch]);

  const PageTitle = () => {
    return (
      <div className="container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div>
              <span
                className="card-label font-weight-bolder text-dark"
                style={{ fontSize: 22, fontWeight: "bold", padding: "8px 0" }}
              >
                รายชื่อนักบินโดรน (Droner)
              </span>
            </div>
          </Col>
          <Col className="gutter-row" span={5}>
            <Search
              style={{ width: "245px", padding: "8px 0" }}
              placeholder="ค้นหาชื่อนักบินโดรนหรือเบอร์โทร"
              onSearch={changeTextSearch}
            />
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "145px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกจังหวัด/อำเภอ/ตำบล"
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
              defaultValue="เลือกสถานะ"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row" style={{ marginTop: "8px" }}>
            <Button
              style={{
                width: "130px",
                padding: "8 0",
                backgroundColor: color.primary1,
                color: color.secondary2,
                borderColor: color.Success,
                borderRadius: "5px",
              }}
              onClick={() => (window.location.href = "/AddDroner")}
              type="primary"
            >
              + เพิ่มนักบินโดรน
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "firstname",
      key: "firstname",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="test">
              <span className="text-dark-75  d-block font-size-lg">
                {row.firstname + " " + row.lastname}
              </span>
              <span style={{ color: color.Disable }}>{row.pin}</span>
            </div>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "subDistrict",
      key: "subDistrict",
      width: "12%",
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
      width: "12%",
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: "12%",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
      width: "12%",
    },
    {
      title: "จำนวนโดรน",
      dataIndex: "count",
      key: "count",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="test">
              <span className="text-dark-75  d-block font-size-lg">
                {/* {row.count + " " + "เครื่อง"} */}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "ยี่ห้อ",
      dataIndex: "brand",
      key: "brand",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="test">
              <span className="text-dark-75  d-block font-size-lg">
                {row.brand}
              </span>
              <span style={{ color: color.Disable }}>{row.otherdrone}</span>
            </div>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "active",
      key: "active",
      width: "12%",
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
                  (window.location.href = "/EditDroner?=" + row.id)
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
        dataSource={dronerList}
        pagination={{ position: ["bottomRight"] }}
        size="large"
        tableLayout="fixed"
      />
    </Layouts>
  );
}

export default IndexDroner;
