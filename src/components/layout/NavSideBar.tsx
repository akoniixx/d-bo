import { Button, TimePicker } from 'antd'
import Layout, { Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import React, { useEffect, useMemo } from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import color from '../../resource/color'
import icon from '../../resource/icon'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { MenuSide } from './MenuSide'
import { pathLists } from './SideBar'
import { useRecoilValueLoadable } from 'recoil'
import { getUserRoleById, profileAtom } from '../../store/ProfileAtom'
import { listMenu } from '../../entities/RoleEntities'
import { mappingRoles, mappingSubAllMenu } from '../../definitions/RolesMappingObj'

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  const url = window.location.origin + '/AuthPage'
  window.location.href = url
}

const NavSidebar: React.FC<any> = ({ children }) => {
  const data = useRecoilValueLoadable(getUserRoleById)
  const profile = useRecoilValueLoadable(profileAtom)
  const currentRole = data.state === 'hasValue' ? data.contents : null
  const currentProfile = profile.state === 'hasValue' ? profile.contents : null

  const [persistedProfile] = useLocalStorage('profile', [])

  const isReportAccount = currentProfile && currentProfile?.role.toLowerCase() === 'account'
  const newSideBarWithPermission = useMemo(() => {
    const currentPathList = pathLists(!!isReportAccount)
    if (currentRole) {
      const newSideBar = currentPathList.filter((el) => {
        const key = mappingRoles[el.name as keyof typeof mappingRoles]

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
        if (currentRoleKey.length > 0) {
          const subMenu = el.subMenu.filter((sub) => {
            const key = mappingSubAllMenu[el.name as keyof typeof mappingSubAllMenu]
            const currentSubRoleKey = key[sub.name as keyof typeof key]
            const findByKey = currentRoleKey.find((role) => {
              return role.name === currentSubRoleKey
            })

            if (findByKey) {
              if (findByKey.name === 'แก้ไขงาน / ดูประวัติงาน') {
                return findByKey.view.value && findByKey.edit.value
              }

              return findByKey?.view.value
            } else {
              return false
            }
          })
          return { ...el, subMenu }
        }

        return el
      })
      return mutateNewSubMenus as typeof newSideBar
    }
    return currentPathList
  }, [currentRole, isReportAccount])

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
