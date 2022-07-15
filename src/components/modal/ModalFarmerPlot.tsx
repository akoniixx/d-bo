import React, { useState } from "react";
import { Form, Input, Modal, Radio, Select, Space } from "antd";
import FooterPage from "../footer/FooterPage";
import { SearchOutlined } from "@ant-design/icons";
import { FarmerPlotEntity } from "../../entities/FarmerPlotEntities";
import { EXP_PLANT } from "../../definitions/ExpPlant";

const _ = require("lodash");
const { Map } = require("immutable");

interface ModalFarmerPlotProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: FarmerPlotEntity) => void;
  data: FarmerPlotEntity;
  editIndex: number;
}
const ModalFarmerPlot: React.FC<ModalFarmerPlotProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
}) => {
  const [farmerPlot, setFarmerPlot] = useState<FarmerPlotEntity>(data);

  const handleOnChangePlot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(farmerPlot).set(e.target.id, e.target.value);
    setFarmerPlot(m.toJS());
  };

  const handleChangePlotstatus = (e: any) => {
    const m = Map(farmerPlot).set("isActive", e.target.value);
    setFarmerPlot(m.toJS());
  };

  const handleOnChangePlantSelect = (value: any) => {
    const m = Map(farmerPlot).set("plantName", value);
    setFarmerPlot(m.toJS());
  };

  const handelCallBack = () => {
    const m = Map(farmerPlot).set("plotId", editIndex);
    callBack(m.toJS());
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            เพิ่มแปลงแกษตรกร
          </div>
        }
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => handelCallBack()}
          />,
        ]}
      >
        <Form key={data.plotId}>
          <div className="form-group">
            <label>
              ชื่อแปลง <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="plotName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อแปลง!",
                },
              ]}
            >
              <Input
                placeholder="กรอกชื่อแปลง"
                onChange={handleOnChangePlot}
                defaultValue={farmerPlot.plotName}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>
              พืชที่ปลูก <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="plantName">
              <Select
                placeholder="เลือกพืชที่ปลูก"
                defaultValue={farmerPlot.plantName}
                onChange={handleOnChangePlantSelect}
              >
                {EXP_PLANT.map((x) => (
                  <option value={x}>{x}</option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group col-lg-6">
            <label>
              จำนวนไร่ <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="raiAmount"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวนไร่!",
                },
              ]}
            >
              <Input
                placeholder="ไร่"
                onChange={handleOnChangePlot}
                defaultValue={farmerPlot.raiAmount}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item name="SearchAddress">
              <Input
                placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
          </div>
          {/* map */}
          <p>map</p>
          <div className="form-group">
            <label>
              จุดสังเกตใกล้แปลง (เช่น รร.บ้านน้อย){" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="landmark">
              <Input
                placeholder="กรอกจุดสังเกต"
                onChange={handleOnChangePlot}
                defaultValue={farmerPlot.landmark}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>
              สถานะ <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <Radio.Group
              defaultValue={farmerPlot.isActive}
              onChange={handleChangePlotstatus}
            >
              <Space direction="vertical">
                <Radio value={true}>ใช้งาน</Radio>
                <Radio value={false}>ไม่ใช้งาน</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalFarmerPlot;
