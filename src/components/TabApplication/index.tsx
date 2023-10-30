import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
`
const ListStyled = styled.div<{}>`
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`
interface Props {
  value: string
  onChange: (e: any) => void
}
const appLists = [
  {
    label: 'Farmer App',
    value: 'FARMER',
  },
  {
    label: 'Droner App',
    value: 'DRONER',
  },
]
const dronerApp = {
  color: '#EA973E',
  backgroundColor: '#fdf6ecff',
}
const farmerApp = {
  color: '#219653',
  backgroundColor: '#e9f4eeff',
}
function TabApplication({ value, onChange }: Props) {
  return (
    <Container>
      {appLists.map((item, idx) => {
        const isFirst = idx === 0
        const isLast = idx === appLists.length - 1
        return (
          <ListStyled
            key={item.value}
            style={{
              color:
                value === 'DRONER' && value === item.value
                  ? dronerApp.color
                  : value === 'FARMER' && value === item.value
                  ? farmerApp.color
                  : '#000000',
              fontWeight: value === item.value ? 600 : 400,
              borderTopLeftRadius: isFirst ? 4 : 0,
              borderBottomLeftRadius: isFirst ? 4 : 0,
              borderTopRightRadius: isLast ? 4 : 0,
              borderBottomRightRadius: isLast ? 4 : 0,
              minWidth: 130,
              height: 40,
              backgroundColor:
                value === 'DRONER' && value === item.value
                  ? dronerApp.backgroundColor
                  : value === 'FARMER' && value === item.value
                  ? farmerApp.backgroundColor
                  : 'white',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor:
                value === 'DRONER' && value === item.value
                  ? dronerApp.color
                  : value === 'FARMER' && value === item.value
                  ? farmerApp.color
                  : 'white',
            }}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </ListStyled>
        )
      })}
    </Container>
  )
}

export default TabApplication
