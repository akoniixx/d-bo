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
  STATUS_INPROGRESS,
  STATUS_IS_PROBLEM,
  STATUS_WAITSTART,
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

function EditWaitStart() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
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
      fetchPurposeSpray(res.farmerPlot.plantName);
      setMapPosition({
        lat: parseFloat(res.farmerPlot.lat),
        lng: parseFloat(res.farmerPlot.long),
      });
    });
  };
  const fetchPurposeSpray = async (crop: string) => {
    await CropDatasource.getPurposeByCroupName(crop).then((res) => {
      setPeriodSpray(res);
    });
  };

  useEffect(() => {
    fetchTaskDetail();
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
  };
  const handleOtherSpray = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value) {
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
      setBtnSaveDisable(true);
    }
  };

  const handlerTargetSpray = (e: any) => {
    let checked = e.target.checked;
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
      let removeTarget = data?.targetSpray.filter((x) => x != value);
      p = Map(data).set("targetSpray", removeTarget);
    }
    setData(p.toJS());
    console.log(p.toJS());
    checkValidate(p.toJS());
  };
  const handlerPurposeSpray = (e: any) => {
    const d = Map(data).set("purposeSprayId", e);
    setData(d.toJS());
    {
      e != null ? setBtnSaveDisable(false) : setBtnSaveDisable(true);
    }
  };
  const handlePreparation = (e: any) => {
    const d = Map(data).set("preparationBy", e.target.value);
    setData(d.toJS());
    setBtnSaveDisable(false);
  };
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(data).set("comment", e.target.value);
    setData(d.toJS());
    setBtnSaveDisable(false);
  };
  const handleChangeStatus = (e: any) => {
    const d = Map(data).set("status", e.target.value);
    setData(d.toJS());
    setBtnSaveDisable(false);
  };
  const handleChangeIsProblem = (e: any) => {
    const m = Map(data).set("isProblem", e.target.value);
    setData(m.toJS());
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
  const onChangeProblemText = (e: any) => {
    const m = Map(data).set("problemRemark", e.target.value);
    setData(m.toJS());
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
  };
  const onChangeCanCelText = (e: any) => {
    // const m = Map(data).set("problemRemark", e.target.value);
    // setData(m.toJS());
  };

  const checkValidate = (data?: TaskDetailEntity) => {
    let checkEmptyTarget = false;
    if (data?.targetSpray !== undefined) {
      checkEmptyTarget =
        ![data?.targetSpray][0]?.includes("") &&
        data?.targetSpray.length !== 0 &&
        data?.targetSpray !== null &&
        data?.targetSpray !== undefined;
    }
    if (checkEmptyTarget) {
      setBtnSaveDisable(false);
    } else {
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
  const renderAppointment = (
    <Form style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-5">
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <DatePicker
                  format={dateFormat}
                  style={{ width: "100%" }}
                  value={moment(new Date(data.dateAppointment))}
                  onChange={handlerDate}
                />
              </Form.Item>
            </div>
            <div className="col-lg-5">
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <TimePicker
                  name="dateAppointment"
                  format={timeFormat}
                  style={{ width: "100%" }}
                  value={moment(new Date(data.dateAppointment))}
                  onChange={handlerDate}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-10">
            <label>
              ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="purposeSprayId"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกช่วงเวลาการฉีดพ่น",
                },
              ]}
            >
              <Select
                allowClear
                onChange={handlerPurposeSpray}
                key={data.purposeSprayId}
                defaultValue={
                  data.purposeSpray != null
                    ? data.purposeSpray.purposeSprayName
                    : null
                }
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
          </div>
          <div className="form-group col-lg-10">
            <label>
              เป้าหมายการฉีดพ่น
              <span style={{ color: "red" }}>*</span>
            </label>
            {PURPOSE_SPRAY_CHECKBOX.map((item) =>
              _.set(
                item,
                "isChecked",
                data?.targetSpray.map((x) => x).find((y) => y === item.crop)
                  ? true
                  : item.isChecked
              )
            ).map((x, index) => (
              <div className="form-group">
                <Checkbox
                  key={data.targetSpray[0]}
                  value={x.crop}
                  onClick={handlerTargetSpray}
                  checked={x.isChecked}
                />{" "}
                <label>{x.crop}</label>
                <br />
                {index == 4 && (
                  <>
                    <Input
                      key={data.targetSpray[0]}
                      onChange={handleOtherSpray}
                      placeholder="โปรดระบุ เช่น เพลี้ย,หอย"
                      autoComplete="off"
                      defaultValue={data.targetSpray.filter(
                        (a) => !PURPOSE_SPRAY.some((x) => x === a)
                      )}
                      // defaultValue={Array.from(
                      //   new Set(
                      //     data?.targetSpray.filter(
                      //       (a) => !PURPOSE_SPRAY.some((x) => x === a)
                      //     )
                      //   )
                      // ).join(",")}
                    />
                    {validateComma.status == "error" && (
                      <p style={{ color: color.Error }}>
                        {validateComma.message}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="row form-group col-lg-6 p-2">
            <label>
              การเตรียมยา <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item>
              <Radio.Group
                key={data.preparationBy}
                value={data.preparationBy}
                onChange={handlePreparation}
              >
                <Space direction="vertical">
                  <Radio value="เกษตรกรเตรียมยาเอง">เกษตรกรเตรียมยาเอง</Radio>
                  <Radio value="นักบินโดรนเตรียมให้">นักบินโดรนเตรียมให้</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="form-group col-lg-10">
            <label>หมายเหตุ</label>
            <TextArea rows={3} onChange={handleComment} value={data.comment} />
          </div>
        </div>

        <div className="col-lg-6">
          <label style={{ marginBottom: "10px" }}>
            สถานะ <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="status">
            <div className="row">
              <div className="form-group col-lg-4">
                <Radio.Group
                  value={data.status}
                  onChange={handleChangeStatus}
                  className="col-lg-4"
                >
                  <Space direction="vertical">
                    {TASKTODAY_STATUS.map((item: any, index: any) => (
                      <Radio value={item.value}>
                        {item.name}
                        {data.status == "WAIT_START" && index == 0 ? (
                          <div
                            style={{ marginLeft: "20px" }}
                            className="col-lg-10"
                          >
                            <Form.Item style={{ width: "530px" }}>
                              <Radio.Group
                                value={data.isProblem}
                                onChange={handleChangeIsProblem}
                              >
                                <Space direction="vertical">
                                  <Radio value={false}>งานปกติ</Radio>
                                  <Radio value={true}>งานมีปัญหา</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                            {data.isProblem == true ? (
                              <Form.Item>
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
                              </Form.Item>
                            ) : null}
                          </div>
                        ) : data.status == "IN_PROGRESS" && index == 1 ? (
                          <div style={{ marginLeft: "20px" }}>
                            <Form.Item style={{ width: "530px" }}>
                              <Radio.Group
                                value={data.isProblem}
                                onChange={handleChangeIsProblem}
                              >
                                <Space direction="vertical">
                                <Radio value={false}>งานปกติ</Radio>
                                  <Radio disabled>รออนุมัติขยายเวลา</Radio>
                                  <Radio disabled>
                                    อนุมัติขยายเวลา{" "}
                                    <span style={{ color: color.Error }}>
                                      *ต้องโทรหาเกษตกรเพื่อคอนเฟิร์มการอนุมัติ/ปฏิเสธ*
                                    </span>
                                  </Radio>
                                  <Radio value={true}>งานมีปัญหา</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        ) : data.status == "CANCELED" && index == 2 ? (
                          <div style={{ marginLeft: "20px" }}>
                            <Form.Item style={{ width: "500px" }}>
                              <TextArea
                                rows={3}
                                onChange={onChangeCanCelText}
                                placeholder="รายละเอียดการยกเลิก"
                                autoComplete="off"
                                // defaultValue={
                                //   data.problemRemark != null
                                //     ? data.problemRemark
                                //     : undefined
                                // }
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
    console.log(data);
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
        let otherSprayList = [];
        if (otherSpray != undefined) {
          let m = otherSpray.split(",");
          for (let i = 0; m.length > i; i++) {
            otherSprayList.push(m[i]);
          }
        }
        data.targetSpray.push.apply(
          data.targetSpray,
          otherSprayList.filter((x) => x != "")
        );
        const setTarget = Array.from(new Set(data.targetSpray)).filter(
          (x) => x != ""
        );
        const pushTextTarget = Map(data).set("targetSpray", setTarget);
        const pushUpdateBy = Map(pushTextTarget.toJS()).set(
          "updateBy",
          profile.firstname + " " + profile.lastname
        );
        await TaskInprogressDatasource.UpdateTask(pushUpdateBy.toJS()).then(
          (time) => {
            window.location.href = "/IndexTodayTask";
          }
        );
      }
      fetchTaskDetail();
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

export default EditWaitStart;
