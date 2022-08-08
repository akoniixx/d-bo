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
  Col,
  Checkbox,
  Tag,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import image from "../../resource/image";
import { BackButton, BackIconButton } from "../../components/button/BackButton";
import SaveButtton from "../../components/button/SaveButton";

import Swal from "sweetalert2";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { formatDate } from "../../utilities/TextFormatter";
import { DroneEntity, DroneEntity_INIT } from "../../entities/DroneEntities";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import FooterPage from "../../components/footer/FooterPage";
import {
  DronerDroneEntity,

  GetDronerDroneEntity,
  GetDronerDroneEntity_INIT,
} from "../../entities/DronerDroneEntities";
import { MONTH_SALE } from "../../definitions/Month";
import { DRONER_DRONE_STATUS } from "../../definitions/DronerStatus";
import TextArea from "antd/lib/input/TextArea";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import {
  ImageEntity,
  ImageEntity_INTI,
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { REASON_CHECK } from "../../definitions/Reason";
import uploadImg from "../../resource/media/empties/uploadImg.png";
import { DronerDatasource } from "../../datasource/DronerDatasource";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroneList() {
  const DronerDroneId = queryString[1];
  const [data, setData] = useState<GetDronerDroneEntity>(GetDronerDroneEntity_INIT);
  const [droner, setDroner] = useState<DronerEntity[]>([DronerEntity_INIT]);
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [imgProfile, setImgProfile] = useState<any>();
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>();
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>();
  const [createLicenseDroner, setCreateLicenseDroner] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  const [createLicenseDrone, setCreateLicenseDrone] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  const [createImgProfile, setCreateImgProfile] =
    useState<ImageEntity>(ImageEntity_INTI);

  const fetchDronerDrone = async () => {
    await DronerDroneDatasource.getDronerDroneById(DronerDroneId).then(
      (res) => {
        setData(res);
      }
    );
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrand(res.data);
    });
  };
  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500).then((res) => {
      setSeriesDrone(res.data);
      setSearchSeriesDrone(res.data)
    });
  };
  useEffect(() => {
    fetchDronerDrone();
    fetchDroneBrand();
    fetchDroneSeries();
  }, []);
  const handleBrand = (brand: string) => {
    let filterSeries = seriesDrone?.filter((x) => x.droneBrandId == brand);
    setSearchSeriesDrone(filterSeries);
  };
  const handleSeries = async (id: string) => {
    const m = Map(data).set("droneId", id);
    let nameDrone = seriesDrone?.filter((x) => x.id == id)[0].droneBrand.name;
    const x = Map(m.toJS()).set("droneName", nameDrone);
    setData(x.toJS());
    checkValidate(x.toJS());
  };
  const handleSerialNo = async (e: any) => {
    const m = Map(data).set("serialNo", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());
  };
  const handleChangeStatus = (e: any) => {
    const m = Map(data).set("status", e.target.value);
    setData(m.toJS());
    checkValidate(m.toJS());

  };
  const handleMonth = async (e: any) => {
    const m = Map(data).set("purchaseMonth", e);
    setData(m.toJS());
    checkValidate(m.toJS());

  };
  const handleYear = async (e: any) => {
    const m = Map(data).set("purchaseYear", e);
    setData(m.toJS());
    checkValidate(m.toJS()); 
  };
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
    const g = Map(f.toJS()).set("resourceId", DronerDroneId);
    setCreateImgProfile(g.toJS());
  };
  const onChangeLicenseDroner = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgLicenseDroner(src);
    const d = Map(createLicenseDroner).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "DRONER_LICENSE");
    setCreateLicenseDroner(f.toJS());
  };
  const previewLicenseDroner = async () => {
    let src = imgLicenseDroner;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgLicenseDroner);
        reader.onload = () => resolve(reader.result);
      });
    }
    // const image = new Image();
    // image.src = src;
    // const imgWindow = window.open(src);
    // imgWindow?.document.write(image.outerHTML);
  };
  const removeLicenseDroner = () => {
    setImgLicenseDroner(undefined);
  };
  const onChangeLicenseDrone = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgLicenseDrone(src);
    const d = Map(createLicenseDrone).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "DRONE_LICENSE");
    setCreateLicenseDrone(f.toJS());
  };
  const previewLicenseDrone = async () => {
    let src = imgLicenseDrone;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgLicenseDrone);
        reader.onload = () => resolve(reader.result);
      });
    }
    // const image = new Image();
    // image.src = src;
    // const imgWindow = window.open(src);
    // imgWindow?.document.write(image.outerHTML);
  };
  const removeLicenseDrone = () => {
    setImgLicenseDrone(undefined);
  };
  const onChangeReason = (e: any) => {
    const m = Map(data).set("reason", e);
    setData(m.toJS());
  };
  const onChangeReasonText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
  };
  const checkValidate = (data: DronerDroneEntity) => {
    if (
      data.droneName != "" &&
      data.serialNo != "" &&
      data.purchaseYear != "" &&
      data.purchaseMonth != "" &&
      data.status != "" 
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
 const UpdateDronerDrone = async (data: GetDronerDroneEntity) => {
  await DronerDroneDatasource.updateDronerDrone(data).then((res) => {
    if(res) {
      Swal.fire({
        title: "บันทึกสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then((time) => {
        window.location.href = "/DroneList";
      });

    }
  })
 }
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลโดรนเกษตรกร" />
        <Form key={data.droneId} style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>วันที่ลงทะเบียน</label>
              <Form.Item>
                <Input disabled value={formatDate(data.createdAt)} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ยี่ห้อโดรนที่ฉีดพ่น <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="droneId"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกยี่ห้อโดรนที่ฉีดพ่น",
                  },
                ]}
              >
                <Select
                  placeholder="เลือกยี่ห้อโดรน"
                  allowClear
                  onChange={handleBrand}
                  //defaultValue={data.drone.droneBrandId}
                  >
                  {droneBrand?.map((item: any, index: any) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รุ่น <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="series"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกรุ่นโดรน",
                  },
                ]}
              >
                <Select
                  placeholder="เลือกรุ่น"
                  allowClear
                  onChange={handleSeries}
                  defaultValue={data.droneId}
                >
                  {searchSeriesDrone?.map((item: any, index: any) => (
                    <option key={index} value={item.id}>
                      {item.series}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="form-group col-lg-6 ">
            <label>
              เลขตัวถังโดรน <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="serialNo"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเลขตัวถังโดรน",
                },
              ]}
            >
              <Input
                onChange={handleSerialNo}
                placeholder="กรอกเลขตัวถังโดรน"
                defaultValue={data.serialNo}
              />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>ปีที่ซื้อ</label>
              <Form.Item name="purchaseYear">
                <Input
                  type="number"
                  placeholder="กรอกปี พ.ศ. ที่ซื้อ"
                  onChange={handleYear}
                  defaultValue={data.purchaseYear}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>เดือนที่ซื้อ</label>
              <Form.Item name="purchaseMonth">
                <Select
                  className="col-lg-6"
                  placeholder="เลือกเดือน"
                  onChange={handleMonth}
                  defaultValue={data.purchaseMonth}
                >
                  {MONTH_SALE.map((item) => (
                    <option value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 pb-5">
              <label>ใบอนุญาตนักบิน</label>
              <span style={{ color: "red" }}>*</span>
              <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDroner})`,
                    display: imgLicenseDroner != undefined ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDroner != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDroner}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDroner}
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
                  display: imgLicenseDroner == undefined ? "block" : "none",
                }}
              >
                <input
                  type="file"
                  onChange={onChangeLicenseDroner}
                  title="เลือกรูป"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>ใบอนุญาตโดรนจาก กสทช.</label>
              <span style={{ color: "red" }}>*</span>
              <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDrone})`,
                    display: imgLicenseDrone != undefined ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDrone != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDrone}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDrone}
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
                  display: imgLicenseDrone == undefined ? "block" : "none",
                }}
              >
                <input
                  required
                  type="file"
                  onChange={onChangeLicenseDrone}
                  title="เลือกรูป"
                />
              </div>
            </div>
          </div>
          <br />
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
                    {DRONER_DRONE_STATUS.map((item: any) => (
                      <Radio value={item.value}>{item.name}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
              {data.status == "REJECTED" && (
                <div style={{ marginLeft: "20px" }}>
                  <div className="form-group">
                    <Form.Item name="reasonCheck">
                      <Checkbox.Group
                        className="col-lg-6"
                        options={REASON_CHECK}
                        onChange={onChangeReason}
                      >
                        <Row>
                          {REASON_CHECK.map((item) => (
                            <Col span={8}>
                              <Checkbox value={item}>{item}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="reason">
                      <TextArea
                        className="col-lg-12"
                        rows={3}
                        placeholder="กรอกเหตุผล/หมายเหตุเพิ่มเติม"
                        onChange={onChangeReasonText}
                      />
                    </Form.Item>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const renderDroner = (
    <div className="col-lg-4">
      <CardContainer style={{ height: "640px" }}>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
        <Form key={data.dronerId}>
          <div className="container text-center" style={{ padding: "30px" }}>
            <div className="row">
              <div className="form-group text-center pb-5">
                <div
                  className="hiddenFileInput zoom"
                  style={{
                    backgroundImage: `url(${
                      imgProfile == undefined ? uploadImg : imgProfile
                    })`,
                  }}
                >
                  <input
                    type="file"
                    onChange={onChangeProfile}
                    title="เลือกรูป"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-12 text-start">
                <label>Droner ID</label>
                <Form.Item name="droneId">
                  <Input disabled defaultValue={data.dronerId}/>
                </Form.Item>
                <label>ชื่อ</label>
                <Form.Item name="firstname">
                  <Input disabled/>
                </Form.Item>
                <label>นามสกุล</label>
                <Form.Item name="lastname">
                  <Input disabled />
                </Form.Item>
                <label>เบอร์โทร</label>
                <Form.Item name="telephoneNo">
                  <Input disabled />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  return (
    <Layout>
      <Row>
        <BackIconButton onClick={() => (window.location.href = "/DroneList")} />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>แก้ไขข้อมูลโดรนเกษตร</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderDroner}
        {renderFromData}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/DroneList")}
        onClickSave={() => UpdateDronerDrone(data)}
        disableSaveBtn={saveBtnDisable}
      />
    </Layout>
  );
}
export default EditDroneList;
