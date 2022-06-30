import Layout from "../../components/layout/Layout";
import React, { useState } from "react";
import { Form, Input, Radio, Row, Select, Space } from "antd";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import CardHeader from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";

const AddAdmin = () => {
  const [status, setStatus] = useState(true);

  const headleChangestatus = (e: any) => {
    setStatus(e.target.value);
  };

  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexAdmin")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            เพิ่มข้อมูลผู้ดูแลระบบ (User Management)
          </strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader="ข้อมูลผู้ดูแลระบบ" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ชื่อ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ!",
                  },
                ]}
              >
                <Input placeholder="กรอกชื่อ" />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                นามสกุล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล!",
                  },
                ]}
              >
                <Input placeholder="กรอกนามสกุล" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                อีเมลล์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกอีเมลล์!",
                  },
                ]}
              >
                <Input placeholder="กรอกอีเมลล์" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ชื่อผู้ใช้ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="ีUserName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อในระบบ!",
                  },
                ]}
              >
                <Input placeholder="กรอกชื่อในระบบ" />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสผ่าน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่าน!",
                  },
                ]}
              >
                <Input placeholder="กรอกรหัสผ่าน" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                บทบาท <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="Province">
                <Select placeholder="เลือกบทบาท" allowClear>
                  <option value={"SUPER_ADMIN"}></option>
                  <option value={"ADMIN"}></option>
                  <option value={"SALE"}></option>
                  <option value={"ACCOUNT"}></option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 form-group">
              <label>
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Radio.Group value={status} onChange={headleChangestatus}>
                <Space direction="vertical">
                  <Radio value={true}>ใช้งาน</Radio>
                  <Radio value={false}>ไม่ใช้งาน</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </Form>
      </CardContainer>
      <FooterPage onClickBack={() => (window.location.href = "/IndexAdmin")} />
    </Layout>
  );
};

export default AddAdmin;
