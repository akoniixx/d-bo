import { EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionButton from "../../../components/button/ActionButton";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import GooleMap from "../../../components/map/GoogleMap";
import ModalSelectedDroner from "../../../components/modal/task/inprogressTask/ModalSelectedDroner";
import { CropDatasource } from "../../../datasource/CropDatasource";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import {
  PURPOSE_SPRAY,
  PURPOSE_SPRAY_CHECKBOX,
} from "../../../definitions/PurposeSpray";
import { STATUS_INPROGRESS_CHECKBOX } from "../../../definitions/Status";
import { CropPurposeSprayEntity } from "../../../entities/CropEntities";
import {
  DronerDroneEntity_INIT,
  DronerEntity,
  DronerEntity_INIT,
} from "../../../entities/DronerDroneEntities";
import {
  GetTaskInprogressEntity,
  GetTaskInprogressEntity_INIT,
  UpdateInprogressTaskEntity,
  UpdateInprogressTaskEntity_INIT,
} from "../../../entities/TaskInprogress";
import { TaskSearchDroner } from "../../../entities/TaskSearchDroner";
import { color } from "../../../resource";
import { numberWithCommas } from "../../../utilities/TextFormatter";
const { Option } = Select;

const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
const timeCreateFormat = "HH:mm:ss";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.pathname, "=");

const EditInprogressTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [data, setData] = useState<GetTaskInprogressEntity>(
    GetTaskInprogressEntity_INIT
  );
  const [dateAppointment, setDateAppointment] = useState<any>(
    moment(undefined)
  );
  const [timeAppointment, setTimeAppointment] = useState<any>(
    moment(undefined)
  );
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>();
  const [checkCrop, setCheckCrop] = useState<boolean>(true);
  let [otherSpray, setOtherSpray] = useState<any>();
  const [validateComma, setValidateComma] = useState<{
    status: any;
    message: string;
  }>({
    status: "",
    message: "",
  });
  const [showModel, setShowModal] = useState<boolean>(false);
  const [dronerSelected, setDronerSelected] =
    useState<DronerEntity>(DronerEntity_INIT);

  const fetchInprogressTask = async () => {
    await TaskDatasource.getInprogressTaskById(queryString[1]).then((res) => {
      res.droner.totalDroneCount = res.droner.dronerDrone.length;
      setDateAppointment(new Date(res.dateAppointment).toUTCString());
      setTimeAppointment(new Date(res.dateAppointment).getTime());
      fetchPurposeSpray(res.farmerPlot.plantName);
      setDronerSelected(res.droner);
      setData(res);
    });
  };

  const fetchPurposeSpray = async (crop: string) => {
    await CropDatasource.getPurposeByCroupName(crop).then((res) => {
      setPeriodSpray(res);
    });
  };

  useEffect(() => {
    fetchInprogressTask();
  }, []);

  const handleChangeStatus = (e: any) => {
    let status = e.target.value;
    const m = Map(data).set("status", status);
    const n = Map(m.toJS()).set("isProblem", false);
    const o = Map(n.toJS()).set("problemRemark", "");
    setData(o.toJS());
    checkValidate(o.toJS());
  };
  const handleChangeStatusProblem = (e: any) => {
    let status = e.target.value;
    const m = Map(data).set("isProblem", status);
    const n = Map(m.toJS()).set("problemRemark", "");
    const o = Map(n.toJS()).set("statusRemark", "");
    setData(o.toJS());
    checkValidate(o.toJS());
  };
  const handleChangeRemarkProblem = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const m = Map(data).set("problemRemark", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  const handleChangeRemarkCancel = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const m = Map(data).set("statusRemark", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  const handlePeriodSpray = (e: any) => {
    const d = Map(data).set("purposeSprayId", e);
    setData(d.toJS());
    checkValidate(d.toJS());
  };
  const handlePurposeSpray = (e: any) => {
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
      let removePlant = data?.targetSpray.filter((x) => x != value);
      p = Map(data).set("targetSpray", removePlant);
    }
    setData(p.toJS());
    checkValidate(p.toJS());
  };
  const handlePreparation = (e: any) => {
    const d = Map(data).set("preparationBy", e.target.value);
    setData(d.toJS());
    checkValidate(d.toJS());
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
  const handleComment = (e: any) => {
    const d = Map(data).set("comment", e.target.value);
    setData(d.toJS());
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
  const checkValidate = (data: GetTaskInprogressEntity) => {
    let checkEmptySting = ![data?.purposeSprayId, data?.preparationBy].includes(
      ""
    );
    let checkEmptyArray = false;
    if (data?.targetSpray !== undefined) {
      checkEmptyArray =
        ![data?.targetSpray][0]?.includes("") &&
        data?.targetSpray.length !== 0 &&
        data?.targetSpray !== undefined;
    }
    let checkDateTime = ![dateAppointment, timeAppointment].includes("");
    let checkEmptyRemark = true;
    if (data.status == "WAIT_START" && data.isProblem) {
      checkEmptyRemark = ![data.problemRemark].includes("");
    } else if (data.status == "CANCELED") {
      checkEmptyRemark = ![data.statusRemark].includes("");
    }
    if (
      checkEmptySting &&
      checkEmptyArray &&
      checkDateTime &&
      checkEmptyRemark
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };

  const renderFormAppointment = (
    <CardContainer>
      <CardHeader textHeader="นัดหมายบริการ" />
      <Row>
        <div className="col-lg-6">
          <div className="flex-column">
            <Form style={{ padding: "20px" }}>
              <div className="row">
                <div className="form-group col-lg-6">
                  <label>
                    วันที่นัดหมาย <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกวันที่นัดหมาย!",
                      },
                    ]}
                  >
                    <DatePicker
                      format={dateFormat}
                      className="col-lg-12"
                      defaultValue={moment(dateAppointment)}
                      onChange={(e: any) =>
                        setDateAppointment(
                          moment(new Date(e)).format(dateCreateFormat)
                        )
                      }
                    />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-6">
                  <label>
                    เวลานัดหมาย <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเวลานัดหมาย!",
                      },
                    ]}
                  >
                    <TimePicker
                      format={timeFormat}
                      className="col-lg-12"
                      onChange={(e: any) =>
                        setTimeAppointment(
                          moment(new Date(e)).format(timeCreateFormat)
                        )
                      }
                      defaultValue={moment(timeAppointment)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row form-group">
                <label>
                  ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item name="searchAddress">
                  <Select
                    placeholder="-"
                    defaultValue={data?.purposeSprayId}
                    onChange={handlePeriodSpray}
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
              <div className="row form-group col-lg-6 p-2">
                <label>
                  เป้าหมายการฉีดพ่น <span style={{ color: "red" }}>*</span>
                </label>
                {PURPOSE_SPRAY_CHECKBOX.map((item) =>
                  _.set(
                    item,
                    "isChecked",
                    data?.targetSpray
                      ?.map((x) => x)
                      .find((y) => y === item.crop)
                      ? true
                      : item.isChecked
                  )
                ).map((x, index) => (
                  <div className="form-group">
                    <input
                      type="checkbox"
                      value={x.crop}
                      checked={x.isChecked}
                      onChange={handlePurposeSpray}
                    />{" "}
                    <label style={{ padding: "0 8px 0 0" }}>{x.crop}</label>
                    {index == 4 && (
                      <>
                        <Input
                          status={validateComma.status}
                          className="col-lg-9"
                          placeholder="โปรดระบุ เช่น เพลี้ย,หอย"
                          onChange={handleOtherSpray}
                          disabled={checkCrop}
                          defaultValue={Array.from(
                            new Set(
                              data?.targetSpray.filter(
                                (a) => !PURPOSE_SPRAY.some((x) => x === a)
                              )
                            )
                          )}
                        />
                        {validateComma.status == "error" && (
                          <p
                            style={{
                              color: color.Error,
                              padding: "0 0 0 55px",
                            }}
                          >
                            {validateComma.message}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="row form-group p-2">
                <label>
                  การเตรียมยา <span style={{ color: "red" }}>*</span>
                </label>
                <Radio.Group
                  defaultValue={data?.preparationBy}
                  key={data?.preparationBy}
                >
                  <Space direction="vertical" onChange={handlePreparation}>
                    <Radio value="เกษตรกรเตรียมยาเอง">เกษตรกรเตรียมยาเอง</Radio>
                    <Radio value="นักบินโดรนเตรียมให้">
                      นักบินโดรนเตรียมให้
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className="form-group">
                <label>หมายเหตุ</label>
                <TextArea
                  placeholder="ระบุหมายเหตุเพื่อแจ้งนักบินโดรน เช่น เกษตรกรจะเตรียมยาให้, ฝากนักบินเลือกยาราคาไม่แพงมาให้หน่อย เป็นต้น"
                  value={data?.comment}
                  onChange={handleComment}
                />
              </div>
            </Form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="flex-column">
            <Form style={{ padding: "20px" }}>
              <div className="form-group col-lg-6">
                <label>ค่าบริการ</label>
                <p>
                  {data?.totalPrice} บาท (จำนวน {data?.farmAreaAmount} ไร่)
                </p>
              </div>
              <div className="form-group col-lg-12">
                <label>สถานะ</label>
                <br />
                <Radio.Group
                  defaultValue={data.status}
                  onChange={handleChangeStatus}
                >
                  <Space direction="vertical">
                    {STATUS_INPROGRESS_CHECKBOX.map((item, index) => (
                      <Radio value={item.value} className="col-lg-12">
                        {item.name}
                        {data.status == "CANCELED" && index == 1 && (
                          <TextArea
                            placeholder="กรอกรายละเอียดปัญหา"
                            onChange={handleChangeRemarkCancel}
                            value={data?.statusRemark}
                          />
                        )}
                        <br />
                        {data.status == "WAIT_START" && index == 0 && (
                          <Radio.Group
                            defaultValue={data?.isProblem}
                            onChange={handleChangeStatusProblem}
                          >
                            <Space direction="vertical">
                              <Radio value={false}>ปกติ</Radio>
                              <Radio value={true}>งานมีปัญหา</Radio>
                              {data.isProblem == true && (
                                <TextArea
                                  placeholder="กรอกรายละเอียดปัญหา"
                                  onChange={handleChangeRemarkProblem}
                                  value={data?.problemRemark}
                                />
                              )}
                            </Space>
                          </Radio.Group>
                        )}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </Form>
          </div>
        </div>
      </Row>
    </CardContainer>
  );
  const renderFormSearchFarmer = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเกษตรกรและแปลง" />
      <div className="flex-column">
        <Form style={{ padding: "20px" }}>
          <div className="col-lg-12">
            <div className="row">
              <div className="form-group col-lg-4">
                <Form.Item>
                  <label>ชื่อ-นามสกุล</label>
                  <Input
                    value={
                      data?.farmer?.firstname + " " + data?.farmer.lastname
                    }
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>เบอร์โทร</label>
                <Form.Item>
                  <Input value={data?.farmer?.telephoneNo} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>แปลง</label>
                <Form.Item>
                  <Input value={data?.farmerPlot.plotName} disabled />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>พืชที่ปลูก</label>
                <Form.Item>
                  <Input value={data?.farmerPlot?.plantName} disabled />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>จำนวนไร่</label>
                <Form.Item>
                  <Input value={data?.farmerPlot?.raiAmount} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label>พื้นที่แปลงเกษตร</label>
                <Form.Item>
                  <Input
                    value={
                      data?.farmerPlot.plotArea.subdistrictName +
                      "/" +
                      data?.farmerPlot.plotArea.districtName +
                      "/" +
                      data?.farmerPlot.plotArea.provinceName
                    }
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6">
                <Form.Item>
                  <label>Latitude (ละติจูด)</label>
                  <Input value={data?.farmerPlot?.lat} disabled />
                </Form.Item>
              </div>
              <div className="form-group col-lg-6">
                <label>Longitude (ลองติจูด)</label>
                <Form.Item>
                  <Input value={data?.farmerPlot?.long} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-12">
                <GooleMap
                  width="100%"
                  height="350px"
                  zoom={17}
                  lat={
                    data?.farmerPlot?.lat != undefined
                      ? parseFloat(data.farmerPlot.lat)
                      : LAT_LNG_BANGKOK.lat
                  }
                  lng={
                    data?.farmerPlot?.long != undefined
                      ? parseFloat(data.farmerPlot?.long)
                      : LAT_LNG_BANGKOK.lng
                  }
                />
                <div className="row">
                  <div className="form-group">
                    <label>จุดสังเกต</label>
                    <Form.Item>
                      <Input value={data?.farmerPlot?.landmark} disabled />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </CardContainer>
  );
  const renderDronerSelectedList = (
    <CardContainer>
      <CardHeader textHeader="รายชื่อนักบินโดรน" />
      <Form>
        <div className="container">
          <div className="row pt-3">
            <div className="col-lg-3">
              {dronerSelected.firstname} {dronerSelected.lastname}
              <br />
              <p style={{ fontSize: "12px", color: color.Grey }}>
                {dronerSelected.dronerCode}
              </p>
            </div>
            <div className="col-lg-2">{dronerSelected.telephoneNo}</div>
            <div className="col-lg-4">
              {(dronerSelected.address.subdistrict.subdistrictName
                ? dronerSelected.address.subdistrict.subdistrictName + "/"
                : "") +
                (dronerSelected.address.district.districtName != null
                  ? dronerSelected.address.district.districtName + "/"
                  : "'") +
                (dronerSelected.address.province.provinceName != null
                  ? dronerSelected.address.province.provinceName
                  : "")}
            </div>
            <div className="col-lg-2">
              <Avatar
                size={25}
                src={
                  dronerSelected.dronerDrone[0].drone.droneBrand.logoImagePath
                }
                style={{ marginRight: "5px" }}
              />
              {dronerSelected.dronerDrone[0].drone.droneBrand.name}
              <br />
              <p style={{ fontSize: "12px", color: color.Grey }}>
                {dronerSelected.totalDroneCount > 1 && "(มากกว่า 1 ยี่หัอ)"}
              </p>
            </div>
            <div className="col-lg-1">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => setShowModal((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </Form>
    </CardContainer>
  );
  const renderServiceCharge = (
    <CardContainer>
      <CardHeader textHeader="ยอดรวมค่าบริการ" />
      <Form style={{ padding: "20px" }}>
        <CardContainer style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
          <Form style={{ padding: "20px" }}>
            <label>ยอดรวมค่าบริการ (หลังรวมค่าธรรมเนียม)</label>
            <h5 style={{ color: color.primary1 }} className="p-2">
              {data?.totalPrice &&
                numberWithCommas(parseFloat(data?.totalPrice))}{" "}
              บาท
            </h5>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={data?.price}
                    step="0.01"
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>ค่าธรรมเนียม (คิด 5% ของราคารวม)</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={parseFloat(data?.fee).toFixed(2)}
                    step="0.01"
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>ส่วนลดค่าธรรมเนียม</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={parseFloat(data?.discountFee).toFixed(2)}
                    step="0.01"
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </CardContainer>
      </Form>
    </CardContainer>
  );

  const updateDroner = (newDroner: TaskSearchDroner) => {
    let drone = DronerDroneEntity_INIT;
    let droner = DronerEntity_INIT;
    drone.drone.droneBrand.name = newDroner.drone_brand;
    drone.drone.droneBrand.logoImagePath = newDroner.logo_drone_brand;
    droner.id = newDroner.droner_id;
    droner.dronerCode = newDroner.droner_code;
    droner.firstname = newDroner.firstname;
    droner.lastname = newDroner.lastname;
    droner.telephoneNo = newDroner.telephone_no;
    droner.status = newDroner.droner_status;
    droner.address.subdistrict.subdistrictName = newDroner.subdistrict_name;
    droner.address.district.districtName = newDroner.district_name;
    droner.address.province.provinceName = newDroner.province_name;
    droner.totalDroneCount = parseInt(newDroner.count_drone);
    droner.dronerDrone = [drone];
    setDronerSelected(droner);
    setShowModal((prev) => !prev);
    setBtnSaveDisable(false);
  };
  const updateInprogressTask = () => {
    let changeTimeFormat = moment(timeAppointment).format(timeCreateFormat);
    let changeDateFormat = moment(dateAppointment).format(dateCreateFormat);
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

    let updateTask: UpdateInprogressTaskEntity =
      UpdateInprogressTaskEntity_INIT;
    updateTask.id = data.id;
    updateTask.dateAppointment = moment(
      changeDateFormat + " " + changeTimeFormat
    ).toISOString();
    updateTask.purposeSprayId = data.purposeSprayId;
    updateTask.targetSpray = data.targetSpray;
    updateTask.preparationBy = data.preparationBy;
    updateTask.comment = data.comment;
    updateTask.status = data.status;
    updateTask.isProblem = data.isProblem;
    updateTask.updateBy = profile.firstname + " " + profile.lastname;
    updateTask.dronerId = dronerSelected.id;
    updateTask.problemRemark = data.problemRemark;
    updateTask.statusRemark = data.statusRemark;
    updateTask.farmerPlotId = data.farmerPlotId;
    Swal.fire({
      title: "ยืนยันการแก้ไข",
      text: "โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await TaskDatasource.updateInprogressTask(updateTask).then((res) => {
          console.log(res);
          if (res.userMessage == "success") {
            window.location.href = "/IndexInprogressTask";
          }
        });
      }
    });
  };

  return (
    <>
      <Layouts key={data?.id}>
        <Row>
          <BackIconButton
            onClick={() => (window.location.href = "/IndexInprogressTask")}
          />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>
              แก้ไขงาน #{data?.taskNo}
            </strong>
          </span>
        </Row>
        <CardContainer>{renderFormAppointment}</CardContainer>
        <br />
        <CardContainer>{renderFormSearchFarmer}</CardContainer>
        <br />
        <CardContainer>{renderDronerSelectedList}</CardContainer>
        <br />
        <CardContainer>{renderServiceCharge}</CardContainer>
        <FooterPage
          onClickBack={() => (window.location.href = "/IndexInprogressTask")}
          onClickSave={updateInprogressTask}
          disableSaveBtn={saveBtnDisable}
        />
      </Layouts>
      {showModel && (
        <ModalSelectedDroner
          show={showModel}
          backButton={() => setShowModal((prev) => !prev)}
          title="เปลี่ยนแปลงนักบินโดรน"
          dataTask={data}
          dataDroner={dronerSelected}
          callBack={updateDroner}
        />
      )}
    </>
  );
};
export default EditInprogressTask;
