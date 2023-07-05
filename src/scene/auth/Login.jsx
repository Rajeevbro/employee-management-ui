import { PermIdentityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  colors,
  useTheme,
  Fade,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import authenticationslice, {
  setTokenValidity,
  setUserName,
} from "../../store/authenticationslice";
import { Link, useNavigate } from "react-router-dom";
import {
  loadAUthenticationData,
  loadUserData,
} from "../../utilities/loadAuthenticationData";
import { setToken } from "../../store/authenticationslice";
import { addEmployee } from "../../store/emploeeslice";
import AppSnackBar from "../../component/AppSnackBar";

const Login = () => {
  const dispatch = useDispatch();
  const naigate = useNavigate();
  const navigate = useNavigate();
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [successSignal, setSuccessSignal] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "User Name cannot exceed 15 character")
        .required("User Name is required"),
      password: Yup.string()
        .max(20, "Cannot be more than 20 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      const data = await loadAUthenticationData(
        values.userName,
        values.password
      );

      if (data === undefined) {
        setSuccessSignal(true);
        setTimeout(() => {
          setSuccessSignal(false);
        }, 1000);
      }

      if (data.token !== null) {
        dispatch(setTokenValidity(true));
        dispatch(setToken(data.token));
        dispatch(setUserName(data.userName));
      }

      navigate("/");
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "2%" }}>
      <Paper sx={{ width: "700px" }}>
        {successSignal && (
          <Fade in={successSignal}>
            <Alert severity="error">UserName or Password incorrect</Alert>
          </Fade>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4} padding={"12%"}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <PermIdentityOutlined
                sx={{
                  height: "50px",
                  width: "50px",
                  color: color.blueAccent[500],
                }}
              />
              <Typography variant="h5">Welcome Back</Typography>
            </Box>

            <Stack>
              <TextField
                label="User Name"
                id="userName"
                variant="outlined"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched?.userName && formik.errors?.userName && (
                <Typography
                  variant={theme.typography.h6.fontSize}
                  color={color.redAccent[500]}
                >
                  {formik.errors.userName}
                </Typography>
              )}
            </Stack>
            <Stack>
              <TextField
                label="Password"
                id="password"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched?.password && formik.errors?.password && (
                <Typography
                  variant={theme.typography.h6.fontSize}
                  color={color.redAccent[500]}
                >
                  {formik.errors.password}
                </Typography>
              )}
            </Stack>

            <Button
              variant="contained"
              sx={{ background: color.blueAccent[200] }}
              type="submit"
            >
              Submit
            </Button>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography>
                Don`t Have an account?
                <Button onClick={() => navigate("/auth/register")}>
                  Sign up!
                </Button>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
      <AppSnackBar />
    </Box>
  );
};

export default Login;
