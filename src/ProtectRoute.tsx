import { Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "./components/layout/Layout";

const useAuth = () => {
  const username = localStorage.getItem("token");
  if (username) {
    return true;
  } else {
    return false;
  }
};

const ProtectRoute = () => {
  const auth = useAuth();
  return auth ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="" />
  );
};

export default ProtectRoute;
