const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {}
};

const profileReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_PROFILE":
    case "UPDATE_PROFILE":
      return { ...state, profile: payload, loading: false };
    case "GET_PROFILES":
      return { ...state, profiles: action.payload, loading: false };
    case "GET_REPOS":
      return { ...state, repos: action.payload, loading: false };
    case "PROFILE_ERRORS":
      return { ...state, error: payload, loading: false };
    case "CLEAR_PROFILE":
      return { ...state, profile: null, repos: [], loading: false };

    default:
      return { ...state };
  }
};

export default profileReducer;
