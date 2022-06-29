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
  Modal,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import {
  PictureFilled,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import { ModalPage } from "../../components/modal/ModalPage";

const AddFarmer = () => {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const uploadButton = (
    <div>
      <PictureFilled style={{ fontSize: "50px", color: color.Success }} />
      <div style={{ fontSize: "20px", color: color.Success }}>+ Upload</div>
    </div>
  );

  const formModal = (
    <Form>
      <div className="form-group">
        <label>
          ชื่อแปลง <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item
          name="LandName"
          rules={[
            {
              required: true,
              message: "กรุณากรอกชื่อแปลง!",
            },
          ]}
        >
          <Input placeholder="กรอกชื่อแปลง" />
        </Form.Item>
      </div>
      <div className="form-group">
        <label>
          พืชที่ปลูก <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item name="Crop">
          <Select placeholder="เลือกพืชที่ปลูก" allowClear>
            <option>ข้าว</option>
            <option>ข้าวโพด</option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group col-lg-6">
        <label>
          จำนวนไร่ <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item
          name="LandTotal"
          rules={[
            {
              required: true,
              message: "กรุณากรอกจำนวนไร่!",
            },
          ]}
        >
          <Input placeholder="ไร่" style={{ textAlign: "right" }} />
        </Form.Item>
      </div>
      <div className="form-group">
        <label>พื้นที่แปลงเกษตร</label>
        <Form.Item name="SearchAddress">
          <Input
            placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
            prefix={<SearchOutlined />}
          />
        </Form.Item>
      </div>
      {/* map */}
      <p>map</p>
      <div className="form-group">
        <label>
          จุดสังเกตใกล้แปลง (เช่น รร.บ้านน้อย){" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item name="SearchAddress">
          <Input placeholder="กรอกจุดสังเกต" />
        </Form.Item>
      </div>
    </Form>
  );

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลเกษตรกร" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group text-center pb-5">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                iconRender={UploadOutlined}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
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
                เบอร์โทร <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="Telephone"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทร!",
                  },
                ]}
              >
                <Input placeholder="กรอกเบอร์โทร" />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสบัตรประชาชน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="CardID"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสบัตรประชาชน!",
                  },
                ]}
              >
                <Input placeholder="กรอกบัตรประชาชน" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>
                รูปถ่ายผู้สมัครคู่กับบัตรประชาชน{" "}
                {/* <span style={{ color: "red" }}>*</span> */}
              </label>
              <br />
              <Upload listType="picture" className="upload-list-inline">
                <Button
                  style={{
                    backgroundColor: "rgba(33, 150, 83, 0.1)",
                    border: color.Success + "1px dashed",
                    borderRadius: "5px",
                  }}
                >
                  <span style={{ color: color.Success }}>อัพโหลดรูปภาพ</span>
                </Button>
              </Upload>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                จังหวัด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="Province">
                <Select placeholder="เลือกจังหวัด" allowClear>
                  <option>กรุงเทพมหานคร</option>
                  <option>นครปฐม</option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="district">
                <Select placeholder="เลือกอำเภอ" allowClear>
                  <option>คลองเตย</option>
                  <option>บางรัก</option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ตำบล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="Subdistrict">
                <Select placeholder="เลือกตำบล" disabled allowClear>
                  <option>คลองตัน</option>
                  <option>สี่พระยา</option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสไปรษณีย์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="PostCode">
                <Select placeholder="เลือกรหัสไปรษณย์" disabled allowClear>
                  <option>10110</option>
                  <option>10500</option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                ที่อยู่บ้าน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่บ้าน!",
                  },
                ]}
              >
                <TextArea
                  className="col-lg-12"
                  rows={5}
                  placeholder="กรอกที่อยู่บ้าน (เลขที่บ้าน, หมู่บ้าน, ชื่ออาคาร/ตึก, ซอย)"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );

  const renderLand = (
    <div className="col-lg-4">
      <CardContainer>
        <div
          style={{
            backgroundColor: color.Success,
            borderRadius: "12px 12px 0px 0px",
            padding: "10px 10px 10px 10px",
          }}
          className="d-flex justify-content-between"
        >
          <h4 className="pt-2 ps-3" style={{ color: "white" }}>
            แปลงเกษตร
          </h4>
          <Button
            className="pt-2"
            style={{
              backgroundColor: color.secondary1,
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={showModal}
          >
            เพิ่มแปลง
          </Button>
        </div>
        <ModalPage
          visible={modal}
          textHeader="เพิ่มแปลงเกษตร"
          closeModal={closeModal}
          data={formModal}
          backButton={closeModal}
        />
        <Form>
          <div className="container text-center" style={{ padding: "80px" }}>
            <img src={emptyData}></img>
            <p>ยังไม่มีแปลงเกษตร</p>
          </div>
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด 0 รายการ</p>
        <Pagination defaultCurrent={1} total={1} />
      </div>
    </div>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexFarmer")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            เพิ่มข้อมูลเกษตรกร (Farmer)
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage onClickBack={() => (window.location.href = "/IndexFarmer")} />
    </Layout>
  );
};

export default AddFarmer;
