import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
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
    OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import {fetchFeedIssues, fetchFeedRepositories} from '../../api/issuesApi';
import {Issue} from '../../types';
import {IssuesList} from '../components/IssuesList';
import {Loader} from '../../shared/ui/Loader/Loader';

export function FeedViewPage() {
    const {nickname} = useParams<{nickname: string}>();
    const navigate = useNavigate();
    const [repositories, setRepositories] = useState<{sourceRepo: string; count: number}[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [repositoriesExpanded, setRepositoriesExpanded] = useState(true);
    const [loading, setLoading] = useState(true);
    const [issuesLoading, setIssuesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [issuesError, setIssuesError] = useState<string | null>(null);

    useEffect(() => {
        if (!nickname) {
            navigate('/feed');
            return;
        }

        const loadRepositories = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchFeedRepositories(nickname);
                setRepositories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load feed');
            } finally {
                setLoading(false);
            }
        };

        loadRepositories();
    }, [nickname, navigate]);

    const handleRepoClick = async (sourceRepo: string) => {
        setSelectedRepo(sourceRepo);
        setRepositoriesExpanded(false);
        setIssuesLoading(true);
        setIssuesError(null);
        setIssues([]);

        try {
            const response = await fetchFeedIssues(sourceRepo);
            setIssues(response.issues);
        } catch (err) {
            setIssuesError(err instanceof Error ? err.message : 'Failed to load issues');
        } finally {
            setIssuesLoading(false);
        }
    };

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

            {repositories.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    No repositories found for this feed.
                </Typography>
            ) : (
                <Stack spacing={4}>
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

                    {selectedRepo && (
                        <Box>
                            <Typography variant="h6" component="h2" sx={{mb: 2, fontWeight: 600}}>
                                Issues from repository {selectedRepo.replace('https://github.com/', '')}
                            </Typography>
                            {issuesLoading && <Loader />}
                            {issuesError && (
                                <Alert severity="error" sx={{mb: 2}}>
                                    {issuesError}
                                </Alert>
                            )}
                            {!issuesLoading && !issuesError && issues.length === 0 && (
                                <Typography variant="body1" color="text.secondary">
                                    No issues found for this repository.
                                </Typography>
                            )}
                            {!issuesLoading && !issuesError && issues.length > 0 && (
                                <>
                                    <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                                        Showing {issues.length} issues
                                    </Typography>
                                    <IssuesList issues={issues} />
                                </>
                            )}
                        </Box>
                    )}
                </Stack>
            )}
        </Container>
    );
}
