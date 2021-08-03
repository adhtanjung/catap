import React from "react";
interface LayoutProps {
	children: React.ReactNode;
}
import styles from "../styles/Layout.module.css";
export default function Layout({ children }: LayoutProps) {
	return <div className={styles.layout}>{children}</div>;
}
