export interface UserStaffEntity {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updateAt: string;
  isActive: boolean;
}
export const UserStaffEntity_INIT: UserStaffEntity = {
  id: "",
  email: "",
  username: "",
  password: "",
  role: "",
  firstname: "",
  lastname: "",
  createdAt: "",
  updateAt: "",
  isActive: true,
};
