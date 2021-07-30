import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./user.store";
const reducer = combineReducers({
	user: userReducer,
});
const store = configureStore({
	reducer,
});
export type RootState = ReturnType<typeof reducer>;

export default store;
