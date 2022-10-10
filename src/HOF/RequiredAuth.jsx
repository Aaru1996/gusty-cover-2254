import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children }) => {
  const {
    state: { isSignedUp, isLoggedIn },
  } = useContext(AuthContext);

  let setLoggedIn = localStorage.getItem("setLoggedIn");

  if (setLoggedIn == "false") {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};
