// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	username: "",
	isStatus: "idle",
	error: "",
};
const userSlice = createSlice({
	name: "user",
	initialState,

	reducers: {
		signIn: (state, action) => {
			state.username = action.payload.username;
			state.isStatus = "resolved";
			state.error = "";
		},
		apiFailed: (state, action) => {
			state.isStatus = "rejected";
			state.error = action.payload;
		},
		logout: (state) => {
			return initialState;
			// state.username = "";
			// state.isStatus = "idle";
			// state.error = "";
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			console.log("HYDRATE", state, action.payload);
			return {
				...state,
				...action.payload,
			};
		},
	},
});
// const makeStore = () => {
// 	configureStore({
// 		reducer: {
// 			[userSlice.name]: userSlice.reducer,
// 		},
// 	});
// };
// export const wrapper = createWrapper(makeStore);

export const { signIn, apiFailed, logout } = userSlice.actions;
// export default userSlice.reducer;

export default userSlice.reducer;
