import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Tag,
  TimePicker,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../../entities/UploadImageEntities";
import { resizeFileImg } from "../../../utilities/ResizeImage";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import { color, image } from "../../../resource";
import { BackIconButton } from "../../../components/button/BackButton";
import { FooterPage } from "../../../components/footer/FooterPage";
import moment from "moment";
import { RewardDatasource } from "../../../datasource/RewardDatasource";
import dayjs from "dayjs";
import RenderQuota from "../../../components/mobile/RenderQuota";
import uploadImgQuota from "../../../resource/media/empties/upload_img_quota.png";
import TextArea from "antd/lib/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";

const { Map } = require("immutable");
const _ = require("lodash");
function EditQuota() {
  let queryString = _.split(window.location.pathname, "=");
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const dateFormat = "DD/MM/YYYY";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imgReward, setImgReward] = useState<any>();
  const [imgCover, setImgCover] = useState<any>();
  const [imgButton, setImgButton] = useState<any>();
  const [imgTableLucky, setImgTableLucky] = useState<any>();
  const [nameChallenge, setNameChallenge] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [nameReward, setNameReward] = useState<string | null>(null);
  const [raiAmount, setRaiAmount] = useState<string | null>(null);
  const [condition, setCondition] = useState<any>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState();
  const [createImgReward, setCreateImgReward] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [createImgCover, setCreateImgCover] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [createImgButton, setCreateImgButton] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [createImgTableLucky, setCreateImgTableLucky] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  //call api reward
  useEffect(() => {
    RewardDatasource.getAllRewardById(queryString[1]).then((res) => {
      form.setFieldsValue({
        imgCover: res.imagePath,
        nameChallenge: res.rewardName,
        luckyDraw: res.score,
        raiAmount: res.amount,
        description: res.description,
        detail: res.condition,
        status: res.status,
        startDate: !res.startExchangeDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startExchangeDate).toUTCString()),
        startTime: !res.startExchangeDate
          ? moment(new Date().getTime())
          : moment(new Date(res.startExchangeDate).getTime()),
        endDate: !res.expiredExchangeDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.expiredExchangeDate).toUTCString()),
        endTime: !res.expiredExchangeDate
          ? moment(new Date().getTime())
          : moment(new Date(res.expiredExchangeDate).getTime()),
        startUsedDate: !res.startUsedDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startUsedDate).toUTCString()),
        startUsedTime: !res.startUsedDate
          ? moment(new Date().getTime())
          : moment(new Date(res.startUsedDate).getTime()),
        expiredUsedDate: !res.expiredUsedDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.expiredUsedDate).toUTCString()),
        expiredUsedTime: !res.expiredUsedDate
          ? moment(new Date().getTime())
          : moment(new Date(res.expiredUsedDate).getTime()),
      });
      setNameChallenge(res.rewardName);
      setNameReward(res.rewardType);
      setDetail(res.description);
      setCondition(res.condition);
      setRaiAmount(res.score);
      setImgCover(res.imagePath);
      setImgReward(res.imagePath);
      setImgButton(res.imagePath);
      setImgTableLucky(res.imagePath);
      setCheckStatus(res.status);
    });
  }, []);
  const onChangeImg = async (file: any) => {
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

    setImgCover(img_base64);
    const d = Map(createImgReward).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImgReward(d.toJS());
  };
  const onPreviewImg = async () => {
    let src = imgReward;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgReward);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onRemoveImg = () => {
    setImgCover(undefined);
    setCreateImgReward(UploadImageEntity_INTI);
    form.setFieldValue("imgCover", null);
  };
  const onChangeImgButton = async (e: any) => {
    const source = e.target.files[0];
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

    setImgButton(img_base64);
    const d = Map(createImgButton).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImgButton(d.toJS());
  };

  const onChangeImgReward = async (file: any) => {
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

    setImgReward(img_base64);
    const d = Map(createImgReward).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImgReward(d.toJS());
  };
  const onChangeImgTableLucky = async (e: any) => {
    const source = e.target.files[0];
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

    setImgTableLucky(img_base64);
    const d = Map(createImgTableLucky).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImgTableLucky(d.toJS());
  };
  const onRemoveImgReward = () => {
    setImgReward(undefined);
  };
  const onRemoveImgButton = () => {
    setImgButton(undefined);
  };
  const onRemoveImgTableLucky = () => {
    setImgTableLucky(undefined);
  };
  const disabledDateChange = (current: any) => {
    const getValueDate = form.getFieldsValue();
    const startDate = moment(getValueDate.startExchangeDate).format(
      "YYYY-MM-DD"
    );
    return current && current < dayjs(startDate);
  };
  const renderData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลชาเลนจ์" />
        <Form form={form} className="p-5">
          <div className="row">
            <div className="form-group text-center pt-2">
              <Form.Item
                name="imgCover"
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่รูปภาพ!",
                  },
                ]}
              >
                <div
                  className="hiddenFileInputQuota"
                  style={{
                    backgroundImage: `url(${
                      imgCover == undefined ? uploadImgQuota : imgCover
                    })`,
                  }}
                >
                  <input
                    key={imgCover}
                    type="file"
                    onChange={onChangeImg}
                    title="เลือกรูป"
                  />
                </div>
              </Form.Item>
              <div>
                {imgCover != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewImg}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={onRemoveImg}
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
            <p className="text-center text-danger pt-3">
              *รูปภาพจะต้องมีสัดส่วน 1:1 หรือ 375px * 375px เท่านั้น
              เพื่อความสวยงามของภาพในแอปพลิเคชัน*
            </p>
          </div>
          <div>
            <div className="form-group col-lg-12">
              <label>
                ชื่อชาเลนจ์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="nameChallenge"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อชาเลนจ์!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อชาเลนจ์"
                  autoComplete="off"
                  onChange={(e) => {
                    setNameChallenge(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>
                รายละเอียด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="detail"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรายละเอียด!",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="กรอกรายละเอียด"
                  autoComplete="off"
                  onChange={(e) => {
                    setDetail(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>
                รูปภาพปุ่มชาเลนจ์ <span style={{ color: "red" }}>*</span>
              </label>
              <div className="form-group col-lg-6 p-3">
                <div className="pt-2">
                  <div
                    className="row"
                    style={{
                      border: imgButton && "dotted",
                      borderWidth: imgButton && 0.5,
                      borderRadius: imgButton && "8px",
                      width: imgButton && 600,
                      height: imgButton && 90,
                      paddingLeft: imgButton && 26,
                    }}
                  >
                    <div className="col-lg align-self-center">
                      <span
                        style={{
                          backgroundImage: `url(${imgButton})`,
                          display: imgButton != undefined ? "block" : "none",
                          width: "65px",
                          height: "90px",
                          overflow: "hidden",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "100%",
                        }}
                      />
                    </div>
                    <div className="col-lg-8 align-self-center">
                      <span>{imgButton && createImgButton.file.name}</span>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <span>
                        {imgButton && (
                          <DeleteOutlined
                            style={{ fontSize: 20, color: color.Error }}
                            onClick={onRemoveImgButton}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="hiddenFileBtn"
                  style={{
                    backgroundImage: `url(${image.upload_Img_btn})`,
                    display: imgButton == undefined ? "block" : "none",
                  }}
                >
                  <input
                    key={imgButton}
                    type="file"
                    onChange={onChangeImgButton}
                    title="เลือกรูป"
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="form-group col-lg-12">
              <label>
                ชื่อของรางวัล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="nameReward"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อของรางวัล!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อของรางวัล"
                  autoComplete="off"
                  onChange={(e) => {
                    setNameReward(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>
                รูปภาพของรางวัล <span style={{ color: "red" }}>*</span>
              </label>
              <div className="row">
                <div className="form-group col-lg-6 p-3">
                  <div className="pb-2 pt-2">
                    <div
                      className="row"
                      style={{
                        border: imgReward && "dotted",
                        borderWidth: imgReward && 0.5,
                        borderRadius: imgReward && "8px",
                        width: imgReward && 600,
                        height: imgReward && 90,
                        paddingLeft: imgReward && 26,
                      }}
                    >
                      <div className="col-lg align-self-center">
                        <span
                          style={{
                            backgroundImage: `url(${imgReward})`,
                            display: imgReward != undefined ? "block" : "none",
                            width: "65px",
                            height: "90px",
                            overflow: "hidden",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                          }}
                        />
                      </div>
                      <div className="col-lg-8 align-self-center">
                        <span>{imgReward && createImgReward.file.name}</span>
                      </div>
                      <div className="col-lg-2 align-self-center">
                        <span>
                          {imgReward && (
                            <DeleteOutlined
                              style={{ fontSize: 20, color: color.Error }}
                              onClick={onRemoveImgReward}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="hiddenFileBtn"
                    style={{
                      backgroundImage: `url(${image.upload_Img_btn})`,
                      display: imgReward == undefined ? "block" : "none",
                    }}
                  >
                    <input
                      key={imgReward}
                      type="file"
                      onChange={onChangeImgReward}
                      title="เลือกรูป"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className="row">
              <div className="col-lg-6">
                <label>
                  วันเริ่มต้น<span style={{ color: color.Error }}>*</span>
                </label>
                <div className="d-flex">
                  <Form.Item
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกวันที่!",
                      },
                    ]}
                  >
                    <DatePicker
                      disabled={
                        checkStatus === "ACTIVE" || checkStatus === "INACTIVE"
                      }
                      placeholder="เลือกวันที่"
                      onChange={(val) => {
                        // setStartExchangeDate(val);
                      }}
                      format={dateFormat}
                    />
                  </Form.Item>
                  <Form.Item
                    name="startExchangeTime"
                    initialValue={moment("00:00", "HH:mm")}
                  >
                    <TimePicker
                      disabled={
                        checkStatus === "ACTIVE" || checkStatus === "INACTIVE"
                      }
                      format={"HH:mm"}
                      className="ms-3"
                      placeholder="เลือกเวลา"
                      onChange={(val) => {
                        // setStartExchangeTime(val);
                      }}
                      defaultValue={moment("00:00", "HH:mm")}
                      allowClear={false}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="col-lg-6">
                <label>
                  วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
                </label>
                <div className="d-flex">
                  <Form.Item
                    name="endDate"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกวันที่!",
                      },
                    ]}
                  >
                    <DatePicker
                      disabled={checkStatus === "INACTIVE"}
                      placeholder="เลือกวันที่"
                      onChange={(val) => {
                        // setEndExchangeDate(val);
                      }}
                      format={dateFormat}
                      disabledDate={disabledDateChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="endTime"
                    initialValue={moment("23:59", "HH:mm")}
                  >
                    <TimePicker
                      disabled={checkStatus === "INACTIVE"}
                      format={"HH:mm"}
                      className="ms-3"
                      placeholder="เลือกเวลา"
                      onChange={(val) => {
                        // setEndExchangeTime(val);
                      }}
                      defaultValue={moment("23:59", "HH:mm")}
                      allowClear={false}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <label>
                  จำนวนไร่/สิทธิ์ <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="raiAmount"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกจำนวน!",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      checkStatus === "ACTIVE" || checkStatus === "INACTIVE"
                    }
                    placeholder="กรอกจำนวน"
                    autoComplete="off"
                    suffix={"ไร่/สิทธิ์"}
                    onChange={(e) => {
                      setRaiAmount(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-4">
                <label>
                  รอบการจับรางวัล <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="luckyDraw"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกจำนวนรอบ!",
                    },
                  ]}
                >
                  <Input
                    disabled={checkStatus === "INACTIVE"}
                    placeholder="กรอกจำนวนรอบ"
                    autoComplete="off"
                  />
                </Form.Item>
              </div>
            </div>
            <Divider />
            <div className="form-group col-lg-12">
              <label>
                ตารางจับรางวัล <span style={{ color: "red" }}>*</span>
              </label>
              <div className="form-group col-lg-6 p-3">
                <div className="pb-2 pt-2">
                  <div
                    className="row"
                    style={{
                      border: imgTableLucky && "dotted",
                      borderWidth: imgTableLucky && 0.5,
                      borderRadius: imgTableLucky && "8px",
                      width: imgTableLucky && 600,
                      height: imgTableLucky && 90,
                      paddingLeft: imgTableLucky && 26,
                    }}
                  >
                    <div className="col-lg align-self-center">
                      <span
                        style={{
                          backgroundImage: `url(${imgTableLucky})`,
                          display:
                            imgTableLucky != undefined ? "block" : "none",
                          width: "65px",
                          height: "90px",
                          overflow: "hidden",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "100%",
                        }}
                      />
                    </div>
                    <div className="col-lg-8 align-self-center">
                      <span>
                        {imgTableLucky && createImgTableLucky.file.name}
                      </span>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <span>
                        {imgTableLucky && (
                          <DeleteOutlined
                            style={{ fontSize: 20, color: color.Error }}
                            onClick={onRemoveImgTableLucky}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="hiddenFileBtn"
                  style={{
                    backgroundImage: `url(${image.upload_Img_btn})`,
                    display: imgTableLucky == undefined ? "block" : "none",
                  }}
                >
                  <input
                    key={imgTableLucky}
                    type="file"
                    onChange={onChangeImgTableLucky}
                    title="เลือกรูป"
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-lg-12">
              <label>
                กติกาและเงื่อนไข <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="condition"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกกติกาและเงื่อนไข!",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="กรอกกติกาและเงื่อนไข"
                  autoComplete="off"
                  defaultValue={condition}
                />
              </Form.Item>
            </div>
            <Divider />
            <div className="row">
              <div className="form-group col-lg-12 d-flex flex-column">
                <label>
                  สถานะ<span style={{ color: "red" }}> *</span>
                </label>
                <Form.Item
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกสถานะ",
                    },
                  ]}
                >
                  <Radio.Group className="d-flex flex-column">
                    {(checkStatus === "ACTIVE" && (
                      <>
                        <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                        <Radio value={"DRAFTING"}>ปิดการใช้งาน</Radio>
                      </>
                    )) ||
                      (checkStatus === "DRAFTING" && (
                        <>
                          <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                          <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
                        </>
                      )) ||
                      (checkStatus === "INACTIVE" && (
                        <>
                          <Radio value={"INACTIVE"}>ปิดการใช้งาน</Radio>
                        </>
                      ))}
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const renderMobile = (
    <div className="col-lg-4">
      <RenderQuota
        imgCover={imgCover}
        nameChallenge={nameChallenge}
        detailChallenge={detail}
        imgButton={imgButton}
        nameReward={nameReward}
        imgReward={imgReward}
        raiAmount={raiAmount}
      />
    </div>
  );

  return (
    <>
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>แก้ไขชาเลนจ์</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderData}
        {renderMobile}
      </Row>

      <FooterPage
        disableSaveBtn={saveBtnDisable}
        onClickBack={() => navigate(-1)}
        // onClickSave={onSubmit}
      />
    </>
  );
}

export default EditQuota;
