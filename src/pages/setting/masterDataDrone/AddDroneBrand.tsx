import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Form,
  Input,
  Layout,
  Pagination,
  Row,
  Tag,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import AddButtton from "../../../components/button/AddButton";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import {
  DRONER_DRONE_MAPPING,
  STATUS_COLOR,
} from "../../../definitions/DronerStatus";
import { color } from "../../../resource";
import uploadImg from "../../../resource/media/empties/uploadImg.png";
import emptyData from "../../../resource/media/empties/tabler_drone.png";
import ModalDrone from "../../../components/modal/ModalDronerDrone";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
} from "../../../entities/DronerDroneEntities";
import ModalDroneBrand from "../../../components/modal/ModalDroneBrand";
import { resizeFileImg } from "../../../utilities/ResizeImage";
import {
  ImageEntity,
  ImageEntity_INTI,
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../../entities/UploadImageEntities";
import {
  CreateDroneBrandEntity,
  CreateDroneBrandEntity_INIT,
  CreateDroneEntity,
  CreateDroneEntity_INIT,
} from "../../../entities/DroneBrandEntities";
import { DroneDatasource } from "../../../datasource/DroneDatasource";
import Swal from "sweetalert2";
import { UploadImageDatasouce } from "../../../datasource/UploadImageDatasource";

const _ = require("lodash");
const { Map } = require("immutable");
function AddDroneBrand() {
  const row = 5;
  const navigate = useNavigate();
  const [data, setData] = useState<CreateDroneBrandEntity>(
    CreateDroneBrandEntity_INIT
  );
  const [imgDroneBrand, setImgDroneBrand] = useState<any>();
  const [dronerDroneList, setDronerDroneList] = useState<DronerDroneEntity[]>(
    []
  );
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const [droneList, setDroneList] = useState<CreateDroneEntity[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [createImgDroneBrand, setCreateImgDroneBrand] =
    useState<UploadImageEntity>(UploadImageEntity_INTI);
  const [editDrone, setEditDrone] = useState<CreateDroneEntity>(
    CreateDroneEntity_INIT
  );

  const onChangeImgDrone = async (file: any) => {
    const source = file.target.files[0];
    let newSource: any;

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024;
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split("/")[1],
        quality: 70,
        rotation: 0,
        responseUriFunc: (res: any) => {},
      });
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source);
      reader.onload = () => resolve(reader.result);
    });

    setImgDroneBrand(img_base64);
    const d = Map(createImgDroneBrand).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "DRONE_BRAND");
    const f = Map(e.toJS()).set("category", "DRONE_BRAND_LOGO");
    setCreateImgDroneBrand(f.toJS());
    console.log(f.toJS());
  };

  const onPreviewDrone = async () => {
    let src = imgDroneBrand;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgDroneBrand);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImgDrone = () => {
    setImgDroneBrand(undefined);
    setCreateImgDroneBrand(UploadImageEntity_INTI);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = Map(data).set("name", e.target.value);
    setData(m.toJS());
  };
  const editDroneBrand = (data: CreateDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditDrone(data);
  };
  const removeDrone = (index: number) => {
    const newData = droneList.filter((x) => x.droneId != index);
    setDroneList(newData);
  };
  const insertSeriesDrone = (data: CreateDroneEntity) => {
    if (data.droneId == 0) {
      const pushId = Map(data).set("droneBrandId", droneList.length + 1);
      setDroneList([...droneList, pushId.toJS()]);
    } else {
      const newData = droneList.filter((x) => x.droneId != data.droneId);
      setDroneList([...newData, data]);
    }
    setShowAddModal(false);
    setEditIndex(0);
  };
  const insertDroneBrand = async () => {
    const payload = {
      ...data,
      drone: droneList,
    };
    setData((prev) => ({
      ...prev,
      drone: droneList,
    }));
    await DroneDatasource.addDroneBrand(payload).then(async (res) => {
      if (res != undefined) {
        const fileList = [createImgDroneBrand]
          .filter((el) => {
            return el.file !== "" && el.file !== undefined;
          })
          .map((el) => {
            return UploadImageDatasouce.uploadImage(
              Map(el).set("resourceId", res.id).toJS()
            );
          })
        await Promise.all(fileList);
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/IndexDroneBrand";
        });
      }
    });
  };
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลยี่ห้อโดรน" />
        <Form>
          <div>
            <div
              className="form-group text-center pb-5"
              style={{ marginTop: "5%" }}
            >
              <div
                className="hiddenFileInput"
                style={{
                  backgroundImage: `url(${
                    imgDroneBrand === undefined ? uploadImg : imgDroneBrand
                  })`,
                }}
              >
                <input
                  key={imgDroneBrand}
                  type="file"
                  onChange={onChangeImgDrone}
                  title="เลือกรูป"
                />
              </div>
              <div>
                {imgDroneBrand != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewDrone}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImgDrone}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
            </div>
          </div>
        </Form>
        <Form style={{ padding: "22px" }}>
          <div className="form-group col-lg-12">
            <label>
              ชื่อยี่ห้อ/แบรนด์ <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="droneBrand"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อยี่ห้อแบรนด์!",
                },
              ]}
            >
              <Input
                placeholder="กรอกชื่อยี่ห้อ/แบรนด์"
                autoComplete="off"
                onBlur={handleOnChange}
              />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const renderDrone = (
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
            รายการรุ่นโดรน
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
            เพิ่มรุ่นโดรน
          </Button>
        </div>
        <Form>
          {droneList.length != 0 ? (
            <div className="container">
              {droneList.map((item, index) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-6">
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      {item.series}
                    </p>
                  </div>
                  <div className="col-lg-3">
                    <span
                      style={{
                        color: item.isActive ? color.Success : color.Error,
                      }}
                    >
                      <Badge
                        color={item.isActive ? color.Success : color.Error}
                      />{" "}
                      {item.isActive ? "ใช้งาน" : "ไม่ใช้งาน"}
                    </span>
                  </div>
                  <div className="col-lg-3 d-flex justify-content-between">
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<EditOutlined />}
                        color={color.primary1}
                        onClick={() => editDroneBrand(item, index + 1)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <ActionButton
                        icon={<DeleteOutlined />}
                        color={color.Error}
                        onClick={() => removeDrone(index + 1)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData} alt="" />
              <h5 style={{ color: color.Disable }}>ยังไม่มีข้อมูลรุ่นโดรน</h5>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {droneList.length} รายการ</p>
      </div>
    </div>
  );

  return (
    <Layouts>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>เพิ่มยี่ห้อโดรน</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderFromData}
        {renderDrone}
      </Row>
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={insertDroneBrand}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalDroneBrand
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={insertSeriesDrone}
          data={CreateDroneEntity_INIT}
          editIndex={editIndex}
          title="เพิ่มรุ่นโดรน"
        />
      )}
      {showEditModal && (
        <ModalDroneBrand
          isEditModal
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={insertSeriesDrone}
          data={editDrone}
          editIndex={editIndex}
          title="แก้ไขแปลงเกษตร"
        />
      )}
    </Layouts>
  );
}

export default AddDroneBrand;