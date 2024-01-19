import React from 'react'
import { Container, Header, ListPinContainer, NumberPin, Title } from './styled'
import ItemPin from './ItemPin'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FormValues, ListDndType } from './Content'
import { Form, FormInstance } from 'antd'
import { useWatch } from 'antd/lib/form/Form'

interface Props {
  currentApp: {
    color: string
    backgroundColor: string
    app: 'DRONER' | 'FARMER'
  }
  // setListDnd: React.Dispatch<React.SetStateAction<ListDndType[]>>
  // listDnd: ListDndType[]
  form: FormInstance<FormValues>
}

// const getItems = (count: number) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

const reOrder = (list: any, startIndex: any, endIndex: any) => {
  const result = list
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result.map((item: any, idx: number) => {
    return {
      ...item,
      order: idx + 1,
    }
  })
}

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  boxShadow: isDragging ? '0px 2px 4px rgba(0, 0, 0, 0.15)' : 'none',
  borderRadius: 4,

  // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
})

const numberPin = 5
const grid = 8

function PinAll({ currentApp, form }: Props) {
  const listDnd: ListDndType[] = form.getFieldValue('pinAll')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = useWatch('pinAll', form) // for re-render

  const [reMemo, setReMemo] = React.useState(false)
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reOrder(listDnd, result.source.index, result.destination.index)

    form.setFieldsValue({
      pinAll: items,
    })
    setReMemo(!reMemo)
  }
  // const getListStyle = (isDraggingOver: boolean) => ({
  // background: isDraggingOver ? currentApp.backgroundColor : "white",
  // })

  const newDndList = React.useMemo(() => {
    const findFirstIndexDisabled = listDnd.findIndex((item) => item.disabled)
    if (findFirstIndexDisabled === -1) return listDnd
    const newList = [...listDnd]
    newList[findFirstIndexDisabled] = {
      ...newList[findFirstIndexDisabled],
      showButtonAdd: true,
    }
    return newList
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDnd, reMemo])

  const onSelectNews = async (
    v: any,
    options: {
      currentItem: any
      currentOptions: {
        label: string
        value: string
        id: string
      }[]
      label: string
      value: string
      id: string
    },
  ) => {
    const newList = [...listDnd]
    const deletePinAll = form.getFieldValue('deletePinAll') || []
    const filterDeletePinAll = deletePinAll.filter((el: { newsId: string }) => {
      return el.newsId !== options.currentItem.newsId
    })
    const findIndex = newList.findIndex((item) => item.key === options.currentItem.key)
    if (findIndex === -1) return
    newList[findIndex] = {
      ...newList[findIndex],
      disabled: false,
      showButtonAdd: false,
      label: options.label,
      value: options.value,
      newsId: options.value,
      currentOptions: options.currentOptions,
    }

    form.setFieldsValue({
      pinAll: newList,
      deletePinAll: filterDeletePinAll,
    })

    setReMemo(!reMemo)
  }
  const onDelPinNews = async (v: any) => {
    const newList = [...listDnd]
    const findIndex = newList.findIndex((item) => item.key === v.key)
    const deletePinAll = form.getFieldValue('deletePinAll') || []
    const alreadyDeleted = deletePinAll.find((item: { newsId: string }) => item.newsId === v.newsId)
    if (findIndex === -1) return
    newList[findIndex] = {
      ...newList[findIndex],
      disabled: true,
      showButtonAdd: false,
      label: '',
      value: '',
      newsId: '',
      currentOptions: [],
    }
    const reOrderList = reOrder(newList, findIndex, newList.length - 1)
    form.setFieldsValue({
      pinAll: reOrderList,
      deletePinAll: alreadyDeleted
        ? deletePinAll
        : [...deletePinAll, v].filter((el) => {
            return el.newsId
          }),
    })

    setReMemo(!reMemo)
  }

  return (
    <Container>
      <Header backgroundColor={currentApp.color}>
        <Title>ปักหมุดหน้าข่าวสารทั้งหมด</Title>
      </Header>
      <ListPinContainer>
        <div>
          {Array.from({
            length: numberPin,
          }).map((_, idx) => {
            return (
              <NumberPin
                color={currentApp.color}
                backgroundColor={currentApp.backgroundColor}
                key={idx}
              >
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(
                provided,
                // snapshot
              ) => {
                return (
                  <div
                    {...provided.droppableProps}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    ref={provided.innerRef}
                  >
                    <Form.List name='pinAll'>
                      {(fields) => {
                        return (
                          <>
                            {fields.map((i, idx) => {
                              const item = newDndList[idx]
                              if (item?.disabled) {
                                return (
                                  <ItemPin
                                    form={form}
                                    nameHead='pinAll'
                                    currentApp={currentApp}
                                    key={item.key}
                                    disabled={item.disabled}
                                    showButtonAdd={!!item.showButtonAdd}
                                    onSelectNews={onSelectNews}
                                    onDelPinNews={onDelPinNews}
                                    newsData={item}
                                    name={i.name}
                                  />
                                )
                              }

                              return (
                                <Draggable key={item.key} draggableId={item.key} index={idx}>
                                  {(p, s) => {
                                    return (
                                      <div
                                        ref={p.innerRef}
                                        {...p.draggableProps}
                                        {...p.dragHandleProps}
                                        style={getItemStyle(s.isDragging, p.draggableProps.style)}
                                      >
                                        <ItemPin
                                          nameHead='pinAll'
                                          form={form}
                                          name={i.name}
                                          newsData={item}
                                          currentApp={currentApp}
                                          disabled={item.disabled}
                                          onSelectNews={onSelectNews}
                                          onDelPinNews={onDelPinNews}
                                          showButtonAdd={!!item.showButtonAdd}
                                        />
                                      </div>
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                          </>
                        )
                      }}
                    </Form.List>
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          </DragDropContext>
        </div>
      </ListPinContainer>
    </Container>
  )
}

export default PinAll
