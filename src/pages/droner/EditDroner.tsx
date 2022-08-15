import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Radio,
  Space,
  Badge,
  Tag,
} from "antd";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import Swal from "sweetalert2";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { EXP_PLANT, EXP_PLANT_CHECKBOX } from "../../definitions/ExpPlant";
import ActionButton from "../../components/button/ActionButton";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../entities/AddressEntities";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
} from "../../entities/DronerDroneEntities";
import ModalDrone from "../../components/modal/ModalDronerDrone";
import {
  DRONER_DRONE_STATUS,
  DRONER_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import {
  ImageEntity,
  ImageEntity_INTI,
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import "../farmer/Style.css";
import uploadImg from "../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import GoogleMap from "../../components/map/GoogleMap";
import {
  DronerAreaEntity,
  DronerAreaEntity_INIT,
} from "../../entities/DronerAreaEntities";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";

const { Option } = Select;
const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroner() {
  const dronerId = queryString[1];
  const [data, setData] = useState<DronerEntity>(DronerEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT);
  const [dronerArea, setDronerArea] = useState<DronerAreaEntity>(
    DronerAreaEntity_INIT
  );
  const [dronerDroneList, setDronerDroneList] = useState<DronerDroneEntity[]>([
    DronerDroneEntity_INIT,
  ]);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editDroneList, setEditDroneList] = useState<DronerDroneEntity>(
    DronerDroneEntity_INIT
  );
  const [province, setProvince] = useState<ProviceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([]);
  const [imgProfile, setImgProfile] = useState<any>();
  const [imgIdCard, setImgIdCard] = useState<any>();
  const [createImgProfile, setCreateImgProfile] =
    useState<ImageEntity>(ImageEntity_INTI);
  const [createImgIdCard, setCreateImgIdCrad] =
    useState<ImageEntity>(ImageEntity_INTI);
  let imgList: (string | boolean)[] = [];
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const [location, setLocation] = useState<SubdistrictEntity[]>([]);
  const [searchLocation] = useState("");
  const [validateComma, setValidateComma] = useState<any>("");
  let [otherPlant, setOtherPlant] = useState<any>();
  const [imgDroneList] = useState<UploadImageEntity[]>([
    UploadImageEntity_INTI,
  ]);

  useEffect(() => {
    fetchDronerById();
    fetchLocation(searchLocation);
  }, [searchLocation]);

  const fetchDronerById = async () => {
    await DronerDatasource.getDronerByID(dronerId).then((res) => {
      console.log("get", res);
      setData(res);
      setMapPosition({
        lat: parseFloat(res.dronerArea.lat),
        lng: parseFloat(res.dronerArea.long),
      });
      setAddress(res.address);
      setDronerDroneList(res.dronerDrone);
      let getPathPro = res.file.filter((x) => x.category == "PROFILE_IMAGE");
      let getPathCard = res.file.filter((x) => x.category == "ID_CARD_IMAGE");
      imgList.push(
        getPathPro.length >= 1 ? getPathPro[0].path : "",
        getPathCard.length >= 1 ? getPathCard[0].path : ""
      );
      var i = 0;
      for (i; imgList.length > i; i++) {
        i == 0 &&
          UploadImageDatasouce.getImage(imgList[i].toString()).then(
            (resImg) => {
              setImgProfile(resImg.url);
            }
          );
        i == 1 &&
          UploadImageDatasouce.getImage(imgList[i].toString()).then(
            (resImg) => {
              setImgIdCard(resImg.url);
            }
          );
      }
    });
  };
  const fetchLocation = async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res);
    });
  };

  useEffect(() => {
    LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
    LocationDatasource.getDistrict(address.provinceId).then((res) => {
      setDistrict(res);
    });
    LocationDatasource.getSubdistrict(address.districtId).then((res) => {
      setSubdistrict(res);
    });
  }, [address.provinceId, address.districtId]);

  //#region data droner
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  const handleChangeStatus = (e: any) => {
    const m = Map(data).set("status", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };

  const handleExpPlant = (e: any) => {
    let checked = e.target.checked;
    let value = e.target.value;
    EXP_PLANT_CHECKBOX.map((item) =>
      _.set(
        item,
        "isChecked",
        item.plantName == value ? checked : item.isChecked
      )
    );
    let p: any = "";
    if (checked) {
      p = Map(data).set(
        "expPlant",
        [...data.expPlant, value].filter((x) => x != "")
      );
    } else {
      let removePlant = data.expPlant.filter((x) => x != value);
      p = Map(data).set("expPlant", removePlant);
    }
    setData(p.toJS());
    checkValidate(data);
  };

  const handlePlantOther = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length != 0) {
      setOtherPlant(e.target.value);
      const checkComma = checkValidateComma(e.target.value);
      if (!checkComma) {
        setValidateComma("");
        setBtnSaveDisable(checkComma);
      } else {
        setValidateComma("error");
        setBtnSaveDisable(checkComma);
      }
    } else {
      setValidateComma("");
      setBtnSaveDisable(true);
    }
  };

  const handleProvince = async (provinceId: number) => {
    const d = Map(address).set("provinceId", provinceId);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };
  const handleDistrict = async (districtId: number) => {
    const d = Map(address).set("districtId", districtId);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };
  const handleSubDistrict = async (subdistrictId: number) => {
    const d = Map(address).set("subdistrictId", subdistrictId);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await handelPostCode(d.toJS());
  };
  const handelPostCode = (add: AddressEntity) => {
    let filterSubDistrict = subdistrict.filter(
      (item) => item.subdistrictId == add.subdistrictId
    )[0].postcode;
    const m = Map(add).set("postcode", filterSubDistrict);
    setAddress(m.toJS());
    checkValidateAddr(m.toJS());
  };
  const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(address).set("address1", e.target.value);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };
  //#endregion

  //#region map
  const handleSearchLocation = async (value: any) => {
    if (value != undefined) {
      const a = location.filter((x) => x.subdistrictId == value)[0];
      const pushProvince = Map(dronerArea).set("provinceId", a.provinceId);
      const pushDistric = Map(pushProvince.toJS()).set(
        "districtId",
        a.districtId
      );
      const pushSubDis = Map(pushDistric.toJS()).set(
        "subdistrictId",
        a.subdistrictId
      );
      const pushLat = Map(pushSubDis.toJS()).set("lat", a.lat);
      const pushLong = Map(pushLat.toJS()).set("long", a.long);
      setDronerArea(pushLong.toJS());
      setMapPosition({
        lat: a.lat != null ? parseFloat(a.lat) : 0,
        lng: a.long != null ? parseFloat(a.long) : 0,
      });
      checkValidate(pushLong.toJS());
    } else {
      setMapPosition(LAT_LNG_BANGKOK);
    }
  };
  const handleOnChangeUrl = (value: any) => {
    const m = Map(dronerArea).set("mapUrl", value.target.value);
    setDronerArea(m.toJS());
    checkValidate(m.toJS());
  };
  const handleOnChangeLat = (value: any) => {
    const m = Map(dronerArea).set("lat", value.target.value);
    setDronerArea(m.toJS());
    checkValidate(m.toJS());
    setMapPosition((prev) => ({
      lat: parseFloat(value.target.value),
      lng: prev.lng,
    }));
  };
  const handleOnChangeLng = (value: any) => {
    const m = Map(dronerArea).set("long", value.target.value);
    setDronerArea(m.toJS());
    checkValidate(m.toJS());
    setMapPosition((prev) => ({
      lat: prev.lat,
      lng: parseFloat(value.target.value),
    }));
  };
  //#endregion

  //#region modal drone
  const editDroner = (data: DronerDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditDroneList(data);
  };
  const updateDrone = (data: DronerDroneEntity) => {
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
  const removeDrone = (index: number) => {
    const newData = dronerDroneList.filter((x) => x.modalDroneIndex != index);
    setDronerDroneList(newData);
  };
  //#endregion

  //#region img
  const onChangeProfile = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgProfile(src);
    const d = Map(createImgProfile).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "PROFILE_IMAGE");
    const g = Map(f.toJS()).set("resourceId", dronerId);
    setCreateImgProfile(g.toJS());
    checkValidate(g.toJS());
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
  const removeImg = () => {
    const getImg = data.file.filter((x) => x.category == "PROFILE_IMAGE")[0];
    if (getImg != undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then(
        (res) => {}
      );
    }
    setCreateImgProfile(ImageEntity_INTI);
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
    const d = Map(createImgIdCard).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "ID_CARD_IMAGE");
    const g = Map(f.toJS()).set("resourceId", dronerId);
    setCreateImgIdCrad(g.toJS());
    checkValidate(data);
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
    const getImg = data.file.filter((x) => x.category == "ID_CARD_IMAGE")[0];
    if (getImg != undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then(
        (res) => {}
      );
    }
    setCreateImgIdCrad(ImageEntity_INTI);
    setImgIdCard(undefined);
    checkValidate(data);
  };
  //#endregion

  const checkValidate = (data: DronerEntity) => {
    let checkEmptySting = ![
      data.firstname,
      data.telephoneNo,
      data.idNo,
      address.address1,
      dronerArea.lat,
      dronerArea.long,
    ].includes("");
    let checkEmptyNumber = ![
      address.provinceId,
      address.districtId,
      address.subdistrictId,
    ].includes(0);
    let checkEmptyArray = ![data.expPlant].includes([""]);

    if (checkEmptySting && checkEmptyNumber && checkEmptyArray) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const checkValidateAddr = (addr: AddressEntity) => {
    let checkEmptySting = ![
      data.firstname,
      data.telephoneNo,
      data.idNo,
      address.address1,
      dronerArea.lat,
      dronerArea.long,
    ].includes("");
    let checkEmptyNumber = ![
      addr.provinceId,
      addr.districtId,
      addr.subdistrictId,
    ].includes(0);
    let checkEmptyArray = ![data.expPlant].includes([""]);

    if (checkEmptySting && checkEmptyNumber && checkEmptyArray) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes("*") ||
      data.includes("/") ||
      data.includes(" ") ||
      data.includes("-") ||
      data.includes("+");
    return data.trim().length != 0 ? (checkSyntax ? true : false) : true;
  };

  const updateDroner = async () => {
    let otherPlantList = [];
    if (otherPlant != undefined) {
      let m = otherPlant.split(",");
      for (let i = 0; m.length > i; i++) {
        otherPlantList.push(m[i]);
      }
    }
    data.expPlant.push.apply(
      data.expPlant,
      otherPlantList.filter((x) => x != "")
    );
    const pushAddr = Map(data).set("address", address);
    const pushDronerArea = Map(pushAddr.toJS()).set("dronerArea", dronerArea);
    const pushPin = Map(pushDronerArea.toJS()).set("pin", "");
    const setOtherPlant = Array.from(new Set(pushPin.toJS().expPlant)).filter(
      (x) => x != ""
    );
    const pushOtherPlant = Map(pushPin.toJS()).set("expPlant", setOtherPlant);
    const pushDroneList = Map(pushOtherPlant.toJS()).set(
      "dronerDrone",
      dronerDroneList
    );
    console.log(pushDroneList.toJS());
    await DronerDatasource.updateDroner(pushDroneList.toJS()).then((res) => {
      console.log("res", res);
      if (res != null) {
        for (i = 0; res.dronerDrone.length > i; i++) {
          let findId = res.dronerDrone[i];
          let getData = dronerDroneList.filter(
            (x) => x.serialNo == findId.serialNo
          )[0];

          for (let j = 0; getData.file.length > j; j++) {
            let getImg = getData.file[i];
            imgDroneList?.push({
              resourceId: res.dronerDrone[i].id,
              category: getImg.category,
              file: getImg.file,
              resource: getImg.resource,
              path: " ",
            });
          }
        }
        const checkImg = imgDroneList.filter((x) => x.resourceId != "");
        for (let k = 0; checkImg.length > k; k++) {
          let getDataImg: any = checkImg[k];
          console.log(getDataImg);
          UploadImageDatasouce.uploadImage(getDataImg).then(res);
        }
        var i = 0;
        for (i; 2 > i; i++) {
          console.log(createImgProfile);
          i == 0 &&
            UploadImageDatasouce.uploadImage(createImgProfile).then(res);
          i == 1 && UploadImageDatasouce.uploadImage(createImgIdCard).then(res);
        }
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

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลคนบินโดรน" />
        <Form>
          <div className="container text-center" style={{ padding: "30px" }}>
            <div className="form-group text-center">
              <div
                className="hiddenFileInput zoom"
                style={{
                  backgroundImage: `url(${
                    imgProfile == undefined ? uploadImg : imgProfile
                  })`,
                }}
              >
                <input
                  key={imgProfile}
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
                      onClick={removeImg}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
            </div>
          </div>
        </Form>
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Drone ID</label>
              <Form.Item name="id">
                <Input disabled defaultValue={data.id} />
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
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgIdCard})`,
                    display: imgIdCard != undefined ? "block" : "none",
                  }}
                ></div>
                <div className="text-left ps-4 pt-2">
                  {imgIdCard != undefined && (
                    <>
                      <Tag
                        color={color.Success}
                        onClick={onPreviewIdCard}
                        style={{ cursor: "pointer", borderRadius: "5px" }}
                      >
                        View
                      </Tag>
                      <Tag
                        color={color.Error}
                        onClick={removeImgIdCard}
                        style={{ cursor: "pointer", borderRadius: "5px" }}
                      >
                        Remove
                      </Tag>
                    </>
                  )}
                </div>
                <div
                  className="hiddenFileBtn"
                  style={{
                    backgroundImage: `url(${bth_img_empty})`,
                    display: imgIdCard == undefined ? "block" : "none",
                  }}
                >
                  <input
                    key={imgIdCard}
                    type="file"
                    onChange={onChangeIdCard}
                    title="เลือกรูป"
                  />
                </div>
              </div>
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
                      {item.provinceName}
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
                  {subdistrict?.map((item: any, index: any) => (
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
                name="address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่บ้าน!",
                  },
                ]}
              >
                <TextArea
                  onChange={handleAddress}
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
                <Select
                  allowClear
                  showSearch
                  placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
                  onChange={handleSearchLocation}
                  optionFilterProp="children"
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                >
                  {location.map((item: any, index: any) => (
                    <option key={index} value={item.subdistrictId}>
                      {item.subdistrictName +
                        "/" +
                        item.subdistrictName +
                        "/" +
                        item.provinceName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="form-group">
            <label>หรือ</label>
            <Form.Item name="url">
              <Input
                //defaultValue={dronerArea.mapUrl}
                placeholder="กรอกข้อมูล Url Google Map"
                onBlur={handleOnChangeUrl}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Latitude (ละติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกละติจูด!",
                  },
                ]}
                key={mapPosition.lat}
              >
                <Input
                  placeholder="กรอกข้อมูล Latitude"
                  defaultValue={mapPosition.lat}
                  onBlur={handleOnChangeLat}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>Longitude (ลองติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกลองติจูด!",
                  },
                ]}
                key={mapPosition.lng}
              >
                <Input
                  placeholder="กรอกข้อมูล Longitude"
                  defaultValue={mapPosition.lng}
                  onBlur={handleOnChangeLng}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </div>
          <GoogleMap
            width="100%"
            height="300px"
            zoom={17}
            lat={mapPosition.lat}
            lng={mapPosition.lng}
          />
          <div className="form-group col-lg-6">
            <label>
              พืชที่เคยฉีดพ่น{" "}
              <span style={{ color: color.Disable }}>
                (กรุณาเลือกอย่างน้อย 1 อย่าง)
              </span>
              <span style={{ color: "red" }}>*</span>
            </label>
            {EXP_PLANT_CHECKBOX.map((item) =>
              _.set(
                item,
                "isChecked",
                data?.expPlant.map((x) => x).find((y) => y === item.plantName)
                  ? true
                  : item.isChecked
              )
            ).map((x) => (
              <div>
                <input
                  key={x.key}
                  type="checkbox"
                  value={x.plantName}
                  onClick={handleExpPlant}
                  checked={x.isChecked}
                />{" "}
                <label>{x.plantName}</label>
                <br />
              </div>
            ))}
          </div>
          <div className="form-group col-lg-12">
            <label></label>
            <Form.Item>
              <Input
                status={validateComma}
                onChange={handlePlantOther}
                placeholder="กรอกข้อมูลพืชอื่นๆ เช่น ส้ม,มะขาม (กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง)"
                autoComplete="off"
                defaultValue={data.expPlant
                  .filter((a) => !EXP_PLANT.some((x) => x === a))
                  .join(",")}
              />
              {validateComma == "error" && (
                <p style={{ color: color.Error }}>
                  กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง
                </p>
              )}
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
                  onChange={handleChangeStatus}
                >
                  <Space direction="vertical">
                    {DRONER_STATUS.filter((x) => x.value != "").map((item) => (
                      <Radio value={item.value}>{item.name}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const renderDrone = (
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
        <Form>
          {dronerDroneList.length != 0 ? (
            <div className="container">
              {dronerDroneList.map((item, index) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-1">
                    <img
                      src={item.logoImagePath}
                      width={"25px"}
                      height={"25px"}
                    />
                  </div>
                  <div className="col-lg-5">
                    <h6>{item.droneName}</h6>
                    <p style={{ color: "#ccc" }}>{item.serialNo}</p>
                  </div>
                  <div className="col-lg-4">
                    <span style={{ color: STATUS_COLOR[item.status] }}>
                      <Badge color={STATUS_COLOR[item.status]} />
                      {DRONER_DRONE_STATUS[item.status]}
                      <br />
                    </span>
                  </div>
                  <div className="col-lg-2 d-flex justify-content-between">
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<EditOutlined />}
                        color={color.primary1}
                        onClick={() => editDroner(item, index)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<DeleteOutlined />}
                        color={color.Error}
                        onClick={() => removeDrone(index + 1)}
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
      <div className="d-flex justify-content-between pt-3">
        <p>รายการทั้งหมด {dronerDroneList.length} รายการ</p>
        {dronerDroneList.length < 10 ? null : (
          <Pagination defaultCurrent={1} total={1} />
        )}
        {dronerDroneList.length > 10 && (
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
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderFromData}
        {renderDrone}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexDroner")}
        onClickSave={updateDroner}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalDrone
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={updateDrone}
          data={DronerDroneEntity_INIT}
          editIndex={editIndex}
          title="เพิ่มโดรนเกษตร"
        />
      )}
      {showEditModal && (
        <ModalDrone
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={updateDrone}
          data={editDroneList}
          editIndex={editIndex}
          title="แก้ไขโดรนเกษตร"
        />
      )}
    </Layout>
  );
}
export default EditDroner;
