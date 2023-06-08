import {
  DeleteOutlined,
  DownCircleFilled,
  EditOutlined,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
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
  CreateCampaignEntiry,
} from "../../../entities/CampaignPointEntites";
import { GetAllRewardEntities } from "../../../entities/RewardEntites";
import { color } from "../../../resource";
import dayjs from "dayjs";

const AddDronerMission = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();
  const [formTable] = Form.useForm();
  const [rewardList, setRewardList] = useState<GetAllRewardEntities>();
  const [dataSubMission, setDataSubMission] = useState<
    CampaignConditionEntity[]
  >([CampaignConditionEntity_INIT]);
  const [count, setCount] = useState(1);

  const fetchRewardList = () => {
    RewardDatasource.getAllReward(
      0,
      0,
      "",
      "",
      "ACTIVE",
      "PHYSICAL",
      "MISSION"
    ).then((res) => {
      setRewardList(res);
    });
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
      if (d[0] < d[1] && d[d.length - 2] <= d[d.length - 1]) {
        return false;
      } else {
        return true;
      }
    }
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
              />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "ชื่อของรางวัล",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
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
            defaultExpandedRowKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

  const submit = async () => {
    const dataSub = newDataSubMission;
    await form.validateFields();
    await formTable.validateFields();

    const create: any = {};
    const f = form.getFieldsValue();
    const fs = formTable.getFieldsValue();
    const condition = dataSub?.map((y: any, i: number) => {
      return {
        ...y,
        num: i + 1,
        missionName: fs[`${y.num}_missionName`],
        rai: fs[`${y.num}_rai`],
        rewardId: fs[`${y.num}_rewardId`],
        descriptionReward: fs[`${y.num}_description`],
        conditionReward: fs[`${y.num}_condition`],
      };
    });
    create.campaignName = f.missionName;
    create.campaignType = "MISSION_REWARD";
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

    CampaignDatasource.createCampaign(create).then((res) => {
      if (res.success) {
        navigate("/IndexDronerMission");
      } else {
        if (res.userMessage === "dupplicate") {
        } else {
        }
      }
    });
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
        <Form style={{ padding: "32px" }} form={form}>
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
            <Col span={7}>
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
            <Col span={12}>
              <label>
                วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
              </label>
              <Col className="d-flex">
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
        />
      </CardContainer>
    </>
  );
};

export default AddDronerMission;