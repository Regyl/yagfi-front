import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Link,
} from '@mui/material';
import { Badge } from '../../shared/ui/Badge/Badge';
import { formatDate } from '../../shared/utils/formatDate';
import { Issue } from '../../types';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { title, url, createdAt, repository } = issue;

  return (
    <Card
      component={Link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textDecoration: 'none',
        display: 'block',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontSize: '1rem',
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

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
          {repository.title}
        </Typography>

        {repository.description && (
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
            {repository.description}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          sx={{ mt: 'auto' }}
        >
          {repository.language && (
            <Badge color="primary">{repository.language}</Badge>
          )}
          <Badge color="secondary">
            {repository.stars} ★
          </Badge>
          <Typography
            variant="caption"
            sx={{
              ml: 'auto',
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            {formatDate(createdAt)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
