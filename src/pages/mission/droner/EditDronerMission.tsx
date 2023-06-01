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
  Table,
  TimePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import {
  CampaignConditionEntity,
  CampaignEntiry,
} from "../../../entities/CampaignPointEntites";
import { color } from "../../../resource";
const _ = require("lodash");

const EditDronerMission = () => {
  let queryString = _.split(window.location.pathname, "=");
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();
  const [formSub] = Form.useForm();
  const [data, setData] = useState<CampaignEntiry>();
  const [dataSubMission, setDataSubMission] =
    useState<CampaignConditionEntity[]>();

  const fetchMissionById = () => {
    CampaignDatasource.getCampaignById(queryString[1]).then((res) => {
      const mapKey = res.condition.map((x: any, i: any) => ({
        ...x,
        key: i + 1,
      }));
      setDataSubMission(mapKey);
      setData({ ...res, condition: mapKey });
      form.setFieldsValue({
        missionName: res.campaignName,
        status: res.status,
        startDate: !res.startDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startDate).toUTCString()),
        endDate: !res.endDate
          ? moment(new Date().toUTCString())
          : moment(new Date(res.startDate).toUTCString()),
        startTime: !res.startDate
          ? moment(new Date().getTime())
          : moment(new Date(res.startDate).getTime()),
        endTime: !res.endDate
          ? moment(new Date().getTime())
          : moment(new Date(res.endDate).getTime()),
      });
    });
  };

  useEffect(() => {
    fetchMissionById();
  }, []);

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
              name={index}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อภารกิจย่อย",
                },
              ]}
            >
              <Input placeholder="กรอกชื่อภารกิจย่อย" />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "จำนวนไร่สะสม",
      dataIndex: "rai",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={index}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อจำนวนไร่",
                },
              ]}
            >
              <Input placeholder="กรอกจำนวนไร่" suffix="ไร่" />
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "ชื่อของรางวัล",
      dataIndex: "totalSubMission",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Form.Item
              style={{ margin: 0 }}
              name={index}
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกชื่อของรางวัล",
                },
              ]}
            >
              <Input placeholder="เลือกชื่อของรางวัล" />
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
                <ActionButton icon={<DeleteOutlined />} color={color.Error} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const subMissionTextArea = (recode: any) => {
    console.log(recode);
    return (
      <Form form={formSub}>
        <Row justify={"space-between"} gutter={16}>
          <Col span={12}>
            <label>รายละเอียด</label>
            <TextArea placeholder="กรอกรายละเอียด" rows={4} />
          </Col>
          <Col span={12}>
            <label>เงื่อนไข</label>
            <TextArea placeholder="กรอกเงื่อนไข" rows={4} />
          </Col>
        </Row>
      </Form>
    );
  };

  const subMission = (
    <>
      <Row className="pb-3">
        <Col span={21}>
          <label>
            ภารกิจย่อย <span style={{ color: color.Error }}>*</span>
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
            //onClick={() => addRow()}
          >
            + เพิ่มภารกิจย่อย
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={dataSubMission}
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
    </>
  );

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>แก้ไขภารกิจ</strong>
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
                  <DatePicker placeholder="เลือกวันที่" format={dateFormat} />
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
                  <DatePicker placeholder="เลือกวันที่" format={dateFormat} />
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
              <Radio.Group className="d-flex flex-column" defaultValue="ACTIVE">
                <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Divider />
          {subMission}
        </Form>
      </CardContainer>
    </>
  );
};

export default EditDronerMission;
