const isloggedIn = () => {
  return (
    !!localStorage.getItem("token") && !!localStorage.getItem("email")
  );
};

const getAccToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const logout = () => {
  sessionStorage.removeItem("isLoggedIn");
  localStorage.removeItem("access-token");
  window.location.replace("/");
};

const getUserType = () => {
  return localStorage.getItem("user_type");
};

export default {
    isloggedIn,
    getAccToken,
    logout,
    getUserType
};