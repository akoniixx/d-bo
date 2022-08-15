import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Radio, Select, Space } from "antd";
import FooterPage from "../footer/FooterPage";
import { FarmerPlotEntity } from "../../entities/FarmerPlotEntities";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import GoogleMap from "../map/GoogleMap";
import { SubdistrictEntity } from "../../entities/LocationEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";

const { Option } = Select;

const _ = require("lodash");
const { Map } = require("immutable");

interface ModalFarmerPlotProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: FarmerPlotEntity) => void;
  data: FarmerPlotEntity;
  editIndex: number;
  title: string;
}
const ModalFarmerPlot: React.FC<ModalFarmerPlotProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  title,
}) => {
  const [farmerPlot, setFarmerPlot] = useState<FarmerPlotEntity>(data);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: parseFloat(data.lat),
    lng: parseFloat(data.long),
  });
  const [location, setLocation] = useState<SubdistrictEntity[]>([]);
  const [searchLocation] = useState("");

  const fetchLocation = async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res);
    });
  };

  useEffect(() => {
    fetchLocation(searchLocation);
  }, [searchLocation]);

  const handleOnChangePlot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(farmerPlot).set(e.target.id, e.target.value);
    setFarmerPlot(m.toJS());
    checkValidate(m.toJS());
  };

  const handleChangePlotstatus = (e: any) => {
    const m = Map(farmerPlot).set("isActive", e.target.value);
    setFarmerPlot(m.toJS());
    checkValidate(m.toJS());
  };

  const handleOnChangePlantSelect = (value: any) => {
    const m = Map(farmerPlot).set("plantName", value == undefined ? "" : value);
    setFarmerPlot(m.toJS());
    checkValidate(m.toJS());
  };

  const handleSearchLocation = async (value: any) => {
    if (value != undefined) {
      const a = location.filter((x) => x.subdistrictId == value)[0];
      const pushLat = Map(farmerPlot).set("lat", a.lat);
      const pushLong = Map(pushLat.toJS()).set("long", a.long);
      setFarmerPlot(pushLong.toJS());
      setMapPosition({
        lat: a.lat != null ? parseFloat(a.lat) : 0,
        lng: a.long != null ? parseFloat(a.long) : 0,
      });
      checkValidate(pushLong.toJS());
    } else {
      setMapPosition(LAT_LNG_BANGKOK);
    }
  };
  const handleOnChangeUrl = (value: any) => {
    const m = Map(farmerPlot).set("mapUrl", value.target.value);
    setFarmerPlot(m.toJS());
    checkValidate(m.toJS());
  };

  const handleOnChangeLat = (value: any) => {
    const m = Map(farmerPlot).set("lat", value.target.value);
    setFarmerPlot(m.toJS());
    checkValidate(m.toJS());
    setMapPosition((prev) => ({
      lat: parseFloat(value.target.value),
      lng: prev.lng,
    }));
  };

  const handleOnChangeLng = (value: any) => {
    const m = Map(farmerPlot).set("long", value.target.value);
    setFarmerPlot(m.toJS());
    checkValidate(m.toJS());
    setMapPosition((prev) => ({
      lat: prev.lat,
      lng: parseFloat(value.target.value),
    }));
  };

  const handelCallBack = () => {
    const m = Map(farmerPlot).set("plotId", editIndex);
    callBack(m.toJS());
  };

  const checkValidate = (data: FarmerPlotEntity) => {
    let checkEmpty = ![
      data.plantName,
      data.plotName,
      data.landmark,
      data.lat,
      data.long,
      data.raiAmount
    ].includes("");
    if (checkEmpty) {
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
            onClickSave={() => handelCallBack()}
            disableSaveBtn={saveBtnDisable}
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
                allowClear
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
                suffix="ไร่"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item name="searchAddress">
              <Select
                allowClear
                showSearch
                placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
                onChange={handleSearchLocation}
                optionFilterProp="children"
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
                filterOption={(input: any, option: any) =>
                  option.children.includes(input)
                }
              >
                {location.map((item) => (
                  <Option value={item.subdistrictId}>
                    {item.districtName +
                      "/" +
                      item.subdistrictName +
                      "/" +
                      item.provinceName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group">
            <label>Link Google Map</label>
            <Form.Item name="url">
              <Input
                defaultValue={farmerPlot.mapUrl}
                placeholder="กรอกข้อมูล Url Google Map"
                onBlur={handleOnChangeUrl}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Latitude (ละติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกละติจูด!",
                  },
                ]}
                key={mapPosition.lat}
              >
                <Input
                  placeholder="กรอกข้อมูล Latitude"
                  defaultValue={mapPosition.lat}
                  onBlur={handleOnChangeLat}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>Longitude (ลองติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกลองติจูด!",
                  },
                ]}
                key={mapPosition.lng}
              >
                <Input
                  placeholder="กรอกข้อมูล Longitude"
                  defaultValue={mapPosition.lng}
                  onBlur={handleOnChangeLng}
                />
              </Form.Item>
            </div>
          </div>
          <GoogleMap
            width="470px"
            height="300px"
            zoom={17}
            lat={mapPosition.lat}
            lng={mapPosition.lng}
          />
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
