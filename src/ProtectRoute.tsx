import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const username = localStorage.getItem("accessToken");
  if (username) {
    return true;
  } else {
    return false;
  }
};

const ProtectRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="" />;
};

export default ProtectRoute;
