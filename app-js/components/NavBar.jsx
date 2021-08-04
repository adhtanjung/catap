import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/action";
import { RootState } from "../redux/store";
import styles from "../styles/Navbar.module.css";
export default function Navbar() {
	const dispatch = useDispatch();
	const { username } = useSelector((state) => state.user);
	const router = useRouter();
	const handleLogout = () => {
		dispatch(logoutAction());
		router.replace("/");
	};
	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.inner}>
					<div className={styles.brand}>CATAP</div>
					{username && <button onClick={handleLogout}>logout</button>}
				</div>
			</div>
		</div>
	);
}
