import React, {useEffect, useState} from 'react';
import {Loader2, Send} from 'lucide-react';
import {checkGitHubUserExists, fetchFeedUsers, generateFeed} from '@/api/issuesApi';
import {getGitHubUserAvatar} from '@/shared/utils/getGitHubUserAvatar';
import {useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {cn} from '@/lib/utils';

const ICONS = [
  {src: '/icons/npm.svg', alt: 'NPM', label: 'NPM'},
  {src: '/icons/maven.svg', alt: 'Maven', label: 'Maven'},
  {src: '/icons/github.svg', alt: 'Github Packages', label: 'Github Packages'},
  {src: '/icons/rust.svg', alt: 'Cargo', label: 'Cargo'},
  {src: '/icons/go.svg', alt: 'Go', label: 'Go (partially)'},
  {src: '/icons/python.svg', alt: 'PyPi', label: 'PyPi'},
];

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

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);
    setEmailError(v.trim() && !validateEmail(v) ? 'Please enter a valid email address' : null);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(null);
  };

  const validateNickname = async (v: string): Promise<boolean> => {
    if (!v.trim()) {
      setNicknameError('Nickname is required');
      return false;
    }
    setCheckingNickname(true);
    try {
      const exists = await checkGitHubUserExists(v);
      if (!exists) {
        setNicknameError('This GitHub username does not exist. Please check the username and try again.');
        return false;
      }
      setNicknameError(null);
      return true;
    } catch {
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
    if (!(await validateNickname(nickname))) return;

    setLoading(true);
    try {
      await generateFeed({nickname: nickname.trim(), email: email.trim()});
      setSuccess(true);
      setNickname('');
      setEmail('');
      setEmailError(null);
      setNicknameError(null);
      setUsers(await fetchFeedUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate feed');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    nickname.trim() !== '' &&
    email.trim() !== '' &&
    !emailError &&
    !nicknameError &&
    !checkingNickname;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-12" aria-labelledby="feed-heading">
        <h1 id="feed-heading" className="text-3xl font-semibold tracking-tight">
          Generate Personalized Feed
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Create a personalized feed based on your preferences and repositories. We&apos;ll notify you by email when your feed is ready.
        </p>
      </section>

      <div className="flex flex-col gap-8">
        <Card className="border">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-8 rounded-lg border border-border bg-muted/30 p-4">
              <h2 className="mb-3 text-sm font-medium">Supported Package Managers</h2>
              <ul className="flex flex-col gap-3" role="list">
                {ICONS.map(({src, alt, label}) => (
                  <li key={label} className="flex items-center gap-3">
                    <img src={src} alt="" className="size-5 object-contain" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <Label htmlFor="nickname">GitHub Username</Label>
                <div className="relative mt-2">
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                    onBlur={() => nickname.trim() && validateNickname(nickname)}
                    placeholder="e.g. octocat"
                    disabled={loading || checkingNickname}
                    className={nicknameError ? 'border-destructive' : ''}
                    aria-invalid={!!nicknameError}
                    aria-describedby={nicknameError ? 'nickname-error' : 'nickname-hint'}
                  />
                  {checkingNickname && (
                    <Loader2
                      className="absolute right-3 top-1/2 size-5 -translate-y-1/2 animate-spin text-muted-foreground"
                      aria-hidden
                    />
                  )}
                </div>
                <p
                  id={nicknameError ? 'nickname-error' : 'nickname-hint'}
                  className={cn('mt-2 text-sm', nicknameError ? 'text-destructive' : 'text-muted-foreground')}
                >
                  {nicknameError ||
                    'Enter your GitHub username (not your profile name). Example: for github.com/Regyl, the username is "Regyl"'}
                </p>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your.email@example.com"
                  disabled={loading}
                  className="mt-2"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : 'email-hint'}
                />
                <p
                  id={emailError ? 'email-error' : 'email-hint'}
                  className={cn('mt-2 text-sm', emailError ? 'text-destructive' : 'text-muted-foreground')}
                >
                  {emailError || "We'll notify you when your feed is ready"}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Privacy:</strong> Your email will be used only to notify you when your feed is ready. No advertising or sharing with third parties.
                </p>
              </div>

              {error && (
                <Alert variant="destructive" role="alert">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert role="status">
                  <AlertDescription>
                    Feed generation started. You&apos;ll receive an email when it&apos;s ready.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full"
              >
                <Send className="size-4" aria-hidden />
                {loading ? 'Generating...' : 'Generate Feed'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-semibold">Processed Requests</h2>
            {usersLoading && (
              <p className="text-sm text-muted-foreground">Loading users...</p>
            )}
            {usersError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{usersError}</AlertDescription>
              </Alert>
            )}
            {!usersLoading && !usersError && users.length === 0 && (
              <p className="text-sm text-muted-foreground">No users found yet.</p>
            )}
            {!usersLoading && !usersError && users.length > 0 && (
              <ul className="divide-y divide-border" role="list">
                {users.map((userNickname, i) => {
                  if (!userNickname) return null;
                  const avatarUrl = getGitHubUserAvatar(userNickname);
                  return (
                    <li key={userNickname}>
                      <button
                        type="button"
                        onClick={() => navigate(`/feed/${userNickname}`)}
                        className="flex w-full items-center gap-4 px-0 py-5 text-left transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                      >
                        <Avatar className="size-10 bg-primary">
                          <AvatarImage src={avatarUrl || undefined} alt={`${userNickname} avatar`} />
                          <AvatarFallback>{userNickname.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{userNickname}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
