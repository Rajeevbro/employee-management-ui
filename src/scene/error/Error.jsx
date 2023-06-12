import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TurnSlightLeftOutlinedIcon from "@mui/icons-material/TurnSlightLeftOutlined";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <IconButton onClick={() => navigate("/")}>
        <TurnSlightLeftOutlinedIcon />
        <Typography>Home this way</Typography>
      </IconButton>
      <img
        width={"50%"}
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
        alt=""
      />
    </Box>
  );
};

export default Error;
