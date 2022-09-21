import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import GoogleMap from "../../../../components/map/GoogleMap";
import { BackIconButton } from "../../../../components/button/BackButton";
import { CardContainer } from "../../../../components/card/CardContainer";
import { CardHeader } from "../../../../components/header/CardHearder";
import { LAT_LNG_BANGKOK } from "../../../../definitions/Location";
import color from "../../../../resource/color";
import Layouts from "../../../../components/layout/Layout";
import {
  TaskDetailEntity,
  TaskDetailEntity_INIT,
} from "../../../../entities/TaskInprogressEntities";
import { TaskInprogressDatasource } from "../../../../datasource/TaskInprogressDatasource";
import FooterPage from "../../../../components/footer/FooterPage";
import { CropPurposeSprayEntity } from "../../../../entities/CropEntities";
import { CropDatasource } from "../../../../datasource/CropDatasource";
import {
  PURPOSE_SPRAY,
  PURPOSE_SPRAY_CHECKBOX,
} from "../../../../definitions/PurposeSpray";
import TextArea from "antd/lib/input/TextArea";
import {
  REDIO_IN_PROGRESS,
  REDIO_WAIT_START,
  STATUS_COLOR_MAPPING,
  TASKTODAY_STATUS,
  TASK_TODAY_STATUS_MAPPING,
} from "../../../../definitions/Status";
import { Option } from "antd/lib/mentions";
import Swal from "sweetalert2";
const { Map } = require("immutable");
const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function EditInProgress() {
  const taskId = queryString[1];
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const [data, setData] = useState<TaskDetailEntity>(TaskDetailEntity_INIT);
  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>();
  const [checkCrop, setCheckCrop] = useState<boolean>(true);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [validateComma, setValidateComma] = useState<{
    status: any;
    message: string;
  }>({
    status: "",
    message: "",
  });
  let [otherSpray, setOtherSpray] = useState<any>();
  const fetchTaskDetail = async () => {
    await TaskInprogressDatasource.getTaskDetailById(taskId).then((res) => {
      console.log(res);
      setData(res);
      setMapPosition({
        lat: parseFloat(res.farmerPlot.lat),
        lng: parseFloat(res.farmerPlot.long),
      });
    });
  };
  const fetchPurposeSpray = async () => {
    await CropDatasource.getPurposeByCroupName(data.farmerPlot.plantName).then(
      (res) => {
        setPeriodSpray(res);
      }
    );
  };

  useEffect(() => {
    fetchTaskDetail();
    fetchPurposeSpray();
  }, []);

  const formatCurrency = (e: any) => {
    e = parseFloat(e);
    return e.toFixed(2).replace(/./g, function (c: any, i: any, a: any) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  };
  const handlerDate = (e: any) => {
    const d = Map(data).set("dateAppointment", e);
    const m = Map(d.toJS()).set("dateAppointment", e);
    setData(m.toJS());
    console.log(m.toJS());
  };
  const handlePeriodSpray = (e: any) => {
    const d = Map(data).set("purposeSprayName", e);
    setData(d.toJS());
  };
  const handleOtherSpray = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length != 0) {
      setOtherSpray(e.target.value);
      let checkComma = checkValidateComma(e.target.value);
      if (!checkComma) {
        setValidateComma({ status: "", message: "" });
        setBtnSaveDisable(false);
      } else {
        setValidateComma({
          status: "error",
          message: "กรุณาใช้ (,) ให้กับการเพิ่มมากกว่า 1 อย่าง",
        });
        setBtnSaveDisable(true);
      }
    } else {
      setValidateComma({
        status: "error",
        message: "โปรดระบุ",
      });
      setBtnSaveDisable(true);
    }
  };
  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes("*") ||
      data.includes("/") ||
      data.includes(" ") ||
      data.includes("-") ||
      data.includes("+");
    return data.trim().length != 0 ? (checkSyntax ? true : false) : true;
  };
  const handlePurposeSpray = (e: any) => {
    let checked = e.target.checked;
    console.log(checked);
    let value = e.target.value;
    setCheckCrop(
      value == "อื่นๆ" ? !checked : otherSpray != null ? false : true
    );
    PURPOSE_SPRAY_CHECKBOX.map((item) =>
      _.set(item, "isChecked", item.crop == value ? checked : item.isChecked)
    );
    let p: any = "";

    if (checked) {
      p = Map(data).set(
        "targetSpray",
        [...data?.targetSpray, value].filter((x) => x != "")
      );
    } else {
      let removePlant = data?.targetSpray.filter((x) => x != value);
      p = Map(data).set("targetSpray", removePlant);
    }
    setData(p.toJS());
    console.log(p.toJS());
  };
  const handlePreparation = (e: any) => {
    const d = Map(data).set("preparationBy", e.target.value);
    setData(d.toJS());
    console.log(d.toJS());
  };
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(data).set("comment", e.target.value);
    setData(d.toJS());
    console.log(d.toJS());
  };
  const handleChangeStatus = (e: any) => {
    const d = Map(data).set("status", e.target.value);
    setData(d.toJS());
    console.log(d.toJS());
  };

  const renderAppointment = (
    <Form style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <DatePicker
                disabled
                  format={dateFormat}
                  style={{ width: "100%" }}
                  value={moment(new Date(data.dateAppointment))}
                  onChange={handlerDate}
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <TimePicker
                disabled
                  name="dateAppointment"
                  format={timeFormat}
                  style={{ width: "100%" }}
                  value={moment(new Date(data.dateAppointment))}
                  onChange={handlerDate}
                />
              </Form.Item>
            </div>
          </div>
          <label>
            ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="searchAddress">
            <Select
            disabled
              key={data.purposeSprayId}
              placeholder="-"
              defaultValue={data.purposeSprayId}
            >
              {periodSpray?.purposeSpray?.length ? (
                periodSpray?.purposeSpray?.map((item) => (
                  <Option value={item.id}>{item.purposeSprayName}</Option>
                ))
              ) : (
                <Option>-</Option>
              )}
            </Select>
          </Form.Item>
          <div className="form-group col-lg-12">
          <label>เป้าหมายการฉีดพ่น</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.targetSpray !== null ? data.targetSpray.join(",") : "-"}
            </span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.preparationBy !== null ? data.preparationBy : "-"}
            </span>
          </Form.Item>
          </div>
          <div className="form-group">
            <label>หมายเหตุ</label>
            <TextArea onChange={handleComment} value={data.comment} />
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <label style={{ marginBottom: "10px" }}>
            สถานะ <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="status">
            <div className="row">
              <div className="form-group col-lg-12">
                <Radio.Group
                  value={data.status}
                  onChange={handleChangeStatus}
                  className="col-lg-12"
                >
                  <Space direction="vertical">
                    {TASKTODAY_STATUS.map((item: any, index: any) => (
                      <Radio value={item.value}>
                        {item.name}
                        {data.status == "WAIT_START" && index == 0 ? (
                          <div style={{ marginLeft: "20px" }}>
                            <Form.Item style={{ width: "530px" }}>
                              {REDIO_WAIT_START.map((item) =>
                                _.set(
                                  item,
                                  "isChecked",
                                  data.isDelay,
                                  data.isProblem ? true : item.isChecked
                                )
                              ).map((x) => (
                                <div>
                                  <Radio
                                    key={x.key}
                                    value={x.name}
                                    //  onClick={}
                                    checked={x.isChecked}
                                  />{" "}
                                  <label>{x.name}</label>
                                  <br />
                                </div>
                              ))}
                            </Form.Item>
                          </div>
                        ) : data.status == "IN_PROGRESS" && index == 1 ? (
                          <div style={{ marginLeft: "20px" }}>
                            <Form.Item style={{ width: "530px" }}>
                              {REDIO_IN_PROGRESS.map((item) =>
                                _.set(item, "isChecked", data.status)
                              ).map((x) => (
                                <div>
                                  <Radio
                                    key={x.key}
                                    value={x.name}
                                    //  onClick={}
                                    checked={x.isChecked}
                                  />{" "}
                                  <label>{x.name}</label>
                                  <br />
                                </div>
                              ))}
                            </Form.Item>
                          </div>
                        ) : null}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
  const renderFarmer = (
    <Form key={data.farmerId}>
      <div style={{ padding: "30px" }}>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>ชื่อ-นามสกุล</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.farmer.firstname + " " + data.farmer.lastname
                }
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmer.telephoneNo} />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>แปลง</label>
            <Form.Item>
              <Select disabled defaultValue={data.farmerPlot.plotName} />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input disabled defaultValue={data.farmerPlot.plantName} />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={data.farmerPlot.raiAmount}
                suffix="ไร่"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-start">
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.farmerPlot.plotArea !== null
                    ? data.farmerPlot.plotArea.subdistrictName +
                      "/" +
                      data.farmerPlot.plotArea.districtName +
                      "/" +
                      data.farmerPlot.plotArea.provinceName
                    : "-"
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 text-start">
            <label>Latitude (ละติจูด)</label>
            <Form.Item key={mapPosition.lat}>
              <Input disabled defaultValue={mapPosition.lat} />
            </Form.Item>
          </div>
          <div className="col-lg-6 text-start">
            <label>Longitude (ลองติจูด)</label>
            <Form.Item key={mapPosition.lng}>
              <Input disabled defaultValue={mapPosition.lng} />
            </Form.Item>
          </div>
        </div>
        <GoogleMap
          width="100%"
          height="300px"
          zoom={17}
          lat={mapPosition.lat}
          lng={mapPosition.lng}
        />
        <div className="row">
          <div className="col-lg-12 text-start">
            <label>จุดสังเกต</label>
            <Form.Item>
              <Input disabled value={data.farmerPlot.landmark} />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
  const renderDroner = (
    <Form style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg-3">
          <span>
            {data.droner.firstname + " " + data.droner.lastname}
            <br />
            <p style={{ fontSize: "12px", color: color.Grey }}>
              {data.droner.dronerCode}
            </p>
          </span>
        </div>
        <div className="col-lg-2">
          <span>{data.droner.telephoneNo}</span>
        </div>
        <div className="col-lg-4">
          {data.droner.address.subdistrict.subdistrictName +
            "," +
            " " +
            data.droner.address.district.districtName +
            "," +
            " " +
            data.droner.address.province.region}
        </div>
        <div className="col-lg">
          <span>
            <Avatar
              size={25}
              src={
                data.droner.dronerDrone && data.droner.dronerDrone[0] != null
                  ? data.droner.dronerDrone[0].drone.droneBrand.logoImagePath
                  : null
              }
              style={{ marginRight: "5px" }}
            />
            {data.droner.dronerDrone && data.droner.dronerDrone[0] != null
              ? data.droner.dronerDrone[0].drone.droneBrand.name
              : "-"}
          </span>
          <br />
          <span style={{ color: color.Grey, fontSize: "12px" }}>
            {data.droner.dronerDrone && data.droner.dronerDrone.length! > 1
              ? "(มากกว่า 1 ยี่ห้อ)"
              : null}
          </span>
        </div>
        <div className="col-lg">
          {data.droner.status == "ACTIVE" ? (
            <span style={{ color: STATUS_COLOR_MAPPING[data.droner.status] }}>
              <Badge color={STATUS_COLOR_MAPPING[data.droner.status]} />
              {TASK_TODAY_STATUS_MAPPING[data.droner.status]}
            </span>
          ) : (
            <span style={{ color: STATUS_COLOR_MAPPING[data.droner.status] }}>
              <Badge color={STATUS_COLOR_MAPPING[data.droner.status]} />
              {TASK_TODAY_STATUS_MAPPING[data.droner.status]}
            </span>
          )}
        </div>
      </div>
    </Form>
  );
  const renderPrice = (
    <Form style={{ padding: "20px" }}>
      <Form style={{ padding: "20px", backgroundColor: "#2196531A" }}>
        <div className="row">
          <div className="col-lg">
            <Form.Item>
              <span>
                ยอดรวมค่าบริการ (หลังรวมค่าธรรมเนียม)
                <br />
                <b style={{ fontSize: "20px", color: color.Success }}>
                  {data.totalPrice !== null
                    ? formatCurrency(data.totalPrice) + " " + "บาท"
                    : "0.00" + " " + "บาท"}
                </b>
              </span>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
              <Input
                disabled
                value={
                  data.price !== null ? formatCurrency(data.price) : "0.00"
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าธรรมเนียม (5% ของค่าบริการ)</label>
              <Input
                disabled
                placeholder="0.0"
                value={data.fee !== null ? formatCurrency(data.fee) : "0.00"}
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ส่วนลดค่าธรรมเนียม</label>
              <Input
                disabled
                value={
                  data.discountFee !== null
                    ? formatCurrency(data.discountFee)
                    : "0.00"
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Form>
  );
  const UpdateTaskWaitStart = async (data: TaskDetailEntity) => {
    await TaskInprogressDatasource.UpdateTask(data).then((res) => {
      if (res) {
        Swal.fire({
          title: "ยืนยันการแก้ไข",
          text: "โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "บันทึก",
          confirmButtonColor: color.Success,
          showCancelButton: true,
          showCloseButton: true,
        }).then((time) => {
          window.location.href = "/IndexTodayTask";
        });
      }
    });
  };

  return (
    <Layouts>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexTodayTask")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดงาน #{data.taskNo}
          </strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader="นัดหมายบริการ" />
        {renderAppointment}
      </CardContainer>{" "}
      <br />
      <CardContainer>
        <CardHeader textHeader="ข้อมูลเกษตรกรและแปลง" />
        {renderFarmer}
      </CardContainer>
      <br />
      <CardContainer>
        <CardHeader textHeader="รายชื่อนักบินโดรน" />
        {renderDroner}
      </CardContainer>
      <br />
      <CardContainer>
        <CardHeader textHeader="ยอดรวมค่าบริการ" />
        {renderPrice}
      </CardContainer>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexTodayTask")}
        onClickSave={() => UpdateTaskWaitStart(data)}
        // disableSaveBtn={saveBtnDisable}
      />
    </Layouts>
  );
}

export default EditInProgress;
