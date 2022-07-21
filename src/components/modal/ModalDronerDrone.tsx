import { Button, Form, Input, Modal, Radio, Select, Space, Upload } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DroneEntity } from "../../entities/DroneEntities";
import { DronerDroneEntity } from "../../entities/DronerDroneEntities";
import color from "../../resource/color";
import FooterPage from "../footer/FooterPage";

const _ = require("lodash");
const { Map } = require("immutable");
interface ModalDroneProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: DronerDroneEntity) => void;
  data: DronerDroneEntity;
  editIndex: number;
}
const ModalDrone: React.FC<ModalDroneProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
}) => {
  const [droneList, setDroneList] = useState<DroneBrandEntity[]>();
  const [dataDrone, setDataDrone] = useState<DronerDroneEntity>(data);
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);

  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneList(res.data);
    });
  };

  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500, "ASC").then((res) => {
      setSeriesDrone(res.data);
    });
  };
  useEffect(() => {
    fetchDrone();
    fetchDroneSeries();
  }, []);
  const handleBrand = async (brand: string) => {
    let filterSeries = seriesDrone?.filter((x) => x.droneBrandId == brand);
    setSeriesDrone(filterSeries);
  };
  const handleSeries = async (id: string) => {
    const m = Map(dataDrone).set("droneId", id);
    let filterLogo = seriesDrone?.filter((x) => x.id == id)[0].droneBrand
      .logoImagePath;
    const d = Map(m.toJS()).set("logoImagePath", filterLogo);
    let nameDrone = seriesDrone?.filter((x) => x.id == id)[0].droneBrand.name;
    const x = Map(d.toJS()).set("droneName", nameDrone);
    setDataDrone(x.toJS());
    checkValidate(m.toJS());

  };
  // const m = Map(dataDrone).set("droneId", brand);
  // let nameDrone = seriesDrone?.filter((x) => x.droneBrandId == brand)[0].droneBrand.name;
  // const d = Map(m.toJS()).set("droneName", nameDrone);
  // setDataDrone(d.toJS())

  const handleSerialNo = async (e: any) => {
    const m = Map(dataDrone).set(e.target.id, e.target.value);
    setDataDrone(m.toJS());
    checkValidate(m.toJS());
  };
  const handleChangeStatus = (e: any) => {
    const m = Map(dataDrone).set("status", e.target.value);
    setDataDrone(m.toJS());
    checkValidate(m.toJS());

  };
  const handleCallBack = () => {
    const m = Map(dataDrone).set("modalDroneIndex", editIndex);
    callBack(m.toJS());
  };
  const checkValidate = (data: DronerDroneEntity) => {
    if (
      data.droneName != "" &&
      data.serialNo != "" &&
      //data.serialNo != 0 &&
      data.status != ""
    ) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
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
            เพิ่มโดนเกษตรกร
          </div>
        }
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => {
              handleCallBack();
            }}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form key={data.droneId}>
          <div className="form-group">
            <label>
              ยี่ห้อโดรนที่ฉีดพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="droneId">
              <Select
                placeholder="เลือกยี่ห้อโดรน"
                onChange={handleBrand}
                defaultValue={dataDrone.droneId}
              >
                {droneList?.map((item: any, index: any) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group">
            <label>
              รุ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="series">
              <Select
                placeholder="เลือกรุ่น"
                onChange={handleSeries}
                defaultValue={dataDrone.droneId}
              >
                {seriesDrone?.map((item: any, index: any) => (
                  <option key={index} value={item.id}>
                    {item.series}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group">
            <label>
              เลขตัวถังโดรน <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="serialNo"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเลขตัวถังโดรน",
                },
              ]}
            >
              <Input
                onChange={handleSerialNo}
                placeholder="กรอกเลขตัวถังโดรน"
                defaultValue={dataDrone.serialNo}
              />
            </Form.Item>
          </div>
          <div className="form-group col-lg-12 pb-5">
            <label>
              ใบอนุญาตนักบิน{" "}
              <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ PDF)</span>
            </label>
            <br />
            <Upload listType="picture" className="upload-list-inline">
              <Button
                style={{
                  backgroundColor: "rgba(33, 150, 83, 0.1)",
                  border: color.Success + "1px dashed",
                  borderRadius: "5px",
                  width: "190px",
                }}
              >
                <span style={{ color: color.Success }}>อัพโหลด</span>
              </Button>
            </Upload>
          </div>
          <div className="form-group col-lg-12 pb-5">
            <label>
              ใบอนุญาตโดรนจาก กสทช.
              <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ PDF)</span>
            </label>
            <br />
            <Upload listType="picture" className="upload-list-inline">
              <Button
                style={{
                  backgroundColor: "rgba(33, 150, 83, 0.1)",
                  border: color.Success + "1px dashed",
                  borderRadius: "5px",
                  width: "190px",
                }}
              >
                <span style={{ color: color.Success }}>อัพโหลด</span>
              </Button>
            </Upload>
          </div>
          <div className="row">
            <div className="form-group">
              <label style={{ marginBottom: "10px" }}>
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสถานะ!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue={dataDrone.status}
                  onChange={handleChangeStatus}
                >
                  <Space direction="vertical">
                    <Radio value="ACTIVE">อนุมัติ</Radio>
                    <Radio value="PENDING">รอยืนยันตัวตน</Radio>
                    <Radio value="REJECTED">ไม่อนุมัติ</Radio>
                    <Radio value="INACTIVE">ปิดการใช้งาน</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDrone;
