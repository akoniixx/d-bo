import Layouts from "../../components/layout/Layout";
import { BackIconButton } from "../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { CardHeaderPromotion } from "../../components/header/CardHeaderPromotion";
import {
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  Divider,
  Checkbox,
  Table,
  RadioChangeEvent,
  TimePicker,
  Modal,
  Button,
  Image,
} from "antd";
import { Option } from "antd/lib/mentions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../components/editor/editor.css";
import { formats, modules } from "../../components/editor/EditorToolbar";
import color from "../../resource/color";
import AddButtton from "../../components/button/AddButton";
import ActionButton from "../../components/button/ActionButton";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CropDatasource } from "../../datasource/CropDatasource";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import FooterPage from "../../components/footer/FooterPage";
import moment from "moment";
import { MONTH_SALE } from "../../definitions/Month";
import { CouponDataSource } from "../../datasource/CouponDatasource";
import { CouponEntities } from "../../entities/CouponEntites";
import Swal from "sweetalert2";
import { image } from "../../resource";
import RenderMobile from "../../components/mobile/RenderMobile";
import dayjs from "dayjs";
import { CropPurposeSprayEntity } from "../../entities/CropEntities";

export default function AddPromotion() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const dateFormat = "DD/MM/YYYY";
  const [plantName, setPlantName] = useState<CropPurposeSprayEntity[]>();
  const [provinceList, setProvinceList] = useState<string[]>([]);
  const [crop, setCrop] = useState<any>([
    {
      id: null,
      cropName: null,
      injectionTiming: [],
      purposeSpray: [],
    },
  ]);
  const [descriptionEditor, setDescriptionEditor] = useState<string | null>(
    null
  );
  const [conditionEditor, setConditionEditor] = useState<string | null>(null);
  const [editTable, setEditTable] = useState(true);
  const [province, setProvince] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponType, setCouponType] = useState<string | null>(null);
  const [couponInfo, setCouponInfo] = useState<string | null>(null);
  const [specialCoupon, setSpecialCoupon] = useState<boolean>(false);
  const [raiCondition, setRaiCondition] = useState<boolean>(false);
  const [serviceCondition, setServiceCondition] = useState<boolean>(false);
  const [couponPlant, setCouponPlant] = useState<boolean>(false);
  const [couponProvince, setCouponProvince] = useState<boolean>(false);
  const [couponNotiMany, setCouponNotiMany] = useState<boolean>(false);
  const [couponNotiExpired, setCouponNotiExpired] = useState<boolean>(false);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [openModalSave, setModalSave] = useState<boolean>(false);
  const [openModalWarning, setModalWarning] = useState<boolean>(false);
  const fetchTwice = useRef<boolean>(true);
  const [renderMobile, setRenderMobile] = useState({
    couponName: "",
    couponType: "",
    promotionStatus: "",
    count: "",
    startDate: "",
    expiredDate: "",
    startTime: "00:00",
    expiredTime: "23:59",
    expiredDateTitle: "",
    raiConditionMin: "",
    raiConditionMax: "",
    serviceConditionMin: "",
    serviceConditionMax: "",
    plantName: "",
    province: "",
  });

  const [form] = Form.useForm();
  useEffect(() => {
    getCropPlantName();
    renderMobilePlant();
    if (fetchTwice.current) {
      getProvince();
      fetchTwice.current = false;
    }
  }, [crop]);

  const getCropPlantName = () => {
    CropDatasource.getAllCropPlantName()
      .then((res) => {
        const mapPlant = res.filter(
          (p) => !crop.some((c: any) => p.id === c.id)
        );
        setPlantName(mapPlant);
      })
      .catch((err) => console.log(err));
  };
  const handleChangePlantCrop = (plantId: string, index: number) => {
    const getCrop = plantName?.find((f) => f.id === plantId);
    let map = { ...getCrop, injectionTiming: [] };
    if (crop[index].id) {
      form.setFieldValue(crop[index].cropName, []);
      let changeCrop = crop;
      changeCrop[index] = map;
      changeCrop.push({
        id: null,
        cropName: null,
        injectionTiming: [],
        purposeSpray: [],
      });
      setCrop(changeCrop.filter((x: any) => x.id));
    } else {
      setCrop([...crop.filter((x: any) => x.id !== null), map]);
    }
  };

  const getProvince = () => {
    LocationDatasource.getProvince()
      .then((res) => {
        setProvinceList(res.map((item: any) => item.provinceName));
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const columns = [
    {
      title: <div style={{ display: "flex", alignItems: "center" }}>ลำดับ</div>,
      dataIndex: "index",
      key: "index",
      width: "8%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <p>{index + 1}</p>,
        };
      },
    },
    {
      title: "ชื่อพืช",
      dataIndex: "plantName",
      key: "plantName",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        let formName = row.id;
        return {
          children: (
            <Form.Item
              name={formName}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อพืช!",
                },
              ]}
            >
              <Select
                disabled={!couponPlant}
                className="col-lg-12 p-1"
                placeholder="เลือกพืช"
                defaultValue={row.cropName}
                onChange={(plant, id) => {
                  handleChangePlantCrop(id.key, index);
                }}
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
              >
                {plantName?.map((item) => (
                  <Option value={item.cropName} key={item.id}>
                    {item.cropName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        };
      },
    },
    {
      title: "ช่วงเวลาการพ่น",
      dataIndex: "injectionTiming",
      key: "injectionTiming",
      width: "30%",
      render: (value: any, row: any, index: number) => {
        let formName = row.cropName;
        return {
          children: (
            <Form.Item
              name={formName}
              key={index}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเลือกเวลาในการฉีดพ่น!",
                },
              ]}
            >
              <Select
                key={index}
                disabled={!crop[index].cropName || !couponPlant}
                mode="multiple"
                className="col-lg-12 p-1"
                onClear={() => {}}
                placeholder="เลือกช่วงเวลาการพ่น"
                onChange={(injectionTiming) => {
                  handleChangeInjectionTime(index, injectionTiming);
                }}
                showSearch
                // value={crop[index].injectionTime}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {crop[index].purposeSpray.map((item: any) => (
                  <Option key={item.id} value={item.purposeSprayName}>
                    {item.purposeSprayName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        };
      },
    },
    {
      width: "10%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {crop.length > 1 && (
                <div className="pb-4">
                  <ActionButton
                    icon={<DeleteOutlined />}
                    color={color.Error}
                    onClick={() => {
                      deleteCrop(index, row);
                    }}
                  />
                </div>
              )}
            </>
          ),
        };
      },
    },
  ];

  const handleChangeInjectionTime = (
    index: number,
    injectionTiming: string[]
  ) => {
    const updateCrop = crop.map((item: any, i: number) => {
      if (i === index) {
        return { ...item, injectionTiming: injectionTiming };
      } else {
        return item;
      }
    });
    setCrop(updateCrop);
  };

  const renderMobilePlant = () => {
    const plantName = crop.map((item: any) => {
      let injname = "";
      let plantname = "";
      item.injectionTiming.map((inj: any) => {
        injname += inj + ",";
        return injname;
      });
      plantname +=
        item.cropName + " (" + injname.substring(injname.length - 1, 0) + ") ";
      return plantname;
    });
    setRenderMobile({
      ...renderMobile,
      plantName: plantName.filter((p: any) => !p.includes(null)),
    });
  };

  const handleChangeProvince = (provinceName: string[]) => {
    setProvince(provinceName);
  };

  const handleCoupon = (e: RadioChangeEvent) => {
    setCoupon(e.target.value);
  };

  const handleCouponType = (type: string) => {
    setCouponType(type);
    setRenderMobile({
      ...renderMobile,
      couponType: type,
    });
  };

  const handleCouponInfo = (info: string) => {
    setCouponInfo(info);
  };

  const handleSpecialCoupon = () => {
    setSpecialCoupon(!specialCoupon);
    form.setFieldsValue({
      registerFirstTime: !specialCoupon,
    });
  };

  function checkRai(min: number | null, max: number | null): string {
    let result;
    if (!min && !max) {
      result = "ไม่จำกัดไร่";
    } else if (!min && max) {
      result = `เมื่อจ้างไม่เกิน ${max} ไร่`;
    } else if (min && !max) {
      result = `เมื่อจ้างขั้นต่ำ ${min} ไร่`;
    } else {
      result = `เมื่อจ้างไม่เกิน ${max} ไร่`;
    }
    return result;
  }

  const handleRaiCondition = () => {
    setRaiCondition(!raiCondition);
  };

  const handleServiceCondition = () => {
    setServiceCondition(!serviceCondition);
  };

  const handlePlantCoupon = () => {
    setCouponPlant(!couponPlant);
  };

  const handleCouponProvince = () => {
    setCouponProvince(!couponProvince);
  };

  const handleNotiCouponMany = () => {
    setCouponNotiMany(!couponNotiMany);
  };

  const handleNotiCouponExpired = () => {
    setCouponNotiExpired(!couponNotiExpired);
  };

  const changeFormat = (date: any) => {
    const day = date.split("-");
    return `${day[2]} ${MONTH_SALE[parseInt(day[1]) - 1].name} ${
      parseInt(day[0]) + 543
    }`;
  };

  const addCrop = () => {
    if (crop[0].id) {
      setCrop((pre: any) => {
        return [
          ...pre,
          {
            id: null,
            cropName: null,
            injectionTiming: [],
            purposeSpray: [],
          },
        ];
      });
    }
  };

  const deleteCrop = (index: number, cropDelete: any) => {
    crop.forEach((item: any) => {
      if (item.id === cropDelete.id) {
        form.setFieldValue(cropDelete.id, undefined);
        form.setFieldValue(cropDelete.cropName, []);
      }
    });
    const mapCrop = crop.filter((c: any) => c.cropName !== cropDelete.cropName);
    setEditTable(!editTable);
    setCrop(mapCrop);
  };

  const handleDescriptionEditor = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    setDescriptionEditor(editor.getHTML());
  };

  const handleConditionEditor = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    setConditionEditor(editor.getHTML());
  };

  const onFieldsChange = () => {
    const {
      couponName,
      couponType,
      promotionStatus,
      promotionType,
      discountType,
      discount,
      count,
      DateStart,
      TimeStart,
      DateExpired,
      TimeExpired,
      description,
      condition,
      couponConditionRaiMin,
      couponConditionRaiMax,
      couponConditionServiceMin,
      couponConditionServiceMax,
      raiCheckbox,
      serviceCheckbox,
      plantCheckbox,
      provinceCheckbox,
    } = form.getFieldsValue();

    let fieldErr: boolean = true;
    let discountErr: boolean = true;
    let raiError: boolean = true;
    let serviceError: boolean = true;
    let plantErr: boolean = true;
    let provinceError: boolean = true;

    if (
      couponName &&
      couponType &&
      promotionStatus &&
      promotionType &&
      discountType &&
      count &&
      DateStart &&
      TimeStart &&
      DateExpired &&
      TimeExpired &&
      description &&
      condition
    ) {
      fieldErr = false;
    } else {
      fieldErr = true;
    }

    if (discountType === "DISCOUNT") {
      if (discount) {
        discountErr = false;
      } else {
        discountErr = true;
      }
    } else {
      discountErr = false;
    }

    if (raiCheckbox) {
      if (!couponConditionRaiMin && !couponConditionRaiMax) {
        raiError = true;
      } else {
        raiError = false;
      }
    } else {
      raiError = false;
    }

    if (serviceCheckbox) {
      if (!couponConditionServiceMin && !couponConditionServiceMax) {
        serviceError = true;
      } else {
        serviceError = false;
      }
    } else {
      serviceError = false;
    }

    if (plantCheckbox) {
      const plantErrArray = crop.map((item: any) => {
        if (item.cropName === "" || item.injectionTiming.length === 0) {
          return true;
        } else {
          return false;
        }
      });
      plantErr = plantErrArray.includes(true);
    } else {
      plantErr = false;
    }

    if (provinceCheckbox) {
      if (province.length != 0) {
        provinceError = false;
      } else {
        provinceError = true;
      }
    } else {
      provinceError = false;
    }
    setBtnSaveDisable(
      fieldErr ||
        discountErr ||
        raiError ||
        serviceError ||
        plantErr ||
        provinceError
    );
  };

  const warningTime = () => {
    const { DateStart, TimeStart, promotionStatus } = form.getFieldsValue();
    const startDate = new Date(
      moment(DateStart).format("YYYY-MM-DD") +
        " " +
        moment(TimeStart).format("HH:mm:ss")
    ).getTime();
    const dateNow = Date.now();
    if (promotionStatus === "ACTIVE") {
      if (startDate - dateNow > 0) {
        setModalSave(false);
        setModalWarning(true);
      } else {
        setModalSave(false);
        onSubmit();
      }
    } else {
      setModalSave(false);
      onSubmit();
    }
  };

  const onSubmit = (status?: string) => {
    const {
      couponName,
      couponType,
      promotionStatus,
      promotionType,
      discountType,
      discount,
      count,
      DateStart,
      DateExpired,
      TimeStart,
      TimeExpired,
      description,
      condition,
      couponConditionRaiMin,
      couponConditionRaiMax,
      couponConditionServiceMin,
      couponConditionServiceMax,
      plantCheckbox,
      serviceCheckbox,
      raiCheckbox,
      provinceCheckbox,
    } = form.getFieldsValue();
    const cropForm = crop.map((item: any) => {
      if (crop.length === 1) {
        if (!crop[0].plantName) {
          return [];
        } else {
          return {
            plantName: item.plantName,
            injectionTiming: item.injectionTiming,
          };
        }
      } else {
        return {
          plantName: item.plantName,
          injectionTiming: item.injectionTiming,
        };
      }
    });
    const startDate =
      moment(DateStart).format("YYYY-MM-DD") +
      " " +
      moment(TimeStart).format("HH:mm:ss");
    const expiredDate =
      moment(DateExpired).format("YYYY-MM-DD") +
      " " +
      moment(TimeExpired).format("HH:mm:ss");
    const couponDto: CouponEntities = {
      couponName: couponName,
      couponType: couponType,
      promotionStatus: status ?? promotionStatus,
      promotionType: promotionType,
      discountType: discountType,
      discount: parseInt(discount),
      count: count,
      keep: count,
      used: 0,
      createBy: profile.username + " " + profile.lastname,
      startDate: new Date(startDate),
      expiredDate: new Date(expiredDate),
      description: description,
      condition: condition,
      specialCondition: specialCoupon,
      couponConditionRai: raiCheckbox ?? false,
      couponConditionRaiMin: couponConditionRaiMin,
      couponConditionRaiMax: couponConditionRaiMax,
      couponConditionService: serviceCheckbox ?? false,
      couponConditionServiceMin: couponConditionServiceMin,
      couponConditionServiceMax: couponConditionServiceMax,
      couponConditionPlant: plantCheckbox ?? false,
      couponConditionPlantList: cropForm,
      couponConditionProvince: provinceCheckbox ?? false,
      couponConditionProvinceList: province,
    };
    CouponDataSource.addCoupon(couponDto)
      .then((res) => {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/PromotionPage";
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาก",
          icon: "error",
          showConfirmButton: true,
        });
      });
  };
  const disabledDate = (current: any) => {
    const getValueDate = form.getFieldsValue();
    const startDate = moment(getValueDate.DateStart).format("YYYY-MM-DD");
    return current && current < dayjs(startDate);
  };

  return (
    <Layouts>
      <Modal
        title="ยืนยันการเพิ่มคูปอง"
        onCancel={() => {
          setModalSave(false);
        }}
        open={openModalSave}
        footer={null}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div className="px-4 pt-4">
          <span className="text-secondary">
            โปรดตรวจสอบรายละเอียดที่คุณต้องการเพิ่มคูปอง
          </span>
          <p className="text-secondary">
            เพราะอาจส่งผลต่อการจ้างงานของเกษตรกรในระบบแอปพลิเคชั่น
          </p>
        </div>
        <Divider
          style={{
            marginBottom: "20px",
          }}
        />
        <div className="d-flex justify-content-between px-4 pb-4">
          <Button
            style={{
              borderColor: color.Error,
              color: color.Error,
            }}
            onClick={() => {
              setModalSave(false);
            }}
          >
            ยกเลิก
          </Button>
          <Button
            style={{
              borderColor: color.Error,
              backgroundColor: color.Error,
              color: color.White,
            }}
            onClick={() => warningTime()}
          >
            ยืนยัน
          </Button>
        </div>
      </Modal>
      <Modal
        title="คำเตือน"
        onCancel={() => {
          setModalWarning(false);
        }}
        open={openModalWarning}
        footer={null}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div className="px-4 pt-4">
          <span className="text-secondary">
            เนื่องจากวันเริ่มใช้งานของคูปองนั้นเกิดขึ้นในอนาคต
            ระบบจะบันทึกคูปองให้อยู่ในสถานะแบบร่างก่อนเพื่อป้องกันการใช้งานก่อนกำหนดและจะเปลี่ยนสถานะเป็นใช้งานในวันที่ท่านได้กำหนดเอาไว้
          </span>
        </div>
        <Divider
          style={{
            marginBottom: "20px",
          }}
        />
        <div className="d-flex justify-content-between px-4 pb-4">
          <Button
            style={{
              borderColor: color.Error,
              color: color.Error,
            }}
            onClick={() => {
              setModalWarning(false);
            }}
          >
            ยกเลิก
          </Button>
          <Button
            style={{
              borderColor: color.Error,
              backgroundColor: color.Error,
              color: color.White,
            }}
            onClick={() => {
              setModalWarning(false);
              onSubmit("DRAFTING");
            }}
          >
            ยืนยัน
          </Button>
        </div>
      </Modal>
      <div className="d-flex align-items-center">
        <BackIconButton onClick={() => navigate(-1)} />
        <strong style={{ fontSize: "20px" }}>เพิ่มคูปอง</strong>
      </div>
      <br />
      <div className="row">
        <div className="col-8">
          <CardHeaderPromotion textHeader="ข้อมูลคูปอง" center={false} />
          <div className="bg-white px-4 py-3">
            <Form form={form} onFieldsChange={onFieldsChange}>
              <div className="form-group col-lg-12">
                <label>
                  ชื่อคูปอง <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="couponName"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อคูปอง!",
                    },
                  ]}
                >
                  <Input
                    placeholder="กรอกชื่อคูปอง"
                    autoComplete="off"
                    onChange={(e) => {
                      setRenderMobile({
                        ...renderMobile,
                        couponName: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="row">
                <div className="form-group col-lg-6">
                  <label>
                    ประเภทคูปอง <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="couponType"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทคูปอง!",
                      },
                    ]}
                  >
                    <Select
                      className="col-lg-12 p-1"
                      placeholder="เลือกประเภทคูปอง"
                      onChange={handleCouponType}
                      showSearch
                      value={couponType}
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
                    >
                      <Option value={"INJECTION"}>การฉีดพ่น</Option>
                      <Option value={"DRUG"}>ปุ๋ยและยา</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="form-group col-lg-6">
                  <label>
                    ส่วนลดคูปอง <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="row">
                    <div className="col-7">
                      <Form.Item
                        name="discountType"
                        rules={[
                          {
                            required: true,
                            message: "กรุณาเลือกชนิดของส่วนลดคูปอง!",
                          },
                        ]}
                      >
                        <Radio.Group className="d-flex" onChange={handleCoupon}>
                          <Radio value={"FREE"}>ฟรีค่าบริการ</Radio>
                          <Radio value={"DISCOUNT"}>ส่วนลด</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="col-5">
                      <Form.Item
                        name="discount"
                        rules={[
                          {
                            required: coupon === "DISCOUNT",
                            message: "กรุณากรอกส่วนลดคูปอง!",
                          },
                        ]}
                      >
                        <Input
                          disabled={coupon !== "DISCOUNT"}
                          placeholder="กรอกจำนวนเงิน"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-6">
                  <label>
                    รูปแบบคูปอง <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="promotionType"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกรูปแบบคูปอง!",
                      },
                    ]}
                  >
                    <Select
                      className="col-lg-12 p-1"
                      placeholder="เลือกการรับคูปอง"
                      onChange={handleCouponInfo}
                      showSearch
                      value={couponInfo}
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
                    >
                      <Option value={"ONLINE"}>ออนไลน์(Online)</Option>
                      <Option value={"OFFLINE"}>ออฟไลน์(Offline)</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="form-group col-lg-6">
                  <label>
                    จำนวนสิทธิ์ <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="mt-1">
                    <Form.Item
                      name="count"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกจำนวนสิทธิ์!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="กรอกจำนวนสิทธิ์"
                        autoComplete="off"
                        onChange={(e) => {
                          setRenderMobile({
                            ...renderMobile,
                            count: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-6">
                  <label>
                    วันเริ่มต้น <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="d-flex">
                    <Form.Item
                      name="DateStart"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกวันที่!",
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="เลือกวันที่"
                        onChange={(val) => {
                          if (val) {
                            const startDate = changeFormat(
                              moment(val).format("YYYY-MM-DD")
                            );
                            setRenderMobile({
                              ...renderMobile,
                              startDate: startDate,
                            });
                          }
                        }}
                        format={dateFormat}
                      />
                    </Form.Item>
                    <Form.Item
                      name="TimeStart"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "กรุณากรอกเวลา!",
                      //   },
                      // ]}
                    >
                      <TimePicker
                        format={"HH:mm"}
                        className="ms-3"
                        placeholder="เลือกเวลา"
                        onChange={(val) => {
                          if (val) {
                            const startTime = moment(val).format("HH:mm");
                            setRenderMobile({
                              ...renderMobile,
                              startTime: startTime,
                            });
                          }
                        }}
                        defaultValue={moment("00:00", "HH:mm")}
                        allowClear={false}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="form-group col-lg-6">
                  <label>
                    วันสิ้นสุด <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="d-flex">
                    <Form.Item
                      name="DateExpired"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกวันที่!",
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="เลือกวันที่"
                        onChange={(val) => {
                          if (val) {
                            const expiredDate = changeFormat(
                              moment(val).format("YYYY-MM-DD")
                            );
                            setRenderMobile({
                              ...renderMobile,
                              expiredDate: expiredDate,
                            });
                          }
                        }}
                        format={dateFormat}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                    <Form.Item
                      name="TimeExpired"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "กรุณากรอกเวลา!",
                      //   },
                      // ]}
                    >
                      <TimePicker
                        format={"HH:mm"}
                        className="ms-3"
                        placeholder="เลือกเวลา"
                        onChange={(val) => {
                          if (val) {
                            const expiredTime = moment(val).format("HH:mm");
                            setRenderMobile({
                              ...renderMobile,
                              expiredTime: expiredTime,
                            });
                          }
                        }}
                        defaultValue={moment("23:59", "HH:mm")}
                        allowClear={false}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="form-group col-lg-12">
                  <label>
                    รายละเอียด <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียด",
                      },
                    ]}
                  >
                    <ReactQuill
                      className="react-editor"
                      theme="snow"
                      onChange={handleDescriptionEditor}
                      placeholder={"กรอกรายละเอียด"}
                      modules={modules}
                      formats={formats}
                    />
                  </Form.Item>
                </div>
              </div>
              <br />
              <div className="row py-4">
                <div className="form-group col-lg-12">
                  <label>
                    เงื่อนไข (จะแสดงในแอพลิเคชั่น){" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="condition"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเงื่อนไข!",
                      },
                    ]}
                  >
                    <ReactQuill
                      className="react-editor"
                      theme="snow"
                      onChange={handleConditionEditor}
                      placeholder={"กรอกรายละเอียด"}
                      modules={modules}
                      formats={formats}
                    />
                  </Form.Item>
                </div>
              </div>
              <br />
              <Divider />
              <div className="row">
                <div className="form-group col-lg-12 d-flex flex-column">
                  <label>เงื่อนไขการได้รับพิเศษ</label>
                  <Form.Item name="specialCondition" valuePropName="checked">
                    <Checkbox
                      onChange={handleSpecialCoupon}
                      checked={specialCoupon}
                      className="pt-3"
                    >
                      ลงทะเบียนใช้งานครั้งแรก
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
              <Divider />
              <div className="row">
                <div className="form-group col-lg-12 d-flex flex-column">
                  <label>
                    เงื่อนไขการ <span style={{ color: "red" }}>ใช้คูปอง*</span>
                  </label>
                  <div>
                    <Form.Item name="raiCheckbox" valuePropName="checked">
                      <Checkbox
                        onChange={handleRaiCondition}
                        checked={raiCondition}
                        className="pt-3"
                      >
                        <div className="d-flex">
                          <div className="d-flex flex-column px-3">
                            <label>จำนวนไร่ขั้นต่ำ</label>
                            <Form.Item
                              name="couponConditionRaiMin"
                              rules={[
                                {
                                  required: raiCondition,
                                  message: "กรุณากรอกจำนวนไร่ขั้นต่ำ",
                                },
                              ]}
                            >
                              <Input
                                disabled={!raiCondition}
                                placeholder="กรอกจำนวนไร่"
                                onChange={(e) => {
                                  setRenderMobile({
                                    ...renderMobile,
                                    raiConditionMin: e.target.value,
                                  });
                                }}
                              />
                            </Form.Item>
                          </div>
                          <div className="d-flex flex-column px-2">
                            <label>จำนวนไร่สูงสุด</label>
                            <Form.Item
                              name="couponConditionRaiMax"
                              rules={[
                                {
                                  required: raiCondition,
                                  message: "กรุณากรอกจำนวนไร่สูงสุด",
                                },
                              ]}
                            >
                              <Input
                                disabled={!raiCondition}
                                placeholder="กรอกจำนวนไร่"
                                onChange={(e) => {
                                  setRenderMobile({
                                    ...renderMobile,
                                    raiConditionMax: e.target.value,
                                  });
                                }}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="serviceCheckbox" valuePropName="checked">
                      <Checkbox
                        onChange={handleServiceCondition}
                        checked={serviceCondition}
                        className="pt-3"
                      >
                        <div className="d-flex">
                          <div className="d-flex flex-column px-3">
                            <label>จำนวนค่าบริการขั้นต่ำ</label>
                            <Form.Item name="couponConditionServiceMin">
                              <Input
                                disabled={!serviceCondition}
                                placeholder="กรอกค่าบริการ"
                                onChange={(e) => {
                                  setRenderMobile({
                                    ...renderMobile,
                                    serviceConditionMin: e.target.value,
                                  });
                                }}
                              />
                            </Form.Item>
                          </div>
                          <div className="d-flex flex-column px-2">
                            <label>จำนวนค่าบริการสูงสุด</label>
                            <Form.Item name="couponConditionServiceMax">
                              <Input
                                disabled={!serviceCondition}
                                placeholder="กรอกค่าบริการ"
                                onChange={(e) => {
                                  setRenderMobile({
                                    ...renderMobile,
                                    serviceConditionMax: e.target.value,
                                  });
                                }}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-12 d-flex justify-content-between align-items-center pb-4">
                  <Form.Item name="plantCheckbox" valuePropName="checked">
                    <Checkbox
                      className="pt-3"
                      checked={couponPlant}
                      onChange={handlePlantCoupon}
                    >
                      พืชที่จะใช้คูปอง
                      <span style={{ color: "red" }}>
                        * ถ้าไม่กดปุ่ม checkbox คือเลือกพืชทั้งหมด *
                      </span>
                    </Checkbox>
                  </Form.Item>
                  <AddButtton text="เพิ่มชื่อพืช" onClick={addCrop} />
                </div>
                <Table
                  columns={columns}
                  dataSource={crop}
                  pagination={false}
                  scroll={{ x: "max-content" }}
                />
              </div>
              <div className="row">
                <div className="form-group col-lg-12 d-flex justify-content-between align-items-center pt-2 pb-3">
                  <Form.Item name="provinceCheckbox" valuePropName="checked">
                    <Checkbox
                      checked={couponProvince}
                      onChange={handleCouponProvince}
                      className="pt-3"
                    >
                      จังหวัดที่จะใช้คูปองได้
                      <span style={{ color: "red" }}>
                        * ถ้าไม่กดปุ่ม Checkbox คือเลือกทุกจังหวัด *
                      </span>
                    </Checkbox>
                  </Form.Item>
                </div>
                <Form.Item
                  name="couponConditionProvinceList"
                  rules={[
                    {
                      required: couponProvince,
                      message: "กรุณากรอกเลือกจังหวัด",
                    },
                  ]}
                >
                  <Select
                    disabled={!couponProvince}
                    mode="multiple"
                    className="col-lg-12 ps-5 pe-3"
                    placeholder="เลือกจังหวัด"
                    onChange={handleChangeProvince}
                    showSearch
                    value={province}
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
                  >
                    {provinceList.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* <Divider /> */}
              {/* <div className="row">
                              <div className="form-group col-lg-12 d-flex flex-column">
                                <label>
                                การแจ้งเตือน<span style={{ color: "red" }}> *</span>
                                </label>
                                <div>
                                  <Checkbox 
                                    checked={couponNotiMany}
                                    onChange={handleNotiCouponMany}
                                    className="pt-3"
                                  >
                                    <div className="d-flex flex-column">
                                       <p>เตือนจำนวนคูปองเหลือน้อย</p>
                                       <Form.Item name="couponNotiMany"
                                          rules={[
                                            {
                                              required: couponNotiMany,
                                              message: "กรุณากรอกจำนวนคูปอง",
                                            },
                                        ]}>
                                         <Input disabled={!couponNotiMany} placeholder="" />
                                       </Form.Item>
                                    </div>
                                  </Checkbox>
                                </div>
                                <div>
                                  <Checkbox
                                    checked={couponNotiExpired}
                                    onChange={handleNotiCouponExpired}
                                    className="pt-1"
                                  >
                                    <div className="d-flex flex-column">
                                       <p>เตือนจำนวนคูปองใกล้หมดอายุ</p>
                                       <Form.Item name="couponNotiExpired"
                                          rules={[
                                            {
                                              required: couponNotiExpired,
                                              message: "กรุณากรอกจำนวนวัน",
                                            },
                                        ]}>
                                         <Input disabled={!couponNotiExpired} placeholder="" />
                                       </Form.Item>
                                    </div>
                                  </Checkbox>
                                </div>
                              </div>
                            </div> */}
              <Divider />
              <div className="row">
                <div className="form-group col-lg-12 d-flex flex-column">
                  <label>
                    สถานะ<span style={{ color: "red" }}> *</span>
                  </label>
                  <Form.Item
                    name="promotionStatus"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกสถานะ",
                      },
                    ]}
                  >
                    <Radio.Group className="d-flex flex-column">
                      <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                      <Radio value={"DRAFTING"}>รอเปิดใช้งาน</Radio>
                      <Radio value={"INACTIVE"}>ปิดการใช้งาน</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Form>
            <br />
          </div>
        </div>
        <RenderMobile
          couponName={renderMobile.couponName}
          couponType={renderMobile.couponType}
          promotionStatus={renderMobile.promotionStatus}
          count={renderMobile.count}
          startDate={renderMobile.startDate}
          expiredDate={renderMobile.expiredDate}
          startTime={renderMobile.startTime}
          expiredTime={renderMobile.expiredTime}
          expiredDateTitle={renderMobile.expiredDateTitle}
          raiConditionMin={renderMobile.raiConditionMin}
          raiConditionMax={renderMobile.raiConditionMax}
          serviceConditionMin={renderMobile.serviceConditionMin}
          serviceConditionMax={renderMobile.serviceConditionMax}
          plantName={renderMobile.plantName}
          province={province}
          descriptionEditor={descriptionEditor!}
          conditionEditor={conditionEditor!}
          raiCondition={raiCondition}
          serviceCondition={serviceCondition}
          couponPlant={couponPlant}
          couponProvince={couponProvince}
        />
        <div className="col-8">
          <FooterPage
            disableSaveBtn={saveBtnDisable}
            onClickBack={() => navigate(-1)}
            onClickSave={() => {
              setModalSave(true);
            }}
          />
        </div>
      </div>
    </Layouts>
  );
}
