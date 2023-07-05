import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Snackbar } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  setTokenValidity,
  setRole,
  setToken,
} from "../store/authenticationslice";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAccountUserData,
  loadUserData,
} from "../utilities/loadAuthenticationData";
import { addEmployee } from "../store/emploeeslice";
import AppSnackBar from "./AppSnackBar";
import { setIsSnackBarOpen, setSnackbarMessage } from "../store/snackbarSlice";
import { setLoading } from "../store/globalslice";
import { setUser } from "../store/userSlice";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SharedLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector((store) => store.authenticationStore);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleClick = async (e) => {
    const employeeData = await loadUserData(token, "GET", null);
    console.log(employeeData);
    if (employeeData === undefined) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
      dispatch(addEmployee(employeeData));
    }
    navigate("viewEmployee");
  };

  const handleUserData = async () => {
    try {
      const data = await loadAccountUserData();
      console.log(data);
      dispatch(setUser(data));
      navigate("userControl");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ background: colors.blueAccent[400] }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Employee Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List></List>
        <ListItem>
          <ListItemButton onClick={() => navigate("addEmployee")}>
            <ListItemIcon>
              <PersonAddAlt1Icon />
            </ListItemIcon>
            <ListItemText
              primary={"Add Employee"}
              sx={{ textDecoration: "none" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"View  Employee"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleUserData}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Users Portal"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton
            onClick={() => {
              dispatch(setToken([]));
              dispatch(addEmployee([]));
              dispatch(setTokenValidity(false));
              dispatch(setIsSnackBarOpen(true));
              dispatch(setSnackbarMessage("Logout SuccessFull"));
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Main open={open}></Main>

      <Box>
        <AppSnackBar />
      </Box>
    </Box>
  );
};

export default SharedLayout;
