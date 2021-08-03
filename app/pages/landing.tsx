import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import styles from "../styles/Landing.module.css";
const LeftLanding = dynamic(() => import("../components/LeftLanding"), {
	loading: function loadingComponent() {
		return <p>...</p>;
	},
});
const RightLanding = dynamic(() => import("../components/RightLanding"), {
	loading: function loadingComponent() {
		return <p>...</p>;
	},
});

export default function Landing(props: AppProps) {
	return (
		<div className={styles.main}>
			<LeftLanding />
			<RightLanding />
		</div>
	);
}
