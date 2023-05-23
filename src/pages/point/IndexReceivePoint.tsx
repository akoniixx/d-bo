import {
  FileTextOutlined,
  InfoCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Row,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import { PointReceiveDatasource } from "../../datasource/PointReceiveDatasource";
import { ReceivePointListEntity } from "../../entities/PointReceiveEntities";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
const { RangePicker } = DatePicker;

const IndexReceivePoint = () => {
  const dateFormat = "DD/MM/YYYY";
  const row = 5;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<ReceivePointListEntity>();

  const fetchData = () => {
    PointReceiveDatasource.getReceivePoint(row, current).then((res) => {
      //console.log(res);
      const mapKey = res.history.map((x, i) => ({
        ...x,
        key: i + 1,
      }));
      setData({ ...res, history: mapKey });
    });
  };

  useEffect(() => {
    fetchData();
  }, [current]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const pageTitle = (
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
            <strong>รายการแต้ม (ได้รับแต้ม)</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหานักบินโดรน/เกษตรกร/เบอร์โทร"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหารหัส Task No."
            className="col-lg-12 p-1"
          />
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
    </>
  );

  const expandData = (record: any) => {
    let checkFarmer = record.farmerTransaction;
    let checkDroner = record.dronerTransaction;
    console.log("d", checkDroner);
    return (
      <Row justify={"space-between"} gutter={16}>
        {checkFarmer !== null && (
          <Col span={checkDroner !== null ? 12 : 24}>
            <Container
              style={{
                backgroundColor: "rgba(86, 167, 104, 0.1)",
                borderRadius: "5px",
              }}
              className="p-3"
            >
              <Row>
                <Col span={11}>
                  <label>ชื่อเกษตรกร : </label>{" "}
                  <span>
                    {checkFarmer.mission !== null
                      ? (checkFarmer.firstname + " " + checkFarmer.lastname)
                          .length > 20
                        ? (
                            checkFarmer.firstname +
                            " " +
                            checkFarmer.lastname
                          ).substring(0, 20)
                        : checkFarmer.firstname + " " + checkFarmer.lastname
                      : checkFarmer.firstname + " " + checkFarmer.lastname}
                  </span>
                </Col>
                <Col span={8}>
                  <label>เบอร์โทร : </label>{" "}
                  <span>{checkFarmer.telephoneNo}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label> <span>+{checkFarmer.amountValue}</span>
                  <Tooltip
                    placement="top"
                    title={
                      "แต้มที่จะได้รับ : " +
                      //checkFarmer.rai +
                      " ไร่ x" +
                      // checkFarmer[0].unitPoint +
                      " แต้ม"
                    }
                    key={1}
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
                </Col>
              </Row>
            </Container>
          </Col>
        )}
        {checkDroner !== null && (
          <Col span={checkFarmer !== null ? 12 : 24}>
            <Container
              style={{
                backgroundColor: "rgba(235, 87, 87, 0.1)",
                borderRadius: "5px",
              }}
              className="p-3"
            >
              <Row>
                <Col span={11}>
                  <label>ชื่อนักบินโดรน :</label>{" "}
                  <span>
                    {checkDroner.mission !== null
                      ? (checkDroner.firstname + " " + checkDroner.lastname)
                          .length > 20
                        ? (
                            checkDroner.firstname +
                            " " +
                            checkDroner.lastname
                          ).substring(0, 20) + "..."
                        : checkDroner.firstname + " " + checkDroner.lastname
                      : checkDroner.firstname + " " + checkDroner.lastname}
                  </span>
                </Col>
                <Col span={8}>
                  <label>เบอร์โทร :</label>{" "}
                  <span>{checkDroner.telephoneNo}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label> <span>+{checkDroner.amountValue}</span>
                  <Tooltip
                    placement="top"
                    title={
                      "แต้มที่จะได้รับ : " +
                      //checkDroner[0].rai +
                      " ไร่ x" +
                      //checkDroner[0].unitPoint +
                      " แต้ม"
                    }
                    key={1}
                  >
                    <InfoCircleFilled
                      style={{
                        position: "relative",
                        bottom: 3,
                        left: 4,
                        color: color.Warning,
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    );
  };

  const columns = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "dateTime",
      key: "dateTime",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.createAt && DateTimeUtil.formatDateTime(row.createAt)}
              </span>
              <br />
              <span style={{ color: color.Grey }}>{row.task_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "Task No",
      dataIndex: "taskNo",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <u style={{ color: color.Success }}>{row.taskNo}</u>,
        };
      },
    },
    {
      title: "Mission No",
      dataIndex: "missionId",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children:
            row.dronerTransaction !== null ? (
              row.dronerTransaction.mission ? (
                <u style={{ color: color.Success }}>
                  {row.dronerTransaction.mission.missionNo}
                </u>
              ) : (
                <>-</>
              )
            ) : (
              <>-</>
            ),
        };
      },
    },
    {
      title: "ประเภทการได้รับแต้ม",

      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.taskId ? "การจ้างงาน" : "ภารกิจ"}</span>,
        };
      },
    },
  ];

  return (
    <Layouts>
      {pageTitle}
      <CardContainer>
        <Table
          dataSource={data?.history}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => expandData(record),
            expandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            showExpandColumn: false,
          }}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-4">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  );
};
export default IndexReceivePoint;
