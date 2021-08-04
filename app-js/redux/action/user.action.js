import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import axios from "axios";

import { signIn, apiFailed, logout } from "../store/user.store";

export const userSignIn = (data) => {
	return async (dispatch) => {
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
	return async (dispatch) => {
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

export const logoutAction = () => {
	return async (dispatch) => {
		localStorage.clear();
		dispatch(logout());
	};
};
