import React from 'react';
import { AppBar, Box, Link, Toolbar, Typography, IconButton } from '@mui/material';
import { GitHub as GitHubIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { GITHUB_REPO_URL } from '../../constants';


interface HeaderProps {
    mode: 'light' | 'dark';
    onToggleTheme: () => void;
}

export function Header({ mode, onToggleTheme }: HeaderProps) {
    return (
        <AppBar
            position="sticky"
            sx={{
                top: 0,
                zIndex: 1100,
                backgroundColor: 'background.default',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: '1.25rem',
                    }}
                >
                    YAGFI - Yet Another Good First Issues
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {}
                    <IconButton 
                        onClick={onToggleTheme} 
                        color="inherit" 
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main' } 
                        }}
                    >
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    <Link
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'text.secondary',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                            '&:hover': {
                                color: 'primary.main',
                            },
                            fontSize: '0.875rem',
                        }}
                    >
                        <GitHubIcon fontSize="small" />
                        <Typography
                            variant="body2"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            GitHub
                        </Typography>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}