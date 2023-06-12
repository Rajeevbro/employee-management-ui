import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import SharedLayout from "./SharedLayout";
import { Box } from "@mui/material";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { isTokenValid, isLoading } = useSelector(
    (store) => store.authenticationStore
  );

  if (!isTokenValid) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Box display={"flex"}>
        <SharedLayout />
        <Outlet />
      </Box>
    </>
  );
};

export default ProtectedRoutes;
