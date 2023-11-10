import React from 'react'

import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import NavSidebar from './NavSideBar'

export const DashboardLayout = ({ children }: any) => {
  return (
    <div>
      <NavSidebar />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <div>
          <Layout
            style={{
              height: 'calc(100vh - 64px)',
              marginLeft: 200,
              marginTop: 60,
              padding: 25,
              overflow: 'auto',
            }}
          >
            <Content style={{ height: '100%' }}>{children}</Content>
          </Layout>
        </div>
      </div>
    </div>
  )
}
