import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Badge,
  Tag,
  Avatar,
  DatePicker,
  Checkbox,
} from "antd";
import { CardContainer } from "../../../components/card/CardContainer";
import { BackIconButton } from "../../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import emptyData from "../../../resource/media/empties/tabler_drone.png";
import { EditOutlined } from "@ant-design/icons";
import color from "../../../resource/color";
import { CardHeader } from "../../../components/header/CardHearder";
import Swal from "sweetalert2";
import {
  CreateDronerEntity,
  CreateDronerEntity_INIT,
} from "../../../entities/DronerEntities";
import {
  CreateAddressEntity,
  CreateAddressEntity_INIT,
} from "../../../entities/AddressEntities";
import { LocationDatasource } from "../../../datasource/LocationDatasource";
import FooterPage from "../../../components/footer/FooterPage";
import { EXP_PLANT } from "../../../definitions/ExpPlant";
import ActionButton from "../../../components/button/ActionButton";
import {
  DRONER_DRONE_MAPPING,
  STATUS_COLOR,
} from "../../../definitions/DronerStatus";
import { DronerDatasource } from "../../../datasource/DronerDatasource";
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from "../../../entities/LocationEntities";
import ModalDrone from "../../../components/modal/ModalDronerDrone";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
} from "../../../entities/DronerDroneEntities";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../../datasource/UploadImageDatasource";
import img_empty from "../../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../../resource/media/empties/upload_Img_btn.png";
import {
  DronerAreaEntity,
  DronerAreaEntity_INIT,
} from "../../../entities/DronerAreaEntities";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import GoogleMap from "../../../components/map/GoogleMap";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";

const _ = require("lodash");
const { Map } = require("immutable");

