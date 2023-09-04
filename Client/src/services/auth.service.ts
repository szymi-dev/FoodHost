import axios from "axios";

const API_URL = "http://localhost:46566";
interface LoginI {
  email: string;
  password: string;
}
interface RegisterI {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const config = {
  headers: { "Content-Type": "application/json" },
};

const register = ({
  username,
  email,
  password,
  confirmPassword,
}: RegisterI) => {
  return axios
    .post(
      API_URL + "/api/Account/register",
      {
        username,
        email,
        password,
        confirmPassword,
      },
      config
    )
    .then(response => {
      if (response) {
        console.log(response);
        return response;
      }
    });
};
const login = ({ email, password }: LoginI) => {
  return axios
    .post(
      API_URL + "/api/Account/login",
      {
        email,
        password,
      },
      config
    )
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const authService = {
  login,
  register,
};

export default authService;
