import { createSlice } from "@reduxjs/toolkit";
import nookies from "nookies";
import axios from "axios";
import { signIn, apiFailed } from "../store/user.store";

interface signInInterface {
	usernameOrEmail: String;
	password: String;
}
export const userSignIn = (data: signInInterface) => {
	return async (dispatch: any) => {
		try {
			const res = await axios.post(`${process.env.api}users/login`, data);

			const { token } = res.data;

			localStorage.setItem("token", token);

			dispatch(signIn(res.data.data));
		} catch (err) {
			dispatch(apiFailed(err.response.data.message));
		}
	};
};
