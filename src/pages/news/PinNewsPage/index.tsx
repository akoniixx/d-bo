import React from 'react'
import styled from 'styled-components'
import TabApplication from '../../../components/TabApplication'
import Content from './Content/Content'
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Container = styled.div`
  padding: 8px 32px;
`
const Title = styled.h4`
  font-weight: 600;
`

const mappingComponent = {
  DRONER: <Content application='DRONER' />,
  FARMER: <Content application='FARMER' />,
}

function PinNewsPage() {
  const [application, setApplication] = React.useState<'DRONER' | 'FARMER'>('FARMER')

  const onChangeTab = (value: any) => {
    setApplication(value as 'DRONER' | 'FARMER')
  }

  return (
    <Container>
      <Header>
        <Title>ปักหมุดข่าวสาร (Pin News)</Title>
        <TabApplication onChange={onChangeTab} value={application} />
      </Header>
      {mappingComponent[application]}
    </Container>
  )
}

export default PinNewsPage
