import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout/Layout";
import { BackIconButton } from "../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { Checkbox, Form, Input, Radio, Select, Tag } from "antd";
import { CardHeaderPromotion } from "../../components/header/CardHeaderPromotion";
import uploadImg from "../../resource/media/empties/upload_img_news.png";
import { color } from "../../resource";
import { resizeFileImg } from "../../utilities/ResizeImage";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { formats, modules } from "../../components/editor/EditorToolbar";
import ReactQuill from "react-quill";
import FooterPage from "../../components/footer/FooterPage";
import RenderNews from "../../components/mobile/RenderNews";
import { NewsDatasource } from "../../datasource/NewsDatasource";
import Swal from "sweetalert2";
import { CampaignDatasource } from "../../datasource/CampaignDatasource";
const { Map } = require("immutable");

function AddNewsPage() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [imgProfile, setImgProfile] = useState<any>();
  const [chooseFarmer, setChooseFarmer] = useState<boolean>(false);
  const [chooseDroner, setChooseDroner] = useState<boolean>(false);
  const [application, setApplication] = useState<string>("");
  const [newsName, setNewsName] = useState<string>("");
  const [descriptionEditor, setDescriptionEditor] = useState<string | null>(
    null
  );
  const [createImgProfile, setCreateImgProfile] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [categoryNews, setCategoryNews] = useState<string>("");
  const [campId, setCampId] = useState<string>("");
  const [chooseChallenge, setChooseChallenge] = useState<boolean>(false);
  const [chooseNews, setChooseNews] = useState<boolean>(false);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const [cName, setCname] = useState<any[]>([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [farmCountPoint, setFarmCountPoint] = useState<any>();
  const [droneCountPoint, setDroneCountPoint] = useState<any>();
  const [allCountPoint, setAllCountPoint] = useState<any>();
  const [farmPinMain, setFarmPinMain] = useState<boolean>(false);
  const [farmPinAll, setFarmPinAll] = useState<boolean>(false);
  const [dronePinMain, setDronePinMain] = useState<boolean>(false);
  const [dronePinAll, setDronePinAll] = useState<boolean>(false);
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
    // checkValidate(data);
    const d = Map(createImgProfile).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    const e = Map(d.toJS()).set("resource", "FARMER");
    const f = Map(e.toJS()).set("category", "PROFILE_IMAGE");
    setCreateImgProfile(f.toJS());
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

  const removeImgProfile = () => {
    setImgProfile(undefined);
    setCreateImgProfile(UploadImageEntity_INTI);
    form.setFieldValue("img", null);
    onFieldsChange();
    // checkValidate(data);
  };

  const handleDescriptionEditor = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    setDescriptionEditor(editor.getHTML());
  };

  const handleChooseFarmer = (e: any) => {
    setChooseFarmer(e.target.checked);
    handleChooseApplication(e.target.checked, chooseDroner);
  };

  const handleChooseDroner = (e: any) => {
    setChooseDroner(e.target.checked);
    handleChooseApplication(chooseFarmer, e.target.checked);
  };

  const handleChooseApplication = (farmer: boolean, droner: boolean) => {
    if (farmer === false && droner === false) {
      setApplication("");
    } else if (farmer === true && droner === false) {
      setApplication("FARMER");
    } else if (farmer === false && droner === true) {
      setApplication("DRONER");
    } else {
      setApplication("ALL");
    }
  };
  const handleChooseChallenge = (e: any) => {
    setChooseChallenge(e.target.checked);
    handleChooseCategoryNews(e.target.checked, chooseNews);
  };
  const handleChooseNews = (e: any) => {
    setChooseNews(e.target.checked);
    handleChooseCategoryNews(chooseChallenge, e.target.checked);
  };
  const handleChooseCategoryNews = (challenge: boolean, news: boolean) => {
    if (challenge === false && news === false) {
      setCategoryNews("");
    } else if (challenge === true && news === false) {
      setCategoryNews("CHALLENGE");
    } else if (challenge === false && news === true) {
      setCategoryNews("NEWS");
    } else {
      setCategoryNews("ALL");
    }
  };
  const handleCampName = (e: any) => {
    setCampId(e);
  };
  const handlePinAll = (e: any) => {
    if (application === "FARMER") {
      setFarmPinAll(e.target.checked);
    } else if (application === "DRONER") {
      setDronePinAll(e.target.checked);
    } else if (application === "ALL") {
      setFarmPinAll(e.target.checked);
      setDronePinAll(e.target.checked);
    }
  };

  const handlePinMain = (e: any) => {
    if (application === "FARMER") {
      setFarmPinMain(e.target.checked);
    } else if (application === "DRONER") {
      setDronePinMain(e.target.checked);
    } else if (application === "ALL") {
      setFarmPinMain(e.target.checked);
      setDronePinMain(e.target.checked);
    }
  };
  useEffect(() => {
    CampaignDatasource.getCampaignList(undefined, "QUATA").then((res) => {
      setCname(res.data);
    });
    NewsDatasource.checkCountPoint("DRONER").then((res) => {
      setDroneCountPoint(res.responseData);
    });
    NewsDatasource.checkCountPoint("FARMER").then((res) => {
      setFarmCountPoint(res.responseData);
    });
    NewsDatasource.checkCountPoint("ALL").then((res) => {
      setAllCountPoint(res.responseData);
    });
  }, []);
  const onFieldsChange = () => {
    const {
      newsName,
      newsDescription,
      newsStatus,
      FarmerApp,
      DronerApp,
      img,
      challenge,
      news,
      campName,
    } = form.getFieldsValue();
    let fieldInfo = false;
    let fieldapp = false;
    let fieldimg = false;
    let fieldCateGory = false;

    if (newsName && newsDescription != "<p><br></p>" && newsStatus) {
      fieldInfo = false;
    } else {
      fieldInfo = true;
    }
    if ((challenge && campName) || news) {
      fieldCateGory = false;
    } else {
      fieldCateGory = true;
    }
    if (FarmerApp || DronerApp) {
      fieldapp = false;
    } else {
      fieldapp = true;
    }

    if (!img) {
      fieldimg = true;
    } else {
      fieldimg = false;
    }
    setBtnSaveDisable(fieldInfo || fieldapp || fieldimg || fieldCateGory);
  };
  const onSubmit = () => {
    const { newsName, newsDescription, newsStatus } = form.getFieldsValue();
    setBtnSaveDisable(true);
    NewsDatasource.addNews({
      title: newsName,
      details: newsDescription,
      status: newsStatus,
      application: application,
      categoryNews: categoryNews,
      campaignId: campId,
      file: createImgProfile.file,
      createBy: profile.firstname + " " + profile.lastname,
      pinAll: (farmPinAll && farmPinAll) || (dronePinAll && dronePinAll),
      pinMain: (farmPinMain && farmPinMain) || (dronePinMain && dronePinMain),
    })
      .then((res) => {
        setBtnSaveDisable(false);
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          navigate("/NewsPage");
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

  return (
    <>
      <div className="d-flex align-items-center">
        <BackIconButton onClick={() => navigate(-1)} />
        <strong style={{ fontSize: "20px" }}>เพิ่มข่าวสาร</strong>
      </div>
      <br />
      <div className="row">
        <div className="col-8">
          <CardHeaderPromotion textHeader="ข้อมูลข่าวสาร" center={false} />
          <div className="bg-white px-5 py-3">
            <Form form={form} onFieldsChange={onFieldsChange}>
              <div className="row">
                <div className="form-group text-center pt-4">
                  <Form.Item
                    name="img"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาใส่รูปภาพ!",
                      },
                    ]}
                  >
                    <div
                      className="hiddenFileInputNews"
                      style={{
                        backgroundImage: `url(${
                          imgProfile == undefined ? uploadImg : imgProfile
                        })`,
                      }}
                    >
                      <input
                        key={imgProfile}
                        type="file"
                        onChange={onChangeProfile}
                        title="เลือกรูป"
                      />
                    </div>
                  </Form.Item>
                  <div>
                    {imgProfile != undefined && (
                      <>
                        <Tag
                          color={color.Success}
                          onClick={onPreviewProfile}
                          style={{
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                        >
                          View
                        </Tag>
                        <Tag
                          color={color.Error}
                          onClick={removeImgProfile}
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
                <p className="text-center text-danger pt-1 pb-4">
                  *รูปภาพจะต้องมีสัดส่วน 16:6 หรือ 1,000px * 375px เท่านั้น
                  เพื่อความสวยงามของภาพในแอปพลิเคชัน*
                </p>
              </div>
              <div className="form-group col-lg-12">
                <label>
                  หัวข้อ <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="newsName"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกหัวข้อข่าว!",
                    },
                  ]}
                >
                  <Input
                    placeholder="กรอกหัวข้อข่าว"
                    autoComplete="off"
                    onChange={(e) => {
                      setNewsName(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              <div className="row pt-1 pb-5">
                <div className="form-group col-lg-12">
                  <label>
                    รายละเอียด <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="newsDescription"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียด!",
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
              <div className="form-group col-lg-12">
                <label>
                  แอปพลิเคชั่น <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  initialValue={false}
                  name="FarmerApp"
                  valuePropName="checked"
                  className="my-0"
                >
                  <Checkbox
                    onChange={handleChooseFarmer}
                    checked={chooseFarmer}
                    className="pt-2"
                    disabled={chooseDroner}
                  >
                    Farmer Application
                  </Checkbox>
                </Form.Item>
                <div
                  className="form-group col-lg "
                  style={{ paddingLeft: "3%" }}
                >
                  <Form.Item
                    initialValue={false}
                    valuePropName="checked"
                    className="my-0"
                  >
                    <Checkbox
                      onChange={handlePinMain}
                      checked={farmPinMain}
                      className="pt-2"
                      disabled={!chooseFarmer || farmCountPoint?.disablePinMain}
                    >
                      ปักหมุดในหน้าหลัก
                      <span
                        style={{
                          color:
                            !chooseFarmer || farmCountPoint?.disablePinMain
                              ? color.Disable
                              : color.Grey,
                        }}
                      >
                        {` (เหลือปักหมุด ${farmCountPoint?.remainPinMain} อัน)`}
                      </span>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    initialValue={false}
                    valuePropName="checked"
                    className="my-0"
                  >
                    <Checkbox
                      onChange={handlePinAll}
                      checked={farmPinAll}
                      disabled={!chooseFarmer || farmCountPoint?.disablePinAll}
                    >
                      ปักหมุดในหน้าข่าวสารทั้งหมด
                      <span
                        style={{
                          color:
                            !chooseFarmer || farmCountPoint?.disablePinAll
                              ? color.Disable
                              : color.Grey,
                        }}
                      >
                        {` (เหลือปักหมุด ${farmCountPoint?.remainPinAll} อัน)`}
                      </span>
                    </Checkbox>
                  </Form.Item>
                </div>
                <Form.Item
                  initialValue={false}
                  name="DronerApp"
                  valuePropName="checked"
                  className="my-0 pt-2"
                >
                  <Checkbox
                    onChange={handleChooseDroner}
                    checked={chooseDroner}
                    className="mt-0"
                    disabled={chooseFarmer}
                  >
                    Droner Application
                  </Checkbox>
                </Form.Item>
                <div
                  className="form-group col-lg "
                  style={{ paddingLeft: "3%" }}
                >
                  <Form.Item
                    initialValue={false}
                    valuePropName="checked"
                    className="my-0"
                  >
                    <Checkbox
                      onChange={handlePinMain}
                      checked={dronePinMain}
                      className="pt-2"
                      disabled={
                        !chooseDroner || droneCountPoint?.disablePinMain
                      }
                    >
                      ปักหมุดในหน้าหลัก
                      <span
                        style={{
                          color:
                            !chooseDroner || droneCountPoint?.disablePinMain
                              ? color.Disable
                              : color.Grey,
                        }}
                      >
                        {` (เหลือปักหมุด ${droneCountPoint?.remainPinMain} อัน)`}
                      </span>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    initialValue={false}
                    valuePropName="checked"
                    className="my-0"
                  >
                    <Checkbox
                      onChange={handlePinAll}
                      checked={dronePinAll}
                      disabled={!chooseDroner || droneCountPoint?.disablePinAll}
                    >
                      ปักหมุดในหน้าข่าวสารทั้งหมด
                      <span
                        style={{
                          color:
                            !chooseDroner || droneCountPoint?.disablePinAll
                              ? color.Disable
                              : color.Grey,
                        }}
                      >
                        {` (เหลือปักหมุด ${droneCountPoint?.remainPinAll} อัน)`}
                      </span>
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
              <div className="form-group col-lg-12 pt-4">
                <label>
                  หมวดหมู่ <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  initialValue={false}
                  name="news"
                  valuePropName="checked"
                  className="my-0"
                >
                  <Checkbox
                    onChange={handleChooseNews}
                    checked={chooseNews}
                    className="pt-2"
                  >
                    ข่าวสาร
                  </Checkbox>
                </Form.Item>
                <div className="row">
                  <div className="col-lg">
                    <Form.Item
                      initialValue={false}
                      name="challenge"
                      valuePropName="checked"
                      className="my-0"
                    >
                      <Checkbox
                        onChange={handleChooseChallenge}
                        checked={chooseChallenge}
                        className="mt-0"
                      >
                        ชาเลนจ์
                      </Checkbox>
                    </Form.Item>
                  </div>
                  <div className="col-lg-10">
                    <Form.Item name="campName">
                      <Select
                        disabled={!chooseChallenge}
                        allowClear
                        placeholder="เลือกชื่อชาเลนจ์"
                        onChange={handleCampName}
                      >
                        {cName && cName.map((item) => (
                          <option key={item.id} value={item.id}>{item.campaignName}</option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="form-group col-lg-12 d-flex flex-column">
                  <label>
                    สถานะ<span style={{ color: "red" }}> *</span>
                  </label>
                  <Form.Item
                    name="newsStatus"
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
          </div>
        </div>
        <RenderNews
          img={imgProfile}
          description={descriptionEditor!}
          name={newsName}
        />
        <div className="col-8">
          <FooterPage
            disableSaveBtn={saveBtnDisable}
            onClickBack={() => navigate(-1)}
            onClickSave={onSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default AddNewsPage;
