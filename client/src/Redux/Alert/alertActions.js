import uniqid from "uniqid";
export const setAlert = (msg, type) => dispatch => {
  const id = uniqid();
  dispatch({ type: "SET_ALERT", payload: { msg, type, id } });

  setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), 3000);
};

export const removeAlert = data => {
  return {
    type: "REMOVE_ALERT",
    payload: data
  };
};
