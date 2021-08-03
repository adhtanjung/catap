import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, ProviderProps } from "react-redux";
import store from "../redux/store";
import Navbar from "../components/NavBar";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
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
