import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import axios from "axios";

import { signIn, apiFailed } from "../store/user.store";

interface signInInterface {
	usernameOrEmail: String;
	password: String;
}
export const userSignIn = (data: signInInterface) => {
	return async (dispatch: Dispatch) => {
		try {
			const res = await axios.post(`${process.env.api}users/login`, data);

			const { token } = res.data;

			localStorage.setItem("token", token);

			dispatch(signIn(res.data.data));

			const cookies = parseCookies();
			console.log({ cookies });
			setCookie(null, "user", JSON.stringify(res.data.data), {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			});
		} catch (err) {
			dispatch(apiFailed(err.response.data.message));
		}
	};
};
export const me = () => {
	return async (dispatch: Dispatch) => {
		try {
			const token = localStorage.getItem("token");
			console.log(token);
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios.post(`${process.env.api}users/me`, {}, headers);
			dispatch(signIn(res.data.data));
		} catch (err) {
			dispatch(apiFailed(err.response.data.message));
		}
	};
};
