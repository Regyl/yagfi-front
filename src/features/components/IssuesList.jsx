import React from "react";
import styles from "./IssuesList.module.css";
import { IssueCard } from "./IssueCard";


export function IssuesList({ issues }) {
    return (
        <div className={styles.list}>
            {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
    );
}