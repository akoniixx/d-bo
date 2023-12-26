import React from 'react'
import './App.css'
import WebRoutes from './WebRoutes'
import 'antd/dist/antd.min.css'
import { RecoilRoot } from 'recoil'
import 'moment/locale/th'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <WebRoutes />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
