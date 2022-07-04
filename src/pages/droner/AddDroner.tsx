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
  Modal,
  Checkbox,
  Col,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackButton, BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import {
  PictureFilled,
  SearchOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import emptyDrone from "../../resource/media/empties/icon_drone.png";
import color from "../../resource/color";
import FooterPage from "../../components/footer/FooterPage";
import { ModalPage } from "../../components/modal/ModalPage";
import { CardHeader } from "../../components/header/CardHearder";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { Link } from "react-router-dom";
import SaveButtton from "../../components/button/SaveButton";
import Swal from "sweetalert2";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";

const _ = require("lodash");
const { Map } = require("immutable");

const AddDroner = () => {
  const [modal, setModal] = useState(false);
  const [droner, setDroner] = useState<DronerEntity>(DronerEntity_INIT);
  const [firstName, setFirstName] = useState<{
    show: boolean;
    massage?: string;
  }>({ show: false, massage: "" });
  const [lastName, setLastName] = useState<{ show: boolean; massage?: string }>(
    { show: false, massage: "" }
  );
  const [phone, setPhone] = useState<{ show: boolean; massage?: string }>({
    show: false,
    massage: "",
  });
  const [action, setAction] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const validationThLetter = (text: string) => {
    return text.match(/[ก-๙ ]/g);
  };
  const validationNumber = (text: string) => {
    return text.match(/[0-9]/g);
  };
  const validationEnLetter = (text: string) => {
    return text.match(/[a-zA-Z0-9$@$!%*?&#^-_. +:;]/g);
  };
  const validationEnNumLetter = (text: string) => {
    return text.match(/[a-zA-Z0-9]/g);
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(droner).set("firstname", e.target.value);
    setDroner(m.toJS());
  };

  const saveNewDroner = (data: DronerEntity) => {
    DronerDatasource.createDronerList(data).then((res) => {
      console.log(data);
      if (res.success) {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/IndexDroner";
        });
      }
    });
  };

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
          ยี่ห้อโดรนที่ฉีดพ่น <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item>
          <Select placeholder="เลือกยี่ห้อโดรน" allowClear>
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
          <Select placeholder="เลือกรุ่น" allowClear>
            <option>AGRAS T20</option>
            <option>AGRAS T20</option>
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <label>
          เลขตัวถังโดรน <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item
          name="LandTotal"
          rules={[
            {
              required: true,
              message: "กรุณากรอกเลขตัวถังโดรน",
            },
          ]}
        >
          <Input placeholder="กรอกเลขตัวถังโดรน" />
        </Form.Item>
      </div>
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
      <div className="form-group col-lg-12 pb-5">
        <label>
          ใบอนุญาตโดรนจาก กสทช.
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
    </Form>
  );
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
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
                <Input
                  placeholder="กรอกชื่อ"
                  value={droner.firstname}
                  onChange={handleFirstName}
                />
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
                <Select placeholder="เลือกตำบล" allowClear>
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
                <Select placeholder="เลือกรหัสไปรษณย์" allowClear>
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
          <div className="form-group">
            <label>
              พื้นที่ให้บริการหลัก <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="areaDrone"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกพื้นที่ให้บริการ!",
                },
              ]}
            >
              <Input
                placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
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
          <div className="row ">
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
          </div>
          <div className="form-group col-lg-6">
            <Form.Item name="plantOther">
              <Input placeholder="พืชอื่นๆ" />
            </Form.Item>
          </div>
          <div className="form-group ">
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                      >
                        <Input
                          placeholder="พืชอื่นๆ"
                          style={{
                            width: "50%",
                          }}
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <DeleteOutlined
                          style={{ color: color.Error }}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{
                        width: "50%",
                        backgroundColor: "#D6F1CD",
                        color: color.Success,
                      }}
                    >
                      + เพิ่มรายการพืชอื่นๆ
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
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
            onClick={showModal}
          >
            เพิ่มโดรน
          </Button>
        </div>
        <ModalPage
          visible={modal}
          textHeader="เพิ่มข้อมูลโดรนเกษตร"
          closeModal={closeModal}
          data={formModal}
          backButton={closeModal}
        />
        <Form>
          <div
            className="container text-center"
            style={{ padding: "80px", color: color.Disable }}
          >
            <img src={emptyDrone} />
            <p>ยังไม่มีข้อมูลโดรน</p>
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
          onClick={() => (window.location.href = "/IndexDroner")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            เพิ่มข้อมูลนักบินโดรน (Droner)
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexDroner")}
        onClickSave={() => {
          saveNewDroner(droner);
        }}
      />
    </Layout>
  );
};

export default AddDroner;
