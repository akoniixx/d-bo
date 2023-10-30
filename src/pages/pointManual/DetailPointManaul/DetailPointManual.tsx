import React, { useEffect, useState } from "react";
import { BackIconButton } from "../../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import AddButtton from "../../../components/button/AddButton";
import {
  Badge,
  Button,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
} from "antd";
import SummaryPoint from "../../../components/card/SummaryPoint";
import { color, icon } from "../../../resource";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PointReceiveDatasource } from "../../../datasource/PointReceiveDatasource";
import { Container } from "react-bootstrap";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import {
  STATUS_COLOR_POINT_MANUAL,
  STATUS_POINT_MANUAL,
} from "../../../definitions/Status";
import ActionButton from "../../../components/button/ActionButton";
import ModalDelete from "../../../components/modal/ModalDelete";

function DetailPointManual() {
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const row = 5;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<any>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeyPoint, setSearchKeyPoint] = useState("รอ");

  const [searchTask, setSearchTask] = useState("");
  const [searchStartDate, setSearchStartDate] = useState<any>(null);
  const [searchEndDate, setSearchEndDate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [modalReturnPoint, setModalReturnPoint] = useState<boolean>(false);
  const [modalDeletePoint, setModalDeletePoint] = useState<boolean>(false);

  const fetchPlanningPoint = () => {
    setLoading(true);
    PointReceiveDatasource.getPlanningPoint(
      "PENDING",
      row,
      current,
      searchKeyword,
      searchTask,
      searchStartDate,
      searchEndDate
    )
      .then((res) => {
        const mapKey = res.data.map((x, i) => ({
          ...x,
          key: i + 1,
        }));
        setData({ ...res, data: mapKey });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPlanningPoint();
  }, [searchStartDate, searchEndDate, current]);

  const summary = (
    <>
      <Row justify={"space-between"} gutter={16}>
        <Col span={8}>
          <SummaryPoint
            title={"จำนวนนักบินโดรน"}
            bgColor={color.Warning}
            point={1}
            time={1}
            label={"นักบินโดรน"}
            pointManual={true}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={"จำนวนเกษตรกร"}
            bgColor={color.Success}
            point={1}
            time={1}
            label={"เกษตรกร"}
            pointManual={true}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={"แต้มที่ให้ทั้งหมด"}
            bgColor={color.Grey}
            point={200}
            label={"แต้มที่ให้ทั้งหมด"}
          />
        </Col>
      </Row>
    </>
  );
  const onChange = (key: string) => {
    setSearchKeyPoint(key);
    console.log(key);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const returnPointManual = (value: any) => {
    setModalReturnPoint((prev) => !prev);
  };
  const DeletePointManual = (value: any) => {
    setModalDeletePoint((prev) => !prev);
  };

  const columns = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.created_at && DateTimeUtil.formatDateTime(row.created_at)}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "Point No.",
      dataIndex: "point_no",
      key: "point_no",
    },
    {
      title: "Task No.",
      dataIndex: "task_no",
      key: "task_no",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "reason",
      key: "reason",
      render: (value: any, row: any, index: number) => {
        return {
          children: <p>-</p>,
        };
      },
    },
    {
      title: "สร้างโดย",
      dataIndex: "createBy",
      key: "createBy",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>แอดมิน ไอคอน (Admin)</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {" "}
              <span
                style={{ color: STATUS_COLOR_POINT_MANUAL[searchKeyPoint] }}
              >
                <Badge color={STATUS_COLOR_POINT_MANUAL[searchKeyPoint]} />{" "}
                {STATUS_POINT_MANUAL[searchKeyPoint]}
              </span>
            </>
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
            <Row justify={"space-between"}>
              {searchKeyPoint === "รอ" ? (
                <>
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => navigate("/EditDetailPointManual")}
                  />
                  <ActionButton
                    icon={<DeleteOutlined />}
                    color={color.Error}
                    onClick={() => DeletePointManual(row)}
                  />
                </>
              ) : (
                <>
                  <ActionButton
                    icon={
                      <Image
                        src={icon.returnPoint}
                        preview={false}
                        style={{ width: 15, height: 18 }}
                      />
                    }
                    color={color.Error}
                    onClick={() => returnPointManual(row)}
                  />
                </>
              )}
            </Row>
          ),
        };
      },
    },
  ];

  const searchContent = (
    <>
      <div className="d-flex justify-content-between pb-3">
        <div className="col-lg-8 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / ชื่อเกษตรกร / รหัส / เบอร์โทร"
            className="col-lg-12"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="col-lg-3 p-1">
          <Select
            className="col-lg-12"
            placeholder="ประเภทผู้ใช้งาน"
            allowClear
            onChange={(e) => console.log(e)}
          >
            <option value="FARMER">เกษตรกร</option>
            <option value="DRONER">นักบินโดรน</option>
          </Select>
        </div>
        <div className="col-lg p-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            // onClick={onSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const expandData = (record: any) => {
    let checkFarmer = record.farmer;
    return (
      <Row justify={"space-between"} gutter={16}>
        {checkFarmer !== null && (
          <Col span={24}>
            <Container
              style={{
                backgroundColor: "rgba(86, 167, 104, 0.1)",
                borderRadius: "5px",
              }}
              className="p-3"
            >
              <Row>
                <Col span={12}>
                  <label>เกษตรกร : </label>{" "}
                  <span style={{ color: color.Success }}>
                    <u>
                      {checkFarmer[0].first_name +
                        " " +
                        checkFarmer[0].last_name}
                    </u>
                  </span>
                </Col>
                <Col span={7}>
                  <label>เบอร์ : </label>{" "}
                  <span>{checkFarmer[0].telephone_no}</span>
                </Col>
                <Col span={5}>
                  <label>แต้ม :</label>{" "}
                  <span>
                    + {numberWithCommas(checkFarmer[0].receive_point)}
                  </span>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    );
  };
  const tableContent = (
    <>
      <Table
        dataSource={data?.data}
        expandable={{
          expandedRowRender: (record) => expandData(record),
          showExpandColumn: false,
          expandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }}
        columns={columns}
        pagination={false}
      />
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  );
  const tabsContent = (
    <div className="pt-3">
      <Tabs onChange={onChange} type="card">
        <TabPane tab="รอรับแต้ม (1)" key="รอ">
          {searchContent}
          {tableContent}
        </TabPane>
        <TabPane tab="ได้รับแต้ม (1)" key="ได้">
          {searchContent}
          {tableContent}
        </TabPane>
        <TabPane tab="คืนแต้ม (1)" key="คืน">
          {searchContent}
          {tableContent}
        </TabPane>
      </Tabs>
    </div>
  );

  return (
    <>
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <BackIconButton onClick={() => navigate(-1)} />
            <span className="pt-3">
              <strong style={{ fontSize: "20px" }}>
                รายละเอียด : แต้มสำหรับแนะนำยาให้เกษตรกร
              </strong>
            </span>
          </div>

          <div className="align-self-center">
            <AddButtton
              text="เพิ่มแต้มพิเศษ"
              onClick={() => navigate("/AddDetailPointManual")}
            />
          </div>
        </div>
        {summary}
        {tabsContent}
        <ModalDelete
          title="ยืนยันการคืนแต้ม"
          show={modalReturnPoint}
          backButton={() => setModalReturnPoint(!modalReturnPoint)}
          callBack={() => {
            setModalReturnPoint(!modalReturnPoint);
            console.log(1);
          }}
          title1={"โปรดตรวจสอบของคืนแต้มที่คุณต้องการ ก่อนที่จะกดยืนยัน"}
          title2={"เพราะอาจส่งผลต่อการแสดงผลแต้มของผู้ใช้ในแอปพลิเคชัน"}
        />
        <ModalDelete
          show={modalDeletePoint}
          backButton={() => setModalDeletePoint(!modalDeletePoint)}
          callBack={() => {
            setModalDeletePoint(!modalDeletePoint);
            console.log(1);
          }}
          title1={"โปรดตรวจสอบของแต้มพิเศษที่คุณต้องการลบ ก่อนที่จะกดยืนยัน"}
          title2={"เพราะอาจส่งผลต่อการแสดงผลแต้มของผู้ใช้ในแอปพลิเคชัน"}
        />
      </Spin>
    </>
  );
}

export default DetailPointManual;
