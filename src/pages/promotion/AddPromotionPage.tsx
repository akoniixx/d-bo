import Layouts from "../../components/layout/Layout"
import { BackIconButton } from "../../components/button/BackButton"
import { useNavigate } from "react-router-dom"
import { CardHeaderPromotion } from "../../components/header/CardHeaderPromotion"
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
  TimePicker
} from "antd"
import parse from 'html-react-parser';
import { Option } from "antd/lib/mentions";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../components/editor/editor.css'
import { formats, modules } from "../../components/editor/EditorToolbar"
import color from "../../resource/color"
import AddButtton from "../../components/button/AddButton"
import ActionButton from "../../components/button/ActionButton"
import { DeleteOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import { CropDatasource } from "../../datasource/CropDatasource"
import { LocationDatasource } from "../../datasource/LocationDatasource"
import FooterPage from "../../components/footer/FooterPage"
import moment from "moment"
import { MONTH_SALE } from "../../definitions/Month"

function AddPromotion(){
  const [plantName,setPlantName] = useState<string[]>([])
  const [provinceList,setProvinceList] = useState<string[]>([])
  const [crop,setCrop] = useState<any>([
    {
      plantName : null,
      injectionTime : [],
      injectionList : []
    }
  ])
  const [descriptionEditor,setDescriptionEditor] = useState<string|null>(null)
  const [conditionEditor,setConditionEditor] = useState<string|null>(null)
  const [editTable,setEditTable] = useState(true)
  const [province,setProvince] = useState<string[]>([])
  const [coupon,setCoupon] = useState<string | null>(null)
  const [couponType,setCouponType] = useState<string | null>(null)
  const [couponInfo,setCouponInfo] = useState<string | null>(null)
  const [specialCoupon,setSpecialCoupon] = useState<boolean>(false);
  const [raiCondition,setRaiCondition] = useState<boolean>(false);
  const [serviceCondition,setServiceCondition] = useState<boolean>(false);
  const [couponPlant,setCouponPlant] = useState<boolean>(false);
  const [couponProvince,setCouponProvince] = useState<boolean>(false);
  const [couponNotiMany,setCouponNotiMany] = useState<boolean>(false);
  const [couponNotiExpired,setCouponNotiExpired] = useState<boolean>(false);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);
  const fetchTwice = useRef<boolean>(true)
  const [renderMobile,setRenderMobile] = useState({
    couponName : "",
    couponType : "",
    promotionStatus : "",
    count : "",
    startDate : "",
    expiredDate : "",
    startTime : "",
    expiredTime : "",
    expiredDateTitle : "",
    raiConditionMin : "",
    raiConditionMax : "",
    serviceConditionMin : "",
    serviceConditionMax : "",
    plantName : "",
    province : ""
  })
  const [form] = Form.useForm();

    useEffect(()=>{
      if(fetchTwice.current){
        getCropPlantName()
        getProvince()
        fetchTwice.current = false;
      }
    },[])

    const getCropPlantName = ()=>{
      CropDatasource.getAllCropPlantName()
      .then((res)=>{
        const crop = res;
        const plant : string[] = []
        crop.map((item)=>{
          plant.push(item.cropName)
        })
        setPlantName(plant)
      })
      .catch(err => console.log(err))
    }

    const getCropInjectionTime = (index : number,plantName : string)=>{
      CropDatasource.getPurposeByCroupName(plantName)
      .then((res)=>{
        const updateCrop = crop.map((item : any,i : number)=>{
          if(index === i){
            const injectionList = res.purposeSpray.map((purposespray) => purposespray.purposeSprayName)
            return {...item ,injectionList : injectionList,plantName : plantName}
          }
          else{
            return item
          }
        })
        setCrop(updateCrop)
      })
      .catch(err => console.log(err))
    }

    const getProvince = ()=>{
      LocationDatasource.getProvince()
      .then((res)=>{
        setProvinceList(res.map((item : any)=>
          item.provinceName
        ))
      })
      .catch(err => console.log(err))
    }
    
    const navigate = useNavigate()
    const columns = [
      {
        title : <div
        style={{ display: "flex", alignItems: "center" }}>
          ลำดับ
        </div>,
        dataIndex: "index",
        key: "index",
        render : (value: any, row: any, index: number) => {
          return {
            children: (
              <p>{index +1}</p>
            )
          }
        }
      },
      {
        title : "ชื่อพืช",
        dataIndex: "plantName",
        key: "plantName",
        render : (value: any, row: any, index: number) => {
          let formName = `plantName${index}`
          return {
            children: (
              <Form.Item name={formName}
              key={index}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อพืช!",
                },
              ]}>
                <Select
                  key={index}
                  disabled={!couponPlant}
                  className="col-lg-12 p-1"
                  placeholder="เลือกพืช"
                  onChange={(plant)=>{
                    handleChangePlantCrop(index,plant)
                  }}
                  showSearch
                  value={value}
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
                  {
                    plantName.map((item)=>(
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            )
          }
        }
      },
      {
        title : "ช่วงเวลาการพ่น",
        dataIndex: "injectionTime",
        key: "injectionTime",
        render : (value: any, row: any, index: number) => {
          let formName = `injectionTime${index}`
          return {
            children: (
              <Form.Item name={formName}
              key={index}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเลือกเวลาในการฉีดพ่น!",
                },
              ]}>
                <Select
                  key={index}
                  disabled={!(crop[index].plantName) || !couponPlant}
                  mode="multiple"
                  className="col-lg-12 p-1"
                  onClear={() => {

                  }}
                  placeholder="เลือกช่วงเวลาการพ่น"
                  onChange={(injectionTime)=>{
                    handleChangeInjectionTime(index,injectionTime)
                  }}
                  showSearch
                  // value={crop[index].injectionTime}
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
                  {
                    crop[index].injectionList.map((item : string)=>(
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            )
          }
        }
      },
      {
        render : (value: any, row: any, index: number)=>{
          return {
            children : (
              <ActionButton
              icon={<DeleteOutlined />}
              color={color.primary1}
              onClick={() =>{
                deleteCrop(index)
              }}
              />
            )
          }
        }
      }
    ]

    const handleChangePlantCrop = (index : number,plant : string) =>{
      const updateCrop = crop.map((item : any,i : number)=>{
        if(i === index){
          return {...item,plantName : plant};
        }
        else{
          return item
        }
      })
      setCrop(updateCrop)
      getCropInjectionTime(index,plant)
    }

    const handleChangeInjectionTime = (index : number,injectionTime : string[]) => {
      const updateCrop = crop.map((item : any,i : number)=>{
        if(i === index){
          return {...item,injectionTime : injectionTime};
        }
        else{
          return item
        }
      })
      const plantName = crop.map((item : any)=>{
        let plantname = ""
        plantname += item.plantName+ " "
        return plantname
      })
      setRenderMobile({
        ...renderMobile,
        plantName : plantName
      })
      setCrop(updateCrop)
    }

    const handleChangeProvince = (provinceName : string[]) =>{
      setProvince(provinceName)
    }

    const handleCoupon = (e : RadioChangeEvent)=>{
      setCoupon(e.target.value)
    }

    const handleCouponType = (type : string)=>{
      setCouponType(type)
    }

    const handleCouponInfo = (info : string)=>{
      setCouponInfo(info)
    }

    const handleSpecialCoupon = ()=>{
      setSpecialCoupon(!specialCoupon)
      form.setFieldsValue({
        registerFirstTime : !specialCoupon
      })
    }

    const handleRaiCondition = ()=>{
      setRaiCondition(!raiCondition)
    }

    const handleServiceCondition = ()=>{
      setServiceCondition(!serviceCondition)
    }

    const handlePlantCoupon = ()=>{
      setCouponPlant(!couponPlant)
    }

    const handleCouponProvince = ()=>{
      setCouponProvince(!couponProvince)
    }

    const handleNotiCouponMany = ()=>{
      setCouponNotiMany(!couponNotiMany)
    }

    const handleNotiCouponExpired = ()=>{
      setCouponNotiExpired(!couponNotiExpired)
    }

    const changeFormat = (date : any)=>{
      const day = date.split("-");
      return `${day[2]} เดือน ${MONTH_SALE[parseInt(day[1])-1].name}`
    }

    const addCrop = ()=>{
       setCrop((pre: any)=>{
        return [...pre,{
          plantName : null,
          injectionTime : [],
          injectionList : []
        }]
       })
    }

    const deleteCrop = (index : number)=>{
      const updateCrop  = crop
      updateCrop.splice(index,1)
      setEditTable(!editTable)
      setCrop(updateCrop)
    }

    const handleDescriptionEditor = (content : any, delta: any, source : any, editor : any) => {
      setDescriptionEditor(editor.getHTML())
    }

    const handleConditionEditor = (content : any, delta: any, source : any, editor : any) => {
      setConditionEditor(editor.getHTML())
    }

    const onFieldsChange = ()=>{
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
        couponConditionProvinceList
      } = form.getFieldsValue()

      let fieldErr : boolean = true;
      let discountErr : boolean = true;
      let raiError : boolean = true;
      let serviceError : boolean = true;
      let plantErr : boolean = true;
      let provinceError : boolean = true;
      
      if(couponName &&
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
      condition){
         fieldErr = false
      }
      else{
        fieldErr = true;
      }

      if(discountType === "DISCOUNT"){
        if(discount){
          discountErr = false;
        }
        else{
          discountErr = true
        }
      }

      if(raiCondition){
        if(couponConditionRaiMin === "" && couponConditionRaiMax === ""){
          raiError = true
        }
        else{
          raiError = false
        }
      }

      if(serviceCondition){
        if(couponConditionServiceMin === "" && couponConditionServiceMax === ""){
          serviceError = true
        }
        else{
          serviceError = false
        }
      }

      if(couponPlant){
        const plantErrArray = crop.map((item : any)=>{
          if(item.plantName === "" || item.injectionTime.length === 0){
            return true;
          }
          else{
            return false;
          }
        })
        plantErr = plantErrArray.includes(true)
      }

      if(couponProvince){
        if(couponConditionProvinceList.length !== 0){
          provinceError = false
        }
        else{
          provinceError = true
        }
      }
      console.log({
        fieldErr : fieldErr,
         discountErr : discountErr!,  
         raiError : raiError!,
         serviceError : serviceError!,
         plantErr : plantErr!,
         provinceError : provinceError!
      })

      setBtnSaveDisable(fieldErr && discountErr! && raiError! && serviceError! && plantErr! && provinceError!)
    }

    return <Layouts>
        <div className="d-flex align-items-center">
            <BackIconButton onClick={() => navigate(-1)} />
              <strong style={{ fontSize: "20px" }}>
                เพิ่มคูปอง
              </strong>
        </div>
        <br />
            <div className="row">
                <div className="col-8">
                    <CardHeaderPromotion textHeader="ข้อมูลคูปอง" center={false}/>
                    <div className="bg-white px-4 py-3">
                        <Form 
                          form={form}
                          onFieldsChange={onFieldsChange}
                        >
                            <div className="form-group col-lg-12">
                                <label>
                                  ชื่อคูปอง <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Item name="couponName"
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกชื่อคูปอง!",
                                    },
                                ]}>
                                  <Input placeholder="กรอกชื่อคูปอง" autoComplete="off" onChange={(e)=>{
                                    setRenderMobile({
                                      ...renderMobile,
                                      couponName : e.target.value
                                    })
                                  }}/>
                                </Form.Item>
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-6">
                                    <label>
                                      ประเภทคูปอง <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Form.Item name="couponType"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณาเลือกประเภทคูปอง!",
                                        },
                                    ]}>
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
                                          <Option value={"INJECTION"}>
                                            การฉีดพ่น
                                          </Option>
                                          <Option value={"DRUG"}>
                                            ปุ๋ยและยา
                                          </Option>
                                      </Select>
                                    </Form.Item>
                                </div>
                                <div className="form-group col-lg-6">
                                  <label>
                                    ส่วนลดคูปอง <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <div className="row">
                                    <div className="col-7">
                                    <Form.Item name="discountType"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณาเลือกชนิดของส่วนลดคูปอง!",
                                        },
                                    ]}>
                                      <Radio.Group className="d-flex" onChange={handleCoupon}>
                                        <Radio value={"FREE"}>ฟรีค่าบริการ</Radio>
                                        <Radio value={"DISCOUNT"}>ส่วนลด</Radio>
                                      </Radio.Group>
                                    </Form.Item>
                                    </div>
                                    <div className="col-5">
                                      <Form.Item name="discount"
                                        rules={[
                                          {
                                            required: (coupon === "DISCOUNT"),
                                            message: "กรุณากรอกส่วนลดคูปอง!",
                                          },
                                      ]}>
                                        <Input disabled={(coupon !== "DISCOUNT")} placeholder="กรอกจำนวนเงิน" autoComplete="off"/>
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
                                  <Form.Item name="promotionType"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณาเลือกรูปแบบคูปอง!",
                                        },
                                    ]}>
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
                                        <Option value={"ONLINE"}>
                                          ออนไลน์(Online)
                                        </Option>
                                        <Option value={"OFFLINE"}>
                                          ออฟไลน์(Offline)
                                        </Option>
                                    </Select>
                                  </Form.Item>
                                </div>
                                <div className="form-group col-lg-6">
                                <label>
                                  จำนวนคูปอง <span style={{ color: "red" }}>*</span>
                                </label>
                                <div className="mt-1">
                                  <Form.Item name="count"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกจำนวนคูปอง!",
                                        },
                                    ]}>
                                    <Input placeholder="กรอกจำนวนคูปอง" autoComplete="off" onChange={(e)=>{
                                      setRenderMobile({
                                        ...renderMobile,
                                        count : e.target.value
                                      })
                                    }}/>
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
                                  <Form.Item name="DateStart"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกวันที่!",
                                        },
                                    ]}>
                                    <DatePicker  
                                      placeholder="เลือกวันที่" 
                                      onChange={(val)=> {
                                        if(val){
                                          const startDate = changeFormat(moment(val).format("YYYY-MM-DD"))
                                          setRenderMobile({
                                            ...renderMobile,
                                            startDate : startDate
                                          })
                                        }
                                      }}
                                    />
                                  </Form.Item>
                                  <Form.Item name="TimeStart"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกเวลา!",
                                        },
                                    ]}>
                                    <TimePicker className="ms-3" placeholder="เลือกเวลา" onChange={(val)=> {
                                        if(val){
                                          const startTime = moment(val).format("HH:mm")
                                          setRenderMobile({
                                            ...renderMobile,
                                            startTime : startTime
                                          })
                                        }
                                      }}/>
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="form-group col-lg-6">
                                <label>
                                  วันสิ้นสุด <span style={{ color: "red" }}>*</span>
                                </label>
                                <div className="d-flex">
                                  <Form.Item name="DateExpired"
                                        rules={[
                                          {
                                            required: true,
                                            message: "กรุณากรอกวันที่!",
                                          },
                                  ]}>
                                    <DatePicker 
                                      placeholder="เลือกวันที่" 
                                      onChange={(val)=> {
                                        if(val){
                                          const expiredDate = changeFormat(moment(val).format("YYYY-MM-DD"))
                                          setRenderMobile({
                                            ...renderMobile,
                                            expiredDate : expiredDate
                                          })
                                        }
                                      }}/>
                                  </Form.Item>
                                  <Form.Item name="TimeExpired"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกเวลา!",
                                        },
                                  ]}>
                                    <TimePicker className="ms-3" placeholder="เลือกเวลา" onChange={(val)=> {
                                        if(val){
                                          const expiredTime = moment(val).format("HH:mm")
                                          setRenderMobile({
                                            ...renderMobile,
                                            expiredTime : expiredTime
                                          })
                                        }
                                      }}/>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="row py-4">
                              <div className="form-group col-lg-12">
                                <label>
                                  รายละเอียด <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Item name="description"
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกรายละเอียด",
                                    },
                                ]}>
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
                                  เงื่อนไข (จะแสดงในแอพลิเคชั่น) <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Item name="condition"
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกเงื่อนไข!",
                                    },
                                ]}>
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
                                <label>
                                  เงื่อนไขการได้รับพิเศษ <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Item name="specialCondition">
                                  <Checkbox
                                    onChange={handleSpecialCoupon}
                                    checked={specialCoupon} 
                                    className="pt-3"
                                  >ลงทะเบียนใช้งานครั้งแรก</Checkbox>
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
                                    <Checkbox
                                      onChange={handleRaiCondition}
                                      checked={raiCondition}
                                      className="pt-3"
                                    >
                                      <div className="d-flex">
                                        <div className="d-flex flex-column px-3">
                                           <label>จำนวนไร่ขั้นต่ำ</label>
                                           <Form.Item name="couponConditionRaiMin">
                                             <Input disabled={!raiCondition} placeholder="กรอกจำนวนไร่" onChange={(e)=>{
                                              setRenderMobile({
                                                ...renderMobile,
                                                raiConditionMin : e.target.value
                                              })
                                             }}/>
                                           </Form.Item>
                                        </div>
                                        <div className="d-flex flex-column px-2">
                                           <label>จำนวนไร่สูงสุด</label>
                                           <Form.Item name="couponConditionRaiMax">
                                             <Input disabled={!raiCondition} placeholder="กรอกจำนวนไร่" onChange={(e)=>{
                                              setRenderMobile({
                                                ...renderMobile,
                                                raiConditionMax : e.target.value
                                              })
                                             }}/>
                                           </Form.Item>
                                        </div>
                                      </div>
                                    </Checkbox>
                                </div>
                                <div>
                                  <Checkbox
                                    onChange={handleServiceCondition}
                                    checked={serviceCondition}
                                    className="pt-3"
                                  >
                                    <div className="d-flex">
                                      <div className="d-flex flex-column px-3">
                                         <label>จำนวนค่าบริการขั้นต่ำ</label>
                                         <Form.Item name="couponConditionServiceMin">
                                           <Input disabled={!serviceCondition} placeholder="กรอกค่าบริการ" onChange={(e)=>{
                                              setRenderMobile({
                                                ...renderMobile,
                                                serviceConditionMin : e.target.value
                                              })
                                             }}/>
                                         </Form.Item>
                                      </div>
                                      <div className="d-flex flex-column px-2">
                                         <label>จำนวนค่าบริการสูงสุด</label>
                                         <Form.Item name="couponConditionServiceMax">
                                           <Input disabled={!serviceCondition} placeholder="กรอกค่าบริการ" onChange={(e)=>{
                                              setRenderMobile({
                                                ...renderMobile,
                                                serviceConditionMax : e.target.value
                                              })
                                             }}/>
                                         </Form.Item>
                                      </div>
                                    </div>
                                  </Checkbox>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-lg-12 d-flex justify-content-between align-items-center pb-4">
                                  <Checkbox 
                                    className="pt-3"
                                    checked={couponPlant}
                                    onChange={handlePlantCoupon}
                                  >พืชที่จะใช้คูปอง<span style={{ color: "red" }}> * ถ้าไม่กดปุ่ม checkbox คือเลือกพืชทั้งหมด *</span>
                                  </Checkbox>
                                <AddButtton text="เพิ่มชื่อพืช" onClick={addCrop}/>
                              </div>
                              <Table
                                columns={columns} 
                                dataSource={[...crop]}
                                pagination={false}
                                scroll={{ x: "max-content" }}/>
                            </div>
                            <div className="row">
                              <div className="form-group col-lg-12 d-flex justify-content-between align-items-center pt-2 pb-3">
                                  <Checkbox
                                    checked={couponProvince}
                                    onChange={handleCouponProvince}
                                    className="pt-3"
                                  >
                                  จังหวัดที่จะใช้คูปองได้<span style={{ color: "red" }}> * ถ้าไม่กดปุ่ม checkbox คือเลือกจังหวัด *</span>
                                  </Checkbox>
                              </div>
                              <Form.Item name="couponConditionProvinceList"
                                  rules={[
                                    {
                                      required: couponProvince,
                                      message: "กรุณากรอกเลือกจังหวัด",
                                    },
                                ]}>
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
                                   {
                                    provinceList.map((item)=>(
                                      <Option key={item} value={item}>
                                        {item}
                                      </Option>
                                    ))
                                   }
                                </Select>
                              </Form.Item>
                            </div>
                            <Divider />
                            <div className="row">
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
                            </div>
                            <Divider />
                            <div className="row">
                              <div className="form-group col-lg-12 d-flex flex-column">
                                <label>
                                สถานะ<span style={{ color: "red" }}> *</span>
                                </label>
                                <Form.Item name="promotionStatus"
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกจำนวนวัน",
                                    },
                                ]}>
                                  <Radio.Group className="d-flex flex-column">
                                    <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                                    <Radio value={"DRAFTING"}>แบบร่าง</Radio>
                                    <Radio value={"INACTIVE"}>ปิดการใช้งาน</Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                        </Form>
                        <br />
                    </div>
                </div>
                <div className="col-4">
                  <div className="">
                    <CardHeaderPromotion textHeader="ตัวอย่างในแอพลิเคชั่น" center={true}/>
                    <div style={{
                      width : '100%',

                    }} className="bg-white">
                      <div style={{
                        width : '100%',
                        height : '100%'
                      }}>
                        <div style={{
                          width : '100%',
                          height : '120px',
                          backgroundColor : '#2EC56E',
                          padding : '15px'
                        }}>
                          <div style={{
                            width : '100%',
                            height : '100%',
                            borderRadius : '10px',
                            backgroundColor : '#FFF',
                            display : 'flex',
                            padding : '0px 20px',
                            alignItems : 'center'
                          }}>
                            <div style={{
                              width : '30px',
                              height : '30px',
                              borderRadius : '15px',
                              backgroundColor : '#2EC56E',
                              marginRight : '15px'
                            }}>

                            </div>
                            <div>
                              <p style={{
                                margin : '0px',
                                padding : '0px',
                                fontSize : '16px'
                              }}>{(renderMobile.couponName === "")?"ชื่อคูปอง":renderMobile.couponName}</p>
                              <p style={{
                                margin : '0px',
                                padding : '0px',
                                fontSize : '12px'
                              }}>{raiCondition?`เมื่อจ้างขั้นต่ำ ${renderMobile.raiConditionMin === "" ? "XX":renderMobile.raiConditionMin} ไร่`:"ไม่จำกัดไร่"}</p>
                              <p style={{
                                margin : '0px',
                                padding : '0px',
                                fontSize : '12px',
                                color : '#747F8B'
                              }}>{renderMobile.expiredDate === ""?"หมดเขต XX เดือน XXXX":`หมดเขต ${renderMobile.expiredDate}`}</p>
                            </div>
                          </div>
                        </div>
                        <div style={{
                          width : '100%',
                          height : '15%',
                          backgroundColor : '#F7FFF0',
                          display : 'flex',
                          flexFlow : 'column',
                          alignItems : 'center',
                          padding : '12px 20px',
                        }}>
                          <div style={{
                            width : '100%',
                            display : 'flex',
                            justifyContent : 'space-between'
                          }}>
                            <p style={{
                              fontSize : '16px'
                            }}>คูปองเหลือ</p>
                            <p style={{
                              fontSize : '16px',
                              color : '#FB8705'
                            }}>{renderMobile.count === ""?"XX":renderMobile.count}<span style={{
                              color : '#000'
                            }}>/{renderMobile.count === ""?"XX":renderMobile.count} สิทธิ</span></p>
                          </div>
                          <div style={{
                            width : '100%',
                            height : '10px',
                            borderRadius : '5px',
                            backgroundImage : 'linear-gradient(67.07deg, #FB8705 14.86%, #FFCF75 85.14%)'
                          }}>

                          </div>
                        </div>
                        <div style={{
                          width : '100%',
                          height : '65%',
                          padding: '10px 20px',
                        }}>
                          <p style={{
                            fontSize : '16px'
                          }}>ช่วงเวลาที่ใช้งานได้</p>
                          <p style={{
                            fontSize : '16px',
                            color : '#5F6872'
                          }}>{`${renderMobile.startDate === "" ? `XX เดือน XXXX${renderMobile.startTime === "" ? ", XX:XX น.":`, ${renderMobile.startTime} น.`}`:`${renderMobile.startDate}${renderMobile.startTime === "" ? ", XX:XX น.":`, ${renderMobile.startTime} น.`}`} ถึง ${renderMobile.expiredDate === "" ? `XX เดือน XXXX${renderMobile.expiredTime === "" ? ", XX:XX น.":`, ${renderMobile.expiredTime} น.`}`:`${renderMobile.expiredDate}${renderMobile.expiredTime === "" ? ", XX:XX น.":`, ${renderMobile.expiredTime} น.`}`}`}
                          </p>
                          <p style={{
                            fontSize : '16px'
                          }}>รายละเอียด</p>
                          {
                            <p>{
                              parse(descriptionEditor??`<p style="font-size : 16px">...</p>`)
                            }</p>
                          }
                          <p style={{
                            fontSize : '16px'
                          }}>เงื่อนไข</p>
                          {
                            <p>{
                              parse(conditionEditor??`<p style="font-size : 16px">...</p>`)
                            }</p>
                          }
                          <p style={{
                            fontSize : '16px'
                          }}>เงื่อนไขการใช้คูปอง</p>
                          <ul>
                            {
                              raiCondition?<li>จำนวนไร่ขั้นต่ำที่ฉีดพ่น {(renderMobile.raiConditionMin === "")?"XX":renderMobile.raiConditionMin} ไร่ {(renderMobile.raiConditionMax === "")?"":`และไม่เกิน ${renderMobile.raiConditionMax} ไร่`}</li>:<></>
                            }
                            {
                              serviceCondition?<li>ค่าบริการต้องไม่ต่ำกว่า {(renderMobile.serviceConditionMin === "")?"XX":renderMobile.serviceConditionMin} บาท {(renderMobile.serviceConditionMax === "")?"":`และไม่เกิน ${renderMobile.serviceConditionMax} บาท`}</li>:<></>
                            }
                            {
                              couponPlant?<li>พืชที่ใช้คูปอง {renderMobile.plantName}</li>:<></>
                            }
                            {
                              couponProvince?<li>จังหวัด  {
                                province.map((item : any)=>{
                                  return item + " "
                                })
                              }</li>:<></>
                            }
                          </ul>
                          <div style={{
                            margin : '10px 0px',
                            width : '100%',
                            height : '54px',
                            backgroundColor : '#2EC46D',
                            borderRadius : '8px',
                            display : 'flex',
                            justifyContent : 'center',
                            alignItems : 'center'
                          }}>
                            <p style={{
                              margin : '0px',
                              color : '#FFF',
                              fontSize : '18px'
                            }}>เก็บส่วนลด</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                <FooterPage
                  disableSaveBtn={saveBtnDisable}
                  onClickBack={() => navigate(-1)}
                  onClickSave={() => {
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
                      couponConditionProvinceList
                    } = form.getFieldsValue()
                    console.log(
                      {
                      couponName : couponName,
                      couponType : couponType,
                      promotionStatus : promotionStatus,
                      promotionType : promotionType,
                      discountType : discountType,
                      discount : discount,
                      count : count,
                      startDate : moment(DateStart).format("YYYY-MM-DD")+" "+moment(TimeStart).format("HH:mm:ss"),
                      expiredDate : moment(DateExpired).format("YYYY-MM-DD")+" "+moment(TimeExpired).format("HH:mm:ss"),
                      description : description,
                      condition : condition,
                      specialCondition : specialCoupon,
                      couponConditionRai : raiCondition,
                      couponConditionRaiMin : couponConditionRaiMin,
                      couponConditionRaiMax : couponConditionRaiMax,
                      couponConditionService : serviceCondition,
                      couponConditionServiceMin : couponConditionServiceMin,
                      couponConditionServiceMax : couponConditionServiceMax,
                      couponConditionPlant : couponPlant,
                      couponConditionPlantList : crop,
                      couponConditionProvince : couponProvince,
                      couponConditionProvinceList : couponConditionProvinceList,
                      }
                    )
                  }}
                />
                </div>
            </div>
    </Layouts>
}


export default AddPromotion