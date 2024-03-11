import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: any }) {
  console.log("children :>> ", children);
  const { user, loading } = useContext(AuthContext);
  console.log("user, loading :>> ", user, loading);
  return (
    //   loading ? (
    //     <h1>...LOADING....</h1>
    //   ) :
    user ? children : <Navigate to={"/"} />
  );
}

export default ProtectedRoute;
