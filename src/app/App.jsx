import React from "react";
import styles from "./App.module.css";
import { IssuesPage } from "../features/pages/IssuesPage";


export default function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>Good First Issues</header>
            <main className={styles.main}>
                <IssuesPage />
            </main>
        </div>
    );
}