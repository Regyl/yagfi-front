import React, {useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {Send as SendIcon} from '@mui/icons-material';
import {checkGitHubUserExists, fetchFeedUsers, generateFeed} from '../../api/issuesApi';
import {getGitHubUserAvatar} from '../../shared/utils/getGitHubUserAvatar';
import {useNavigate} from 'react-router-dom';

export function FeedPage() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState<string[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [nicknameError, setNicknameError] = useState<string | null>(null);
    const [checkingNickname, setCheckingNickname] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            setUsersLoading(true);
            setUsersError(null);
            try {
                const data = await fetchFeedUsers();
                setUsers(data);
            } catch (err) {
                setUsersError(err instanceof Error ? err.message : 'Failed to load users');
            } finally {
                setUsersLoading(false);
            }
        };

        loadUsers();
    }, []);

    const validateEmail = (emailValue: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value.trim() && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError(null);
        }
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNickname(value);
        setNicknameError(null);
    };

    const handleNicknameBlur = async () => {
        if (nickname.trim()) {
            await validateNickname(nickname);
        }
    };

    const validateNickname = async (nicknameValue: string): Promise<boolean> => {
        if (!nicknameValue.trim()) {
            setNicknameError('Nickname is required');
            return false;
        }

        setCheckingNickname(true);
        try {
            const exists = await checkGitHubUserExists(nicknameValue);
            if (!exists) {
                setNicknameError('This GitHub username does not exist. Please check the username and try again.');
                return false;
            }
            setNicknameError(null);
            return true;
        } catch (err) {
            setNicknameError('Failed to verify GitHub username. Please try again.');
            return false;
        } finally {
            setCheckingNickname(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validate email
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError(null);

        // Validate nickname
        const isNicknameValid = await validateNickname(nickname);
        if (!isNicknameValid) {
            return;
        }

        setLoading(true);
        try {
            await generateFeed({nickname: nickname.trim(), email: email.trim()});
            setSuccess(true);
            setNickname('');
            setEmail('');
            setEmailError(null);
            setNicknameError(null);
            // Reload users list after successful generation
            const data = await fetchFeedUsers();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate feed');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = nickname.trim() !== '' && email.trim() !== '' && !emailError && !nicknameError && !checkingNickname;

    return (
        <Container maxWidth="sm" sx={{py: 4}}>
            <Stack spacing={4}>
                <Paper elevation={0} sx={{p: 4, border: '1px solid', borderColor: 'divider'}}>
                    <Typography variant="h4" component="h1" sx={{mb: 3, fontWeight: 600}}>
                        Generate Personalized Feed
                    </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                            Create a personalized feed based on your preferences/repositories. We'll notify you by email when your feed is ready.
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="GitHub Username"
                                    value={nickname}
                                    onChange={handleNicknameChange}
                                    onBlur={handleNicknameBlur}
                                    required
                                    fullWidth
                                    disabled={loading || checkingNickname}
                                    placeholder="Regyl"
                                    error={!!nicknameError}
                                    helperText={
                                        nicknameError || 
                                        'Enter your GitHub username (not your profile name). Example: for https://github.com/Regyl, the username is "Regyl"'
                                    }
                                    InputProps={{
                                        endAdornment: checkingNickname ? (
                                            <Box sx={{display: 'flex', alignItems: 'center', px: 1}}>
                                                <CircularProgress size={20} />
                                            </Box>
                                        ) : null,
                                    }}
                                />

                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    fullWidth
                                    disabled={loading}
                                    placeholder="your.email@example.com"
                                    error={!!emailError}
                                    helperText={emailError || 'We\'ll notify you when your feed is ready'}
                                />

                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography variant="caption" color="text.secondary" component="div">
                                        <strong>Privacy Note:</strong> Your email will be used only to notify you when your feed is ready. 
                                        We promise no advertising or sharing your data with third parties.
                                    </Typography>
                                </Box>

                                {error && (
                                    <Alert severity="error" onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}

                                {success && (
                                    <Alert severity="success" onClose={() => setSuccess(false)}>
                                        Feed generation started successfully! You'll receive an email notification when it's ready.
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={!isFormValid || loading}
                                    startIcon={<SendIcon />}
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    {loading ? 'Generating...' : 'Generate Feed'}
                                </Button>
                            </Stack>
                        </form>
                </Paper>

                <Paper elevation={0} sx={{p: 4, border: '1px solid', borderColor: 'divider'}}>
                    <Typography variant="h5" component="h2" sx={{mb: 3, fontWeight: 600}}>
                        Processed Requests
                    </Typography>

                        {usersLoading && (
                            <Typography variant="body2" color="text.secondary">
                                Loading users...
                            </Typography>
                        )}

                        {usersError && (
                            <Alert severity="error" sx={{mb: 2}}>
                                {usersError}
                            </Alert>
                        )}

                        {!usersLoading && !usersError && users.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                No users found yet.
                            </Typography>
                        )}

                        {!usersLoading && !usersError && users.length > 0 && (
                            <List>
                                {users.map((nickname, index) => {
                                    if (!nickname) return null;
                                    const avatarUrl = getGitHubUserAvatar(nickname);
                                    return (
                                        <React.Fragment key={nickname}>
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={() => navigate(`/feed/${nickname}`)}
                                                    sx={{
                                                        px: 0,
                                                        py: 1.5,
                                                    }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={avatarUrl || undefined}
                                                            alt={nickname}
                                                            sx={{
                                                                bgcolor: 'primary.main',
                                                            }}
                                                        >
                                                            {nickname.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle1" component="span">
                                                                {nickname}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                            {index < users.length - 1 && <Divider component="li" />}
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                        )}
                </Paper>
            </Stack>
        </Container>
    );
}
