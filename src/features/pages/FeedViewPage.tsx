import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Collapse,
    Container,
    IconButton,
    Link,
    Stack,
    Typography,
} from '@mui/material';
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

export function FeedViewPage() {
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
            <Container maxWidth="lg" sx={{py: 4}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400}}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{py: 4}}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Typography variant="h4" component="h1" sx={{mb: 4, fontWeight: 600}}>
                Feed for {nickname}
            </Typography>

            <Stack spacing={4}>
                {repositories.length > 0 && (
                    <Box>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                            <Typography variant="h6" component="h2" sx={{fontWeight: 600}}>
                                Repositories
                            </Typography>
                            <IconButton
                                onClick={() => setRepositoriesExpanded(!repositoriesExpanded)}
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {repositoriesExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Box>
                        <Collapse in={repositoriesExpanded}>
                            <Stack spacing={2}>
                                {repositories.map((repo) => {
                                    const repoName = repo.sourceRepo.replace('https://github.com/', '');
                                    const isSelected = selectedRepo === repo.sourceRepo;
                                    return (
                                        <Card
                                            key={repo.sourceRepo}
                                            elevation={0}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: isSelected ? 'primary.main' : 'divider',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    boxShadow: 1,
                                                },
                                            }}
                                            onClick={() => handleRepoClick(repo.sourceRepo)}
                                        >
                                            <CardContent>
                                                <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2}}>
                                                    <Box sx={{flex: 1, minWidth: 0}}>
                                                        <Link
                                                            href={repo.sourceRepo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            sx={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                color: 'primary.main',
                                                                textDecoration: 'none',
                                                                '&:hover': {
                                                                    textDecoration: 'underline',
                                                                },
                                                            }}
                                                        >
                                                            <Typography variant="h6" component="span" sx={{fontWeight: 600}}>
                                                                {repoName}
                                                            </Typography>
                                                            <OpenInNewIcon fontSize="small" />
                                                        </Link>
                                                    </Box>
                                                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1}}>
                                                        <Typography variant="h6" component="div" sx={{fontWeight: 600, color: 'primary.main'}}>
                                                            {repo.count}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            dependencies
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Stack>
                        </Collapse>
                    </Box>
                )}

                {selectedRepo ? (
                    <Box>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                            <Typography variant="h6" component="h2" sx={{fontWeight: 600}}>
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
                        </Box>
                        {repoIssuesLoading && <Loader />}
                        {repoIssuesError && (
                            <Alert severity="error" sx={{mb: 2}}>
                                {repoIssuesError}
                            </Alert>
                        )}
                        {!repoIssuesLoading && !repoIssuesError && repoIssues.length === 0 && (
                            <Typography variant="body1" color="text.secondary">
                                No issues found for this repository.
                            </Typography>
                        )}
                        {!repoIssuesLoading && !repoIssuesError && repoIssues.length > 0 && (
                            <>
                                <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                                    Showing {repoIssues.length} issues
                                </Typography>
                                <IssuesList issues={repoIssues} />
                            </>
                        )}
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h6" component="h2" sx={{mb: 2, fontWeight: 600}}>
                            Issues from dependencies
                        </Typography>
                        {feedIssuesLoading && <Loader />}
                        {feedIssuesError && (
                            <Alert severity="error" sx={{mb: 2}}>
                                {feedIssuesError}
                            </Alert>
                        )}
                        {!feedIssuesLoading && !feedIssuesError && feedIssues.length === 0 && (
                            <Typography variant="body1" color="text.secondary">
                                No issues found.
                            </Typography>
                        )}
                        {!feedIssuesLoading && !feedIssuesError && feedIssues.length > 0 && (
                            <>
                                <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                                    Showing {feedIssues.length} issues
                                </Typography>
                                <IssuesList issues={feedIssues} />
                            </>
                        )}
                    </Box>
                )}
            </Stack>
        </Container>
    );
}
