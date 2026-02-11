import React, {useState} from 'react';
import {Box, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import {
    Brightness4,
    Brightness7,
    GitHub as GitHubIcon,
    Storage as StorageIcon,
    Sync as SyncIcon,
    Web as WebIcon,
} from '@mui/icons-material';
import {GITHUB_BACKEND_REPO_URL, GITHUB_FRONTEND_REPO_URL} from '../../constants';
import {useSyncStatus} from '../../../features/hooks';
import {formatDate} from '../../utils/formatDate';
import {SyncEvent} from '../../../types';
import {useTheme} from '@mui/material/styles';
import {
    GithubButton,
    HeaderActions,
    logoStyles,
    MenuItemContent,
    StyledAppBar,
    StyledToolbar,
    SyncEventItem,
    SyncInfo,
    SyncText,
    ThemeButton,
} from './Header.styles';

interface HeaderProps {
    mode: 'light' | 'dark';
    onToggleTheme: () => void;
}

export function Header({ mode, onToggleTheme }: HeaderProps) {
    const theme = useTheme();
    const { syncEvents, loading } = useSyncStatus();
    const [githubMenuAnchor, setGithubMenuAnchor] = useState<null | HTMLElement>(null);

    const getLatestSyncTime = () => {
        if (loading || syncEvents.length === 0) {
            return null;
        }
        const latestEvent = syncEvents.reduce((latest: SyncEvent, current: SyncEvent) => {
            return new Date(current.lastUpdateDttm) > new Date(latest.lastUpdateDttm)
                ? current
                : latest;
        });
        return formatDate(latestEvent.lastUpdateDttm);
    };

    const latestSyncTime = getLatestSyncTime();

    const handleGithubMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setGithubMenuAnchor(event.currentTarget);
    };

    const handleGithubMenuClose = () => {
        setGithubMenuAnchor(null);
    };

    const handleGithubMenuClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
        handleGithubMenuClose();
    };

    return (
        <StyledAppBar position="sticky">
            <StyledToolbar>
                <Typography variant="h6" component="div" sx={logoStyles(theme)}>
                    YAGFI - Yet Another Good First Issues
                </Typography>
                <HeaderActions>
                    {latestSyncTime && (
                        <Tooltip
                            title={
                                <>
                                    {syncEvents.map((event: SyncEvent) => (
                                        <SyncEventItem key={event.source}>
                                            <Typography variant="caption" component="div">
                                                {event.source}: {formatDate(event.lastUpdateDttm)}
                                            </Typography>
                                        </SyncEventItem>
                                    ))}
                                </>
                            }
                            arrow
                        >
                            <SyncInfo>
                                <SyncIcon fontSize="small" />
                                <SyncText variant="caption">Synced {latestSyncTime}</SyncText>
                            </SyncInfo>
                        </Tooltip>
                    )}
                    <ThemeButton onClick={onToggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </ThemeButton>

                    <Box>
                        <GithubButton onClick={handleGithubMenuOpen}>
                            <GitHubIcon fontSize="small" />
                            <Typography variant="body2">GitHub</Typography>
                        </GithubButton>
                        <Menu
                            anchorEl={githubMenuAnchor}
                            open={Boolean(githubMenuAnchor)}
                            onClose={handleGithubMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={() => handleGithubMenuClick(GITHUB_FRONTEND_REPO_URL)}>
                                <MenuItemContent>
                                    <WebIcon fontSize="small" />
                                    <Typography variant="body2">Frontend</Typography>
                                </MenuItemContent>
                            </MenuItem>
                            <MenuItem onClick={() => handleGithubMenuClick(GITHUB_BACKEND_REPO_URL)}>
                                <MenuItemContent>
                                    <StorageIcon fontSize="small" />
                                    <Typography variant="body2">Backend</Typography>
                                </MenuItemContent>
                            </MenuItem>
                        </Menu>
                    </Box>
                </HeaderActions>
            </StyledToolbar>
        </StyledAppBar>
    );
}
