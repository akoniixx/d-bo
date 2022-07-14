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
  Modal,
} from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import {
  EditOutlined,
  PictureFilled,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import color from "../../resource/color";
import FooterPage from "../../components/footer/FooterPage";
import { CardHeader } from "../../components/header/CardHearder";
import { FarmerEntity, FarmerEntity_INIT } from "../../entities/FarmerEntities";
import {
  DistrictEntity,
  DistrictEntity_INIT,
  ProviceEntity,
  ProvinceEntity_INIT,
  SubdistrictEntity,
  SubdistrictEntity_INIT,
} from "../../entities/LocationEntities";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../entities/AddressEntities";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../entities/FarmerPlotEntities";
import { STATUS_NORMAL_MAPPING } from "../../definitions/Status";
import ActionButton from "../../components/button/ActionButton";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";
import Swal from "sweetalert2";
import ModalFarmerPlot from "../../components/modal/ModalFarmerPlot";
import { boolean, number } from "yup";
import { Prev } from "react-bootstrap/esm/PageItem";

const { Option } = Select;

const _ = require("lodash");
const { Map } = require("immutable");

const AddFarmer = () => {
  const [data, setData] = useState<FarmerEntity>(FarmerEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(AddressEntity_INIT);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [province, setProvince] = useState<ProviceEntity[]>([
    ProvinceEntity_INIT,
  ]);
  const [district, setDistrict] = useState<DistrictEntity[]>([
    DistrictEntity_INIT,
  ]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([
    SubdistrictEntity_INIT,
  ]);
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(
    FarmerPlotEntity_INIT
  );
  const [farmerPlotList, setFarmerPlotList] = useState<FarmerPlotEntity[]>([]);

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  //#region data farmer
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set(e.target.id, e.target.value);
    setData(m.toJS());
  };
  const handleOnChangeProvince = async (provinceId: number) => {
    await getProvince(provinceId, AddressEntity_INIT);
  };

  const getProvince = async (provinceId: number, addr: AddressEntity) => {
    const d = Map(addr).set("provinceId", provinceId);
    setAddress(d.toJS());
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res);
    });
  };

  const handleOnChangeDistrict = async (districtId: number) => {
    const d = Map(address).set("districtId", districtId);
    setAddress(d.toJS());

    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res);
    });
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
  //#endregion

  //#region data plot farmer
  const colorStatus = (status: string) => {
    var mapStatus = STATUS_NORMAL_MAPPING[status];
    var colorText = color.Success;
    colorText = mapStatus == "ใช้งาน" ? colorText : color.Error;
    return colorText;
  };

  const insertFarmerPlot = (data: FarmerPlotEntity) => {
    console.log("data", data);
    const mId = Map(data).set("farmerId", farmerPlotList.length + 1);
    setFarmerPlotList([...farmerPlotList, mId.toJS()]);

    // if (checkPlot.length) {

    // } else {
    //   const mId = Map(data).set("farmerId", farmerPlotList.length + 1);
    //   console.log("2",mId.toJS());
    //   setFarmerPlotList([...farmerPlotList, mId.toJS()]);
    // }

    setAddModal(false);
    setEditModal(false);
  };
  //#endregion

  const uploadButton = (
    <div>
      <PictureFilled style={{ fontSize: "50px", color: color.Success }} />
      <div style={{ fontSize: "20px", color: color.Success }}>+ Upload</div>
    </div>
  );

  const insertFarmer = async () => {
    const pushAddr = Map(data).set("address", address);
    setData(pushAddr.toJS());
    const pushPlot = Map(pushAddr.toJS()).set("farmerPlot", farmerPlotList);
    setData(pushPlot.toJS());
    console.log(pushPlot.toJS());
    // await FarmerDatasource.insertFarmer(pushPlot.toJS()).then((res) => {
    //   if (res.success) {
    //     Swal.fire({
    //       title: "บันทึกสำเร็จ",
    //       icon: "success",
    //       timer: 1500,
    //       showConfirmButton: false,
    //     }).then((time) => {
    //       window.location.href = "/IndexAdmin";
    //     });
    //   }
    // });
  };

  const editPlot = (data: FarmerPlotEntity, index:number) => {
    setEditModal((prev) => !prev);
    setEditFarmerPlot(data);
  };

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
                <Input placeholder="กรอกชื่อ" onChange={handleOnChange} />
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
                <Input placeholder="กรอกนามสกุล" onChange={handleOnChange} />
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
                <Input placeholder="กรอกเบอร์โทร" onChange={handleOnChange} />
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
              <Form.Item name="provinceId">
                <Select
                  showSearch
                  placeholder="เลือกจังหวัด"
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
                  key={address.provinceId}
                >
                  {province?.map((item) => (
                    <Option value={item.provinceId}>{item.region}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item name="districtId">
                <Select
                  placeholder="เลือกอำเภอ"
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
                  key={address.provinceId}
                >
                  {district?.map((item) => (
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
              <Form.Item name="subdistrictId">
                <Select
                  placeholder="เลือกตำบล"
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
                  key={address.provinceId}
                >
                  {subdistrict?.map((item) => (
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
                  onChange={handleOnChangeAddress}
                />
              </Form.Item>
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
            onClick={() => setAddModal((prev) => !prev)}
          >
            เพิ่มแปลง
          </Button>
        </div>
        {farmerPlotList?.length != 0 ? (
          <Form>
            {farmerPlotList.map((item, index) => (
              <div className="container" style={{ padding: "10px" }}>
                <div className="d-flex justify-content-between">
                  <div>
                    {item.plotName}
                    <br />
                    <small>{item.plantName}</small>
                  </div>
                  <div>{item.raiAmount} ไร่</div>
                  <div>
                    <span
                      style={{ color: colorStatus(item.isActive.toString()) }}
                    >
                      <Badge color={colorStatus(item.isActive.toString())} />
                      {STATUS_NORMAL_MAPPING[item.isActive.toString()]}
                    </span>
                  </div>
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => editPlot(item, index)}
                  />
                </div>
              </div>
            ))}
          </Form>
        ) : (
          <Form>
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData}></img>
              <p>ยังไม่มีแปลงเกษตร</p>
            </div>
          </Form>
        )}
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <h5>รายการทั้งหมด {farmerPlotList?.length} รายการ</h5>
        {/* <Pagination defaultCurrent={1} total={1} /> */}
      </div>
    </div>
  );

  return (
    <Layout>
      {console.log(farmerPlotList)}
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexFarmer")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            เพิ่มข้อมูลเกษตรกร (Farmer)
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexFarmer")}
        onClickSave={insertFarmer}
      />
      {addModal && (
        <ModalFarmerPlot
          show={addModal}
          backButton={() => setAddModal((prev) => !prev)}
          callBack={insertFarmerPlot}
          data={FarmerPlotEntity_INIT}
        />
      )}
      {editModal && (
        <ModalFarmerPlot
          show={editModal}
          backButton={() => setEditModal((prev) => !prev)}
          callBack={insertFarmerPlot}
          data={editFarmerPlot}
        />
      )}
    </Layout>
  );
};

export default AddFarmer;
