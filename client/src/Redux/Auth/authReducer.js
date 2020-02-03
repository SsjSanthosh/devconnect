const initialState = {
  token: null,
  loading: true,
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.token,
        loading: false,
        user: payload.data.user
      };

    default:
      return state;
  }
};
export default authReducer;
