import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext.jsx";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ Element }) => {
  const { user } = useContext(UserContext);

  if (user) {
    // Redirect to the appropriate dashboard based on the user's role
    if (user.state === "admin") return <Navigate to="/admin/dashboard" />;
    if (user.state === "teacher") return <Navigate to="/teacher/dashboard" />;
    if (user.state === "student") return <Navigate to="/student" />;
  }

  return <Element />;
};

export default PublicRoute;