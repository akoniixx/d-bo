import React, { useState } from "react";
import Layouts from "../../../components/layout/Layout";
import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from "antd";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import { useNavigate } from "react-router-dom";
import { color } from "../../../resource";
import {
  PointSettingEntities,
  PointSettingEntities_INIT,
} from "../../../entities/PointSettingEntities";
import { PointSettingDatasource } from "../../../datasource/PointSettingDatasource";
import Swal from "sweetalert2";
import FooterPage from "../../../components/footer/FooterPage";

const _ = require("lodash");
const { Map } = require("immutable");

function ConditionFarmer() {
  const [dataPoint, setDataPoint] = useState<PointSettingEntities>(
    PointSettingEntities_INIT
  );
  const [chooseMission, setChooseMission] = useState<boolean>(false);
  const [chooseTask, setChooseTask] = useState<boolean>(false);
  const [chooseDisFer, setChooseDisFer] = useState<boolean>(false);
  const [chooseDisTask, setChooseDisTask] = useState<boolean>(false);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [discountTaskCheck, setDiscountTaskCheckCheck] = useState<any>();
  const [discountTask, setDiscountTask] = useState<any>();
  const [status, setStatus] = useState<any>();

  const handleOnPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(dataPoint).set("point", e.target.value);
    setDataPoint(m.toJS());
    checkValidate(m.toJS());
  };
  const handleOnAmounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(dataPoint).set("amounts", e.target.value);
    setDataPoint(m.toJS());
    checkValidate(m.toJS());
  };
  const handleOnMinPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(dataPoint).set("minPoint", e.target.value);
    setDataPoint(m.toJS());
    checkValidate(m.toJS());
  };
  const handleChooseTask = (e: any) => {
    setChooseTask(e.target.checked);
    handleChooseGetPoint(e.target.checked, chooseMission);
  };
  const handleChooseMission = (e: any) => {
    setChooseMission(e.target.checked);
    handleChooseGetPoint(chooseTask, e.target.checked);
  };
  const handleChooseGetPoint = (task: boolean, mission: boolean) => {
    if (task === false && mission === false) {
      const m = Map(dataPoint).set("receiveType", "");
      setDataPoint(m.toJS());
      checkValidate(m.toJS());
    } else if (task === true && mission === false) {
      const m = Map(dataPoint).set("receiveType", "TASK");
      setDataPoint(m.toJS());
      checkValidate(m.toJS());
    } else if (task === false && mission === true) {
      const m = Map(dataPoint).set("receiveType", "MISSION");
      setDataPoint(m.toJS());
      checkValidate(m.toJS());
    } else {
      const m = Map(dataPoint).set("receiveType", "ALL");
      setDataPoint(m.toJS());
      checkValidate(m.toJS());
    }
  };
  const handleDisTask = (e: any) => {
    setChooseDisTask(e.target.checked);
    handleChooseRedeem(e.target.checked, chooseDisFer);
  };
  const handleDisFertilizer = (e: any) => {
    setChooseDisFer(e.target.checked);
    handleChooseRedeem(chooseDisTask, e.target.checked);
  };
  const handleChooseRedeem = (task: boolean, Fer: boolean) => {
    if (task === false && Fer === false) {
      const m = Map(dataPoint).set("pointType", "");
      setDataPoint(m.toJS());
      checkValidate(m.toJS());
      setStatus("INACTIVE");
    } else if (task === true && Fer === false) {
      const m = Map(dataPoint).set("pointType", "DISCOUNT_TASK");
      setDataPoint(m.toJS());
      setStatus("ACTIVE");
      checkValidate(m.toJS());
    } else if (task === false && Fer === true) {
      const m = Map(dataPoint).set("pointType", "DISCOUNT_PRODUCT");
      setDataPoint(m.toJS());
      setStatus("ACTIVE");
      checkValidate(m.toJS());
    } else {
      const m = Map(dataPoint).set("pointType", "ALL");
      setDataPoint(m.toJS());
      setStatus("ACTIVE");
      checkValidate(m.toJS());
    }
  };
  console.log(dataPoint);

  const checkValidate = (data: PointSettingEntities) => {
    if (
      data.status != "INACTIVE" &&
      data.amounts != 0 &&
      data.minPoint != 0 &&
      data.point != 0 &&
      data.receiveType != "" &&
      data.pointType != ""
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onClickSave = async () => {
    const pushApp = Map(dataPoint).set("application", "FARMER");
    const pushStatus = Map(pushApp.toJS()).set("status", status);
    await PointSettingDatasource.createPointSetting(pushStatus.toJS()).then(
      (res) => {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {});
      }
    );
  };

  const renderConditionFarmer = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเงื่อนไขเกษตรกร" />
      <Form style={{ padding: "32px" }}>
        <label style={{ fontSize: "16px", paddingBottom: 10 }}>
          การแลกคะแนนสะสม
        </label>
        <br />
        <Checkbox onChange={handleDisTask} checked={chooseDisTask}>
          ส่วนลดการจ้างงาน
        </Checkbox>
        <div className="row m-2">
          <div className="col-lg-6">
            <span>การเปรียบเทียบคะแนน/เงิน</span>
            <Space.Compact>
              <Input
                className="col-lg-9"
                type="number"
                disabled={!chooseDisTask}
                placeholder="กรอกคะแนน"
                suffix="คะแนน /"
                onChange={handleOnPoint}
              />
              <Input
                type="number"
                disabled={!chooseDisTask}
                suffix="บาท"
                onChange={handleOnAmounts}
              />
            </Space.Compact>
          </div>
          <div className="col-lg-6">
            <span>การใช้คะแนนขั้นต่ำ</span>
            <Input
              type="number"
              disabled={!chooseDisTask}
              placeholder="กรอกคะแนน"
              suffix="คะแนน"
              onChange={handleOnMinPoint}
            />
          </div>
        </div>
        <br />
        <>
          <Checkbox
            onChange={handleDisFertilizer}
            checked={chooseDisFer}
            disabled
          >
            ส่วนลดปุ๋ยและยา
          </Checkbox>
          <div className="row m-2">
            <div className="col-lg-6">
              <span>การเปรียบเทียบคะแนน/เงิน</span>
              <Input disabled placeholder="กรอกคะแนน" suffix="คะแนน / 1 บาท" />
            </div>
            <div className="col-lg-6">
              <span>การใช้คะแนนขั้นต่ำ</span>
              <Input disabled placeholder="กรอกคะแนน" suffix="คะแนน" />
            </div>
          </div>
        </>

        <Divider />
        <div className="form-group col-lg-12">
          <label>การได้รับคะแนน</label>
          <Form.Item
            initialValue={false}
            name="task"
            valuePropName="checked"
            className="my-0"
          >
            <Checkbox
              onChange={handleChooseTask}
              checked={chooseTask}
              className="pt-2"
            >
              การจ้างงาน
            </Checkbox>
          </Form.Item>
          <Form.Item
            initialValue={false}
            name="mission"
            valuePropName="checked"
            className="my-0"
          >
            <Checkbox
              onChange={handleChooseMission}
              checked={chooseMission}
              className="mt-0"
            >
              ภารกิจ
            </Checkbox>
          </Form.Item>
        </div>
      </Form>
    </CardContainer>
  );
  return (
    <Layouts>
      <Row>
        <span className="p-3">
          <strong style={{ fontSize: "20px" }}>เงื่อนไขเกษตรกร</strong>
        </span>
      </Row>
      {renderConditionFarmer}
      <div className="col-lg">
        <Row className="d-flex justify-content-between p-3">
          <Button
            style={{
              backgroundColor: color.White,
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.Success,
            }}
            // onClick={() => onClickSave()}
          >
            คืนค่าเดิม
          </Button>
          <Button
            disabled={saveBtnDisable}
            style={{
              backgroundColor: saveBtnDisable ? color.Grey : color.Success,
              borderColor: saveBtnDisable ? color.Grey : color.Success,
              borderRadius: "5px",
              color: color.BG,
            }}
            onClick={() => onClickSave()}
          >
            บันทึก
          </Button>
        </Row>
      </div>
    </Layouts>
  );
}

export default ConditionFarmer;
