import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const localAuth = localStorage.getItem("authenticated");
  if (!isAuthenticated && localAuth === null) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
