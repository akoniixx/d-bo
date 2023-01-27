import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Radio, RadioChangeEvent, Select, Space } from "antd";
import FooterPage from "../footer/FooterPage";
import { FarmerPlotEntity } from "../../entities/FarmerPlotEntities";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import GoogleMap from "../map/GoogleMap";
import { SubdistrictEntity } from "../../entities/LocationEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";
import TextArea from "antd/lib/input/TextArea";

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
  isEditModal?: boolean;
}
const ModalFarmerPlot: React.FC<ModalFarmerPlotProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  title,
  isEditModal = false,
}) => {
  const [form] = Form.useForm();
  const [farmerPlot, setFarmerPlot] =
    useState<FarmerPlotEntity>(data);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );
  const [comment,setComment] = useState(data.comment)
  const [mapPosition, setMapPosition] = useState<
    | {
        lat?: number;
        lng?: number;
      }
    | undefined
  >(
    isEditModal
      ? {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.long),
        }
      : undefined
  );
  const [location, setLocation] = useState<SubdistrictEntity[]>([]);
  const [searchLocation] = useState("");

  const fetchLocation = async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res);
    });
  };

  useEffect(() => {
    fetchLocation(searchLocation);
    if (data) {
      form.setFieldsValue({
        ...data,
        plotAreaId:
          data.plotAreaId === 0 ? undefined : data.plotAreaId,
        lat: isEditModal ? parseFloat(data.lat) : undefined,
        long: isEditModal ? parseFloat(data.long) : undefined,
      });
    }
  }, [searchLocation, data, form, isEditModal]);

  const handleSearchLocation = async (value: any) => {
    if (value !== undefined) {
      const a = location.filter((x) => x.subdistrictId === value)[0];
      form.setFieldsValue({
        lat: a.lat,
        long: a.long,
        plotAreaId: a.subdistrictId,
      });
      setMapPosition({
        lat: a.lat != null ? parseFloat(a.lat) : 0,
        lng: a.long != null ? parseFloat(a.long) : 0,
      });
    } else {
      setMapPosition(LAT_LNG_BANGKOK);
    }
  };

  const handleShowComment = (e : RadioChangeEvent) =>{
    setFarmerPlot({
      ...farmerPlot,
      status : e.target.value
    })
    if(e.target.value != "REJECTED"){
      form.setFieldsValue({
        comment : ""
      });
    }
  }

  const handleOnChangeLat = (value: any) => {
    setFarmerPlot((prev) => ({
      ...prev,
      lat: value.target.value,
    }));

    setMapPosition((prev) => ({
      lat: parseFloat(value.target.value),
      lng: prev?.lng,
    }));
  };
  const handleOnChangeLng = (value: any) => {
    setFarmerPlot((prev) => ({
      ...prev,
      long: value.target.value,
    }));

    setMapPosition((prev) => ({
      lat: prev?.lat,
      lng: parseFloat(value.target.value),
    }));
  };

  const handelCallBack = async (values: FarmerPlotEntity) => {
    let locationName = "";
    let geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(values.lat),
      lng: parseFloat(values.long),
    };
    await geocoder
      .geocode({
        location: latlng,
        region: "th",
      })
      .then((res) => {
        let location = res.results[0].address_components;
        locationName =
          location[1].short_name +
          " " +
          location[2].short_name +
          " " +
          location[3].long_name;
      });

    const payload = {
      ...farmerPlot,
      ...values,
      locationName,
      plotId: editIndex,
    };
    callBack(payload);
  };
  const checkValidate = (data: FarmerPlotEntity) => {
    let checkEmpty = ![
      data.plantName,
      data.plotName,
      data.landmark,
      data.raiAmount,
    ].includes("");
    let checkEmptyNumber = ![
      data.plotAreaId,
      data.lat,
      data.long,
    ].includes(0);
    if (checkEmpty && checkEmptyNumber) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue();
    checkValidate(valuesForm);
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}>
            {title}
          </div>
        }
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => form.submit()}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}>
        <Form
          key={data.plotId}
          form={form}
          onFinish={handelCallBack}
          onFieldsChange={onFieldsChange}>
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
              ]}>
              <Input placeholder="กรอกชื่อแปลง" autoComplete="off" />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>
              พืชที่ปลูก <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="plantName">
              <Select allowClear placeholder="เลือกพืชที่ปลูก">
                {EXP_PLANT.map((x) => (
                  <Select.Option value={x}>{x}</Select.Option>
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
              ]}>
              <Input
                placeholder="ไร่"
                autoComplete="off"
                suffix="ไร่"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>พื้นที่แปลงเกษตร</label>
            <span style={{ color: "red" }}>*</span>
            <Form.Item name="plotAreaId">
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
                defaultValue={
                  data.plotAreaId === 0 ? null : data.plotAreaId
                }>
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
            <Form.Item name="mapUrl">
              <Input
                placeholder="กรอกข้อมูล Url Google Map"
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Latitude (ละติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                name="lat"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกละติจูด!",
                  },
                ]}
                key={mapPosition?.lat}>
                <Input
                  placeholder="กรอกข้อมูล Latitude"
                  defaultValue={mapPosition?.lat}
                  onBlur={handleOnChangeLat}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>Longitude (ลองติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                name="long"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกลองติจูด!",
                  },
                ]}
                key={mapPosition?.lng}>
                <Input
                  placeholder="กรอกข้อมูล Longitude"
                  defaultValue={mapPosition?.lng}
                  onBlur={handleOnChangeLng}
                />
              </Form.Item>
            </div>
          </div>
          <GoogleMap
            changeLatLng={(lat,lng)=>{
              form.setFieldsValue({
                lat : lat,
                long : lng
              })
            }}
            isEdit={true}
            width="470px"
            height="300px"
            zoom={17}
            lat={mapPosition?.lat}
            lng={mapPosition?.lng}
          />
          <div className="form-group">
            <label>
              จุดสังเกตใกล้แปลง (เช่น รร.บ้านน้อย){" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="landmark">
              <Input
                placeholder="กรอกจุดสังเกต"
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
            <Form.Item
              name="status"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกสถานะ!",
                },
              ]}>
              {
                isEditModal?
                <Radio.Group defaultValue={farmerPlot.status} onChange={handleShowComment}>
                  <Space direction="vertical">
                    <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                    <Radio value={"PENDING"}>รอการตรวจสอบ</Radio>
                    <Radio value={"REJECTED"}>ไม่อนุมัติ</Radio>
                    <Radio value={"INACTIVE"}>ปิดการใช้งาน</Radio>
                  </Space>
                </Radio.Group>:
                <Radio.Group defaultValue={farmerPlot.status}>
                  <Space direction="vertical">
                    <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                    <Radio value={"PENDING"}>รอการตรวจสอบ</Radio>
                  </Space>
                </Radio.Group>
              }
            </Form.Item>
            {farmerPlot.status == "REJECTED" && (
              <div className="form-group">
                <br />
                <Form.Item name="comment"
                  rules={[
                    {
                      required: farmerPlot.status === "REJECTED",
                      message: "กรุณากรอกเหตุผลที่ไม่อนุมัติ!",
                    },
                  ]}>
                  <TextArea
                    className="col-lg-12"
                    rows={3}
                    placeholder="กรอกเหตุผล/เหตุหมายเพิ่มเติม"
                    autoComplete="off"                    
                  />
                </Form.Item>
              </div>
          )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalFarmerPlot;
