import { Select, SelectProps, Space } from 'antd'
import { Option } from 'antd/lib/mentions'
import React from 'react'

interface SelectMultiProps {
  onSearchType: (e: any) => void
  list: any
  title: any
  name?: any
}
interface ItemProps {
  label: string
  value: string
}

export const SelectMulti: React.FC<SelectMultiProps> = ({ onSearchType, list, title, name }) => {
  const options: ItemProps[] = []
  if (name === 'group') {
    list?.map((item: any) => {
      options.push({
        label: item.productGroupName,
        value: item.productGroupId,
      })
    })
  } else {
    list?.data?.map((item: any) => {
      options.push({
        label: item.productBrandName,
        value: item.productBrandId,
      })
    })
  }

  const sharedProps: SelectProps = {
    style: { width: '100%' },
    options,
    placeholder: title,
    maxTagCount: 'responsive',
  }

  return (
    <Space className='p-1' direction='vertical' style={{ width: '100%' }}>
      <Select allowClear {...sharedProps} onChange={onSearchType}>
        {options.map((item) => (
          <Option key={item.value}>{item.value}</Option>
        ))}
      </Select>
    </Space>
  )
}
