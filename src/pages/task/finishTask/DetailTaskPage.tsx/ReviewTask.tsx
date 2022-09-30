import Layout from "../../../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Tag,
  Upload,
} from "antd";
import { BackIconButton } from "../../../../components/button/BackButton";
import { CardContainer } from "../../../../components/card/CardContainer";
import { CardHeader } from "../../../../components/header/CardHearder";
import color from "../../../../resource/color";
import GoogleMap from "../../../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../../../definitions/Location";
import TextArea from "antd/lib/input/TextArea";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../../../entities/AddressEntities";
import {
  StarFilled,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { TaskFinishedDatasource } from "../../../../datasource/TaskFinishDatasource";
import moment from "moment";
import { UploadImageDatasouce } from "../../../../datasource/UploadImageDatasource";
import { RATE_SELECT } from "../../../../definitions/FinishTask";
import FooterPage from "../../../../components/footer/FooterPage";

import { TaskReviewDronerDatasource } from "../../../../datasource/TaskReviewDronerDatasource";
import Swal from "sweetalert2";
import {
  CreateReviewDroner_INIT,
  DetailFinishTask,
  DetailFinishTask_INIT,
  DetailReviewTask,
  DetailReviewTask_INIT,
} from "../../../../entities/TaskFinishEntities";
import {
  CreateReview,
  CreateReview_INIT,
} from "../../../../entities/ReviewDronerEntities";

const { Map } = require("immutable");
const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function ReviewTask() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const taskId = queryString[1];
  const [data, setData] = useState<DetailReviewTask>(DetailReviewTask_INIT);
  const [detailDroner, setDetailDroner] =
    useState<CreateReview>(CreateReview_INIT);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [saveRate, setSaveRate] = useState<boolean>(true);
  const fetchDetailTask = async () => {
    await TaskFinishedDatasource.getDetailFinishTaskById(taskId).then((res) => {
      setData(res);
      setMapPosition({
        lat: parseFloat(res.data.farmerPlot.lat),
        lng: parseFloat(res.data.farmerPlot.long),
      });
    });
  };

  useEffect(() => {
    fetchDetailTask();
  }, []);

  const onChangeCanReview = (e: any) => {
    const m = Map(detailDroner).set("canReview", e.target.value);
    const n = Map(m.toJS()).set("taskId", taskId);
    setDetailDroner(n.toJS());
    if(e.target.value == "Yes"){
      setBtnSaveDisable(true);
      setSaveRate(false);
    }else{
      setBtnSaveDisable(false);
      setSaveRate(false);
    }
  };

  const manners = (e: any) => {
    const m = Map(detailDroner).set("pilotEtiquette", parseInt(e));
    const n = Map(m.toJS()).set("taskId", taskId);
    setDetailDroner(n.toJS());
     setBtnSaveDisable(false);
  };
  const punctuality = (e: any) => {
    const m = Map(detailDroner).set("punctuality", parseInt(e));
    const n = Map(m.toJS()).set("taskId", taskId);
    setDetailDroner(n.toJS());
     setBtnSaveDisable(false);
  };
  const expertise = (e: any) => {
    const m = Map(detailDroner).set("sprayExpertise", parseInt(e));
    const n = Map(m.toJS()).set("taskId", taskId);
    setDetailDroner(n.toJS());
    {e == 0 ?  setBtnSaveDisable(true) :  setBtnSaveDisable(false); }
    
  };
  const commentReview = (e: any) => {
    const m = Map(detailDroner).set("comment", e.target.value);
    const n = Map(m.toJS()).set("taskId", taskId);
    setDetailDroner(n.toJS());
  };

  const formatCurrency = (e: any) => {
    e = parseFloat(e);
    return e.toFixed(2).replace(/./g, function (c: any, i: any, a: any) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  };
  const onPreviewImg = async () => {
    let src = data.imageTaskUrl;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const UpdateReviewDroner = async (data: DetailReviewTask) => {
    Swal.fire({
      title: "ยืนยันการเปลี่ยนแปลงข้อมูล",
      text: "โปรดตรวจสอบรายละเอียดที่คุณต้องการเปลี่ยนแปลงข้อมูลก่อนเสมอเพราะอาจส่งผลต่อการจ้างงานในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const pushDetailReview = Map(data.data).set(
          "reviewDronerDetail",
          detailDroner
        );
        const p = Map(pushDetailReview.toJS().reviewDronerDetail).set(
          "updateBy",
          profile.firstname + " " + profile.lastname
        );
        await TaskReviewDronerDatasource.UpdateReviewDroner(p.toJS()).then(
          (time) => {
            window.location.href = "/IndexFinishTask";
          }
        );
      }
      fetchDetailTask();
    });
  };

  const renderAppointment = (
    <Form style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <Input
                  style={{ width: "100%" }}
                  value={moment(new Date(data.data.dateAppointment)).format(
                    dateFormat
                  )}
                  disabled
                  suffix={<CalendarOutlined />}
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <Input
                  style={{ width: "100%" }}
                  value={moment(new Date(data.data.dateAppointment)).format(
                    timeFormat
                  )}
                  disabled
                  suffix={<ClockCircleOutlined />}
                />
              </Form.Item>
            </div>
          </div>
          <label>ช่วงเวลาฉีดพ่น</label>
          <Form.Item>
            <Select
              disabled
              value={
                data.data.purposeSpray !== null
                  ? data.data.purposeSpray.purposeSprayName
                  : "-"
              }
            />
          </Form.Item>
          <label>เป้าหมายการฉีดพ่น</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.data.targetSpray !== null
                ? data.data.targetSpray.join(",")
                : "-"}
            </span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.data.preparationBy !== null ? data.data.preparationBy : "-"}
            </span>
          </Form.Item>
          <label>ภาพงานจากนักบินโดรน</label>
          <br />
          <div className="pb-2">
            <div
              className="hiddenFileInput"
              style={{
                backgroundImage: `url(${data.imageTaskUrl})`,
                display:
                  data.imageTaskUrl != null
                    ? `url(${data.imageTaskUrl})`
                    : undefined,
              }}
            ></div>
            <div className="ps-5">
              {data.imageTaskUrl !== "object" &&
              Object.keys(data.imageTaskUrl).length !== 0 ? (
                <>
                  <Tag
                    color={color.Success}
                    onClick={onPreviewImg}
                    style={{ cursor: "pointer", borderRadius: "5px" }}
                  >
                    View
                  </Tag>
                </>
              ) : undefined}
            </div>
          </div>
          <br />
          <label>หมายเหตุ</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.data.comment !== null ? data.data.comment : "-"}
            </span>
          </Form.Item>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <label>ค่าบริการ</label>
          <Form.Item style={{ color: color.Grey }}>
            <span>
              {data.data.price !== null
                ? formatCurrency(data.data.price) + " " + "บาท"
                : "0.00" + " " + "บาท"}
            </span>{" "}
            <span>
              {"(จำนวน" + " " + data.data.farmAreaAmount + " " + "ไร่)"}
            </span>
          </Form.Item>
          <br />
          <Form.Item>
            <label style={{ marginRight: "30px" }}>คะแนนรีวิว </label>
            <br />
            <Radio.Group
              style={{ width: "100%" }}
              className="pt-3"
              onChange={onChangeCanReview}
            >
              <Radio value={"Yes"}>ให้รีวิวแล้ว</Radio>
              <Form.Item>
                <div className="row pt-3" style={{ color: color.Grey }}>
                  <span className="col-lg-5">1. มารยาทนักบิน</span>
                  <Select
                    onChange={manners}
                    disabled={saveRate}
                    style={{ width: 75 }}
                  >
                    {RATE_SELECT.map((item: any) => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </Select>
                </div>
                <div className="row pt-3" style={{ color: color.Grey }}>
                  <span className="col-lg-5">2. ความตรงต่อเวลา</span>
                  <Select
                    onChange={punctuality}
                    disabled={saveRate}
                    style={{ width: 75 }}
                  >
                    {RATE_SELECT.map((item: any) => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </Select>
                </div>
                <div className="row pt-3" style={{ color: color.Grey }}>
                  <span className="col-lg-5">3. ความเชี่ยวชาญในการพ่น</span>
                  <Select
                    onChange={expertise}
                    disabled={saveRate}
                    style={{ width: 75 }}
                  >
                    {RATE_SELECT.map((item: any) => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item>
                <TextArea
                  disabled={saveRate}
                  rows={3}
                  onChange={commentReview}
                  placeholder="กรอกความคิดเห็นเพิ่มเติม"
                />
              </Form.Item>
              <Radio value={"No"}>ไม่สะดวกรีวิว</Radio>
            </Radio.Group>
          </Form.Item>

          <label>สถานะ</label>
          <Form.Item>
            <span style={{ color: "#2F80ED" }}>
              <Badge color={"#2F80ED"} />
              {data.data.status == "WAIT_REVIEW" ? "รอรีวิว" : null}
              <br />
            </span>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
  const renderFarmer = (
    <Form key={data.data.farmerId}>
      <div className="container text-center" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>ชื่อ-นามสกุล</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.data.farmer.firstname + " " + data.data.farmer.lastname
                }
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input disabled defaultValue={data.data.farmer.telephoneNo} />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>แปลง</label>
            <Form.Item>
              <Select disabled defaultValue={data.data.farmerPlot.plotName} />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input disabled defaultValue={data.data.farmerPlot.plantName} />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={data.data.farmerPlot.raiAmount}
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
                  data.data.farmerPlot.plotArea !== null
                    ? data.data.farmerPlot.plotArea.subdistrictName +
                      "/" +
                      data.data.farmerPlot.plotArea.districtName +
                      "/" +
                      data.data.farmerPlot.plotArea.provinceName
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
              <Input disabled value={data.data.farmerPlot.landmark} />
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
            {data.data.droner !== null
              ? data.data.droner.firstname + " " + data.data.droner.lastname
              : null}
            <br />
            <p style={{ fontSize: "12px", color: color.Grey }}>
              {data.data.droner !== null ? data.data.droner.dronerCode : null}
            </p>
          </span>
        </div>
        <div className="col-lg-3">
          <span>
            {data.data.droner !== null ? data.data.droner.telephoneNo : null}
          </span>
        </div>
        <div className="col-lg-4">
          <span>
            {data.data.droner.address !== null
              ? data.data.droner.address.subdistrict.subdistrictName +
                "," +
                " " +
                data.data.droner.address.district.districtName +
                "," +
                " " +
                data.data.droner.address.province.provinceName
              : null}
          </span>
        </div>
        <div className="col-lg">
          <span>
            <Avatar
              size={25}
              src={
                data.data.droner.dronerDrone[0] != null
                  ? data.data.droner.dronerDrone[0].drone.droneBrand
                      .logoImagePath
                  : null
              }
              style={{ marginRight: "5px" }}
            />
            {data.data.droner.dronerDrone[0] != null
              ? data.data.droner.dronerDrone[0].drone.droneBrand.name
              : "-"}
          </span>
          <br />
          <p style={{ fontSize: "12px", color: color.Grey }}>
            {data.data.droner.dronerDrone.length > 1
              ? "(มากกว่า 1 ยี่ห้อ)"
              : null}
          </p>
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
                  {data.data.totalPrice !== null
                    ? formatCurrency(data.data.totalPrice) + " " + "บาท"
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
                  data.data.price !== null
                    ? formatCurrency(data.data.price) + " " + "บาท"
                    : "0.00" + " " + "บาท"
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
                value={
                  data.data.fee !== null
                    ? formatCurrency(data.data.fee) + " " + "บาท"
                    : "0.00" + " " + "บาท"
                }
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
                  data.data.discountFee !== null
                    ? formatCurrency(data.data.discountFee) + " " + "บาท"
                    : "0.00" + " " + "บาท"
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Form>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexFinishTask")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดงาน #{data.data.taskNo}
          </strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader="นัดหมายบริการ" />
        {renderAppointment}
      </CardContainer>
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
        onClickBack={() => (window.location.href = "/IndexFinishTask")}
        onClickSave={() => UpdateReviewDroner(data)}
        disableSaveBtn={saveBtnDisable}
      />
    </Layout>
  );
}

export default ReviewTask;
