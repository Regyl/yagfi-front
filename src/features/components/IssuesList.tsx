import React from 'react';
import {Box} from '@mui/material';
import {IssueCard} from './IssueCard';
import {Issue} from '../../types';
import styles from './IssuesList.module.css';

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  return (
      <Box className={styles.grid}>
      {issues.map((issue) => (
          <Box key={issue.issueId} className={styles.issueWrapper}>
          <IssueCard issue={issue} />
        </Box>
      ))}
    </Box>
  );
}
