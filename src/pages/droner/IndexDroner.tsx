import {
  Badge,
  Button,
  Col,
  Empty,
  Input,
  Row,
  Select,
  Switch,
  Table,
} from "antd";
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
import {
  DRONER_STATUS,
  DRONER_STATUS_MAPPING,
} from "../../definitions/DronerStatus";
import { LocationDatasource } from "../../datasource/LocationDatasource";

const _ = require("lodash");
const { Map } = require("immutable");
function IndexDroner() {
  const { Search } = Input;
  const [optionalTextSearch, setTextSearch] = useState<string>();
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [subdistrict, setSubdistrict] = useState<any[]>([]);
  const [data, setData] = useState<DronerEntity[]>([DronerEntity_INIT]);
  useEffect(() => {
    fetchDronerList(
      selectStatus,
      searchProvince,
      searchDistrict,
      searchSubdistrict,
      1,
      10,
      "ASC",
      optionalTextSearch
    );
    fetchProvince();
  }, [
    optionalTextSearch,
    selectStatus,
    searchProvince,
    searchDistrict,
    searchSubdistrict,
  ]);
  const fetchDronerList = async (
    status: string,
    provinceId: number,
    districtId: number,
    subdistrictId: number,
    page: number,
    take: number,
    sortDirection: string,
    search?: string
  ) => {
    await DronerDatasource.getDronerList(
      status,
      provinceId,
      districtId,
      subdistrictId,
      page,
      take,
      sortDirection,
      search
    ).then((res) => {
      console.log(res)
      setData(res.data);
    });
  };
  const fetchProvince = async () => {
    await LocationDatasource.getProvince()
      .then((res) => {
        setProvince(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleProvince = async (provinceId: any) => {
    setSearchProvince(provinceId)
    LocationDatasource.getDistrict(provinceId)
      .then((res) => {
        console.log(res)
        setDistrict(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDistrict = (districtId: any) => {
    setSearchDistrict(districtId)
    LocationDatasource.getSubdistrict(districtId)
      .then((res) => {
        console.log(res)
        setSubdistrict(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubDistrict = (subdistrictId: any) => {
    setSearchSubdistrict(subdistrictId)
  };
  const changeTextSearch = (text?: string) => {
    setTextSearch(text);
  };
  const handleStatus = (value: string) => {
    setSelectStatus(value);
  };
  const colorStatus = (status: string) => {
    if (status == "ACTIVE") {
      return "text-success ";
    } else if (status == "PENDING") {
      return "text-warning ";
    } else if (status == "INACTIVE") {
      return "text-muted ";
    } else if (status == "REJECTED") {
      return "text-danger ";
    } else {
      return "text-muted ";
    }
  };
  const colorBadge = (status: string) => {
    if (status == "ACTIVE") {
      return color.Success;
    } else if (status == "PENDING") {
      return color.Warning;
    } else if (status == "INACTIVE") {
      return color.Grey;
    } else if (status == "REJECTED") {
      return color.Error;
    } else {
      return color.Disable;
    }
  };
  const sorter = (a: any, b: any) => {
    if (a === b) return 0;
    else if (a === null) return 1;
    else if (b === null) return -1;
    else return a.localeCompare(b);
  };

  const PageTitle = () => {
    return (
      <div className="container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={20}>
            <div>
              <span
                className="card-label font-weight-bolder text-dark"
                style={{ fontSize: 22, fontWeight: "bold", padding: "8px 0" }}
              >
                รายชื่อนักบินโดรน (Droner)
              </span>
            </div>
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={5}>
            <Search
              style={{ width: "250px", padding: "8px 0" }}
              placeholder="ค้นหาชื่อนักบินโดรนหรือเบอร์โทร"
              onSearch={changeTextSearch}
            />
          </Col>
          <Col className="gutter-row" span={3} offset={3}>
            <Select
              style={{
                width: "145px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              defaultValue="เลือกจังหวัด"
              onChange={handleProvince}
              value={searchProvince}

            >
              {province.map((item: any, index: any) => (
                <option key={index} value={item.provinceId}>
                  {item.region}
                </option>
              ))}
            </Select>
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "145px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              defaultValue="เลือกอำเภอ"
              onChange={handleDistrict}
              value={searchDistrict}

            >
              {district.map((item: any, index: any) => (
                <option key={index} value={item.districtId}>
                  {item.districtName}
                </option>
              ))}
            </Select>
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "145px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              defaultValue="เลือกตำบล"
              onChange={handleSubDistrict}
              value={searchSubdistrict}>
            
              {subdistrict.map((item: any, index: any) => (
                <option key={index} value={item.subdistrictId}>
                  {item.subdistrictName}
                </option>
              ))}
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
              <Option value="1">DJI</Option>
              <Option value="2">AAA</Option>
              <Option value="3">DDD</Option>
              <Option value="4">CAT</Option>
            </Select>
          </Col>
          <Col className="gutter-row">
            <Select
              style={{
                width: "145px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              className="col-lg-12"
              defaultValue="เลือกสถานะ"
              onChange={handleStatus}
              value={selectStatus}
            >
              <Option value="">เลือกสถานะ</Option>
              {DRONER_STATUS.map((item) => (
                <option value={item.key}></option>
              ))}
            </Select>
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
      sorter: (a: any, b: any) => sorter(a.firstname, b.firstname),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
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
      dataIndex: "subdistrict",
      key: "subdistrict",
      width: "15%",
      sorter: (a: any, b: any) => sorter(a.subdistrict, b.subdistrict),
      render: (value: any, row: any, index: number) => {
        const checkNull = () => {
          if (row.address?.subdistrict) {
            return row.address?.subdistrict.subdistrictName;
          } else {
            return null;
          }
        };
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {checkNull()}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
      width: "15%",
      sorter: (a: any, b: any) => sorter(a.district, b.district),
      render: (value: any, row: any, index: number) => {
        const checkNull = () => {
          if (row.address.district) {
            return row.address.district.districtName;
          } else {
            return null;
          }
        };
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {checkNull()}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: "15%",
      sorter: (a: any, b: any) => sorter(a.province, b.province),
      render: (value: any, row: any, index: number) => {
        const checkNull = () => {
          if (row.address.province) {
            return row.address.province.region;
          } else {
            return null;
          }
        };
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {checkNull()}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
      width: "14%",
    },
    {
      title: "จำนวนโดรน",
      dataIndex: "totalDroneCount",
      key: "totalDroneCount",
      width: "13%",
      sorter: (a: any, b: any) => sorter(a.totalDroneCount, b.totalDroneCount),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.totalDroneCount + " " + "เครื่อง"}
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
      width: "10%",
      sorter: (a: any, b: any) => sorter(a.brand, b.brand),
      render: (value: any, row: any, index: number) => {
        const checkNull = () => {
          if (row.dronerDrone.drone) {
            return row.dronerDrone.drone.brand;
          } else {
            return null;
          }
        };
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {checkNull()}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "16%",
      sorter: (a: any, b: any) => sorter(a.status, b.status),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className={colorStatus(value)}>
                <Badge color={colorBadge(value)} />
                {DRONER_STATUS_MAPPING[value]}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      width: "7%",
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
        dataSource={data}
        pagination={{ position: ["bottomRight"] }}
        size="large"
        tableLayout="fixed"
      />
    </Layouts>
  );
}

export default IndexDroner;
