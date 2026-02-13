import React, {useMemo} from 'react';
import {Badge} from '@/shared/ui/Badge/Badge';
import {formatDate} from '@/shared/utils/formatDate';
import {formatLanguage} from '@/shared/utils/formatLanguage';
import {getGitHubAvatar} from '@/shared/utils/getGitHubAvatar';
import {Issue} from '@/types';
import {Card, CardContent} from '@/components/ui/card';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({issue}: IssueCardProps) {
  const {
    issueTitle,
    issueUrl,
    issueCreated,
    issueLabels,
    issueLanguage,
    repositoryTitle,
    repositoryDescription,
    repositoryLanguage,
    repositoryStars,
    repositoryLicense,
    repositoryOwnerAvatar,
  } = issue;

  const avatarUrl = useMemo(
    () => repositoryOwnerAvatar || getGitHubAvatar(repositoryTitle),
    [repositoryOwnerAvatar, repositoryTitle]
  );

  return (
    <a
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full min-h-[180px] no-underline transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
    >
      <Card className="flex h-full flex-col overflow-hidden border transition-colors hover:border-primary/30 hover:bg-accent/30">
        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex min-w-0 gap-3">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt=""
                className="size-9 shrink-0 rounded-lg border border-border object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <h3 className="line-clamp-2 min-w-0 flex-1 text-base font-medium leading-snug">
              {issueTitle}
            </h3>
          </div>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {repositoryTitle}
          </p>
          {repositoryDescription && (
            <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
              {repositoryDescription}
            </p>
          )}
          {issueLabels && issueLabels.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {issueLabels.map((label, i) => (
                <Badge key={i} color="default" variant="outlined">
                  {label}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {repositoryLanguage && (
              <Badge color="primary">{repositoryLanguage}</Badge>
            )}
            <Badge color="secondary">{repositoryStars} ★</Badge>
            {issueLanguage && (
              <Badge color="secondary">{formatLanguage(issueLanguage)}</Badge>
            )}
            {repositoryLicense && (
              <Badge color="secondary">{repositoryLicense}</Badge>
            )}
            <span className="ml-auto text-xs text-muted-foreground">
              {formatDate(issueCreated)}
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
