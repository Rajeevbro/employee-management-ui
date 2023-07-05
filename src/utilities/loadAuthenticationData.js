import axios from "axios";

const AUTHENTICATION_LOGIN_URL =
  "https://employee-management-api-production-af0d.up.railway.app/auth/user/login";
const AUTHENTICATION_FINDEMPLOYEE_URL = "/employee";
const USER_REGISTER_URL =
  "https://employee-management-api-production-af0d.up.railway.app/auth/user/register";
const API_URL =
  "https://employee-management-api-production-af0d.up.railway.app/";

export const loadAUthenticationData = async (userName, password) => {
  try {
    const response = await axios.post(AUTHENTICATION_LOGIN_URL, {
      userName,
      password,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (load) => {
  try {
    const response = await axios.post(USER_REGISTER_URL, load);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const loadUserData = async (token, requestType, load) => {
  try {
    const authAxios = createAxios(token);

    console.log("Hello" + authAxios);
    if (requestType == "GET") {
      const response = await authAxios.get(AUTHENTICATION_FINDEMPLOYEE_URL);
      return response.data;
    } else if (requestType == "POST") {
      const response = await authAxios.post(
        AUTHENTICATION_FINDEMPLOYEE_URL,
        load
      );
    }

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createAxios = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loadAccountUserData = async (token) => {
  try {
    const response = await axios.get(
      "https://employee-management-api-production-af0d.up.railway.app/auth/user"
    );

    return response.data;
  } catch (error) {}
};

export const deleteUserAccount = async (id) => {
  try {
    const response = await axios.delete(
      `https://employee-management-api-production-af0d.up.railway.app/auth/user/remove/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const testRun = (id) => {
  console.log(id);
};
