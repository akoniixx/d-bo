import {
  FileTextOutlined,
  InfoCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ActionButton from "../../components/button/ActionButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import { RedeemDatasource } from "../../datasource/RedeemDatasource";
import { RedeemFarmerListEntity } from "../../entities/RedeemEntities";
import { color } from "../../resource";
import image from "../../resource/image";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";

const { RangePicker } = DatePicker;
const dateSearchFormat = "YYYY-MM-DD";

const IndexRedeem = () => {
  const dateFormat = "DD/MM/YYYY";
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [source, setSource] = useState<string>(
    window.location.pathname.split("/")[2]
  );
  const [dataFarmer, setDataFarmer] = useState<RedeemFarmerListEntity>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchStartDate, setSearchStartDate] = useState<any>(null);
  const [searchEndDate, setSearchEndDate] = useState<any>(null);
  const [searchStatus, setSearchStatus] = useState("");

  const fetchRedeemFarmer = () => {
    RedeemDatasource.getRedeemFarmer(
      row,
      current,
      searchKeyword,
      searchStartDate,
      searchEndDate,
      searchStatus
    ).then((res) => {
      setDataFarmer(res);
    });
  };

  useEffect(() => {
    fetchRedeemFarmer();
  }, [current, searchStartDate, searchEndDate]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const onSearch = () => {
    setCurrent(1);
    fetchRedeemFarmer();
  };
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setSearchStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setSearchEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setSearchStartDate(e);
      setSearchEndDate(e);
    }
    setCurrent(1);
  };

  const plainOptions = ["Physical", "Digital"];

  const dataMockDroner = [
    {
      key: 1,
      dateTime: Date(),
      redeemNo: "RD0000001",
      rewardNo: "RW000001",
      missionNo: "",
      rewardType: "Physical",
      firstName: "รชยา",
      lastName: "ช่างภักดี",
      telephone: "0938355808",
      status: "คำร้องขอแลก",
      description: {
        img: image.reward,
        name: "บัตรเติมน้ำมัน 500 บาท",
        point: 100,
        qty: 5,
        totalpoint: 500,
      },
    },
    {
      key: 2,
      dateTime: Date(),
      redeemNo: "RD0000002",
      rewardNo: "RW000002",
      missionNo: "MS000002",
      rewardType: "Physical",
      firstName: "รชยา",
      lastName: "ช่างภักดี",
      telephone: "0938355808",
      status: "คำร้องขอแลก",
      description: {
        img: image.reward,
        name: "บัตรเติมน้ำมัน 500 บาท",
        point: 100,
        qty: 5,
        totalpoint: 500,
      },
    },
  ];

  const pageTitle = (
    <>
      <Row justify={"space-between"} style={{ padding: "10px" }}>
        <Col span={16}>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>รายงานแต้ม (แลกแต้ม)</strong>
          </span>
        </Col>
        <Col span={2}>
          <Radio.Group buttonStyle="outline">
            <Radio.Button
              value="Farmer"
              style={
                source === "Farmer"
                  ? {
                      color: color.Success,
                      borderColor: color.Success,
                      borderRadius: "5px, 5px",
                      backgroundColor: "rgba(33, 150, 83, 0.1)",
                    }
                  : {}
              }
              onClick={() => setSource("Farmer")}
            >
              เกษตรกร
            </Radio.Button>
            {/* <Radio.Button
              value="Droner"
              style={
                source === "Droner"
                  ? {
                      color: color.Warning,
                      borderColor: color.Warning,
                      borderRadius: "5px, 5px",
                      backgroundColor: "rgba(234, 151, 62, 0.1)",
                    }
                  : {}
              }
              onClick={() => setSource("Droner")}
            >
              นักบินโดรน
            </Radio.Button> */}
          </Radio.Group>
        </Col>
        {/* <Col>
          <Radio.Group
            options={plainOptions}
            buttonStyle="solid"
            defaultValue="Physical"
          />
        </Col> */}
        <Col span={6} style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
        </Col>
      </Row>
      {source === "Farmer" && (
        <div
          className="container d-flex justify-content-between"
          style={{ padding: "8px" }}
        >
          <div className="col-lg-8 p-1">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร"
              className="col-lg-12 p-1"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="col-lg">
            <Select
              className="col-lg-12 p-1"
              placeholder="สถานะทั้งหมด"
              allowClear
              onChange={(e) => setSearchStatus(e)}
            >
              <option value="SUCCESS">แลกสำเร็จ</option>
              <option value="CANCELED">ยกเลิก</option>
            </Select>
          </div>
          <div className="pt-1">
            <Button
              style={{
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
              onClick={onSearch}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
        </div>
      )}
      {source === "Droner" && (
        <div
          className="container d-flex justify-content-between"
          style={{ padding: "8px" }}
        >
          <div className="col-lg-4 p-1">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร"
              className="col-lg-12 p-1"
            />
          </div>
          <div className="col-lg p-1">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหารหัส Mission No."
              className="col-lg-12 p-1"
            />
          </div>
          <div className="col-lg">
            <Select
              className="col-lg-12 p-1"
              placeholder="ประเภทของรางวัล"
              allowClear
            >
              <option value="Physical">Physical</option>
              <option value="Digital">Digital</option>
            </Select>
          </div>
          <div className="col-lg">
            <Select
              className="col-lg-12 p-1"
              placeholder="สถานะทั้งหมด"
              allowClear
            >
              <option value="คำร้องขอแลก">คำร้องขอแลก</option>
              <option value="เตรียมจัดส่ง">เตรียมจัดส่ง</option>
              <option value="ส่งแล้ว">ส่งแล้ว</option>
              <option value="ยกเลิก">ยกเลิก</option>
            </Select>
          </div>
          <div className="pt-1">
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
        </div>
      )}
    </>
  );
  const columnsFarmer = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.createdAt && DateTimeUtil.formatDateTime(row.createdAt)}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "Task No",
      dataIndex: "taskNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: <u style={{ color: color.Success }}>{row.taskNo}</u>,
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{row.farmer.firstname + " " + row.farmer.lastname}</span>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.farmer.telephoneNo}</span>,
        };
      },
    },
    {
      title: "แต้มที่แลก",
      dataIndex: "point",
      width: "10%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: color.Error }}>- {row.usePoint}</span>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: "10%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color:
                    row.status !== "CANCELED" ? color.Success : color.Error,
                }}
              >
                <Badge
                  color={
                    row.status !== "CANCELED" ? color.Success : color.Error
                  }
                />{" "}
                {row.status === "CANCELED" ? "ยกเลิก" : "แลกสำเร็จ"}
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
      width: "8%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-6">
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/DetailFarmerRedeem/id=" + row.id)
                  }
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];
  const columnsDroner = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "dateTime",
      key: "dateTime",
      width: "13%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.dateTime && DateTimeUtil.formatDateTime(row.dateTime)}
            </span>
          ),
        };
      },
    },
    {
      title: "Redeem No",
      dataIndex: "redeemNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.redeemNo}</span>,
        };
      },
    },
    {
      title: "Reward No",
      dataIndex: "rewardNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.rewardNo}</span>,
        };
      },
    },
    {
      title: "Mission No",
      dataIndex: "missionNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.missionNo}</span>
              {row.missionNo && (
                <Tooltip
                  placement="top"
                  title={
                    "ชื่อภารกิจ : สะสมการบินครบ 1,000 ไร่, รับไปเลย 100 แต้ม"
                  }
                  key={row.key}
                >
                  <InfoCircleFilled
                    style={{
                      position: "relative",
                      bottom: 3,
                      left: 4,
                      color: color.Success,
                    }}
                  />
                </Tooltip>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <u style={{ color: color.Success }}>
              {row.firstName + " " + row.lastName}
            </u>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephone}</span>,
        };
      },
    },
    {
      title: "ประเภทของรางวัล",
      dataIndex: "rewardType",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {" "}
              <span>{row.rewardType}</span>
              <span
                style={{ color: row.key === 1 ? color.Warning : "#A9CB62" }}
              >
                {row.key === 1 ? " (ใช้แต้ม)" : " (ภารกิจ)"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color:
                    row.status === "ยกเลิก" ? color.Error : color.secondary2,
                }}
              >
                <Badge
                  color={
                    row.status === "ยกเลิก" ? color.Error : color.secondary2
                  }
                />{" "}
                {row.status}
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
      width: "8%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-6">
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href =
                      "/DetailDronerRedeem/id=" + (index + 1))
                  }
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const expandable = (record: any) => {
    return (
      <Container
        style={{
          backgroundColor: "rgba(86, 167, 104, 0.1)",
        }}
        className="p-3"
      >
        <Row>
          <Col span={2}>
            <img src={record.description.img} width={55} height={55} />
          </Col>
          <Col span={10} className="p-2">
            <div>ชื่อของรางวัล</div>
            <div>{record.description.name}</div>
          </Col>
          <Col span={4} className="p-2">
            <div>แต้มที่แลก</div>
            <div>{record.description.point} แต้ม</div>
          </Col>
          <Col span={3} className="p-2">
            <div>จำนวน</div>
            <div>{record.description.qty} ชิ้น</div>
          </Col>
          <Col span={3} className="p-2">
            <div>รวมแต้มทั้งหมด</div>
            <div style={{ color: color.Error }}>
              {record.description.totalpoint} แต้ม
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Layouts>
      {pageTitle}
      <CardContainer>
        {source === "Farmer" && (
          <Table
            dataSource={dataFarmer?.data}
            columns={columnsFarmer}
            pagination={false}
            size="large"
            tableLayout="fixed"
          />
        )}
        {source === "Droner" && (
          <Table
            dataSource={dataMockDroner}
            expandable={{
              expandedRowRender: (record) => expandable(record),
              showExpandColumn: false,
              defaultExpandAllRows: true,
            }}
            columns={columnsDroner}
            pagination={false}
            size="large"
            tableLayout="fixed"
          />
        )}
      </CardContainer>
      <div className="d-flex justify-content-between pt-4">
        <p>
          รายการทั้งหมด{" "}
          {source === "Farmer" ? dataFarmer?.count : dataMockDroner.length}{" "}
          รายการ
        </p>
        <Pagination
          current={current}
          total={
            source === "Farmer" ? dataFarmer?.count : dataMockDroner.length
          }
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  );
};

export default IndexRedeem;
