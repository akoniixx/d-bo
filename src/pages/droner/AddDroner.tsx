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
  Badge,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackButton, BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import {
  PictureFilled,
  SearchOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import emptyDrone from "../../resource/media/empties/icon_drone.png";
import color from "../../resource/color";
import { ModalPage } from "../../components/modal/ModalPage";
import { CardHeader } from "../../components/header/CardHearder";
import { useLocalStorage } from "../../hook/useLocalStorage";
import Swal from "sweetalert2";
import {
  CreateDronerEntity,
  CreateDronerEntity_INIT,
  DronerEntity,
  DronerEntity_INIT,
} from "../../entities/DronerEntities";
import {
  FullAddressEntity,
  FullAddressEntiry_INIT,
  CreateAddressEntity,
  CreateAddressEntity_INIT,
} from "../../entities/AddressEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import FooterPage from "../../components/footer/FooterPage";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import {
  CreateDroneEntity_INIT,
  DroneEntity,
  DroneEntity_INIT,
} from "../../entities/DroneEntities";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import ActionButton from "../../components/button/ActionButton";
import {
  DRONER_DRONE_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import {
  CreateDronerDrone,
  CreateDronerDrone_INIT,
  DronerDroneEntity,
} from "../../entities/DronerDroneEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import {
  DRONER_STATUS,
  DRONER_STATUS_MAPPING,
} from "../../definitions/DronerStatus";
import { Console } from "console";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import ModalDrone from "../../components/modal/ModalDronerDrone";

