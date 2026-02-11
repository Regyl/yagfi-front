import React, {useMemo} from 'react';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {Badge} from '../../shared/ui/Badge/Badge';
import {formatDate} from '../../shared/utils/formatDate';
import {formatLanguage} from '../../shared/utils/formatLanguage';
import {getGitHubAvatar} from '../../shared/utils/getGitHubAvatar';
import {Issue} from '../../types';
import {
    avatarImgStyles,
    DateText,
    FooterStack,
    IssueCardContent,
    IssueCardLink,
    IssueHeader,
    IssueTitle,
    LabelsStack,
    RepoDescription,
    RepoTitle,
} from './IssueCard.styles';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const theme = useTheme();
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

  const avatarUrl = useMemo(() => {
    return repositoryOwnerAvatar || getGitHubAvatar(repositoryTitle);
  }, [repositoryOwnerAvatar, repositoryTitle]);

  return (
    <IssueCardLink
      component="a"
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IssueCardContent>
        <IssueHeader direction="row" spacing={1.5} alignItems="flex-start">
          {avatarUrl && (
            <Box
              component="img"
              src={avatarUrl}
              alt="Repository owner"
              sx={avatarImgStyles(theme)}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <IssueTitle variant="h3">{issueTitle}</IssueTitle>
        </IssueHeader>

        <RepoTitle variant="body2">{repositoryTitle}</RepoTitle>

        {repositoryDescription && (
          <RepoDescription variant="body2">{repositoryDescription}</RepoDescription>
        )}

        {issueLabels && issueLabels.length > 0 && (
          <LabelsStack direction="row" alignItems="center" flexWrap="wrap">
            {issueLabels.map((label, index) => (
              <Badge key={index} color="default" variant="outlined">
                {label}
              </Badge>
            ))}
          </LabelsStack>
        )}

        <FooterStack direction="row" alignItems="center" flexWrap="wrap">
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
          <DateText variant="caption">{formatDate(issueCreated)}</DateText>
        </FooterStack>
      </IssueCardContent>
    </IssueCardLink>
  );
}
