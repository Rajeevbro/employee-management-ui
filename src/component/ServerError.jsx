import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box, Fade } from "@mui/material";
import Slide from "@mui/material/Slide";

const ServerError = () => {
  return (
    <Box>
      <Fade in={true}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong with server —{" "}
          <strong>Please try Reloading the app !</strong>
        </Alert>
      </Fade>
    </Box>
  );
};

export default ServerError;
