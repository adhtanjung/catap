// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";

// import userReducer from "./user.store";
// export const wrapper = createWrapper(() => {
// 	configureStore({
// 		reducer: {
// 			userReducer,
// 		},
// 		devTools: true,
// 	});
// });
// // const store = configureStore({
// // 	reducer,
// // });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import user from "./user.store";

export const wrapper = createWrapper(() =>
	configureStore({
		reducer: {
			user,
		},
		devTools: true,
	})
);
