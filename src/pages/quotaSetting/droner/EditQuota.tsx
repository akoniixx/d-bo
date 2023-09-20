import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  TimePicker,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
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
import dayjs from "dayjs";
import RenderQuota from "../../../components/mobile/RenderQuota";
import uploadImgQuota from "../../../resource/media/empties/upload_img_quota.png";
import TextArea from "antd/lib/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import { validateOnlyNumber } from "../../../utilities/TextFormatter";
import Swal from "sweetalert2";
import ActionButton from "../../../components/button/ActionButton";

const { Map } = require("immutable");
const _ = require("lodash");
function EditQuota() {
  let queryString = _.split(window.location.pathname, "=");
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imgReward, setImgReward] = useState<any>();
  const [imgCover, setImgCover] = useState<any>();
  const [imgButton, setImgButton] = useState<any>();
  const [imgTableLucky, setImgTableLucky] = useState<any>();
  const [nameChallenge, setNameChallenge] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [nameReward, setNameReward] = useState<string | null>(null);
  const [raiAmount, setRaiAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
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
  const [checkDup, setCheckDup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rewardRound, setRewardRound] = useState<
    { index: number; dateRound: string }[]
  >([{ index: 1, dateRound: "" }]);
  const [count, setCount] = useState(1);

  const fetchQuota = () => {
    CampaignDatasource.getCampaignById(queryString[1]).then((res) => {
      setCount(res.roundDate.length);
      setRewardRound(
        res.roundDate.map((el: any, index: any) => {
          return {
            ...el,
            index: index + 1,
            dateRound: el,
          };
        })
      );
      const checkIsEdit = () => {
        if (res.status === "ACTIVE") {
          setIsActive(
            moment(res.startDate).format(dateSearchFormat) <=
              moment(Date()).format(dateSearchFormat)
              ? true
              : false
          );
        } else if (res.status === "INACTIVE") {
          setIsEdit(
            moment(res.endDate).format(dateSearchFormat) <
              moment(Date()).toISOString()
              ? true
              : false
          );
          setIsActive(
            moment(res.endDate).format(dateSearchFormat) <
              moment(Date()).toISOString()
              ? true
              : false
          );
        }
      };
      checkIsEdit();
      form.setFieldsValue({
        campaignName: res.campaignName,
        description: res.description,
        rulesCampaign: res.rulesCampaign,
        rewardName: res.condition[0].rewardName,
        rai: res.condition[0].rai,
        rewardRound: res.condition[0].rewardRound,
        status: res.status,
        startDate: !res.startDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startDate).toUTCString()),
        endDate: !res.endDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.endDate).toUTCString()),
        startTime: !res.startDate
          ? moment(new Date().getTime())
          : moment(new Date(res.startDate).getTime()),
        endTime: !res.endDate
          ? moment(new Date().getTime())
          : moment(new Date(res.endDate).getTime()),
      });
      res.roundDate.forEach((x: any, i: number) => {
        form.setFieldValue(`${i + 1}_roundDate`, moment(x));
      });
      setNameChallenge(res.campaignName);
      setNameReward(res.condition[0].rewardName);
      setDetail(res.description);
      setRaiAmount(res.condition[0].rai);
      setStartDate(moment(new Date(res.startDate).toUTCString()));
      setEndDate(moment(new Date(res.endDate).toUTCString()));
      setImgCover(res.pathImageBanner);
      setImgReward(res.pathImageReward);
      setImgButton(res.pathImageFloating);
      setImgTableLucky(res.pathImageRewardRound);
    });
  };

  useEffect(() => {
    fetchQuota();
  }, [checkDup]);

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
    const d = Map(createImgCover).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImgCover(d.toJS());
  };
  const onPreviewImg = async () => {
    let src = imgCover;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgCover);
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
    const startDate = moment(getValueDate.startDate).format("YYYY-MM-DD");
    return current && current < dayjs(startDate);
  };
  const checkNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value: inputValue } = e.target;
    const convertedNumber = validateOnlyNumber(inputValue);
    form.setFieldsValue({ [name]: convertedNumber });
  };
  const checkDupCampiagn = async () => {
    const getForm = form.getFieldsValue();
    let startDate = new Date(
      moment(getForm.startDate).format("YYYY-MM-DD")
    ).toISOString();
    let endDate = new Date(
      moment(getForm.endDate).format("YYYY-MM-DD")
    ).toISOString();
    let application = "DRONER";
    let check = await CampaignDatasource.checkDupCampaign(
      "QUATA",
      startDate,
      endDate,
      application,
      queryString[1]
    ).then((res) => {
      if (!res.success) {
        setCheckDup(true);
      } else {
        setCheckDup(false);
      }
      return !res.success;
    });
    return check;
  };
  const newDataRound = useMemo(() => {
    if (rewardRound.length > 0) {
      const d = rewardRound.map((el: any, index: any) => {
        return {
          ...el,
          index: index + 1,
        };
      });
      return d;
    }
  }, [rewardRound]);

  const mapRound = (e: any) => {
    const mapList = e;
    const sTable = form.getFieldsValue();
    const value = mapList.map((y: any, i: number) => {
      return {
        ...y,
        index: i + 1,
        dateRound: sTable[`${y.index}_roundDate`],
      };
    });
    return value;
  };
  const mapForm = (e: any) => {
    const mapList = e;
    mapList.map((y: any, i: number) => {
      form.setFieldValue(`${y.index}_roundDate`, y.dateRound);
    });
  };
  const addRound = () => {
    setCount(count + 1);
    const addList = mapRound([
      ...rewardRound,
      { index: rewardRound.length + 1, dateRound: "" },
    ]);
    setRewardRound(addList);
  };
  const deleteRound = async (index: number) => {
    const mapData = await mapRound(rewardRound);
    const filter = mapData.filter((x: any) => x.index !== index);
    const mData = await mapRound(filter);
    mapForm(mData);
    setRewardRound(filter);
    setCount(count - 1);
    form.setFieldValue(`${filter.length + 1}_roundDate`, "");
  };
  const disabledDate = (current: any) => {
    const v = form.getFieldsValue();
    return current && current < dayjs(v.startDate);
  };
  const checkLimit = () => {
    const v = form.getFieldsValue();
    const d = [];
    if (count > 1) {
      for (let i = 0; count > i; i++) {
        d.push(v[`${i + 1}_roundDate`]);
      }
    }
    if (d.length > 0) {
      if (d[0] < d[1] && d[d.length - 2] <= d[d.length - 1]) {
        return false;
      } else {
        return true;
      }
    }
  };

  const columns = [
    {
      title: "รอบที่",
      width: "40%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <div className="pb-4">{row.index}</div>,
        };
      },
    },
    {
      title: "วันที่การจับรางวัล",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        const f = form.getFieldsValue();
        const isDisable = () => {
          if (row.dateRound) {
            return dayjs() > row.dateRound;
          }
          return f.startDate ? false : true;
        };
        return {
          children: (
            <Form.Item
              name={`${row.index}_roundDate`}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกวันที่!",
                },
                {
                  validator: (rules, value) => {
                    return new Promise(async (resolve, reject) => {
                      if (checkLimit()) {
                        reject("วันที่ต้องไม่น้อยกว่าวันที่ก่อนหน้า");
                      } else {
                        resolve("");
                      }
                    });
                  },
                },
              ]}
            >
              <DatePicker
                placeholder="เลือกวันที่"
                format={dateFormat}
                disabledDate={disabledDate}
                disabled={isDisable()}
              />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      width: "8%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="pb-4">
              <ActionButton
                icon={<DeleteOutlined />}
                color={count > 1 ? color.Error : color.Grey}
                actionDisable={count > 1 ? false : true}
                onClick={() => deleteRound(row.index)}
              />
            </div>
          ),
        };
      },
    },
  ];

  const onSubmit = async () => {
    await form.validateFields();
    const f = form.getFieldsValue();
    const create: any = {};
    const reward: any = {};

    const roundDate: any = [];
    if (count >= 1) {
      for (let i = 0; count > i; i++) {
        roundDate.push(moment(f[`${i + 1}_roundDate`]).format("YYYY-MM-DD"));
      }
    }

    reward.num = 1;
    reward.quata = 1;
    reward.rewardName = f.rewardName;
    reward.rewardRound = roundDate.length;
    reward.rai = f.rai;

    create.startDate = new Date(
      moment(f.startDate).format("YYYY-MM-DD") +
        " " +
        moment(f.startTime).format("HH:mm:ss")
    ).toISOString();
    create.endDate = new Date(
      moment(f.endDate).format("YYYY-MM-DD") +
        " " +
        moment(f.endTime).format("HH:mm:ss")
    ).toISOString();
    create.campaignName = f.campaignName;
    create.application = "DRONER";
    create.condition = JSON.stringify(reward);
    create.description = f.description;
    create.rulesCampaign = f.rulesCampaign;
    create.campaignType = "QUATA";
    create.status = f.status;
    create.updateBy = profile.firstname + " " + profile.lastname;
    create.roundDate = roundDate;
    CampaignDatasource.updateCampaignQuota(
      queryString[1],
      create,
      createImgCover,
      createImgButton,
      createImgReward,
      createImgTableLucky
    ).then((res) => {
      if (res.success) {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          navigate("/IndexQuota");
        });
      }
    });
  };

  const renderData = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลชาเลนจ์" />
      <Form form={form} className="p-5">
        <div className="row">
          <div className="form-group text-center pt-2">
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

        <div className="form-group col-lg-12">
          <label>
            ชื่อชาเลนจ์ <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="campaignName"
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
            name="description"
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
          <div className="form-group col-lg-12">
            <div className="p-2">
              <Row
                style={{
                  border: imgButton && "dotted",
                  borderWidth: imgButton && 0.5,
                  borderRadius: imgButton && "8px",
                  width: imgButton && "100%",
                  height: imgButton && 90,
                  paddingLeft: imgButton && 5,
                }}
                gutter={8}
              >
                <Col span={4} className="align-self-center">
                  <span
                    style={{
                      backgroundImage: `url(${imgButton})`,
                      display: imgButton != undefined ? "block" : "none",
                      width: "65px",
                      height: "65px",
                      overflow: "hidden",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "100%",
                    }}
                  />
                </Col>
                <Col span={18} className="align-self-center">
                  <span>{imgButton && createImgButton.file.name}</span>
                </Col>
                <Col span={2} className="align-self-center">
                  <span>
                    {imgButton && (
                      <DeleteOutlined
                        style={{ fontSize: 20, color: color.Error }}
                        onClick={onRemoveImgButton}
                      />
                    )}
                  </span>
                </Col>
              </Row>
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
            name="rewardName"
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
          <div className="form-group col-lg-12">
            <div className="p-2">
              <Row
                style={{
                  border: imgReward && "dotted",
                  borderWidth: imgReward && 0.5,
                  borderRadius: imgReward && "8px",
                  width: imgReward && "100%",
                  height: imgReward && 90,
                  paddingLeft: imgReward && 5,
                }}
                gutter={8}
              >
                <Col span={4} className="align-self-center">
                  <span
                    style={{
                      backgroundImage: `url(${imgReward})`,
                      display: imgReward != undefined ? "block" : "none",
                      width: "65px",
                      height: "65px",
                      overflow: "hidden",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "100%",
                    }}
                  />
                </Col>
                <Col span={18} className="align-self-center">
                  <span>{imgReward && createImgReward.file.name}</span>
                </Col>
                <Col span={2} className="align-self-center">
                  <span>
                    {imgReward && (
                      <DeleteOutlined
                        style={{ fontSize: 20, color: color.Error }}
                        onClick={onRemoveImgReward}
                      />
                    )}
                  </span>
                </Col>
              </Row>
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
                  {
                    validator: (rules, value) => {
                      return new Promise(async (resolve, reject) => {
                        if (await checkDupCampiagn()) {
                          reject("");
                        } else {
                          resolve(true);
                        }
                      });
                    },
                  },
                ]}
              >
                <DatePicker
                  placeholder="เลือกวันที่"
                  onChange={(val) => {
                    setStartDate(val);
                  }}
                  format={dateFormat}
                  disabled={isActive}
                />
              </Form.Item>
              <Form.Item
                name="startTime"
                initialValue={moment("00:00", "HH:mm")}
              >
                <TimePicker
                  format={"HH:mm"}
                  className="ms-3"
                  placeholder="เลือกเวลา"
                  defaultValue={moment("00:00", "HH:mm")}
                  allowClear={false}
                  disabled={isActive}
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
                  {
                    validator: (rules, value) => {
                      return new Promise(async (resolve, reject) => {
                        if (await checkDupCampiagn()) {
                          reject("");
                        } else {
                          resolve(true);
                        }
                      });
                    },
                  },
                ]}
              >
                <DatePicker
                  placeholder="เลือกวันที่"
                  onChange={(val) => {
                    setEndDate(val);
                  }}
                  format={dateFormat}
                  disabledDate={disabledDateChange}
                  disabled={isEdit}
                />
              </Form.Item>
              <Form.Item name="endTime" initialValue={moment("23:59", "HH:mm")}>
                <TimePicker
                  format={"HH:mm"}
                  className="ms-3"
                  placeholder="เลือกเวลา"
                  defaultValue={moment("23:59", "HH:mm")}
                  allowClear={false}
                  disabled={isEdit}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <label>
              จำนวนไร่/สิทธิ์ <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="rai"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวน!",
                },
              ]}
            >
              <Input
                placeholder="กรอกจำนวน"
                autoComplete="off"
                suffix={"ไร่/สิทธิ์"}
                onChange={(e) => {
                  checkNumber(e, "rai");
                  setRaiAmount(e.target.value);
                }}
                disabled={isActive}
              />
            </Form.Item>
          </div>
        </div>
        <Divider />
        <Row>
          <Col span={21}>
            <label>
              รอบการจับรางวัล{" "}
              <span style={{ color: color.Error }}>
                * วันที่ในการจับรางวัลต้องไม่ซ้ำกัน และไม่ตรงกันกับรอบก่อนหน้า
              </span>
            </label>
          </Col>
          <Col span={2}>
            <Button
              style={{
                borderColor: "rgba(33, 150, 83, 0.1)",
                borderRadius: "5px",
                color: color.Success,
                backgroundColor: "rgba(33, 150, 83, 0.1)",
              }}
              onClick={() => addRound()}
            >
              เพิ่มรอบ
            </Button>
          </Col>
        </Row>
        <br />
        <Table columns={columns} dataSource={newDataRound} pagination={false} />
        <div className="form-group col-lg-12">
          <label>
            ตารางจับรางวัล <span style={{ color: "red" }}>*</span>
          </label>
          <div className="form-group col-lg-12">
            <div className="p-2">
              <Row
                style={{
                  border: imgTableLucky && "dotted",
                  borderWidth: imgTableLucky && 0.5,
                  borderRadius: imgTableLucky && "8px",
                  width: imgTableLucky && "100%",
                  height: imgTableLucky && 90,
                  paddingLeft: imgTableLucky && 5,
                }}
                gutter={8}
              >
                <Col span={4} className="align-self-center">
                  <span
                    style={{
                      backgroundImage: `url(${imgTableLucky})`,
                      display: imgTableLucky != undefined ? "block" : "none",
                      width: "65px",
                      height: "65px",
                      overflow: "hidden",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "100%",
                    }}
                  />
                </Col>
                <Col span={18} className="align-self-center">
                  <span>{imgTableLucky && createImgTableLucky.file.name}</span>
                </Col>
                <Col span={2} className="align-self-center">
                  <span>
                    {imgTableLucky && (
                      <DeleteOutlined
                        style={{ fontSize: 20, color: color.Error }}
                        onClick={onRemoveImgTableLucky}
                      />
                    )}
                  </span>
                </Col>
              </Row>
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
        <br />
        <div className="form-group col-lg-12">
          <label>
            กติกาและเงื่อนไข <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="rulesCampaign"
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
            />
          </Form.Item>
        </div>
        <Divider />
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
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>
      </Form>
    </CardContainer>
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
      <Row justify={"space-between"} gutter={16}>
        <Col span={16}>{renderData}</Col>
        <Col span={8}>
          <RenderQuota
            imgCover={imgCover}
            nameChallenge={nameChallenge}
            detailChallenge={detail}
            imgButton={imgButton}
            nameReward={nameReward}
            imgReward={imgReward}
            raiAmount={raiAmount}
            startDate={startDate}
            endDate={endDate}
          />
        </Col>
      </Row>
      <FooterPage
        styleFooter={{ padding: "6px" }}
        onClickBack={() => navigate(-1)}
        onClickSave={onSubmit}
      />
    </>
  );
}

export default EditQuota;
