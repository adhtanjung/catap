import styles from "../styles/Landing.module.css";
export default function RightLanding() {
	return (
		<div className={styles.rightMain}>
			<div className={styles.rightHeader}>
				<span>header</span>
			</div>
			<div className={styles.headerBorder}></div>
			<div className={styles.chat}>chat</div>
			<div className={styles.input}>
				<form action="" className={styles.form}>
					<textarea
						cols={20}
						placeholder="Say something..."
						className={styles.inputText}
					/>
					<button className={styles.btn}>Send</button>
				</form>
			</div>
		</div>
	);
}
