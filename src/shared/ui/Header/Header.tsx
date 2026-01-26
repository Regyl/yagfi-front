import React from 'react';
import {AppBar, Box, Link, Toolbar, Typography,} from '@mui/material';
import {GitHub as GitHubIcon} from '@mui/icons-material';
import {GITHUB_REPO_URL} from '../../constants';
import styles from './Header.module.css';

export function Header() {
    return (
        <AppBar
            position="sticky"
            className={styles.appBar}
        >
            <Toolbar className={styles.toolbar}>
                <Typography
                    variant="h6"
                    component="div"
                    className={styles.title}
                >
                    YAGFI - Yet Another Good First Issues
                </Typography>
                <Box className={styles.linksBox}>
                    <Link
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubLink}
                    >
                        <GitHubIcon fontSize="small"/>
                        <Typography
                            variant="body2"
                            className={styles.githubText}
                        >
                            GitHub
                        </Typography>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
