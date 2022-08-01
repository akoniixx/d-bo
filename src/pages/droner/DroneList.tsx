import {
  Avatar,
  Badge,
  Button,
  Col,
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
  DRONER_DRONE_STATUS,
  DRONER_STATUS,
  DRONE_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import { DroneBrandListEntity } from "../../entities/DroneBrandEntities";
import { DronerDroneListEntity } from "../../entities/DronerDroneEntities";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import moment from "moment";
function DroneList() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [droneList, setDroneList] = useState<DronerDroneListEntity>();
  const [searchDroneBrand, setSearchDroneBrand] = useState<any>();
  const [droneBrandId, setDroneBrandId] = useState<any>();
  const [searchStatus, setSearchStatus] = useState<string>();
  const [searchText, setSearchText] = useState<string>();

  const fetchDroneList = async () => {
    await DronerDroneDatasource.getDronerDrone(
      current,
      row,
      searchDroneBrand,
      searchStatus,
      searchText
    ).then((res) => {
      setDroneList(res);
    });
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrandId(res.data);
    });
  };

  useEffect(() => {
    fetchDroneList();
    fetchDroneBrand();
  }, [current, searchText, searchStatus, searchDroneBrand]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const changeTextSearch = (value: string) => {
    setSearchText(value);
  };
  const handleDroneBrand = (droneBrandId: string) => {
    setSearchDroneBrand(droneBrandId);
  };
  const handleStatus = (status: any) => {
    setSearchStatus(status);
  };
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div className="col-lg-4">
          <span style={{ fontSize: 22, fontWeight: "bold" }}>
            <span> รายการโดรนเกษตร (Drone List)</span>
          </span>
        </div>
        <div
          className="container d-flex justify-content-between"
          style={{ padding: "8px" }}
        >
          <div className="col-lg-5">
            <Search
              placeholder="ค้นหาเลขตัวถังหรือชื่อนักบินโดรน หรือเบอร์โทร"
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
              {droneBrandId?.map((item: any) => (
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
              //onChange={handleDroneBrand}
            >
              {/* {droneBrandId?.map((item: any) => (
                <Option value={item.id.toString()}>{item.name}</Option>
              ))} */}
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
      // width: "20%",
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
      // width: "25%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              {/* <span className="text-dark-75  d-block font-size-lg">
                {row.droneBrand.logoImagePath ? (
                  <Avatar
                    size={25}
                    src={row.droneBrand.logoImagePath}
                    style={{ marginRight: "5px" }}
                  />
                ) : (
                  <Avatar
                    size={25}
                    style={{ color: "#0068F4", backgroundColor: "#EFF2F9" }}
                  >
                    {row.droneBrand.name.charAt(0)}
                  </Avatar>
                )}
               
              </span> */}
            </div>
          ),
        };
      },
    },
    {
      title: "รุ่นโดรน",
      dataIndex: "series",
      key: "series",
      // width: "24%",
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
      // width: "15%",
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "named",
      key: "named",
      // width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {row.droner.firstname + row.droner.lastname}
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "ใบอนุญาตนักบิน ",
      dataIndex: "paper",
      key: "paper",
      // width: "15%",
    },
    {
      title: "ใบอนุญาตโดรน(กสทช.) ",
      dataIndex: "paperA",
      key: "paperA",
      // width: "18%",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      // width: "13%",
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
                {DRONER_DRONE_STATUS[row.status]}
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
      // width: "9%",
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
        scroll={{ x: 1300 }}
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
