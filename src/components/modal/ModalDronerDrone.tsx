import { Form, Input, Modal, Radio, Select, Space, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DroneEntity } from "../../entities/DroneEntities";
import { DronerDroneEntity } from "../../entities/DronerDroneEntities";
import { UploadImageEntity } from "../../entities/UploadImageEntities";
import color from "../../resource/color";
import FooterPage from "../footer/FooterPage";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { MONTH_SALE } from "../../definitions/Month";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";

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
  title,
}) => {
  const [dataDrone, setDataDrone] = useState<DronerDroneEntity>(data);
  const [droneList, setDroneList] = useState<DroneBrandEntity[]>();
  const [droneBrandId, setDroneBrandId] = useState<string>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [pushDrone, setPushDrone] = useState<DroneEntity>(data.drone);
  const [pushSeries, setPushSeries] = useState<DroneBrandEntity>(
    data.drone.droneBrand
  );
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);

  let checkDronerLicense = data.file?.filter(
    (x) => x.category == "DRONER_LICENSE"
  );
  let checkDroneLicense = data.file?.filter(
    (x) => x.category == "DRONE_LICENSE"
  );
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>(false);
  const [imgLicenseDrone, setImgLicenseDrone] = useState<any>(false);

  const [createLicenseDroner, setCreateLicenseDroner] =
    useState<UploadImageEntity>();
  const [createLicenseDrone, setCreateLicenseDrone] =
    useState<UploadImageEntity>();

  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneList(res.data);
    });
  };
  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500, droneBrandId).then((res) => {
      setSeriesDrone(res.data);
      setSearchSeriesDrone(res.data);
    });
  };
  const fetchImg = async () => {
    if (checkDronerLicense?.length > 0) {
      if (checkDronerLicense[0].path == "") {
        let src = checkDronerLicense[0].file;
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(src);
          reader.onload = () => resolve(reader.result);
        });
        setImgLicenseDroner(src);
      } else {
        await UploadImageDatasouce.getImage(checkDronerLicense[0].path).then(
          (resImg) => {
            setImgLicenseDroner(resImg.url);
          }
        );
      }
    }
    if (checkDroneLicense?.length > 0) {
      if (checkDroneLicense[0].path == "") {
        let src = checkDroneLicense[0].file;
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(src);
          reader.onload = () => resolve(reader.result);
        });
        setImgLicenseDrone(src);
      } else {
        await UploadImageDatasouce.getImage(checkDroneLicense[0].path).then(
          (resImg) => {
            setImgLicenseDrone(resImg.url);
          }
        );
      }
    }
  };

  useEffect(() => {
    fetchDrone();
    fetchDroneSeries();
    fetchImg();
  }, [droneBrandId]);

  const handleBrand = (brand: string) => {
    setDroneBrandId(brand);
    let filterSeries = seriesDrone?.filter((x) => x.droneBrandId == brand);
    const m = Map(pushDrone).set("droneBrandId", brand);
    setPushDrone(m.toJS());
    setSearchSeriesDrone(filterSeries);
    checkValidate(dataDrone, m.toJS(), pushSeries, createLicenseDrone);
  };
  const handleSeries = (id: string) => {
    let getSeries = seriesDrone?.filter((x) => x.id == id)[0];
    const m = Map(dataDrone).set("droneId", id);
    const n = Map(pushSeries).set("id", id);
    const o = Map(n.toJS()).set("name", getSeries?.droneBrand.name);
    const p = Map(o.toJS()).set(
      "logoImagePath",
      getSeries?.droneBrand.logoImagePath
    );
    const pushDroneSeries = Map(pushDrone).set("droneBrand", p.toJS());
    setPushDrone(pushDroneSeries.toJS());
    setPushSeries(p.toJS());
    setDataDrone(m.toJS());
    checkValidate(
      m.toJS(),
      pushDroneSeries.toJS(),
      p.toJS(),
      createLicenseDrone
    );
  };
  const handleSerialNo = (e: any) => {
    const m = Map(dataDrone).set("serialNo", e.target.value);
    setDataDrone(m.toJS());
    checkValidate(m.toJS(), pushDrone, pushSeries, createLicenseDrone);
  };
  const handleYear = (e: any) => {
    const m = Map(dataDrone).set("purchaseYear", e.target.value);
    setDataDrone(m.toJS());
    checkValidate(m.toJS(), pushDrone, pushSeries, createLicenseDrone);
  };
  const handleMonth = (e: any) => {
    const m = Map(dataDrone).set("purchaseMonth", e);
    setDataDrone(m.toJS());
    checkValidate(m.toJS(), pushDrone, pushSeries, createLicenseDrone);
  };
  const handleChangeStatus = (e: any) => {
    const m = Map(dataDrone).set("status", e.target.value);
    setDataDrone(m.toJS());
    checkValidate(m.toJS(), pushDrone, pushSeries, createLicenseDrone);
  };
  //#region Image
  const onChangeLicenseDroner = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setImgLicenseDroner(src);
    const d = Map(createLicenseDroner).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER_DRONE");
    const f = Map(e.toJS()).set("category", "DRONER_LICENSE");
    const g = Map(f.toJS()).set("path", "");
    setCreateLicenseDroner(g.toJS());
    const pushImg = Map(dataDrone).set("file", [
      ...dataDrone.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setDataDrone(pushImg.toJS());
    checkValidate(pushImg.toJS(), pushDrone, pushSeries, createLicenseDrone);
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
    const removeImg = dataDrone.file?.filter(
      (x) => x.category != "DRONER_LICENSE"
    )[0];
    const d = Map(dataDrone).set(
      "file",
      removeImg == undefined ? [] : [removeImg]
    );
    setDataDrone(d.toJS());
    setImgLicenseDroner(false);
    checkValidate(dataDrone, pushDrone, pushSeries, createLicenseDrone);
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
    const e = Map(d.toJS()).set("resource", "DRONER_DRONE");
    const f = Map(e.toJS()).set("category", "DRONE_LICENSE");
    const g = Map(f.toJS()).set("path", "");
    setCreateLicenseDrone(g.toJS());
    const pushImg = Map(dataDrone).set("file", [
      ...dataDrone.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setDataDrone(pushImg.toJS());
    checkValidate(pushImg.toJS(), pushDrone, pushSeries, g.toJS());
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
    const removeImg = dataDrone.file?.filter(
      (x) => x.category != "DRONE_LICENSE"
    )[0];
    const d = Map(dataDrone).set(
      "file",
      removeImg == undefined ? [] : [removeImg]
    );
    setDataDrone(d.toJS());
    setImgLicenseDrone(false);
    setCreateLicenseDrone(undefined);
    checkValidate(dataDrone, pushDrone, pushSeries, false);
  };
  //#endregion

  const handleCallBack = () => {
    const m = Map(dataDrone).set("modalDroneIndex", editIndex);
    const n = Map(m.toJS()).set("drone", pushDrone);
    callBack(n.toJS());
  };

  const checkValidate = (
    main: DronerDroneEntity,
    drone?: DroneEntity,
    serise?: DroneBrandEntity,
    img?: any
  ) => {
    let checkEmptyMain = ![
      main.droneId,
      main.serialNo,
      main.status,
      serise?.name,
    ].includes("");
    let checkImg = img != undefined && img != false;
    setBtnSaveDisable(checkEmptyMain && checkImg ? false : true);
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
              name="droneBrand"
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
                defaultValue={dataDrone.drone.droneBrandId}
              >
                {droneList?.map((item: any) => (
                  <Option value={item.id}>{item.name}</Option>
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
                {searchSeriesDrone?.map((item: any, index: any) => (
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
                autoComplete="off"
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
                  autoComplete="off"
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
                    <Option value={item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 pb-5">
              <label>ใบอนุญาตนักบิน</label>
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDroner})`,
                    display: imgLicenseDroner != false ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDroner != false && (
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
                  display: imgLicenseDroner == false ? "block" : "none",
                }}
              >
                <input
                  key={imgLicenseDroner}
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
              <span style={{ color: color.Disable }}> (ไฟล์รูป หรือ pdf.)</span>
              <br />
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgLicenseDrone})`,
                    display: imgLicenseDrone != false ? "block" : "none",
                  }}
                ></div>
              </div>
              <div className="text-left ps-4">
                {imgLicenseDrone != false && (
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
                  display: imgLicenseDrone == false ? "block" : "none",
                }}
              >
                <input
                  required
                  key={imgLicenseDrone}
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
                    <Radio value="PENDING">รอตรวจสอบ</Radio>
                    <Radio value="ACTIVE">อนุมัติ</Radio>
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
