import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  useTheme,
  Stack,
  IconButton,
} from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { Margin } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { setSidebaropen } from "../store/userInterfaceControllerSlice";
import { useDispatch, useSelector } from "react-redux";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector(
    (store) => store.userInterfaceControllStore
  );
  return (
    <>
      <AppBar position="static" sx={{ background: colors.blueAccent[400] }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            margin: "auto",
          }}
        >
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => dispatch(setSidebaropen(!isSideBarOpen))}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant={theme.typography.h1.fontSize}>
              EMPLOYEE MANAGEMENT SYSTEM
            </Typography>
          </Box>

          <Box display={"flex"} alignItems={"center"}>
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVMN17X57T4pR18d-WqAggnxb2W_7lgj1IMUIp6jku2Q&s"
            />
            <Typography marginLeft={"10px"}>Hello User</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
