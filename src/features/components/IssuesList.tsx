import React from 'react';
import {IssueCard} from './IssueCard';
import {Issue} from '../../types';
import {GridContainer, GridItem} from './IssuesList.styles';

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  return (
    <GridContainer>
      {issues.map((issue) => (
        <GridItem key={issue.issueId}>
          <IssueCard issue={issue} />
        </GridItem>
      ))}
    </GridContainer>
  );
}
