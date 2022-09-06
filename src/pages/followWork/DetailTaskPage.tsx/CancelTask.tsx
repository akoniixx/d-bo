import Layout from "../../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Badge, Form, Input, Row, Select, Tag, Upload } from "antd";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import color from "../../../resource/color";
import GoogleMap from "../../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import TextArea from "antd/lib/input/TextArea";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../../entities/AddressEntities";
import {
  StarFilled,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  DetailFinishTask,
  DetailFinishTask_INIT,
} from "../../../entities/TaskFinishEntities";
import { TaskFinishedDatasource } from "../../../datasource/TaskFinishDatasource";
import moment from "moment";
import { UploadImageDatasouce } from "../../../datasource/UploadImageDatasource";
const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function CancelTask() {
  const taskId = queryString[1];
  const [data, setData] = useState<DetailFinishTask>(DetailFinishTask_INIT);
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT);
  let imgList: (string | boolean)[] = [];
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });

  const [imgFinish, setImgFinish] = useState<any>();
  const fetchDetailTask = async () => {
    // await TaskFinishedDatasource.getDetailFinishTaskById(taskId).then((res) => {
    //   console.log(res);
    //   setData(res);
    //   setMapPosition({
    //     lat: parseFloat(res.data.farmerPlot.lat),
    //     lng: parseFloat(res.data.farmerPlot.long),
    //   });
    //   let getImgFinish = res.imagePathFinishTask;
    //   imgList.push(getImgFinish != null ? getImgFinish : "");
    //   var i = 0;
    // for (i; imgList.length > i; i++) {
    //   i == 0 &&
    //     UploadImageDatasouce.getImageFinish(imgList[i].toString()).then(
    //       (resImg) => {
    //         setImgFinish(resImg.url);
    //       }
    //     );
    // }
    // });
  };

  useEffect(() => {
    fetchDetailTask();
  }, []);

  const financial = (e: any) => {
    return Number.parseFloat(e).toFixed(1);
  };

  const formatCurrency = (e: any) => {
    e = parseFloat(e);
    return e.toFixed(2).replace(/./g, function (c: any, i: any, a: any) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  };
  const onPreviewImg = async () => {
    let src = imgFinish;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgFinish);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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
                  placeholder="12/08/2565"
                  // value={moment(new Date(data.data.dateAppointment)).format(
                  //   dateFormat
                  // )}
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
                  // value={moment(new Date(data.data.dateAppointment)).format(
                  //   timeFormat
                  // )}
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
              กำจัดหนอน
              {/* {data.targetSpray ? data.targetSpray : "-"} */}
            </span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              นักบินโดรนเตรียมให้
              {/* {data.data.preparationBy ? data.data.preparationBy : "-"} */}
            </span>
          </Form.Item>

          <br />
          <label>หมายเหตุ</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              -{/* {data.data.statusRemark} */}
            </span>
          </Form.Item>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <label>ค่าบริการ</label>
          <Form.Item style={{ color: color.Grey }}>
            <span>
              2,000
              {/* {financial(data.data.price) + " " + "บาท"} */}
            </span>{" "}
            <span>
              (จำนวน 20 ไร่)
              {/* {"(จำนวน" + " " + data.data.farmAreaAmount + " " + "ไร่)"} */}
            </span>
          </Form.Item>
          <br />
          <label>สถานะ</label>
          <Form.Item>
            <span style={{ color: color.Error }}>
              <Badge color={color.Error} />
              ยกเลิก (รอเริ่มงาน)
              {/* {data.data.status == "CANCELED" ? "ยกเลิก (รอเริ่มงาน)" : null} */}
              <br />
            </span>
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={3}
              disabled
              placeholder="เกษตรกรแจ้งยกเลิกงาน เนื่องจากเกิดอุบัติเหตุทางรถยนต์"
              // value={
              //   data.data.reviewDronerDetail != null
              //     ? data.data.reviewDronerDetail.comment
              //     : undefined
              // }
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
                placeholder="Spider Man"
                // defaultValue={
                //   data.data.farmer.firstname + " " + data.data.farmer.lastname
                // }
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input
                disabled
                placeholder="0989284761"
                // defaultValue={data.data.farmer.telephoneNo}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>แปลง</label>
            <Form.Item>
              <Select
                disabled
                placeholder="Spider Man yahoo"
                // defaultValue={data.data.farmerPlot.plotName}
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input
                disabled
                placeholder="นาข้าว"
                // defaultValue={data.data.farmerPlot.plantName}
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input
                disabled
                placeholder="20"
                // defaultValue={data.data.farmerPlot.raiAmount}
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
                placeholder="คลองสาน/กรุงเทพมหานคร"
                // defaultValue={data.data.farmerPlot.locationName}
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
              <Input
                disabled
                placeholder="ตรงข้ามสถานีตำรวจ"
                // value={data.data.farmerPlot.landmark}
              />
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
            Iron Man
            {/* {data.data.droner.firstname + " " + data.data.droner.lastname} */}
            <br />
            <p style={{ fontSize: "12px", color: color.Grey }}>
              DN0000012
              {/* {data.data.droner.dronerCode} */}
            </p>
          </span>
        </div>
        <div className="col-lg-3">
          <span>
            0991299098
            {/* {data.data.droner.telephoneNo} */}
          </span>
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
                  2,000 บาท
                  {/* {formatCurrency(data.data.totalPrice) + " " + "บาท"} */}
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
                placeholder="2,000"
                // value={
                //   data.data.price != undefined
                //     ? formatCurrency(data.data.price)
                //     : undefined
                // }
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าธรรมเนียม (คิด 5% ของราคารวม)</label>
              <Input
                disabled
                placeholder="0.00"
                // value={formatCurrency(data.data.discountFee)}
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ส่วนลดค่าธรรมเนียม</label>
              <Input
                disabled
                placeholder="0.00"
                // value={
                //   data.data.fee != undefined
                //     ? formatCurrency(data.data.fee)
                //     : undefined
                // }
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
