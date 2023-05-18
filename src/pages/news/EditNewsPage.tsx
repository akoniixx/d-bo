import React, { useEffect, useState } from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom';
import { Checkbox, Form, Input, Radio, Tag } from 'antd';
import { CardHeaderPromotion } from '../../components/header/CardHeaderPromotion';
import uploadImg from "../../resource/media/empties/upload_img_news.png";
import { color } from '../../resource';
import { resizeFileImg } from '../../utilities/ResizeImage';
import { UploadImageEntity, UploadImageEntity_INTI } from '../../entities/UploadImageEntities';
import { formats, modules } from '../../components/editor/EditorToolbar';
import ReactQuill from 'react-quill';
import FooterPage from '../../components/footer/FooterPage';
import RenderNews from '../../components/mobile/RenderNews';
import { NewsDatasource } from '../../datasource/NewsDatasource';
import Swal from 'sweetalert2';
import parse from "html-react-parser";
import { UploadImageDatasouce } from '../../datasource/UploadImageDatasource';
import { DashboardLayout } from '../../components/layout/Layout';
const { Map } = require("immutable");
const _ = require("lodash");

let queryString = _.split(window.location.pathname, "=");

function EditNewsPage() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [imgProfile, setImgProfile] = useState<any>();
  const [chooseFarmer,setChooseFarmer] = useState<boolean>(false)
  const [chooseDroner,setChooseDroner] = useState<boolean>(false)
  const [application,setApplication] = useState<string>("")
  const [newsName,setNewsName] = useState<string>("")
  const [descriptionEditor, setDescriptionEditor] = useState<string | null>(
    null
  );
  const [createImgProfile, setCreateImgProfile] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
    console.log(f.toJS().file)
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
    setBtnSaveDisable(true);
    form.setFieldValue(
      "img",null
    )
    onFieldsChange()
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

  const handleChooseFarmer = (e : any) =>{
    setChooseFarmer(e.target.checked)
    handleChooseApplication(e.target.checked,chooseDroner)
  }

  const handleChooseDroner = (e : any) =>{
    setChooseDroner(e.target.checked)
    handleChooseApplication(chooseFarmer,e.target.checked)
  }

  const handleChooseApplication = (farmer : boolean,droner : boolean) =>{
    if(farmer === false && droner === false){
      setApplication("")
    }
    else if(farmer === true && droner === false){
      setApplication("FARMER")
    }
    else if(farmer === false && droner === true){
      setApplication("DRONER")
    }
    else{
      setApplication("ALL")
    }
  }

  const onFieldsChange = () => {
    const {
      newsName,
      newsDescription,
      newsStatus,
      FarmerApp,
      DronerApp,
      img
    } = form.getFieldsValue()
    let fieldInfo = false;
    let fieldapp = false;
    let fieldimg = false;
    if(newsName && (newsDescription != "<p><br></p>") && newsStatus){
      fieldInfo = false
    }
    else{
      fieldInfo = true
    }
    if(FarmerApp || DronerApp){
      fieldapp = false
    }
    else{
      fieldapp = true
    }

    if(!img){
      fieldimg = true
    }
    else{
      fieldimg = false
    }
    setBtnSaveDisable(fieldInfo || fieldapp || fieldimg)
  }

  const onSubmit = ()=>{
    const {
      newsName,
      newsDescription,
      newsStatus
    } = form.getFieldsValue()
    if(!createImgProfile.file){
      NewsDatasource.editNews(
        {
          id : queryString[1],
          title : newsName,
          details : newsDescription,
          status : newsStatus,
          application : application,
          createBy : profile.firstname + " " + profile.lastname,
        }
      ).then(res => {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/NewsPage";
        });
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาก",
          icon: "error",
          showConfirmButton: true,
        });
      });
    }
    else{
      NewsDatasource.editNews(
        {
          id : queryString[1],
          title : newsName,
          details : newsDescription,
          status : newsStatus,
          application : application,
          file : createImgProfile.file,
          createBy : profile.firstname + " " + profile.lastname,
        }
      ).then(res => {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then((time) => {
          window.location.href = "/NewsPage";
        });
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาก",
          icon: "error",
          showConfirmButton: true,
        });
      });
    }
  }

  useEffect(()=>{
    NewsDatasource.getNewsById(queryString[1]).then(
      res=> {
        form.setFieldsValue({
          img : res.imagePath,
          newsName : res.title,
          newsStatus : res.status,
          newsDescription : res.details,
          FarmerApp : res.application === "ALL" ? true : res.application === "FARMER" ? true : false,
          DronerApp : res.application === "ALL" ? true : res.application === "DRONER" ? true : false
        })
        setNewsName(res.title)
        setDescriptionEditor(res.details);
        setImgProfile(res.imagePath)
        setApplication(res.application)
        setChooseFarmer(res.application === "ALL" ? true : res.application === "FARMER" ? true : false)
        setChooseDroner(res.application === "ALL" ? true : res.application === "DRONER" ? true : false)
      }
    )
  },[])

  return (
    <DashboardLayout>
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
                  <Form.Item name="img" rules={[
                      {
                        required: true,
                        message: "กรุณาใส่รูปภาพ!",
                      },
                  ]}>
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
                <p className='text-center text-danger pt-1 pb-4'>*รูปภาพจะต้องมีสัดส่วน 16:6 หรือ 1,000px * 375px เท่านั้น เพื่อความสวยงามของภาพในแอปพลิเคชัน*</p>
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
                      setNewsName(e.target.value)
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
                <Form.Item initialValue={false} name="FarmerApp" valuePropName="checked" className='my-0'>
                    <Checkbox
                      onChange={handleChooseFarmer}
                      checked={chooseFarmer}
                      className="pt-2"
                    >
                      Farmer Application
                    </Checkbox>
                </Form.Item>
                <Form.Item initialValue={false} name="DronerApp" valuePropName="checked" className='my-0'>
                    <Checkbox
                      onChange={handleChooseDroner}
                      checked={chooseDroner}
                      className="mt-0"
                    >
                      Droner Application
                    </Checkbox>
                </Form.Item>
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
    </DashboardLayout>
  )
}

export default EditNewsPage