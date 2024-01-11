import { Modal, Row } from 'antd'
import { BackButton } from '../button/BackButton'
import SaveButtton from '../button/SaveButton'
import color from '../../resource/color'
import TextArea from 'antd/lib/input/TextArea'
import { useEffect, useState } from 'react'
import { CreditDronerDatasource } from '../../datasource/CreditDatasource'

interface ModalDeleteCreditProps {
  open: boolean
  id: string
  dronerId: string
  onClose: () => void
  onSubmit: () => void
}

const ModalDeleteCredit: React.FC<ModalDeleteCreditProps> = ({
  open,
  id,
  dronerId,
  onClose,
  onSubmit,
}) => {
  const onSave = () => {
    CreditDronerDatasource.deleteCredit(id, dronerId, reason.reason)
      .then((res) => {
        onSubmit()
      })
      .catch((err) => console.log(err))
  }
  const [reason, setReason] = useState({
    reason: '',
    disabled: true,
  })
  useEffect(() => {
    if (reason.reason) {
      setReason({
        ...reason,
        disabled: false,
      })
    } else {
      setReason({
        ...reason,
        disabled: true,
      })
    }
  }, [reason.reason])
  return (
    <Modal
      title={
        <div
          style={{
            width: '100%',
            cursor: 'move',
          }}
        >
          ยืนยันการยกเลิก
        </div>
      }
      visible={open}
      onCancel={onClose}
      width={600}
      footer={[
        <Row className='d-flex justify-content-between'>
          <BackButton borderColor={color.Error} onClick={onClose} disableBtn={false} />
          <SaveButtton
            title='ยืนยัน'
            colorBg={color.Error}
            onClick={onSave}
            disableBtn={reason.disabled}
          />
        </Row>,
      ]}
    >
      <p
        style={{
          color: color.Grey,
        }}
      >
        โปรดตรวจสอบรายการที่คุณต้องการยกเลิก ก่อนที่จะกดยืนยัน
        เพราะอาจต่อการแสดงผลการแลกและคืนเครดิตในแอปพลิเคชัน
      </p>
      <div className='mt-3 mb-3'>
        <span>เหตุผล</span>
      </div>
      <TextArea
        value={reason.reason}
        rows={3}
        placeholder='กรอกเหตุผลการยกเลิก'
        onChange={(e) =>
          setReason({
            ...reason,
            reason: e.target.value,
          })
        }
      />
    </Modal>
  )
}

export default ModalDeleteCredit
