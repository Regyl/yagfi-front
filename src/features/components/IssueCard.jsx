import React from "react";
import styles from "./IssueCard.module.css";
import { Badge } from "../../shared/ui/Badge/Badge";
import { formatDate } from "../../shared/utils/formatDate";


export function IssueCard({ issue }) {
    const { title, url, createdAt, repository } = issue;


    return (
        <a href={url} target="_blank" rel="noreferrer" className={styles.card}>
            <div className={styles.header}>{title}</div>


            <div className={styles.repo}>{repository.title}</div>


            <div className={styles.meta}>
                <Badge>{repository.language}</Badge>
                <Badge>{repository.stars} ★</Badge>
                <span className={styles.date}>{formatDate(createdAt)}</span>
            </div>
        </a>
    );
}