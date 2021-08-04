import dynamic from "next/dynamic";
import styles from "../styles/Landing.module.css";
import withAuthentication from "../components/WithAuth";
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

const Landing = (props) => {
	return (
		<div className={styles.main}>
			<LeftLanding />
			<RightLanding />
		</div>
	);
};
export default withAuthentication(Landing);
// export default function withAuthentication(Landing)(props) {
// }
