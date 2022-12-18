import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Radio,
  Space,
  Badge,
  Tag,
  Avatar,
  DatePicker,
  Checkbox,
} from "antd";
import emptyData from "../../resource/media/empties/tabler_drone.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import FooterPage from "../../components/footer/FooterPage";
import { BackIconButton } from "../../components/button/BackButton";
import TextArea from "antd/lib/input/TextArea";
import {
  DronerEntity,
  DronerEntity_INIT,
} from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import Swal from "sweetalert2";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { EXP_PLANT } from "../../definitions/ExpPlant";
import ActionButton from "../../components/button/ActionButton";
import {
  AddressEntity,
  AddressEntity_INIT,
} from "../../entities/AddressEntities";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import {
  DronerDroneEntity,
  DronerDroneEntity_INIT,
} from "../../entities/DronerDroneEntities";
import ModalDrone from "../../components/modal/ModalDronerDrone";
import {
  DRONER_DRONE_MAPPING,
  DRONER_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import {
  ImageEntity,
  ImageEntity_INTI,
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import "../farmer/Style.css";
import uploadImg from "../../resource/media/empties/uploadImg.png";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import GoogleMap from "../../components/map/GoogleMap";
import {
  DronerAreaEntity,
  DronerAreaEntity_INIT,
} from "../../entities/DronerAreaEntities";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";

import moment from "moment";
import locale from "antd/es/date-picker/locale/th_TH";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { resizeFileImg } from "../../utilities/ResizeImage";
import { useNavigate } from "react-router-dom";

const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.search, "=");

function EditDroner() {
  const [form] = Form.useForm();
  const dronerId = queryString[1];
  const status = Form.useWatch("status", form);
  const navigate = useNavigate();
  const [profile] = useLocalStorage("profile", []);
  const [data, setData] = useState<DronerEntity>(DronerEntity_INIT);
  const [address, setAddress] = useState<AddressEntity>(
    AddressEntity_INIT
  );
  const [dronerArea, setDronerArea] = useState<DronerAreaEntity>(
    DronerAreaEntity_INIT
  );
  const [dronerDroneList, setDronerDroneList] = useState<
    DronerDroneEntity[]
  >([DronerDroneEntity_INIT]);
  const [disableSaveBtn, setDisableSaveBtn] =
    useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editDroneList, setEditDroneList] =
    useState<DronerDroneEntity>(DronerDroneEntity_INIT);
  const [province, setProvince] = useState<ProviceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>(
    []
  );
  const [imgProfile, setImgProfile] = useState<any>();
  const [imgIdCard, setImgIdCard] = useState<any>();
  const [createImgProfile, setCreateImgProfile] =
    useState<ImageEntity>(ImageEntity_INTI);
  const [createImgIdCard, setCreateImgIdCrad] =
    useState<ImageEntity>(ImageEntity_INTI);
  const [mapPosition, setMapPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const [location, setLocation] = useState<SubdistrictEntity[]>([]);
  const [searchLocation] = useState("");

  const [imgDroneList] = useState<UploadImageEntity[]>([
    UploadImageEntity_INTI,
  ]);

  const fetchDronerById = useCallback(async () => {
    await DronerDatasource.getDronerByID(dronerId).then(
      async (res) => {
        if (res.birthDate === null) {
          res.birthDate = moment().format(dateCreateFormat);
        }

        const checkBoxReason = (res.reason || []).filter((el) => {
          return el === "บัตรประชาชนไม่ชัดเจน/ไม่ถูกต้อง";
        });
        const checkPlantsOther = res.expPlant.filter((el) => {
          return EXP_PLANT.some((x) => x === el);
        });
        const plantsOther = res.expPlant.filter((el) => {
          return !EXP_PLANT.some((x) => x === el);
        });
        if (res) {
          form.setFieldsValue({
            ...res,
            comment: res.comment || "",
            postcode: res.address.postcode || undefined,
            province: res.address.provinceId || undefined,
            district: res.address.districtId || undefined,
            subdistrict: res.address?.subdistrictId || undefined,
            birthDate: moment(res.birthDate) || undefined,
            latitude: res.dronerArea?.lat || undefined,
            longitude: res.dronerArea?.long || undefined,
            address1: res.address?.address1 || undefined,
            address2: res.address?.address2 || undefined,
            checkPlantsOther: checkPlantsOther || [],
            dronerArea: res.dronerArea?.subdistrictId,
            mapUrl: res.dronerArea?.mapUrl || undefined,
            status: res.status,
            reason:
              (res?.reason || [])?.filter((el) => {
                return el !== "บัตรประชาชนไม่ชัดเจน/ไม่ถูกต้อง";
              }).length > 0
                ? (res?.reason || [])?.filter((el) => {
                    return el !== "บัตรประชาชนไม่ชัดเจน/ไม่ถูกต้อง";
                  })
                : null,

            plantsOther:
              plantsOther.length > 0
                ? plantsOther.join(",")
                : undefined,
            checkReason: checkBoxReason,
          });
        }

        setMapPosition({
          lat: parseFloat(res.dronerArea?.lat),
          lng: parseFloat(res.dronerArea?.long),
        });

        setAddress(res.address);
        var k = 0;
        if (res.dronerDrone !== undefined) {
          for (k; res.dronerDrone.length > k; k++) {
            res.dronerDrone[k].modalDroneIndex = k + 1;
          }
          setDronerDroneList(res.dronerDrone);
        }
        setDronerArea(res.dronerArea);
        const getPathPro = res.file.find(
          (x) => x.category === "PROFILE_IMAGE"
        );
        const getPathCard = res.file.find(
          (x) => x.category === "ID_CARD_IMAGE"
        );

        const getImageProfile =
          getPathPro &&
          UploadImageDatasouce.getImage(getPathPro?.path).then(
            (resImg) => {
              resImg?.url && setImgProfile(resImg.url);
            }
          );
        const getImageCard =
          getPathCard &&
          UploadImageDatasouce.getImage(getPathCard?.path).then(
            (resImg) => {
              resImg?.url && setImgIdCard(resImg.url);
            }
          );
        const listPromise = [];
        if (getPathPro) {
          listPromise.push(getImageProfile);
        }
        if (getPathCard) {
          listPromise.push(getImageCard);
        }
        if (listPromise.length > 0) {
          await Promise.all([...listPromise]);
        }
      }
    );
  }, [dronerId, form]);
  const fetchLocation = useCallback(async (text?: string) => {
    await LocationDatasource.getSubdistrict(0, text).then((res) => {
      setLocation(res);
    });
  }, []);
  const fetchDronerOnlyDrone = useCallback(async () => {
    await DronerDatasource.getDronerByID(dronerId).then(
      async (res) => {
        if (res.dronerDrone !== undefined) {
          let k = 0;
          for (k; res.dronerDrone.length > k; k++) {
            res.dronerDrone[k].modalDroneIndex = k + 1;
          }
          setDronerDroneList(res.dronerDrone);
        }
      }
    );
  }, [dronerId]);
  useEffect(() => {
    fetchDronerById();
    fetchLocation(searchLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocation]);

  useEffect(() => {
    LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
    if (address?.provinceId) {
      LocationDatasource.getDistrict(address.provinceId).then(
        (res) => {
          setDistrict(res);
        }
      );
    }
    if (address?.districtId) {
      LocationDatasource.getSubdistrict(address.districtId).then(
        (res) => {
          setSubdistrict(res);
        }
      );
    }
  }, [address.provinceId, address.districtId]);

  //#region data droner

  const handleChangeStatus = (e: any) => {
    form.setFieldsValue({
      reason: "",
      checkReason: [],
      status: e.target.value,
    });
  };

  //#endregion

  //#region address
  const handleProvince = async (provinceId: number) => {
    const d = Map(address).set("provinceId", provinceId);
    setAddress(d.toJS());
  };
  const handleDistrict = async (districtId: number) => {
    const d = Map(address).set("districtId", districtId);
    setAddress(d.toJS());
  };
  const handleSubDistrict = async (subdistrictId: number) => {
    const d = Map(address).set("subdistrictId", subdistrictId);
    setAddress(d.toJS());

    await handelPostCode(d.toJS());
  };
  const handelPostCode = (add: AddressEntity) => {
    let filterSubDistrict = subdistrict.filter(
      (item) => item.subdistrictId === add.subdistrictId
    )[0].postcode;
    const m = Map(add).set("postcode", filterSubDistrict);
    setAddress(m.toJS());
    form.setFieldsValue({
      postcode: m.toJS().postcode,
    });
  };

  //#endregion

  //#region map
  const handleSearchLocation = async (value: any) => {
    if (value !== undefined) {
      const a = location.filter((x) => x.subdistrictId === value)[0];
      const pushProvince = Map(dronerArea).set(
        "provinceId",
        a.provinceId
      );
      const pushDistric = Map(pushProvince.toJS()).set(
        "districtId",
        a.districtId
      );
      const pushSubDis = Map(pushDistric.toJS()).set(
        "subdistrictId",
        a.subdistrictId
      );
      const pushLat = Map(pushSubDis.toJS()).set("lat", a.lat);
      const pushLong = Map(pushLat.toJS()).set("long", a.long);
      setDronerArea(pushLong.toJS());
      form.setFieldsValue({
        latitude: a.lat,
        longitude: a.long,
      });
      setMapPosition({
        lat: a.lat !== null ? parseFloat(a.lat) : 0,
        lng: a.long !== null ? parseFloat(a.long) : 0,
      });
    } else {
      setMapPosition(LAT_LNG_BANGKOK);
    }
  };
  const handleOnChangeLat = (value: any) => {
    const m = Map(dronerArea).set("lat", value.target.value);
    setDronerArea(m.toJS());
    setMapPosition((prev) => ({
      lat: parseFloat(value.target.value),
      lng: prev.lng,
    }));
  };

  const handleOnChangeLng = (value: any) => {
    const m = Map(dronerArea).set("long", value.target.value);
    setDronerArea(m.toJS());
    setMapPosition((prev) => ({
      lat: prev.lat,
      lng: parseFloat(value.target.value),
    }));
  };
  //#endregion

  //#region modal drone
  const editDroner = (data: DronerDroneEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditDroneList(data);
  };
  const updateDrone = async (drone: DronerDroneEntity) => {
    const d = Map(drone).set("dronerId", dronerId);
    if (d.toJS().id !== "") {
      await DronerDroneDatasource.updateDronerDrone(d.toJS()).then(
        async (res) => {
          if (res.id !== null) {
            let checkFileImg: any = [];
            let findDrone = data.dronerDrone?.filter(
              (x) => x.id === drone.id
            )[0];
            checkFileImg = findDrone?.file
              .map((x) => x)
              .filter(
                (y) =>
                  !drone.file
                    .map((z) => z.category)
                    .includes(y.category)
              );
            if (checkFileImg.length > 0) {
              UploadImageDatasouce.deleteImage(
                checkFileImg[0].id,
                checkFileImg[0].path
              ).then(res);
              fetchDronerById();
            } else {
              for (let i: number = 0; drone.file.length > i; i++) {
                let getImg = drone.file[i];
                imgDroneList?.push({
                  resourceId: res.id,
                  category: getImg.category,
                  file: getImg.file,
                  resource: getImg.resource,
                  path: "",
                });
              }
              const checkImg = imgDroneList.filter(
                (x) => x.resourceId !== ""
              );
              for (let k = 0; checkImg.length > k; k++) {
                let getDataImg: any = checkImg[k];
                if (getDataImg.file !== undefined) {
                  await UploadImageDatasouce.uploadImage(
                    getDataImg
                  ).then(res);
                }
              }
            }
          }
        }
      );
    } else {
      await DronerDroneDatasource.createDronerDrone(d.toJS()).then(
        async (res) => {
          if (res.id !== null) {
            for (let i: number = 0; drone.file.length > i; i++) {
              let getImg = drone.file[i];
              imgDroneList?.push({
                resourceId: res.id,
                category: getImg.category,
                file: getImg.file,
                resource: getImg.resource,
                path: "",
              });
            }
            const checkImg = imgDroneList.filter(
              (x) => x.resourceId !== ""
            );
            for (let k = 0; checkImg.length > k; k++) {
              let getDataImg: any = checkImg[k];
              await UploadImageDatasouce.uploadImage(getDataImg).then(
                res
              );
            }
          }
        }
      );
    }
    // fetchDronerById();
    fetchDronerOnlyDrone();

    setShowAddModal(false);
    setShowEditModal(false);
    setEditIndex(0);
  };
  const removeDrone = async (id?: string) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบ",
        text: "โปรดตรวจสอบรายการโดรนที่คุณต้องการลบ เพราะอาจจะส่งผลต่อการจ้างงานในแอปพลิเคชัน",
        cancelButtonText: "ย้อนกลับ",
        confirmButtonText: "ลบ",
        confirmButtonColor: "#d33",
        showCancelButton: true,
        showCloseButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await DronerDroneDatasource.removeDronerDrone(id).then(
            () => {
              setDronerDroneList((prev) =>
                prev.filter((x) => x.id !== id)
              );
            }
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  //#endregion

  //#region img
  const onChangeProfile = async (file: any) => {
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
    setImgProfile(img_base64);
    const d = Map(createImgProfile).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "PROFILE_IMAGE");
    const g = Map(f.toJS()).set("resourceId", dronerId);
    setCreateImgProfile(g.toJS());
  };
  const onPreviewProfile = async () => {
    let src = imgProfile;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgProfile);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImg = () => {
    const getImg = data.file.filter(
      (x) => x.category === "PROFILE_IMAGE"
    )[0];
    if (getImg !== undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then(
        (res) => {}
      );
    }
    setCreateImgProfile(ImageEntity_INTI);
    setImgProfile(undefined);
  };

  const onChangeIdCard = async (file: any) => {
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
    setImgIdCard(img_base64);
    const d = Map(createImgIdCard).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "ID_CARD_IMAGE");
    const g = Map(f.toJS()).set("resourceId", dronerId);
    setCreateImgIdCrad(g.toJS());
  };
  const onPreviewIdCard = async () => {
    let src = imgIdCard;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgIdCard);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImgIdCard = () => {
    const getImg = data.file.filter(
      (x) => x.category === "ID_CARD_IMAGE"
    )[0];
    if (getImg !== undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then(
        (res) => {}
      );
    }
    setCreateImgIdCrad(ImageEntity_INTI);
    setImgIdCard(undefined);
  };
  //#endregion

  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes("*") ||
      data.includes("/") ||
      data.includes(" ") ||
      data.includes("-") ||
      data.includes("+");
    return data.trim().length !== 0
      ? checkSyntax
        ? true
        : false
      : true;
  };

  const updateDroner = async (values: any) => {
    const reason = [];

    const splitPlant = values?.plantsOther
      ? values?.plantsOther?.split(",")
      : [];
    const expPlant =
      splitPlant.length > 0
        ? [...values.checkPlantsOther, ...splitPlant]
        : values.checkPlantsOther;

    if (values?.checkReason?.length > 0) {
      reason.push(...values.checkReason);
    }
    if (!!values?.reason) {
      reason.push(values.reason);
    }
    const payload = {
      ...data,
      ...values,
      birthDate: moment(values.birthDate).toISOString(),
      address: {
        ...address,
        address1: values.address1,
        address2: values.address2,
        postcode: values.postcode,
      },
      reason,
      updateBy: `${profile?.firstname} ${profile?.lastname}`,
      expPlant,
      dronerArea: {
        ...dronerArea,
        mapUrl: values.mapUrl ? values.mapUrl : undefined,
      },
    };
    delete payload.dronerDrone;
    if (values.status === "ACTIVE") {
      payload.isDelete = false;
      payload.isOpenReceiveTask = true;
    }
    await DronerDatasource.updateDroner(payload).then((res) => {
      if (res !== undefined) {
        var i = 0;
        for (i; 2 > i; i++) {
          i === 0 &&
            createImgProfile.file !== "" &&
            UploadImageDatasouce.uploadImage(createImgProfile).then(
              res
            );
          i === 1 &&
            createImgIdCard.file !== "" &&
            UploadImageDatasouce.uploadImage(createImgIdCard).then(
              res
            );
        }
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/IndexDroner";
        });
      } else {
        Swal.fire({
          title: "เบอร์โทร หรือ รหัสบัตรประชาชน <br/> ซ้ำในระบบ",
          icon: "error",
          showConfirmButton: true,
        });
      }
    });
  };

  const onFieldsChange = (field: any) => {
    const isHasError = form.getFieldsError().some(({ errors }) => {
      return errors.length > 0;
    });

    const {
      mapUrl,
      plantsOther,
      dronerArea,
      checkReason = [],
      checkPlantsOther,
      reason,
      idNo,
      comment,
      dronerCode,
      status: currentStatus,
      ...rest
    } = form.getFieldsValue();
    const reasonList = [];
    const expPlant = [];
    if (checkReason.length > 0) {
      reasonList.push(...checkReason);
    }
    if (!!reason) {
      reasonList.push(reason);
    }
    if (checkPlantsOther) {
      expPlant.push(...checkPlantsOther);
    }
    if (plantsOther) {
      expPlant.push(...plantsOther);
    }

    const isHasValues = Object.values({
      ...rest,

      expPlant: expPlant.length > 0,
      reasonList:
        reasonList.length > 0 ||
        (currentStatus !== "REJECTED" &&
          currentStatus !== "INACTIVE"),
    }).every((el) => el);

    if (!isHasError && isHasValues) {
      setDisableSaveBtn(false);
    } else {
      setDisableSaveBtn(true);
    }
  };

  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลคนบินโดรน" />
        <Form>
          <div
            className="container text-center"
            style={{ padding: "30px" }}>
            <div className="form-group text-center">
              <div
                className="hiddenFileInput zoom"
                style={{
                  backgroundImage: `url(${
                    imgProfile === undefined ? uploadImg : imgProfile
                  })`,
                }}>
                <input
                  key={imgProfile}
                  type="file"
                  onChange={onChangeProfile}
                  title="เลือกรูป"
                />
              </div>
              <div>
                {imgProfile !== undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewProfile}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={removeImg}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}>
                      Remove
                    </Tag>
                  </>
                )}
              </div>
            </div>
          </div>
        </Form>
        <Form
          style={{ padding: "32px" }}
          form={form}
          onFieldsChange={onFieldsChange}
          onFinish={updateDroner}>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Droner ID</label>
              <Form.Item name="dronerCode">
                <Input disabled defaultValue={data.dronerCode} />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>วันที่ลงทะเบียน</label>

              <div style={{ marginBottom: 24 }}>
                <Input
                  style={{
                    padding: "4px 12px",
                  }}
                  disabled
                  value={`${moment(data.createdAt).format(
                    "DD/MM/YYYY"
                  )} ${
                    data.createBy === null ||
                    data.createBy === undefined
                      ? "(ลงทะเบียนโดยนักบิน)"
                      : `(${data.createBy})`
                  }`}
                />
              </div>
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
                ]}>
                <Input placeholder="" />
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
                ]}>
                <Input placeholder="" />
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
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "กรุณากรอกเบอร์โทรให้ถูกต้อง!",
                  },
                  {
                    min: 10,
                    message: "กรุณากรอกเบอร์โทรให้ครบ 10 หลัก!",
                  },
                ]}>
                <Input
                  placeholder=""
                  maxLength={10}
                  defaultValue={data.telephoneNo}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                วันเดือนปีเกิด <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันเดือนปีเกิด",
                  },
                ]}>
                <Form.Item
                  name="birthDate"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกวันเดือนปีเกิด",
                    },
                  ]}>
                  <DatePicker
                    placeholder="กรอกวันเดือนปีเกิด"
                    locale={locale}
                    format={dateFormat}
                    disabledDate={(current) =>
                      current && current > moment().endOf("day")
                    }
                    className="col-lg-12"
                  />
                </Form.Item>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>รหัสบัตรประชาชน</label>
              <Form.Item
                name="idNo"
                rules={[
                  {
                    min: 13,
                    message: "กรุณากรอกรหัสบัตรประชาชน 13 หลัก",
                  },
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "กรุณากรอกรหัสบัตรประชาชนให้ถูกต้อง!",
                  },
                ]}>
                <Input
                  placeholder="กรอกบัตรประชาชน"
                  maxLength={13}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 pb-5">
              <label>รูปถ่ายผู้สมัครคู่บัตรประชาชน</label>
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgIdCard})`,
                    display:
                      imgIdCard !== undefined ? "block" : "none",
                  }}></div>
                <div className="text-left ps-4 pt-2">
                  {imgIdCard !== undefined && (
                    <>
                      <Tag
                        color={color.Success}
                        onClick={onPreviewIdCard}
                        style={{
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}>
                        View
                      </Tag>
                      <Tag
                        color={color.Error}
                        onClick={removeImgIdCard}
                        style={{
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}>
                        Remove
                      </Tag>
                    </>
                  )}
                </div>
                <div
                  className="hiddenFileBtn"
                  style={{
                    backgroundImage: `url(${bth_img_empty})`,
                    display:
                      imgIdCard === undefined ? "block" : "none",
                  }}>
                  <input
                    key={imgIdCard}
                    type="file"
                    onChange={onChangeIdCard}
                    title="เลือกรูป"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                จังหวัด
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="province"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกจังหวัด!",
                  },
                ]}>
                <Select
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
                  placeholder="เลือกจังหวัด"
                  allowClear
                  onChange={handleProvince}
                  defaultValue={address.provinceId}>
                  {province.map((item: any, index: any) => (
                    <Select.Option
                      key={index}
                      value={item.provinceId}>
                      {item.provinceName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                อำเภอ
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="district"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกอำเภอ!",
                  },
                ]}>
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  placeholder="เลือกอำเภอ"
                  onChange={handleDistrict}
                  defaultValue={address.districtId}>
                  {district.map((item: any, index: any) => (
                    <Select.Option
                      key={index}
                      value={item.districtId}>
                      {item.districtName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ตำบล
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="subdistrict"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกตำบล!",
                  },
                ]}>
                <Select
                  allowClear
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
                  placeholder="เลือกตำบล"
                  onChange={handleSubDistrict}
                  defaultValue={address.subdistrictId}>
                  {subdistrict?.map((item: any, index: any) => (
                    <Select.Option
                      key={index}
                      value={item.subdistrictId}>
                      {item.subdistrictName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                รหัสไปรษณีย์
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="postcode"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกรหัสไปรษณีย์!",
                  },
                ]}>
                <Input
                  name="postcode"
                  placeholder="กรอกรหัสไปรษณีย์"
                  defaultValue={address.postcode}
                  key={address.postcode}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                บ้านเลขที่ <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="address1"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกบ้านเลขที่!",
                  },
                ]}>
                <Input className="col-lg-12" placeholder="" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>
                รายละเอียดที่อยู่ (หมู่, ถนน){" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="address2"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรายละเอียดที่อยู่บ้าน!",
                  },
                ]}>
                <Input className="col-lg-12" placeholder="" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>พื้นที่ให้บริการ</label>
              <Form.Item name="dronerArea">
                <Select
                  allowClear
                  showSearch
                  placeholder="ค้นหาตำบล/อำเภอ/จังหวัด"
                  onChange={handleSearchLocation}
                  value={dronerArea?.subdistrictId}
                  optionFilterProp="children"
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  filterOption={(input: any, option: any) =>
                    option.children.includes(input)
                  }>
                  {location.map((item: any) => (
                    <Select.Option
                      key={item.subdistrictId}
                      value={item.subdistrictId}>
                      {item.subdistrictName +
                        "/" +
                        item.districtName +
                        "/" +
                        item.provinceName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="form-group">
            <label>หรือ</label>
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
                name="latitude"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกละติจูด!",
                  },
                ]}
                key={mapPosition.lat}>
                <Input
                  placeholder="กรอกข้อมูล Latitude"
                  onBlur={handleOnChangeLat}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>Longitude (ลองติจูด) </label>
              <span style={{ color: "red" }}>*</span>
              <Form.Item
                name="longitude"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกลองติจูด!",
                  },
                ]}
                key={mapPosition.lng}>
                <Input
                  placeholder="กรอกข้อมูล Longitude"
                  onBlur={handleOnChangeLng}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </div>
          <GoogleMap
            isEdit={true}
            changeLatLng={(lat, lng) => {
              setDronerArea({
                ...dronerArea,
                lat: lat,
                long: lng,
              });
              form.setFieldsValue({
                latitude: lat,
                longitude: lng,
              });
            }}
            width="100%"
            height="300px"
            zoom={17}
            lat={mapPosition.lat}
            lng={mapPosition.lng}
          />
          <div className="form-group col-lg-6">
            <label>
              พืชที่เคยฉีดพ่น{" "}
              <span style={{ color: color.Disable }}>
                (กรุณาเลือกอย่างน้อย 1 อย่าง)
              </span>
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="checkPlantsOther"
              dependencies={["plantsOther"]}
              style={{
                marginBottom: "0px",
              }}
              rules={[
                {
                  validator: (_, value) => {
                    const plantsOther =
                      form.getFieldValue("plantsOther");

                    if (value?.length < 1 && !plantsOther) {
                      return Promise.reject(
                        "กรุณาเลือกพืชที่เคยฉีดพ่นอย่างน้อย 1 อย่าง"
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}>
              <Checkbox.Group>
                {EXP_PLANT.map((el) => {
                  return (
                    <Row>
                      <Checkbox value={el}>
                        <label>{el}</label>
                      </Checkbox>
                    </Row>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="form-group col-lg-12">
            <label></label>
            <Form.Item
              name="plantsOther"
              dependencies={["checkPlantsOther"]}
              rules={[
                {
                  validator(rule, value) {
                    const splitValue = value && value.split(",");
                    const valueCheckbox = form.getFieldValue(
                      "checkPlantsOther"
                    );
                    const isDuplicate =
                      splitValue &&
                      splitValue.some((el: string) =>
                        valueCheckbox.includes(el)
                      );

                    const isDupTyping =
                      splitValue &&
                      new Set(splitValue).size !== splitValue.length;

                    if (!!value && checkValidateComma(value)) {
                      return Promise.reject(
                        "กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง"
                      );
                    } else if (isDuplicate || isDupTyping) {
                      return Promise.reject(
                        "กรุณากรอกพืชที่เคยฉีดพ่นให้ถูกต้อง ไม่ควรมีพืชที่ซ้ำกัน"
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}>
              <Input
                placeholder="กรอกข้อมูลพืชอื่นๆ เช่น ส้ม,มะขาม (กรุณาใช้ (,) ให้กับการเพิ่มพืชมากกว่า 1 อย่าง)"
                autoComplete="off"
                defaultValue={data.expPlant
                  .filter((a) => !EXP_PLANT.some((x) => x === a))
                  .join(",")}
              />
            </Form.Item>
          </div>

          <div className="row">
            <div className="form-group col-lg-12">
              <label
                style={{ marginBottom: "10px" }}
                className="col-lg-12">
                สถานะ <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Form.Item name="status">
                <Radio.Group
                  className="col-lg-12"
                  onChange={handleChangeStatus}>
                  <Space direction="vertical" className="col-lg-12">
                    {DRONER_STATUS.filter((x) => x.value !== "").map(
                      (item, index) => (
                        <Radio
                          value={item.value}
                          style={{ width: "100%" }}>
                          {item.name}
                          {status === "REJECTED" && index === 3 ? (
                            <div className="form-group ps-3">
                              <Form.Item
                                style={{
                                  marginBottom: "0px",
                                }}
                                dependencies={["reason"]}
                                name="checkReason"
                                rules={[
                                  {
                                    validator: (_, value) => {
                                      const reasonField =
                                        form.getFieldValue("reason");

                                      if (
                                        value?.length < 1 &&
                                        !reasonField
                                      ) {
                                        return Promise.reject(
                                          "กรุณากรอกเหตุผลที่ไม่อนุมัติ/เลือกเหตุผลที่ไม่อนุมัติ"
                                        );
                                      } else {
                                        return Promise.resolve();
                                      }
                                    },
                                  },
                                ]}>
                                <Checkbox.Group>
                                  <Checkbox
                                    value="บัตรประชาชนไม่ชัดเจน/ไม่ถูกต้อง"
                                    style={{ marginRight: 6 }}
                                  />
                                  <label>
                                    บัตรประชาชนไม่ชัดเจน/ไม่ถูกต้อง
                                  </label>
                                </Checkbox.Group>
                              </Form.Item>
                              <Form.Item
                                name="reason"
                                style={{
                                  marginBottom: "0px",
                                }}
                                rules={[
                                  {
                                    validator: (_, value) => {
                                      const checkReason =
                                        form.getFieldValue(
                                          "checkReason"
                                        );

                                      if (
                                        !value &&
                                        checkReason.length < 1
                                      ) {
                                        return Promise.reject(
                                          "กรุณากรอกเหตุผลที่ไม่อนุมัติ"
                                        );
                                      } else {
                                        return Promise.resolve();
                                      }
                                    },
                                  },
                                ]}
                                dependencies={["checkReason"]}>
                                <TextArea
                                  className="col-lg-12"
                                  rows={3}
                                  placeholder="กรอกเหตุผล/เหตุหมายเพิ่มเติม"
                                  autoComplete="off"
                                />
                              </Form.Item>
                            </div>
                          ) : status === "INACTIVE" && index === 4 ? (
                            <div>
                              <div className="form-group ps-3">
                                <Form.Item
                                  name="reason"
                                  dependencies={["status"]}
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        if (!value) {
                                          return Promise.reject(
                                            "กรุณากรอกเหตุผลที่ปิดการใช้งาน"
                                          );
                                        } else {
                                          return Promise.resolve();
                                        }
                                      },
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
                            </div>
                          ) : null}
                        </Radio>
                      )
                    )}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
          <div className="form-group col-lg-12">
            <label>หมายเหตุ</label>
            <Form.Item name="comment">
              <TextArea />
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
          className="d-flex justify-content-between">
          <h4 className="pt-2 ps-3" style={{ color: "white" }}>
            รายการโดรน
          </h4>
          <Button
            className="pt-2"
            style={{
              backgroundColor: color.secondary1,
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => setShowAddModal((prev) => !prev)}>
            เพิ่มโดรน
          </Button>
        </div>
        <Form>
          {dronerDroneList.length !== 0 ? (
            <div className="container">
              {dronerDroneList.map((item, index) => {
                return (
                  <div className="row pt-3 pb-3">
                    <div className="col-lg-1">
                      <Avatar
                        size={25}
                        src={item.drone?.droneBrand.logoImagePath}
                        style={{ marginRight: "5px" }}
                      />
                    </div>
                    <div className="col-lg-5">
                      <h6>{item.drone?.droneBrand.name}</h6>
                      <p style={{ color: "#ccc" }}>{item.serialNo}</p>
                    </div>
                    <div className="col-lg-4">
                      <span
                        style={{ color: STATUS_COLOR[item.status] }}>
                        <Badge color={STATUS_COLOR[item.status]} />
                        {DRONER_DRONE_MAPPING[item.status]}
                        <br />
                      </span>
                    </div>
                    <div className="col-lg-2 d-flex justify-content-between">
                      <div className="col-lg-6">
                        <ActionButton
                          icon={<EditOutlined />}
                          color={color.primary1}
                          onClick={() => editDroner(item, index + 1)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <ActionButton
                          icon={<DeleteOutlined />}
                          color={color.Error}
                          onClick={() => removeDrone(item.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="container text-center"
              style={{ padding: "80px" }}>
              <img src={emptyData} alt="" />
              <p>ยังไม่มีข้อมูลโดรน</p>
            </div>
          )}
        </Form>
      </CardContainer>
      <div className="d-flex justify-content-between pt-3">
        <p>รายการทั้งหมด {dronerDroneList.length} รายการ</p>
        {dronerDroneList.length < 10 ? null : (
          <Pagination defaultCurrent={1} total={1} />
        )}
        {dronerDroneList.length > 10 && (
          <Pagination defaultCurrent={1} total={1} />
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            แก้ไขข้อมูลคนบินโดรน
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around" key={data.id}>
        {renderFromData}
        {renderDrone}
      </Row>
      <FooterPage
        onClickBack={() => (window.location.href = "/IndexDroner")}
        onClickSave={() => form.submit()}
        disableSaveBtn={disableSaveBtn}
      />

      {showAddModal && (
        <ModalDrone
          show={showAddModal}
          backButton={() => setShowAddModal((prev) => !prev)}
          callBack={updateDrone}
          data={DronerDroneEntity_INIT}
          editIndex={editIndex}
          title="เพิ่มข้อมูลโดรนเกษตร"
        />
      )}
      {showEditModal && (
        <ModalDrone
          isEdit
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={updateDrone}
          data={editDroneList}
          editIndex={editIndex}
          title="แก้ไขข้อมูลโดรนเกษตร"
        />
      )}
    </Layout>
  );
}
export default EditDroner;
