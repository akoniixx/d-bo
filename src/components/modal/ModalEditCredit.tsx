import { DatePicker, Input, Modal, Radio, Row, Select, Space, TimePicker } from 'antd'
import { BackButton } from '../button/BackButton'
import SaveButtton from '../button/SaveButton'
import { useEffect, useState } from 'react'
import color from '../../resource/color'
import icon from '../../resource/icon'
import { numberWithCommas } from '../../utilities/TextFormatter'
import { useQuery } from 'react-query'
import { CreditDronerDatasource } from '../../datasource/CreditDatasource'
import upload_droner_infinity from '../../resource/media/empties/upload_Img_btn.png'
import { DeleteOutlined } from '@ant-design/icons'
import { Option } from 'antd/lib/mentions'
import { BookBankDatasource } from '../../datasource/BookBankDatasource'
import moment from 'moment'

interface ModalEditCreditProps {
  open: boolean
  id: string
  dronerId: string
  name: string
  tel: string
  point: number
  cashCondition: number
  pointCondition: number
  onClose: () => void
  onSubmit: () => void
}

const ModalEditCredit: React.FC<ModalEditCreditProps> = ({
  open,
  id,
  name,
  dronerId,
  tel,
  point,
  onClose,
  onSubmit,
  cashCondition,
  pointCondition,
}) => {
  const onSave = async () => {
    CreditDronerDatasource.editCredit(
      id,
      'CASH',
      dronerId,
      queryData.data.credit,
      '0',
      (queryData.data.credit * cashCondition).toString(),
      upload,
      cashCheck.name,
      cashCheck.bank,
      new Date(
        moment(cashCheck.date).format('YYYY-MM-DD') +
          ' ' +
          moment(cashCheck.time).format('HH:mm:ss'),
      ).toISOString(),
      status,
    )
      .then((res) => {
        onSubmit()
      })
      .catch((err) => console.log(err))
  }
  const fetchData = async () => {
    const credit = await CreditDronerDatasource.getCreditById(id)
    setCashcheck({
      name: credit.transfererName,
      bank: credit.banking,
      date: moment(new Date(credit.datetransfer).toUTCString()),
      time: moment(new Date(credit.datetransfer).getTime()),
    })
    console.log(credit.slip)
    setImg(credit.slip + '.png')
    setStatus(credit.status)
    return credit
  }
  const fetchBank = async () => {
    const bankData = await BookBankDatasource.getBankData()
    return bankData
  }
  const queryData = useQuery([id], () => fetchData(), { keepPreviousData: true })
  const [disabled, setDisabled] = useState<boolean>(true)
  const [upload, setUpload] = useState<any>()
  const [img, setImg] = useState<string>('')
  const [status, setStatus] = useState<string>('APPROVE')
  const onChangeImage = async (file: any) => {
    const source = file.target.files[0]
    setUpload(source)
    setImg(source.name)
  }
  const [cashCheck, setCashcheck] = useState<any>({
    name: '',
    bank: '',
    date: undefined,
    time: undefined,
  })
  const dateFormat = 'DD/MM/YYYY'
  const bankQuery = useQuery(['bankData'], () => fetchBank(), { keepPreviousData: true })
  useEffect(() => {
    if (!!cashCheck.name && !!cashCheck.bank && !!cashCheck.date && !!cashCheck.time && !!img) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [cashCheck.name, cashCheck.bank, cashCheck.date, cashCheck.time, img, status])
  return (
    <Modal
      title={
        <div
          style={{
            width: '100%',
            cursor: 'move',
          }}
        >
          แก้ไขรายการแลกเครดิต
        </div>
      }
      visible={open}
      onCancel={onClose}
      width={600}
      footer={[
        <Row className='d-flex justify-content-between'>
          <BackButton onClick={onClose} disableBtn={false} />
          <SaveButtton onClick={onSave} disableBtn={disabled} />
        </Row>,
      ]}
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
        <span>ประเภทการแลก</span>
        <span style={{ color: color.Error }}> *</span>
      </div>
      <p>เงิน</p>
      <div className='mt-3'>
        <span>จำนวนเครดิต</span>
        <span style={{ color: color.Grey }}>
          {' '}
          {`(1 เครดิต = ${numberWithCommas(cashCondition)} บาท)`}
        </span>
        <span style={{ color: color.Error }}> *</span>
      </div>
      <div className='d-flex justify-content-between align-items-center mt-3'>
        <Input
          disabled
          value={queryData.isLoading ? 0 : queryData.data.credit ?? 0}
          type='number'
          suffix='เครดิต'
        />
        <img
          src={icon.nearequal}
          style={{
            width: '20px',
            height: '20px',
            margin: '0px 10px',
          }}
        />
        <Input
          value={queryData.isLoading ? 0 : numberWithCommas(queryData.data.credit * cashCondition)}
          disabled
          suffix='บาท'
        />
      </div>
      <div className='mt-3'>
        <div className='mt-3'>
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
        {img && (
          <div
            style={{
              display: img ? 'flex' : 'none',
              alignItems: 'center',
            }}
            className='mt-3'
          >
            <p className='m-0 p-0'>{img}</p>
            <DeleteOutlined
              onClick={() => {
                setUpload(null)
                setImg('')
              }}
              style={{
                color: color.Error,
                marginLeft: '10px',
              }}
            />
          </div>
        )}
      </div>
      <div className='mt-3'>
        <span>ชื่อผู้โอน</span>
        <span style={{ color: color.Error }}> *</span>
      </div>
      <Input
        placeholder='กรอกชื่อผู้โอน'
        style={{
          width: '100%',
        }}
        value={cashCheck.name}
        onChange={(e) =>
          setCashcheck({
            ...cashCheck,
            name: e.target.value,
          })
        }
      />
      <div className='mt-3'>
        <span>ธนาคาร</span>
        <span style={{ color: color.Error }}> *</span>
      </div>
      <Select
        placeholder='เลือกธนาคาร'
        allowClear
        value={cashCheck.bank === '' ? null : cashCheck.bank}
        onChange={(e) =>
          setCashcheck({
            ...cashCheck,
            bank: e,
          })
        }
        style={{
          marginTop: '10px',
          width: '100%',
          borderRadius: '10px',
        }}
      >
        {bankQuery.isLoading ? (
          <></>
        ) : bankQuery.isError ? (
          <></>
        ) : (
          bankQuery.data.map((item: any) => (
            <Option value={item.bankName} key={item.bankName}>
              <img
                src={item.logoPath}
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '10px',
                }}
              />
              {item.bankName}
            </Option>
          ))
        )}
      </Select>
      <div className='mt-3 row'>
        <div className='col-5'>
          <div>
            <span>วันที่โอน</span>
            <span style={{ color: color.Error }}> *</span>
          </div>
          <DatePicker
            placeholder='เลือกวันที่'
            format={dateFormat}
            style={{
              width: '100%',
            }}
            value={cashCheck.date}
            onChange={(e) =>
              setCashcheck({
                ...cashCheck,
                date: e,
              })
            }
          />
        </div>
        <div className='col-5'>
          <div>
            <span>เวลาที่โอน</span>
            <span style={{ color: color.Error }}> *</span>
          </div>
          <TimePicker
            value={cashCheck.time}
            onChange={(e) =>
              setCashcheck({
                ...cashCheck,
                time: e,
              })
            }
            format={'HH:mm'}
            placeholder='เลือกเวลา'
            style={{
              width: '100%',
            }}
            allowClear={false}
          />
        </div>
      </div>
      <div className='mt-3'>
        <div className='mt-3'>
          <span>ชื่อผู้โอน</span>
          <span style={{ color: color.Error }}> *</span>
        </div>
        <Radio.Group
          value={status}
          className='mt-3'
          onChange={(e) => {
            setStatus(e.target.value)
          }}
        >
          <Space direction='vertical'>
            <Radio value={'PENDING'}>รอตรวจสอบ</Radio>
            <Radio value={'APPROVE'}>อนุมัติ</Radio>
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  )
}

export default ModalEditCredit
