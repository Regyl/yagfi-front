import React, {useMemo} from 'react';
import {Box, Card, CardContent, Link, Stack, Typography,} from '@mui/material';
import {Badge} from '../../shared/ui/Badge/Badge';
import {formatDate} from '../../shared/utils/formatDate';
import {getGitHubAvatar} from '../../shared/utils/getGitHubAvatar';
import {Issue} from '../../types';
import styles from './IssueCard.module.css';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const {
    issueTitle,
    issueUrl,
    issueCreated,
    repositoryTitle,
    repositoryDescription,
    repositoryLanguage,
    repositoryStars,
    repositoryOwnerAvatar,
  } = issue;

  // Get avatar URL from GitHub if not provided in data
  const avatarUrl = useMemo(() => {
    return repositoryOwnerAvatar || getGitHubAvatar(repositoryTitle);
  }, [repositoryOwnerAvatar, repositoryTitle]);

  return (
    <Card
      component={Link}
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
        <CardContent className={styles.cardContent}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start" className={styles.headerStack}>
          {avatarUrl && (
            <Box
              component="img"
              src={avatarUrl}
              alt="Repository owner"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = 'none';
              }}
              className={styles.avatar}
            />
          )}
          <Typography
            variant="h3"
            className={styles.title}
          >
            {issueTitle}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          className={styles.repositoryTitle}
        >
          {repositoryTitle}
        </Typography>

        {repositoryDescription && (
          <Typography
            variant="body2"
            className={styles.description}
          >
            {repositoryDescription}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          className={styles.footerStack}
        >
          {repositoryLanguage && (
            <Badge color="primary">{repositoryLanguage}</Badge>
          )}
          <Badge color="secondary">
            {repositoryStars} ★
          </Badge>
          <Typography
            variant="caption"
            className={styles.dateText}
          >
            {formatDate(issueCreated)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
