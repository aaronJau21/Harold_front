export const setLocal = (response: undefined) => {
  localStorage.setItem("user", JSON.stringify(response));
};

export const remove = () => {
  localStorage.removeItem("user");
};
