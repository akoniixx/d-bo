import {
  Avatar,
  Badge,
  Button,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
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
import {
  DRONER_DRONE_MAPPING,
  DRONER_DRONE_STATUS,
  DRONER_STATUS,
  DRONE_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import {
  DroneBrandEntity,
  DroneBrandListEntity,
} from "../../entities/DroneBrandEntities";
import { DronerDroneListEntity } from "../../entities/DronerDroneEntities";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import moment from "moment";
import { Link } from "react-router-dom";
import { FileTextFilled } from "@ant-design/icons";
import { DroneEntity } from "../../entities/DroneEntities";
const { Map } = require("immutable");
function DroneList() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [droneList, setDroneList] = useState<DronerDroneListEntity>();
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<any>();
  const [searchDroneBrand, setSearchDroneBrand] = useState<any>();
  const [searchStatus, setSearchStatus] = useState<string>();
  const [searchText, setSearchText] = useState<string>();
  const [visible, setVisible] = useState(false);

  const fetchDronerDroneList = async () => {
    await DronerDroneDatasource.getDronerDrone(
      current,
      row,
      searchStatus,
      searchSeriesDrone,
      searchDroneBrand,
      searchText
    ).then((res) => {
      setDroneList(res);
    });
  };
  const fetchDroneList = async () => {
    await DroneDatasource.getDroneList(current, 500).then((res) => {
      setSeriesDrone(res.data);
    });
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrand(res.data);
    });
  };
  useEffect(() => {
    fetchDronerDroneList();
    fetchDroneList();
    fetchDroneBrand();
  }, [current, searchStatus, searchSeriesDrone, searchDroneBrand, searchText]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const changeTextSearch = (value: string) => {
    setSearchText(value);
    setCurrent(1);
  };
  const handleDroneBrand = (droneBrand: string) => {
    setSearchDroneBrand(droneBrand);
    setCurrent(1);
  };
  const handleDroneSeries = (seriesDrone: string) => {
    setSearchSeriesDrone(seriesDrone);
    setCurrent(1);
  };
  const handleStatus = (status: any) => {
    setSearchStatus(status);
    setCurrent(1);
  };
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div className="col-lg-3">
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            <span> รายการโดรนเกษตร (Drone List)</span>
          </span>
        </div>
        <div className="container d-flex justify-content-between">
          <div className="col-lg-4">
            <Search
              placeholder="ค้นหาเลขตัวถังหรือชื่อนักบินโดรน"
              className="col-lg-12 p-1"
              onSearch={changeTextSearch}
            />
          </div>
          <div className="col">
            <Select
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
              className="col-lg-12 p-1"
              placeholder="เลือกยี่ห้อ"
              allowClear
              onChange={handleDroneBrand}
            >
              {droneBrand?.map((item: any) => (
                <Option value={item.id.toString()}>{item.name}</Option>
              ))}
            </Select>
          </div>
          <div className="col">
            <Select
              className="col-lg-12 p-1"
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
              placeholder="เลือกรุ่นโดรน"
              allowClear
              onChange={handleDroneSeries}
            >
              {seriesDrone?.map((item: any) => (
                <Option value={item.id.toString()}>{item.series}</Option>
              ))}
            </Select>
          </div>
          <div className="col">
            <Select
              className="col-lg-12 p-1"
              placeholder="เลือกสถานะ"
              onChange={handleStatus}
            >
              {DRONE_STATUS.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "createdAt",
      key: "createdAt",
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
      dataIndex: "droneBrand",
      key: "droneBrand",
      render: (value: any, row: any, index: number) => {
        const filterDrone = row.drone.droneBrandId;
        let nameDrone = droneBrand?.filter((x) => x.id == filterDrone)[0];
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {nameDrone?.logoImagePath ? (
                  <Avatar
                    size={25}
                    src={nameDrone.logoImagePath}
                    style={{ marginRight: "5px" }}
                  />
                ) : (
                  <Avatar
                    size={25}
                    style={{ color: "#0068F4", backgroundColor: "#EFF2F9" }}
                  >
                    {nameDrone?.name.charAt(0)}
                  </Avatar>
                )}
                {nameDrone?.name}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "รุ่นโดรน",
      dataIndex: "series",
      key: "series",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {row.drone.series}
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "เลขตัวถัง",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "named",
      key: "named",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {row.droner.firstname + " " + row.droner.lastname}
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "ใบอนุญาตนักบิน ",
      dataIndex: "licenseDroner",
      key: "licenseDroner",
      render: (value: any, row: any, index: number) => {
        const filterDrone = row.drone.droneBrandId;
        let nameDrone = droneBrand?.filter((x) => x.id == filterDrone)[0];
        // console.log(nameDrone);
        // const filterFile = row.drone.droneBrandId;
        // let licenseDroner = seriesDrone?.filter((x) => x.id == filterFile);
        // console.log(licenseDroner)
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  <Link to="/" style={{ color: color.Success }}>
                    <span style={{ marginRight: "5px", color: color.Success }}>
                      <FileTextFilled />
                    </span>
                    ใบอนุญาตนักบิน
                  </Link>
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "ใบอนุญาตโดรน(กสทช.) ",
      dataIndex: "licenseDrone",
      key: "licenseDrone",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  <Link to="/" style={{ color: color.Success }}>
                    <span style={{ marginRight: "5px", color: color.Success }}>
                      <FileTextFilled />
                    </span>
                    ใบอนุญาตโดรน(กสทช.)
                  </Link>
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        const countDay = () => {
          let dateToday: any = moment(Date.now());
          let createDate: any = moment(new Date(row.createdAt));
          let dateDiff = dateToday.diff(createDate, "day");
          let textDateDiff =
            dateDiff == 0 ? null : "(รอไปแล้ว " + dateDiff + " วัน)";
          return textDateDiff;
        };
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR[row.status] }}>
                <Badge color={STATUS_COLOR[row.status]} />
                {DRONER_DRONE_MAPPING[row.status]}
                <br />
              </span>
              <span style={{ color: color.Grey }}>
                {row.status == "PENDING" ? countDay() : null}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
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
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={droneList?.data}
        pagination={false}
        scroll={{ x: 1410 }}
        rowClassName={(a) =>
          a.status == "PENDING" &&
          moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >= 3
            ? "PENDING" &&
              moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >= 7
              ? "table-row-older"
              : "table-row-old"
            : "table-row-lasted"
        }
      />
      <div className="d-flex justify-content-between pt-5">
        <h5>รายการทั้งหมด {droneList?.count} รายการ</h5>
        <Pagination
          current={current}
          total={droneList?.count}
          onChange={onChangePage}
          pageSize={row}
        />
      </div>
    </Layouts>
  );
}

export default DroneList;
