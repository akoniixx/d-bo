import Layout from "../../../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Avatar, Badge, Form, Input, Row, Select } from "antd";
import { BackIconButton } from "../../../../components/button/BackButton";
import { CardContainer } from "../../../../components/card/CardContainer";
import { CardHeader } from "../../../../components/header/CardHearder";
import color from "../../../../resource/color";
import GoogleMap from "../../../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../../../definitions/Location";
import TextArea from "antd/lib/input/TextArea";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  DetailFinishTask,
  DetailFinishTask_INIT,
} from "../../../../entities/TaskFinishEntities";
import { TaskFinishedDatasource } from "../../../../datasource/TaskFinishDatasource";
import moment from "moment";
import { FINISH_TASK, TASK_HISTORY } from "../../../../definitions/FinishTask";
import {
  HistoryEntity,
  HistoryEntity_INIT,
} from "../../../../entities/HistoryEntities";
import { CouponDataSource } from "../../../../datasource/CouponDatasource";
import {
  numberWithCommas,
  numberWithCommasToFixed,
} from "../../../../utilities/TextFormatter";
import {
  STATUS_EN_NEWTASK_COLOR_MAPPING,
  STATUS_NEWTASK_MAPPING,
} from "../../../../definitions/Status";
const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function CancelTask() {
  const taskId = queryString[1];
  const [data, setData] = useState<DetailFinishTask>(DetailFinishTask_INIT);
  const [history, setHistory] = useState<HistoryEntity>(HistoryEntity_INIT);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const [couponData, setCouponData] = useState<{
    couponCode: string;
    couponName: string;
    couponDiscount: number | null;
  }>({
    couponCode: "",
    couponName: "",
    couponDiscount: null,
  });
  const fetchDetailTask = async () => {
    await TaskFinishedDatasource.getDetailFinishTaskById(taskId).then((res) => {
      if (res.data.couponId !== null) {
        CouponDataSource.getPromotionCode(res.data.couponId).then((result) =>
          setCouponData({
            couponCode: res.data.couponCode ?? "",
            couponDiscount: !res.data.discountCoupon
              ? null
              : parseInt(res.data.discountCoupon),
            couponName: result.couponName ?? "",
          })
        );
      }
      setHistory(res.data.taskHistory[0]);
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

  const formatCurrency = (e: any) => {
    e = parseFloat(e);
    return e.toFixed(2).replace(/./g, function (c: any, i: any, a: any) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
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
                  placeholder="12/08/2565"
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
                  placeholder="16:00"
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
          <label>หมายเหตุ</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              <TextArea rows={3} value={data.data.comment! || "-"} disabled />
            </span>
          </Form.Item>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <label>ค่าบริการ</label>
          <Form.Item style={{ color: color.Grey }}>
            <span>
              {data.data.price !== null
                ? numberWithCommas(parseFloat(data.data.price)) + " บาท"
                : "0 บาท"}
            </span>{" "}
            <span>
              {"(จำนวน " + data.data.farmAreaAmount + " ไร่)"} ราคาไร่ละ{" "}
              {data.data.unitPrice} บาท
            </span>
          </Form.Item>
          <br />
          <label>สถานะ</label>
          <Form.Item>
            <span style={{ color: color.Error }}>
              <Badge color={color.Error} /> {FINISH_TASK[data.data.status]}
              {history != null
                ? " " + "(" + TASK_HISTORY[history.beforeValue] + ")"
                : null}
              <br />
            </span>
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={3}
              disabled
              value={
                data.data.statusRemark != null
                  ? data.data.statusRemark
                  : undefined
              }
            />
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
    <>
      {data.data.droner ? (
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="col-lg-3">
              <span>
                {data.data.droner?.firstname ??
                  "" + " " + data.data.droner?.lastname ??
                  ""}
                <br />
                <p style={{ fontSize: "12px", color: color.Grey }}>
                  {data.data.droner?.dronerCode ?? ""}
                </p>
              </span>
            </div>
            <div className="col-lg-3">
              <span>{data.data.droner?.telephoneNo ?? ""}</span>
            </div>
            <div className="col-lg-3">
              <span>
                {data.data.droner?.address !== undefined
                  ? data.data.droner.address.subdistrict.subdistrictName +
                    "/" +
                    data.data.droner.address.district.districtName +
                    "/" +
                    data.data.droner.address.province.provinceName
                  : null}
              </span>
            </div>
            <div className="col-lg-1">
              {parseFloat(data.data.distance).toFixed(0) || 0} km
            </div>
            <div className="col-lg">
              <span>
                <Avatar
                  size={25}
                  src={
                    data.data.droner?.dronerDrone[0] != undefined
                      ? data.data.droner.dronerDrone[0].drone.droneBrand
                          .logoImagePath
                      : null
                  }
                  style={{ marginRight: "5px" }}
                />
                {data.data.droner?.dronerDrone[0] != undefined
                  ? data.data.droner.dronerDrone[0].drone.droneBrand.name
                  : "-"}
              </span>
              <br />
              <p style={{ fontSize: "12px", color: color.Grey }}>
                {data.data.droner?.dronerDrone?.length > 1
                  ? "(มากกว่า 1 ยี่ห้อ)"
                  : null}
              </p>
            </div>
          </div>
        </Form>
      ) : (
        <Form style={{ padding: "32px" }}>
          {data.data.taskDronerTemp.map((item) => (
            <div className="row">
              {JSON.parse(item.dronerDetail[0]) !== null && (
                <>
                  <div className="col-lg-2">
                    <span>
                      {JSON.parse(item.dronerDetail[0]).firstname +
                        " " +
                        JSON.parse(item.dronerDetail[0]).lastname}
                      <br />
                      <p style={{ fontSize: "12px", color: color.Grey }}>
                        {JSON.parse(item.dronerDetail[0]).droner_code ?? ""}
                      </p>
                    </span>
                  </div>
                  <div className="col-lg-2">
                    <span>
                      {JSON.parse(item.dronerDetail[0]).telephone_no ?? ""}
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <span>
                      {(JSON.parse(item.dronerDetail[0]).subdistrict_name &&
                        JSON.parse(item.dronerDetail[0]).subdistrict_name +
                          "/") ||
                        ""}
                      {(JSON.parse(item.dronerDetail[0]).district_name &&
                        JSON.parse(item.dronerDetail[0]).district_name + "/") ||
                        ""}
                      {(JSON.parse(item.dronerDetail[0]).province_name &&
                        JSON.parse(item.dronerDetail[0]).province_name) ||
                        ""}
                    </span>
                  </div>
                  <div className="col-lg-1">
                    {JSON.parse(item.dronerDetail[0]).distance.toFixed(0) || 0}{" "}
                    km
                  </div>
                  <div className="col-lg-2">
                    <span>
                      <Avatar
                        size={25}
                        src={
                          JSON.parse(item.dronerDetail[0]).logo_drone_brand !=
                          undefined
                            ? JSON.parse(item.dronerDetail[0]).logo_drone_brand
                            : null
                        }
                        style={{ marginRight: "5px" }}
                      />
                      {JSON.parse(item.dronerDetail[0]).drone_brand != undefined
                        ? JSON.parse(item.dronerDetail[0]).drone_brand
                        : "-"}
                    </span>
                    <br />
                    <p style={{ fontSize: "12px", color: color.Grey }}>
                      {JSON.parse(item.dronerDetail[0]).count_drone > 1
                        ? "(มากกว่า 1 ยี่ห้อ)"
                        : null}
                    </p>
                  </div>
                  <div className="col-lg-2">
                    <span
                      style={{
                        color: STATUS_EN_NEWTASK_COLOR_MAPPING[item.status],
                      }}
                    >
                      <Badge
                        color={STATUS_EN_NEWTASK_COLOR_MAPPING[item.status]}
                      />{" "}
                      {STATUS_NEWTASK_MAPPING[item.status]}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </Form>
      )}
    </>
  );
  const renderPrice = (
    <Form style={{ padding: "20px" }}>
      <Form style={{ padding: "20px", backgroundColor: "#2196531A" }}>
        <div className="row">
          <div className="col-lg-3" style={{ borderRight: "solid" }}>
            <label>ยอดรวมค่าบริการ (เกษตรกร)</label>
            <h5 style={{ color: color.primary1 }} className="p-2">
              {data?.data.totalPrice &&
                numberWithCommasToFixed(parseFloat(data?.data.totalPrice))}{" "}
              บาท
            </h5>
          </div>
          <div className="col-lg-3" style={{ paddingLeft: "40px" }}>
            <label>รายได้ที่นักบินโดรนได้รับ</label>
            <h5 style={{ color: color.Warning }} className="p-2">
              {data?.data.price &&
                numberWithCommasToFixed(
                  parseFloat(data?.data.price) +
                    parseFloat(data?.data.revenuePromotion)
                )}{" "}
              บาท
            </h5>
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
                    ? numberWithCommas(parseFloat(data.data.price))
                    : 0
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
                value={
                  data.data.fee !== null
                    ? numberWithCommas(parseFloat(data.data.fee))
                    : 0
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
                    ? numberWithCommas(parseFloat(data.data.discountFee))
                    : 0
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-4">
            <label>รหัสคูปอง</label>
            <Input value={couponData.couponCode} disabled autoComplete="off" />
          </div>
          <div className="form-group col-lg-4">
            <label>ชื่อคูปอง</label>
            <Input value={couponData.couponName} disabled autoComplete="off" />
          </div>
          <div className="form-group col-lg-4">
            <label>ส่วนลดคูปอง</label>
            <Input
              suffix="บาท"
              value={numberWithCommas(couponData.couponDiscount!)}
              disabled
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="form-group col-lg-6 p-2">
            <label>โปรโมชั่นนักบินโดรน</label>
            <Input
              suffix="บาท"
              value={data.data.discountPromotion || 0}
              disabled
              autoComplete="off"
            />
          </div>
          <div className="form-group col-lg-6 p-2">
            <label>โปรโมชั่นเกษตรกร</label>
            <Input
              suffix="บาท"
              value={data.data.revenuePromotion || 0}
              disabled
              autoComplete="off"
            />
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

export default CancelTask;