function AddDroner() {
  const [form] = Form.useForm();

  const [data, setData] = useState<CreateDronerEntity>(
    CreateDronerEntity_INIT
  );
  const [address, setAddress] = useState<CreateAddressEntity>(
    CreateAddressEntity_INIT
  );
  const [dronerArea, setDronerArea] = useState<DronerAreaEntity>(
    DronerAreaEntity_INIT
  );
  const [dronerDroneList, setDronerDroneList] = useState<
    DronerDroneEntity[]
  >([]);
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
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>(
    [SubdistrictEntity_INIT]
  );

  const [imgProfile, setImgProfile] = useState<any>();
  const [imgIdCard, setImgIdCard] = useState<any>();
  const [imgDroneList] = useState<UploadImageEntity[]>([
    UploadImageEntity_INTI,
  ]);

  const [createImgProfile, setCreateImgProfile] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  const [createImgIdCard, setCreateImgIdCard] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  const [mapPosition, setMapPosition] = useState<{
    lat: number;
    lng: number;
  }>(LAT_LNG_BANGKOK);
  const [location, setLocation] = useState<SubdistrictEntity[]>([]);
  const [searchLocation] = useState("");
  const [validateComma, setValidateComma] = useState<any>("");
  let [otherPlant, setOtherPlant] = useState<any>();

  useEffect(() => {
    fetchProvince();
    fetchLocation(searchLocation);
  }, [searchLocation]);

  //#region data droner
  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };
  const fetchLocation = async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res);
    });
  };

  //#endregion

  //#region address

  const handleOnChangeProvince = async (provinceId: number) => {
    await getProvince(provinceId, CreateAddressEntity_INIT);
  };
  const getProvince = async (
    provinceId: number,
    addr: CreateAddressEntity
  ) => {
    const d = Map(addr).set("provinceId", provinceId);
    setAddress(d.toJS());
    checkValidate(data, d.toJS(), dronerArea);
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res);
    });
  };
  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set("districtId", districtId);
    setAddress(d.toJS());
    checkValidate(data, d.toJS(), dronerArea);
    await LocationDatasource.getSubdistrict(districtId).then(
      (res) => {
        setSubdistrict(res);
      }
    );
  };
  const handleOnChangeSubdistrict = async (subdistrictId: number) => {
    const d = Map(address).set("subdistrictId", subdistrictId);
    setAddress(d.toJS());
    checkValidate(data, d.toJS(), dronerArea);
    await handleOnChangePostcode(d.toJS());
  };
  const handleOnChangePostcode = (addr: CreateAddressEntity) => {
    let getPostcode = subdistrict.filter(
      (x) => x.subdistrictId == addr.subdistrictId
    )[0].postcode;
    const c = Map(addr).set("postcode", getPostcode);
    setAddress(c.toJS());
    form.setFieldsValue({
      postcode: c.toJS().postcode,
    });
    checkValidate(data, c.toJS(), dronerArea);
  };
  //#endregion

  //#region map
  const handleSearchLocation = async (value: any) => {
    if (!!value) {
      const a = location.filter((x) => x.subdistrictId == value)[0];
      const pushProvince = Map(dronerArea).set(
        "provinceId",
        a.provinceId
      );
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
      let locationName = "";
      let geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: parseFloat(pushLong.toJS().lat),
        lng: parseFloat(pushLong.toJS().long),
      };
      await geocoder
        .geocode({
          location: latlng,
          region: "th",
        })
        .then((res) => {
          let location = res.results[0].address_components;
          locationName =
            location[1].short_name +
            " " +
            location[2].short_name +
            " " +
            location[3].long_name;
        });
      const l = Map(pushLong.toJS()).set(
        "locationName",
        locationName
      );
      setDronerArea(l.toJS());
      setMapPosition({
        lat: a.lat != null ? parseFloat(a.lat) : 0,
        lng: a.long != null ? parseFloat(a.long) : 0,
      });
      if (!!a.lat && !!a.long) {
        form.setFieldsValue({
          latitude: a.lat,
          longitude: a.long,
        });
      }
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
    form.setFieldsValue({
      latitude: value.target.value,
    });
  };
  const handleOnChangeLng = (value: any) => {
    const m = Map(dronerArea).set("long", value.target.value);
    setDronerArea(m.toJS());
    checkValidate(m.toJS());
    setMapPosition((prev) => ({
      lat: prev.lat,
      lng: parseFloat(value.target.value),
    }));
    form.setFieldsValue({
      longitude: value.target.value,
    });
  };
  //#endregion

  //#region modal
  const editDroneList = (data: DronerDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditDrone(data);
    setEditIndex(index);
  };
  const insertDroneList = (data: DronerDroneEntity) => {
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
  //#endregion

  //#region Image
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
    setCreateImgProfile(f.toJS());
    setBtnSaveDisable(false);
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
    setCreateImgProfile(UploadImageEntity_INTI);
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
    setCreateImgIdCard(f.toJS());
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
    setCreateImgIdCard(UploadImageEntity_INTI);
    checkValidate(data);
  };
  //#endregion

  const checkValidate = (
    data?: CreateDronerEntity,
    addr?: CreateAddressEntity,
    area?: DronerAreaEntity,
    otherPlant?: any
  ) => {
    let checkEmptySting = ![
      data?.firstname,
      data?.lastname,
      data?.telephoneNo,
      addr?.address1,
      area?.lat,
      area?.long,
    ].includes("");
    let checkEmptyNumber = ![
      addr?.provinceId,
      addr?.districtId,
      addr?.subdistrictId,
    ].includes(0);
    let checkEmptyArray = false;
    if (data?.expPlant !== undefined) {
      checkEmptyArray =
        ![data?.expPlant][0]?.includes("") &&
        data?.expPlant.length !== 0 &&
        data?.expPlant !== undefined;
    }
    let checkEmptyOtherPlant =
      otherPlant != undefined && otherPlant != "";
    let checkEmptyDate =
      ![data?.birthDate].includes("1970-01-01") &&
      data?.birthDate &&
      data?.birthDate?.trim().length > 0
        ? true
        : false;
    if (
      checkEmptySting &&
      checkEmptyNumber &&
      checkEmptyDate &&
      (checkEmptyArray || checkEmptyOtherPlant)
    ) {
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
    return data.trim().length != 0
      ? checkSyntax
        ? true
        : false
      : true;
  };

  const insertDroner = async (values: any) => {
    let otherPlantList = [];
    if (otherPlant !== undefined) {
      let m = otherPlant.split(",");
      for (let i = 0; m.length > i; i++) {
        otherPlantList?.push(m[i]);
      }
    } else {
      otherPlantList?.push(otherPlant);
    }
    data.expPlant?.push.apply(
      data.expPlant,
      otherPlantList.filter((x) => x !== "")
    );
    const pushAdd = Map(data).set("address", address);
    const pushDronerArea = Map(pushAdd.toJS()).set(
      "dronerArea",
      dronerArea
    );
    const pushDroneList = Map(pushDronerArea.toJS()).set(
      "dronerDrone",
      dronerDroneList
    );
    data.dronerDrone?.push.apply(dronerDroneList);
    const setOtherPlant = Array.from(
      new Set(pushDroneList.toJS().expPlant)
    ).filter((x) => x !== "");
    const pushOtherPlant = Map(pushDroneList.toJS()).set(
      "expPlant",
      setOtherPlant
    );
    await DronerDatasource.createDronerList({
      ...pushOtherPlant.toJS(),
      ...values,
      birthDate: moment(values.birthDate).toISOString(),
    }).then(async (res) => {
      if (res !== undefined) {
        const pushImgProId = Map(createImgProfile).set(
          "resourceId",
          res.id
        );
        const pushImgCardId = Map(createImgIdCard).set(
          "resourceId",
          res.id
        );
        let i = 0;
        for (i; 2 > i; i++) {
          i === 0 &&
            UploadImageDatasouce.uploadImage(
              pushImgProId.toJS()
            ).then(res);
          i === 1 &&
            UploadImageDatasouce.uploadImage(
              pushImgCardId.toJS()
            ).then(res);
        }

        for (i = 0; res.dronerDrone.length > i; i++) {
          let findId = res.dronerDrone[i];
          let getData = dronerDroneList.filter(
            (x) => x.serialNo === findId.serialNo
          )[0];

          for (let j = 0; getData.file.length > j; j++) {
            let getImg = getData.file[j];
            imgDroneList?.push({
              resourceId: findId.id,
              category: getImg.category,
              file: getImg.file,
              resource: getImg.resource,
              path: "",
            });
          }
        }
        const checkImg = imgDroneList.filter(
          (x) => x.resourceId !== ""
        );
        for (let k = 0; checkImg.length > k; k++) {
          let getDataImg: any = checkImg[k];
          await UploadImageDatasouce.uploadImage(getDataImg).then(
            res
          );
        }
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/IndexDroner";
        });
      } else {
        Swal.fire({
          title: "เบอร์โทร หรือ รหัสบัตรประชาชน <br/> ซ้ำในระบบ",
          icon: "error",
          showConfirmButton: true,
        });
      }
    });
  };

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
        <Form
          style={{ padding: "32px" }}
          onFinish={insertDroner}
          form={form}>
          <div className="row">
            <div className="form-group text-center pb-5">
              <div
                className="hiddenFileInput"
                style={{
                  backgroundImage: `url(${
                    imgProfile === undefined ? img_empty : imgProfile
                  })`,
                }}>
                <input
                  key={imgProfile}
                  type="file"
                  onChange={onChangeProfile}
                  title="เลือกรูป"
                />
              </div>
              <div>
                {imgProfile !== undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewProfile}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImgProfile}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
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
                ]}>
                <Input placeholder="กรอกชื่อ" autoComplete="off" />
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
                ]}>
                <Input placeholder="กรอกนามสกุล" autoComplete="off" />
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
                ]}>
                <Input
                  placeholder="กรอกเบอร์โทร"
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                วันเดือนปีเกิด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="birthDate"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันเดือนปีเกิด",
                  },
                ]}>
                <DatePicker
                  placeholder="กรอกวันเดือนปีเกิด"
                  format={dateFormat}
                  disabledDate={(current) =>
                    current && current > moment().endOf("day")
                  }
                  className="col-lg-12"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>รหัสบัตรประชาชน</label>
              <Form.Item
                name="idNo"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสบัตรประชาชน",
                  },
                  {
                    min: 13,
                    message: "กรุณากรอกรหัสบัตรประชาชน 13 หลัก",
                  },
                ]}>
                <Input
                  placeholder="กรอกบัตรประชาชน"
                  maxLength={13}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 pb-5">
              <label>รูปถ่ายผู้สมัครคู่กับบัตรประชาชน</label>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgIdCard})`,
                    display:
                      imgIdCard !== undefined ? "block" : "none",
                  }}></div>
              </div>
              <div className="text-left ps-4">
                {imgIdCard !== undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewIdCard}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImgIdCard}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
                      Remove
                    </Tag>
                  </>
                )}
              </div>
              <div
                className="hiddenFileBtn"
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgIdCard === undefined ? "block" : "none",
                }}>
                <input
                  type="file"
                  key={imgIdCard}
                  onChange={onChangeIdCard}
                  title="เลือกรูป"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                จังหวัด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="provinceId"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกจังหวัด",
                  },
                ]}>
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
                  key={address.provinceId}>
                  {province?.map((item) => (
                    <option value={item.provinceId}>
                      {item.provinceName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="districtId"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกอำเภอ",
                  },
                ]}>
                <Select
                  showSearch
                  disabled={address.provinceId === undefined}
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onClear={() =>
                    form.setFieldsValue({
                      postcode: undefined,
                      districtId: undefined,
                      subdistrictId: undefined,
                    })
                  }
                  value={address?.districtId}
                  placeholder="เลือกอำเภอ"
                  allowClear
                  onChange={handleOnChangeDistrict}>
                  {district?.map((item) => (
                    <option value={item.districtId}>
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
              <Form.Item
                name="subdistrictId"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกตำบล",
                  },
                ]}>
                <Select
                  disabled={address.districtId === undefined}
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
                  onClear={() =>
                    form.setFieldsValue({ postcode: undefined })
                  }
                  onChange={handleOnChangeSubdistrict}>
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
                    message: "กรุณากรอกบ้านเลขที่!",
                  },
                ]}>
                <Input
                  className="col-lg-12"
                  placeholder="กรุณากรอกบ้านเลขที่"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                รายละเอียดที่อยู่ (หมู่, ถนน){" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="address2"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรายละเอียดที่อยู่บ้าน!",
                  },
                ]}>
                <Input
                  className="col-lg-12"
                  placeholder="กรอกรายละเอียดที่อยู่บ้าน"
                />
              </Form.Item>
            </div>
          </div>
          <div className="form-group">
            <label>
              พื้นที่ให้บริการหลัก{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="dronerArea"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกพื้นที่ให้บริการ!",
                },
              ]}>
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
                }>
                {location?.map((item) => (
                  <option value={item.subdistrictId}>
                    {item.subdistrictName +
                      "/" +
                      item.districtName +
                      "/" +
                      item.provinceName}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group">
            <label>หรือ</label>
            <Form.Item name="url">
              <Input
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
                name="latitude"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกละติจูด!",
                  },
                ]}
                key={mapPosition.lat}>
                <Input
                  placeholder="กรอกข้อมูล Latitude"
                  value={mapPosition.lat}
                  onBlur={handleOnChangeLat}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>Longitude (ลองติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                name="longitude"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกลองติจูด!",
                  },
                ]}
                key={mapPosition.lng}>
                <Input
                  placeholder="กรอกข้อมูล Longitude"
                  value={mapPosition.lng}
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
            <Form.Item
              name="checkPlantsOther"
              rules={[
                {
                  validator: (_, value, callback) => {
                    const plantsOther =
                      form.getFieldValue("plantsOther");
                    console.log(plantsOther, value);
                    if (value?.length < 1 && !plantsOther) {
                      callback(
                        "กรุณาเลือกพืชที่เคยฉีดพ่นอย่างน้อย 1 อย่าง"
                      );
                    } else {
                      callback();
                    }
                  },
                },
              ]}>
              <Checkbox.Group>
                {EXP_PLANT.map((el) => {
                  return (
                    <Row>
                      <Checkbox value={el}>
                        <label>{el}</label>
                      </Checkbox>
                    </Row>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="form-group col-lg-12">
            <label></label>
            <Form.Item
              name="plantsOther"
              rules={[
                {
                  validator(rule, value, callback) {
                    if (!!value && checkValidateComma(value)) {
                      callback(
                        "กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง"
                      );
                    } else {
                      callback();
                    }
                  },
                },
              ]}>
              <Input
                placeholder="กรอกข้อมูลพืชอื่นๆ เช่น ส้ม,มะขาม (กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง)"
                autoComplete="off"
                defaultValue={data.expPlant
                  .filter((a) => !EXP_PLANT.some((x) => x === a))
                  .join(",")}
              />
            </Form.Item>
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
          className="d-flex justify-content-between">
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
            onClick={() => setShowAddModal((prev) => !prev)}>
            เพิ่มโดรน
          </Button>
        </div>
        {dronerDroneList?.length !== 0 ? (
          <Form>
            {dronerDroneList
              .sort((x, y) => x.modalDroneIndex - y.modalDroneIndex)
              .map((item, index) => (
                <div className="container">
                  <div className="row pt-3">
                    <div className="col-lg-1 text-center">
                      <Avatar
                        size={25}
                        src={item.drone.droneBrand.logoImagePath}
                        style={{ marginRight: "5px" }}
                      />
                    </div>
                    <div className="col-lg-5">
                      <h6>{item.drone.droneBrand.name}</h6>
                      <p style={{ color: "#ccc" }}>{item.serialNo}</p>
                    </div>
                    <div className="col-lg-4">
                      <span
                        style={{ color: STATUS_COLOR[item.status] }}>
                        <Badge color={STATUS_COLOR[item.status]} />
                        {DRONER_DRONE_MAPPING[item.status]}
                      </span>
                    </div>
                    <div className="col-lg-2">
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
            <div
              className="container text-center"
              style={{ padding: "80px" }}>
              <img src={emptyData} alt="" />
              <p>ยังไม่มีข้อมูลโดรน</p>
            </div>
          </Form>
        )}
      </CardContainer>
      <div className="d-flex justify-content-between pt-3">
        <p>รายการทั้งหมด {dronerDroneList.length} รายการ</p>
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
          <strong style={{ fontSize: "20px" }}>
            เพิ่มข้อมูลนักบินโดรน (Droner)
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderFromData}
        {renderDrone}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexDroner")}
        onClickSave={() => form.submit()}
        // disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalDrone
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={insertDroneList}
          data={DronerDroneEntity_INIT}
          editIndex={editIndex}
          title="เพิ่มข้อมูลโดรนเกษตร"
        />
      )}
      {showEditModal && (
        <ModalDrone
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={insertDroneList}
          data={editDrone}
          editIndex={editIndex}
          title="แก้ไขข้อมูลโดรนเกษตร"
        />
      )}
    </Layout>
  );
}

export default AddDroner;
