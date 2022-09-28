import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Badge,
  Tag,
  Radio,
  Space,
  DatePicker,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import { DeleteOutlined, EditOutlined, PictureFilled } from "@ant-design/icons";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import color from "../../resource/color";
import FooterPage from "../../components/footer/FooterPage";
import { CardHeader } from "../../components/header/CardHearder";
import {
  CreateFarmerEntity,
  CreateFarmerEntity_INIT,
} from "../../entities/FarmerEntities";
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from "../../entities/LocationEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import {
  CreateAddressEntity,
  CreateAddressEntity_INIT,
} from "../../entities/AddressEntities";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../entities/FarmerPlotEntities";
import {
  FARMER_STATUS_SEARCH,
  STATUS_NORMAL_MAPPING,
} from "../../definitions/Status";
import ActionButton from "../../components/button/ActionButton";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";
import Swal from "sweetalert2";
import ModalFarmerPlot from "../../components/modal/ModalFarmerPlot";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import img_empty from "../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import moment from "moment";

const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";

const { Option } = Select;

const _ = require("lodash");
const { Map } = require("immutable");

const AddFarmer = () => {
  const [data, setData] = useState<CreateFarmerEntity>(CreateFarmerEntity_INIT);
  const [address, setAddress] = useState<CreateAddressEntity>(
    CreateAddressEntity_INIT
  );
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
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
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(
    FarmerPlotEntity_INIT
  );
  const [farmerPlotList, setFarmerPlotList] = useState<FarmerPlotEntity[]>([]);

  const [imgProfile, setImgProfile] = useState<any>();
  const [imgIdCard, setImgIdCard] = useState<any>();

  const [createImgProfile, setCreateImgProfile] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [createImgIdCard, setCreateImgIdCrad] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  //#region data farmer
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
    setAddress(CreateAddressEntity_INIT);
    await getProvince(provinceId, CreateAddressEntity_INIT);
  };

  const getProvince = async (provinceId: number, addr: CreateAddressEntity) => {
    const d = Map(addr).set(
      "provinceId",
      provinceId == undefined ? 0 : provinceId
    );
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res);
    });
  };

  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set(
      "districtId",
      districtId == undefined ? 0 : districtId
    );
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res);
    });
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

  const handleOnChangePostcode = (addr: CreateAddressEntity) => {
    let getPostcode = subdistrict.filter(
      (x) => x.subdistrictId == addr.subdistrictId
    )[0].postcode;
    const c = Map(addr).set("postcode", getPostcode);
    setAddress(c.toJS());
  };

  const handleOnChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(address).set("address1", e.target.value);
    setAddress(d.toJS());
    checkValidateAddr(d.toJS());
  };

  const handleChangeStatus = (e: any) => {
    const m = Map(data).set("status", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  //#endregion

  //#region data farmer plot
  const colorStatus = (status: string) => {
    var mapStatus = STATUS_NORMAL_MAPPING[status];
    var colorText = color.Success;
    colorText = mapStatus == "ใช้งาน" ? colorText : color.Error;
    return colorText;
  };

  const editPlot = (data: FarmerPlotEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditFarmerPlot(data);
  };

  const removePlot = (index: number) => {
    const newData = farmerPlotList.filter((x) => x.plotId != index);
    setFarmerPlotList(newData);
  };

  const insertFarmerPlot = (data: FarmerPlotEntity) => {
    if (data.plotId == 0) {
      const pushId = Map(data).set("plotId", farmerPlotList.length + 1);
      setFarmerPlotList([...farmerPlotList, pushId.toJS()]);
    } else {
      const newData = farmerPlotList.filter((x) => x.plotId != data.plotId);
      setFarmerPlotList([...newData, data]);
    }
    setShowAddModal(false);
    setShowEditModal(false);
    setEditIndex(0);
  };
  //#endregion

  //#region image
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
    const e = Map(d.toJS()).set("resource", "FARMER");
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
    const e = Map(d.toJS()).set("resource", "FARMER");
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
    setCreateImgIdCrad(UploadImageEntity_INTI);
    checkValidate(data);
  };
  //#endregion

  const checkValidate = (data: CreateFarmerEntity) => {
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

  const checkValidateAddr = (addr: CreateAddressEntity) => {
    let checkEmptySting = ![
      data.firstname,
      data.lastname,
      data.telephoneNo,
      data.birthDate,
      addr.address1,
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

  const insertFarmer = async () => {
    const pushAddr = Map(data).set("address", address);
    setData(pushAddr.toJS());
    const pushPlot = Map(pushAddr.toJS()).set("farmerPlot", farmerPlotList);
    setData(pushPlot.toJS());

    await FarmerDatasource.insertFarmer(pushPlot.toJS()).then((res) => {
      if (res != undefined) {
        const pushImgProId = Map(createImgProfile).set("resourceId", res.id);
        const pushImgCardId = Map(createImgIdCard).set("resourceId", res.id);
        var i = 0;
        for (i; 2 > i; i++) {
          i == 0 &&
            UploadImageDatasouce.uploadImage(pushImgProId.toJS()).then(res);
          i == 1 &&
            UploadImageDatasouce.uploadImage(pushImgCardId.toJS()).then(res);
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
                  onChange={handleOnChange}
                  autoComplete="off"
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
                  onChange={handleOnChange}
                  autoComplete="off"
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
                  onChange={handleOnChange}
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
                ]}
              >
                <DatePicker
                  placeholder="กรอกวันเดือนปีเกิด"
                  format={dateFormat}
                  className="col-lg-12"
                  onChange={(e: any) => handleOnChangeBirthday(e)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                รหัสบัตรประชาชน 
              </label>
              <Form.Item
                name="idNo"
                // rules={[
                //   {
                //     required: true,
                //     message: "กรุณากรอกรหัสบัตรประชาชน!",
                //   },
                // ]}
              >
                <Input
                  placeholder="กรอกรหัสบัตรประชาชน"
                  onChange={handleOnChange}
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
                    <Option value={item.provinceId}>{item.provinceName}</Option>
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
                  allowClear
                  placeholder="เลือกอำเภอ"
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
              <Form.Item name="subdistrictId">
                <Select
                  allowClear
                  placeholder="เลือกตำบล"
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
                  onChange={handleOnChangeAddress}
                  autoComplete="off"
                  key={address.provinceId}
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
                onChange={handleChangeStatus}
              >
                <Space direction="vertical">
                  {FARMER_STATUS_SEARCH.filter(
                    (x) => x.value != "INACTIVE"
                  ).map((item) => (
                    <Radio value={item.value}>{item.name}</Radio>
                  ))}
                </Space>
              </Radio.Group>
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
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            เพิ่มแปลง
          </Button>
        </div>
        {farmerPlotList?.length != 0 ? (
          <Form>
            {farmerPlotList
              .sort((x, y) => x.plotId - y.plotId)
              .map((item, index) => (
                <div className="container">
                  <div className="row pt-3 pb-3">
                    <div className="col-lg-4">
                      {item.plotName}
                      <br />
                      <p style={{ fontSize: "12px", color: color.Grey }}>
                        {item.plantName}
                      </p>
                    </div>
                    <div className="col-lg-2">{item.raiAmount} ไร่</div>
                    <div className="col-lg-3">
                      <span
                        style={{ color: colorStatus(item.isActive.toString()) }}
                      >
                        <Badge color={colorStatus(item.isActive.toString())} />
                        {STATUS_NORMAL_MAPPING[item.isActive.toString()]}
                      </span>
                    </div>
                    <div className="col-lg-3 d-flex justify-content-between">
                      <div className="col-lg-6">
                        <ActionButton
                          icon={<EditOutlined />}
                          color={color.primary1}
                          onClick={() => editPlot(item, index + 1)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <ActionButton
                          icon={<DeleteOutlined />}
                          color={color.Error}
                          onClick={() => removePlot(index + 1)}
                        />
                      </div>
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
        <p>รายการทั้งหมด {farmerPlotList?.length} รายการ</p>
        {/* <Pagination defaultCurrent={1} total={1} /> */}
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
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexFarmer")}
        onClickSave={insertFarmer}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalFarmerPlot
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={insertFarmerPlot}
          data={FarmerPlotEntity_INIT}
          editIndex={editIndex}
          title="เพิ่มแปลงเกษตร"
        />
      )}
      {showEditModal && (
        <ModalFarmerPlot
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={insertFarmerPlot}
          data={editFarmerPlot}
          editIndex={editIndex}
          title="แก้ไขแปลงเกษตร"
        />
      )}
    </Layout>
  );
};

export default AddFarmer;
