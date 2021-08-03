import styles from "../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.inner}>
					<div className={styles.brand}>CATAP</div>
					<div>RIGHT</div>
				</div>
			</div>
		</div>
	);
}
