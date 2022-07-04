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
  Checkbox,
  Col,
  Badge,
} from "antd";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import image from "../../resource/image";
import { Link } from "react-router-dom";
import { BackButton, BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import { ModalPage } from "../../components/modal/ModalPage";
import ActionButton from "../../components/button/ActionButton";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.pathname, "=");

function EditDroner() {
  const DronerId = queryString[1];
  //MockData
  const dataSource = {
    dataDrone: [
      {
        dronekay: 1,
        dronename: "DJI",
        dronestatus: "ใช้งาน",
      },
    ],
  };
  const [data, setData] = useState(dataSource);
  const [dronerData, setDronerData] = useState<DronerEntity>(DronerEntity_INIT);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // const fecthDroner = async (id: string) => {
  //   await DronerDatasource.getDronerListByID(id).then((res) => {
  //     setData(res);
  //   });
  // };

  // useEffect(() => {
  //   fecthDroner(DronerId);
  // }, []);

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const inputLandInModal = (
    <Form>
      <div className="form-group">
        <label>
          ยี่ห้อโดรนฉีดพ่น <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item>
          <Select placeholder="เลือกยี่ห้อโดรนฉีดพ่น" allowClear>
            <option>DJI</option>
            <option>DJI</option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <label>
          รุ่น <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item name="Crop">
          <Select placeholder="เลือกรุ่นโดรน" allowClear>
            <option>GRAS T20</option>
            <option>GRAS T20</option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <label>
          เลขตัวถัง <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item
          name="LandTotal"
          rules={[
            {
              required: true,
              message: "กรุณากรอกเลขตัวถัง!",
            },
          ]}
        >
          <Input placeholder="กรอกเลขตัวถัง" />
        </Form.Item>
      </div>
      <div className="form-group col-lg-12 pb-5">
        <label>
          ใบอนุญาตนักบิน
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: color.Disable }}>(ไฟล์รูป หรือPDF)</span>
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
      <div className="form-group col-lg-12 pb-5">
        <label>
          ใบอนุญาตอนุญาตโดรนจาก กสทช.
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: color.Disable }}>(ไฟล์รูป หรือPDF)</span>
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
  );

  const colorStatus = (status: string) => {
    var colorText = color.Success;
    colorText = status == "ใช้งาน" ? colorText : color.Error;
    return colorText;
  };

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลคนบินโดรน" />
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
          </div>
        </Form>

        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Drone ID</label>
              <Form.Item>
                <Input disabled placeholder="DN0000001" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ชื่อ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ!",
                  },
                ]}
              >
                <Input placeholder="" value={dronerData.firstname} />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                นามสกุล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล!",
                  },
                ]}
              >
                <Input placeholder="" value={dronerData.lastname} />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>เบอร์โทร</label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทร!",
                  },
                ]}
              >
                <Input placeholder="" value={dronerData.telephoneNo} />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>รหัสบัตรประชาชน</label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสบัตรประชาชน!",
                  },
                ]}
              >
                <Input placeholder="" value={dronerData.idNo} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>
                รูปถ่ายผู้สมัครคู่บัตรประชาชน
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
            <div className="form-group col-lg-6">
              <label>
                จังหวัด
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกจังหวัด!",
                  },
                ]}
              >
                <Select placeholder="เลือกจังหวัด" allowClear>
                  <option>สระบุรี</option>
                  <option>เชียงใหม่</option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกอำเภอ!",
                  },
                ]}
              >
                <Select placeholder="เลือกอำเภอ" allowClear>
                  <option>เมืองสระบุรี</option>
                  <option>หางดง</option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ตำบล
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกตำบล!",
                  },
                ]}
              >
                <Select placeholder="เลือกตำบล" allowClear>
                  <option>ปากเพรียว</option>
                  <option>สันผักหวาน</option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสไปรษณีย์
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกรหัสไปรษณีย์!",
                  },
                ]}
              >
                <Select placeholder="เลือกรหัสไปรษณีย์" allowClear>
                  <option>10600</option>
                  <option>18000</option>
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
                  //defaultValue={data.address}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                พื้นที่ให้บริการ<span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกพื้นที่ให้บริการ!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกพื้นที่ให้บริการ"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ประสบการณ์บินโดรน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="expYear">
                <Input placeholder="กรอกจำนวนปี" />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label></label>
              <Form.Item name="ExpMonth">
                <Input placeholder="กรอกจำนวนเดือน" />
              </Form.Item>
            </div>
          </div>
          <div className="form-group col-lg-7">
            <label>
              พืชที่เคยฉีดพ่น
              <span style={{ color: color.Disable }}>
                (กรุณาเลือกอย่างน้อย 1 อย่าง)
              </span>
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="plant">
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="นาข้าว">นาข้าว</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="มันสำปะหลัง">มันสำปะหลัง</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ทุเรียน">ทุเรียน</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ข้าวโพด">ข้าวโพด</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="มะม่วง">มะม่วง</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ปาล์ม">ปาล์ม</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="อ้อย">อ้อย</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ลำไย">ลำไย</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ยางพารา">ยางพารา</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="form-group col-lg-6">
            <Form.Item name="plantOther">
              <Input placeholder="พืชอื่นๆ" />
            </Form.Item>
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
            รายการโดรน
          </h4>
          <Button
            className="pt-2"
            style={{
              backgroundColor: color.secondary1,
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            //onClick={showModal}
          >
            เพิ่มโดรน
          </Button>
        </div>
        <ModalPage
          visible={modal}
          textHeader="แก้ไขข้อมูลโดรนเกษตร"
          closeModal={closeModal}
          data={inputLandInModal}
          backButton={closeModal}
        />
        <Form>
          {data.dataDrone.length != 0 ? (
            <div className="container">
              {data.dataDrone.map((item) => (
                <div className="row pt-3 pb-3 ">
                  <div className="col-lg-6">
                    <span>{item.dronename}</span>
                  </div>
                  <div className="col-lg-3">
                    <span style={{ color: colorStatus(item.dronestatus) }}>
                      <Badge color={colorStatus(item.dronestatus)} />
                      {item.dronestatus}
                    </span>
                  </div>
                  <div className="col-lg-3 d-flex justify-content-between">
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<EditOutlined />}
                        color={color.primary1}
                        onClick={showModal}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData}></img>
              <p>ยังไม่มีโดรนเกษตร</p>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data.dataDrone.length} รายการ</p>
        {data.dataDrone.length < 10 ? null : (
          <Pagination defaultCurrent={1} total={1} />
        )}
      </div>
    </div>
  );
  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexDroner")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>แก้ไขข้อมูลคนบินโดรน</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage />
    </Layout>
  );
}
export default EditDroner;
