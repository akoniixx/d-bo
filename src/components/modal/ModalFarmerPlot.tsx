import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
} from "antd";
import FooterPage from "../footer/FooterPage";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../entities/FarmerPlotEntities";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import GoogleMap from "../map/GoogleMap";
import { SubdistrictEntity } from "../../entities/LocationEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";
import TextArea from "antd/lib/input/TextArea";
import { CropDatasource } from "../../datasource/CropDatasource";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { color } from "../../resource";
import ModalEditRaiAmount from "./ModalEditRaiAmount";
import ModalHistory from "./ModalHistory";
import { validateOnlyNumWDecimal } from "../../utilities/TextFormatter";

const { Option } = Select;

const _ = require("lodash");
const { Map } = require("immutable");

interface ModalFarmerPlotProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: FarmerPlotEntity) => void;
  callBackModal: (data: boolean, raiAmount?: number) => void;
  data: FarmerPlotEntity;
  editIndex: number;
  title: string;
  isEditModal?: boolean;
  action?: string;
  showInPlotList?: string;
}
const ModalFarmerPlot: React.FC<ModalFarmerPlotProps> = ({
  show,
  backButton,
  callBack,
  callBackModal,
  data,
  editIndex,
  title,
  isEditModal = false,
  action,
  showInPlotList,
}) => {
  const [form] = Form.useForm();
  const [farmerPlot, setFarmerPlot] = useState<FarmerPlotEntity>(data);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalHistory, setModalHistory] = useState<boolean>(false);
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
  const [cropsName, setCropsName] = useState<any[]>([]);
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(
    FarmerPlotEntity_INIT
  );
  const [rai, setRai] = useState<any>();
  const [status, setStatus] = useState<any>(data.status);

  const fetchLocation = async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res);
    });
  };
  const getCropJustName = () => {
    CropDatasource.getCropJustName().then((res) => {
      setCropsName(res);
    });
  };

  useEffect(() => {
    setStatus(data.status);
    getCropJustName();
    fetchLocation(searchLocation);
    if (action && isEditModal) {
      form.setFieldsValue({
        plotAreaId: data.plotAreaId === 0 ? undefined : data.plotAreaId,
        lat: isEditModal ? parseFloat(data.lat) : undefined,
        long: isEditModal ? parseFloat(data.long) : undefined,
        plotName: data.plotName,
        plantName: data.plantName,
        raiAmount: data.raiAmount,
        mapUrl: data.mapUrl,
        landmark: data.landmark,
        comment: data.comment,
        reason: data.reason,
      });
    }
  }, [searchLocation, data, isEditModal]);

  const showEdit = (e: FarmerPlotEntity) => {
    setEditFarmerPlot(e);
    setModalEdit(!modalEdit);
    callBackModal(!modalEdit!);
  };
  const showHistory = (e: FarmerPlotEntity) => {
    setEditFarmerPlot(e);
    setModalHistory(!modalHistory);
    callBackModal(!modalEdit!);
  };
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

  const handleShowComment = (e: any) => {
    setStatus(e.target.value);
    if (e.target.value !== "REJECTED") {
      form.setFieldsValue({
        reason: "",
      });
    }
  };
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

  const checkNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value: inputValue } = e.target;
    const convertedNumber = validateOnlyNumWDecimal(inputValue);
    form.setFieldsValue({ [name]: convertedNumber });
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

    let f = form.getFieldsValue();
    let payload: any = {};
    payload.id = data.id;
    payload.plotName = f.plotName;
    payload.plantName = f.plantName;
    payload.raiAmount = f.raiAmount;
    payload.plotAreaId = f.plotAreaId;
    payload.mapUrl = f.mapUrl;
    payload.lat = f.lat;
    payload.long = f.long;
    payload.landmark = f.landmark;
    payload.status = status;
    payload.comment = f.comment;
    payload.reason = f.reason;
    payload.plotId = editIndex;
    callBack(payload);
    showInPlotList !== "indexPlot" && form.resetFields();
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
        onCancel={() => {
          backButton();
          showInPlotList !== "indexPlot" && form.resetFields();
        }}
        footer={[
          <FooterPage
            onClickBack={() => {
              backButton();
              showInPlotList !== "indexPlot" && form.resetFields();
            }}
            onClickSave={() => form.submit()}
            //disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form key={data.plotId} form={form} onFinish={handelCallBack}>
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
              <Input placeholder="กรอกชื่อแปลง" autoComplete="off" />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>
              พืชที่ปลูก <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="plantName"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกพืชที่ปลูก!",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                placeholder="เลือกพืชที่ปลูก"
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
                {cropsName.map((item) => (
                  <Option key={item.id} value={item.cropName}>
                    {item.cropName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          {/* <div className="form-group">
            <label>
              ลักษณะเฉพาะของพืช (เลือกอย่างน้อย 1 อย่าง){" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="plantCharacteristics">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={onChangePlantCharacter}
              >
                <Row>
                  <Col span={8}>
                    <Checkbox value="นาหว่านน้ำตม">นาหว่านน้ำตม</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="นาหว่านข้าวแห้ง">นาหว่านข้าวแห้ง</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div> */}
          <Row justify={"space-between"} gutter={8}>
            <Col span={isEditModal && action === "edit" ? 12 : 24}>
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
                  placeholder="กรอกจำนวนไร่"
                  onChange={(e) => checkNumber(e, "raiAmount")}
                  disabled={isEditModal && action === "edit"}
                />
              </Form.Item>
            </Col>
            {isEditModal && action === "edit" && (
              <>
                <Col style={{ paddingTop: "22px" }}>
                  <Button
                    onClick={() => showEdit(data)}
                    type="dashed"
                    style={{
                      color: color.Success,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderColor: color.Success,
                      background: color.bgSuccess,
                      width: "100%",
                    }}
                  >
                    แก้ไขจำนวน
                  </Button>
                </Col>
                <Col style={{ paddingTop: "22px" }}>
                  <Button
                    onClick={() => showHistory(data)}
                    type="dashed"
                    style={{
                      color: color.Success,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderColor: color.Success,
                      background: color.bgSuccess,
                      width: "100%",
                    }}
                  >
                    ประวัติการแก้ไข
                  </Button>
                </Col>
              </>
            )}
          </Row>
          <div className="form-group">
            <label>พื้นที่แปลงเกษตร</label>
            <span style={{ color: "red" }}>*</span>
            <Form.Item
              name="plotAreaId"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกพื้นที่แแปลงเกษตร!",
                },
              ]}
            >
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
            <Form.Item name="mapUrl">
              <Input
                placeholder="URL Link Google Maps"
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
                key={mapPosition?.lat}
              >
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
                key={mapPosition?.lng}
              >
                <Input
                  placeholder="กรอกข้อมูล Longitude"
                  defaultValue={mapPosition?.lng}
                  onBlur={handleOnChangeLng}
                />
              </Form.Item>
            </div>
          </div>
          <GoogleMap
            changeLatLng={(lat, lng) => {
              form.setFieldsValue({
                lat: lat,
                long: lng,
              });
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
            <Form.Item
              name="landmark"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจุดสังเกต",
                },
              ]}
            >
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
            {isEditModal && action === "edit" ? (
              <Radio.Group onChange={handleShowComment} value={status}>
                <Space direction="vertical">
                  <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                  <Radio value={"PENDING"}>รอการตรวจสอบ</Radio>
                  <Radio value={"REJECTED"}>
                    ไม่อนุมัติ
                    {status === "REJECTED" && (
                      <div className="form-group">
                        <br />
                        <Form.Item
                          name="reason"
                          rules={[
                            {
                              required: status === "REJECTED",
                              message: "กรุณากรอกเหตุผลที่ไม่อนุมัติ!",
                            },
                          ]}
                        >
                          <TextArea
                            className="col-lg-12"
                            rows={3}
                            placeholder="กรอกเหตุผล/เหตุหมายเพิ่มเติม"
                            autoComplete="off"
                          />
                        </Form.Item>
                      </div>
                    )}
                  </Radio>
                  <Radio value={"INACTIVE"}>
                    ปิดการใช้งาน
                    {status === "INACTIVE" && (
                      <div className="form-group">
                        <br />
                        <Form.Item
                          name="reason"
                          rules={[
                            {
                              required: status === "INACTIVE",
                              message: "กรุณากรอกเหตุผลที่ไม่อนุมัติ!",
                            },
                          ]}
                        >
                          <TextArea
                            className="col-lg-12"
                            rows={3}
                            placeholder="กรอกเหตุผล/เหตุหมายเพิ่มเติม"
                            autoComplete="off"
                          />
                        </Form.Item>
                      </div>
                    )}
                  </Radio>
                </Space>
              </Radio.Group>
            ) : (
              <Radio.Group onChange={handleShowComment} value={status}>
                <Space direction="vertical">
                  <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                  <Radio value={"PENDING"}>รอการตรวจสอบ</Radio>
                </Space>
              </Radio.Group>
            )}
            <div className="form-group " style={{ marginTop: 16 }}>
              <label>หมายเหตุ</label>
              <Form.Item name="comment">
                <TextArea className="col-lg-12" autoComplete="off" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      {modalEdit && (
        <ModalEditRaiAmount
          show={modalEdit}
          backButton={() => setModalEdit((prev) => !prev)}
          callBackReturn={() => {
            callBackModal(show);
            setModalEdit((prev) => !prev);
          }}
          data={editFarmerPlot}
          callBackEditRai={(data) => {
            setModalEdit((prev) => !prev);
            callBackModal(show, parseInt(data.responseData.raiAfter));
            form.setFieldValue(
              "raiAmount",
              parseFloat(data.responseData.raiAfter).toFixed(2)
            );
            setRai(parseFloat(data.responseData.raiAfter).toFixed(2));
          }}
        />
      )}
      {modalHistory && (
        <ModalHistory
          show={modalHistory}
          data={editFarmerPlot}
          backButton={() => setModalHistory((prev) => !prev)}
          callBackReturn={() => {
            setModalHistory((prev) => !prev);
            callBackModal(show);
          }}
        />
      )}
    </>
  );
};

export default ModalFarmerPlot;
