import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Radio,
  Space,
  Tag,
  Checkbox,
  message,
} from "antd";

import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import Swal from "sweetalert2";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import {
  GetDronerDroneEntity,
  GetDronerDroneEntity_INIT,
} from "../../entities/DronerDroneEntities";
import {
  DRONER_DRONE_STATUS,
  DRONER_STATUS,
} from "../../definitions/DronerStatus";
import {
  ImageEntity,
  ImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DroneEntity } from "../../entities/DroneEntities";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { formatDate } from "../../utilities/TextFormatter";
import { MONTH_SALE } from "../../definitions/Month";
import { REASON_CHECK, REASON_IS_CHECK } from "../../definitions/Reason";
import img_empty from "../../resource/media/empties/uploadImg.png";
import moment from "moment";
import image from "../../resource/image";
const { Option } = Select;
const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroneList() {
  const DronerDroneId = queryString[1];
  const [data, setData] = useState<GetDronerDroneEntity>(
    GetDronerDroneEntity_INIT
  );
  const [dronerId, setDronerId] = useState("");
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [imgProfile, setImgProfile] = useState<any>();
  const [createLicenseDroner, setCreateLicenseDroner] =
    useState<ImageEntity>(ImageEntity_INTI);
  const [createLicenseDrone, setCreateLicenseDrone] =
    useState<ImageEntity>(ImageEntity_INTI);
  let imgList: (string | boolean)[] = [];
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>(false);
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>(false);
  let [textReason, setTextReason] = useState<any>();
  let [textReasonMore, setTextReasonMore] = useState<any>();

  const fetchDronerDrone = async () => {
    await DronerDroneDatasource.getDronerDroneById(DronerDroneId).then(
      (res) => {
        setData(res);
        setDronerId(res.dronerId);
        let getPathPro = res.droner.file.filter(
          (x) => x.category == "PROFILE_IMAGE"
        );
        let getLicenseDroner = res.file?.filter(
          (x) => x.category == "DRONER_LICENSE"
        );
        let getLicenseDrone = res.file?.filter(
          (x) => x.category == "DRONE_LICENSE"
        );
        imgList.push(
          getPathPro.length >= 1 ? getPathPro[0].path : "",
          getLicenseDroner.length >= 1 ? getLicenseDroner[0].path : "",
          getLicenseDrone.length >= 1 ? getLicenseDrone[0].path : ""
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
                setImgLicenseDroner(resImg.url);
              }
            );
          i == 2 &&
            UploadImageDatasouce.getImage(imgList[i].toString()).then(
              (resImg) => {
                setImgLicenseDrone(resImg.url);
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
  useEffect(() => {
    fetchDronerDrone();
    fetchDroneBrand();
    fetchDroneSeries();
  }, []);
  const handleBrand = (brand: string) => {
    {
      !brand || data.id !== brand
        ? setBtnSaveDisable(true)
        : setBtnSaveDisable(false);
    }
    let filterSeries = seriesDrone?.filter((x) => x.droneBrandId == brand);
    setSearchSeriesDrone(filterSeries);
    const m = Map(data.drone).set("droneBrandId", brand);
    const t = Map(data).set("drone", m.toJS());
    setData(t.toJS());
  };
  const handleSeries = async (id: string) => {
    {
      !id ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
    const m = Map(data).set("droneId", id);
    setData(m.toJS());
  };
  const handleSerialNo = async (e: any) => {
    {
      !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    }
    const m = Map(data).set("serialNo", e.target.value);
    setData(m.toJS());
  };
  const handleChangeStatus = (e: any) => {
    {
      e.target.value == "REJECTED" || e.target.value == "INACTIVE"
        ? setBtnSaveDisable(true)
        : setBtnSaveDisable(false);
    }
    const m = Map(data).set("status", e.target.value);
    const n = Map(m.toJS()).set("reason", []);
    setData(n.toJS());
  };
  const handleMonth = async (e: any) => {
    const m = Map(data).set("purchaseMonth", e);
    setData(m.toJS());
    setBtnSaveDisable(false);
  };
  const handleYear = async (e: any) => {
    let year = moment().add(543, "year").format("YYYY");
    {
      e.target.value > year
        ? setBtnSaveDisable(true)
        : setBtnSaveDisable(false);
    }
    const m = Map(data).set("purchaseYear", e.target.value);
    setData(m.toJS());
  };
  const onChangeReason = (e: any) => {
    let checked = e.target.checked;
    let value = e.target.value;
    REASON_IS_CHECK.map((item) =>
      _.set(item, "isChecked", item.reason == value ? checked : item.isChecked)
    );
    let p: any = "";
    if (checked) {
      p = Map(data).set(
        "reason",
        [...data.reason, value].filter((x) => x != "")
      );
      setBtnSaveDisable(false);
    } else {
      let removeReason = data.reason.filter((x) => x != value);
      p = Map(data).set("reason", removeReason);
      setBtnSaveDisable(true);
    }
    setData(p.toJS());
  };
  const onChangeReasonText = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.trim().length != 0) {
      setTextReason(e.target.value);
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onChangeReasonTextMore = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.trim().length != 0) {
      setTextReasonMore(e.target.value);
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
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
    const g = Map(f.toJS()).set("resourceId", DronerDroneId);
    setCreateLicenseDroner(g.toJS());
    const pushImg = Map(data).set("file", [
      ...data.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setData(pushImg.toJS());
    setBtnSaveDisable(false);
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
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeLicenseDroner = () => {
    const removeImg = data.file?.filter(
      (x) => x.category != "DRONER_LICENSE"
    )[0];
    const d = Map(data).set("file", removeImg == undefined ? [] : [removeImg]);
    setData(d.toJS());
    setImgLicenseDroner(false);
    setBtnSaveDisable(true);
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
    const g = Map(f.toJS()).set("resourceId", DronerDroneId);
    setCreateLicenseDrone(g.toJS());
    const pushImg = Map(data).set("file", [
      ...data.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setData(pushImg.toJS());
    setBtnSaveDisable(false);
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
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeLicenseDrone = () => {
    const removeImg = data.file?.filter(
      (x) => x.category != "DRONE_LICENSE"
    )[0];
    const d = Map(data).set("file", removeImg == undefined ? [] : [removeImg]);
    setData(d.toJS());
    setImgLicenseDrone(false);
    setBtnSaveDisable(true);
  };
  const UpdateDronerDrone = async () => {
    let textReasonList = [];
    if (textReason != undefined) {
      let m = textReason.split(",");
      for (let i = 0; m.length > i; i++) {
        textReasonList.push(m[i]);
      }
    }
    if (textReasonMore != undefined) {
      let m = textReasonMore.split(",");
      for (let i = 0; m.length > i; i++) {
        textReasonList.push(m[i]);
      }
    }
    data.reason.push.apply(
      data.reason,
      textReasonList.filter((x) => x != "")
    );
    const setTextReason = Array.from(new Set(data.reason)).filter(
      (x) => x != ""
    );
    const pushTextReasons = Map(data).set("reason", setTextReason);
    await DronerDroneDatasource.updateDroneList(pushTextReasons.toJS()).then(
      (res) => {
        if (res != undefined) {
          var i = 0;
          for (i; 2 > i; i++) {
            i == 0 &&
              UploadImageDatasouce.uploadImage(createLicenseDroner).then(res);
            i == 1 &&
              UploadImageDatasouce.uploadImage(createLicenseDrone).then(res);
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
      }
    );
  };
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลโดรนเกษตร" />
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
                name="droneBrand"
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
              <span style={{ color: "red" }}>*</span>
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDroner})`,
                    display: imgLicenseDroner != false ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDroner != false && (
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
                  display: imgLicenseDroner == false ? "block" : "none",
                }}
              >
                <input
                  key={imgLicenseDroner}
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
                    display: imgLicenseDrone != false ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDrone != false && (
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
                  display: imgLicenseDrone == false ? "block" : "none",
                }}
              >
                <input
                  key={imgLicenseDrone}
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
                    message: "กรุณากรอกหมายเหตุ",
                  },
                ]}
              >
                <div className="row">
                  <div className="form-group col-lg-12">
                    <Radio.Group
                      defaultValue={data.status}
                      onChange={handleChangeStatus}
                      className="col-lg-12"
                    >
                      <Space direction="vertical">
                        {DRONER_DRONE_STATUS.filter((x: any) => x != "").map(
                          (item: any, index: any) => (
                            <Radio value={item.value}>
                              {item.name}
                              {data.status == "REJECTED" && index == 2 ? (
                                <div style={{ marginLeft: "20px" }}>
                                  <Form.Item style={{ width: "530px" }}>
                                    {REASON_IS_CHECK.map((item) =>
                                      _.set(
                                        item,
                                        "isChecked",
                                        data?.reason
                                          .map((x) => x)
                                          .find((y) => y === item.reason)
                                          ? true
                                          : item.isChecked
                                      )
                                    ).map((x) => (
                                      <div>
                                        <Checkbox
                                          key={x.key}
                                          value={x.reason}
                                          onClick={onChangeReason}
                                          checked={x.isChecked}
                                        />{" "}
                                        <label>{x.reason}</label>
                                        <br />
                                      </div>
                                    ))}
                                  </Form.Item>
                                  <Form.Item style={{ width: "530px" }}>
                                    <TextArea
                                      rows={3}
                                      onChange={onChangeReasonText}
                                      placeholder="กรอกเหตุผล/หมายเหตุเพิ่มเติม"
                                      autoComplete="off"
                                      defaultValue={data.reason.filter(
                                        (a) =>
                                          !REASON_CHECK.some((x) => x === a)
                                      )}
                                    />
                                  </Form.Item>
                                </div>
                              ) : data.status == "INACTIVE" && index == 3 ? (
                                <div>
                                  <div className="form-group ps-3">
                                    <TextArea
                                      style={{ width: "530px" }}
                                      className="col-lg-12"
                                      rows={3}
                                      onChange={onChangeReasonTextMore}
                                      placeholder="กรอกเหตุผล/หมายเหตุเพิ่มเติม"
                                      autoComplete="off"
                                      defaultValue={data.reason}
                                    />
                                  </div>
                                </div>
                              ) : null}
                            </Radio>
                          )
                        )}
                      </Space>
                    </Radio.Group>
                  </div>
                </div>
              </Form.Item>
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
                      imgProfile == undefined ? image.empty_img : imgProfile
                    })`,
                  }}
                ></div>
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
        onClickSave={UpdateDronerDrone}
        disableSaveBtn={saveBtnDisable}
      />
    </Layout>
  );
}
export default EditDroneList;
