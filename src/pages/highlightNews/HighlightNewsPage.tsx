import { Button, Select } from 'antd'
import Search from 'antd/lib/input/Search'
import { Option } from 'antd/lib/mentions'
import React from 'react'
import { color } from '../../resource'
import { useNavigate } from 'react-router-dom'

function HighlightNewsPage() {
    const navigate = useNavigate()
    const PageTitle = (
        <>
          <div className='container d-flex justify-content-between' style={{ padding: '10px' }}>
            <div>
              <span
                className='card-label font-weight-bolder text-dark'
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  padding: '8px',
                }}
              >
                <strong>ข่าวสารไฮไลท์</strong>
              </span>
            </div>
            <div className='d-flex'>
              <div className='col'>
                <Search
                  placeholder='ค้นหาชื่อข่าวสาร'
                  className='col-lg-12 p-1'
                //   value={search}
                //   onChange={(e: any) => onChangeSearch(e)}
                />
              </div>
              <div className='col'>
                <Select
                  className='col-lg-12 p-1'
                  placeholder='เลือกแอปพลิเคชั่น'
                //   onChange={onChangeApplication}
                  showSearch
                //   value={application}
                  allowClear
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                >
                  <Option value={'FARMER'}>Farmer App</Option>
                  <Option value={'DRONER'}>Droner App</Option>
                  <Option value={'ALL'}>All</Option>
                </Select>
              </div>
              <div className='pt-1 me-1'>
                <Button
                  style={{
                    borderColor: color.Success,
                    borderRadius: '5px',
                    color: color.secondary2,
                    backgroundColor: color.Success,
                  }}
                  onClick={() => {
                   console.log(1)
                  }}
                >
                  ค้นหาข้อมูล
                </Button>
              </div>
              <div className='pt-1 col'>
                <Button
                  onClick={() => navigate('/AddNews')}
                  style={{
                    borderColor: color.Success,
                    borderRadius: '5px',
                    color: color.secondary2,
                    backgroundColor: color.Success,
                    paddingLeft: '50px',
                    paddingRight: '50px',
                  }}
                >
                  + ข่าวสารไฮไลท์
                </Button>
              </div>
            </div>
          </div>
        </>
      )
  return (
    <div>
        {PageTitle}
      
    </div>
  )
}

export default HighlightNewsPage
