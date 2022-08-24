import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Radio,
  Space,
  Tag,
  Checkbox,
} from "antd";

import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import Swal from "sweetalert2";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import {
  GetDronerDroneEntity,
  GetDronerDroneEntity_INIT,
} from "../../entities/DronerDroneEntities";
import {
  DRONER_DRONE_STATUS
} from "../../definitions/DronerStatus";
import {
  ImageEntity,
  ImageEntity_INTI
} from "../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DroneEntity } from "../../entities/DroneEntities";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { formatDate } from "../../utilities/TextFormatter";
import { MONTH_SALE } from "../../definitions/Month";
import { REASON_CHECK, REASON_IS_CHECK } from "../../definitions/Reason";
import img_empty from "../../resource/media/empties/uploadImg.png";
const { Option } = Select;
const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function DetailRankDroner() {
  
  const renderDroner = (
    <div className="col-lg-5">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
            <div className="form-group col-lg-12 text-start container" style={{ padding: "20px" }}>
              <div className="row">
              <label>Droner ID</label>
              <div className="row">
              <Form.Item name="droneId">
                  <Input disabled placeholder="DN000001" />
                </Form.Item>
              </div>
              <div className="row">
              <div className="col-lg-6">
                <label>ชื่อ</label>
                <Form.Item name="firstname">
                  <Input disabled  placeholder="วิภาพร"/>
                </Form.Item>
                </div>
                <div className="col-lg-6">
                <label>นามสกุล</label>
                <Form.Item name="lastname">
                  <Input disabled placeholder="สมคิด" />
                </Form.Item>
                </div>
              </div>
              <div className="row">
              <div className="col-lg-6">
                <label>เบอร์โทร</label>
                <Form.Item name="firstname">
                  <Input disabled  placeholder="0989284761"/>
                </Form.Item>
                </div>
                <div className="col-lg-6">
                <label>ตำบล</label>
                <Form.Item name="lastname">
                  <Input disabled placeholder="ปากเพรียว" />
                </Form.Item>
                </div>
              </div>
              <div className="row">
              <div className="col-lg-6">
                <label>อำเภอ</label>
                <Form.Item name="firstname">
                  <Input disabled  placeholder="เมืองสระบุรี"/>
                </Form.Item>
                </div>
                <div className="col-lg-6">
                <label>จังหวัด</label>
                <Form.Item name="lastname">
                  <Input disabled placeholder="สระบุรี" />
                </Form.Item>
                </div>
              </div>
               
              
              
                </div>
          
             
            </div>
      </CardContainer>
    </div>
  );
  const renderFromData = (
    <div className="col-lg-6">
      <CardContainer>
        <CardHeader textHeader="รายละเอียดการบริการ" />
       
      </CardContainer>
    </div>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton onClick={() => (window.location.href = "/IndexRankDroner")} />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>รายละเอียดการให้บริการนักบินโดรน</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" >
        {renderDroner}
        {renderFromData}
      </Row>
    </Layout>
  );
}
export default DetailRankDroner;
