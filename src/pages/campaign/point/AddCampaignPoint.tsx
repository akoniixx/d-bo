import { Col, DatePicker, Form, Input, Radio, Row, TimePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import { color } from "../../../resource";

const AddCampaignPoint = () => {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();

  return (
    <Layouts>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>เพิ่มแคมเปญคะแนน</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader="ข้อมูลแคมเปญคะแนน" />
        <Form style={{ padding: "32px" }} form={form}>
          <Col span={24}>
            <Form.Item
              name="campaignName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อแคมเปญคะแนน!",
                },
              ]}
            >
              <label>
                ชื่อแคมเปญคะแนน<span style={{ color: color.Error }}>*</span>
              </label>
              <Input placeholder="กรอกชื่อแคมเปญคะแนน " />
            </Form.Item>
          </Col>
          <Row>
            <Col span={7}>
              <Form.Item
                name="campaignName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อแคมเปญคะแนน!",
                  },
                ]}
              >
                <label>
                  วันเริ่มต้น<span style={{ color: color.Error }}>*</span>
                </label>
                <div className="d-flex">
                  <Form.Item
                    name="DateStart"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกวันที่!",
                      },
                    ]}
                  >
                    <DatePicker placeholder="เลือกวันที่" format={dateFormat} />
                  </Form.Item>
                  <Form.Item
                    name="TimeStart"
                    initialValue={moment("00:00", "HH:mm")}
                  >
                    <TimePicker
                      format={"HH:mm"}
                      className="ms-3"
                      placeholder="เลือกเวลา"
                      defaultValue={moment("00:00", "HH:mm")}
                      allowClear={false}
                    />
                  </Form.Item>
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="campaignName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อแคมเปญคะแนน!",
                  },
                ]}
              >
                <label>
                  วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
                </label>
                <Col className="d-flex">
                  <Form.Item
                    name="DateEnd"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกวันที่!",
                      },
                    ]}
                  >
                    <DatePicker placeholder="เลือกวันที่" format={dateFormat} />
                  </Form.Item>
                  <Form.Item
                    name="TimeEnd"
                    initialValue={moment("00:00", "HH:mm")}
                  >
                    <TimePicker
                      format={"HH:mm"}
                      className="ms-3"
                      placeholder="เลือกเวลา"
                      defaultValue={moment("00:00", "HH:mm")}
                      allowClear={false}
                    />
                  </Form.Item>
                </Col>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} justify={"start"}>
            <Col span={7}>
              <Form.Item
                name="campaignName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อแคมเปญคะแนน!",
                  },
                ]}
              >
                <label>
                  คะแนนที่ได้รับ<span style={{ color: color.Error }}>*</span>
                </label>
                <Input placeholder="กรอกคะแนนที่ได้รับ" suffix="คะแนน" />
              </Form.Item>
            </Col>
            <Col>
              <label style={{ paddingTop: "25px" }}> : </label>
            </Col>
            <Col span={7}>
              <Form.Item
                name="campaignName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อแคมเปญคะแนน!",
                  },
                ]}
              >
                <label>
                  จำนวนไร่ <span style={{ color: color.Error }}>*</span>
                </label>
                <Input placeholder="กรอกจำนวนไร่ " suffix="ไร่" />
              </Form.Item>
            </Col>
          </Row>
          <Col>
            <label>
              แอปพลิเคชัน <span style={{ color: color.Error }}>*</span>
            </label>
            <Form.Item
              name="application"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกแอปพลิเคชัน",
                },
              ]}
            >
              <Radio.Group className="d-flex flex-column">
                <Radio value={"FARMER"}>Farmer Application</Radio>
                <Radio value={"DRONER"}>Droner Application</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col>
            <label>
              สถานะ <span style={{ color: color.Error }}>*</span>
            </label>
            <Form.Item
              name="application"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกแอปพลิเคชัน",
                },
              ]}
            >
              <Radio.Group className="d-flex flex-column">
                <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                <Radio value={"DRAFT"}>รอเปิดใช้งาน</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Form>
      </CardContainer>
      <FooterPage
        onClickBack={() => navigate(-1)}
        styleFooter={{padding: '6px'}}
      />
    </Layouts>
  );
};

export default AddCampaignPoint;
