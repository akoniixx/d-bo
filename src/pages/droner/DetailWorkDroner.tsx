import Layout from "../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import {
  Badge,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Select,
  Tag,
  TimePicker,
} from "antd";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import { CardHeader } from "../../components/header/CardHearder";
import color from "../../resource/color";
import GoogleMap from "../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import TextArea from "antd/lib/input/TextArea";
import icon from "../../resource/icon";
import moment from "moment";
import { taskDetailEntity, taskDetailEntity_INIT } from "../../entities/DronerRankEntities";
import { DronerRankDatasource } from "../../datasource/DronerRankDatasource";

const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
function DetailWorkDroner() {
  const taskId = queryString[1];
  const [data, setData] = useState<taskDetailEntity>(
    taskDetailEntity_INIT
  );
  const [imgWorkDroner, setImgWorkDroner] = useState<any>(false);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });

  const fetchTask = async() => {
    await DronerRankDatasource.getTaskDetail(taskId).then((res) => {
      console.log(res)

    })
  }

  useEffect(() => {
    fetchTask();
  }, []);
  const renderAppointment = (
    <Form style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="18/05/2565"
                  disabled
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <TimePicker
                  style={{ width: "100%" }}
                  placeholder="11:00"
                  disabled
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
            <span style={{ color: color.Grey }}>หญ้า, หนอน</span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>เกษตรกรเตรียมยาเอง</span>
          </Form.Item>
          <label>ภาพงานจากนักบินโดรน</label>
          <br />
          <div className="pb-2">
            <div
              className="hiddenFileInput"
              style={{
                backgroundImage: `url(${imgWorkDroner})`,
                display: imgWorkDroner != false ? imgWorkDroner : false,
              }}
            ></div>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <label>ค่าบริการ</label>
          <Form.Item style={{ color: color.Grey, margin: "10px" }}>
            <span>1,000 บาท (จำนวน 20 ไร่)</span>
          </Form.Item>
          <label style={{ marginRight: "30px" }}>คะแนนรีวิว </label>
          <span>
            {" "}
            <img alt="logo" src={icon.iconStar} width="5%" /> 4.0
          </span>
          <Form.Item style={{ color: color.Grey, margin: "10px" }}>
            <div className="row">
              <div className="col-lg-6">1. มารยาทนักบิน </div>
              <div className="col-lg-6">
                <img alt="logo" src={icon.iconStar} width="10%" /> 4.0
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">2. ความตรงต่อเวลา </div>
              <div className="col-lg-6">
                <img alt="logo" src={icon.iconStar} width="10%" /> 4.0
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">3. ความเชี่ยวชาญในการพ่น </div>
              <div className="col-lg-6">
                <img alt="logo" src={icon.iconStar} width="10%" /> 4.0
              </div>
            </div>
          </Form.Item>
          <label></label>
          <Form.Item style={{ color: color.Grey }}>
            <TextArea rows={3} disabled placeholder="นักบินทำงานดี" />
          </Form.Item>
          <label>สถานะ</label>
          <Form.Item>
            <span style={{ color: color.Success }}>
              <Badge color={color.Success} />
              เสร็จสิ้น
              <br />
            </span>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
  const renderFarmer = (
    <Form>
      <div className="container text-center" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>ชื่อ-นามสกุล</label>
            <Form.Item>
              <Input disabled placeholder="นามี มีนาเยอะ" />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input disabled placeholder="0989284761" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>แปลง</label>
            <Form.Item>
              <Select disabled placeholder="นามี มีนาเยอะ 1" />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input disabled placeholder="ข้าว" />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input disabled placeholder="100 ไร่" />
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
              <Input
                disabled
                placeholder="ข้างโรงเรียน บ้านน้อยซอยลึก วิทยาคม"
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
            โดรนเนอร์ พ่นปุ๋ย 2
            <br />
            <p style={{ fontSize: "12px", color: color.Grey }}>DN00000001</p>
          </span>
        </div>
        <div className="col-lg-3">
          <span>0989284761</span>
        </div>
        <div className="col-lg-4">
          <span>สวนพริกไทย, เมืองปทุมธานี, กรุงเทพมหานคร</span>
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

  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/DetailRankDroner")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดงาน 
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
    </Layout>
  );
}

export default DetailWorkDroner;
