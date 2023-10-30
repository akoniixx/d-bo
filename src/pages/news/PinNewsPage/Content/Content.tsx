import React, { useEffect, useMemo } from 'react'
import PinMain from './PinMain'
import { Button, Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { NewsDatasource } from '../../../../datasource/NewsDatasource'
import PinAll from './PinAll'
import Swal from 'sweetalert2'

interface Props {
  application: 'DRONER' | 'FARMER'
}
export interface FormValues {
  pinMain: ListDndType[]
  pinAll: ListDndType[]
  deletePinAll: ListDndType[]
  deletePinMain: ListDndType[]
}
export interface ListDndType {
  key: string
  disabled: boolean
  order: number
  showButtonAdd?: boolean
  value?: string
  label?: string
  newsId?: string
  endDate?: string
  currentOptions?: {
    label: string
    value: string
    id: string
  }[]
}

interface NewsType {
  application: string
  campaignId: string
  categoryNews: string
  createAt: string
  createBy: string
  details: string
  endDate: string | null
  id: string
  imagePath: string
  orderPinAll: string | null
  orderPinMain: string | null
  pathHtml: string | null
  pinAll: boolean
  pinMain: boolean
  read: number
  startDate: string | null
  status: string
  title: string
  typeLaunch: string | null
  updateAt: string
  updateBy: string | null
}

interface NewsResponse {
  pinMain: NewsType[]
  pinAll: NewsType[]
}

const initialListDnd = [
  {
    key: '1',
    disabled: true,
  },
  {
    key: '2',
    disabled: true,
  },
  {
    key: '3',
    disabled: true,
  },
  {
    key: '4',
    disabled: true,
  },
  {
    key: '5',
    disabled: true,
  },
]

function Content({ application }: Props) {
  // const [listDnd, setListDnd] = React.useState<ListDndType[]>(initialListDnd)
  const [form] = useForm<FormValues>()
  const currentApp = useMemo(() => {
    const dronerApp = {
      color: '#EA973E',
      backgroundColor: '#fdf6ecff',
      app: 'DRONER',
    }
    const farmerApp = {
      color: '#219653',
      backgroundColor: '#e9f4eeff',
      app: 'FARMER',
    }
    return (application === 'DRONER' ? dronerApp : farmerApp) as {
      color: string
      backgroundColor: string
      app: 'DRONER' | 'FARMER'
    }
  }, [application])

  useEffect(() => {
    const getInitialListDnd = async () => {
      try {
        const result: NewsResponse = await NewsDatasource.getPinNews(currentApp.app)
        const formatDataPinMain = initialListDnd.map((item, index) => {
          const currentArray = result.pinMain[index]
          if (!currentArray) {
            return {
              ...item,
              disabled: true,
              order: index + 1,
            }
          } else {
            return {
              ...item,
              disabled: false,
              newsId: currentArray.id,
              label: currentArray.title,
              value: currentArray.id,
              endDate: currentArray.endDate,
              order: index + 1,
              currentOptions: [
                {
                  label: currentArray.title,
                  value: currentArray.id,
                  id: currentArray.id,
                  startDate: currentArray.createAt,
                  categoryNews: currentArray.categoryNews,
                },
              ],
            }
          }
        })
        const formatDataPinAll = initialListDnd.map((item, index) => {
          const currentArray = result.pinAll[index]
          if (!currentArray) {
            return {
              ...item,
              disabled: true,
              order: index + 1,
            }
          } else {
            return {
              ...item,
              disabled: false,
              newsId: currentArray.id,
              label: currentArray.title,
              value: currentArray.id,
              endDate: currentArray.endDate,
              order: index + 1,
              currentOptions: [
                {
                  label: currentArray.title,
                  value: currentArray.id,
                  id: currentArray.id,
                  startDate: currentArray.createAt,
                },
              ],
            }
          }
        })
        form.setFieldsValue({
          pinMain: formatDataPinMain as any,
          pinAll: formatDataPinAll as any,
        })
      } catch (error) {
        console.log('error', error)
      }
    }
    getInitialListDnd()
  }, [form, currentApp])

  const onFinish = async (values: FormValues) => {
    try {
      const pinAll = values.pinAll
        .filter((el) => el.newsId)
        .map((el) => {
          return {
            newsId: el.newsId,
            order: el.order,
          }
        })
      const pinMain = values.pinMain
        .filter((el) => el.newsId)
        .map((el) => {
          return {
            newsId: el.newsId,
            order: el.order,
          }
        })
      const deletePinAll = (values.deletePinAll || []).map((el) => {
        return el.newsId
      })
      const deletePinMain = (values.deletePinMain || []).map((el) => {
        return el.newsId
      })
      const payload = {
        pinAll,
        pinMain,
        deletePinAll,
        deletePinMain,
      } as any
      const result = await NewsDatasource.postPinNews(payload)
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <div
      style={{
        marginTop: 16,
      }}
    >
      <Form
        onFieldsChange={(changedFields, allFields) => {
          console.log('changedFields', changedFields)
          console.log('allFields', allFields)
        }}
        onFinish={onFinish}
        form={form}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
        initialValues={{
          pinMain: initialListDnd,
          pinAll: initialListDnd,
          deletePinAll: [],
          deletePinMain: [],
        }}
      >
        <PinMain form={form} currentApp={currentApp} />
        <PinAll form={form} currentApp={currentApp} />
        <Form.Item name='deletePinAll' hidden>
          <input type='hidden' />
        </Form.Item>
        <Form.Item name='deletePinMain' hidden>
          <input type='hidden' />
        </Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{
            borderRadius: 8,
            backgroundColor: currentApp.color,
            height: 40,
            fontSize: 16,
          }}
        >
          บันทึก
        </Button>
      </Form>
    </div>
  )
}

export default Content
