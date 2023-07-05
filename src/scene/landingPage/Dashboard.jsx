import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Box m={10}>
      <Paper
        elevation={3}
        sx={{
          height: "80vh",
          width: "80vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          width={"100%"}
          color={"blue"}
        >
          <strong>About this project</strong>
        </Typography>
        <Typography variant="h8" padding={"20px"} fontSize={"25px"}>
          This project is the demo project made using React in the frontend and
          spring boot in backend and has implemented mySQL database.
          <br />
          This is the basic demo where full stack login logout route is
          implemented and user can set up employee profile and can also delete
          the account created in the platform.
          <br />
          <strong> External libraries</strong>
          <br />
          1. Formik
          <br />
          2. Yup
          <br />
          3. axios
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
