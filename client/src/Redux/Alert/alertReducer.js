const initialState = [];

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return [...state, action.payload];

    case "REMOVE_ALERT":
      return state.filter(s => s.id !== action.payload);
    default:
      return state;
  }
};
export default alertReducer;
