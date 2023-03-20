import {
  Badge,
  Button,
  Form,
  Input,
  Pagination,
  Radio,
  Row,
  Space,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import FooterPage from "../../../components/footer/FooterPage";
import { CardHeader } from "../../../components/header/CardHearder";
import Layout from "../../../components/layout/Layout";
import { color } from "../../../resource";
import { DroneDatasource } from "../../../datasource/DroneDatasource";
import {
  CreateDroneEntity,
  CreateDroneEntity_INIT,
  DroneBrandEntity,
  DroneBrandEntity_INIT,
  DroneBrandListEntity,
} from "../../../entities/DroneBrandEntities";
import emptyData from "../../../resource/media/empties/tabler_drone.png";
import ActionButton from "../../../components/button/ActionButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DroneListEntity } from "../../../entities/DroneEntities";

import uploadImg from "../../../resource/media/empties/uploadImg.png";
import { resizeFileImg } from "../../../utilities/ResizeImage";
import {
  ImageEntity,
  ImageEntity_INTI,
} from "../../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../../datasource/UploadImageDatasource";
import ModalDroneBrand from "../../../components/modal/ModalDroneBrand";
import Swal from "sweetalert2";

const _ = require("lodash");
const { Map } = require("immutable");

let queryString = _.split(window.location.pathname, "=");

const EditDroneBrand = () => {
  const row = 7;
  const [current, setCurrent] = useState(1);
  const droneBrandId = queryString[1];
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [data, setData] = useState<DroneBrandEntity>(DroneBrandEntity_INIT);
  const [dataDrone, setDataDrone] = useState<DroneListEntity>();
  const [imgDroneBrand, setImgDroneBrand] = useState<any>();
  const [filterImg, setFilterImage] = useState<any>();

  const [getDroneBarnd, setGetDroneBrand] = useState<DroneBrandListEntity>();

  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const [createImgDroneBrand, setCreateImgDroneBrand] =
    useState<ImageEntity>(ImageEntity_INTI);
  const [editDrone, setEditDrone] = useState<CreateDroneEntity>(
    CreateDroneEntity_INIT
  );

  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setGetDroneBrand(res);
      if (res.data !== undefined) {
        const findId = res.data.find((x) => x.id === droneBrandId);
        if (findId?.file.length != 0) {
          const findFile = res.data.find((x) => x.id === droneBrandId)?.file;
          const findImg = findFile?.map((x) => x.path)[0];
          UploadImageDatasouce.getImage(findImg).then((res) => {
            setFilterImage(res.url);
          });
        } else {
          setFilterImage(undefined);
        }
      }
    });
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandById(droneBrandId).then((res) => {
      setData(res);
      setImgDroneBrand(res.logoImagePath);
    });
  };
  const fetchDroneList = async () => {
    await DroneDatasource.getDrone(current, row, droneBrandId).then((res) => {
      setDataDrone(res);
    });
  };
  useEffect(() => {
    fetchDroneBrand();
    fetchDroneList();
    fetchDrone();
  }, [current]);
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
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
    setFilterImage(img_base64);
    const d = Map(createImgDroneBrand).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "DRONE_BRAND");
    const f = Map(e.toJS()).set("category", "DRONE_BRAND_LOGO");
    const g = Map(f.toJS()).set("resourceId", droneBrandId);
    setCreateImgDroneBrand(g.toJS());
  };
  const onPreviewDrone = async () => {
    let src = imgDroneBrand || filterImg;
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

  const removeImgDrone = async () => {
    if (filterImg) {
      const findId = getDroneBarnd?.data.find((x) => x.id === droneBrandId)
        ?.file[0];
      const filterId = findId?.id;
      const filterPath = findId?.path;
      UploadImageDatasouce.deleteImage(filterId, filterPath).then((res) => {});
      setImgDroneBrand("");
      setFilterImage(undefined);
    } else {
      const getImg = data.logoImagePath;
      if (getImg !== undefined) {
        const img = Map(data).set("logoImagePath", "");
        setData(img.toJS());
        setCreateImgDroneBrand(ImageEntity_INTI);
        setImgDroneBrand("");
        setFilterImage(undefined);
      }
    }
    setCreateImgDroneBrand(ImageEntity_INTI);
    setImgDroneBrand("");
    setFilterImage(undefined);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !e.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    const m = Map(data).set("name", e.target.value);
    setData(m.toJS());
  };
  const handleChangestatus = (e: any) => {
    const m = Map(data).set("isActive", e.target.value);
    setData(m.toJS());
  };
  const editDroneIndex = (data: CreateDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditDrone(data);
  };
  const removeDrone = (data: CreateDroneEntity) => {
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "โปรดตรวจสอบยี่ห้อโดรนที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อข้อมูลยี่ห้อโดรนและรุ่นโดรนในระบบ",
      cancelButtonText: "ย้อนกลับ",
      confirmButtonText: "ลบ",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DroneDatasource.deleteDroneList(data);
      }
      fetchDroneList();
    });
  };

  const renderFromData = (
    <div className="col-lg-6">
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
                    imgDroneBrand !== "" || filterImg !== undefined
                      ? imgDroneBrand || filterImg
                      : uploadImg
                  })`,
                }}
              >
                <input
                  key={imgDroneBrand || filterImg}
                  type="file"
                  onChange={onChangeImgDrone}
                  title="เลือกรูป"
                />
              </div>
              <div>
                {imgDroneBrand !== "" || filterImg !== undefined ? (
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
                ) : undefined}
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
                key={data.id}
                placeholder="กรอกชื่อยี่ห้อ/แบรนด์"
                autoComplete="off"
                defaultValue={data.name}
                onChange={handleOnChange}
              />
            </Form.Item>
          </div>
          <div>
            <label>
              สถานะ <span style={{ color: "red" }}>*</span>
            </label>
            <br />
          </div>

          <Radio.Group
            defaultValue={data.isActive}
            onChange={handleChangestatus}
          >
            <Space direction="vertical">
              <Radio value={true}>ใช้งาน</Radio>
              <Radio value={false}>ไม่ใช้งาน</Radio>
            </Space>
          </Radio.Group>
        </Form>
      </CardContainer>
    </div>
  );

  const renderLand = (
    <div className="col-lg-5">
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
          {dataDrone?.data.length != 0 ? (
            <div className="container">
              {dataDrone?.data.map((item, index) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-5">
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
                  <div className="col-lg">
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      {item.dronerDrone + " ลำ"}
                    </p>
                  </div>
                  <div className="col-lg">
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

                  <div className="col-lg d-flex justify-content-between">
                    <div className="col-lg">
                      <ActionButton
                        icon={<EditOutlined />}
                        color={color.primary1}
                        onClick={() => editDroneIndex(item, index)}
                      />
                    </div>
                    <div className="col-lg">
                      <ActionButton
                        icon={<DeleteOutlined />}
                        color={color.Error}
                        onClick={() => removeDrone(item)}
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
        <p>รายการทั้งหมด {dataDrone?.count} รายการ</p>
        <Pagination
          current={current}
          total={dataDrone?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </div>
  );

  const updateSeriesDrone = async (data: CreateDroneEntity) => {
    const payload = {
      ...data,
      droneBrandId,
    };
    if (payload.id !== "") {
      await DroneDatasource.UpdateDroneList(payload);
      setShowEditModal((prev) => !prev);
    } else {
      await DroneDatasource.CreateDroneList(payload);
      setShowAddModal((prev) => !prev);
    }
    fetchDroneList();
  };
  const updateDroneBrand = async () => {
    if (createImgDroneBrand.file !== "") {
      UploadImageDatasouce.uploadImage(createImgDroneBrand);
    }
    const pushDrone = Map(data).set("drone", dataDrone);
    const payload = {
      ...pushDrone.toJS(),
    };
    delete payload.drone;
    await DroneDatasource.updateDroneBrand(payload).then((res) => {
      if (res !== undefined) {
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
  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>แก้ไขยี่ห้อโดรน</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderFromData}
        {renderLand}
      </Row>
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={updateDroneBrand}
        disableSaveBtn={saveBtnDisable}
      />
      {showAddModal && (
        <ModalDroneBrand
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={updateSeriesDrone}
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
          callBack={updateSeriesDrone}
          data={editDrone}
          editIndex={editIndex}
          title="แก้ไขรุ่นโดรน"
        />
      )}
    </Layout>
  );
};

export default EditDroneBrand;
