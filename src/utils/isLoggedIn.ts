export const isLoggedIn = () => {
  return !!sessionStorage.getItem("token");
};

export const logout = () => {
  sessionStorage.clear();
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};
