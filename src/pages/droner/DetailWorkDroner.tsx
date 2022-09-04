import Layout from "../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Badge, Form, Image, Input, Row, Select, Tag, Upload } from "antd";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import { CardHeader } from "../../components/header/CardHearder";
import color from "../../resource/color";
import GoogleMap from "../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import {
  taskDetailEntity,
  taskDetailEntity_INIT,
} from "../../entities/DronerRankEntities";
import { DronerRankDatasource } from "../../datasource/DronerRankDatasource";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../entities/AddressEntities";
import {
  StarFilled,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function DetailWorkDroner() {
  const taskId = queryString[1];
  const [data, setData] = useState<taskDetailEntity>(taskDetailEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT);
  let imgList: (string | boolean)[] = [];
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });

  const fetchTask = async () => {
    await DronerRankDatasource.getTaskDetail(taskId).then((res) => {
      console.log(res);
      setData(res);
      setAddress(res.droner.address);
      setMapPosition({
        lat: parseFloat(res.farmerPlot.lat),
        lng: parseFloat(res.farmerPlot.long),
      });
    });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const financial = (e: any) => {
    return Number.parseFloat(e).toFixed(1);
  };
  const formatNumber = (e: any) => {
    let formatNumber = Number(e)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formatNumber.split(".");
    if (splitArray.length > 1) {
      formatNumber = splitArray[0];
    }
    return formatNumber;
  };
  const starIcon = (
    <StarFilled
      style={{
        color: "#FFCA37",
        fontSize: "20px",
        marginRight: "10px",
      }}
    />
  );

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
                  value={moment(new Date(data.dateAppointment)).format(
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
                  value={moment(new Date(data.dateAppointment)).format(
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
            <Select disabled placeholder="คุมเลน" />
          </Form.Item>
          <label>เป้าหมายการฉีดพ่น</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.targetSpray ? data.targetSpray : "-"}
            </span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.preparationBy ? data.preparationBy : "-"}
            </span>
          </Form.Item>
          <label>ภาพงานจากนักบินโดรน</label>
          <br />
          <div className="pb-2">
            <div
              className="hiddenFileInput"
              style={{
                backgroundImage: `url(${data.imagePathFinishTask})`,
                display: data.imagePathFinishTask != null ? `url(${data.imagePathFinishTask})` : undefined,
              }}
            >
            </div>
          </div>

          <br />
          <label>หมายเหตุ</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {" "}
              -{/* {data.preparationBy ? data.preparationBy : "-"} */}
            </span>
          </Form.Item>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <label>ค่าบริการ</label>
          <Form.Item style={{ color: color.Grey }}>
            <span>{financial(data.unitPrice) + " " + "บาท"}</span>{" "}
            <span>{"(จำนวน" + " " + data.farmAreaAmount + " " + "ไร่)"}</span>
          </Form.Item>
          <br />
          <Form.Item>
            <label style={{ marginRight: "30px" }}>คะแนนรีวิว </label>
            <span>
              {" "}
              {starIcon}
              {financial(data.reviewDronerAvg)}
            </span>
            <div className="row">
              <div className="col-lg-6" style={{ color: color.Grey }}>
                1. มารยาทนักบิน{" "}
              </div>
              <div className="col-lg-6">
                {starIcon}
                {data.reviewDronerDetail != null
                  ? financial(data.reviewDronerDetail.pilotEtiquette)
                  : 0}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" style={{ color: color.Grey }}>
                2. ความตรงต่อเวลา{" "}
              </div>
              <div className="col-lg-6">
                {starIcon}
                {data.reviewDronerDetail != null
                  ? financial(data.reviewDronerDetail.punctuality)
                  : 0}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" style={{ color: color.Grey }}>
                3. ความเชี่ยวชาญในการพ่น{" "}
              </div>
              <div className="col-lg-6">
                {starIcon}
                {data.reviewDronerDetail != null
                  ? financial(data.reviewDronerDetail.sprayExpertise)
                  : 0}
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={3}
              disabled
              value={
                data.reviewDronerDetail != null
                  ? data.reviewDronerDetail.comment
                  : undefined
              }
            />
          </Form.Item>
          <label>สถานะ</label>
          <Form.Item>
            <span style={{ color: color.Success }}>
              <Badge color={color.Success} />
              {data.status == "DONE" ? "เสร็จสิ้น" : null}
              <br />
            </span>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
  const renderFarmer = (
    <Form key={data.farmerId}>
      <div className="container text-center" style={{ padding: "30px" }}>
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
              <Input disabled placeholder="ต.สันผักหวาน/อ.หางดง/จ.เชียงใหม่" />
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
        <div className="col-lg-3">
          <span>{data.droner.telephoneNo}</span>
        </div>
        <div className="col-lg-4">
          <span>สวนพริกไทย, เมืองปทุมธานี, กรุงเทพมหานคร</span>
          {/* {data.address != null
              ? data.address.subdistrict.subdistrictName
              : "-"} */}
        </div>
        <div className="col-lg">
          <span>DJI</span>
          <br />
          <p style={{ fontSize: "12px", color: color.Grey }}>
            (มากกว่า 1 ยี่ห้อ)
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
                  {formatNumber(data.totalPrice) + " " + "บาท"}
                </b>
              </span>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าบริการ (ก่อนคิดค่าคำนวณ)</label>
              <Input
                disabled
                value={
                  data.totalPrice != undefined
                    ? formatNumber(data.totalPrice)
                    : undefined
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าธรรมเนียม (คิด 5% ของราคารวม)</label>
              <Input disabled placeholder="0.0" suffix="บาท" />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ส่วนลดค่าธรรมเนียม</label>
              <Input
                disabled
                value={
                  data.discountFee != undefined
                    ? financial(data.discountFee)
                    : undefined
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
      {console.log(data.imagePathFinishTask)}
      <Row>
        <BackIconButton
          onClick={() =>
            (window.location.href = "/DetailRankDroner?=" + data.dronerId)
          }
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
    </Layout>
  );
}

export default DetailWorkDroner;
