import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
