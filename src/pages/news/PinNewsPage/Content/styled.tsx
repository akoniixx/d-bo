import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
  min-height: 440px;
  border-radius: 4px;
`
const Header = styled.div<{
  backgroundColor: string
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 60px;
  border-radius: 4px 4px 0px 0px;
`
const Title = styled.h4`
  margin-top: 4px;
  color: white;
  font-size: 18px;
`
const ListPinContainer = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
`
const NumberPin = styled.div<{
  backgroundColor: string
  color: string
}>`
  font-size: 20px;
  font-weight: 600;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 8px;
  color: ${({ color }) => color};
`
export { Container, Header, Title, ListPinContainer, NumberPin }