const _ = require("lodash");
const { Map } = require("immutable");
function AddDroner() {
  const [data, setData] = useState<CreateDronerEntity>(CreateDronerEntity_INIT);
  const [address, setAddress] = useState<FullAddressEntity>(
    FullAddressEntiry_INIT
  );
  const [dronerDroneList, setDronerDroneList] = useState<CreateDronerDrone[]>(
    []
  );
  const [droneList, setDroneList] = useState<DroneEntity[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editDrone, setEditDrone] = useState<CreateDronerDrone>(
    CreateDronerDrone_INIT
  );
  const [province, setProvince] = useState<ProviceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([]);

  useEffect(() => {
    fetchDrone(1, 500);
    fetchProvince();
    insertDroner();
  }, []);

  const fetchDrone = async (page: number, take: number, search?: string) => {
    await DroneDatasource.getDroneList(page, take, search).then((res) => {
      setDroneList(res.data);
    });
  };

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
  };
  const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(address).set(e.target.id, e.target.value);
    setAddress(m.toJS());
  };
  const handleProvince = async (provinceId: number) => {
    const m = Map(address).set("provinceId", provinceId);
    setAddress(m.toJS());
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res);
    });
  };
  const handleDistrict = async (districtId: number) => {
    const m = Map(address).set("districtId", districtId);
    setAddress(m.toJS());
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res);
    });
  };
  const handleSubDistrict = async (subdistrictId: number) => {
    const m = Map(address).set("subdistrictId", subdistrictId);
    setAddress(m.toJS());
    await handelPostCode(m.toJS());
  };
  const handelPostCode = (add: FullAddressEntity) => {
    let filterSubDistrict = subdistrict.filter(
      (item) => item.subdistrictId == add.subdistrictId
    )[0].postcode;
    const m = Map(add).set("postcode", filterSubDistrict);
    setAddress(m.toJS());
  };

  const handleExpPlant = (e: any) => {
    const m = Map(data).set("expPlant", e);
    setData(m.toJS());
  };
  const insertDroneList = (data: CreateDronerDrone) => {
    console.log(data);
    if (data.modalDroneIndex == 0) {
      const pushId = Map(data).set(
        "modalDroneIndex",
        dronerDroneList.length + 1
      );
      setDronerDroneList([...dronerDroneList, pushId.toJS()]);
    } else {
      const m = dronerDroneList.filter(
        (x) => x.modalDroneIndex != data.modalDroneIndex
      );
      setDronerDroneList([...m, data]);
    }
    setShowAddModal(false);
    setShowEditModal(false);
    setEditIndex(0);
  };
  const editDroneList = (data: CreateDronerDrone, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditDrone(data);
    setEditIndex(index);
  };
  const uploadButton = (
    <div>
      <PictureFilled style={{ fontSize: "50px", color: color.Success }} />
      <div style={{ fontSize: "20px", color: color.Success }}>+ Upload</div>
    </div>
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
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อ"
                  value={data?.firstname}
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
                  placeholder="กรอกนามสกุล"
                  value={data?.lastname}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                เบอร์โทร <span style={{ color: "red" }}>*</span>
              </label>
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
                  placeholder="กรอกเบอร์โทร"
                  value={data?.telephoneNo}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสบัตรประชาชน <span style={{ color: "red" }}>*</span>
              </label>
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
                  placeholder="กรอกบัตรประชาชน"
                  value={data?.idNo}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>
                รูปถ่ายผู้สมัครคู่กับบัตรประชาชน
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
                  value={address?.provinceId}
                  placeholder="เลือกจังหวัด"
                  onChange={handleProvince}
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
                อำเภอ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="district">
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
                  value={address?.districtId}
                  placeholder="เลือกอำเภอ"
                  onChange={handleDistrict}
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
                ตำบล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="Subdistrict">
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
                  value={address?.subdistrictId}
                  placeholder="เลือกตำบล"
                  onChange={handleSubDistrict}
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
                รหัสไปรษณีย์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="postcode">
                <Input
                  name="postcode"
                  placeholder="กรอกรหัสไปรษณีย์"
                  defaultValue={address?.postcode}
                  key={address.subdistrictId}
                  disabled
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
                name="address1"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่บ้าน!",
                  },
                ]}
              >
                <TextArea
                  value={data?.address.address1}
                  className="col-lg-12"
                  rows={5}
                  placeholder="กรอกที่อยู่บ้าน (เลขที่บ้าน, หมู่บ้าน, ชื่ออาคาร/ตึก, ซอย)"
                  onChange={handleAddress}
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
                // value={data?.dronerArea}
                placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
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
          </div>
          <div className="form-group col-lg-6">
            <Form.Item name="plantOther">
              <Input placeholder="พืชอื่นๆ" />
            </Form.Item>
          </div>
          <div className="form-group ">
            <Form.List name="plantOther">
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
                          value={data?.expPlant}
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
  const getSeriesDrone = (id: string) => {
    return droneList.filter((x) => x.id == id)[0].series;
  };
  // const getDroneBrand = (id: string) => {
  //   return droneList.filter((x) => x.id == id)[0].droneBrand.name;
  // };

  const insertDroner = async () => {
    const pushAdd = Map(data).set("address", address);
    setData(pushAdd.toJS());
    const pushDroneList = Map(pushAdd.toJS()).set(
      "dronerDrone",
      dronerDroneList
    );
    setData(pushDroneList.toJS());
    // await DronerDatasource.createDronerList(pushDroneList.toJS()).then(
    //   (res) => {
    //     if (res) {
    //       Swal.fire({
    //         title: "บันทึกสำเร็จ",
    //         icon: "success",
    //         timer: 1500,
    //         showConfirmButton: false,
    //       }).then((time) => {
    //         window.location.href = "/IndexDroner";
    //       });
    //     }
    //   }
    // );
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
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            เพิ่มโดรน
          </Button>
        </div>
        {dronerDroneList?.length != 0 ? (
          <Form>
            {dronerDroneList.map((item, index) => (
              <div
                className="container"
                style={{ padding: "10px", fontSize: "13px" }}
              >
                <div className="row d-flex">
                  <div className="col-lg-2">
                    <img
                      src={item.logoImagePath}
                      width={"25px"}
                      height={"25px"}
                    />
                  </div>
                  <div className="col-lg-4">
                    <span style={{ fontSize: "12px" }}>
                      {item.droneName}
                      <br />
                      {getSeriesDrone(item.droneId)}
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <span style={{ color: STATUS_COLOR[item.status] }}>
                      <Badge color={STATUS_COLOR[item.status]} />
                      {DRONER_DRONE_STATUS[item.status]}
                      <br />
                    </span>
                  </div>
                  <div className="col">
                    <ActionButton
                      icon={<EditOutlined />}
                      color={color.primary1}
                      onClick={() => editDroneList(item, index + 1)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Form>
        ) : (
          <Form>
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData}></img>
              <p>ยังไม่มีแปลงเกษตร</p>
            </div>
          </Form>
        )}
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {dronerDroneList.length} รายการ</p>
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
        onClickSave={insertDroner}
      />
      {showAddModal && (
        <ModalDrone
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={insertDroneList}
          data={CreateDronerDrone_INIT}
          editIndex={editIndex}
        />
      )}
      {showEditModal && (
        <ModalDrone
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={insertDroneList}
          data={editDrone}
          editIndex={editIndex}
        />
      )}
    </Layout>
  );
}

export default AddDroner;
