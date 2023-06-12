import { Alert, Fade, InputLabel, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PermIdentityOutlined } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { loadUserData } from "../utilities/loadAuthenticationData";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import { setIsSnackBarOpen, setSnackbarMessage } from "../store/snackbarSlice";

const AddEmployeeForm = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const { token } = useSelector((store) => store.authenticationStore);
  const [sucessSignal, setSucessSignal] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      role: "",
      salary: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string().email().required("Email is required"),
      address: Yup.string().required("Address is required"),
      role: Yup.string().required("Role is required"),
      salary: Yup.number().required("salaryInput is Required"),
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      loadUserData(token, "POST", values);
      dispatch(setIsSnackBarOpen(true));
      dispatch(setSnackbarMessage("Employee Added SuccesFully "));

      actions.resetForm();
      setSucessSignal(true);
      setTimeout(() => {
        setSucessSignal(false);
      }, 1000);
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        width: "100%",
        margin: "2%",
      }}
    >
      <Paper sx={{ width: "700px" }}>
        {sucessSignal && (
          <Fade in={sucessSignal}>
            <Alert severity="success">Form submitted Sucessfully</Alert>
          </Fade>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4} padding={"12%"}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5">Employee Form</Typography>
            </Box>
            <Box display="flex" width={"100%"} justifyContent={"space-between"}>
              <Stack width={"48%"}>
                <TextField
                  label="First Name"
                  id="firstName"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched?.firstName && formik.errors?.firstName && (
                  <Typography
                    variant={theme.typography.h6.fontSize}
                    color={color.redAccent[500]}
                  >
                    {formik.errors.firstName}
                  </Typography>
                )}
              </Stack>

              <Stack width={"48%"}>
                <TextField
                  label="Last Name"
                  id="lastName"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched?.lastName && formik.errors?.lastName && (
                  <Typography
                    variant={theme.typography.h6.fontSize}
                    color={color.redAccent[500]}
                  >
                    {formik.errors.lastName}
                  </Typography>
                )}
              </Stack>
            </Box>
            <Stack>
              <TextField
                label="email"
                id="email"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched?.email && formik.errors?.email && (
                <Typography
                  variant={theme.typography.h6.fontSize}
                  color={color.redAccent[500]}
                >
                  {formik.errors.email}
                </Typography>
              )}
            </Stack>
            <Stack>
              <TextField
                label="address"
                id="address"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched?.address && formik.errors?.address && (
                <Typography
                  variant={theme.typography.h6.fontSize}
                  color={color.redAccent[500]}
                >
                  {formik.errors.address}
                </Typography>
              )}
            </Stack>
            <Box display="flex" width={"100%"} justifyContent={"space-between"}>
              <Stack width={"48%"}>
                <TextField
                  label="Salary"
                  id="salary"
                  variant="outlined"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched?.salary && formik.errors?.salary && (
                  <Typography
                    variant={theme.typography.h6.fontSize}
                    color={color.redAccent[500]}
                  >
                    {formik.errors.salary}
                  </Typography>
                )}
              </Stack>

              <Stack width={"48%"}>
                {/* <TextField
                  label="Role"
                  id="role"
                  variant="outlined"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="roleId">Role</InputLabel>
                  <Select
                    labelId="roleId"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    label="role"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
                    <MenuItem value={"DIRECTOR"}>DIRECTOR</MenuItem>
                    <MenuItem value={"STAFF"}>STAFF</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched?.role && formik.errors?.role && (
                  <Typography
                    variant={theme.typography.h6.fontSize}
                    color={color.redAccent[500]}
                  >
                    {formik.errors.role}
                  </Typography>
                )}
              </Stack>
            </Box>
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

export default AddEmployeeForm;
