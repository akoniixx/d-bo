import { DatePicker, Input, Modal, Row, Select, TimePicker } from "antd"
import FooterPage from "../footer/FooterPage"
import { BackButton } from "../button/BackButton"
import SaveButtton from "../button/SaveButton"
import color from "../../resource/color"
import icon from "../../resource/icon"
import { Option } from "antd/lib/mentions"
import { useEffect, useState } from "react"
import { numberWithCommas } from "../../utilities/TextFormatter"
import upload_droner_infinity from '../../resource/media/empties/upload_droner_infinity.png'
import '../../pages/farmer/Style.css'
import { useQuery } from "react-query"
import { BookBankDatasource } from "../../datasource/BookBankDatasource"
import { CreditDronerDatasource } from "../../datasource/CreditDatasource"
import moment from "moment"
import { DeleteOutlined } from "@ant-design/icons"

interface ModalCreditProps{
    open : boolean
    dronerId : string
    name : string
    tel : string
    point : number
    cashCondition : number
    pointCondition : number
    onClose : ()=>void
    onSubmit : ()=>void
}

const ModalCredit : React.FC<ModalCreditProps> = ({
    open,
    dronerId,
    name,
    tel,
    point,
    onClose,
    onSubmit,
    cashCondition,
    pointCondition
}) => {
    const [disabled,setDisabled] = useState<boolean>(true)
    const [credit,setCredit] = useState<number>(0)
    const [creditCash,setCreditCash] = useState<number>(0)
    const dateFormat = 'DD/MM/YYYY'
    const [creditType,setCreditType] = useState<string>("POINT")
    const [upload, setUpload] = useState<any>()
    const [img,setImg] = useState<any>()
    const fetchBank = async()=>{
        const bankData = await BookBankDatasource.getBankData()
        return bankData
    }
    const bankQuery = useQuery(['bankData'],()=>fetchBank(),{keepPreviousData : true})
    const [cashCheck,setCashcheck] = useState<any>({
        name : "",
        bank : "",
        date : undefined,
        time : undefined
    })
    const onChangeImage = async (file: any) => {
        const source = file.target.files[0];
        setUpload(source)
        setImg(source.name);
    };
    const onSave = async()=>{
        CreditDronerDatasource.addCredit(
            creditType,
            dronerId,
            creditType === "POINT" ? credit.toString() : creditCash.toString(),
            (credit*pointCondition).toString(),
            (creditCash*cashCondition).toString(),
            upload,
            cashCheck.name,
            cashCheck.bank,
            new Date(
                moment(cashCheck.date).format('YYYY-MM-DD') +
                  ' ' +
                  moment(cashCheck.time).format('HH:mm:ss'),
              ).toISOString()
        ).then(res => {
            onSubmit()
        }).catch(err => console.log(err))
    }
    useEffect(()=>{
        if(creditType === "POINT"){
            if(credit === 0 || !credit){
                setDisabled(true)
            }
            else{
                if(credit * pointCondition > point){
                    setDisabled(true)
                }
                else{
                    setDisabled(false)
                }
            }
        } else{
            if(!!cashCheck.name && !!cashCheck.bank && !!cashCheck.date && !!cashCheck.time && (creditCash > 0)&& !!upload){
                setDisabled(false)
            }
            else{
                setDisabled(true)
            }
        }
    },[creditType,credit,creditCash,cashCheck.name,cashCheck.bank,cashCheck.date,cashCheck.time,upload])
    return <Modal
    title={
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
      >
        เพิ่มรายการแลกเครดิต
      </div>
    }
    visible={open}
    onCancel={onClose}
    width={600}
    footer={[
        <Row className='d-flex justify-content-between'>
        <BackButton onClick={onClose} disableBtn={false} />
        <SaveButtton onClick={onSave} disableBtn={disabled} />
      </Row>
    ]}
  >
    <div className="px-4 py-4 d-flex justify-content-between align-items-center" style={{
        backgroundColor : color.primary3,
    }}>
        <div>
            <p className="py-1 m-0">ชื่อนักบินโดรน</p>
            <p className="py-2 m-0 fw-light">{name}</p>
        </div>
        <div>
            <p className="py-1 m-0">เบอร์โทร</p>
            <p className="py-2 m-0 fw-light">{tel}</p>
        </div>
        <div>
            <p className="py-1 m-0">แต้มคงเหลือ</p>
            <div className="py-2 m-0 d-flex justify-content-between align-items-center">
                <img src={icon.coin} style={{
                    width : '20px',
                    height : '20px'
                }}/>
                <p className="p-0 m-0 fw-light">{numberWithCommas(point)}</p>
            </div>
        </div>
    </div>
    <div className="mt-3">
      <span>ประเภทการแลก</span>
      <span style={{ color: color.Error }}> *</span>
    </div>
    <Select
        placeholder='เลือกยี่ห้อโดรน'
        allowClear
        onChange={(val)=>setCreditType(val)}
        defaultValue={
          'POINT'
        }
        style={{
            marginTop : '10px',
            width : '100%',
            borderRadius : '10px'
        }}
    >
        <Option value="POINT">แต้ม</Option>
        <Option value="CASH">เงิน</Option>
    </Select>
    {
        creditType === "POINT" && 
        <>
            <div className="mt-3">
              <span>จำนวนเครดิต</span>
              <span style={{ color: color.Grey }}>{` (1 เครดิต = ${numberWithCommas(pointCondition)} แต้ม)`}</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Input value={credit} onChange={(e)=>(parseInt(e.target.value) < 0)? setCredit(0):setCredit(parseInt(e.target.value))} type="number" suffix="เครดิต"/>
                <img src={icon.nearequal} style={{
                    width : '20px',
                    height : '20px',
                    margin : '0px 10px'
                }}/>
                <Input value={!credit?0 : numberWithCommas(credit*pointCondition)} disabled suffix="แต้ม"/>
            </div>
        </>
    }
    {
        creditType === "CASH" &&
        <>
            <div className="mt-3">
              <span>จำนวนเครดิต</span>
              <span style={{ color: color.Grey }}> {`(1 เครดิต = ${numberWithCommas(cashCondition)} บาท)`}</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Input value={creditCash} onChange={(e)=>(parseInt(e.target.value)<0)?setCreditCash(0):setCreditCash(parseInt(e.target.value))} type="number" suffix="เครดิต"/>
                <img src={icon.nearequal} style={{
                    width : '20px',
                    height : '20px',
                    margin : '0px 10px'
                }}/>
                <Input value={!creditCash?0 : numberWithCommas(creditCash*cashCondition)} disabled suffix="บาท"/>
            </div>
            <div className="mt-3">
                <div className="mt-3">
                  <span>หลักฐานการชำระเงิน</span>
                  <span style={{ color: color.Grey }}> (ไฟล์รูปภาพ JPG/PNG)</span>
                  <span style={{ color: color.Error }}> *</span>
                </div>
                <div
                  className='hiddenFileBtn mt-2'
                  style={{
                    backgroundImage: `url(${upload_droner_infinity})`,
                    display: 'block',
                  }}
                >
                    <input key={upload} type='file' onChange={onChangeImage} title='เลือกรูป' />
                </div>
                {        
                 img &&  <div style={{
                    display: img ? 'flex' : 'none',
                    alignItems : 'center'
                }} className="mt-3">
                    <p className="m-0 p-0">{img}</p>
                    <DeleteOutlined onClick={()=>{
                        setUpload(null)
                        setImg("")
                    }} style={{
                        color : color.Error,
                        marginLeft : '10px'
                    }}/>
                </div>
       }        
            </div>
            <div className="mt-3">
              <span>ชื่อผู้โอน</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <Input placeholder="กรอกชื่อผู้โอน" style={{
                width : '100%'
            }} value={cashCheck.name}
            onChange={(e)=>setCashcheck({
              ...cashCheck,
              name : e.target.value
            })}/>
            <div className="mt-3">
              <span>ธนาคาร</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <Select
                placeholder='เลือกธนาคาร'
                allowClear
                value={cashCheck.bank}
                onChange={(e)=>setCashcheck({
                  ...cashCheck,
                  bank : e
                })}
                style={{
                    marginTop : '10px',
                    width : '100%',
                    borderRadius : '10px'
                }}
            >
                {
                    bankQuery.isLoading ?
                    <></> :
                    bankQuery.isError ?
                    <></> :
                    bankQuery.data.map((item : any)=>(
                        <Option value={item.bankName} key={item.bankName}>
                            <img src={item.logoPath} style={{
                                width : '20px',
                                height : '20px',
                                marginRight : '10px'
                            }}/>
                            {item.bankName}
                        </Option>
                    ))
                }
            </Select>
            <div className="mt-3 row">
                <div className="col-5">
                    <div>
                      <span>วันที่โอน</span>
                      <span style={{ color: color.Error }}> *</span>
                    </div>
                    <DatePicker
                      placeholder='เลือกวันที่'
                      format={dateFormat}
                      style={{
                        width : '100%'
                      }}
                      value={cashCheck.date}
                      onChange={(e)=>setCashcheck({
                        ...cashCheck,
                        date : e
                      })}
                    />
                </div>
                <div className="col-5">
                    <div>
                      <span>เวลาที่โอน</span>
                      <span style={{ color: color.Error }}> *</span>
                    </div>
                    <TimePicker
                      value={cashCheck.time}
                      onChange={(e)=>setCashcheck({
                        ...cashCheck,
                        time : e
                      })}
                      format={'HH:mm'}
                      placeholder='เลือกเวลา'
                      style={{
                        width : '100%'
                      }}
                      allowClear={false}
                    />
                </div>
            </div>
        </>
    }
  </Modal>
}

export default ModalCredit