import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userType = {
	username: String;
	isStatus: String;
	error: String;
};

const initialState: userType = {
	username: "",
	isStatus: "idle",
	error: "",
};
interface apiFailedInterface {
	error: String;
}
const userSlice = createSlice({
	name: "user",
	initialState,

	reducers: {
		signIn: (state: any, action: PayloadAction<userType>) => {
			state.username = action.payload.username;
			state.isStatus = "resolved";
			state.error = "";
		},
		apiFailed: (state: any, action: PayloadAction<string>) => {
			state.isStatus = "rejected";
			state.error = action.payload;
		},
	},
});

export const { signIn, apiFailed } = userSlice.actions;
export default userSlice.reducer;
