import { combineReducers } from "redux";
import cars from "./cars_reducer";
import user from "./user_reducer";

const rootReducer = combineReducers({
  cars,
  user,
});

export default rootReducer;
