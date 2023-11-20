import { Button, Dropdown, Menu, Spin, Tabs } from 'antd'
import React, { useState } from 'react'
import { BackIconButton } from '../../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import AddButtton from '../../../components/button/AddButton'
import { color } from '../../../resource'
import { DownOutlined } from '@ant-design/icons'

function IndexGuru() {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const tabConfigurations = [
    { title: 'ใช้งาน', key: 'ACTIVE' },
    { title: 'รอเผยแพร่', key: 'PENDING' },
    { title: 'แบบร่าง', key: 'DRAFTING' },
    { title: 'ปิดการใช้งาน', key: 'INACTIVE' },
  ]

  const tabsContent = (
    <div className='pt-3'>
      <Tabs onChange={() => console.log(1)} type='card'>
        {tabConfigurations.map((tab) => (
          <Tabs.TabPane tab={tab.title} key={tab.key}></Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  )
  const downloadFile = (
    <Menu
      items={[
        {
          label: <span onClick={() => console.log(1)}>เพิ่มบทความ</span>,
          key: 'article',
        },
        {
          label: <span onClick={() => console.log(2)}>เพิ่มวิดีโอ</span>,
          key: 'video',
        },
      ]}
    />
  )
  return (
    <>
      <Spin tip='กำลังโหลดข้อมูล...' size='large' spinning={loading}>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <span className='p-3'>
              <strong style={{ fontSize: '20px' }}>กูรูเกษตร </strong>
            </span>
          </div>

          <div className='align-self-center'>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key='article' onClick={() => console.log(1)}>
                    เพิ่มบทความ
                  </Menu.Item>
                  <Menu.Item key='video' onClick={() => console.log(2)}>
                    เพิ่มวิดีโอ
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                style={{
                  backgroundColor: color.primary1,
                  color: color.secondary2,
                  borderColor: color.Success,
                  borderRadius: '5px',
                }}
              >
                + เพิ่มบทความ/วิดีโอ <DownOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Dropdown>
          </div>
        </div>
        {tabsContent}
      </Spin>
    </>
  )
}

export default IndexGuru
