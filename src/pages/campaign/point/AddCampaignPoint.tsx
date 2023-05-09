import { render } from "@testing-library/react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import { CreateCampaignEntiry } from "../../../entities/CampaignPointEntites";
import { color } from "../../../resource";

const _ = require("lodash");
let queryString = _.split(window.location.pathname, "=");

const AddCampaignPoint = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [create, setCreate] = useState<CreateCampaignEntiry>();

  const createCampaign = () => {
    const getForm = form.getFieldsValue();
    const data: any = { ...create };
    const condition: any = { ...create?.condition };
    condition.num = 1;
    condition.point = parseFloat(getForm.point);
    condition.rai = parseFloat(getForm.rai);
    condition.rewardId = null;

    data.campaignName = getForm.campaignName;
    data.campaignType = "POINT";
    data.application = getForm.application;
    data.status = getForm.status;
    data.condition = [condition];
    data.createBy = profile.firstname + " " + profile.lastname;
    data.updateBy = profile.firstname + " " + profile.lastname;
    data.startDate = new Date(
      moment(getForm.startDate).format("YYYY-MM-DD") +
        " " +
        moment(getForm.startTime).format("HH:mm:ss")
    ).toISOString();
    data.endDate = new Date(
      moment(getForm.endDate).format("YYYY-MM-DD") +
        " " +
        moment(getForm.endTime).format("HH:mm:ss")
    ).toISOString();
    setCreate(data);
    CampaignDatasource.createCampaign(data).then((res) => {
      if (res.id) {
        window.location.href = "/IndexCampaignPoint";
      }
    });
  };

  return (
    <>
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
              <label>
                ชื่อแคมเปญคะแนน<span style={{ color: color.Error }}>*</span>
              </label>
              <Form.Item
                name="campaignName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อแคมเปญคะแนน!",
                  },
                ]}
              >
                <Input placeholder="กรอกชื่อแคมเปญคะแนน" autoComplete="off" />
              </Form.Item>
            </Col>
            <Row>
              <Col span={7}>
                <label>
                  วันเริ่มต้น<span style={{ color: color.Error }}>*</span>
                </label>
                <div className="d-flex">
                  <Form.Item
                    name="startDate"
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
                    name="startTime"
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
              </Col>
              <Col span={12}>
                <label>
                  วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
                </label>
                <Col className="d-flex">
                  <Form.Item
                    name="endDate"
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
                    name="endTime"
                    initialValue={moment("23:59", "HH:mm")}
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
              </Col>
            </Row>
            <Row gutter={8} justify={"start"}>
              <Col span={7}>
                <label>
                  คะแนนที่ได้รับ<span style={{ color: color.Error }}>*</span>
                </label>
                <Form.Item
                  name="point"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกจำนวนคะแนน!",
                    },
                  ]}
                >
                  <Input
                    placeholder="กรอกคะแนนที่ได้รับ"
                    suffix="คะแนน"
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col>
                <label style={{ paddingTop: "25px" }}> : </label>
              </Col>
              <Col span={7}>
                <label>
                  จำนวนไร่ <span style={{ color: color.Error }}>*</span>
                </label>
                <Form.Item
                  name="rai"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกจำนวนไร่!",
                    },
                  ]}
                >
                  <Input
                    placeholder="กรอกจำนวนไร่ "
                    suffix="ไร่"
                    autoComplete="off"
                  />
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
                name="status"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกแอปพลิเคชัน",
                  },
                ]}
              >
                <Radio.Group className="d-flex flex-column">
                  <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                  <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Form>
        </CardContainer>
        <FooterPage
          onClickBack={() => navigate(-1)}
          styleFooter={{ padding: "6px" }}
          onClickSave={() => setShowModal(!showModal)}
        />
      </Layouts>
      {showModal && (
        <Modal
          title="ยืนยันการเพิ่ม"
          onCancel={() => {
            setShowModal(!showModal);
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
        >
          <div className="px-4 pt-4">
            <span className="text-secondary">
              โปรดตรวจสอบแคมเปญที่คุณต้องการเพิ่ม ก่อนที่จะกดยืนยันการเพิ่ม
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการคะแนนในแอปพลิเคชัน
            </p>
          </div>
          <Divider
            style={{
              marginBottom: "20px",
            }}
          />
          <div className="d-flex justify-content-between px-4 pb-4">
            <Button
              style={{
                borderColor: color.Success,
                color: color.Success,
              }}
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Success,
                backgroundColor: color.Success,
                color: color.White,
              }}
              onClick={createCampaign}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddCampaignPoint;
