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

const AddDetailPointManual = () => {
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
      "MISSION"
    ).then((res) => {
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
        point: sTable[`${y.num}_point`],
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
      formTable.setFieldValue(`${y.num}_point`, y.point);
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
    formTable.setFieldValue(`${e.length + 1}_point`, "");
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
    const checkName = name.split("_")[1];
    const { value: inputValue } = e.target;
    const justNumber = inputValue.replace(/[^0-9.]/g, "");
    const convertedNumber = justNumber.replace(/^(\d*\.\d{0,2}).*$/, "$1");
    if (checkName === "rai") {
      formTable.setFieldsValue({ [name]: convertedNumber });
    } else {
      const withoutDecimal = justNumber.replace(/\./g, "");
      formTable.setFieldsValue({ [name]: withoutDecimal });
    }
  };

  const columns = [
    {
      title: "",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{index + 1}</span>,
        };
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "ชื่อผู้ใช้",
      width: "35%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={`${row.num}_missionName`}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อผู้ใช้",
                },
              ]}
            >
              <Input placeholder="กรอกชื่อผู้ใช้" autoComplete="off" />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "จำนวนแต้ม",
      dataIndex: "rai",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={`${row.num}_rai`}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวนแต้ม",
                },
              ]}
            >
              <Input
                placeholder="กรอกจำนวนแต้ม"
                suffix="แต้ม"
                autoComplete="off"
                onChange={(e) => checkNumber(e, `${row.num}_rai`)}
              />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "งานที่เกี่ยวข้อง (เฉพาะงานที่รีวิวแล้วเท่านั้น)",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex">
              <Form.Item name="task" style={{ margin: 0 }}>
                <Radio.Group>
                  <Radio value="YES">ไม่มี</Radio>
                  <Radio value="NO">มี</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                name={`${row.num}_point`}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัส Task No.",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกรหัส Task No."
                  onChange={(e) => checkNumber(e, `${row.num}_point`)}
                />
              </Form.Item>
            </div>
          ),
        };
      },
    },
    {
      title: "",
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
  const onFieldsChange = () => {
    const { missionName, campaignType, startDate, endDate, status } =
      form.getFieldsValue();
    const dataSub: any = newDataSubMission;
    const fs = formTable.getFieldsValue();
    const condition: any = dataSub?.map((y: any, i: number) => {
      return {
        num: i + 1,
        missionName: fs[`${y.num}_missionName`],
        rai: fs[`${y.num}_rai`],
        rewardId: fs[`${y.num}_rewardId`],
        point: fs[`${y.num}_point`],
        descriptionReward: fs[`${y.num}_description`],
        conditionReward: fs[`${y.num}_condition`],
      };
    });
    let fieldErr: boolean = true;
    let fieldNull: boolean = true;
    const isMissionReward = campaignType === "MISSION_REWARD";
    condition.length > 0 &&
    condition.every(
      (item: any) =>
        item &&
        item.conditionReward &&
        item.descriptionReward &&
        item.missionName &&
        item.num &&
        item.rai &&
        (isMissionReward ? item.rewardId : item.point) &&
        !checkLimit()
    )
      ? (fieldNull = false)
      : (fieldNull = true);

    if (missionName && campaignType && startDate && endDate && status) {
      fieldErr = false;
    } else {
      fieldErr = true;
    }
    setBtnSaveDisable(fieldErr || fieldNull);
  };
  const subMissionTextArea = (recode: any) => {
    return (
      <Row justify={"space-between"} gutter={16}>
        <Col span={24}>
          <label>หมายเหตุ</label>
          <Form.Item style={{ margin: 0 }} name={`${recode.num}_description`}>
            <TextArea placeholder="กรอกรายหมายเหตุ" rows={4} />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  const subMission = (
    <>
      <Row className="pb-3">
        <Col span={21}>
          <label>รายชื่อผู้ใช้</label>
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
            + เพิ่มชื่อผู้ใช้
          </Button>
        </Col>
      </Row>
      <Form form={formTable} onFieldsChange={onFieldsChange}>
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

  const submit = async () => {};

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>เพิ่มแต้มพิเศษ</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader="รายละแต้มพิเศษ" />
        <Form
          style={{ padding: "32px" }}
          form={form}
          onFieldsChange={onFieldsChange}
        >
          <label>
            ประเภทผู้ใช้งาน <span style={{ color: color.Error }}>*</span>
          </label>
          <Form.Item
            name="typeUser"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกประเภทผู้ใช้งาน",
              },
            ]}
          >
            <Radio.Group className="d-flex flex-row">
              <Radio value="FARMER">เกษตรกร</Radio>
              <Radio value="DRONER">นักบินโดรน</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          {subMission}
        </Form>
      </CardContainer>
      <div className="pt-3">
        <FooterPage
          onClickBack={() => navigate(-1)}
          styleFooter={{ padding: "6px" }}
          onClickSave={() => submit()}
          disableSaveBtn={saveBtnDisable}
        />
      </div>
    </>
  );
};

export default AddDetailPointManual;
