import { 
    Button,
    Divider, 
    Modal 
} from 'antd'
import React from 'react'
import { color } from '../../resource'

interface ModalDeleteCouponProps{
    show : boolean,
    backButton : ()=> void,
    callBack : ()=> void
}

const ModalDeleteCoupon : React.FC<ModalDeleteCouponProps> =({show,backButton,callBack}) =>{
  return (
    <Modal
    title="ยืนยันการลบ"
    onCancel={backButton}
    open={show} 
    footer={null}
    bodyStyle={{
      padding : 0
    }}
  >
    <div className="px-4 pt-4">
      <span className="text-secondary">โปรดตรวจสอบคูปองที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ </span>
      <p className="text-secondary">เพราะอาจส่งผลต่อการจ้างงานและโปรโมชั่นในระบบ</p>
    </div>
    <Divider style={{
      marginBottom : '20px'
    }}/>
    <div className="d-flex justify-content-between px-4 pb-4">
      <Button style={{
        borderColor : color.Error,
        color : color.Error
      }} onClick={backButton}>ยกเลิก</Button>
      <Button style={{
        borderColor : color.Error,
        backgroundColor : color.Error,
        color : color.White
      }} onClick={callBack}>ยืนยัน</Button>
    </div>
  </Modal>
  )
}

export default ModalDeleteCoupon