import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from "antd";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import { color } from "../../../resource";
import {
  PointSettingEntities,
  PointSettingEntities_INIT,
} from "../../../entities/PointSettingEntities";
import { PointSettingDatasource } from "../../../datasource/PointSettingDatasource";
import Swal from "sweetalert2";
import { validateOnlyNumber } from "../../../utilities/TextFormatter";
import { useForm } from "antd/es/form/Form";
import { DashboardLayout } from "../../../components/layout/Layout";

const _ = require("lodash");
const { Map } = require("immutable");

function ConditionFarmer() {
  let queryString = _.split(window.location.search, "=");
  const [form] = Form.useForm();
  const [taskId, setTaskId] = useState<PointSettingEntities>(
    PointSettingEntities_INIT
  );
  const [productId, setProductId] = useState<PointSettingEntities>(
    PointSettingEntities_INIT
  );
  const [dataPoint, setDataPoint] = useState<PointSettingEntities>({
    point: "",
    amounts: "1",
    minPoint: "",
    pointType: "",
    application: "FARMER",
    receiveType: "TASK",
    status: "",
  });
  const [dataPointFer, setDataPointFer] = useState<PointSettingEntities>({
    point: "",
    amounts: "1",
    minPoint: "",
    pointType: "",
    application: "FARMER",
    receiveType: "TASK",
    status: "",
  });
  const [chooseDisFer, setChooseDisFer] = useState<boolean>(false);
  const [chooseDisTask, setChooseDisTask] = useState<boolean>(false);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);

  const getDataPoint = async () => {
    await PointSettingDatasource.getAllPointSetting().then((res) => {
      if (res.length != 0) {
        const filterTask = res.find(
          (x: any) => x.pointType === "DISCOUNT_TASK"
        );
        const filterProduct = res.find(
          (x: any) => x.pointType === "DISCOUNT_PRODUCT"
        );
        PointSettingDatasource.getPointSetting(filterTask.id).then((res) => {
          form.setFieldsValue({
            point: res.point,
            minPoint: res.minPoint,
          });
          if (res) {
            setTaskId(res);
          }
        });
        PointSettingDatasource.getPointSetting(filterProduct.id).then((res) => {
          if (res) {
            setProductId(res);
          }
        });
      }
    });
  };
  useEffect(() => {
    getDataPoint();
  }, []);

  const handleOnPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = validateOnlyNumber(e.target.value);
    if (taskId.id) {
      const m = { ...taskId };
      m.point = values;
      form.setFieldsValue({ point: m.point });
      setTaskId(m);
      checkValidate(m);
    } else {
      const m = { ...dataPoint };
      m.point = values;
      form.setFieldsValue({ point: m.point });
      setDataPoint(m);
      checkValidateCreate(m);
    }
  };
  const handleOnMinPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const convertedNumber = e.target.value.replace(/[^\d]/g, "");
    if (taskId.id) {
      const m = { ...taskId };
      m.minPoint = convertedNumber;
      form.setFieldsValue({ minPoint: m.minPoint });
      setTaskId(m);
      checkValidate(m);
    } else {
      const m = { ...dataPoint };
      m.minPoint = convertedNumber;
      form.setFieldsValue({ minPoint: m.minPoint });
      setDataPoint(m);
      checkValidateCreate(m);
    }
  };
  const handlePointFer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (productId.id) {
      const m = Map(productId).set("point", e.target.value);
      setProductId(m.toJS());
      checkValidate(m.toJS());
    } else {
      const m = Map(dataPointFer).set("point", e.target.value);
      setDataPointFer(m.toJS());
      checkValidateCreate(m.toJS());
    }
  };
  const handleMinPointFer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (productId.id) {
      const m = Map(productId).set("minPoint", e.target.value);
      setProductId(m.toJS());
      checkValidate(m.toJS());
    } else {
      const m = Map(dataPointFer).set("minPoint", e.target.value);
      setDataPointFer(m.toJS());
      checkValidateCreate(m.toJS());
    }
  };

  const handleDisTask = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    setChooseDisTask(e.target.checked);
    if (checked === true) {
      if (taskId.id) {
        const m = Map(taskId).set("pointType", value);
        const n = Map(m.toJS()).set("status", "ACTIVE");
        setTaskId(n.toJS());
        checkValidate(n.toJS());
      } else {
        const m = Map(dataPoint).set("pointType", value);
        const n = Map(m.toJS()).set("status", "ACTIVE");
        setDataPoint(n.toJS());
        checkValidate(n.toJS());
      }
    } else {
      if (taskId.id) {
        const m = Map(taskId).set("pointType", value);
        const n = Map(m.toJS()).set("status", "INACTIVE");
        setTaskId(n.toJS());
        checkValidate(n.toJS());
      } else {
        const m = Map(dataPoint).set("pointType", "");
        const n = Map(m.toJS()).set("status", "");
        setDataPoint(n.toJS());
        checkValidate(n.toJS());
      }
    }
  };
  const handleDisFertilizer = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    setChooseDisFer(e.target.checked);
    if (checked === true) {
      if (productId.id) {
        const m = Map(productId).set("pointType", value);
        const n = Map(m.toJS()).set("status", "ACTIVE");
        setProductId(n.toJS());
        checkValidate(n.toJS());
      } else {
        const m = Map(dataPointFer).set("pointType", value);
        const n = Map(m.toJS()).set("status", "ACTIVE");
        setDataPointFer(n.toJS());
        checkValidate(n.toJS());
      }
    } else {
      if (productId.id) {
        const m = Map(productId).set("pointType", value);
        const n = Map(m.toJS()).set("status", "INACTIVE");
        setProductId(n.toJS());
        checkValidate(n.toJS());
      } else {
        const m = Map(dataPointFer).set("pointType", "");
        const n = Map(m.toJS()).set("status", "");
        setDataPointFer(n.toJS());
        checkValidate(n.toJS());
      }
    }
  };
  const checkValidate = (data: PointSettingEntities) => {
    if (
      data.status != "" &&
      data.application != "" &&
      data.minPoint != "" &&
      data.point != "" &&
      data.receiveType != "" &&
      data.pointType != ""
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const checkValidateCreate = (data: PointSettingEntities) => {
    if (data.application != "" && data.minPoint != "" && data.point != "") {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };

  const onClickSave = async () => {
    const pushApp = Map(taskId).set("application", "FARMER");
    const pushReceiveType = Map(pushApp.toJS()).set("receiveType", "TASK");
    const pushAmount = Map(pushReceiveType.toJS()).set(
      "amounts",
      taskId.amounts
    );
    await PointSettingDatasource.editPointSetting(pushAmount.toJS());
    const pushAppFer = Map(productId).set("application", "FARMER");
    const pushReceiveTypeFer = Map(pushAppFer.toJS()).set(
      "receiveType",
      "TASK"
    );
    const pushAmountFer = Map(pushReceiveTypeFer.toJS()).set(
      "amounts",
      productId.amounts
    );
    await PointSettingDatasource.editPointSetting(pushAmountFer.toJS()).then(
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
  const onClickCreate = async () => {
    if (chooseDisTask === true && chooseDisFer === false) {
      await PointSettingDatasource.createPointSetting(dataPoint).then((res) => {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {});
      });
    } else if (chooseDisTask === false && chooseDisFer === true) {
      await PointSettingDatasource.createPointSetting(dataPointFer).then(
        (res) => {
          Swal.fire({
            title: "บันทึกสำเร็จ",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then((time) => {});
        }
      );
    } else if (chooseDisTask === true && chooseDisFer === true) {
      await PointSettingDatasource.createPointSetting(dataPoint);
      await PointSettingDatasource.createPointSetting(dataPointFer).then(
        (res) => {
          Swal.fire({
            title: "บันทึกสำเร็จ",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then((time) => {});
        }
      );
    } else {
      return;
    }
  };

  const renderConditionFarmer = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเงื่อนไขเกษตรกร" />
      <Form style={{ padding: "32px" }} form={form}>
        <label style={{ fontSize: "16px", paddingBottom: 10 }}>
          การแลก ICK Point
        </label>
        <br />
        <Checkbox
          onChange={handleDisTask}
          checked={taskId.status === "ACTIVE" || dataPoint.status === "ACTIVE"}
          name="DISCOUNT_TASK"
          value={"DISCOUNT_TASK"}
        >
          ส่วนลดการจ้างงาน
        </Checkbox>
        <div className="row m-2">
          <div className="col-lg-6">
            <span>การเปรียบเทียบคะแนน/เงิน</span>
            <br />
            <Form.Item name="point">
              <Input
                key={taskId.id}
                disabled={
                  taskId.status != "ACTIVE" && dataPoint.status != "ACTIVE"
                }
                placeholder="กรอกคะแนน"
                suffix="คะแนน / 1 บาท"
                value={taskId.point != "" ? taskId.point : undefined}
                onChange={(e) => handleOnPoint(e)}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <span>การใช้คะแนนขั้นต่ำ</span>
            <Form.Item name="minPoint">
              <Input
                key={taskId.id}
                disabled={
                  taskId.status != "ACTIVE" && dataPoint.status != "ACTIVE"
                }
                placeholder="กรอกคะแนน"
                suffix="คะแนน"
                value={taskId.minPoint != "" ? taskId.minPoint : undefined}
                onChange={(e) => handleOnMinPoint(e)}
                autoComplete="off"
              />
            </Form.Item>
          </div>
        </div>
        <br />
        <>
          <Checkbox
            disabled
            onChange={handleDisFertilizer}
            checked={
              productId.status === "ACTIVE" || dataPointFer.status === "ACTIVE"
            }
            name="DISCOUNT_PRODUCT"
            value={"DISCOUNT_PRODUCT"}
          >
            ส่วนลดปุ๋ยและยา
          </Checkbox>
          <div className="row m-2">
            <div className="col-lg-6">
              <span>การเปรียบเทียบคะแนน/เงิน</span>
              <Input
                key={productId.id}
                name="point"
                type="number"
                placeholder="กรอกคะแนน"
                onChange={handlePointFer}
                disabled={
                  productId.status != "ACTIVE" &&
                  dataPointFer.status != "ACTIVE"
                }
                defaultValue={
                  productId.point != "" ? productId.point : undefined
                }
                suffix="คะแนน / 1 บาท"
              />
            </div>
            <div className="col-lg-6">
              <span>การใช้คะแนนขั้นต่ำ</span>
              <Input
                key={productId.id}
                name="minPoint"
                type="number"
                disabled={
                  productId.status != "ACTIVE" &&
                  dataPointFer.status != "ACTIVE"
                }
                placeholder="กรอกคะแนน"
                defaultValue={
                  productId.minPoint != "" ? productId.minPoint : undefined
                }
                suffix="คะแนน"
                onChange={handleMinPointFer}
              />
            </div>
          </div>
        </>
        {/* <Divider />
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
        </div> */}
      </Form>
    </CardContainer>
  );
  return (
    <>
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
            onClick={() => window.location.reload()}
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
            onClick={() => {
              taskId.id || productId.id ? onClickSave() : onClickCreate();
            }}
          >
            บันทึก
          </Button>
        </Row>
      </div>
    </>
  );
}

export default ConditionFarmer;
