import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProtectedRoute(){
  const {isUserLoggedIn} = useContext(UserContext)
  console.log(isUserLoggedIn())
  return isUserLoggedIn() ? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoute