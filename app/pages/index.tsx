import Head from "next/head";
import Image from "next/image";
import {
	FormEvent,
	ChangeEvent,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { userSignIn } from "../redux/action";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
interface InputInterface {
	usernameOrEmail: String;
	password: String;
}

export default function Home() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const user = useSelector((state: RootState) => state.user);

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handleChangeUsernameOrEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setUsernameOrEmail(e.target.value);
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			userSignIn({
				usernameOrEmail,
				password,
			})
		);
	};

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
