import React from 'react'
import { Select, Spin } from 'antd'
// import debounce from 'lodash/debounce'
import { CloseCircleFilled } from '@ant-design/icons'

const { Option } = Select

interface DebounceSelectProps {
  placeholder?: string
  onSearch?: (value: string) => void
  handleSelect?: (value: string, options: any) => void
  focusBackgroundColor?: string
  options?: {
    value: string
    id: string
    label: string
    [key: string]: any
  }[]
  debounceTimeout?: number
  fetching?: boolean
  value?: string
  customOptionRender?: (option: any) => React.ReactNode
  setSearchValue?: (value: string) => void
}

const DebounceSelect: React.FC<DebounceSelectProps> = ({
  placeholder = 'ค้นหา',
  options = [],
  handleSelect,
  fetching,
  value,
  setSearchValue,
  customOptionRender,
  focusBackgroundColor = 'transparent',
}) => {
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null)
  const handleSearch = (value: string) => {
    // this is when typing
    setSearchValue?.(value)
  }

  return (
    <Select
      className='select-search'
      style={{ width: '100%', display: 'flex', alignItems: 'center' }}
      showSearch
      value={value}
      onClear={() => {
        setSearchValue?.('')
        handleSelect?.('', {
          value: '',
          id: '',
          label: '',
        })
      }}
      allowClear
      clearIcon={
        <CloseCircleFilled
          style={{
            fontSize: 14,
          }}
        />
      }
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      optionLabelProp='label'
      // onPopupScroll={(e) => {
      //   console.log('e', e)
      // }}
      notFoundContent={!fetching ? <Spin size='small' /> : null}
      onSelect={(v, option) => {
        handleSelect?.(v, option)
        setSearchValue?.('')
      }}
      onSearch={handleSearch}
    >
      {options.map((result) => (
        <Option
          key={result?.id}
          {...result}
          value={result.value}
          style={{
            width: '100%',
            backgroundColor:
              result?.value === value || hoveredOption === result?.value
                ? focusBackgroundColor
                : 'transparent',
          }}
          onMouseEnter={() => setHoveredOption(result?.value)}
          onMouseLeave={() => setHoveredOption(null)}
        >
          {customOptionRender ? (
            customOptionRender({ ...result, isFocus: result?.value === value })
          ) : (
            <div>{result?.label}</div>
          )}
        </Option>
      ))}
    </Select>
  )
}

export default DebounceSelect
