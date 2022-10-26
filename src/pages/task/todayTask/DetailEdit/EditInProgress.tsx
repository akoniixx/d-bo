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
import type { RadioChangeEvent } from "antd";
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

import { Option } from "antd/lib/mentions";
import Swal from "sweetalert2";
import {
  APPROVED,
  REDIO_IN_PROGRESS,
  STATUS_COLOR_MAPPING,
  STATUS_INPROGRESS,
  TASKTODAY_STATUS,
  TASKTODAY_STATUS1,
  TASK_TODAY_STATUS_MAPPING,
} from "../../../../definitions/Status";
const { Map } = require("immutable");
const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function EditInProgress() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const taskId = queryString[1];
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const [value, setValue] = useState("");
  const [data, setData] = useState<TaskDetailEntity>(TaskDetailEntity_INIT);
  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [updateExtend, setUpdateExtend] = useState<any>();
  const fetchTaskDetail = async () => {
    await TaskInprogressDatasource.getTaskDetailById(taskId).then((res) => {
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

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(data).set("comment", e.target.value);
    setData(d.toJS());
    setBtnSaveDisable(false);
  };
  const handleChangeStatus = (e: any) => {
    const d = Map(data).set("status", e.target.value);
    const n = Map(d.toJS()).set("problemRemark", "");
    const o = Map(n.toJS()).set("statusRemark", "");
    const m = Map(o.toJS()).set("isProblem", false);
    setData(m.toJS());
    setBtnSaveDisable(false);
  };
  const handleChangeIsProblem = (e: any) => {
    const m = Map(data).set("isProblem", e.target.value);
    const n = Map(m.toJS()).set("problemRemark", "");
    setData(n.toJS());
    if (e.target.value == true) {
      if (data.problemRemark != null) {
        setBtnSaveDisable(true);
      } else {
        setBtnSaveDisable(true);
      }
      setBtnSaveDisable(true);
    } else {
      setBtnSaveDisable(false);
    }
  };
  const onChangeProblemText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(data).set("problemRemark", e.target.value);
    setData(m.toJS());
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
  };
  const onChangeDelayText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(data).set("delayRemark", e.target.value);
    setData(m.toJS());
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
  };
  const handlerApprove = (e: RadioChangeEvent) => {
    const m = Map(data).set("statusDelay", e.target.value);
    const o = Map(m.toJS()).set("dateDelay", data.updatedAt)
    if (o.toJS().statusDelay === "REJECTED") {
      {
        !data.delayRejectRemark
          ? setBtnSaveDisable(true)
          : setBtnSaveDisable(false);
      }
      const n = Map(o.toJS()).set("isDelay", false);
      setUpdateExtend(n.toJS());
      setValue(e.target.value);
    } else {
      const n = Map(o.toJS()).set("isDelay", true);
      setUpdateExtend(n.toJS());
      setValue(e.target.value);
      setBtnSaveDisable(false);
    }
  };
  const onChangeRejectDelay = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(data).set("delayRejectRemark", e.target.value);
    const n = Map(m.toJS()).set("statusDelay", updateExtend.statusDelay);
    setUpdateExtend(n.toJS());
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
  };
  const onChangeCanCelText = (e: any) => {
    const m = Map(data).set("statusRemark", e.target.value);
    setData(m.toJS());
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
  };
  const renderAppointment = (
    <Form style={{ padding: "2%" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-5">
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <DatePicker
                  disabled
                  format={dateFormat}
                  style={{ width: "100%" }}
                  value={moment(new Date(data.dateAppointment))}
                />
              </Form.Item>
            </div>
            <div className="col-lg-5">
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <TimePicker
                  disabled
                  name="dateAppointment"
                  format={timeFormat}
                  style={{ width: "100%" }}
                  value={moment(new Date(data.dateAppointment))}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-10">
            <label>
              ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="purposeSpray">
              <Select
                key={data.purposeSprayId}
                disabled
                defaultValue={
                  data.purposeSpray != null
                    ? data.purposeSpray.purposeSprayName
                    : "-"
                }
              ></Select>
            </Form.Item>
          </div>

          <div className="form-group col-lg-10">
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
          <div className="form-group col-lg-10">
            <label>หมายเหตุ</label>
            <TextArea rows={3} onChange={handleComment} value={data.comment} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group col-lg-6">
            <label>ค่าบริการ</label>
            <p>
              {data.totalPrice !== null
                ? formatCurrency(data.totalPrice) + " " + "บาท"
                : "0.00" + " " + "บาท"}{" "}
              (จำนวน {data?.farmAreaAmount} ไร่)
            </p>
          </div>
          <label style={{ marginBottom: "10px" }}>
            สถานะ <span style={{ color: "red" }}>*</span>
          </label>
          <div className="row">
            <Radio.Group value={data.status} onChange={handleChangeStatus}>
              <Space direction="vertical" style={{ width: "530px" }}>
                <Radio disabled>รอเริ่มงาน</Radio>
                {TASKTODAY_STATUS1.map((item: any, index: any) => (
                  <Radio value={item.value}>
                    <b> {item.name}</b>
                    {data.status == "IN_PROGRESS" && index == 0 ? (
                      <>
                        <div>
                          <Radio.Group
                            value={data.isProblem}
                            onChange={handleChangeIsProblem}
                          >
                            <Space direction="vertical">
                              <Radio value={false}>งานปกติ</Radio>
                              <Radio value={true}>งานมีปัญหา</Radio>
                            </Space>
                          </Radio.Group>
                        </div>
                        {data.isProblem == true ? (
                          <div>
                            <TextArea
                              rows={3}
                              onChange={onChangeProblemText}
                              placeholder="รายละเอียดปัญหา"
                              autoComplete="off"
                              defaultValue={
                                data.problemRemark != null
                                  ? data.problemRemark
                                  : undefined
                              }
                            />
                          </div>
                        ) : null}
                        <br />
                        {data.statusDelay == "WAIT_APPROVE" ? (
                          <>
                            <Form.Item
                              style={{
                                backgroundColor: "#2F80ED33",
                                padding: "3%",
                                width: "120%",
                              }}
                            >
                              <b>ขยายเวลา</b>
                              <br />
                              <span style={{ paddingLeft: "3%" }}>
                                รออนุมัติการขยายเวลา
                              </span>
                              <span style={{ color: color.Error }}>
                                *ต้องโทรหาเกษตกรเพื่อคอนเฟิร์มการอนุมัติ/ปฏิเสธ*
                              </span>
                              <div
                                className="row"
                                style={{ paddingLeft: "3%" }}
                              >
                                <div className="col-lg">
                                  <label>วันที่ขยายเวลา</label>
                                  <Form.Item>
                                    <DatePicker
                                      disabled
                                      format={dateFormat}
                                      style={{ width: "100%" }}
                                      value={moment(
                                        new Date(
                                          data.dateDelay !== null
                                            ? data.dateDelay
                                            : new Date()
                                        )
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-lg">
                                  <label>เวลา</label>
                                  <Form.Item>
                                    <TimePicker
                                      disabled
                                      format={timeFormat}
                                      style={{ width: "100%" }}
                                      value={moment(
                                        new Date(
                                          data.dateDelay !== null
                                            ? data.dateDelay
                                            : new Date()
                                        )
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div
                                className="col-lg"
                                style={{ paddingLeft: "3%" }}
                              >
                                <TextArea
                                  rows={3}
                                  onChange={onChangeDelayText}
                                  defaultValue={data.delayRemark}
                                />
                              </div>
                              <br />
                              <label style={{ paddingLeft: "3%" }}>
                                ยืนยันการขยายเวลา
                              </label>
                              <br />
                              <Radio.Group
                                style={{ paddingLeft: "3%" }}
                                onChange={handlerApprove}
                                defaultValue={data.statusDelay}
                              >
                                <Space>
                                  <Radio value="APPROVED">อนุมัติ</Radio>
                                  <Radio value="REJECTED">ไม่อนุมัติ</Radio>
                                </Space>
                                {value === "REJECTED" ? (
                                  <div style={{ width: "227%" }}>
                                    <TextArea
                                      rows={3}
                                      onChange={onChangeRejectDelay}
                                      defaultValue={data?.delayRejectRemark}
                                      placeholder="กรอกเหตุผลที่ไม่อนุมัติ"
                                    />
                                  </div>
                                ) : null}
                              </Radio.Group>
                            </Form.Item>
                          </>
                        ) : data.statusDelay == "APPROVED" ? (
                          <>
                            <Form.Item
                              style={{
                                backgroundColor: "#56CCF21A",
                                padding: "3%",
                                width: "170%",
                              }}
                            >
                              <b>ขยายเวลา</b>
                              <br />
                              <span style={{ paddingLeft: "3%" }}>
                                อนุมัติขยายเวลา
                              </span>
                              <div
                                className="row"
                                style={{ paddingLeft: "3%" }}
                              >
                                <div className="col-lg">
                                  <label>วันที่ขยายเวลา</label>
                                  <Form.Item>
                                    <DatePicker
                                      disabled
                                      format={dateFormat}
                                      style={{ width: "100%" }}
                                      value={moment(
                                        new Date(
                                          data.dateDelay !== null
                                            ? data.dateDelay
                                            : new Date()
                                        )
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-lg">
                                  <label>เวลา</label>
                                  <Form.Item>
                                    <TimePicker
                                      disabled
                                      format={timeFormat}
                                      style={{ width: "100%" }}
                                      value={moment(
                                        new Date(
                                          data.dateDelay !== null
                                            ? data.dateDelay
                                            : new Date()
                                        )
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div style={{ paddingLeft: "3%" }}>
                                <TextArea
                                  rows={3}
                                  disabled
                                  onChange={onChangeDelayText}
                                  defaultValue={data.delayRemark}
                                />
                              </div>
                            </Form.Item>
                          </>
                        ) : data.statusDelay == "REJECTED" ? (
                          <>
                            <Form.Item
                              style={{
                                backgroundColor: "rgba(235, 87, 87, 0.3)",
                                padding: "3%",
                                width: "170%",
                              }}
                            >
                              <b>ขยายเวลา</b>
                              <br />
                              <span style={{ paddingLeft: "3%" }}>
                                ไม่อนุมัติขยายเวลา
                              </span>
                              <div
                                className="row"
                                style={{ paddingLeft: "3%" }}
                              >
                                <div className="col-lg">
                                  <label>วันที่ขยายเวลา</label>
                                  <Form.Item>
                                    <DatePicker
                                      disabled
                                      format={dateFormat}
                                      style={{ width: "100%" }}
                                      value={moment(
                                        new Date(
                                          data.dateDelay !== null
                                            ? data.dateDelay
                                            : new Date()
                                        )
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-lg">
                                  <label>เวลา</label>
                                  <Form.Item>
                                    <TimePicker
                                      disabled
                                      format={timeFormat}
                                      style={{ width: "100%" }}
                                      value={moment(
                                        new Date(
                                          data.dateDelay !== null
                                            ? data.dateDelay
                                            : new Date()
                                        )
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div
                                className="col-lg"
                                style={{ paddingLeft: "3%" }}
                              >
                                <TextArea
                                  rows={3}
                                  disabled
                                  defaultValue={data?.delayRemark}
                                />
                              </div>
                              <br />
                              <div
                                className="col-lg"
                                style={{ paddingLeft: "3%" }}
                              >
                                <span>เหตุผลที่ไม่อนุมัติ</span>
                                <TextArea
                                  rows={3}
                                  disabled
                                  defaultValue={data?.delayRejectRemark}
                                />
                              </div>
                            </Form.Item>
                          </>
                        ) : null}
                      </>
                    ) : data.status == "CANCELED" && index == 1 ? (
                      <div style={{ marginLeft: "20px" }}>
                        <Form.Item style={{ width: "500px" }}>
                          <TextArea
                            rows={3}
                            onChange={onChangeCanCelText}
                            placeholder="รายละเอียดการยกเลิก"
                            autoComplete="off"
                            defaultValue={
                              data.statusRemark != null
                                ? data.statusRemark
                                : undefined
                            }
                          />
                        </Form.Item>
                      </div>
                    ) : null}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
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
            data.droner.address.district.provinceName}
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
    Swal.fire({
      title: "ยืนยันการแก้ไข",
      text: "โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const pushApproved = Map(data).set("statusDelay", updateExtend);
        const pushUpdateBy = Map(
          pushApproved.toJS().statusDelay || pushApproved.toJS()
        ).set("updateBy", profile.firstname + " " + profile.lastname);
        await TaskInprogressDatasource.UpdateTask(pushUpdateBy.toJS()).then(
          (time) => {
            window.location.href = "/IndexTodayTask";
          }
        );
      }
      EditInProgress();
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
        disableSaveBtn={saveBtnDisable}
      />
    </Layouts>
  );
}

export default EditInProgress;
