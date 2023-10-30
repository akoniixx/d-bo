import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import ItemPinEditMode from './ItemPinEditMode'
import { FormInstance } from 'antd'
import { FormValues } from './Content'

const RowContainer = styled.div<{
  showButtonAdd?: boolean
  color: string
  backgroundColor: string
  disabled?: boolean
}>`
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  background-color: #f9fafdff;
  padding: 8px;
  border-radius: 4px;
  ${({ showButtonAdd, color, disabled }) => {
    if (showButtonAdd) {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed ${color};
        cursor: pointer;
        background-color: white;
      `
    }
    if (disabled) {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `
    }
    return ``
  }}
`
const Label = styled.span`
  font-size: 16px;
  font-weight: 400;
`
interface Props {
  onSelectNews: (news: any, options: any) => void
  onDelPinNews: (news: any) => void
  showButtonAdd?: boolean
  currentApp: {
    color: string
    backgroundColor: string
    app: 'DRONER' | 'FARMER'
  }
  disabled?: boolean
  newsData: any
  name: string | number
  form: FormInstance<FormValues>
  nameHead: string
}
const textButtonAdd = '+ เพิ่มปักหมุดข่าวสาร'
const titleNews = 'ข่าวสารที่ปักหมุด'
const emptyText = 'ไม่มีปักหมุดข่าวสาร'
function ItemPin({
  showButtonAdd,
  currentApp,
  disabled,
  onSelectNews,
  newsData,
  onDelPinNews,
  name,
  form,
  nameHead,
}: Props) {
  const [editMode, setEditMode] = useState(false)
  const onClickDel = async () => {
    setEditMode(false)
    onDelPinNews(newsData)
  }
  return editMode || !disabled ? (
    <ItemPinEditMode
      onSelectNews={onSelectNews}
      newsData={newsData}
      onDelPinNews={onClickDel}
      name={name}
      currentApp={currentApp}
      editMode={editMode || !disabled}
      form={form}
      nameHead={nameHead}
    />
  ) : (
    <RowContainer
      onClick={() => {
        if (showButtonAdd) {
          setEditMode(true)
        }
      }}
      showButtonAdd={showButtonAdd}
      disabled={disabled}
      color={currentApp.color}
      backgroundColor={currentApp.backgroundColor}
    >
      {showButtonAdd || !disabled ? (
        <>
          <Label
            style={{
              color: showButtonAdd ? currentApp.color : '#000000',
            }}
          >
            {showButtonAdd ? textButtonAdd : titleNews}
          </Label>
        </>
      ) : (
        <Label
          style={{
            color: '#C6C6C6',
          }}
        >
          {emptyText}
        </Label>
      )}
    </RowContainer>
  )
}

export default ItemPin
