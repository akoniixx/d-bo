import React, { useState } from "react";
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
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import Backbtn from "../../components/button/Backbtn";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import image from "../../resource/image";
import { Link } from "react-router-dom";

function EditDroneList() {

  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer style={{ height: "850px" }}>
        <CardHeader showButton={false} textHeader="ข้อมูลโดรนเกษตรกร" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>วันที่ลงทะเบียน</label>
              <Form.Item>
                <Input disabled placeholder="18/05/2565, 10:00" />
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
                <Select placeholder="DJL" allowClear>
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
                <Select placeholder="AGRAS T20" allowClear>
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
                <Radio.Group onChange={onChange} value={value}>
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
        <CardHeader showButton={true} textHeader="ข้อมูลนักบินโดรน" />
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
                  <Input disabled placeholder="DN0000001" />
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
        <Link to='/DronerList'> <Backbtn /></Link>
       
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>แก้ไขข้อมูลโดรนเกษตร</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderLand}
        {renderFromData}
      </Row>
      <FooterPage/>
    </Layout>
  );
}
export default EditDroneList;
