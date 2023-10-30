import { MenuOutlined, MinusCircleOutlined, PushpinFilled } from '@ant-design/icons'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import DebounceSelect from '../../../../components/debounceSelect/DebounceSelect'
import { FormValues, ListDndType } from './Content'
import { Form, FormInstance } from 'antd'
import moment from 'moment'
import { convertBuddhistYear } from '../../../../utilities/ConvertToBuddhistYear'
import { useDebounce } from '../../../../hook/useDeboune'
import { NewsDatasource } from '../../../../datasource/NewsDatasource'
import color from '../../../../resource/color'

const RowContainer = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  background-color: #f9fafdff;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LeftSide = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 16px;
`
const RightSide = styled.div``
const mappingObjType = {
  ALL: 'ข่าวสาร , ชาเลนจ์',
  NEWS: 'ข่าวสาร',
  CHALLENGE: 'แคมเปญ',
}
interface Props {
  onSelectNews: (news: any, options: any) => void
  onDelPinNews: (news: any) => void
  newsData: ListDndType
  name: string | number
  editMode: boolean
  currentApp: {
    color: string
    backgroundColor: string
    app: 'DRONER' | 'FARMER'
  }
  form: FormInstance<FormValues>
}
function ItemPinEditMode({
  onSelectNews,
  onDelPinNews,
  newsData,
  name,
  editMode,
  currentApp,
  form,
}: Props) {
  const [searchValue, setSearchValue] = React.useState('')
  const debounceSearch = useDebounce(searchValue, 500)

  const [optionFetch, setOptionFetch] = React.useState<
    {
      label: string
      value: string
      id: string
    }[]
  >([])
  useEffect(() => {
    if (newsData && newsData.currentOptions && newsData.currentOptions.length > 0) {
      setOptionFetch(newsData.currentOptions)
    }
  }, [newsData])

  useEffect(() => {
    const getNewsBySearch = async (searchKeyword: string) => {
      try {
        const res = await NewsDatasource.searchNews({
          application: currentApp.app,
          search: searchKeyword,
          status: 'ACTIVE',
        })
        const formatData = res.data.map((item: any) => {
          return {
            label: item.title,
            value: item.id,
            id: item.id,
            startDate: item.create_at,
            categoryNews: item.category_news,
          }
        })

        setOptionFetch(formatData)
      } catch (error) {
        console.log('error', error)
      }
    }

    getNewsBySearch(debounceSearch)
  }, [debounceSearch])
  return (
    <RowContainer>
      <LeftSide>
        <MenuOutlined
          style={{
            fontSize: 20,
            color: '#6B7995',
            marginRight: 16,
          }}
        />
        <PushpinFilled
          style={{
            fontSize: 18,
            color: '#F2C94C',
            marginRight: 8,
          }}
        />
        <Form.Item
          style={{
            width: '100%',
            height: '100%',
            marginBottom: 0,
          }}
          name={[name, 'newsId']}
          rules={
            editMode
              ? [
                  {
                    required: true,
                    message: 'กรุณาเลือกข่าวสารที่ปักหมุด',
                  },
                ]
              : []
          }
        >
          <DebounceSelect
            focusBackgroundColor={currentApp.backgroundColor}
            setSearchValue={setSearchValue}
            customOptionRender={(option) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      color: option.isFocus ? currentApp.color : color.font,
                    }}
                  >
                    {option.label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    <div
                      style={{
                        color: color.Grey,
                        marginRight: 4,
                      }}
                    >
                      {'วันที่เผยแพร่: '}
                    </div>
                    <div
                      style={{
                        color: color.font,
                      }}
                    >
                      {` ${convertBuddhistYear.toBuddhistYear(
                        moment(option.startDate),
                        'DD/MM/YYYY , HH:mm',
                      )}`}
                    </div>
                    <div
                      style={{
                        color: color.font,
                        margin: '0px 4px',
                      }}
                    >{`|`}</div>
                    <div
                      style={{
                        color: color.Grey,
                        marginRight: 4,
                      }}
                    >
                      {`หมวดหมู่: `}
                    </div>
                    <div
                      style={{
                        color: color.font,
                      }}
                    >
                      {mappingObjType[option.categoryNews as keyof typeof mappingObjType]}
                    </div>
                  </div>
                  {/* <div
                    style={{
                      display: 'flex',
                      color: color.secondary3,
                      fontSize: 14,
                    }}
                  >
                    {convertBuddhistYear.toBuddhistYear(moment(), 'DD/MM/YYYY , HH:mm')}
                  </div> */}
                </div>
              )
            }}
            // value={newsData?.value}
            handleSelect={(v, opt) => {
              onSelectNews(v, {
                ...opt,
                currentItem: newsData,
                currentOptions: optionFetch,
              })
            }}
            options={optionFetch}
          />
        </Form.Item>
      </LeftSide>

      <RightSide>
        <MinusCircleOutlined
          onClick={() => {
            onDelPinNews(newsData)
            form.setFields([
              {
                name: [name, 'newsId'],
                errors: [],
                touched: false,
              },
            ])
          }}
          style={{
            fontSize: 18,
            color: '#EB5757',
          }}
        />
      </RightSide>
    </RowContainer>
  )
}

export default ItemPinEditMode
