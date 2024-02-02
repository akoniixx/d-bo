import { atom, selector } from 'recoil'
import { AuthDatasource } from '../datasource/AuthDatasource'
import { RoleEntity } from '../entities/RoleEntities'

interface UserProfile {
  email: string
  firstname: string
  id: string
  isActive: boolean
  lastname: string
  role: string
  roleId: string
  username: string
}
const profileAtom = atom<UserProfile | null>({
  key: 'profile',
  default: null,
})

const isTriggerRole = atom({
  key: 'isTriggerRole',
  default: false,
})
const getUserRoleById = selector({
  key: 'getUserRoleById',
  get: async ({ get }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isTrigger = get(isTriggerRole)
    const profile = get(profileAtom)
    if (profile?.roleId) {
      try {
        const result = await AuthDatasource.getRoleByRoleId(profile.roleId)
        console.log('result', result)
        return result as RoleEntity
      } catch (e) {
        console.log(e)
      }
    }
  },
})
export { profileAtom, getUserRoleById, isTriggerRole }
