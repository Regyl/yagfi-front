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
                position: 'fixed',
                top: 64, // Header height
                left: 0,
                width: 240,
                height: 'calc(100vh - 64px)', // Full viewport height minus header
                borderRadius: 0,
                borderRight: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default',
                zIndex: 1000,
                overflowY: 'auto',
            }}
        >
            <Box sx={{pt: 2}}>
                <List>
                    {menuItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    selected={isSelected}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        mx: 1,
                                        borderRadius: 1,
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
                                            minWidth: 40,
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
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
                                        }}
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
