import { Button, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useLocation, useNavigate } from 'react-router-dom'
import { BackIconButton } from '../../../../components/button/BackButton'
import { CardContainer } from '../../../../components/card/CardContainer'
import { CardHeader } from '../../../../components/header/CardHearder'
import { TargetSpray } from '../../../../datasource/TargetSprayDatarource'
import color from '../../../../resource/color'
import { ListPinContainer, NumberPin } from '../../../news/PinNewsPage/Content/styled'
import { MenuOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { getItemStyle } from '../../../news/PinNewsPage/Content/PinAll'
import Swal from 'sweetalert2'
const RowContainer = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  background-color: #f9fafdff;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LeftSide = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 16px;
`
function TargetSprayOrder() {
  const navigate = useNavigate()
  const [items, setItems] = useState<any>([])
  const location = useLocation()
  const { state } = location
  const countData = (state as { data?: any })?.data

  useEffect(() => {
    getTargetSpray()
  }, [])
  const getTargetSpray = async () => {
    try {
      const response = await TargetSpray.getAllTargetSpray(1, countData, '', 'order', 'ASC')
      if (response && response.data) {
        setItems(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const reorderedItems = Array.from(items)
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1)
    reorderedItems.splice(result.destination.index, 0, reorderedItem)
    setItems(reorderedItems)
  }
  const updateOrderTarget = async (reorderedItems: any[]) => {
    const formattedData = {
      orderTargetSpray: reorderedItems.map((item, index) => ({
        id: item.id,
        name: item.name,
        order: index + 1,
      })),
    }
    try {
      const response = await TargetSpray.updateOrderTarget(formattedData)
      if (response) {
        Swal.fire({
          title: 'บันทึกสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        })
        getTargetSpray()
      }
    } catch (error) {
      console.error('Error calling API:', error)
    }
  }
  return (
    <div className='p-2'>
      <Row className='pb-3'>
        <BackIconButton
          onClick={() => {
            navigate(-1)
          }}
        />
        <span className='pt-3'>
          <strong style={{ fontSize: '20px' }}>ลำดับเป้าหมายการฉีดพ่น</strong>
        </span>
      </Row>
      <CardContainer>
        <CardHeader textHeader='การแสดงผลในแอปพลิเคชัน' />
        <ListPinContainer>
          <div>
            {Array.from({
              length: countData,
            }).map((_, idx) => {
              return (
                <NumberPin color={color.Success} backgroundColor={color.primary3} key={idx}>
                  {idx + 1}
                </NumberPin>
              )
            })}
          </div>
          <div
            style={{
              width: '100%',
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    {items.map((item: any, index: number) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <RowContainer>
                              <LeftSide>
                                <MenuOutlined
                                  style={{
                                    fontSize: 20,
                                    color: '#6B7995',
                                    marginRight: 16,
                                  }}
                                />
                                {item.name}
                              </LeftSide>
                            </RowContainer>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </ListPinContainer>
      </CardContainer>
      <div className='pt-3 pb-4'>
        <Button
          style={{
            borderRadius: 8,
            width: '100%',
            backgroundColor: color.Success,
            height: 40,
            fontSize: 16,
            borderWidth: 1,
            borderColor: color.Success,
            color: color.White,
          }}
          onClick={async () => {
            await updateOrderTarget(items)
          }}
        >
          บันทึก
        </Button>
      </div>
    </div>
  )
}

export default TargetSprayOrder
