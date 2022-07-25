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
  Tag,
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
} from "../../entities/DronerEntities";
import {
  CreateAddressEntity,
  CreateAddressEntity_INIT,
} from "../../entities/AddressEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import FooterPage from "../../components/footer/FooterPage";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import { DroneEntity } from "../../entities/DroneEntities";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import ActionButton from "../../components/button/ActionButton";
import {
  DRONER_DRONE_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from "../../entities/LocationEntities";
import ModalDrone from "../../components/modal/ModalDronerDrone";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
} from "../../entities/DronerDroneEntities";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import img_empty from "../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";

const _ = require("lodash");
const { Map } = require("immutable");
function AddDroner() {
  const [data, setData] = useState<CreateDronerEntity>(CreateDronerEntity_INIT);
  const [address, setAddress] = useState<CreateAddressEntity>(
    CreateAddressEntity_INIT
  );
  const [dronerDroneList, setDronerDroneList] = useState<DronerDroneEntity[]>(
    []
  );
  const [droneList, setDroneList] = useState<DroneEntity[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editDrone, setEditDrone] = useState<DronerDroneEntity>(
    DronerDroneEntity_INIT
  );
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [province, setProvince] = useState<ProviceEntity[]>([
    ProvinceEntity_INIT,
  ]);
  const [district, setDistrict] = useState<DistrictEntity[]>([
    DistrictEntity_INIT,
  ]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([
    SubdistrictEntity_INIT,
  ]);

  const [imgProfile, setImgProfile] = useState<any>();
  const [imgIdCard, setImgIdCard] = useState<any>();

  const [createImgProfile, setCreateImgProfile] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [createImgIdCard, setCreateImgIdCrad] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  useEffect(() => {
    fetchProvince();
    insertDroner();
  }, []);

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(address).set(e.target.id, e.target.value);
    setAddress(m.toJS());
    checkValidateAddr(m.toJS());
  };
  const handleOnChangeProvince = async (provinceId: number) => {
    await getProvince(provinceId, CreateAddressEntity_INIT);
  };
  const getProvince = async (provinceId: number, addr: CreateAddressEntity) => {
    const d = Map(addr).set("provinceId", provinceId);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res);
    });
  };
  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set("districtId", districtId);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res);
    });
  };
  const handleOnChangeSubdistrict = async (subdistrictId: number) => {
    const d = Map(address).set("subdistrictId", subdistrictId);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await handleOnChangePostcode(d.toJS());
  };
  const handleOnChangePostcode = (addr: CreateAddressEntity) => {
    let getPostcode = subdistrict.filter(
      (x) => x.subdistrictId == addr.subdistrictId
    )[0].postcode;
    const c = Map(addr).set("postcode", getPostcode);
    setAddress(c.toJS());
    checkValidateAddr(c.toJS());
  };
  const handleExpPlant = (e: any) => {
    console.log(e);
    const m = Map(data).set("expPlant", [...data.expPlant, e[0]]);
    setData(m.toJS());
  };
  // const handlePlantOther = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const m = Map(data).set(e.target.id, e.target.value);
  //   setData(m.toJS());
  // };

  const handlePlantOther = (e: React.ChangeEvent<HTMLInputElement>) => {
    let m = e.target.value.split(",");
    var i = 0;
    let d: any = {};
    console.log(m);
    for (i; m.length > i; i++) {
      d = Map(data).set("expPlant", [...data.expPlant, m[i]]);
      setData(d.toJS());
    }
    console.log(d.toJS());
  };

  const insertDroneList = (data: DronerDroneEntity) => {
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
  const editDroneList = (data: DronerDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditDrone(data);
    setEditIndex(index);
  };
  const getSeriesDrone = (id: string) => {
    return droneList.filter((x) => x.id == id)[0].series;
  };
  const getDroneBrand = (id: string) => {
    return droneList.filter((x) => x.id == id)[0].droneBrand.name;
  };
  const checkValidate = (data: CreateDronerEntity) => {
    if (
      data.firstname != "" &&
      data.lastname != "" &&
      data.telephoneNo != "" &&
      data.idNo != "" &&
      address.provinceId != 0 &&
      address.districtId != 0 &&
      address.subdistrictId != 0 &&
      address.address1 != ""
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const checkValidateAddr = (addr: CreateAddressEntity) => {
    if (
      addr.provinceId != 0 &&
      addr.subdistrictId != 0 &&
      addr.districtId != 0 &&
      addr.postcode != "" &&
      addr.address1 != "" &&
      data.firstname != "" &&
      data.lastname != "" &&
      data.telephoneNo != "" &&
      data.idNo != ""
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onChangeProfile = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgProfile(src);
    checkValidate(data);
    const d = Map(createImgProfile).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "PROFILE_IMAGE");
    setCreateImgProfile(f.toJS());
  };
  const onPreviewProfile = async () => {
    let src = imgProfile;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgProfile);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImgProfile = () => {
    setImgProfile(undefined);
    checkValidate(data);
  };

  const onChangeIdCard = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgIdCard(src);
    checkValidate(data);
    const d = Map(createImgIdCard).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "ID_CARD_IMAGE");
    setCreateImgIdCrad(f.toJS());
  };
  const onPreviewIdCard = async () => {
    let src = imgIdCard;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgIdCard);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImgIdCard = () => {
    setImgIdCard(undefined);
    checkValidate(data);
  };
  const insertDroner = async () => {
    const pushAdd = Map(data).set("address", address);
    setData(pushAdd.toJS());
    const pushDroneList = Map(pushAdd.toJS()).set(
      "dronerDrone",
      dronerDroneList
    );
    setData(pushDroneList.toJS());
    console.log(pushDroneList.toJS());
    // await DronerDatasource.createDronerList(pushDroneList.toJS()).then(
    //   (res) => {
    //     if (res != null) {
    //       const pushImgProId = Map(createImgProfile).set("resourceId", res);
    //       const pushImgCardId = Map(createImgIdCard).set("resourceId", res);
    //       var i = 0;
    //       for (i; 2 > i; i++) {
    //         i == 0 &&
    //           UploadImageDatasouce.uploadImage(pushImgProId.toJS()).then(res);
    //         i == 1 &&
    //           UploadImageDatasouce.uploadImage(pushImgCardId.toJS()).then(res);
    //       }
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
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group text-center pb-5">
              <div
                className="hiddenFileInput"
                style={{
                  backgroundImage: `url(${
                    imgProfile == undefined ? img_empty : imgProfile
                  })`,
                }}
              >
                <input
                  type="file"
                  onChange={onChangeProfile}
                  title="เลือกรูป"
                />
              </div>
              <div>
                {imgProfile != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewProfile}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImgProfile}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
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
                <span style={{ color: "red" }}>*</span>
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
              <Form.Item name="provinceId">
                <Select
                  allowClear
                  showSearch
                  placeholder="เลือกจังหวัด"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeProvince}
                  key={address.provinceId}
                >
                  {province?.map((item) => (
                    <option value={item.provinceId}>{item.region}</option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="districtId">
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
                  allowClear
                  onChange={handleOnChangeDistrict}
                >
                  {district?.map((item) => (
                    <option value={item.districtId}>{item.districtName}</option>
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
              <Form.Item name="subdistrictId">
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
                  allowClear
                  onChange={handleOnChangeSubdistrict}
                >
                  {subdistrict?.map((item) => (
                    <option value={item.subdistrictId}>
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
          <div className="form-group">
            <label>หรือ</label>
            <Form.Item
              name="areaDrone"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกข้อมูล Url Google Map",
                },
              ]}
            >
              <Input
                // value={data?.dronerArea}
                placeholder="กรอกข้อมูล Url Google Map"
              />
            </Form.Item>
          </div>
          <div className="row ">
            <div className="form-group col-lg-6">
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
                style={{ width: "220px" }}
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
            <label></label>
            <Form.Item name="otherPlant">
              {/* {mapPlant.map((item) => (
                    <Col span={8}>
                      <Input value={item}>{item}</Input>
                    </Col>
                  ))} */}
              <Input
                onBlur={handlePlantOther}
                placeholder="พืชอื่นๆ เช่น ส้ม มะละกอ มะพร้าว"
              />
            </Form.Item>
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
                      {item.serialNo}
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
              <p>ยังไม่มีข้อมูลโดรนเกษตร</p>
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
        // disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalDrone
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={insertDroneList}
          data={DronerDroneEntity_INIT}
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
