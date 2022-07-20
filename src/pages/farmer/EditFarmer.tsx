import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Pagination,
  Badge,
  Radio,
  Space,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import {
  DeleteOutlined,
  EditOutlined,
  PictureFilled,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import color from "../../resource/color";
import FooterPage from "../../components/footer/FooterPage";
import ActionButton from "../../components/button/ActionButton";
import { CardHeader } from "../../components/header/CardHearder";
import {
  GetFarmerEntity,
  GetFarmerEntity_INIT,
} from "../../entities/FarmerEntities";
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from "../../entities/LocationEntities";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../entities/FarmerPlotEntities";
import {
  FARMER_STATUS_SEARCH,
  STATUS_FARMERPLOT_COLOR_MAPPING,
  STATUS_NORMAL_MAPPING,
} from "../../definitions/Status";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../entities/AddressEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import ModalFarmerPlot from "../../components/modal/ModalFarmerPlot";
import { FarmerPlotDatasource } from "../../datasource/FarmerPlotDatasource";

const { Option } = Select;

const _ = require("lodash");
const { Map } = require("immutable");

let queryString = _.split(window.location.pathname, "=");

const EditFarmer = () => {
  const farmerId = queryString[1];
  const [data, setData] = useState<GetFarmerEntity>(GetFarmerEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT);
  const [farmerPlotList, setFarmerPlotList] = useState<FarmerPlotEntity[]>([
    FarmerPlotEntity_INIT,
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const [province, setProvince] = useState<ProviceEntity[]>([
    ProvinceEntity_INIT,
  ]);
  const [district, setDistrict] = useState<DistrictEntity[]>([
    DistrictEntity_INIT,
  ]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([
    SubdistrictEntity_INIT,
  ]);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(
    FarmerPlotEntity_INIT
  );

  const fecthFarmer = async () => {
    await FarmerDatasource.getFarmerById(farmerId).then((res) => {
      setData(res);
      setAddress(res.address);
      setFarmerPlotList(res.farmerPlot);
    });
  };

  useEffect(() => {
    fecthFarmer();
  }, []);

  useEffect(() => {
    LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
    LocationDatasource.getDistrict(address.provinceId).then((res) => {
      setDistrict(res);
    });
    LocationDatasource.getSubdistrict(address.districtId).then((res) => {
      setSubdistrict(res);
    });
  }, [address.provinceId, address.districtId]);

  const uploadButton = (
    <div>
      <PictureFilled style={{ fontSize: "50px", color: color.Success }} />
      <div style={{ fontSize: "20px", color: color.Success }}>+ Upload</div>
    </div>
  );

  //#region funttion farmer
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
  };

  const handleOnChangeProvince = async (provinceId: number) => {
    const d = Map(address).set("provinceId", provinceId);
    setAddress(d.toJS());
  };

  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set("districtId", districtId);
    setAddress(d.toJS());
  };

  const handleOnChangeSubdistrict = async (subdistrictId: number) => {
    const d = Map(address).set("subdistrictId", subdistrictId);
    setAddress(d.toJS());
    await handleOnChangePostcode(d.toJS());
  };

  const handleOnChangePostcode = (addr: AddressEntity) => {
    let getPostcode = subdistrict.filter(
      (x) => x.subdistrictId == addr.subdistrictId
    )[0].postcode;
    const c = Map(addr).set("postcode", getPostcode);
    setAddress(c.toJS());
  };

  const handleOnChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const d = Map(address).set("address1", e.target.value);
    setAddress(d.toJS());
  };

  const handleChangePlotstatus = (e: any) => {
    const m = Map(data).set("status", e.target.value);
    setData(m.toJS());
  };
  //#endregion

  //#region function farmer plot
  const editPlot = (data: FarmerPlotEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditFarmerPlot(data);
  };

  const removePlot = async (data: FarmerPlotEntity) => {
    await FarmerPlotDatasource.deleteFarmerPlot(data.id).then();
    fecthFarmer();
  };

  const updateFarmerPlot = async (data: FarmerPlotEntity) => {
    const p = Map(data).set("farmerId", farmerId);
    if (p.toJS().id != "") {
      await FarmerPlotDatasource.updateFarmerPlot(p.toJS()).then();
      setShowEditModal((prev) => !prev);
    } else {
      await FarmerPlotDatasource.insertFarmerPlot(p.toJS()).then();
      setShowAddModal((prev) => !prev);
    }
    fecthFarmer();
  };
  //#region 

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลเกษตรกร" />
        <Form style={{ padding: "32px" }}>
          <div className="row">
            <div className="form-group text-center pb-5">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                iconRender={UploadOutlined}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ชื่อ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อ"
                  defaultValue={data.firstname}
                  autoComplete="off"
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                นามสกุล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกนามสกุล"
                  defaultValue={data.lastname}
                  autoComplete="off"
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                เบอร์โทร <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="telephoneNo"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทร!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกเบอร์โทร"
                  defaultValue={data.telephoneNo}
                  autoComplete="off"
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสบัตรประชาชน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="idNo"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสบัตรประชาชน!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกบัตรประชาชน"
                  defaultValue={data.idNo}
                  autoComplete="off"
                  onChange={handleOnChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>
                รูปถ่ายผู้สมัครคู่กับบัตรประชาชน{" "}
                {/* <span style={{ color: "red" }}>*</span> */}
              </label>
              <br />
              <Upload listType="picture" className="upload-list-inline">
                <Button
                  style={{
                    backgroundColor: "rgba(33, 150, 83, 0.1)",
                    border: color.Success + "1px dashed",
                    borderRadius: "5px",
                  }}
                >
                  <span style={{ color: color.Success }}>อัพโหลดรูปภาพ</span>
                </Button>
              </Upload>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                จังหวัด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="province">
                <Select
                  placeholder="เลือกจังหวัด"
                  defaultValue={address.provinceId}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeProvince}
                >
                  {province.map((item) => (
                    <Option value={item.provinceId}>{item.region}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="district">
                <Select
                  placeholder="เลือกอำเภอ"
                  defaultValue={address.districtId}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeDistrict}
                >
                  {district.map((item) => (
                    <Option value={item.districtId}>{item.districtName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ตำบล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="subdistrict">
                <Select
                  placeholder="เลือกตำบล"
                  defaultValue={address.subdistrictId}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleOnChangeSubdistrict}
                >
                  {subdistrict.map((item) => (
                    <Option value={item.subdistrictId}>
                      {item.subdistrictName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสไปรษณีย์ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="postcode">
                <Input
                  placeholder="เลือกรหัสไปรษณีย์"
                  defaultValue={address.postcode}
                  key={address.subdistrictId}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                ที่อยู่บ้าน <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่บ้าน!",
                  },
                ]}
              >
                <TextArea
                  className="col-lg-12"
                  rows={5}
                  placeholder="กรอกที่อยู่บ้าน (เลขที่บ้าน, หมู่บ้าน, ชื่ออาคาร/ตึก, ซอย)"
                  defaultValue={address.address1}
                  autoComplete="off"
                  onChange={handleOnChangeAddress}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <div className="form-group">
              <label>
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Radio.Group
                defaultValue={data.status}
                onChange={handleChangePlotstatus}
              >
                <Space direction="vertical">
                  {FARMER_STATUS_SEARCH.map((item) => (
                    <Radio value={item.value}>{item.name}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );

  const renderLand = (
    <div className="col-lg-4">
      <CardContainer>
        <div
          style={{
            backgroundColor: color.Success,
            borderRadius: "12px 12px 0px 0px",
            padding: "10px 10px 10px 10px",
          }}
          className="d-flex justify-content-between"
        >
          <h4 className="pt-2 ps-3" style={{ color: "white" }}>
            แปลงเกษตร
          </h4>
          <Button
            className="pt-2"
            style={{
              backgroundColor: color.secondary1,
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            เพิ่มแปลง
          </Button>
        </div>
        <Form>
          {farmerPlotList.length != 0 ? (
            <div className="container">
              {farmerPlotList.map((item, index) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-4">
                    <span>{item.plotName}</span>
                    <br />
                    <p style={{ fontSize: "12px", color: color.Grey }}>
                      {item.plantName}
                    </p>
                  </div>
                  <div className="col-lg-2">
                    <span>{item.raiAmount} ไร่</span>
                  </div>
                  <div className="col-lg-3">
                    <span
                      style={{
                        color:
                          STATUS_FARMERPLOT_COLOR_MAPPING[
                            item.isActive.toString()
                          ],
                      }}
                    >
                      <Badge
                        color={
                          STATUS_FARMERPLOT_COLOR_MAPPING[
                            item.isActive.toString()
                          ]
                        }
                      />
                      {STATUS_NORMAL_MAPPING[item.isActive.toString()]}
                    </span>
                  </div>
                  <div className="col-lg-3 d-flex justify-content-between">
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<EditOutlined />}
                        color={color.primary1}
                        onClick={() => editPlot(item, index)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<DeleteOutlined />}
                        color={color.Error}
                        onClick={() => removePlot(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData}></img>
              <h5>ยังไม่มีแปลงเกษตร</h5>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <h5>รายการทั้งหมด {farmerPlotList.length} รายการ</h5>
        {farmerPlotList.length < 10 ? null : (
          <Pagination defaultCurrent={1} total={1} />
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexFarmer")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            แก้ไขข้อมูลเกษตรกร (Farmer)
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexFarmer")}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalFarmerPlot
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={updateFarmerPlot}
          data={FarmerPlotEntity_INIT}
          editIndex={editIndex}
        />
      )}
      {showEditModal && (
        <ModalFarmerPlot
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={updateFarmerPlot}
          data={editFarmerPlot}
          editIndex={editIndex}
        />
      )}
    </Layout>
  );
};

export default EditFarmer;
