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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (load) => {
  try {
    const response = await axios.post(USER_REGISTER_URL, load);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const loadUserData = async (token, requestType, load) => {
  try {
    const authAxios = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
