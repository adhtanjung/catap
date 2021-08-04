import { Provider } from "react-redux";
import Layout from "../../app-js/components/Layout";
import Navbar from "../../app-js/components/NavBar";
import store from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Navbar />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
export default MyApp;
