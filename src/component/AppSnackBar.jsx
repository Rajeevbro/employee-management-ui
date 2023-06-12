import { Alert, Stack } from "@mui/material";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setIsSnackBarOpen } from "../store/snackbarSlice";

const AppSnackBar = () => {
  const { message, isSnackBarOpen } = useSelector(
    (store) => store.SnackBarStore
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsSnackBarOpen(false));
  };
  return (
    <Stack>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert severity="success" sx={{ width: "100%" }} variant="filled">
          {message}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default AppSnackBar;
