import { combineReducers } from "redux";
import errorReducer from "./ErrorReducer";
import projectReducer from "./ProjectReducer";
import backlogReducer from "./BacklogReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  projects: projectReducer,
  backlog: backlogReducer,
  security: securityReducer
});
