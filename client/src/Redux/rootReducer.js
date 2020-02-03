import { combineReducers } from "redux";
import alertReducer from "./Alert/alertReducer.js";
import authReducer from "./Auth/authReducer";
import profileReducer from "./Profile/profileReducer";
import postReducer from "./Posts/postReducer";
export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer
});
