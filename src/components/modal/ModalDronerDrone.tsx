import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Tag,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DroneEntity } from "../../entities/DroneEntities";
import { DronerDroneEntity } from "../../entities/DronerDroneEntities";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import color from "../../resource/color";
import FooterPage from "../footer/FooterPage";
import img_empty from "../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { MONTH_SALE } from "../../definitions/Month";

const _ = require("lodash");
const { Map } = require("immutable");
interface ModalDroneProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: DronerDroneEntity) => void;
  data: DronerDroneEntity;
  editIndex: number;
  title: string;
}
const ModalDrone: React.FC<ModalDroneProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  title
}) => {
  const [droneList, setDroneList] = useState<DroneBrandEntity[]>();
  const [dataDrone, setDataDrone] = useState<DronerDroneEntity>(data);
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>();
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>();
  const [createLicenseDroner, setCreateLicenseDroner] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  const [createLicenseDrone, setCreateLicenseDrone] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);

  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneList(res.data);
    });
  };
  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500).then((res) => {
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
  const handleYear = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(dataDrone).set(e.target.id, e.target.value);
    setDataDrone(m.toJS());
  };
  const handleMonth = async (e: any) => {
    const m = Map(dataDrone).set("purchaseMonth", e);
    setDataDrone(m.toJS());
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
  const onChangeLicenseDroner = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgLicenseDroner(src);
    const d = Map(createLicenseDroner).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "DRONER_LICENSE");
    setCreateLicenseDroner(f.toJS());

  };
  const previewLicenseDroner = async () => {
    let src = imgLicenseDroner;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgLicenseDroner);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeLicenseDroner = () => {
    setImgLicenseDroner(undefined);
    checkValidate(data);
  };
  const onChangeLicenseDrone = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgLicenseDrone(src);
    checkValidate(data);
    const d = Map(createLicenseDrone).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "DRONE_LICENSE");
    setCreateLicenseDrone(f.toJS());
  };
  const previewLicenseDrone = async () => {
    let src = imgLicenseDrone;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgLicenseDrone);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeLicenseDrone = () => {
    setImgLicenseDrone(undefined);
    checkValidate(data);
  };
  const handleSerialNo = async (e: any) => {
    const m = Map(dataDrone).set("serialNo", e.target.value);
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
      // data.series != 0 &&
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
            {title}
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
            <Form.Item
              name="droneId"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกยี่ห้อโดรนที่ฉีดพ่น",
                },
              ]}
            >
              <Select
                placeholder="เลือกยี่ห้อโดรน"
                allowClear
                onChange={handleBrand}
                defaultValue={dataDrone.droneName}
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
            <Form.Item
              name="series"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกรุ่นโดรน",
                },
              ]}
            >
              <Select
                placeholder="เลือกรุ่น"
                allowClear
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
          <div className="form-group ">
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
          <div className="row">
            <div className="form-group col-lg-6">
              <label>ปีที่ซื้อ</label>
              <Form.Item name="purchaseYear">
                <Input
                  placeholder="กรอกปี พ.ศ. ที่ซื้อ"
                  onChange={handleYear}
                  defaultValue={dataDrone.purchaseYear}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>เดือนที่ซื้อ</label>
              <Form.Item name="purchaseMonth">
                <Select
                  className="col-lg-6"
                  placeholder="เลือกเดือน"
                  onChange={handleMonth}
                  defaultValue={dataDrone.purchaseMonth}
                >
                  {MONTH_SALE.map((item) => (
                    <Option value={item.value}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 pb-5">
              <label>ใบอนุญาตนักบิน</label>
              <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ pdf.)</span>

              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDroner})`,
                    display: imgLicenseDroner != undefined ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDroner != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDroner}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDroner}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
              <div
                className="hiddenFileBtn"
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgLicenseDroner == undefined ? "block" : "none",
                }}
              >
                <input
                  type="file"
                  onChange={onChangeLicenseDroner}
                  title="เลือกรูป"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>ใบอนุญาตโดรนจาก กสทช.</label>
              <span style={{ color: "red" }}>*</span>
              <span style={{ color: color.Disable }}>(ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDrone})`,
                    display: imgLicenseDrone != undefined ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDrone != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={previewLicenseDrone}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeLicenseDrone}
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
              <div
                className="hiddenFileBtn"
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgLicenseDrone == undefined ? "block" : "none",
                }}
              >
                <input
                  required
                  type="file"
                  onChange={onChangeLicenseDrone}
                  title="เลือกรูป"
                />
              </div>
            </div>
          </div>
          <br />
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
                    <Radio value="PENDING">รอตรวจสอบ</Radio>
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
