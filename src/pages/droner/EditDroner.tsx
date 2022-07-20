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
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import image from "../../resource/image";
import { Link } from "react-router-dom";
import { BackButton, BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import { ModalPage } from "../../components/modal/ModalPage";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import Swal from "sweetalert2";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { DefaultOptionType } from "antd/lib/select";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import { Toast } from "react-bootstrap";
import ActionButton from "../../components/button/ActionButton";
import { DefaultValue } from "recoil";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import {
  DroneEntity,
  DroneEntity_INIT,
  UpdateDroneEntity,
  UpdateDroneEntity_INIT,
} from "../../entities/DroneEntities";
import { AddressEntity, AddressEntity_INIT } from "../../entities/AddressEntities";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroner() {
  const dronerId = queryString[1];
  const [data, setData] = useState<DronerEntity>(DronerEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(
    AddressEntity_INIT
  );
  const [dronerDrone, setDronerDrone] = useState<UpdateDroneEntity>(
    UpdateDroneEntity_INIT
  );
  const [modal, setModal] = useState(false);
  const [province, setProvince] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [subdistrict, setSubdistrict] = useState<any[]>([]);
  const [brandId, setBrandId] = useState<any[]>([]);
  const [showBtn, setShowBtn] = useState<boolean>(true);

  useEffect(() => {
    fetchDronerById(dronerId);
    fetchProvince();
    // fetchDrone(1, 5, "ASC");
  }, []);
  const fetchDronerById = async (id: string) => {
    await DronerDatasource.getDronerByID(id).then((res) => {
      setData(res);
      setDronerDrone(res.dronerDrone);
      setAddress(res.address);
      fetchDistrict(res.address.provinceId);
      fetchSubDistrict(res.address.districtId);
    });
  };
  const fetchProvince = async () => {
    await LocationDatasource.getProvince()
      .then((res) => {
        setProvince(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchDistrict = async (provinceId: number) => {
    await LocationDatasource.getDistrict(provinceId)
      .then((res) => {
        setDistrict(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchSubDistrict = async (districtId: number) => {
    await LocationDatasource.getSubdistrict(districtId)
      .then((res) => {
        setSubdistrict(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnChange = (e: any) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
  };
  const handleChangestatus = (e: any) => {
    const m = Map(data).set("status", e.target.value);
    setData(m.toJS());
  };
  const handleExpPlant = (e: any) => {
    const m = Map(data).set("expPlant", e);
    setData(m.toJS());
  };
  const handleProvince = async (provinceId: number) => {
    const m = Map(address).set("provinceId", provinceId);
    setAddress(m.toJS());
    saveAdd(m.toJS());
    await LocationDatasource.getDistrict(provinceId)
      .then((res) => {
        setDistrict(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDistrict = async (districtId: number) => {
    const m = Map(address).set("districtId", districtId);
    setAddress(m.toJS());
    saveAdd(m.toJS());
    await LocationDatasource.getSubdistrict(districtId)
      .then((res) => {
        setSubdistrict(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubDistrict = async (subdistrictId: number) => {
    const m = Map(address).set("subdistrictId", subdistrictId);
    setAddress(m.toJS());
    saveAdd(m.toJS());
    await handelPostCode(m.toJS());
  };
  const handelPostCode = (add: AddressEntity) => {
    let filterSubDistrict = subdistrict.filter(
      (item) => item.subdistrictId == add.subdistrictId
    )[0].postcode;
    const m = Map(add).set("postcode", filterSubDistrict);
    setAddress(m.toJS());
    saveAdd(m.toJS());
  };
  const handleBrandId = async (brand: string) => {
    const m = Map(dronerDrone).set("brand", brand);
    setDronerDrone(m.toJS());
  };
  const handleSeries = async (brand: string) => {
    const m = Map(dronerDrone).set("brand", brand);
    setDronerDrone(m.toJS());
  };
  const handleSerialNo = async (e: any) => {
    const m = Map(dronerDrone).set(e.target.id, e.target.value);
    setDronerDrone(m.toJS());
  };
  const saveAdd = (add: AddressEntity) => {
    const m = Map(data).set("address", add);
    setData(m.toJS());
  };
  const updateDroner = () => {
    const m = Map(data).set("address", address);
    setData(m.toJS());
    DronerDatasource.updateDroner(m.toJS())
      .then((res) => {
        if (res.id) {
          Swal.fire({
            title: "บันทึกสำเร็จ",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then((time) => {
            window.location.href = "/IndexDroner";
          });
        }
      })
      .catch((err) => console.log(err));
  };
  // const fetchDrone = async (
  //   page: number,
  //   take: number,
  //   search?: string
  // ) => {
  //   await DroneDatasource.getDroneList(page, take, search).then(
  //     (res) => {
  //       setBrandId(res.data);
  //     }
  //   );
  // };
  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const saveModal = () => {
    //  const m = Map(data).set("dronerDrone", dronerDrone);
    //  setData(m.toJS());

    //  DroneDatasource.UpdateDroneList(m.toJS())
    //  .then((res) => {
    //   setModal(false);
    //   console.log(res)
    // })
    // .catch((err) => console.log(err));
  };
  const inputLandInModal = (
    <Form>
      <div className="form-group">
        <label>
          ยี่ห้อโดรนฉีดพ่น <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item name="brand">
          <Select
            onChange={handleBrandId}
            placeholder="เลือกยี่ห้อโดรนฉีดพ่น"
            defaultValue={dronerDrone.droneBrandId}
          >
            {brandId.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.brand}
              </option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <label>
          รุ่น <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item name="series">
          <Select onChange={handleSeries} placeholder="เลือกรุ่นโดรน">
            {brandId.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.series}
              </option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="form-group">
        <label>
          เลขตัวถัง <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item
          name="serialNo"
          rules={[
            {
              required: true,
              message: "กรุณากรอกเลขตัวถัง!",
            },
          ]}
        >
          <Input placeholder="กรอกเลขตัวถัง" onChange={handleSerialNo} />
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
    </Form>
  );
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
              <Form.Item name="id">
                <Input
                disabled
                  defaultValue={data.id}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ชื่อ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ!",
                  },
                ]}
              >
                <Input
                  placeholder=""
                  defaultValue={data.firstname}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                นามสกุล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล!",
                  },
                ]}
              >
                <Input
                  placeholder=""
                  defaultValue={data.lastname}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>เบอร์โทร</label>
              <Form.Item
                name="telephoneNo"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทร!",
                  },
                ]}
              >
                <Input
                  placeholder=""
                  defaultValue={data.telephoneNo}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>รหัสบัตรประชาชน</label>
              <Form.Item
                name="idNo"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสบัตรประชาชน!",
                  },
                ]}
              >
                <Input
                  placeholder=""
                  defaultValue={data.idNo}
                  onChange={handleOnChange}
                />
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
                name="province"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกจังหวัด!",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  placeholder="เลือกจังหวัด"
                  onChange={handleProvince}
                  defaultValue={address.provinceId}
                >
                  {province.map((item: any, index: any) => (
                    <option key={index} value={item.provinceId}>
                      {item.region}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="district"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกอำเภอ!",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  placeholder="เลือกอำเภอ"
                  onChange={handleDistrict}
                  defaultValue={address.districtId}
                >
                  {district.map((item: any, index: any) => (
                    <option key={index} value={item.districtId}>
                      {item.districtName}
                    </option>
                  ))}
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
                name="subdistrict"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกตำบล!",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  placeholder="เลือกตำบล"
                  onChange={handleSubDistrict}
                  defaultValue={address.subdistrictId}
                >
                  {subdistrict.map((item: any, index: any) => (
                    <option key={index} value={item.subdistrictId}>
                      {item.subdistrictName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสไปรษณีย์
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="postcode"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกรหัสไปรษณีย์!",
                  },
                ]}
              >
                <Input
                  name="postcode"
                  placeholder="กรอกรหัสไปรษณีย์"
                  defaultValue={address.postcode}
                  key={address.subdistrictId}
                  
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                ที่อยู่บ้าน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่บ้าน!",
                  },
                ]}
              >
                <TextArea
                  onChange={handleOnChange}
                  className="col-lg-12"
                  rows={5}
                  placeholder=""
                  defaultValue={data.address.address1}
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
                name="dronerArea"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกพื้นที่ให้บริการ!",
                  },
                ]}
              >
                <Input
                  placeholder=""
                  onChange={handleOnChange}
                  defaultValue={data.dronerArea}
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
                <Input
                  type="number"
                  placeholder="ปี"
                  onChange={handleOnChange}
                  defaultValue={data.expYear}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label></label>
              <Form.Item name="expMonth">
                <Input
                  type="number"
                  placeholder="เดือน"
                  defaultValue={data.expMonth}
                  onChange={handleOnChange}
                />
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

            <Checkbox.Group
              onChange={handleExpPlant}
              options={EXP_PLANT}
              style={{ width: "100%" }}
              defaultValue={data.expPlant}
            >
              <Row>
                {EXP_PLANT.map((item) => (
                  <Col span={8}>
                    <Checkbox value={item}>{item}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
          <div className="form-group col-lg-6">
            <Form.Item name="plantOther">
              <Input placeholder="พืชอื่นๆ" onChange={handleExpPlant} />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group">
              <label style={{ marginBottom: "10px" }}>
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสถานะ!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue={data.status}
                  onChange={handleChangestatus}
                >
                  <Space direction="vertical">
                    <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                    <Radio value={"PENDING"}>รอยืนยันตัวตน</Radio>
                    <Radio value={"INACTIVE"}>ปิดการใช้งาน</Radio>
                    <Radio value={"REJECTED"}>ไม่อนุมัติ</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const colorStatus = (status: string) => {
    if (status == "ACTIVE") {
      return "text-success ";
    } else if (status == "PENDING") {
      return "text-warning ";
    } else if (status == "INACTIVE") {
      return "text-muted ";
    } else if (status == "REJECTED") {
      return "text-danger ";
    } else {
      return "text-muted ";
    }
  };
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
          textHeader="แก้ไขข้อมูลโดรนเกษตร"
          closeModal={closeModal}
          data={inputLandInModal}
          backButton={closeModal}
          saveButton={saveModal}
        />
        <Form>
          {dronerDrone != null ? (
            <div className="container">
              {brandId.map((item: any, index: any) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-6">
                    <span key={index}>{item.brand}</span>
                  </div>
                  <div className="col-lg-3">
                    <span className={colorStatus(item.status)}>
                      <Badge color={colorStatus(item.status)} />
                      {item.status}
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
              <p>ยังไม่มีแปลงเกษตร</p>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
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
          <strong style={{ fontSize: "20px" }}>แก้ไขข้อมูลคนบินโดรน</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexDroner")}
        onClickSave={() => updateDroner()}
        // disableSaveBtn={showBtn}
      />
    </Layout>
  );
}
export default EditDroner;
