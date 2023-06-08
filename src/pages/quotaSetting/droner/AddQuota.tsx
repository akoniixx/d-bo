import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  TimePicker,
  Upload,
  UploadFile,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../../entities/UploadImageEntities";
import { resizeFileImg } from "../../../utilities/ResizeImage";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import { color, image } from "../../../resource";
import { formats, modules } from "../../../components/editor/EditorToolbar";
import { BackIconButton } from "../../../components/button/BackButton";
import { FooterPage } from "../../../components/footer/FooterPage";
import RenderReward from "../../../components/mobile/RenderReward";
import moment from "moment";
import { RewardDatasource } from "../../../datasource/RewardDatasource";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { validateOnlyNumber } from "../../../utilities/TextFormatter";
import RenderQuota from "../../../components/mobile/RenderQuota";
import uploadImgQuota from "../../../resource/media/empties/upload_img_quota.png";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

const { Map } = require("immutable");

function AddQuota() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const dateFormat = "DD/MM/YYYY";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imgReward, setImgReward] = useState<any>();
  const [createImgReward, setCreateImgReward] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );

  const [rewardType, setRewardType] = useState<string | null>(null);
  const [rewardName, setRewardName] = useState<string | null>(null);
  const [rewardExchange, setRewardExchange] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [amount, setAmount] = useState<any>();
  const [score, setScore] = useState<any>();
  const [rewardStatus, setRewardStatus] = useState<any>();
  const [startExchangeDate, setStartExchangeDate] = useState<any>();
  const [startExchangeTime, setStartExchangeTime] = useState<any>();
  const [EndExchangeDate, setEndExchangeDate] = useState<any>();
  const [EndExchangeTime, setEndExchangeTime] = useState<any>();
  const [startUsedDate, setStartUsedDate] = useState<any>();
  const [startUsedTime, setStartUsedTime] = useState<any>();
  const [endUsedDate, setEndUsedDate] = useState<any>();
  const [endUsedTime, setEndUsedTime] = useState<any>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);

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

    setImgReward(img_base64);
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
    setImgReward(undefined);
    setCreateImgReward(UploadImageEntity_INTI);
    form.setFieldValue("file", null);
    onFieldsChange();
  };
  const handleRewardType = (type: string) => {
    setRewardType(type);
  };
  const onChangePoint = (point: any) => {
    setRewardExchange(point.target.value);
  };
  const handleDescription = (des: string) => {
    setDescription(des);
  };
  const handleCondition = (con: string) => {
    setCondition(con);
  };

  const handleRewardPoint = (point: any) => {
    setScore(point.target.value);
  };
  let start = new Date(startUsedDate).getTime();
  let expired = new Date(endUsedDate).getTime();
  let result = (expired - start) / 86400000;
  const disabledDateChange = (current: any) => {
    const getValueDate = form.getFieldsValue();
    const startDate = moment(getValueDate.startExchangeDate).format(
      "YYYY-MM-DD"
    );
    return current && current < dayjs(startDate);
  };
  const disabledDateUsed = (current: any) => {
    const getValueDate = form.getFieldsValue();
    const startDate = moment(getValueDate.startUsedDate).format("YYYY-MM-DD");
    return current && current < dayjs(startDate);
  };
  const onFieldsChange = () => {
    const {
      rewardName,
      rewardType,
      rewardExchange,
      score,
      amount,
      description,
      condition,
      status,
      startExchangeDate,
      startExchangeTime,
      expiredExchangeDate,
      expiredExchangeTime,
      startUsedDate,
      startUsedTime,
      expiredUsedDate,
      expiredUsedTime,
      file,
    } = form.getFieldsValue();

    let fieldErr = false;
    let imgErr = false;
    let rwTypeErr = false;

    if (
      rewardName &&
      amount > 0 &&
      description != "<p><br></p>" &&
      condition != "<p><br></p>" &&
      status
    ) {
      fieldErr = false;
    } else {
      fieldErr = true;
    }

    if (rewardType === "DIGITAL" && rewardExchange === "SCORE") {
      if (
        score > 0 &&
        amount > 0 &&
        startUsedDate &&
        endUsedDate &&
        startExchangeDate &&
        expiredExchangeDate
      ) {
        rwTypeErr = false;
      } else {
        rwTypeErr = true;
      }
    } else if (rewardType === "DIGITAL" && rewardExchange === "MISSION") {
      if (amount > 0 && startUsedDate && endUsedDate) {
        rwTypeErr = false;
      } else {
        rwTypeErr = true;
      }
    } else if (rewardType === "PHYSICAL" && rewardExchange === "SCORE") {
      if (score > 0 && amount > 0 && startExchangeDate && expiredExchangeDate) {
        rwTypeErr = false;
      } else {
        rwTypeErr = true;
      }
    } else if (rewardType === "PHYSICAL" && rewardExchange === "MISSION") {
      if (amount > 0) {
        rwTypeErr = false;
      } else {
        rwTypeErr = true;
      }
    } else {
      rwTypeErr = true;
    }
    if (!file) {
      imgErr = true;
    } else {
      imgErr = false;
    }
    setBtnSaveDisable(fieldErr || imgErr || rwTypeErr);
  };
  const checkNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value: inputValue } = e.target;
    const convertedNumber = validateOnlyNumber(inputValue);
    form.setFieldsValue({ [name]: convertedNumber });
  };
  const renderDataReward = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลชาเลนจ์" />
        <Form form={form} onFieldsChange={onFieldsChange}>
          <div className="row">
            <div className="form-group text-center pt-4">
              <Form.Item
                name="img"
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
                      imgReward == undefined ? uploadImgQuota : imgReward
                    })`,
                  }}
                >
                  <input
                    key={imgReward}
                    type="file"
                    onChange={onChangeImg}
                    title="เลือกรูป"
                  />
                </div>
              </Form.Item>
              <div>
                {imgReward != undefined && (
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
          </div>
          <p className="text-center text-danger pt-3 pb-4">
            *รูปภาพจะต้องมีสัดส่วน 1:1 หรือ 375px * 375px เท่านั้น
            เพื่อความสวยงามของภาพในแอปพลิเคชัน*
          </p>
          <div style={{ padding: 30 }}>
            <div className="form-group col-lg-12">
              <label>
                ชื่อชาเลนจ์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="rewardName"
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
                    setRewardName(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>
                รายละเอียด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="rewardName"
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
                    setRewardName(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>
                รูปภาพปุ่มชาเลนจ์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="img"
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่รูปภาพ!",
                  },
                ]}
              >
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  defaultFileList={imgReward}
                >
                  {!imgReward &&
                    <Button
                    style={{
                      color: color.primary1,
                      backgroundColor: "rgba(33, 150, 83, 0.1)",
                      borderRadius: "8px",
                      borderColor: color.Success,
                      borderStyle: "dotted",
                    }}
                  >
                    อัปโหลดรูปภาพ
                  </Button>}
                
                </Upload>
              </Form.Item>
            </div>
            <div className="row pt-3">
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
                  <Radio.Group
                    className="d-flex flex-column"
                    onChange={(e) => setRewardStatus(e.target.value)}
                  >
                    <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                    <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const renderRedeem = (
    <div className="col-lg-4">
      <RenderQuota
        imgCover={undefined}
        nameChallenge={undefined}
        detailChallenge={undefined}
        imgButton={undefined}
        nameReward={undefined}
        imgReward={undefined}
        raiAmount={undefined}
      />
    </div>
  );
  const onSubmit = () => {
    const {
      rewardName,
      rewardType,
      rewardExchange,
      score,
      amount,
      description,
      condition,
      status,
      startExchangeDate,
      startExchangeTime,
      expiredExchangeDate,
      expiredExchangeTime,
      startUsedDate,
      startUsedTime,
      expiredUsedDate,
      expiredUsedTime,
    } = form.getFieldsValue();
    const startDate = new Date(
      moment(startExchangeDate).format("YYYY-MM-DD") +
        " " +
        moment(startExchangeTime).format("HH:mm:ss")
    ).getTime();
    const dateNow = Date.now();
    if (status === "DRAFTING") {
      if (startDate - dateNow > 0) {
        setRewardStatus("ACTIVE");
      } else {
        setRewardStatus("DRAFTING");
      }
    } else {
      setRewardStatus(status);
    }
    RewardDatasource.addReward({
      rewardName: rewardName,
      rewardType: rewardType,
      rewardExchange: rewardExchange,
      score: score,
      amount: amount,
      description: description,
      condition: condition,
      status: rewardStatus,
      startExchangeDate:
        moment(startExchangeDate).format("YYYY-MM-DD") +
        " " +
        moment(startExchangeTime).format("HH:mm:ss"),
      expiredExchangeDate:
        moment(expiredExchangeDate).format("YYYY-MM-DD") +
        " " +
        moment(expiredExchangeTime).format("HH:mm:ss"),
      startUsedDate:
        moment(startUsedDate).format("YYYY-MM-DD") +
        " " +
        moment(startUsedTime).format("HH:mm:ss"),
      expiredUsedDate:
        moment(expiredUsedDate).format("YYYY-MM-DD") +
        " " +
        moment(expiredUsedTime).format("HH:mm:ss"),
      file: createImgReward.file,
      createBy: profile.firstname + " " + profile.lastname,
    })
      .then((res) => {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          navigate("/IndexReward");
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาก",
          icon: "error",
          showConfirmButton: true,
        });
      });
  };

  return (
    <>
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>เพิ่มชาเลนจ์</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderDataReward}
        {renderRedeem}
      </Row>

      <FooterPage
        disableSaveBtn={saveBtnDisable}
        onClickBack={() => navigate(-1)}
        // onClickSave={onSubmit}
      />
    </>
  );
}

export default AddQuota;
