import axios from "axios";

const API_URL = "http://localhost:46566";
interface LoginI {
  email: string;
  password: string;
}
const config = {
  headers: { "Content-Type": "application/json" },
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
};

export default authService;
