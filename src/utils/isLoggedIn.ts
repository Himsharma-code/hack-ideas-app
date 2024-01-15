export const isLoggedIn = () => {
  return !!sessionStorage.getItem("token");
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};
