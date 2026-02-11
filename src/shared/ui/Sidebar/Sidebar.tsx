import React from 'react';
import {ListItemText} from '@mui/material';
import {BugReport as BugReportIcon, RssFeed as RssFeedIcon} from '@mui/icons-material';
import {useLocation, useNavigate} from 'react-router-dom';
import {Badge} from '../Badge/Badge';
import {
    ListItemTextContent,
    SidebarContent,
    SidebarList,
    SidebarListItem,
    SidebarListItemButton,
    SidebarListItemIcon,
    SidebarPaper,
} from './Sidebar.styles';

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
        <SidebarPaper elevation={0}>
            <SidebarContent>
                <SidebarList>
                    {menuItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <SidebarListItem key={item.path} disablePadding>
                                <SidebarListItemButton
                                    selected={isSelected}
                                    onClick={() => navigate(item.path)}
                                >
                                    <SidebarListItemIcon isSelected={isSelected}>
                                        {item.icon}
                                    </SidebarListItemIcon>
                                    <ListItemText
                                        primary={
                                            <ListItemTextContent>
                                                <span>{item.label}</span>
                                                {item.path === '/feed' && (
                                                    <Badge color="primary" variant="outlined">
                                                        beta
                                                    </Badge>
                                                )}
                                            </ListItemTextContent>
                                        }
                                        primaryTypographyProps={{
                                            fontWeight: isSelected ? 600 : 400,
                                            fontSize: { xs: '0.75rem', sm: '1rem' },
                                            textAlign: { xs: 'center', sm: 'left' },
                                        }}
                                    />
                                </SidebarListItemButton>
                            </SidebarListItem>
                        );
                    })}
                </SidebarList>
            </SidebarContent>
        </SidebarPaper>
    );
}
