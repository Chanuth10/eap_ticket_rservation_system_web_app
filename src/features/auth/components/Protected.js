import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
  const {isAuthenticated } = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
