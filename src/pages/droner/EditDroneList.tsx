import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Pagination,
  Image,
  Radio,
  Space,
  RadioChangeEvent,
  Col,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import image from "../../resource/image";
import { BackButton, BackIconButton } from "../../components/button/BackButton";
import SaveButtton from "../../components/button/SaveButton";

import Swal from "sweetalert2";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { formatDate } from "../../utilities/TextFormatter";
import { DroneEntity, DroneEntity_INIT } from "../../entities/DroneEntities";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroneList() {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const id = queryString[1];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [droneData, setDroneData] = useState<DroneEntity>(DroneEntity_INIT);

  // const fetchDroneById = async (id: string) => {
  //   await DroneDatasource.getDroneListByID(id).then((res) => {
  //     setDroneData(res);
  //   });
  // };

  // const UpdateDroneList = (id: string) => {
  //   DroneDatasource.UpdateDroneList(id)
  //     .then((res) => {
  //       if (res != null) {
  //         Swal.fire({
  //           title: "บันทึกสำเร็จ",
  //           icon: "success",
  //           confirmButtonText: "ยืนยัน",
  //           confirmButtonColor: "#0068F4",
  //         }).then((result) => {
  //           if (result.value == true) {
  //             window.location.href = "/DroneList";
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchDroneById(id);
  // }, []);

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer style={{ height: "850px" }}>
        <CardHeader textHeader="ข้อมูลโดรนเกษตรกร" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>วันที่ลงทะเบียน</label>
              <Form.Item>
                <Input disabled value={formatDate(droneData.createdAt)} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ยี่ห้อโดรนฉีดพ่น <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกยี่ห้อโดรน!",
                  },
                ]}
              >
                <Select
                  allowClear
                  value={droneData.series}
                  // onChange={onChange}
                >
                  <option>DJL</option>
                  <option>DJL</option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รุ่น <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรุ่นโดรน!",
                  },
                ]}
              >
                <Select value={droneData.series} allowClear>
                  <option>AGRAS T20</option>
                  <option>AGRAS T20</option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>เลขตัวถังโดรน</label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเลขตัวถังโดรน!",
                  },
                ]}
              >
                <Input placeholder="DJL0012345678" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>
                ใบอนุญาตนักบิน{" "}
                <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ PDF)</span>
                <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Upload listType="picture" className="upload-list-inline">
                <Button
                  style={{
                    backgroundColor: "rgba(33, 150, 83, 0.1)",
                    border: color.Success + "1px dashed",
                    borderRadius: "5px",
                    width: "190px",
                  }}
                >
                  <span style={{ color: color.Success }}>อัพโหลด</span>
                </Button>
              </Upload>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>
                ใบอนุญาตโดรนจาก กสทช.{" "}
                <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ PDF)</span>
                <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Upload listType="picture" className="upload-list-inline">
                <Button
                  style={{
                    backgroundColor: "rgba(33, 150, 83, 0.1)",
                    border: color.Success + "1px dashed",
                    borderRadius: "5px",
                    width: "190px",
                  }}
                >
                  <span style={{ color: color.Success }}>อัพโหลด</span>
                </Button>
              </Upload>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label style={{ marginBottom: "10px" }}>
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสถานะ!",
                  },
                ]}
              >
                <Radio.Group
                  //onChange={onChange}
                  value={value}
                >
                  <Space direction="vertical">
                    <Radio value={1}>อนุมัติ</Radio>
                    <Radio value={2}>รอตรวจสอบ</Radio>
                    <Radio value={3}>ไม่อนุมัติ</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );

  const renderLand = (
    <div className="col-lg-4">
      <CardContainer style={{ height: "640px" }}>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
        <Form>
          <div className="container text-center" style={{ padding: "30px" }}>
            <div className="row">
              <div className="form-group text-center pb-5">
                <Image
                  style={{ width: "160px", height: "160px" }}
                  src={image.drone}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-12 text-start">
                <label>Drone ID</label>
                <Form.Item>
                  <Input disabled value={droneData.id} />
                </Form.Item>
                <label>ชื่อ</label>
                <Form.Item>
                  <Input disabled placeholder="สมศักดิ์" />
                </Form.Item>
                <label>นามสกุล</label>
                <Form.Item>
                  <Input disabled placeholder="บินโดรน" />
                </Form.Item>
                <label>เบอร์โทร</label>
                <Form.Item>
                  <Input disabled placeholder="0957796588" />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton onClick={() => (window.location.href = "/DroneList")} />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>แก้ไขข้อมูลโดรนเกษตร</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderLand}
        {renderFromData}
      </Row>
      <br />
      <Row>
        <Col span={22}>
          <BackButton onClick={() => (window.location.href = "/DroneList")} />
        </Col>
        <Col>{/* <SaveButtton onClick={() => UpdateDroneList(id)} /> */}</Col>
      </Row>
    </Layout>
  );
}
export default EditDroneList;
