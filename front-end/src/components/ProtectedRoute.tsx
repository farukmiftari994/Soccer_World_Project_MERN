import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: any }) {
  console.log("children :>> ", children);
  const { user } = useContext(AuthContext);
  console.log("user, loading :>> ", user);
  return user ? children : <Navigate to={"/"} />;
}

export default ProtectedRoute;
