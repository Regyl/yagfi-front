import React, {useMemo} from 'react';
import {Box, Card, CardContent, Link, Stack, Typography,} from '@mui/material';
import {Badge} from '../../shared/ui/Badge/Badge';
import {formatDate} from '../../shared/utils/formatDate';
import {getGitHubAvatar} from '../../shared/utils/getGitHubAvatar';
import {Issue} from '../../types';

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
      sx={{
        textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
        height: '100%',
          width: '100%',
          minHeight: 200,
        cursor: 'pointer',
          overflow: 'hidden',
      }}
    >
        <CardContent
            sx={{
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                height: '100%',
                minWidth: 0,
                overflow: 'hidden',
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{mb: 1, minWidth: 0}}>
          {avatarUrl && (
            <Box
              component="img"
              src={avatarUrl}
              alt="Repository owner"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = 'none';
              }}
              sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                objectFit: 'cover',
              }}
            />
          )}
          <Typography
            variant="h3"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
                minWidth: 0,
            }}
          >
            {issueTitle}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            color: 'text.secondary',
            fontSize: '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {repositoryTitle}
        </Typography>

        {repositoryDescription && (
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              color: 'text.secondary',
              fontSize: '0.8125rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {repositoryDescription}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          sx={{mt: 'auto', pt: 1}}
        >
          {repositoryLanguage && (
            <Badge color="primary">{repositoryLanguage}</Badge>
          )}
          <Badge color="secondary">
            {repositoryStars} ★
          </Badge>
          <Typography
            variant="caption"
            sx={{
              ml: 'auto',
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            {formatDate(issueCreated)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
