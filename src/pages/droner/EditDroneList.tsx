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
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroneList() {
  const DronerDroneId = queryString[1];
  const [data, setData] = useState<GetDronerDroneEntity>(
    GetDronerDroneEntity_INIT
  );
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [imgProfile, setImgProfile] = useState<any>();
  const [createLicenseDroner, setCreateLicenseDroner] =
    useState<UploadImageEntity>();
  const [createLicenseDrone, setCreateLicenseDrone] =
    useState<UploadImageEntity>();
  const [createImgProfile, setCreateImgProfile] =
    useState<ImageEntity>(ImageEntity_INTI);
  let imgList: (string | boolean)[] = [];
  let checkDronerLicense = data.file?.filter(
    (x) => x.category == "DRONER_LICENSE"
  );
  let checkDroneLicense = data.file?.filter(
    (x) => x.category == "DRONE_LICENSE"
  );
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>(false);
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>(false);

  const fetchDronerDrone = async () => {
    await DronerDroneDatasource.getDronerDroneById(DronerDroneId).then(
      (res) => {
        setData(res);
        let getPathPro = res.droner.file.filter(
          (x) => x.category == "PROFILE_IMAGE"
        );
        imgList.push(getPathPro.length >= 1 ? getPathPro[0].path : "");
        var i = 0;
        for (i; imgList.length > i; i++) {
          i == 0 &&
            UploadImageDatasouce.getImage(imgList[i].toString()).then(
              (resImg) => {
                setImgProfile(resImg.url);
              }
            );
        }
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
      setSearchSeriesDrone(res.data);
    });
  };
  const fetchImg = async () => {
    if (checkDronerLicense?.length > 0) {
      if (checkDronerLicense[0].path == "") {
        let src = checkDronerLicense[0].file;
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(src);
          reader.onload = () => resolve(reader.result);
        });
        setImgLicenseDroner(src);
      } else {
        await UploadImageDatasouce.getImage(checkDronerLicense[0].path).then(
          (resImg) => {
            setImgLicenseDroner(resImg.url);
          }
        );
      }
    }
    if (checkDroneLicense?.length > 0) {
      if (checkDroneLicense[0].path == "") {
        let src = checkDroneLicense[0].file;
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(src);
          reader.onload = () => resolve(reader.result);
        });
        setImgLicenseDrone(src);
      } else {
        await UploadImageDatasouce.getImage(checkDroneLicense[0].path).then(
          (resImg) => {
            setImgLicenseDrone(resImg.url);
          }
        );
      }
    }
  };
  useEffect(() => {
    fetchDronerDrone();
    fetchDroneBrand();
    fetchDroneSeries();
    fetchImg();
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
    const m = Map(data).set("purchaseYear", e.target.value);
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
  const onPreviewProfile = async () => {
    let src = imgProfile;
    console.log(src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgProfile);
        reader.onload = () => resolve(reader.result);
      });
    }
    // const image = new Image();
    // image.src = src;
    // const imgWindow = window.open(src);
    // imgWindow?.document.write(image.outerHTML);
  };
  const removeImg = () => {
    const dronerImg = data.droner.file.filter(
      (x) => x.category == "PROFILE_IMAGE"
    )[0];
    UploadImageDatasouce.deleteImage(dronerImg.id, dronerImg.path).then(
      (res) => {}
    );
    setImgProfile(undefined);
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
    const e = Map(d.toJS()).set("resource", "DRONER_DRONE");
    const f = Map(e.toJS()).set("category", "DRONER_LICENSE");
    const g = Map(f.toJS()).set("path", "");
    setCreateLicenseDroner(g.toJS());
    const pushImg = Map(data).set("file", [
      ...data.drone.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setData(pushImg.toJS());
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
    const removeImg = data.drone.file?.filter(
      (x) => x.category != "DRONER_LICENSE"
    )[0];
    const d = Map(data).set("file", removeImg == undefined ? [] : [removeImg]);
    setData(d.toJS());
    setImgLicenseDroner(false);
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
    const e = Map(d.toJS()).set("resource", "DRONER_DRONE");
    const f = Map(e.toJS()).set("category", "DRONE_LICENSE");
    const g = Map(f.toJS()).set("path", "");
    setCreateLicenseDrone(g.toJS());
    const pushImg = Map(data).set("file", [
      ...data.drone.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setData(pushImg.toJS());
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
    const removeImg = data.drone.file?.filter(
      (x) => x.category != "DRONE_LICENSE"
    )[0];
    const d = Map(data).set("file", removeImg == undefined ? [] : [removeImg]);
    setData(d.toJS());
    setImgLicenseDrone(false);
  };
  const onChangeReason = (e: any) => {
    const m = Map(data).set("reason", e);
    setData(m.toJS());
  };
  const onChangeReasonText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let reasonText = [];
    let m = e.target.value.split(",");
    for (let i = 0; m.length > i; i++) {
      reasonText.push(m[i]);
    }
    data.reason.push.apply(data.reason, reasonText);
  };
  const checkValidate = (data: GetDronerDroneEntity) => {
    if (
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
      if (res) {
        var i = 0;
        for (i; 2 > i; i++) {
          i == 0 &&
            UploadImageDatasouce.uploadImage(createImgProfile).then(res);
          console.log(res);
        }
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/DroneList";
        });
      }
    });
  };
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
                  defaultValue={data.drone.droneBrandId}
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
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
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
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
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
                    <Form.Item>
                      <Checkbox.Group
                        className="col-lg-6"
                        options={REASON_CHECK}
                        onChange={onChangeReason}
                        defaultValue={data.reason}
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
                    <Form.Item>
                      <TextArea
                        className="col-lg-12"
                        rows={3}
                        placeholder="กรอกเหตุผล/หมายเหตุเพิ่มเติม"
                        onBlur={onChangeReasonText}
                        // defaultValue={
                        //   REASON_CHECK.map((x) =>
                        //     data.reason.filter((y) => y != x)
                        //   )[0]
                        // }
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
        <Form>
          <div className="container text-center" style={{ padding: "30px" }}>
            <div className="row">
              <div className="form-group text-center pb-4">
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
            <div className="row">
              <div className="form-group col-lg-12 text-start">
                <label>Droner ID</label>
                <Form.Item name="droneId">
                  <Input disabled defaultValue={data.dronerId} />
                </Form.Item>
                <label>ชื่อ</label>
                <Form.Item name="firstname">
                  <Input disabled defaultValue={data.droner.firstname} />
                </Form.Item>
                <label>นามสกุล</label>
                <Form.Item name="lastname">
                  <Input disabled defaultValue={data.droner.lastname} />
                </Form.Item>
                <label>เบอร์โทร</label>
                <Form.Item name="telephoneNo">
                  <Input disabled defaultValue={data.droner.telephoneNo} />
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
