export default function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    const accessToken = JSON.parse(token);
    if (accessToken) {
      return { Authorization: "Bearer" + accessToken };
    } else {
      return {};
    }
  }
}
