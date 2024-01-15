import { Badge, Modal } from 'antd'
import color from '../../resource/color'
import icon from '../../resource/icon'
import { numberWithCommas } from '../../utilities/TextFormatter'
import { STATUS_COLOR_CREDIT, STATUS_CREDIT_MAPPING } from '../../definitions/Status'

interface ModalViewCreditProps {
  open: boolean
  name: string
  tel: string
  point: number
  exchangeType: string
  credit: number
  status: string
  reason?: string
  onClose: () => void
  cashCondition: number
  pointCondition: number
}

const ModalViewCredit: React.FC<ModalViewCreditProps> = ({
  open,
  name,
  tel,
  point,
  exchangeType,
  credit,
  status,
  reason,
  onClose,
  cashCondition,
  pointCondition,
}) => {
  return (
    <Modal
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
      footer={null}
    >
      <div
        className='px-4 py-4 d-flex justify-content-between align-items-center'
        style={{
          backgroundColor: color.primary3,
        }}
      >
        <div>
          <p className='py-1 m-0'>ชื่อนักบินโดรน</p>
          <p className='py-2 m-0 fw-light'>{name}</p>
        </div>
        <div>
          <p className='py-1 m-0'>เบอร์โทร</p>
          <p className='py-2 m-0 fw-light'>{tel}</p>
        </div>
        <div>
          <p className='py-1 m-0'>แต้มคงเหลือ</p>
          <div className='py-2 m-0 d-flex justify-content-between align-items-center'>
            <img
              src={icon.coin}
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            <p className='p-0 m-0 fw-light'>{numberWithCommas(point)}</p>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <span
          style={{
            fontWeight: 500,
          }}
        >
          ประเภทการแลก
        </span>
      </div>
      <p>{exchangeType === 'CASH' ? 'เงิน' : 'แต้ม'}</p>
      <div className='mt-3'>
        <span
          style={{
            fontWeight: 500,
          }}
        >
          จำนวนเครดิต
        </span>
        <span style={{ color: color.Grey }}>
          {' '}
          (1 เครดิต ={' '}
          {exchangeType === 'CASH'
            ? `${numberWithCommas(cashCondition)} บาท`
            : `${numberWithCommas(pointCondition)} แต้ม`}
          )
        </span>
      </div>
      <p>{credit} เครดิต</p>
      <div className='mt-3'>
        <span
          style={{
            fontWeight: 500,
          }}
        >
          สถานะ
        </span>
      </div>
      <span style={{ color: STATUS_COLOR_CREDIT[status] }}>
        <Badge color={STATUS_COLOR_CREDIT[status]} /> {STATUS_CREDIT_MAPPING[status]}
      </span>
      {!!reason && (
        <>
          <div className='mt-3'>
            <span
              style={{
                fontWeight: 500,
              }}
            >
              เหตุผล
            </span>
          </div>
          <p className='mt-2' style={{ color: color.Grey }}>
            {reason}
          </p>
        </>
      )}
    </Modal>
  )
}

export default ModalViewCredit
