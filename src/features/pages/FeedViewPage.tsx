import React, {useEffect, useState} from 'react';
import {Alert, Button, CardContent, CircularProgress, Collapse, Stack, Typography,} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    OpenInNew as OpenInNewIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import {fetchFeedIssues, fetchFeedIssuesByNickname, fetchFeedRepositories} from '../../api/issuesApi';
import {Issue} from '../../types';
import {IssuesList} from '../components/IssuesList';
import {Loader} from '../../shared/ui/Loader/Loader';
import {useTheme} from '@mui/material/styles';
import {
    CardContentFlex,
    CountBox,
    countValueStyles,
    ErrorAlert,
    ExpandButton,
    LoadingContainer,
    PageContainer,
    pageTitleStyles,
    RepoCard,
    RepoInfoBox,
    RepoLink,
    repoNameStyles,
    ResultsCount,
    SectionHeader,
    sectionTitleStyles,
    subsectionTitleStyles,
} from './FeedViewPage.styles';

export function FeedViewPage() {
    const theme = useTheme();
    const {nickname} = useParams<{nickname: string}>();
    const navigate = useNavigate();
    const [repositories, setRepositories] = useState<{sourceRepo: string; count: number}[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [feedIssues, setFeedIssues] = useState<Issue[]>([]);
    const [repoIssues, setRepoIssues] = useState<Issue[]>([]);
    const [repositoriesExpanded, setRepositoriesExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [feedIssuesLoading, setFeedIssuesLoading] = useState(true);
    const [repoIssuesLoading, setRepoIssuesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedIssuesError, setFeedIssuesError] = useState<string | null>(null);
    const [repoIssuesError, setRepoIssuesError] = useState<string | null>(null);

    useEffect(() => {
        if (!nickname) {
            navigate('/feed');
            return;
        }

        const loadData = async () => {
            setLoading(true);
            setFeedIssuesLoading(true);
            setError(null);
            setFeedIssuesError(null);

            try {
                const [reposData, issuesData] = await Promise.all([
                    fetchFeedRepositories(nickname),
                    fetchFeedIssuesByNickname(nickname),
                ]);
                setRepositories(reposData);
                setFeedIssues(issuesData.issues);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load feed';
                setError(errorMessage);
                setFeedIssuesError(errorMessage);
            } finally {
                setLoading(false);
                setFeedIssuesLoading(false);
            }
        };

        loadData();
    }, [nickname, navigate]);

    const handleRepoClick = (sourceRepo: string) => {
        setSelectedRepo(sourceRepo);
        setRepositoriesExpanded(false);
    };

    const handleReset = () => {
        setSelectedRepo(null);
    };

    useEffect(() => {
        if (!selectedRepo) {
            setRepoIssues([]);
            setRepoIssuesError(null);
            return;
        }

        const loadRepoIssues = async () => {
            setRepoIssuesLoading(true);
            setRepoIssuesError(null);
            setRepoIssues([]);

            try {
                const response = await fetchFeedIssues(selectedRepo);
                setRepoIssues(response.issues);
            } catch (err) {
                setRepoIssuesError(err instanceof Error ? err.message : 'Failed to load issues');
            } finally {
                setRepoIssuesLoading(false);
            }
        };

        loadRepoIssues();
    }, [selectedRepo]);

    if (loading) {
        return (
            <PageContainer maxWidth="lg">
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer maxWidth="lg">
                <Alert severity="error">{error}</Alert>
            </PageContainer>
        );
    }

    return (
        <PageContainer maxWidth="lg">
            <Typography variant="h4" component="h1" sx={pageTitleStyles(theme)}>
                Feed for {nickname}
            </Typography>

            <Stack spacing={4}>
                {repositories.length > 0 && (
                    <Stack>
                        <SectionHeader>
                            <Typography variant="h6" component="h2" sx={sectionTitleStyles}>
                                Repositories
                            </Typography>
                            <ExpandButton
                                onClick={() => setRepositoriesExpanded(!repositoriesExpanded)}
                                size="small"
                            >
                                {repositoriesExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ExpandButton>
                        </SectionHeader>
                        <Collapse in={repositoriesExpanded}>
                            <Stack spacing={2}>
                                {repositories.map((repo) => {
                                    const repoName = repo.sourceRepo.replace('https://github.com/', '');
                                    const isSelected = selectedRepo === repo.sourceRepo;
                                    return (
                                        <RepoCard
                                            key={repo.sourceRepo}
                                            elevation={0}
                                            isSelected={isSelected}
                                            onClick={() => handleRepoClick(repo.sourceRepo)}
                                        >
                                            <CardContent>
                                                <CardContentFlex>
                                                    <RepoInfoBox>
                                                        <RepoLink
                                                            href={repo.sourceRepo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Typography variant="h6" component="span" sx={repoNameStyles}>
                                                                {repoName}
                                                            </Typography>
                                                            <OpenInNewIcon fontSize="small" />
                                                        </RepoLink>
                                                    </RepoInfoBox>
                                                    <CountBox>
                                                        <Typography variant="h6" component="div" sx={countValueStyles(theme)}>
                                                            {repo.count}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            dependencies
                                                        </Typography>
                                                    </CountBox>
                                                </CardContentFlex>
                                            </CardContent>
                                        </RepoCard>
                                    );
                                })}
                            </Stack>
                        </Collapse>
                    </Stack>
                )}

                {selectedRepo ? (
                    <Stack>
                        <SectionHeader>
                            <Typography variant="h6" component="h2" sx={sectionTitleStyles}>
                                Issues from repository {selectedRepo.replace('https://github.com/', '')}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<RefreshIcon />}
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </SectionHeader>
                        {repoIssuesLoading && <Loader />}
                        {repoIssuesError && (
                            <ErrorAlert severity="error">
                                {repoIssuesError}
                            </ErrorAlert>
                        )}
                        {!repoIssuesLoading && !repoIssuesError && repoIssues.length === 0 && (
                            <Typography variant="body1" color="text.secondary">
                                No issues found for this repository.
                            </Typography>
                        )}
                        {!repoIssuesLoading && !repoIssuesError && repoIssues.length > 0 && (
                            <>
                                <ResultsCount variant="body2" color="text.secondary">
                                    Showing {repoIssues.length} issues
                                </ResultsCount>
                                <IssuesList issues={repoIssues} />
                            </>
                        )}
                    </Stack>
                ) : (
                    <Stack>
                        <Typography variant="h6" component="h2" sx={subsectionTitleStyles(theme)}>
                            Issues from dependencies
                        </Typography>
                        {feedIssuesLoading && <Loader />}
                        {feedIssuesError && (
                            <ErrorAlert severity="error">
                                {feedIssuesError}
                            </ErrorAlert>
                        )}
                        {!feedIssuesLoading && !feedIssuesError && feedIssues.length === 0 && (
                            <Typography variant="body1" color="text.secondary">
                                No issues found.
                            </Typography>
                        )}
                        {!feedIssuesLoading && !feedIssuesError && feedIssues.length > 0 && (
                            <>
                                <ResultsCount variant="body2" color="text.secondary">
                                    Showing {feedIssues.length} issues
                                </ResultsCount>
                                <IssuesList issues={feedIssues} />
                            </>
                        )}
                    </Stack>
                )}
            </Stack>
        </PageContainer>
    );
}
