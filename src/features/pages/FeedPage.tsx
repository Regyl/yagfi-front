import React, {useState} from 'react';
import {Alert, Box, Button, Container, Paper, Stack, TextField, Typography,} from '@mui/material';
import {Send as SendIcon} from '@mui/icons-material';
import {generateFeed} from '../../api/issuesApi';

export function FeedPage() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await generateFeed({nickname, email});
            setSuccess(true);
            setNickname('');
            setEmail('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate feed');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = nickname.trim() !== '' && email.trim() !== '';

    return (
        <Container maxWidth="sm" sx={{py: 4}}>
            <Paper elevation={0} sx={{p: 4, border: '1px solid', borderColor: 'divider'}}>
                <Typography variant="h4" component="h1" sx={{mb: 3, fontWeight: 600}}>
                    Generate Custom Feed
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                    Create a personalized feed based on your preferences. We'll notify you by email when your feed is ready.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                            fullWidth
                            disabled={loading}
                            placeholder="Enter your nickname"
                        />

                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            disabled={loading}
                            placeholder="your.email@example.com"
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
        </Container>
    );
}
