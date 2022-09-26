import {
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
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import GooleMap from "../../../components/map/GoogleMap";
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
  GetTaskInprogressEntity,
  GetTaskInprogressEntity_INIT,
} from "../../../entities/TaskInprogress";
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

  const fetchInprogressTask = async () => {
    await TaskDatasource.getInprogressTaskById(queryString[1]).then((res) => {
      console.log(res);
      setDateAppointment(new Date(res.dateAppointment).toUTCString());
      setTimeAppointment(new Date(res.dateAppointment).getTime());
      fetchPurposeSpray(res.farmerPlot.plantName);
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
                  <Select placeholder="-" defaultValue={data?.purposeSprayId}>
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
                      key={data?.targetSpray[0]}
                      type="checkbox"
                      value={x.crop}
                      checked={x.isChecked}
                    />{" "}
                    <label style={{ padding: "0 8px 0 0" }}>{x.crop}</label>
                    {index == 4 && (
                      <>
                        <Input
                          className="col-lg-9"
                          placeholder="โปรดระบุ เช่น เพลี้ย,หอย"
                          defaultValue={Array.from(
                            new Set(
                              data?.targetSpray.filter(
                                (a) => !PURPOSE_SPRAY.some((x) => x === a)
                              )
                            )
                          )}
                        />
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
                  <Space direction="vertical">
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
                <Radio.Group defaultValue={data.status}>
                  <Space direction="vertical">
                    {STATUS_INPROGRESS_CHECKBOX.map((item, index) => (
                      <Radio value={item.value} className="col-lg-12">
                        {item.name}<br/>
                        {data.status == "WAIT_START" && index == 0 && (
                          <Radio.Group defaultValue={data?.isProblem}>
                            <Space direction="vertical">
                              <Radio value={false}>ปกติ</Radio>
                              <Radio value={true}>งานมีปัญหา</Radio>
                              {data.isProblem == true && (
                                <TextArea placeholder="กรอกรายละเอียดปัญหา" />
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
                  <Input suffix="บาท" value={data?.fee} step="0.01" disabled />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>ส่วนลดค่าธรรมเนียม</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={data?.discountFee}
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

  const updateInprogressTask = () => {};

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
        <CardContainer>{renderServiceCharge}</CardContainer>
        <FooterPage
          onClickBack={() => (window.location.href = "/IndexInprogressTask")}
          onClickSave={updateInprogressTask}
          disableSaveBtn={saveBtnDisable}
        />
      </Layouts>
    </>
  );
};
export default EditInprogressTask;
