import { Button } from 'antd'
import Layout, { Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import React, { useMemo } from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import color from '../../resource/color'
import icon from '../../resource/icon'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { MenuSide } from './MenuSide'
import { pathLists } from './SideBar'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById } from '../../store/ProfileAtom'
import { NewListType, listMenu } from '../../entities/RoleEntities'
import {
  mappingNestedSubMenu,
  mappingSpecialKey,
  mappingNoPermissionSubMenu,
  mappingRoles,
  mappingSubAllMenu,
} from '../../definitions/RolesMappingObj'

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  const url = window.location.origin + '/AuthPage'
  window.location.href = url
}

const NavSidebar: React.FC<any> = ({ children }) => {
  const data = useRecoilValueLoadable(getUserRoleById)
  const currentRole = data.state === 'hasValue' ? data.contents : null

  const [persistedProfile, setPersistedProfile] = useLocalStorage('profile', [])

  const listReportAcc = [
    'ick_accounting',
    'minkact',
    'arisa.m@iconkaset',
    'nathapon',
    'issariya',
    'รชยา',
  ]
  const listAdminTask = [
    'Khanittha.w',
    'oatchara.s@iconkaset',
    'nathapon.h@iconkaset.com',
    'sawatdee.k',
    'natarkarn.h',
    'saimhai',
    'รชยา',
  ]
  const checkReportAcc = listReportAcc.includes(persistedProfile.username)
  const checkAdminTask = listAdminTask.includes(persistedProfile.username)
  const isReportAccount = checkReportAcc
  const isAdminTask = checkAdminTask
  const newSideBarWithPermission = useMemo(() => {
    const listNoPermission = ['infinity', 'campaign']
    const listNoPermissionSub = ['IndexCampaignPoint', 'DronerInfinity', 'IndexListStore']
    const listSpecialKey = ['news', 'GuruPage']
    const currentPathList = pathLists(isReportAccount, isAdminTask)
    console.log('currentRole', currentRole)
    console.log('currentPathList', currentPathList)
    if (currentRole) {
      const newSideBar = currentPathList.filter((el) => {
        const key = mappingRoles[el.name as keyof typeof mappingRoles]
        if (listNoPermission.includes(el.name)) {
          return true
        }
        const currentRoleKey: listMenu[] = currentRole[key as keyof typeof currentRole]
        if (currentRoleKey) {
          const isHaveSomeView = currentRoleKey.some((role) => {
            return role.view.value
          })
          return isHaveSomeView
        }
      })

      const mutateNewSubMenus = newSideBar.map((el) => {
        const key = mappingRoles[el.name as keyof typeof mappingRoles]
        const currentRoleKey: listMenu[] = currentRole[key as keyof typeof currentRole]
        if (el.subMenu.length > 0) {
          if (listNoPermission.includes(el.name)) {
            const filterSubMenu = el.subMenu.filter((subMenu) => {
              if (listNoPermissionSub.includes(subMenu.name)) {
                return true
              } else {
                const currentSubMenuKeyList =
                  mappingNoPermissionSubMenu[el.name as keyof typeof mappingNoPermissionSubMenu]
                if (currentSubMenuKeyList) {
                  const findKey = Object.keys(currentSubMenuKeyList).find((key) => {
                    return key === subMenu.name
                  })
                  const valueOfKey =
                    currentSubMenuKeyList[findKey as keyof typeof currentSubMenuKeyList]
                  const findSubMenu = currentRoleKey.find((roleSub) => {
                    return roleSub.name === valueOfKey
                  })

                  const isHaveSub = subMenu.subMenu.length > 0
                  if (isHaveSub) {
                    const nestedSub = findSubMenu?.subItem?.subNested.some((nested: any) => {
                      return nested.view.value
                    })
                    return true
                  }

                  return findSubMenu?.view.value
                }
              }
            })

            return { ...el, subMenu: filterSubMenu }
          }

          const filterSubMenu = el.subMenu.filter((subMenu) => {
            const currentSubMenuKeyList =
              mappingSubAllMenu[el.name as keyof typeof mappingSubAllMenu]
            if (currentSubMenuKeyList) {
              const findKey = Object.keys(currentSubMenuKeyList).find((key) => {
                return key === subMenu.name
              })
              const valueOfKey =
                currentSubMenuKeyList[findKey as keyof typeof currentSubMenuKeyList]
              const findSubMenu = currentRoleKey.find((roleSub) => {
                return roleSub.name === valueOfKey
              })
              const isHaveSub = subMenu.subMenu.length > 0

              if (isHaveSub) {
                const isCredit = subMenu.subMenu.find((sub) => {
                  return sub.name === 'CreditDroner'
                })
                if (isCredit) {
                  return true
                }

                const nestedSubMenu = subMenu.subMenu.filter((sub) => {
                  const currentSubMenuKeyList =
                    mappingSubAllMenu[el.name as keyof typeof mappingSubAllMenu]
                  if (!currentSubMenuKeyList) {
                    return false
                  }
                  const findKey = Object.keys(currentSubMenuKeyList).find((key) => {
                    return key === subMenu.name
                  })

                  if (!findKey) {
                    return false
                  }
                  const isSpecialKey = listSpecialKey.includes(findKey)
                  if (isSpecialKey) {
                    const nameOfKey = mappingSpecialKey[findKey as keyof typeof mappingSpecialKey]
                    const findSubMenu = currentRoleKey.find((roleSub) => {
                      return roleSub.name === nameOfKey
                    })
                    return findSubMenu?.view.value
                  }
                  const valueOfKey =
                    mappingNestedSubMenu[findKey as keyof typeof mappingNestedSubMenu]

                  if (!valueOfKey) {
                    return false
                  }
                  const valueOfKeyNested = valueOfKey?.[sub.name as keyof typeof valueOfKey]
                  if (!valueOfKeyNested) {
                    return false
                  }

                  const findNestedMenu = currentRoleKey.find((roleSub) => {
                    return roleSub.name === valueOfKeyNested
                  })
                  return findNestedMenu?.view.value
                })

                return !!findSubMenu?.view.value || nestedSubMenu.length > 0
              } else {
                return !!findSubMenu?.view.value
              }
            }
          })

          return { ...el, subMenu: filterSubMenu || [] }
        }
        return el
      })
      return mutateNewSubMenus as typeof newSideBar
    }
    return currentPathList
  }, [currentRole, isReportAccount, isAdminTask])

  const navigate = useNavigate()

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1200,
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderBottom: '0.1px',
          borderBottomColor: '#C6C6C6',
          borderBottomStyle: 'solid',
          height: '64px',
        }}
      >
        <div className='d-flex justify-content-between'>
          <div>
            <img
              style={{ cursor: 'pointer' }}
              src={icon.logoHeader}
              width={140}
              onClick={() => navigate('/HomePage')}
            />
          </div>
          <div className='d-flex align-items-center'>
            <div className='me-4'>
              <span>
                <b>
                  {persistedProfile.firstname +
                    ' ' +
                    persistedProfile.lastname +
                    ' ' +
                    '(' +
                    persistedProfile.role +
                    ')'}
                </b>
              </span>
            </div>
            <Button
              style={{
                backgroundColor: color.primary1,
                color: color.BG,
                borderRadius: '5px',
              }}
              onClick={() => logout()}
              icon={<LogoutOutlined />}
              size='middle'
            />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            overflowX: 'auto',
            height: '90%',
            position: 'fixed',
            marginTop: 65,
            backgroundColor: color.White,
            cursor: 'pointer',
          }}
        >
          <MenuSide lists={newSideBarWithPermission} />
        </Sider>
      </Layout>
    </Layout>
  )
}

export default NavSidebar
