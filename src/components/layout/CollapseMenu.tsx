import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { color } from '../../resource'
import { CollapseSubMenu } from './CollapseSubMenu'
import { IconMenu, IconMenuActive } from './IconMenu'
import { useEffectOnce } from '../../hook/useEffectOnce'
import { Image } from 'antd'
import icon from '../../resource/icon'

interface CollapseMenuProps {
  subLists: {
    path: string
    name: string
    title: string
    subMenu: {
      path: string
      name: string
      title: string
    }[]
  }[]
  name: string
  path: string
  title: string
  setCurrent: React.Dispatch<
    React.SetStateAction<{
      path: string
    }>
  >
  current: {
    path: string
  }
  count: number
  checkPath: string | undefined
  setCheckPath: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ListStyled = styled.div`
  padding: 8px;
  cursor: pointer;
  border-radius: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: ${color.Success};
`
const SubListItem = styled.div<{ isFocus?: boolean }>`
  padding: 14px;
  padding-left: 38px;
  cursor: pointer;
  background-color: ${'#ceeed5'};
  color: ${color.Success};
  width: 100%;
  font-size: 14px;
  height: 50px;
  justify-content: space-between;
`
export const CollapseMenu: React.FC<CollapseMenuProps> = ({
  title,
  subLists,
  name,
  setCurrent,
  path,
  checkPath,
  setCheckPath,
}) => {
  const navigate = useNavigate()
  const [checkPathSub, setCheckPathSub] = useState<string | undefined>()
  const [currentSub, setCurrentSub] = useState({
    path: '',
  })
  const [checkPathSubList, setCheckPathSubList] = useState<string | undefined>()
  useEffectOnce(() => {
    const pathName = window.location.pathname
    const pathNameSplit = pathName.split('/').filter((item) => item !== '')

    const currentPath = subLists.find((item) => {
      if (item.subMenu && item.subMenu.length < 1) {
        return item.path === `/${pathNameSplit[0]}`
      }
      const isHaveSubPath = item.subMenu.find((el) => el.path === `/${pathNameSplit[0]}`)
      return !!isHaveSubPath
    })

    setCurrentSub({
      path: `/${pathNameSplit}`,
    })
    setCheckPathSub(currentPath?.path)
    setCheckPathSubList(currentPath?.path)
  })

  return (
    <>
      <div
        style={{
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '50px',
        }}
        onClick={() => {
          setCheckPathSub(path)
          setCurrent({ path })
          if (path === checkPath) {
            setCheckPath(undefined)
          } else {
            setCheckPath(path)
          }
        }}
      >
        {checkPath !== path ? (
          <>
            <div
              style={{
                color: '#231F20',
                display: 'flex',
                gap: 8,
                padding: '8px',
                cursor: 'pointer',
                width: '100%',
                alignItems: 'center',
                height: '50px',
                paddingLeft: '16px',
              }}
            >
              {IconMenu[name as keyof typeof IconMenu]}
              {title}
              {/* {path === "task" && (
                <div
                  className="col-lg-10"
                  style={{
                    alignSelf: "center",
                    padding: "5px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.Error,
                    borderRadius: 15,
                    color: color.White,
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {40}
                </div>
              )} */}
            </div>
            <div style={{ paddingRight: '8px' }}>
              {checkPath !== path ? (
                <Image src={icon.arrowDownMenu} preview={false} style={{ width: 14, height: 8 }} />
              ) : (
                <Image
                  src={icon.arrowUpYellowMenu}
                  preview={false}
                  style={{ width: 14, height: 8 }}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <ListStyled
              style={{
                color: '#FFCA37',
                display: 'flex',
                gap: 8,
                paddingLeft: '16px',
              }}
            >
              {IconMenuActive[name as keyof typeof IconMenu]}
              {title}
              {/* {path === "task" && (
                <div
                  className="col-lg-10"
                  style={{
                    alignSelf: "center",
                    padding: "5px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.Error,
                    borderRadius: 15,
                    color: color.White,
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {40}
                </div>
              )} */}
            </ListStyled>
            <div
              style={{
                paddingRight: '8px',
                backgroundColor: color.Success,
                height: '50px',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {checkPath !== path ? (
                <Image src={icon.arrowDownMenu} preview={false} style={{ width: 14, height: 8 }} />
              ) : (
                <Image
                  src={icon.arrowUpYellowMenu}
                  preview={false}
                  style={{ width: 14, height: 8 }}
                />
              )}
            </div>
          </>
        )}
      </div>
      {checkPath === path && (
        <div
          style={{
            width: '100%',
          }}
        >
          {subLists.map((subList, idx) => {
            if (subList?.subMenu?.length > 0) {
              return (
                <CollapseSubMenu
                  key={idx}
                  subLists={subList.subMenu}
                  name={subList.name}
                  title={subList.title}
                  setCurrentSub={setCurrentSub}
                  currentSub={currentSub}
                  path={subList.path}
                  checkPathSub={checkPathSub}
                  setCheckPathSub={setCheckPathSub}
                  checkPathSubList={checkPathSubList}
                  setCheckPathSubList={setCheckPathSubList}
                />
              )
            }
            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrent({ path: subList.path })
                  if (subList.path !== checkPathSub && subList.path === checkPathSubList) {
                    setCheckPathSub(undefined)
                    setCheckPathSubList(undefined)
                  } else {
                    setCheckPathSub(subList.path)
                    setCheckPathSubList(subList.path)
                  }
                  navigate(subList.path)
                }}
              >
                {checkPathSub === subList.path && checkPathSubList === subList.path ? (
                  <SubListItem>{subList.title}</SubListItem>
                ) : (
                  <div
                    style={{
                      padding: '14px',
                      paddingLeft: '38px',
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '50px',
                      fontSize: '14px',
                    }}
                  >
                    {subList.title}
                  </div>
                )}

                {/* {path === "task" && (
                    <div
                      className="col-lg-10"
                      style={{
                        alignSelf: "center",
                        padding: "5px",
                        width: "20px",
                        height: "20px",
                        backgroundColor: color.Error,
                        borderRadius: 15,
                        color: color.White,
                        fontSize: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {count}
                    </div>
                  )} */}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
