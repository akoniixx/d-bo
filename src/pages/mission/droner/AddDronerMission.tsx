import {
  DeleteOutlined,
  DownCircleFilled,
  UpCircleFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Table,
  TimePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import { RewardDatasource } from "../../../datasource/RewardDatasource";
import {
  CampaignConditionEntity,
  CampaignConditionEntity_INIT,
} from "../../../entities/CampaignPointEntites";
import { GetAllRewardEntities } from "../../../entities/RewardEntites";
import { color } from "../../../resource";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { validateOnlyNumWDecimal } from "../../../utilities/TextFormatter";

const AddDronerMission = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();
  const [formTable] = Form.useForm();
  const [rewardList, setRewardList] = useState<GetAllRewardEntities>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [dataSubMission, setDataSubMission] = useState<
    CampaignConditionEntity[]
  >([CampaignConditionEntity_INIT]);
  const [count, setCount] = useState(1);
  const [campaignType, setCampaignType] = useState<string>();

  const fetchRewardList = () => {
    RewardDatasource.getAllReward(
      0,
      0,
      "",
      "",
      "ACTIVE",
      ["PHYSICAL", "DIGITAL"],
      ""
    ).then((res) => {
      console.log(res);
      setRewardList(res);
    });
  };

  const countExpand = () => {
    const allCount = [];
    for (let i = 0; 50 > i; i++) {
      allCount.push(i + 1);
    }
    return allCount;
  };

  useEffect(() => {
    fetchRewardList();
  }, [count]);

  const mapCondition = (e: any) => {
    const mapList = e;
    const sTable = formTable.getFieldsValue();
    const value = mapList.map((y: any, i: number) => {
      return {
        ...y,
        num: i + 1,
        missionName: sTable[`${y.num}_missionName`],
        rai: sTable[`${y.num}_rai`],
        rewardId: sTable[`${y.num}_rewardId`],
        descriptionReward: sTable[`${y.num}_description`],
        conditionReward: sTable[`${y.num}_condition`],
      };
    });
    return value;
  };

  const mapForm = (e: any) => {
    const mapList = e;
    mapList.map((y: any, i: number) => {
      formTable.setFieldValue(`${y.num}_description`, y.descriptionReward);
      formTable.setFieldValue(`${y.num}_condition`, y.conditionReward);
      formTable.setFieldValue(`${y.num}_missionName`, y.missionName);
      formTable.setFieldValue(`${y.num}_rai`, y.rai);
      formTable.setFieldValue(`${y.num}_rewardId`, y.rewardId);
    });
  };

  const newDataSubMission = useMemo(() => {
    if (dataSubMission.length > 0) {
      const d = dataSubMission.map((el: any, index: any) => {
        return {
          ...el,
          key: index + 1,
          num: index + 1,
        };
      });
      return d;
    }
  }, [dataSubMission]);

  const disabledDateStart = (current: any) => {
    return current && current < dayjs();
  };
  const disabledDateEnd = (current: any) => {
    const f = form.getFieldsValue();
    const startDate = moment(f.startDate).format("YYYY-MM-DD");
    return current && current < dayjs(startDate);
  };

  const addRow = () => {
    setCount(count + 1);
    const addList = mapCondition([
      ...dataSubMission,
      { ...CampaignConditionEntity_INIT, num: dataSubMission.length + 1 },
    ]);
    setDataSubMission(addList);
  };

  const removeRow = async (key: number) => {
    const mapData = await mapCondition(dataSubMission);
    const e = mapData.filter((x: any) => x.num !== key);
    const mData = await mapCondition(e);
    mapForm(mData);
    setDataSubMission(e);
    setCount(count - 1);
    formTable.setFieldValue(`${e.length + 1}_description`, "");
    formTable.setFieldValue(`${e.length + 1}_condition`, "");
    formTable.setFieldValue(`${e.length + 1}_missionName`, "");
    formTable.setFieldValue(`${e.length + 1}_rai`, "");
    formTable.setFieldValue(`${e.length + 1}_rewardId`, "");
  };

  const checkLimit = () => {
    const v = formTable.getFieldsValue();
    const d = [];
    if (count > 1) {
      for (let i = 0; count > i; i++) {
        d.push(parseFloat(v[`${i + 1}_rai`]));
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
  const checkNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value: inputValue } = e.target;
    const convertedNumber = validateOnlyNumWDecimal(inputValue);
    formTable.setFieldsValue({ [name]: convertedNumber });
  };

  const columns = [
    {
      title: "",
      width: "3%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{index + 1}</span>,
        };
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "ชื่อภารกิจย่อย",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={`${row.num}_missionName`}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อภารกิจย่อย",
                },
              ]}
            >
              <Input placeholder="กรอกชื่อภารกิจย่อย" autoComplete="off" />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "จำนวนไร่สะสม",
      dataIndex: "rai",
      width: "18%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={`${row.num}_rai`}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวนไร่",
                },
                {
                  validator: (rules, value) => {
                    return new Promise(async (resolve, reject) => {
                      if (checkLimit()) {
                        reject("จำนวนไร่ต้องไม่น้อยกว่าภารกิจย่อยก่อนหน้า");
                      } else {
                        resolve("");
                      }
                    });
                  },
                },
              ]}
            >
              <Input
                placeholder="กรอกจำนวนไร่"
                suffix="ไร่"
                autoComplete="off"
                onChange={(e) => checkNumber(e, `${row.num}_rai`)}
              />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: campaignType === "MISSION_POINT" ? "แต้ม" : "ชื่อของรางวัล",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {campaignType === "MISSION_POINT" ? (
                <Form.Item
                  style={{ margin: 0 }}
                  name="point"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกกรอกจำนวนแต้ม",
                    },
                  ]}
                >
                  <Input placeholder="กรอกจำนวนแต้ม" suffix="แต้ม" />
                </Form.Item>
              ) : (
                <Form.Item
                  style={{ margin: 0 }}
                  name={`${row.num}_rewardId`}
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกชื่อของรางวัล",
                    },
                  ]}
                >
                  <Select placeholder="เลือกชื่อของรางวัล" allowClear>
                    {rewardList?.data.map((item) => (
                      <option value={item.id}>
                        <Row
                          justify={"start"}
                          gutter={8}
                          style={{ fontSize: "13px" }}
                        >
                          <Col>
                            <img src={item.imagePath} width={20} height={20} />
                          </Col>
                          <Col>{item.rewardName} |</Col>
                          <Col>{item.rewardNo} |</Col>
                          <Col>
                            {item.rewardType === "PHYSICAL"
                              ? "Physical"
                              : "Digital"}
                            <span
                              style={{
                                color:
                                  item.rewardExchange === "MISSION"
                                    ? "#A9CB62"
                                    : "#EA973E",
                              }}
                            >
                              {item.rewardExchange === "MISSION"
                                ? " (ภารกิจ)"
                                : " (ใช้แต้ม)"}
                            </span>
                          </Col>
                        </Row>
                      </option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "",
      width: "3%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-4">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={count > 1 ? color.Error : color.Grey}
                  actionDisable={count > 1 ? false : true}
                  onClick={() => removeRow(row.num)}
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const subMissionTextArea = (recode: any) => {
    return (
      <Row justify={"space-between"} gutter={16}>
        <Col span={12}>
          <label>รายละเอียด</label>
          <Form.Item style={{ margin: 0 }} name={`${recode.num}_description`}>
            <TextArea placeholder="กรอกรายละเอียด" rows={4} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <label>เงื่อนไข</label>
          <Form.Item style={{ margin: 0 }} name={`${recode.num}_condition`}>
            <TextArea placeholder="กรอกเงื่อนไข" rows={4} />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  const subMission = (
    <>
      <Row className="pb-3">
        <Col span={21}>
          <label>
            ภารกิจย่อย{" "}
            <span style={{ color: color.Error }}>
              * จำนวนไร่สะสมจะต้องไม่น้อยกว่าภารกิจย่อยก่อนหน้า *
            </span>
          </label>
        </Col>
        <Col span={3}>
          <Button
            style={{
              borderColor: "rgba(33, 150, 83, 0.1)",
              borderRadius: "5px",
              color: color.Success,
              backgroundColor: "rgba(33, 150, 83, 0.1)",
            }}
            onClick={() => addRow()}
          >
            + เพิ่มภารกิจย่อย
          </Button>
        </Col>
      </Row>
      <Form form={formTable}>
        <Table
          columns={columns}
          dataSource={newDataSubMission}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => subMissionTextArea(record),
            defaultExpandedRowKeys: countExpand(),
            expandIcon: ({ expanded, onExpand, record }) => {
              return expanded ? (
                <UpCircleFilled
                  className="pb-2"
                  style={{ fontSize: "20px", color: "#A9CB62" }}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <DownCircleFilled
                  className="pb-2"
                  style={{ fontSize: "20px", color: "#A9CB62" }}
                  onClick={(e) => onExpand(record, e)}
                />
              );
            },
          }}
        />
      </Form>
    </>
  );
  const onFieldsChange = () => {
    const { missionName, campaignType, startDate, endDate, status } =
      form.getFieldsValue();
    const dataSub = newDataSubMission;
    const fs = formTable.getFieldsValue();
    const condition: any = dataSub?.map((y: any, i: number) => {
      // if({
      //   num: i + 1,
      //   missionName: fs[`${y.num}_missionName`],
      //   rai: parseFloat(fs[`${y.num}_rai`]).toFixed(2),
      //   rewardId: fs[`${y.num}_rewardId`],
      //   descriptionReward: fs[`${y.num}_description`],
      //   conditionReward: fs[`${y.num}_condition`],
      // }
      // ){
      //   return true;
      // }else{
      //   return false;
      // }
      return {
        num: i + 1,
        missionName: fs[`${y.num}_missionName`],
        rai: parseFloat(fs[`${y.num}_rai`]).toFixed(2),
        rewardId: fs[`${y.num}_rewardId`],
        point: fs[`${y.num}_point`],
        descriptionReward: fs[`${y.num}_description`],
        conditionReward: fs[`${y.num}_condition`],

      };
    });
    let fieldErr: boolean = true;
    let fieldNull: boolean = true;

    const checkMission =
      condition[0].conditionReward &&
      condition[0].descriptionReward &&
      condition[0].missionName &&
      condition[0].num &&
      condition[0].rai &&
      condition[0].rewardId;
    if (checkMission) {
      fieldNull = false;
    } else {
      fieldNull = true;
    }
    if (missionName && campaignType && startDate && endDate && status) {
      fieldErr = false;
    } else {
      fieldErr = true;
    }
    setBtnSaveDisable(fieldErr || checkMission);
  };
  const submit = async () => {
    const dataSub = newDataSubMission;
    await form.validateFields();
    await formTable.validateFields();

    const create: any = {};
    const f = form.getFieldsValue();
    const fs = formTable.getFieldsValue();
    const condition = dataSub?.map((y: any, i: number) => {
      return {
        num: i + 1,
        missionName: fs[`${y.num}_missionName`],
        rai: parseFloat(fs[`${y.num}_rai`]).toFixed(2),
        rewardId: fs[`${y.num}_rewardId`],
        point: fs[`${y.num}_point`],
        descriptionReward: fs[`${y.num}_description`],
        conditionReward: fs[`${y.num}_condition`],
      };
    });
    create.campaignName = f.missionName;
    create.campaignType = f.campaignType;
    create.application = "DRONER";
    create.status = f.status;
    create.condition = condition;
    create.createBy = profile.firstname + " " + profile.lastname;
    create.updateBy = profile.firstname + " " + profile.lastname;
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
    console.log(create);

    // CampaignDatasource.createCampaign(create).then((res) => {
    //   if (res.success) {
    //     Swal.fire({
    //       title: "บันทึกสำเร็จ",
    //       icon: "success",
    //       timer: 1500,
    //       showConfirmButton: false,
    //     }).then((time) => {
    //       navigate("/IndexDronerMission");
    //     });
    //   } else {
    //     if (res.userMessage === "dupplicate") {
    //     } else {
    //     }
    //   }
    // });
  };

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>เพิ่มภารกิจ</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader="รายละเอียดภารกิจ" />
        <Form
          style={{ padding: "32px" }}
          form={form}
          onFieldsChange={onFieldsChange}
        >
          <Col span={24}>
            <label>
              ชื่อภารกิจ <span style={{ color: color.Error }}>*</span>
            </label>
            <Form.Item
              name="missionName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อภารกิจ",
                },
              ]}
            >
              <Input placeholder="กรอกชื่อภารกิจ" autoComplete="off" />
            </Form.Item>
          </Col>
          <Row>
            <Col span={10}>
              <label>
                ประเภทสิ่งที่ได้รับ<span style={{ color: color.Error }}>*</span>
              </label>
              <Form.Item
                name="campaignType"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกประเภทสิ่งที่ได้รับ",
                  },
                ]}
              >
                <Select
                  className="col-lg-11 p-1"
                  placeholder="เลือกประเภทสิ่งที่ได้รับ"
                  allowClear
                  onChange={(e) => setCampaignType(e)}
                >
                  <option value="MISSION_REWARD">ของรางวัล</option>
                  <option value="MISSION_POINT">แต้ม</option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <label>
                วันเริ่มต้น<span style={{ color: color.Error }}>*</span>
              </label>
              <div className="d-flex p-1">
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
                    placeholder="เลือกวันที่"
                    format={dateFormat}
                    disabledDate={disabledDateStart}
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
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={7}>
              <label>
                วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
              </label>
              <Col className="d-flex p-1">
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
                    placeholder="เลือกวันที่"
                    format={dateFormat}
                    disabledDate={disabledDateEnd}
                  />
                </Form.Item>
                <Form.Item
                  name="endTime"
                  initialValue={moment("23:59", "HH:mm")}
                >
                  <TimePicker
                    format={"HH:mm"}
                    className="ms-3"
                    placeholder="เลือกเวลา"
                    defaultValue={moment("00:00", "HH:mm")}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
            </Col>
          </Row>
          <Col>
            <label>
              สถานะ <span style={{ color: color.Error }}>*</span>
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
                <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Divider />
          {subMission}
        </Form>
        <FooterPage
          onClickBack={() => navigate("/IndexDronerMission/")}
          styleFooter={{ padding: "6px" }}
          onClickSave={() => submit()}
          disableSaveBtn={saveBtnDisable}
        />
      </CardContainer>
    </>
  );
};

export default AddDronerMission;
