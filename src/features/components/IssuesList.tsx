import React from 'react';
import {Box} from '@mui/material';
import {IssueCard} from './IssueCard';
import {Issue} from '../../types';

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {issues.map((issue) => (
          <Box key={issue.issueId} sx={{display: 'flex', minHeight: 0, minWidth: 0}}>
          <IssueCard issue={issue} />
        </Box>
      ))}
    </Box>
  );
}
