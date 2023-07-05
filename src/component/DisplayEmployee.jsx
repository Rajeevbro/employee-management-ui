import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Padding } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import ServerError from "./ServerError";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 110,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
    editable: true,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    editable: true,
  },
];

const DisplayEmployee = () => {
  const { employeeList } = useSelector((store) => store.employeeStore);

  const { isLoading } = useSelector((store) => store.globalStore);
  console.log(employeeList);
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {!isLoading ? (
        <Box sx={{ width: "70vw", height: "80vh", padding: "5%" }}>
          <Typography variant="h4">Employee Records</Typography>
          <DataGrid
            rows={employeeList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </Box>
  );
};

export default DisplayEmployee;
