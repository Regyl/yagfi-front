import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {Send as SendIcon} from '@mui/icons-material';
import {checkGitHubUserExists, fetchFeedUsers, generateFeed} from '../../api/issuesApi';
import {getGitHubUserAvatar} from '../../shared/utils/getGitHubUserAvatar';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import {
    AdornmentBox,
    iconImageStyles,
    IconRow,
    InfoBox,
    InfoBoxAlt,
    PageContainer,
    PageSubtitle,
    pageTitleStyles,
    sectionTitleStyles,
    StyledPaper,
    SubmitButton,
    UserAvatar,
    UserListItemButton,
    UsersErrorAlert,
} from './FeedPage.styles';

export function FeedPage() {
    const navigate = useNavigate();
    const theme = useTheme();
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

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError(null);

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
            const data = await fetchFeedUsers();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate feed');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = nickname.trim() !== '' && email.trim() !== '' && !emailError && !nicknameError && !checkingNickname;

    const iconRow = (src: string, alt: string, label: string) => (
        <IconRow key={label}>
            <Box component="img" src={src} alt={alt} sx={iconImageStyles} />
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
        </IconRow>
    );

    return (
        <PageContainer maxWidth="sm">
            <Stack spacing={4}>
                <StyledPaper elevation={0}>
                    <Typography variant="h4" component="h1" sx={pageTitleStyles(theme)}>
                        Generate Personalized Feed
                    </Typography>

                    <PageSubtitle variant="body2" color="text.secondary">
                        Create a personalized feed based on your preferences/repositories. We'll notify you by email when your feed is ready.
                    </PageSubtitle>

                    <InfoBox>
                        <Typography variant="subtitle2" sx={sectionTitleStyles(theme)}>
                            Supported Package Managers:
                        </Typography>
                        <Stack direction="column" spacing={1.5}>
                            {iconRow(`${process.env.PUBLIC_URL || ''}/icons/npm.svg`, 'NPM', 'NPM')}
                            {iconRow(`${process.env.PUBLIC_URL || ''}/icons/maven.svg`, 'Maven', 'Maven')}
                            {iconRow(`${process.env.PUBLIC_URL || ''}/icons/github.svg`, 'Github Packages', 'Github Packages')}
                            {iconRow(`${process.env.PUBLIC_URL || ''}/icons/rust.svg`, 'Cargo', 'Cargo')}
                            {iconRow(`${process.env.PUBLIC_URL || ''}/icons/go.svg`, 'Go', 'Go (partially)')}
                            {iconRow(`${process.env.PUBLIC_URL || ''}/icons/python.svg`, 'PyPi', 'PyPi')}
                        </Stack>
                    </InfoBox>

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
                                placeholder="GitHub Username"
                                error={!!nicknameError}
                                helperText={
                                    nicknameError ||
                                    'Enter your GitHub username (not your profile name). Example: for https://github.com/Regyl, the username is "Regyl"'
                                }
                                InputProps={{
                                    endAdornment: checkingNickname ? (
                                        <AdornmentBox>
                                            <CircularProgress size={20} />
                                        </AdornmentBox>
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

                            <InfoBoxAlt>
                                <Typography variant="caption" color="text.secondary" component="div">
                                    <strong>Privacy Note:</strong> Your email will be used only to notify you when your feed is ready.
                                    We promise no advertising or sharing your data with third parties.
                                </Typography>
                            </InfoBoxAlt>

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

                            <SubmitButton
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={!isFormValid || loading}
                                startIcon={<SendIcon />}
                                fullWidth
                            >
                                {loading ? 'Generating...' : 'Generate Feed'}
                            </SubmitButton>
                        </Stack>
                    </form>
                </StyledPaper>

                <StyledPaper elevation={0}>
                    <Typography variant="h5" component="h2" sx={pageTitleStyles(theme)}>
                        Processed Requests
                    </Typography>

                    {usersLoading && (
                        <Typography variant="body2" color="text.secondary">
                            Loading users...
                        </Typography>
                    )}

                    {usersError && (
                        <UsersErrorAlert severity="error">
                            {usersError}
                        </UsersErrorAlert>
                    )}

                    {!usersLoading && !usersError && users.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                            No users found yet.
                        </Typography>
                    )}

                    {!usersLoading && !usersError && users.length > 0 && (
                        <List>
                            {users.map((userNickname, index) => {
                                if (!userNickname) return null;
                                const avatarUrl = getGitHubUserAvatar(userNickname);
                                return (
                                    <React.Fragment key={userNickname}>
                                        <ListItem disablePadding>
                                            <UserListItemButton
                                                onClick={() => navigate(`/feed/${userNickname}`)}
                                            >
                                                <ListItemAvatar>
                                                    <UserAvatar
                                                        src={avatarUrl || undefined}
                                                        alt={userNickname}
                                                    >
                                                        {userNickname.charAt(0).toUpperCase()}
                                                    </UserAvatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="subtitle1" component="span">
                                                            {userNickname}
                                                        </Typography>
                                                    }
                                                />
                                            </UserListItemButton>
                                        </ListItem>
                                        {index < users.length - 1 && <Divider component="li" />}
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    )}
                </StyledPaper>
            </Stack>
        </PageContainer>
    );
}
