import React, { useState } from "react";
import Layouts from "../../../components/layout/Layout";
import { Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import FooterPage from "../../../components/footer/FooterPage";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../components/button/SaveButton";
import { color } from "../../../resource";

function ConditionFarmer() {
  const navigate = useNavigate();
  const [chooseMission, setChooseMission] = useState<boolean>(false);
  const [chooseJob, setChooseJob] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [discountJob, setDiscountJob] = useState<string>("");
  const [getPoint, setGetPoint] = useState<string>("");

  const handlePoint = (mission: boolean, job: boolean) => {
    if (mission === false && job === false) {
      setGetPoint("");
    } else if (mission === true && job === false) {
      setGetPoint("mission");
    } else if (mission === false && job === true) {
      setGetPoint("job");
    } else {
      setGetPoint("ALL");
    }
  };
  const handleChooseMission = (e: any) => {
    setChooseMission(e.target.checked);
    handlePoint(chooseMission, e.target.checked);
  };
  const handleChooseJob = (e: any) => {
    setChooseJob(e.target.checked);
    handlePoint(chooseJob, e.target.checked);
  };
  const onClickSave = () => {};
  const handleDiscountJob = (e: any) => {
    setDiscountJob(e.target.checked);
  };

  const renderConditionFarmer = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเงื่อนไขเกษตรกร" />
      <Form style={{ padding: "32px" }}>
        <label style={{ fontSize: "16px", paddingBottom: 10 }}>
          การแลกคะแนนสะสม
        </label>
        <br />
        <Checkbox onChange={handleDiscountJob} value={"discount"}>
          ส่วนลดการจ้างงาน
        </Checkbox>
        <div className="row m-2">
          <div className="col-lg-6">
            <span>การเปรียบเทียบคะแนน/เงิน</span>
            <Input
              disabled={!discountJob}
              placeholder="กรอกคะแนน"
              suffix="คะแนน / 1 บาท"
            />
          </div>
          <div className="col-lg-6">
            <span>การใช้คะแนนขั้นต่ำ</span>
            <Input
              disabled={!discountJob}
              placeholder="กรอกคะแนน"
              suffix="คะแนน"
            />
          </div>
        </div>
        <br />
        <>
          <Checkbox disabled>ส่วนลดปุ๋ยและยา</Checkbox>
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
            name="jobs"
            valuePropName="checked"
            className="my-0"
          >
            <Checkbox
              onChange={handleChooseJob}
              checked={chooseJob}
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
            onClick={() => onClickSave()}
          >
            คืนค่าเดิม
          </Button>
          <Button
            style={{
              backgroundColor: disableBtn ? color.Grey : color.Success,
              borderColor: disableBtn ? color.Grey : color.Success,
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
