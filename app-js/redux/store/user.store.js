import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
		logout: () => {
			return initialState;
		},
	},
});

export const { signIn, apiFailed, logout } = userSlice.actions;
export default userSlice.reducer;
