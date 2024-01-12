import { Badge, DatePicker, Input, Modal, Radio, Row, Select, Space, TimePicker } from "antd"
import { BackButton } from "../button/BackButton"
import SaveButtton from "../button/SaveButton"
import { useEffect, useState } from "react"
import color from "../../resource/color"
import icon from "../../resource/icon"
import { numberWithCommas } from "../../utilities/TextFormatter"
import { useQuery } from "react-query"
import { CreditDronerDatasource } from "../../datasource/CreditDatasource"
import upload_droner_infinity from '../../resource/media/empties/upload_droner_infinity.png'
import { DeleteOutlined } from "@ant-design/icons"
import { Option } from "antd/lib/mentions"
import { BookBankDatasource } from "../../datasource/BookBankDatasource"
import moment from "moment"
import { STATUS_COLOR_CREDIT, STATUS_CREDIT_MAPPING } from "../../definitions/Status"
import { DateTimeUtil } from "../../utilities/DateTimeUtil"

interface ModalCreditApproveProps{
    open : boolean
    id : string,
    dronerId : string,
    name : string
    tel : string
    point : number,
    cashCondition : number
    pointCondition : number
    onClose : ()=>void
    onSubmit : ()=>void
}

const ModalCreditApprove: React.FC<ModalCreditApproveProps> = ({
    open,
    id,
    name,
    dronerId,
    tel,
    point,
    onClose,
    onSubmit,
    cashCondition,
    pointCondition
}) => {
    const onSave = async() =>{
        CreditDronerDatasource.editCredit(
            id,
            "CASH",
            dronerId,
            queryData.data.credit,
            "0",
            (queryData.data.credit*cashCondition).toString(),
            upload,
            cashCheck.name,
            cashCheck.bank,
            new Date(
                moment(cashCheck.date).format('YYYY-MM-DD') +
                  ' ' +
                  moment(cashCheck.time).format('HH:mm:ss'),
              ).toISOString(),
            status
        ).then(res => {
            onSubmit()
        }).catch(err => console.log(err))
    }
    const fetchData = async() =>{
        const credit = await CreditDronerDatasource.getCreditById(id)
        setCashcheck({
            name : credit.transfererName,
            bank : credit.banking,
            date : moment(new Date(credit.datetransfer).toUTCString()),
            time : moment(new Date(credit.datetransfer).getTime())
        })
        setImg(credit.slip+".png")
        setStatus(credit.status)
        return credit
    }
    const fetchBank = async()=>{
        const bankData = await BookBankDatasource.getBankData()
        return bankData
    }
    const queryData = useQuery([id],()=>fetchData(),{keepPreviousData : true})
    const [disabled,setDisabled] = useState<boolean>(true)
    const [upload, setUpload] = useState<any>()
    const [img,setImg] = useState<string>("")
    const [status,setStatus] = useState<string>("APPROVE")
    const onChangeImage = async (file: any) => {
        const source = file.target.files[0];
        setUpload(source)
        setImg(source.name)
    };
    const [cashCheck,setCashcheck] = useState<any>({
        name : "",
        bank : "",
        date : undefined,
        time : undefined
    })
    const dateFormat = 'DD/MM/YYYY'
    const bankQuery = useQuery(['bankData'],()=>fetchBank(),{keepPreviousData : true})
    useEffect(()=>{
        if(!!cashCheck.name && !!cashCheck.bank && !!cashCheck.date && !!cashCheck.time && !!img){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    },[cashCheck.name,cashCheck.bank,cashCheck.date,cashCheck.time,img,status])
    return <Modal
    title={
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
      >
        รายละเอียดการแลกเครดิต
      </div>
    }
    visible={open}
    onCancel={onClose}
    width={600}
    footer={[
      
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
    <p>เงิน</p>
    <div className="mt-3">
      <span>จำนวนเครดิต</span>
      <span style={{ color: color.Grey }}> {`(1 เครดิต = ${numberWithCommas(cashCondition)} บาท)`}</span>
      <span style={{ color: color.Error }}> *</span>
    </div>
    <p>{queryData.isLoading ? 0 : queryData.data.credit ?? 0} เครดิต</p>
    <div className="mt-3">
        <div className="mt-3">
          <span>หลักฐานการชำระเงิน</span>
          <span style={{ color: color.Grey }}> (ไฟล์รูปภาพ JPG/PNG)</span>
          <span style={{ color: color.Error }}> *</span>
        </div>
        <p className="m-0 p-0" style={{
            color : color.Success,
            textDecoration : 'underline'
        }}>{img}</p>
    </div>
    <div className="mt-3 row">
        <div className="col-5">
            <div>
              <span>วันที่โอน</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <p className="mt-1 mb-0">{DateTimeUtil.formatDateThShort(moment(cashCheck.date).format("MM/DD/YYYY"))}</p>
        </div>
        <div className="col-5">
            <div>
              <span>เวลาที่โอน</span>
              <span style={{ color: color.Error }}> *</span>
            </div>
            <p className="mt-1 mb-0">{moment(cashCheck.date).format("HH:mm")}</p>
        </div>
    </div>
    <div className="mt-3">
        <div className="mt-3">
          <span>สถานะ</span>
          <span style={{ color: color.Error }}> *</span>
        </div>
        <span style={{ color: STATUS_COLOR_CREDIT[status] }}>
        <Badge color={STATUS_COLOR_CREDIT[status]} />{' '}
        {STATUS_CREDIT_MAPPING[status]}
    </span>
    </div>
  </Modal>
}

export default ModalCreditApprove