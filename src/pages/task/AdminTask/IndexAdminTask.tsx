import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Select,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { OptionType } from "../newTask/AddNewTask";
import { color } from "../../../resource";
import { STATUS_NEWTASK_COLOR_MAPPING } from "../../../definitions/Status";

const IndexAdminTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [data, setData] = useState();
  const [taskList, setTaskList] = useState();
  const options: OptionType[] = [];
  const [source, setSource] = useState<string>("EDIT");

  const sleep = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, ms);
    });

  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) => {
    await sleep(1000);
    let filteredName: OptionType[];

    if (!search) {
      filteredName = options;
    } else {
      const searchLower = search.toLowerCase();
      filteredName = options.filter(({ label, tel, idNo }: OptionType) => {
        const lowerLabel = label.toLowerCase();
        const lowerTel = tel ? tel.toLowerCase() : "";
        const lowerIdNo = idNo ? idNo.toLowerCase() : "";
        return (
          lowerLabel.includes(searchLower) ||
          lowerTel.includes(searchLower) ||
          lowerIdNo.includes(searchLower)
        );
      });
    }

    let hasMore = filteredName.length > prevOptions.length + 10;
    let slicedOptions = filteredName.slice(
      prevOptions.length,
      prevOptions.length + 10
    );

    return {
      options: slicedOptions,
      hasMore,
    };
  };

  const wrappedLoadOptions = useCallback<typeof loadOptions>((...args) => {
    return loadOptions(...args);
  }, []);

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
      <Card style={{ backgroundColor: "#F2F5FC", borderRadius: "8px" }}>
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
            }}
          >
            เกษตรกร
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
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
      <Card style={{ height: "250px" }}>
        <Row
          justify={"space-between"}
          gutter={8}
          style={{ paddingBottom: "15px" }}
        >
          <>
            <Col span={8}>วันที่นัดหมาย :</Col>
            <Col span={8}>ช่วงเวลาการพ่น :</Col>
            <Col span={8}>เป้าหมายการพ่น :</Col>
          </>
          <>
            <Col span={8}>18/05/2565, 11:00</Col>
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
            <Col span={8}>การเตรียมยา :</Col>
            <Col span={8}>แปลง : </Col>
            <Col span={8}>พืชที่ปลูก :</Col>
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
            <Col span={8}>ค่าบริการ/ไร่ :</Col>
            <Col span={8}>จำนวนไร่ :</Col>
            <Col span={8}>สถานะ :</Col>
          </>
          <>
            <Col span={8}>55 บาท/ไร่</Col>
            <Col span={8}>20 ไร่</Col>
            <Col span={8}>
              <Badge
                color={STATUS_NEWTASK_COLOR_MAPPING["รอนักบินโดรนรับงาน"]}
              />{" "}
              <span color={STATUS_NEWTASK_COLOR_MAPPING["รอนักบินโดรนรับงาน"]}>
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
              fontSize: 16,
              textAlign: "center",
              borderRight: "2px groove",
            }}
          >
            1,100.00 บาท
          </Col>
          <Col span={12} style={{ fontSize: 16, textAlign: "center" }}>
            1,220.00 บาท
          </Col>
        </Row>
        <Divider />
      </Card>
    </Col>
  );
  const cardEditTask = (
    <Col span={12}>
      <Card
        style={{
          backgroundColor: "rgba(33, 150, 83, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Row
          justify={"center"}
          gutter={8}
          style={{
            fontSize: 16,
            paddingBottom: "15px",
            fontWeight: "bold",
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
            }}
          >
            เกษตรกร
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
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
        <Row justify={"space-between"} gutter={8}>
          <Col span={8}>วันที่นัดหมาย</Col>
          <Col span={8}>ช่วงเวลาการพ่น</Col>
          <Col span={8}>เป้าหมายการพ่น</Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col span={8}>18/05/2565, 11:00</Col>
          <Col span={8}>คุมเลน</Col>
          <Col span={8}>หญ้า, หนอน</Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col span={8}>การเตรียมยา</Col>
          <Col span={8}>แปลง</Col>
          <Col span={8}>พืชที่ปลูก</Col>
        </Row>
        <Row justify={"space-between"} gutter={8}>
          <Col span={8}>18/05/2565, 11:00</Col>
          <Col span={8}>คุมเลน</Col>
          <Col span={8}>หญ้า, หนอน</Col>
        </Row>
      </Card>
    </Col>
  );

  return (
    <>
      {pageTitle}
      <CardContainer>
        <CardHeader textHeader="รายละเอียดงาน" />
        <Form style={{ padding: "32px" }}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="searchAddress">
                <AsyncPaginate
                  isClearable
                  debounceTimeout={300}
                  loadOptions={wrappedLoadOptions}
                  //onChange={(e) => handleSearchFarmer(e)}
                  placeholder="ค้นหารหัสงาน (Task No.)"
                  defaultOptions
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
                //onClick={handleSelectFarmer}
              >
                ค้นหา
              </Button>
            </Col>
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
          </Row>
          <Row gutter={8} justify={"space-between"}>
            {cardCurrentTask}
            {cardEditTask}
          </Row>
        </Form>
      </CardContainer>
    </>
  );
};

export default IndexAdminTask;
