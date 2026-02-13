import React from 'react';
import {IssueCard} from './IssueCard';
import {Issue} from '@/types';

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({issues}: IssuesListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list">
      {issues.map((issue) => (
        <li key={issue.issueId} className="min-h-0 min-w-0">
          <IssueCard issue={issue} />
        </li>
      ))}
    </ul>
  );
}
