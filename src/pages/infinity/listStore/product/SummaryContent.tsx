import SummaryPoint from '../../../../components/card/SummaryPoint'
import { color } from '../../../../resource'

interface SummaryProps {
  data?: string
}
const SummaryContent: React.FC<SummaryProps> = ({ data }) => {
  return (
    <div className='pt-3 pb-3'>
      <div className='d-flex'>
        <div className='col-lg'>
          <SummaryPoint
            title={'สินค้าของร้านค้า'}
            bgColor={color.blue}
            point={1}
            label={'จำนวน'}
            unit=''
          />
        </div>
        <div className='col-lg'>
          <SummaryPoint
            title={'สินค้าของ ICK'}
            bgColor={color.secondary1}
            point={1}
            label={'จำนวน'}
            unit=''
          />
        </div>
        <div className='col-lg'>
          <SummaryPoint
            title={'ยอดขายนักบินโดรน'}
            bgColor={color.secondary2}
            point={70000.0}
            label={'จำนวน'}
            unit='บาท'
            titleLeft='ดูรายการ'
            colorPointText={color.font}
          />
        </div>
        <div className='col-lg'>
          <SummaryPoint
            title={'เงินค้างจ่ายร้านค้า'}
            bgColor={color.Error}
            point={70000.0}
            label={'จำนวน'}
            unit='บาท'
            titleLeft='ดูรายการ'
          />
        </div>
      </div>
    </div>
  )
}

export default SummaryContent
