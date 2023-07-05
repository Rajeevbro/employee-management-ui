import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  deleteUserAccount,
  loadAccountUserData,
  testRun,
} from "../utilities/loadAuthenticationData";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const UserControl = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.userStore);
  const [userId, setId] = useState("");
  const { userName: accessName } = useSelector(
    (store) => store.authenticationStore
  );
  const handleRemoveUserClick = async (id) => {
    await deleteUserAccount(id);
    const data = await loadAccountUserData();
    dispatch(setUser(data));
  };

  return (
    <Box
      sx={{ marginTop: "10vh" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
    >
      <Typography variant="h4">USER DETAIL</Typography>
      {userData.map(({ id, userName, systemRole }) => {
        return (
          <Box key={id} width={"80vw"} margin={"10px "}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "2%",
                maxWidth: "70vw",
                background: "#f4f4f4",
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"90vw"}
              >
                <Typography variant="h5">
                  <strong>{userName}</strong>
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  padding={"5px"}
                  width={100}
                  borderRadius={"5px"}
                  sx={{ background: "#ccccc3", color: "white" }}
                >
                  {systemRole === "ROLE_ADMIN" ? (
                    <AdminPanelSettingsIcon color="success" />
                  ) : (
                    <PersonIcon color="warning" />
                  )}
                  <Typography>
                    {systemRole === "ROLE_ADMIN" ? "ADMIN" : "USER"}
                  </Typography>
                </Box>
              </Box>
              <Box marginLeft={"2rem"} padding={"5px"}>
                <Tooltip title="Delete User">
                  {userName === accessName ? (
                    <IconButton
                      disabled
                      onClick={() => handleRemoveUserClick(id)}
                    >
                      <ClearIcon color="grey" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleRemoveUserClick(id)}>
                      <ClearIcon color="warning" />
                    </IconButton>
                  )}
                </Tooltip>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};

export default UserControl;
