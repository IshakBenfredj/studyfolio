import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext.jsx";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ Element, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/" />; // Redirect to login if no user

  if (allowedRoles && !allowedRoles.includes(user.state)) {
    return <Navigate to="/" />; // Redirect to home if user role is not allowed
  }

  return <Element />;
};

export default PrivateRoute;
