import React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material';
import {BugReport as BugReportIcon, RssFeed as RssFeedIcon} from '@mui/icons-material';
import {useLocation, useNavigate} from 'react-router-dom';
import {Badge} from '../Badge/Badge';

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            label: 'Issues',
            path: '/issues',
            icon: <BugReportIcon />,
        },
        {
            label: 'Feed',
            path: '/feed',
            icon: <RssFeedIcon />,
        },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                position: { xs: 'fixed', sm: 'fixed' },
                top: { xs: 'auto', sm: 64 }, // Header height
                bottom: { xs: 0, sm: 'auto' },
                left: { xs: 0, sm: 0 },
                width: { xs: '100%', sm: 240 },
                height: { xs: 'auto', sm: 'calc(100vh - 64px)' }, // Full viewport height minus header
                borderRadius: 0,
                borderRight: { xs: 'none', sm: '1px solid' },
                borderTop: { xs: '1px solid', sm: 'none' },
                borderColor: 'divider',
                borderTopColor: { xs: 'divider', sm: 'transparent' },
                borderRightColor: { xs: 'transparent', sm: 'divider' },
                backgroundColor: 'background.default',
                zIndex: 1000,
                overflowY: { xs: 'visible', sm: 'auto' },
            }}
        >
            <Box sx={{pt: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 0 }}}>
                <List sx={{display: { xs: 'flex', sm: 'block' }, flexDirection: { xs: 'row', sm: 'column' }, gap: { xs: 0, sm: 0 }}}>
                    {menuItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem key={item.path} disablePadding sx={{width: { xs: 'auto', sm: '100%' }, flex: { xs: 1, sm: 'none' }}}>
                                <ListItemButton
                                    selected={isSelected}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        mx: { xs: 0.5, sm: 1 },
                                        borderRadius: 1,
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        py: { xs: 1, sm: 1.5 },
                                        minHeight: { xs: 'auto', sm: 48 },
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.main',
                                            color: 'primary.contrastText',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: 'primary.contrastText',
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isSelected ? 'primary.contrastText' : 'text.secondary',
                                            minWidth: { xs: 'auto', sm: 40 },
                                            justifyContent: { xs: 'center', sm: 'flex-start' },
                                            mb: { xs: 0.5, sm: 0 },
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 1, flexDirection: { xs: 'column', sm: 'row' }}}>
                                                <span>{item.label}</span>
                                                {item.path === '/feed' && (
                                                    <Badge color="primary" variant="outlined">
                                                        beta
                                                    </Badge>
                                                )}
                                            </Box>
                                        }
                                        primaryTypographyProps={{
                                            fontWeight: isSelected ? 600 : 400,
                                            fontSize: { xs: '0.75rem', sm: '1rem' },
                                            textAlign: { xs: 'center', sm: 'left' },
                                        }}
                                        sx={{mt: { xs: 0, sm: 0 }}}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Paper>
    );
}
