import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { me, userSignIn } from "../redux/action";
import { RootState } from "../redux/store";
import styles from "../styles/Home.module.css";

export default function Home() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");

	const user = useSelector((state) => state.user);

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleChangeUsernameOrEmail = (e) => {
		setUsernameOrEmail(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			userSignIn({
				usernameOrEmail,
				password,
			})
		);
	};
	useEffect(() => {
		dispatch(me());
	}, []);

	if (user.username) {
		console.log(router);
		router.replace("/landing");
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Catap</title>
				<meta name="description" content="chat app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Login Page</h1>
			<div className={styles.form}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<label>Username Or Email</label>
					<input
						onChange={handleChangeUsernameOrEmail}
						type="text"
						className={styles.input}
						id="usernameOrEmail"
					/>
					<label>Password</label>
					<input
						onChange={handleChangePassword}
						type="password"
						className={styles.input}
						id="password"
					/>
					<button type="submit" className={styles.btn}>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
