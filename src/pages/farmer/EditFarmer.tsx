import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Badge,
  Radio,
  Space,
  Tag,
  DatePicker,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import color from "../../resource/color";
import FooterPage from "../../components/footer/FooterPage";
import ActionButton from "../../components/button/ActionButton";
import { CardHeader } from "../../components/header/CardHearder";
import {
  GetFarmerEntity,
  GetFarmerEntity_INIT,
} from "../../entities/FarmerEntities";
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from "../../entities/LocationEntities";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../entities/FarmerPlotEntities";
import {
  FARMER_STATUS_SEARCH,
  STATUS_FARMERPLOT_COLOR_MAPPING,
  STATUS_NORMAL_MAPPING,
} from "../../definitions/Status";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../entities/AddressEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import ModalFarmerPlot from "../../components/modal/ModalFarmerPlot";
import { FarmerPlotDatasource } from "../../datasource/FarmerPlotDatasource";
import Swal from "sweetalert2";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import {
  ImageEntity,
  ImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import "../farmer/Style.css";
import img_empty from "../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import moment from "moment";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { resizeFileImg } from "../../utilities/ResizeImage";
import { Navigate, useNavigate } from "react-router-dom";
const { Option } = Select;

const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";

const _ = require("lodash");
const { Map } = require("immutable");

let queryString = _.split(window.location.pathname, "=");

const EditFarmer = () => {
  const [profile] = useLocalStorage("profile", []);
  const navigate = useNavigate();

  const farmerId = queryString[1];
  const [data, setData] = useState<GetFarmerEntity>(GetFarmerEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT);
  const [farmerPlotList, setFarmerPlotList] = useState<FarmerPlotEntity[]>([
    FarmerPlotEntity_INIT,
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const [province, setProvince] = useState<ProviceEntity[]>([
    ProvinceEntity_INIT,
  ]);
  const [district, setDistrict] = useState<DistrictEntity[]>([
    DistrictEntity_INIT,
  ]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([
    SubdistrictEntity_INIT,
  ]);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(
    FarmerPlotEntity_INIT
  );

  const [imgProfile, setImgProfile] = useState<any>();
  const [imgIdCard, setImgIdCard] = useState<any>();

  const [createImgProfile, setCreateImgProfile] =
    useState<ImageEntity>(ImageEntity_INTI);
  const [createImgIdCard, setCreateImgIdCrad] =
    useState<ImageEntity>(ImageEntity_INTI);

  const fecthFarmer = async () => {
    await FarmerDatasource.getFarmerById(farmerId).then((res) => {
      setData({
        ...res,
        birthDate: res.birthDate ? moment(res.birthDate) : moment(),
      });

      setAddress(res.address);
      setFarmerPlotList(res.farmerPlot);
      let getPathPro = res.file.filter((x) => x.category === "PROFILE_IMAGE");
      let getPathCard = res.file.filter((x) => x.category === "ID_CARD_IMAGE");
      let imgList: {
        path: string;
        category: string;
      }[] = [];
      if (getPathPro.length > 0) {
        imgList.push(getPathPro[0]);
      }
      if (getPathCard.length > 0) {
        imgList.push(getPathCard[0]);
      }

      let i = 0;
      for (i; imgList.length > i; i++) {
        i === 0 &&
          UploadImageDatasouce.getImage(imgList[i].path.toString()).then(
            (resImg) => {
              if (resImg.url) {
                imgList[0].category === "PROFILE_IMAGE"
                  ? setImgProfile(resImg.url)
                  : setImgIdCard(resImg.url);
              }
            }
          );
        i === 1 &&
          UploadImageDatasouce.getImage(imgList[i].path.toString()).then(
            (resImg) => {
              resImg?.url && setImgIdCard(resImg.url);
            }
          );
      }
    });
  };

  useEffect(() => {
    fecthFarmer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
    if (address.provinceId) {
      LocationDatasource.getDistrict(address.provinceId).then((res) => {
        setDistrict(res);
      });
    }
    if (address.districtId) {
      LocationDatasource.getSubdistrict(address.districtId).then((res) => {
        setSubdistrict(res);
      });
    }
  }, [address.provinceId, address.districtId]);

  //#region function farmer
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  const handleOnChangeBirthday = (e: any) => {
    const d = Map(data)
      .set("birthDate", moment(new Date(e)).format(dateCreateFormat))
      .toJS();
    setData(d);
    checkValidate(d);
  };
  const handleOnChangeProvince = async (provinceId: number) => {
    const d = Map(address).set(
      "provinceId",
      provinceId == undefined ? 0 : provinceId
    );
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };

  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set(
      "districtId",
      districtId == undefined ? 0 : districtId
    );
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };

  const handleOnChangeSubdistrict = async (subdistrictId: number) => {
    const d = Map(address).set(
      "subdistrictId",
      subdistrictId == undefined ? 0 : subdistrictId
    );
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await handleOnChangePostcode(d.toJS());
  };

  const handleOnChangePostcode = (addr: AddressEntity) => {
    let getPostcode = subdistrict.filter(
      (x) => x.subdistrictId == addr.subdistrictId
    )[0].postcode;
    const c = Map(addr).set("postcode", getPostcode);
    setAddress(c.toJS());
    checkValidateAddr(c.toJS());
  };

  const handleOnChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(address).set("address1", e.target.value);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };

  const handleChangeFarmerstatus = (e: any) => {
    if (e.target.value != "INATIVE" || e.target.value != "REJECTED") {
      data.reason = "";
    }
    const m = Map(data).set("status", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
    checkValidateReason(m.toJS());
  };

  const handleOnChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(data).set("reason", e.target.value);
    setData(d.toJS());
    checkValidateAddr(d.toJS());
    checkValidateReason(d.toJS());
  };
  //#endregion

  //#region function farmer plot
  const editPlot = (data: FarmerPlotEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditFarmerPlot(data);
  };

  const removePlot = (data: FarmerPlotEntity) => {
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "โปรดตรวจสอบแปลงเกษตรที่คุณต้องการลบ เพราะอาจจะส่งผลต่อการจ้างงานในแอปพลิเคชัน",
      cancelButtonText: "ย้อนกลับ",
      confirmButtonText: "ลบ",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await FarmerPlotDatasource.deleteFarmerPlot(data.id);
      }
      fecthFarmer();
    });
  };

  const updateFarmerPlot = async (plot: FarmerPlotEntity) => {
    const payload = {
      ...plot,
      farmerId,
    };
    if (payload.id !== "") {
      await FarmerPlotDatasource.updateFarmerPlot(payload);
      setShowEditModal((prev) => !prev);
    } else {
      await FarmerPlotDatasource.insertFarmerPlot(payload);
      setShowAddModal((prev) => !prev);
    }
    fecthFarmer();
    checkValidate(data);
  };
  //#endregion

  //#region image
  const onChangeProfile = async (file: any) => {
    const source = file.target.files[0];
    let newSource: any;

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024;
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split("/")[1],
        quality: 70,
        rotation: 0,
        responseUriFunc: (res: any) => {},
      });
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source);
      reader.onload = () => resolve(reader.result);
    });

    setImgProfile(img_base64);
    checkValidate(data);
    const d = Map(createImgProfile).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "FARMER");
    const f = Map(e.toJS()).set("category", "PROFILE_IMAGE");
    const g = Map(f.toJS()).set("resourceId", farmerId);
    setCreateImgProfile(g.toJS());
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
    if (getImg !== undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then(
        (res) => {}
      );
    }
    setCreateImgProfile(ImageEntity_INTI);
    setImgProfile(undefined);
    checkValidate(data);
  };
  const onChangeIdCard = async (file: any) => {
    const source = file.target.files[0];
    let newSource: any;

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024;
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split("/")[1],
        quality: 70,
        rotation: 0,
        responseUriFunc: (res: any) => {},
      });
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source);
      reader.onload = () => resolve(reader.result);
    });

    setImgIdCard(img_base64);
    checkValidate(data);
    const d = Map(createImgProfile).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "FARMER");
    const f = Map(e.toJS()).set("category", "ID_CARD_IMAGE");
    const g = Map(f.toJS()).set("resourceId", farmerId);
    setCreateImgIdCrad(g.toJS());
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

  const checkValidate = (data: GetFarmerEntity) => {
    let checkEmptySting = ![
      data.firstname,
      data.lastname,
      data.telephoneNo,
      address.address1,
    ].includes("");
    let checkEmptyNumber = ![
      address.provinceId,
      address.districtId,
      address.subdistrictId,
    ].includes(0);
    let checkEmptyDate = ![data.birthDate].includes("1970-01-01");
    if (checkEmptySting && checkEmptyNumber && checkEmptyDate) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };

  const checkValidateAddr = (addr: AddressEntity) => {
    let checkEmptySting = ![
      data.firstname,
      data.lastname,
      data.telephoneNo,
      address.address1,
    ].includes("");
    let checkEmptyNumber = ![
      addr.provinceId,
      addr.districtId,
      addr.subdistrictId,
    ].includes(0);
    let checkEmptyDate = ![data.birthDate].includes("1970-01-01");
    if (checkEmptySting && checkEmptyNumber && checkEmptyDate) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };

  const checkValidateReason = (data: GetFarmerEntity) => {
    if (
      data.status == "INACTIVE" &&
      (data.reason == null || data.reason == "")
    ) {
      setBtnSaveDisable(true);
    } else {
      setBtnSaveDisable(false);
    }
  };
  const updateFarmer = async () => {
    const pushAddr = Map(data).set("address", address);
    const pushPin = Map(pushAddr.toJS()).set("pin", "");
    const payload = {
      ...pushPin.toJS(),
      updateBy: `${profile.firstname} ${profile.lastname}`,
    };
    delete payload.farmerPlot;
    await FarmerDatasource.updateFarmer(payload).then((res) => {
      console.log(payload);
      console.log(res);
      if (res !== undefined) {
        let i = 0;
        for (i; 2 > i; i++) {
          i === 0 &&
            createImgProfile.file !== "" &&
            UploadImageDatasouce.uploadImage(createImgProfile).then(res);
          i === 1 &&
            createImgIdCard.file !== "" &&
            UploadImageDatasouce.uploadImage(createImgIdCard).then(res);
        }
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/IndexFarmer";
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
        <CardHeader textHeader="ข้อมูลเกษตรกร" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group text-center pb-4">
              <div
                className="hiddenFileInput zoom"
                style={{
                  backgroundImage: `url(${
                    imgProfile === undefined ? img_empty : imgProfile
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
                {imgProfile !== undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewProfile}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImg}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
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
              <label>วันที่ลงทะเบียน</label>

              <div style={{ marginBottom: 24 }}>
                <Input
                  style={{
                    padding: "4px 12px",
                  }}
                  disabled
                  value={`${moment(data.createdAt).format("DD/MM/YYYY")} ${
                    data.createBy === null || data.createBy === undefined
                      ? "ลงทะเบียนโดยเกษตรกร"
                      : `(${data.createBy})`
                  }`}
                />
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
                  defaultValue={data.firstname}
                  autoComplete="off"
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
                  defaultValue={data.lastname}
                  autoComplete="off"
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
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "กรุณากรอกเบอร์โทรให้ถูกต้อง!",
                  },
                  {
                    min: 10,
                    message: "กรุณากรอกเบอร์โทรให้ครบ 10 หลัก!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกเบอร์โทร"
                  defaultValue={data.telephoneNo}
                  autoComplete="off"
                  maxLength={10}
                  onChange={handleOnChange}
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
                ]}
              >
                <DatePicker
                  placeholder="กรอกวันเดือนปีเกิด"
                  format={dateFormat}
                  className="col-lg-12"
                  disabledDate={(current) => {
                    return current && current > moment().endOf("day");
                  }}
                  onChange={(e: any) => handleOnChangeBirthday(e)}
                  defaultValue={moment(data.birthDate)}
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
                    min: 13,
                    message: "กรุณากรอกรหัสบัตรประชาชนให้ครบ 13 หลัก!",
                  },
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "กรุณากรอกรหัสบัตรประชาชนให้ถูกต้อง!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกรหัสบัตรประชาชน"
                  defaultValue={data.idNo}
                  autoComplete="off"
                  maxLength={13}
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>รูปถ่ายผู้สมัครคู่กับบัตรประชาชน </label>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgIdCard})`,
                    display: imgIdCard != undefined ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgIdCard != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewIdCard}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImgIdCard}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
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
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                จังหวัด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="province">
                <Select
                  allowClear
                  placeholder="เลือกจังหวัด"
                  defaultValue={address.provinceId}
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
                  onChange={handleOnChangeProvince}
                >
                  {province?.map((item) => (
                    <Option value={item.provinceId}>{item.provinceName}</Option>
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
                  allowClear
                  placeholder="เลือกอำเภอ"
                  defaultValue={address.districtId}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA: any, optionB: any) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeDistrict}
                >
                  {district?.map((item) => (
                    <Option value={item.districtId}>{item.districtName}</Option>
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
              <Form.Item name="subdistrict">
                <Select
                  allowClear
                  placeholder="เลือกตำบล"
                  defaultValue={address.subdistrictId}
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
                  onChange={handleOnChangeSubdistrict}
                >
                  {subdistrict?.map((item) => (
                    <Option value={item.subdistrictId}>
                      {item.subdistrictName}
                    </Option>
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
                  placeholder="เลือกรหัสไปรษณีย์"
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
                  defaultValue={address.address1}
                  autoComplete="off"
                  onChange={handleOnChangeAddress}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <div className="form-group">
              <label>
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Radio.Group
                defaultValue={data.status}
                onChange={handleChangeFarmerstatus}
              >
                <Space direction="vertical">
                  {FARMER_STATUS_SEARCH.map((item, index) => (
                    <Radio value={item.value}>
                      {item.name}
                      {(data.status == "REJECTED" && index == 2) ||
                      (data.status == "INACTIVE" && index == 3) ? (
                        <div>
                          <div className="form-group">
                            <label></label>
                            <br />
                            <Form.Item>
                              <TextArea
                                className="col-lg-12"
                                rows={3}
                                placeholder="กรอกเหตุผล/เหตุหมายเพิ่มเติม"
                                autoComplete="off"
                                onChange={handleOnChangeReason}
                                defaultValue={data.reason}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="form-group col-lg-12" style={{ marginTop: 16 }}>
            <label>หมายเหตุ</label>
            <Form.Item>
              <TextArea
                value={data.comment}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }));
                }}
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
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            เพิ่มแปลง
          </Button>
        </div>
        <Form>
          {farmerPlotList.length != 0 ? (
            <div className="container">
              {farmerPlotList.map((item, index) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-4">
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      {item.plotName}
                    </p>
                    <p style={{ fontSize: "12px", color: color.Grey }}>
                      {item.plantName}
                    </p>
                  </div>
                  <div className="col-lg-2">
                    <span>{item.raiAmount} ไร่</span>
                  </div>
                  <div className="col-lg-3">
                    <span
                      style={{
                        color: STATUS_FARMERPLOT_COLOR_MAPPING[item.status],
                      }}
                    >
                      <Badge
                        color={STATUS_FARMERPLOT_COLOR_MAPPING[item.status]}
                      />
                      {STATUS_NORMAL_MAPPING[item.status]}
                    </span>
                  </div>
                  <div className="col-lg-3 d-flex justify-content-between">
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<EditOutlined />}
                        color={color.primary1}
                        onClick={() => editPlot(item, index)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<DeleteOutlined />}
                        color={color.Error}
                        onClick={() => removePlot(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData} alt="" />
              <h5>ยังไม่มีแปลงเกษตร</h5>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {farmerPlotList.length} รายการ</p>
        {farmerPlotList.length < 10 ? null : (
          <Pagination defaultCurrent={1} total={1} />
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            แก้ไขข้อมูลเกษตรกร (Farmer)
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={updateFarmer}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalFarmerPlot
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={updateFarmerPlot}
          data={FarmerPlotEntity_INIT}
          editIndex={editIndex}
          title="เพิ่มแปลงเกษตร"
        />
      )}
      {showEditModal && (
        <ModalFarmerPlot
          isEditModal
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={updateFarmerPlot}
          data={editFarmerPlot}
          editIndex={editIndex}
          title="แก้ไขแปลงเกษตร"
        />
      )}
    </Layout>
  );
};

export default EditFarmer;
