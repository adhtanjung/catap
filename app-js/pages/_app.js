import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../app-js/components/Layout";
import Navbar from "../../app-js/components/NavBar";
import { me } from "../redux/action";
// import { wrapper } from "../redux/store/user.store";
import { wrapper } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps, store }) {
	const router = useRouter();
	const { username } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (username) {
			router.replace("/landing");
		}
		if (token) {
			dispatch(me());
		}
	}, [username]);
	return (
		<>
			<Navbar />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
export default wrapper.withRedux(MyApp);
