import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Image,
  Input,
  Table,
  Modal,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { OptionType } from "../newTask/AddNewTask";
import { color } from "../../../resource";
import { STATUS_NEWTASK_COLOR_MAPPING } from "../../../definitions/Status";
import icon from "../../../resource/icon";
import TextArea from "antd/lib/input/TextArea";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { InputPicker } from "rsuite";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import { NewTaskPageEntity } from "../../../entities/NewTaskEntities";

const NewTable = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(169, 203, 98, 0.1) !important;
    font-family: "Prompt" !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`;

const IndexAdminTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [current, setCurrent] = useState(1);
  const [taskList, setTaskList] = useState<any>();
  const [searchTaskList, setSearchTaskList] = useState<any>();
  const [source, setSource] = useState<string>("EDIT");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [taskSelected, setTaskSelected] = useState<any>("");
  const [taskNo, setTaskNo] = useState();
  const [count, setCount] = useState<number>(0);

  const fetchTaskList = () => {
    TaskDatasource.getNewTaskList(10, current, "", taskNo).then(
      (res: NewTaskPageEntity) => {
        console.log("res", res.data);
        setTaskList(res.data);
        const data = res.data.map((item) => {
          return {
            ...item,
            label: `${item.task_no} | ${item.task_status}`,
            value: item.id,
          };
        });
        setCount(res.count);
        setSearchTaskList(data);
      }
    );
  };

  useEffect(() => {
    fetchTaskList();
  }, [taskNo]);

  const onItemsRendered = (props: any) => {
    if (props.visibleStopIndex >= searchTaskList.length - 1) {
      if (searchTaskList.length < count) {
        TaskDatasource.getNewTaskList(10, current + 1, "", taskNo).then(
          (res: NewTaskPageEntity) => {
            console.log(current+1, res.data);
            setTaskList([...taskList, res.data]);
            const data = res.data.map((item) => {
              return {
                ...item,
                label: `${item.task_no} | ${item.task_status}`,
                value: item.id,
              };
            });
            setCurrent(current + 1);
            setSearchTaskList([...searchTaskList, ...data]);
          }
        );
      }
    }
  };
  const handleSearchTask = (id: any) => {
    console.log(id);
    console.log(searchTaskList.filter((x: any) => x.id === id)[0]);
    setTaskSelected(searchTaskList.filter((x: any) => x.id === id)[0]);
    //setSearchTaskList(searchTaskList.filter((x : any) => x.id === id)[0]);
  };

  const pageTitle = (
    <Row style={{ padding: "10px" }}>
      <Col span={24}>
        <span
          className="card-label font-weight-bolder text-dark"
          style={{
            fontSize: 22,
            fontWeight: "bold",
            padding: "8px",
          }}
        >
          <strong>การแก้ไข/ประวัติงาน</strong>
        </span>
      </Col>
    </Row>
  );
  const cardCurrentTask = (
    <Col span={12}>
      <Card style={{ backgroundColor: "#F2F5FC" }}>
        <Row
          justify={"center"}
          gutter={8}
          style={{
            fontSize: 16,
            paddingBottom: "15px",
            fontWeight: "bold",
          }}
        >
          รายละเอียดงานเดิม (ปัจจุบัน)
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
              fontWeight: "bold",
            }}
          >
            เกษตรกร
          </Col>
          <Col span={12} style={{ textAlign: "center", fontWeight: "bold" }}>
            นักบินโดรน
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{ textAlign: "center", borderRight: "2px groove" }}
          >
            {`${taskSelected.firstname} ${taskSelected.lastname} (${taskSelected.telephone_no})`}
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            {`${taskSelected.firstname} ${taskSelected.lastname} (${taskSelected.telephone_no})`}
          </Col>
        </Row>
      </Card>
      <Card style={{ height: "412px" }}>
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              วันที่นัดหมาย
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ช่วงเวลาการพ่น
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              เป้าหมายการพ่น
            </Col>
          </>
          <>
            <Col span={8}>
              {DateTimeUtil.formatDateTime(taskSelected.date_appointment)}
            </Col>
            <Col span={8}>คุมเลน</Col>
            <Col span={8}>หญ้า, หนอน</Col>
          </>
        </Row>
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              การเตรียมยา
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              แปลง
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              พืชที่ปลูก
            </Col>
          </>
          <>
            <Col span={8}>เกษตรกรเตรียมยาเอง</Col>
            <Col span={8}>แปลง 1 นาข้าว</Col>
            <Col span={8}>ข้าว</Col>
          </>
        </Row>
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ค่าบริการ/ไร่
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              จำนวนไร่
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              สถานะ
            </Col>
          </>
          <>
            <Col span={8}>55 บาท/ไร่</Col>
            <Col span={8}>20 ไร่</Col>
            <Col span={8}>
              <Badge
                color={STATUS_NEWTASK_COLOR_MAPPING["รอนักบินโดรนรับงาน"]}
              />{" "}
              <span
                style={{
                  color: STATUS_NEWTASK_COLOR_MAPPING["รอนักบินโดรนรับงาน"],
                }}
              >
                รอนักบินโดรนรับงาน
              </span>
            </Col>
          </>
        </Row>
      </Card>
      <Card style={{ backgroundColor: "#F2F5FC" }}>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
              fontWeight: "bold",
            }}
          >
            ยอดรวมค่าบริการ (เกษตรกร)
          </Col>
          <Col span={12} style={{ textAlign: "center", fontWeight: "bold" }}>
            รายได้ที่นักบินโดรนจะได้รับ
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              fontSize: 18,
              textAlign: "center",
              borderRight: "2px groove",
              fontWeight: "bold",
            }}
          >
            1,100.00 บาท
          </Col>
          <Col
            span={12}
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            1,220.00 บาท
          </Col>
        </Row>
        <Divider />
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ค่าบริการ{" "}
              <span style={{ fontSize: 12 }}> (ก่อนค่าธรรมเนียม)</span>
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ค่าธรรมเนียม (5%)
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ส่วนลดค่าธรรมเนียม
            </Col>
          </>
          <>
            <Col span={8}>1,100.00 บาท</Col>
            <Col span={8}>250.00 บาท</Col>
            <Col span={8}>250.00 บาท</Col>
          </>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ส่วนลดคูปอง
            </Col>
            <Col span={16} style={{ fontWeight: "bold" }}>
              ส่วนลดจากแต้ม
            </Col>
          </>
          <>
            <Col span={8}>100.00 บาท</Col>
            <Col span={16}>20.00 บาท</Col>
          </>
        </Row>
        <Divider />
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
              fontWeight: "bold",
            }}
          >
            ประมาณการแต้มเกษตรกร <br /> (Farmer Point)
          </Col>
          <Col span={12} style={{ textAlign: "center", fontWeight: "bold" }}>
            ประมาณการแต้มนักบินโดรน <br /> (Droner Point)
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
            }}
          >
            <Image
              preview={false}
              src={icon.coinFarmer}
              style={{ width: "25px", height: "25px" }}
            />{" "}
            400 แต้ม
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Image
              preview={false}
              src={icon.coinDroner}
              style={{ width: "25px", height: "25px" }}
            />{" "}
            400 แต้ม
          </Col>
        </Row>
      </Card>
    </Col>
  );
  const cardEditTask = (
    <Col span={12}>
      <Card style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
        <Row
          justify={"center"}
          gutter={8}
          style={{
            fontSize: 16,
            paddingBottom: "15px",
            fontWeight: "bold",
            color: color.Success,
          }}
        >
          แก้ไข/ปรับปรุงรายละเอียดงานใหม่
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
              color: color.Success,
              fontWeight: "bold",
            }}
          >
            เกษตรกร
          </Col>
          <Col
            span={12}
            style={{
              textAlign: "center",
              color: color.Success,
              fontWeight: "bold",
            }}
          >
            นักบินโดรน
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{ textAlign: "center", borderRight: "2px groove" }}
          >
            มานี มีนาเยอะ (081-234-5679)
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            สมศักดิ์ บินโดรน (081-234-5610)
          </Col>
        </Row>
      </Card>
      <Card>
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              วันที่นัดหมาย
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ช่วงเวลาการพ่น
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              เป้าหมายการพ่น
            </Col>
          </>
          <>
            <Col span={8}>18/05/2565, 11:00</Col>
            <Col span={8}>คุมเลน</Col>
            <Col span={8}>หญ้า, หนอน</Col>
          </>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              การเตรียมยา
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              แปลง
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              พืชที่ปลูก
            </Col>
          </>
          <>
            <Col span={8}>เกษตรกรเตรียมยาเอง</Col>
            <Col span={8}>แปลง 1 นาข้าว</Col>
            <Col span={8}>ข้าว</Col>
          </>
        </Row>
        <Divider />
        <Row justify={"space-between"} gutter={8}>
          <Col span={12}>
            <Form.Item>
              <label style={{ fontWeight: "bold" }}>ค่าบริการ/ไร่</label>
              <Input suffix="บาท/ไร่" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <label style={{ fontWeight: "bold" }}>
                จำนวนไร่{" "}
                <span style={{ color: color.Error, fontSize: "12px" }}>
                  *ปรับได้ตั้งแต่ 1 - จำนวนไร่สูงสุด*
                </span>
              </label>
              <Input suffix="ไร่" />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
          <Form.Item>
            <label style={{ fontWeight: "bold" }}>หมายเหตุ</label>
            <TextArea rows={2} />
          </Form.Item>
        </Col>
        <Button
          style={{
            backgroundColor: color.Success,
            color: "white",
            width: "100%",
            borderRadius: "5px",
          }}
          onClick={() => setShowModal(!showModal)}
        >
          บันทึก
        </Button>
      </Card>
      <Card style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
              fontWeight: "bold",
            }}
          >
            ยอดรวมค่าบริการ (เกษตรกร)
          </Col>
          <Col span={12} style={{ textAlign: "center", fontWeight: "bold" }}>
            รายได้ที่นักบินโดรนจะได้รับ
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              fontSize: 18,
              textAlign: "center",
              borderRight: "2px groove",
              color: color.Success,
              fontWeight: "bold",
            }}
          >
            1,100.00 บาท
          </Col>
          <Col
            span={12}
            style={{
              fontSize: 18,
              textAlign: "center",
              color: color.Warning,
              fontWeight: "bold",
            }}
          >
            1,220.00 บาท
          </Col>
        </Row>
        <Divider />
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ค่าบริการ
              <span style={{ fontSize: "12px" }}> (ก่อนค่าธรรมเนียม)</span>
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ค่าธรรมเนียม (5%)
            </Col>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ส่วนลดค่าธรรมเนียม
            </Col>
          </>
          <>
            <Col span={8}>1,100.00 บาท</Col>
            <Col span={8}>250.00 บาท</Col>
            <Col span={8}>250.00 บาท</Col>
          </>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <>
            <Col span={8} style={{ fontWeight: "bold" }}>
              ส่วนลดคูปอง
            </Col>
            <Col span={16} style={{ fontWeight: "bold" }}>
              ส่วนลดจากแต้ม
            </Col>
          </>
          <>
            <Col span={8}>100.00 บาท</Col>
            <Col span={16}>20.00 บาท</Col>
          </>
        </Row>
        <Divider />
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
              fontWeight: "bold",
            }}
          >
            ประมาณการแต้มเกษตรกร <br /> (Farmer Point)
          </Col>
          <Col span={12} style={{ textAlign: "center", fontWeight: "bold" }}>
            ประมาณการแต้มนักบินโดรน <br /> (Droner Point)
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col
            span={12}
            style={{
              textAlign: "center",
              borderRight: "2px groove",
            }}
          >
            <Image
              preview={false}
              src={icon.coinFarmer}
              style={{ width: "25px", height: "25px" }}
            />{" "}
            400 แต้ม
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Image
              preview={false}
              src={icon.coinDroner}
              style={{ width: "25px", height: "25px" }}
            />{" "}
            400 แต้ม
          </Col>
        </Row>
      </Card>
    </Col>
  );
  const columns = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "date_appointment",
      key: "date_appointment",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{DateTimeUtil.formatDateTime(value)}</span>
              <br />
              <span style={{ backgroundColor: "rgba(169, 203, 98, 0.10)" }}>
                {row.task_no}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ค่าบริการ",
      dataIndex: "fullname",
      key: "fullname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.telephone_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "fullname",
      key: "fullname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.telephone_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "หมายเหตุ",
      dataIndex: "fullname",
      key: "fullname",
      width: "40%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.telephone_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "ผู้ใช้ที่อัพเดต",
      dataIndex: "fullname",
      key: "fullname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.telephone_no}</span>
            </>
          ),
        };
      },
    },
  ];
  const cardHistoryTask = <NewTable columns={columns} pagination={false} />;

  return (
    <>
      {pageTitle}
      <div style={{ padding: "10px" }}>
        <CardContainer>
          <CardHeader textHeader="รายละเอียดงาน" />
          <Container style={{ padding: "20px", paddingBottom: "0px" }}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item name="searchAddress">
                  <InputPicker
                    virtualized
                    value={taskNo}
                    listProps={{
                      onItemsRendered,
                    }}
                    searchBy={(keyword: string, label, item) => true}
                    onChange={handleSearchTask}
                    placeholder="ค้นหารหัสงาน (Task No.)"
                    onSearch={(val: any) => {
                      const uppercase = val.toUpperCase();
                      if (!!uppercase) {
                        setCurrent(1);
                        setTaskNo(uppercase);
                      }
                    }}
                    onClean={() => {
                      setCurrent(1);
                      setTaskNo(undefined);
                    }}
                    data={searchTaskList}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button
                  style={{
                    border: "1px dashed #219653",
                    borderRadius: "5px",
                    backgroundColor: "rgba(33, 150, 83, 0.1)",
                    color: color.Success,
                    width: 100,
                    height: 35,
                  }}
                  onClick={() => {
                    setSearch(!search);
                    setSource("EDIT");
                  }}
                >
                  ค้นหา
                </Button>
              </Col>
              {search && (
                <Col span={4}>
                  <Radio.Group buttonStyle="outline">
                    <Radio.Button
                      value="EDIT"
                      style={
                        source === "EDIT"
                          ? {
                              color: color.Success,
                              borderColor: color.Success,
                              borderRadius: "5px, 5px",
                              backgroundColor: "rgba(33, 150, 83, 0.1)",
                              height: 35,
                            }
                          : { height: 35, color: color.BK }
                      }
                      onClick={() => {
                        setSource("EDIT");
                      }}
                    >
                      แก้ไขงาน
                    </Radio.Button>
                    <Radio.Button
                      value="HISTORY"
                      style={
                        source === "HISTORY"
                          ? {
                              color: color.Success,
                              borderColor: color.Success,
                              borderRadius: "5px, 5px",
                              backgroundColor: "rgba(33, 150, 83, 0.1)",
                              height: 35,
                            }
                          : { height: 35, color: color.BK }
                      }
                      onClick={() => {
                        setSource("HISTORY");
                      }}
                    >
                      ประวัติงาน
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              )}
            </Row>
          </Container>
          {search &&
            (source === "EDIT" ? (
              <Container style={{ paddingBottom: "10px" }}>
                <Row gutter={8} justify={"space-between"}>
                  {cardCurrentTask}
                  {cardEditTask}
                </Row>
              </Container>
            ) : (
              <>{cardHistoryTask}</>
            ))}
        </CardContainer>
      </div>
      {showModal && (
        <Modal
          title="ยืนยันการแก้ไข"
          onCancel={() => {
            setShowModal(!showModal);
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
          style={{ top: "25%" }}
        >
          <div className="px-4 pt-4">
            <span className="text-secondary">
              โปรดตรวจสอบงานที่คุณต้องการแก้ไข ก่อนที่จะกดยืนยันแก้ไข
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการจ้างงานในแอปพลิเคชัน
            </p>
          </div>
          <Divider
            style={{
              marginBottom: "20px",
            }}
          />
          <div className="d-flex justify-content-between px-4 pb-3">
            <Button
              style={{
                borderColor: color.Success,
                color: color.Success,
              }}
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Success,
                backgroundColor: color.Success,
                color: color.White,
              }}
              //onClick={() => removeReward()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IndexAdminTask;
