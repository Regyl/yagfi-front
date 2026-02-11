import React from 'react';
import {IssueCard} from './IssueCard';
import {Issue} from '../../types';

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({issues}: IssuesListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {issues.map((issue) => (
        <div key={issue.issueId} className="flex min-h-0 min-w-0">
          <IssueCard issue={issue} />
        </div>
      ))}
    </div>
  );
}
