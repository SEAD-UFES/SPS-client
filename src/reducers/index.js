import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
//import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  user: userReducer
  //post: postReducer
});
