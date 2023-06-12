import { ThemeProvider } from "styled-components";
import { ColorModeContext, useMode } from "./theme";

import Login from "./scene/auth/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./component/ProtectedRoutes";
import AddEmployeeForm from "./component/AddEmployeeForm";
import DisplayEmployee from "./component/DisplayEmployee";
import RegisterUser from "./scene/auth/RegisterUser";
import Error from "./scene/error/Error";
import Dashboard from "./scene/landingPage/Dashboard";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route index element={<Dashboard />} />
              <Route path="addEmployee" element={<AddEmployeeForm />} />
              <Route path="viewEmployee" element={<DisplayEmployee />} />
            </Route>
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<RegisterUser />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
