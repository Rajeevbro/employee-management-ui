import { PermIdentityOutlined } from "@mui/icons-material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
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
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import authenticationslice, {
  setTokenValidity,
} from "../../store/authenticationslice";
import { Link, useNavigate } from "react-router-dom";
import {
  loadAUthenticationData,
  loadUserData,
  registerUser,
} from "../../utilities/loadAuthenticationData";
import { setToken } from "../../store/authenticationslice";
import { addEmployee } from "../../store/emploeeslice";
import {
  setSnackbarMessage,
  setIsSnackBarOpen,
} from "../../store/snackbarSlice";

const RegisterUser = () => {
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
      systemRole: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "User Name cannot exceed 15 character")
        .required("User Name is required"),
      password: Yup.string()
        .max(20, "Cannot be more than 20 characters")
        .required("password is required"),
      systemRole: Yup.string()
        .max(20, "Cannot be more than 20 characters")
        .required("SystemRole is required"),
    }),
    onSubmit: async (values) => {
      const data = await registerUser(values);

      if (data === undefined) {
        setSuccessSignal(true);
        setTimeout(() => {
          setSuccessSignal(false);
        }, 10000);
      }

      if (data.token !== null) {
        dispatch(setTokenValidity(true));
        dispatch(setToken(data.token));
        dispatch(setIsSnackBarOpen(true));
        dispatch(
          setSnackbarMessage(
            "User Registered Succesfully and now you are logged in Automaticly"
          )
        );
      }

      navigate("/");
    },
  });
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "2%" }}>
      <Paper sx={{ width: "700px" }}>
        {successSignal && (
          <Fade in={successSignal}>
            <Alert severity="error"></Alert>
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
              <Typography variant="h5">Registration Form</Typography>
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
            <FormControl sx={{ m: 2, minWidth: 220 }}>
              <InputLabel id="systemRoleId">System Role</InputLabel>
              <Select
                labelId="systemRoleId"
                id="systemRole"
                name="systemRole"
                value={formik.values.systemRole}
                label="systemRole"
                onChange={formik.handleChange}
              >
                <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"ROLE_USER"}>USER</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{ background: color.blueAccent[200] }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterUser;
