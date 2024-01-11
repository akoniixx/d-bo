import { DownOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, Image, MenuProps } from 'antd'
import React, { useState } from 'react'
import { color, icon } from '../../resource'

interface ListProps {
  onSearchType: (value: string, checked: boolean) => void
  list: any
  title: any
  menu?: string
}
export const ListCheck: React.FC<ListProps> = ({ onSearchType, list, title, menu }) => {
  const [visibleCreateBy, setVisibleCreateBy] = useState<boolean>(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const handleVisibleCreateBy = (newVisible: any) => {
    setVisibleCreateBy(newVisible)
  }

  const handleOptionSelect = (value: string) => {
    const updatedSelectedOptions = [...selectedOptions]
    const optionIndex = updatedSelectedOptions.indexOf(value)

    if (optionIndex === -1) {
      updatedSelectedOptions.push(value)
    } else {
      updatedSelectedOptions.splice(optionIndex, 1)
    }
    setSelectedOptions(updatedSelectedOptions)
    const checked = optionIndex === -1
    onSearchType(value, checked)
  }
  const listApp = [{ title: ' Back Office Website', icon: icon.bo, value: 'BO' }]
  if (menu === 'FARMER') {
    listApp.push({ title: ' Farmer Application', icon: icon.farmerApp, value: 'FARMER' })
  } else if (menu === 'DRONER') {
    listApp.push({ title: ' Droner Application', icon: icon.dronerApp, value: 'DRONER' })
  } else if (menu === 'TASK') {
    listApp.push(
      { title: ' Line Office Website', icon: icon.lineApp, value: 'LINE' },
      { title: ' Farmer Application', icon: icon.farmerApp, value: 'FARMER' },
      { title: ' Droner Application', icon: icon.dronerApp, value: 'DRONER' },
    )
  }

  const items: MenuProps['items'] = listApp.map((v, i) => {
    return {
      key: i,
      label: (
        <>
          <Checkbox
            onClick={() => handleOptionSelect(v.value)}
            value={v.value}
            checked={selectedOptions.includes(v.value)}
          >
            <div>
              <Image src={v.icon} preview={false} style={{ width: 20, height: 20 }} />
              <span>{v.title}</span>
            </div>
          </Checkbox>
        </>
      ),
    }
  })

  return (
    <>
      <div className='col-lg pt-1 p-1'>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          className='col-lg-12 p-1'
          onVisibleChange={handleVisibleCreateBy}
          visible={visibleCreateBy}
        >
          <Button
            style={{
              color: color.Disable,
              textAlign: 'start',
              backgroundColor: color.White,
              height: 32,
              cursor: 'pointer',
            }}
          >
            <div className='row'>
              <div className='col-lg-8' style={{ textAlign: 'start' }}>
                {selectedOptions.length > 0
                  ? selectedOptions.map((option) => (
                      <Image
                        key={option}
                        src={listApp.find((app) => app.value === option)?.icon}
                        preview={false}
                        style={{ width: 20, height: 20, marginLeft: 8 }}
                      />
                    ))
                  : title}
              </div>
              <div className='col-lg' style={{ textAlign: 'end' }}>
                <DownOutlined
                  style={{
                    verticalAlign: 0.5,
                  }}
                />
              </div>
            </div>
          </Button>
        </Dropdown>
      </div>
    </>
  )
}
