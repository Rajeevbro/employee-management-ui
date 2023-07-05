import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
